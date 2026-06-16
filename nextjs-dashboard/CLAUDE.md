# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm start        # Run production server
pnpm lint         # ESLint (flat config, eslint.config.mjs → next/core-web-vitals + next/typescript)
```

No test suite is configured. ESLint uses the flat-config setup (`eslint.config.mjs`); run `pnpm install` after pulling if `eslint`/`eslint-config-next` aren't installed yet.

## Deployment

- **Live on Vercel** at `https://www.bergseen-guide.com` (primary domain is **www**; the apex `bergseen-guide.com` 308-redirects to www). Domain registered at world4you (A `@` → `216.198.79.1`, CNAME `www` → vercel-dns).
- `NEXT_PUBLIC_SITE_URL` should be `https://www.bergseen-guide.com` (fallbacks in `seo.ts`/`sitemap.ts`/`robots.ts` already point there).
- Google Search Console verified (HTML file `public/google748e248ac86b336e.html`); sitemap submitted.
- AdSense (`ca-pub-4474617795810442`) + GetYourGuide partner (`CTZDZJB`) + Amazon tag (`nischeratschl-21`) are live. booking.com `aid` is still the placeholder `0000000` — `appendPartnerTag` (affiliate.ts) detects placeholder IDs and skips them, so booking links currently redirect cleanly without an affiliate tag until a real `aid` is set.
- **Consent (DSGVO)**: [app/layout.tsx](app/layout.tsx) ships Google **Consent Mode v2** defaults (`denied`) inline, before `adsbygoogle.js`. ⚠️ **Dashboard action still required:** enable the GDPR consent message in AdSense → *Privacy & messaging* so Google's certified CMP shows the banner and flips consent. Until then, EU/EEA visitors only get non-personalized ads.

### ⚠️ FUTURE: migrate to Cloudflare Pages when monetization grows
Vercel's free **Hobby** plan is officially **non-commercial**. This site runs AdSense + affiliate links (= commercial), so technically it needs Vercel **Pro ($20/mo)**. No surprise billing on Hobby — it throttles/pauses instead. **Plan:** once real revenue comes in (or Vercel asks to upgrade), migrate to **Cloudflare Pages** — its free tier explicitly allows commercial use and is very generous. Migration is ~1h (Next.js works via the Cloudflare adapter). The user explicitly asked to keep this note for the future.

## Architecture

This is a **Next.js 16 App Router** travel/tourism guide website for **Austria**, in German. Long-term focus is **DACH** (Austria first; Germany & Switzerland planned). All content is currently static — there is no database or authentication.

### Data sources

- **Blog posts**: Hardcoded array in [app/lib/posts.ts](app/lib/posts.ts) (~126 posts). Each post has slug, title, category, difficulty, region, content (custom markdown-like format), affiliate links, and optional `trails` (predefined hiking routes with `[lat,lng]` coordinate arrays).
- **Regions**: Defined in [app/lib/regionen.ts](app/lib/regionen.ts). 5 active (Kärnten, Salzburg, Tirol, Steiermark, Burgenland); 4 stubs (Wien, Oberösterreich, Niederösterreich, Vorarlberg).
- **Region SEO metadata**: [app/lib/seo.ts](app/lib/seo.ts) → `REGION_META` (name, geo, keywords per region) + `regionName()`. Structured data & metadata are region-aware (no longer hardcoded to Kärnten). Add DE/CH regions here when expanding.
- **Accommodations**: [app/lib/unterkuenfte.ts](app/lib/unterkuenfte.ts) — accommodations shown as affiliate pins on the map (lat/lng, type, price, booking URL). Currently Kärnten only.
- **Region FAQs**: [app/lib/faqs.ts](app/lib/faqs.ts) → `FAQS_BY_REGION` (powers the FAQ accordion + FAQPage rich snippets).

### Affiliate system

All outbound partner links route through our own domain via [app/lib/affiliate.ts](app/lib/affiliate.ts) + the [app/go/route.ts](app/go/route.ts) redirect handler:
- `cloak(url)` wraps any partner URL into `/go?u=<encoded>`.
- `/go` validates the target host against an allowlist (no open redirect), appends our partner tags (`appendPartnerTag`), then 302-redirects.
- Partner IDs live in `PARTNER_IDS` (Amazon tag, booking.com aid) — replace placeholders with real IDs.
- Blog post affiliate links and map accommodation popups all go through `cloak()`. The strategy is to keep visitors on our map (where accommodation affiliate pins live) rather than linking out directly.

### Routing

| Route | Type | Notes |
|---|---|---|
| `/` | Server Component | Hero slideshow, stats band, popular-destination region cards + selector, latest posts (sorted by date), live lake weather, map CTA, newsletter |
| `/blog` | Server Component | Grid of all blog posts |
| `/blog/[slug]` | SSG | `generateStaticParams` from posts array; custom markdown renderer with `**bold**` and `---` support |
| `/regionen/[bundesland]` | SSG | `generateStaticParams` from regionen array |
| `/karte` | Client (dynamic import) | Leaflet map; toggleable layers (OSM/OpenTopoMap base, Waymarked Trails overlay, Overpass peaks, accommodation affiliate pins); custom control panel |
| `/routenplaner` | Client (dynamic import) | Interactive route planner via BRouter (proxied through `/api/brouter`, which snaps waypoints to nearest trail via Overpass); elevation profile + difficulty; saves to `localStorage` |
| `/blog/[slug]` (hiking) | — | Hiking posts with `trails` render a `TrailMap` (OpenTopoMap) where users pick a predefined route |
| `/go` | Route handler | Affiliate redirect with host allowlist + partner-tag injection |
| `/api/brouter` | Route handler | Proxies BRouter (CORS) + snaps waypoints to nearest hiking trail via Overpass |

