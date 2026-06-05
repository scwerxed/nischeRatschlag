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

- **Blog posts**: Hardcoded array in [app/lib/posts.ts](app/lib/posts.ts) (33 posts). Each post has slug, title, category, difficulty, content (custom markdown-like format), affiliate links, and optional `trails` (predefined hiking routes with `[lat,lng]` coordinate arrays).
- **Regions**: Defined in [app/lib/regionen.ts](app/lib/regionen.ts). Only Kärnten is active; 8 others are stubs.
- **Accommodations**: [app/lib/unterkuenfte.ts](app/lib/unterkuenfte.ts) — accommodations shown as affiliate pins on the map (lat/lng, type, price, booking URL).
- **PostgreSQL**: `postgres` library with raw parameterized SQL in [app/lib/data.ts](app/lib/data.ts). Types defined in [app/lib/definitions.ts](app/lib/definitions.ts). DB can be seeded via `/seed` route.

### Affiliate system

All outbound partner links route through our own domain via [app/lib/affiliate.ts](app/lib/affiliate.ts) + the [app/go/route.ts](app/go/route.ts) redirect handler:
- `cloak(url)` wraps any partner URL into `/go?u=<encoded>`.
- `/go` validates the target host against an allowlist (no open redirect), appends our partner tags (`appendPartnerTag`), then 302-redirects.
- Partner IDs live in `PARTNER_IDS` (Amazon tag, booking.com aid) — replace placeholders with real IDs.
- Blog post affiliate links and map accommodation popups all go through `cloak()`. The strategy is to keep visitors on our map (where accommodation affiliate pins live) rather than linking out directly.

### Routing

| Route | Type | Notes |
|---|---|---|
| `/` | Server Component | Hero slideshow, region selector, featured posts |
| `/blog` | Server Component | Grid of all blog posts |
| `/blog/[slug]` | SSG | `generateStaticParams` from posts array; custom markdown renderer with `**bold**` and `---` support |
| `/regionen/[bundesland]` | SSG | `generateStaticParams` from regionen array |
| `/karte` | Client (dynamic import) | Leaflet map; toggleable layers (OSM/OpenTopoMap base, Waymarked Trails overlay, Overpass peaks, accommodation affiliate pins); custom control panel |
| `/routenplaner` | Client (dynamic import) | Interactive route planner via BRouter (proxied through `/api/brouter`, which snaps waypoints to nearest trail via Overpass); elevation profile + difficulty; saves to `localStorage` |
| `/blog/[slug]` (hiking) | — | Hiking posts with `trails` render a `TrailMap` (OpenTopoMap) where users pick a predefined route |
| `/go` | Route handler | Affiliate redirect with host allowlist + partner-tag injection |
| `/api/brouter` | Route handler | Proxies BRouter (CORS) + snaps waypoints to nearest hiking trail via Overpass |
| `/api/seed` | Route handler | One-time DB seed endpoint |

### Map/interactive components

Leaflet-based features (`map`, `routenplaner`, `trail-map`) are each wrapped in two layers: a `*-wrapper.tsx` **Client Component** (`'use client'`) that uses `next/dynamic` with `ssr: false`, and a `*-client.tsx` Client Component with the actual logic.

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

### SEO & engagement features

- **Sitemap / robots**: [app/sitemap.ts](app/sitemap.ts) (posts + regions + static pages) and [app/robots.ts](app/robots.ts) (disallows `/go`, `/api/`, `/seed`). Both use `NEXT_PUBLIC_SITE_URL`.
- **Structured data (JSON-LD)**: blog posts emit `Article` + `BreadcrumbList`; the Kärnten region page emits an `FAQPage` (rich snippets).
- **OpenGraph/Twitter**: `metadataBase` in the root layout; per-post OG in `generateMetadata`.
- **Blog list** ([app/ui/blog-search.tsx](app/ui/blog-search.tsx)): client-side text search + category filter.
- **Blog post add-ons**: reading time, share buttons ([app/ui/share-buttons.tsx](app/ui/share-buttons.tsx)), related posts (scored by category/difficulty/season via [app/lib/blog-utils.ts](app/lib/blog-utils.ts)).
- **Home add-ons**: live lake weather widget ([app/ui/seewetter.tsx](app/ui/seewetter.tsx), Open-Meteo, no key), newsletter signup, quick-stats, map-feature grid.
- **Global**: scroll-to-top button in the layout.
- **FAQ accordion**: [app/ui/faq.tsx](app/ui/faq.tsx).

External APIs (all keyless): **BRouter** (routing), **Overpass** (peaks + trail snapping), **Waymarked Trails** (tiles), **OpenTopoMap** (topo tiles), **Open-Meteo** (weather).

### Environment variables

See `.env.example`. Key vars:
- `POSTGRES_URL` — primary DB connection string
- `NEXT_PUBLIC_SITE_URL` — production domain for sitemap/robots/canonical/OG
- `NEXT_PUBLIC_ORS_API_KEY` — OpenRouteService (legacy; routenplaner now uses keyless BRouter)
- `AUTH_SECRET` / `AUTH_URL` — NextAuth v5 (beta)
- Affiliate partner IDs live in code ([app/lib/affiliate.ts](app/lib/affiliate.ts) → `PARTNER_IDS`), not env

### Styling

Tailwind CSS 3.4. Primary brand color is green (`green-600` / `#16a34a`). Responsive layouts use `md:` and `lg:` breakpoints.

### Dependencies

- `leaflet` + `@types/leaflet` — interactive maps
- `postgres` — raw SQL queries
- `next-auth` v5 (beta) — authentication
