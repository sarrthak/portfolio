import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getGitHubActivity } from './api/github-activity.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = resolve(__dirname, 'dist');
const port = Number(process.env.PORT || 8080);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function sendJson(response, statusCode, payload, cacheControl = 'no-store') {
  response.writeHead(statusCode, {
    'Cache-Control': cacheControl,
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(payload));
}

function resolveStaticPath(pathname) {
  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const normalizedPath = normalize(decodeURIComponent(requestedPath)).replace(/^(\.\.[/\\])+/, '');
  const resolvedPath = resolve(join(distDir, normalizedPath));

  if (!resolvedPath.startsWith(distDir)) {
    return null;
  }

  return resolvedPath;
}

async function serveStatic(request, response) {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`);
  const staticPath = resolveStaticPath(url.pathname);

  if (!staticPath) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const fileStat = await stat(staticPath);

    if (!fileStat.isFile()) {
      throw new Error('Not a file');
    }

    const ext = extname(staticPath);
    const cacheControl = ext === '.html'
      ? 'no-cache'
      : 'public, max-age=31536000, immutable';

    response.writeHead(200, {
      'Cache-Control': cacheControl,
      'Content-Type': contentTypes[ext] ?? 'application/octet-stream',
    });
    response.end(await readFile(staticPath));
  } catch {
    response.writeHead(200, {
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/html; charset=utf-8',
    });
    response.end(await readFile(join(distDir, 'index.html')));
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`);

  if (url.pathname === '/healthz') {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (url.pathname === '/api/github-activity') {
    if (request.method !== 'GET') {
      response.writeHead(405, { Allow: 'GET' });
      response.end('Method not allowed');
      return;
    }

    try {
      const activity = await getGitHubActivity();
      sendJson(response, 200, activity, 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
    } catch (error) {
      sendJson(response, error.statusCode ?? 500, {
        error: error.message ?? 'GitHub activity is unavailable.',
      });
    }
    return;
  }

  await serveStatic(request, response);
});

server.listen(port, () => {
  console.log(`Portfolio server listening on ${port}`);
});
