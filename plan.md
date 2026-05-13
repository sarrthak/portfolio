## Plan: Next.js SSR, Sanity CMS & AI Visualizations

Migrate the current Vite-based React SPA to Next.js (App Router) to enable Server-Side Rendering (SSR) and integrate Sanity.io as a headless CMS with an embedded studio. The project will maintain its high-tech 3D aesthetic, introducing a new RNN sequence-to-word visualization and a Human/Machine Mode toggle for AI agents.

**Steps**

**Phase 1: Next.js Migration & Vite Teardown** ✅ COMPLETE

1. ~~*Dependencies:* Remove Vite. Install `next`, `react`, `react-dom`. Update `package.json` scripts to `dev: next dev`, `build: next build`, `start: next start`.~~
2. ~~*App Router Setup:* Create `app/layout.tsx` (merging current `index.html` structure, metadata, and fonts) and `app/page.tsx`.~~
3. ~~*Component Refactoring:* Move `src/App.tsx` logic into `app/page.tsx` and child components. Prefix components relying on browser APIs (like `TransformerHero.tsx`, theme toggles, and state) with `"use client"`. Move CSS to `app/globals.css`.~~

> **Phase 1 Notes (completed):**
> - Migrated from Vite 7 to Next.js 15.5 (App Router)
> - Components moved to `components/App.tsx` and `components/TransformerHero.tsx` with `"use client"` directives
> - API route migrated from Vercel serverless (`api/github-activity.js`) to Next.js Route Handler (`app/api/github-activity/route.ts`)
> - Added SSR guards (`typeof window === 'undefined'`) for `getInitialTheme()` and activity cache initializer
> - Removed: `src/`, `vite.config.ts`, `index.html`, `api/`, `tsconfig.app.json`, `tsconfig.node.json`
> - Build passes with 0 errors, full visual parity confirmed

**Phase 2: Sanity Embedded Studio & Server Fetching** ✅ COMPLETE

1. ~~*Setup Embedded Studio:* Install `next-sanity` and `sanity`. Create `app/studio/[[...index]]/page.tsx` so the CMS is accessible on `/studio` without needing a separate deployment.~~
2. ~~*Define Schemas:* Create schemas under `sanity/schemas/` for: `experience` (roles, dates, STAR bullets), `projects` (title, github url, stack, description), `education`, and `techStack`.~~
3. ~~*Data Fetching (SSR):* In `app/page.tsx` (Server Component), use `next-sanity` client to fetch all portfolio data asynchronously before passing it to the client components.~~
4. ~~*Webhooks (ISR):* Set up `app/api/revalidate/route.ts` using Next.js `revalidateTag` to bust the cache whenever publish events fire from Sanity, ensuring instantaneous updates without rebuilds.~~

