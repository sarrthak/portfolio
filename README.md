# Sarrthak Portfolio

This repository contains Sarrthak Tripathi's recruiter-focused portfolio site. It is a Vite + React + TypeScript application with a live Three.js Transformer hero, featured AI projects, professional STAR-method experience, live GitHub activity, resume download, and a contact section.

The site is designed to do more than look polished. It is structured so hiring teams can quickly understand:

- what Sarrthak has built,
- which technical decisions mattered,
- what each project achieved,
- which stack he can work across,
- and how to contact him.

## Highlights

- **Live Transformer hero:** a Three.js text-token Transformer visualization that computes toy attention in the browser, updates softmax weights, and shows a decoder-style next-word prediction.
- **Featured projects:** Noteboard.ai and News-Tracking-Cloudfare are presented as recruiter-readable case studies with architecture notes and stack purpose.
- **Live GitHub activity:** `/api/github-activity` reads authenticated GitHub contribution data through a server-side token, keeping private contribution access out of the browser.
- **Professional timeline:** work experience is written in STAR format using the resume and Optum proof-of-work document.
- **Tech stack table:** grouped by Languages, AI/ML, Frontend, Backend, and DevOps.
- **Contact form:** opens the user's mail client with fields for name, email, subject, and message.
- **Cloud Run ready:** includes a production Node server, Dockerfile, and GitHub Actions deployment workflow.

## Stack

| Area | Tools |
| --- | --- |
| Frontend | React, Vite, TypeScript, Commit Mono, Lucide Icons |
| 3D / Motion | Three.js |
| AI Portfolio Content | LangGraph, Neo4j, Redis, Gemma 4, Next.js, Cloudflare Workers, Vectorize |
| Server | Node HTTP server for static assets and GitHub activity API |
| Deployment | Docker, Google Cloud Run, Artifact Registry, GitHub Actions |

## Local Development

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Set the GitHub activity token:

```bash
GITHUB_ACTIVITY_TOKEN=github_pat_replace_me
```

Run the Vite development server:

```bash
npm run dev
```

The local URL is usually:

```text
http://localhost:5173
```

## Production Build

Build the static app:

```bash
npm run build
```

Run the production server locally:

```bash
npm start
```

The production server listens on `PORT` or `8080` by default and serves:

- `dist/` static assets
- `/api/github-activity`
- `/_healthz`

## GitHub Activity Token

The browser never receives the GitHub PAT. The token is read only by the server-side endpoint.

Required environment variable:

```bash
GITHUB_ACTIVITY_TOKEN=...
```

For Cloud Run, store this token in Secret Manager as:

```text
github-activity-token
```

The deployment workflow maps it into Cloud Run as:

```text
GITHUB_ACTIVITY_TOKEN=github-activity-token:latest
```

## Cloud Run Deployment

The repository includes:

- `Dockerfile`
- `server.mjs`
- `.github/workflows/deploy-cloud-run.yml`

The workflow builds a Docker image, pushes it to Artifact Registry, and deploys it to Cloud Run.

### Required GitHub Secrets

Configure these in the GitHub repository:

| Secret | Purpose |
| --- | --- |
| `GCP_PROJECT_ID` | Google Cloud project ID |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | Workload Identity Federation provider |
| `GCP_SERVICE_ACCOUNT` | Deploy service account email |

### Required Google Cloud Resources

Create these before the first deployment:

```bash
gcloud artifacts repositories create portfolio \
  --repository-format=docker \
  --location=us-central1

gcloud secrets create github-activity-token \
  --replication-policy=automatic

printf "YOUR_GITHUB_PAT" | gcloud secrets versions add github-activity-token \
  --data-file=-
```

The service account used by GitHub Actions needs permissions to:

- push images to Artifact Registry,
- deploy Cloud Run services,
- read the `github-activity-token` secret,
- and act as the Cloud Run runtime service account.

## Versioning

The workflow deploys on:

- pushes to `main`,
- manual `workflow_dispatch`,
- semantic version tags like `v1.0.0`.

Recommended release flow:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Tagged releases produce versioned container images using the tag name. Untagged `main` deployments use a short SHA tag such as `sha-abc1234`.

## Important Files

| File | Purpose |
| --- | --- |
| `src/App.tsx` | Main portfolio content and layout |
| `src/TransformerHero.tsx` | Live Three.js Transformer attention demo |
| `src/App.css` | Responsive design system and section styling |
| `api/github-activity.js` | GitHub GraphQL activity fetcher |
| `server.mjs` | Cloud Run production server |
| `public/Sarrthak_Tripathi_Resume.pdf` | Downloadable resume |
| `.github/workflows/deploy-cloud-run.yml` | Cloud Run CI/CD workflow |

## License

This project is licensed under the MIT License. See `LICENSE`.