### Map/interactive components

Leaflet-based features (`map`, `routenplaner`, `trail-map`) are each wrapped in two layers: a `*-wrapper.tsx` **Client Component** (`'use client'`) that uses `next/dynamic` with `ssr: false`, and a `*-client.tsx` Client Component with the actual logic.

**Important**: In Next.js 16 (Turbopack), `ssr: false` in `next/dynamic` is NOT allowed in Server Components — the wrapper must be a Client Component. The Leaflet CSS (`leaflet/dist/leaflet.css`) is imported in the wrapper, not in the client component, because Turbopack does not reliably extract CSS from dynamically-loaded modules.

External APIs used by these components:
- **Overpass API** — peak/mountain data + waypoint-to-trail snapping
- **Waymarked Trails** — hiking trail tile overlay
- **BRouter** — route calculation (keyless, proxied via `/api/brouter`). OpenRouteService (`NEXT_PUBLIC_ORS_API_KEY`) is legacy and no longer used.

### Content rendering

Blog post content is a plain string in each post object. [app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx) parses it manually:
- `## ` → `<h2>` (with green border-bottom)
- `### ` → `<h3>`
- `- ` → styled list items with a green checkmark
- `**text**` → `<strong>` (bold inline)
- `[text](url)` → link (internal `/...` via `next/link`, external as `<a target="_blank" rel="noopener noreferrer">`)
- `---` → `<hr>` separator
- Plain lines → `<p>`

No external markdown library is used.

### SEO & engagement features

- **Sitemap / robots**: [app/sitemap.ts](app/sitemap.ts) (posts + regions + static pages) and [app/robots.ts](app/robots.ts) (disallows `/go`, `/api/`; also hard-blocks AI/scraper bots). Both use `NEXT_PUBLIC_SITE_URL`.
- **Structured data (JSON-LD)**: region-aware via `REGION_META`. Blog posts emit `Article` (with `image` = the auto-generated 1200×630 OG image) + `BreadcrumbList` (+ `SportsActivityLocation` for hiking), tagged with the post's actual region. Region pages emit `FAQPage` for any region with FAQs; Kärnten additionally emits `TouristDestination`.
- **OpenGraph/Twitter**: `metadataBase` in the root layout; per-post OG in `generateMetadata`.
- **Blog list** ([app/ui/blog-search.tsx](app/ui/blog-search.tsx)): client-side text search + category filter.
- **Blog post add-ons**: reading time, share buttons ([app/ui/share-buttons.tsx](app/ui/share-buttons.tsx)), related posts (scored by category/difficulty/season via [app/lib/blog-utils.ts](app/lib/blog-utils.ts)).
- **Home add-ons**: live lake-weather widget across popular Austrian lakes ([app/ui/seewetter.tsx](app/ui/seewetter.tsx), Open-Meteo, no key), quick-stats, region cards, map-feature grid.
- **Newsletter** ([app/ui/newsletter.tsx](app/ui/newsletter.tsx)): **pre-launch / not functional** — no backend, email only saved to `localStorage`. Copy is intentionally honest ("in Vorbereitung"). Wire up a provider (Brevo/MailerLite) with double-opt-in before promising delivery.
- **Global**: scroll-to-top button in the layout.
- **FAQ accordion**: [app/ui/faq.tsx](app/ui/faq.tsx).
- **Bot / geo blocking**: [middleware.ts](middleware.ts) returns HTTP 403 for AI/scraper/SEO crawlers (by User-Agent) and for visitors from CN/RU/HK (`x-vercel-ip-country`). Search/ad crawlers (Google, Bing, AdSense) are explicitly allowed.

External APIs (all keyless): **BRouter** (routing), **Overpass** (peaks + trail snapping), **Waymarked Trails** (tiles), **OpenTopoMap** (topo tiles), **Open-Meteo** (weather).

### Environment variables

Only one var actually matters now:
- `NEXT_PUBLIC_SITE_URL` — production domain for sitemap/robots/canonical/OG (should be `https://www.bergseen-guide.com`)
- Affiliate partner IDs live in code ([app/lib/affiliate.ts](app/lib/affiliate.ts) → `PARTNER_IDS`), not env

### Styling

Tailwind CSS 3.4 with a **custom forest-green palette** (overrides Tailwind's default green in [tailwind.config.ts](tailwind.config.ts) — `green-600` = `#2f6b54`, `green-700` = `#255744`) plus a warm `sand` accent. Primary brand color is green-600/700. Responsive layouts use `md:` and `lg:` breakpoints.

### Dependencies

- `leaflet` + `@types/leaflet` — interactive maps
- `@vercel/analytics` + `@vercel/speed-insights` — visitor stats & load-time metrics (mounted in the root layout)
- `tailwindcss` 3.4 + `@tailwindcss/forms`
- `eslint` + `eslint-config-next` + `@eslint/eslintrc` — linting (dev)

`next`/`react`/`react-dom` are pinned to exact versions (16.2.7 / 19.2.7) for reproducible builds — bump deliberately, not via `latest`.