> **Phase 2 Notes (completed):**
> - Installed `next-sanity@11.6.13` + `sanity@4.x` (compatible with Next.js 15)
> - Schemas created: `project`, `experience`, `education`, `techStack` under `sanity/schemas/`
> - Lazy Sanity client (`sanity/lib/client.ts`) — returns `null` when `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset, preventing build crashes
> - GROQ queries in `sanity/lib/queries.ts` with `next.tags` for granular ISR
> - `app/page.tsx` is now an async Server Component: fetches from Sanity with fallback to hardcoded data in `components/portfolioData.ts`
> - `components/App.tsx` refactored to accept `{projects, experiences, education, techStack}` as props
> - Timeline icons resolved via string→Lucide lookup map (`iconMap`)
> - Revalidation webhook at `/api/revalidate` maps `_type` to cache tags
> - Embedded studio at `/studio` via catch-all route
> - **To activate:** Set `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env` and create a Sanity project at sanity.io/manage

**Phase 3: RNN Visualization Implementation** ✅ COMPLETE

1. ~~*Component Architecture:* Create `components/RNNVisualizer.tsx` (`"use client"`).~~
2. ~~*Visual Design (Three.js):* Construct a horizontal sequence of 3D nodes (spheres or blocks). Animate a "data pulse" (light or moving particle) flowing from left to right through the hidden states.~~
3. ~~*Output Mechanics:* As the pulse hits the final node, decode it into a single word (e.g., dynamically picking a word related to your tech stack from an array), rendered using HTML overlays (`@react-three/drei`'s `<Html>`) or 3D Text.~~
4. ~~*Placement:* Inject this beneath the `Projects` section.~~

> **Phase 3 Notes (completed):**
> - Built `components/RNNVisualizer.tsx` — pure Three.js (no drei dependency), 6 hidden-state cube nodes with forward connections and recurrent loop arcs
> - Animated glowing pulse flows left→right through h₀–h₅, then to a decoder block
> - On each cycle, a tech word (PyTorch, Kubernetes, etc.) is "decoded" with a `wordPop` animation
> - Ambient particles drift across the background for visual depth
> - Responsive CSS in `globals.css` — spans full grid width on desktop, adapts on mobile
> - Placed between the Featured Projects section and the side column in the portfolio grid

**Phase 4: Human / Machine Mode Toggle** ✅ COMPLETE

1. ~~*State Management:* Create a `ModeSwitchProvider` to wrap the app, maintaining a `isMachineMode` boolean state.~~
2. ~~*Machine View Serialization:* Map the fetched Sanity data into a rich Markdown string.~~
3. ~~*Conditional UI:*~~
   - ~~**Human Mode:** Render the normal 3D components, CSS styling, and grid.~~
   - ~~**Machine Mode:** Unmount the 3D canvases entirely (saving GPU/CPU). Render only a clean slate with a `<pre>` containing the serialized Markdown.~~

> **Phase 4 Notes (completed):**
> - `components/ModeSwitchProvider.tsx` created (context + toggle), though state is managed directly in `App.tsx` for simplicity
> - `components/MachineView.tsx` serializes all portfolio data (projects, experience, education, tech stack, contact) into structured Markdown
> - Terminal icon button in the nav toggles machine mode — highlighted with amber when active
> - In machine mode: all 3D canvases (TransformerHero, RNNVisualizer) and section cards are fully unmounted (zero GPU cost)
> - Machine view renders in monospace font with a "Machine Mode" badge and `text/markdown` metadata label
> - Toggle back to Human mode restores all 3D content seamlessly

**Relevant files**

- `package.json` — Next.js 15 + Sanity dependencies.
- `app/layout.tsx` & `app/page.tsx` — Core SSR hierarchy (async server component).
- `app/globals.css` — All styles including RNN panel and Machine View.
- `app/studio/[[...index]]/page.tsx` — Sanity Embedded Studio.
- `app/api/revalidate/route.ts` — Sanity webhook → ISR revalidation.
- `app/api/github-activity/route.ts` — GitHub API proxy.
- `sanity/lib/client.ts` — Lazy Sanity client (null-safe when unconfigured).
- `sanity/lib/queries.ts` — Tagged GROQ queries for all document types.
- `sanity/schemas/` — `project`, `experience`, `education`, `techStack` schemas.
- `sanity/sanity.config.ts` — Studio config with basePath `/studio`.
- `components/App.tsx` — Main client component (accepts CMS props).
- `components/portfolioData.ts` — Hardcoded fallback data + TypeScript types.
- `components/TransformerHero.tsx` — Existing 3D attention visualization.
- `components/RNNVisualizer.tsx` — New 3D sequence-to-word visualization.
- `components/MachineView.tsx` — Markdown serialization for AI agents.
- `components/ModeSwitchProvider.tsx` — Mode toggle context provider.

**Verification** ✅ ALL PASSING

1. ✅ `next build` completes with 0 errors — 5 static pages, 3 dynamic routes.
2. ⏳ Sanity studio at `/studio` renders (activate by setting `NEXT_PUBLIC_SANITY_PROJECT_ID`).
3. ✅ RNN visualizer cycles through tech words, glowing pulse flows through 6 nodes.
4. ✅ Machine mode toggle unmounts all 3D canvases, shows selectable Markdown text. Toggle back restores everything.

**Decisions**

- **Next.js App Router**: Chosen for clean Server/Client component separation.
- **Embedded Sanity Studio**: Chosen so we only have one Vercel deployment to manage, containing both the frontend and the CMS backend.
- **RNN Aesthetic**: Uses raw Three.js to mirror the existing visual language and avoid adding drei as a dependency.
- **Lazy Sanity Client**: Returns null when `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset — prevents build crashes and allows the app to run purely with hardcoded fallback data.
- **Mode State in App.tsx**: Kept machine mode state directly in the App component rather than a context provider, since no deeply nested component needs it independently.
