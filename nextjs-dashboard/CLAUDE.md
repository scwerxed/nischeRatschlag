# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm start        # Run production server
pnpm lint         # Run ESLint
```

No test suite is configured.

**Known build issue**: `pnpm build` fails on the `/seed` route because `bcrypt`'s native binary is not compiled for the current platform. This is a pre-existing issue unrelated to app logic — the dev server and all other routes work fine. TypeScript compiles successfully.

## Architecture

This is a **Next.js 16 App Router** travel/tourism guide website for Carinthia (Kärnten), Austria. Content is in German.

### Data sources

- **Blog posts**: Hardcoded array in [app/lib/posts.ts](app/lib/posts.ts) (33 posts). Each post has slug, title, category, difficulty, content (custom markdown-like format), and affiliate links.
- **Regions**: Defined in [app/lib/regionen.ts](app/lib/regionen.ts). Only Kärnten is active; 8 others are stubs.
- **PostgreSQL**: `postgres` library with raw parameterized SQL in [app/lib/data.ts](app/lib/data.ts). Types defined in [app/lib/definitions.ts](app/lib/definitions.ts). DB can be seeded via `/seed` route.

### Routing

| Route | Type | Notes |
|---|---|---|
| `/` | Server Component | Hero slideshow, region selector, featured posts |
| `/blog` | Server Component | Grid of all blog posts |
| `/blog/[slug]` | SSG | `generateStaticParams` from posts array; custom markdown renderer with `**bold**` and `---` support |
| `/regionen/[bundesland]` | SSG | `generateStaticParams` from regionen array |
| `/karte` | Client (dynamic import) | Leaflet map + OpenStreetMap + Waymarked Trails overlay + Overpass API for peaks |
| `/routenplaner` | Client (dynamic import) | Interactive route planner using OpenRouteService; saves to `localStorage` |
| `/api/seed` | Route handler | One-time DB seed endpoint |

### Map/interactive components

Leaflet and route-planner components are wrapped in two layers: a `*-wrapper.tsx` **Client Component** (`'use client'`) that uses `next/dynamic` with `ssr: false`, and a `*-client.tsx` Client Component with the actual logic.

**Important**: In Next.js 16 (Turbopack), `ssr: false` in `next/dynamic` is NOT allowed in Server Components — the wrapper must be a Client Component. The Leaflet CSS (`leaflet/dist/leaflet.css`) is imported in the wrapper, not in the client component, because Turbopack does not reliably extract CSS from dynamically-loaded modules.

External APIs used by these components:
- **Overpass API** — peak/mountain data
- **Waymarked Trails** — hiking trail tile overlay
- **OpenRouteService** — route calculation (`NEXT_PUBLIC_ORS_API_KEY` in env)

### Content rendering

Blog post content is a plain string in each post object. [app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx) parses it manually:
- `## ` → `<h2>` (with green border-bottom)
- `### ` → `<h3>`
- `- ` → styled list items with a green checkmark
- `**text**` → `<strong>` (bold inline)
- `---` → `<hr>` separator
- Plain lines → `<p>`

No external markdown library is used.

### Environment variables

See `.env.example`. Key vars:
- `POSTGRES_URL` — primary DB connection string
- `NEXT_PUBLIC_ORS_API_KEY` — OpenRouteService (exposed to client)
- `AUTH_SECRET` / `AUTH_URL` — NextAuth v5 (beta)

### Styling

Tailwind CSS 3.4. Primary brand color is green (`green-600` / `#16a34a`). Responsive layouts use `md:` and `lg:` breakpoints.

### Dependencies

- `leaflet` + `@types/leaflet` — interactive maps
- `postgres` — raw SQL queries
- `next-auth` v5 (beta) — authentication
