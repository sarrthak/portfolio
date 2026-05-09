# Sarrthak Portfolio

This repository contains Sarrthak Tripathi's recruiter-focused portfolio site. It is a Vite + React + TypeScript application with a live Three.js Transformer hero, featured AI projects, professional STAR-method experience, live GitHub activity, resume download, and a contact section.

The site is designed so hiring teams can quickly understand:

- what Sarrthak has built,
- which technical decisions mattered,
- what each project achieved,
- which stack he can work across,
- and how to contact him.

## Highlights

- **Live Transformer hero:** a Three.js text-token Transformer visualization that computes toy attention in the browser, updates softmax weights, and shows a decoder-style next-word prediction.
- **Featured projects:** Noteboard.ai and News-Tracking-Cloudfare are presented as recruiter-readable case studies with architecture notes and stack purpose.
- **Live GitHub activity:** `/api/github-activity` reads authenticated GitHub contribution data through a Vercel serverless function, keeping private contribution access out of the browser.
- **Professional timeline:** work experience is written in STAR format using the resume and Optum proof-of-work document.
- **Tech stack table:** grouped by Languages, AI/ML, Frontend, Backend, and DevOps.
- **Contact form:** opens the user's mail client with fields for name, email, subject, and message.
- **Vercel deployment:** the project is connected to Vercel for production deploys from GitHub.

## Stack

| Area | Tools |
| --- | --- |
| Frontend | React, Vite, TypeScript, Commit Mono, Lucide Icons |
| 3D / Motion | Three.js |
| Serverless API | Vercel Functions |
| AI Portfolio Content | LangGraph, Neo4j, Redis, Gemma 4, Next.js, Cloudflare Workers, Vectorize |
| Deployment | Vercel, GitHub |

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

Preview the built app locally:

```bash
npm run preview
```

## GitHub Activity Token

The browser never receives the GitHub PAT. The token is read only by the serverless endpoint in `api/github-activity.js`.

Required environment variable:

```bash
GITHUB_ACTIVITY_TOKEN=...
```

In Vercel, configure this variable for Production:

```text
GITHUB_ACTIVITY_TOKEN
```

## Vercel Deployment

The project is linked to Vercel as:

```text
sarrthaks-projects/portfolio
```

Important deployment files:

- `vercel.json`
- `api/github-activity.js`
- `package.json`

Vercel uses:

- build command: `npm run build`
- output directory: `dist`
- framework: `vite`

## Custom Domain

The Vercel project has these domains attached:

```text
sarrthak.tech
www.sarrthak.tech
```

Set DNS records at the domain provider:

```text
Type   Host   Value
A      @      76.76.21.21
A      www    76.76.21.21
```

After DNS propagation, Vercel verifies the domain and issues SSL automatically.

## Important Files

| File | Purpose |
| --- | --- |
| `src/App.tsx` | Main portfolio content and layout |
| `src/TransformerHero.tsx` | Live Three.js Transformer attention demo |
| `src/App.css` | Responsive design system and section styling |
| `api/github-activity.js` | GitHub GraphQL activity fetcher for Vercel Functions |
| `public/Sarrthak_Tripathi_Resume.pdf` | Downloadable resume |
| `public/favicon/` | Browser and PWA favicon assets |
| `vercel.json` | Vercel build configuration |

## License

This project is licensed under the MIT License. See `LICENSE`.
