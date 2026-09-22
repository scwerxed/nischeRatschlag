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
- ⚠️ **Lockfile / [vercel.json](vercel.json)**: `package.json` (pinned versions + ESLint) is currently **out of sync** with `pnpm-lock.yaml`, because there's no local pnpm to regenerate it. `vercel.json` sets `installCommand: pnpm install --no-frozen-lockfile` so Vercel builds don't fail on the mismatch. **Proper cleanup once pnpm is available locally:** run `pnpm install` (regenerates + commits the lockfile), then delete `vercel.json` to restore frozen-lockfile builds.
- Google Search Console verified (HTML file `public/google748e248ac86b336e.html`); sitemap submitted.
- AdSense (`ca-pub-4474617795810442`) + GetYourGuide partner (`CTZDZJB`) + Amazon tag (`nischeratschl-21`) are live. booking.com `aid` is still the placeholder `0000000` — `appendPartnerTag` (affiliate.ts) detects placeholder IDs and skips them, so booking links currently redirect cleanly without an affiliate tag until a real `aid` is set.
- **Consent (DSGVO)**: [app/layout.tsx](app/layout.tsx) ships Google **Consent Mode v2** defaults (`denied`) inline, before `adsbygoogle.js`. ⚠️ **Dashboard action still required:** enable the GDPR consent message in AdSense → *Privacy & messaging* so Google's certified CMP shows the banner and flips consent. Until then, EU/EEA visitors only get non-personalized ads.

### ⚠️ FUTURE: migrate to Cloudflare Pages when monetization grows
Vercel's free **Hobby** plan is officially **non-commercial**. This site runs AdSense + affiliate links (= commercial), so technically it needs Vercel **Pro ($20/mo)**. No surprise billing on Hobby — it throttles/pauses instead. **Plan:** once real revenue comes in (or Vercel asks to upgrade), migrate to **Cloudflare Pages** — its free tier explicitly allows commercial use and is very generous. Migration is ~1h (Next.js works via the Cloudflare adapter). The user explicitly asked to keep this note for the future.

## Architecture

This is a **Next.js 16 App Router** travel/tourism guide website for **Austria**, in German. Long-term focus is **DACH** (Austria first; Germany & Switzerland planned). All content is currently static — there is no database or authentication.

### Data sources

- **Blog posts**: Hardcoded array in [app/lib/posts.ts](app/lib/posts.ts) (~185 posts). Each post has slug, title, category, difficulty, region, content (custom markdown-like format), affiliate links, and optional `trails` (predefined hiking routes with `[lat,lng]` coordinate arrays), `startCoords` (map deep-link anchor) and `startPoint` (parking/arrival details → "Startpunkt & Parken" sidebar card with a Google-Maps navigation link; ~12 flagship posts so far).
- **Regions**: Defined in [app/lib/regionen.ts](app/lib/regionen.ts). All **9 Austrian Bundesländer** are active (Kärnten, Salzburg, Tirol, Steiermark, Burgenland, Wien, Oberösterreich, Niederösterreich, Vorarlberg) — each with REGION_META, REGION_CONTENT, FAQs, accommodations and articles.
- **Region SEO metadata**: [app/lib/seo.ts](app/lib/seo.ts) → `REGION_META` (name, geo, keywords per region) + `regionName()`. Structured data & metadata are region-aware (no longer hardcoded to Kärnten). Add DE/CH regions here when expanding.
- **Region page content**: [app/lib/regionen-content.ts](app/lib/regionen-content.ts) → `REGION_CONTENT` (intro box, best-season tips, attractions per region). Powers the region-page intro, the "Beste Reisezeit" grid and the `TouristDestination` schema for **all** active regions.
- **Accommodations**: [app/lib/unterkuenfte.ts](app/lib/unterkuenfte.ts) — affiliate accommodations (lat/lng, type, price, booking URL, `region`). Shown as pins on the map **and** as affiliate cards on each region page (filtered by `region`). Covers all 9 Bundesländer.
- **Region FAQs**: [app/lib/faqs.ts](app/lib/faqs.ts) → `FAQS_BY_REGION` (powers the FAQ accordion + FAQPage rich snippets).
- **Themenseiten-Picks**: [app/lib/themen-picks.ts](app/lib/themen-picks.ts) holds the curated slug lists of the inline-data landing pages (`HITZE_GROUPS`, `REGEN_GROUPS`, `AUSSICHT_GROUPS`, `DAUER_GROUPS`, `BAHNHOF_GROUPS`, `FEIERABEND_CITIES`, `SONNENUNTERGANG_GROUPS`). The pages import them (`import { X as GROUPS }`); keeping the data out of `page.tsx` is what lets the reverse index below read it too. Newer theme pages should put their data here from the start.

### Affiliate system

All outbound partner links route through our own domain via [app/lib/affiliate.ts](app/lib/affiliate.ts) + the [app/go/route.ts](app/go/route.ts) redirect handler:
- `cloak(url)` wraps any partner URL into `/go?u=<encoded>`.
- `/go` validates the target host against an allowlist (no open redirect), appends our partner tags (`appendPartnerTag`), tracks an `affiliate_click` custom event (Vercel Analytics, server-side, non-blocking), then 302-redirects.
- Partner IDs live in `PARTNER_IDS` (Amazon tag, booking.com aid) — replace placeholders with real IDs.
- Blog post affiliate links and map accommodation popups all go through `cloak()`. The strategy is to keep visitors on our map (where accommodation affiliate pins live) rather than linking out directly.

### Routing

| Route | Type | Notes |
|---|---|---|
| `/` | Server Component | Hero slideshow, stats band, popular-destination region cards + selector, latest posts (sorted by date), live lake weather, map CTA, newsletter |
| `/blog` | Server Component | Grid of all blog posts |
| `/blog/[slug]` | SSG | `generateStaticParams` from posts array; custom markdown renderer with `**bold**` and `---` support |
| `/regionen/[bundesland]` | SSG | `generateStaticParams` from regionen array |
| `/wochenendtrip` + `/wochenendtrip/[stadt]` | SSG | „Wochenendtrip ab Wien/Graz/Salzburg/Linz/Innsbruck/Klagenfurt" – bündelt Posts nach Luftlinie zur Startstadt in Fahrzeit-Buckets (`app/lib/wochenendtrip.ts`, nutzt `post.startCoords`). Hub + Stadt-Seiten, `ItemList`+`BreadcrumbList`-JSON-LD |
| `/wandern-baden` | SSG | Sommer-Landingpage: kombiniert je Region Wanderungen mit dem nächstgelegenen Badeziel (≤25 km Luftlinie, `app/lib/wandern-baden.ts`) + Live-Seewetter-Widget. `ItemList`+`BreadcrumbList`-JSON-LD |
| `/hitzefreundliche-ausfluege` | SSG | Kuratierte kühle Ziele für Hitzetage (Klammen/Höhlen, Höhenluft, Wasser) mit „Kühl-Faktor"-Notizen; Daten inline in der Page |
| `/aussicht-ohne-anstrengung` | SSG | „Viel Aussicht, wenig Höhenmeter" in 4 Gruppen (Seilbahnen, Panoramastraßen, Aussichtstürme, kurze Wege) mit „Warum leicht"-Notiz je Ziel; Daten inline in der Page |
| `/regentaugliche-ausfluege` | SSG | Schlechtwetter-Plan-B in 6 Gruppen (Thermen, Höhlen/Bergwerke, Burgen/Stifte, Familien-Erlebniswelten, Städte, Klammen bei Regen) mit „Bei Regen"-Notiz je Ziel; Daten inline in der Page |
| `/beste-ausfluege` + `/beste-ausfluege/[monat]` | SSG | Monats-Seiten für alle 12 Monate mit kuratierten Picks + „Warum jetzt?" (`app/lib/monatstipps.ts`) |
| `/ausflugsplaner` | SSG | Übersichts-Hub: bündelt alle Themenseiten (Wetter, Zeit, Seen, Monat, Anreise/Karte) gruppiert mit Kurzbeschreibung + Link. Zentrale Landingpage, damit die wachsende Zahl an Themenseiten auffindbar bleibt statt nur im Footer zu stehen; von dort und aus den Themenseiten selbst querverlinkt |
| `/seen-vergleich/[thema]` | SSG | Seen-Entscheidungsseiten (ruhige-seen, familienseen, seen-mit-wanderung, warme-seen, seen-mit-wassersport) aus `app/lib/seen.ts` (23 LAKES mit Tags; auch von /seen-vergleich genutzt). Neues Thema = neuer `SEE_THEMEN`-Eintrag mit passendem `LakeTag` |
| `/ausfluege-nach-dauer` | SSG | Zeitfenster-Planer (unter 2 Std. / halber Tag / ganzer Tag / Wochenende), kuratierte Picks mit realistischer Dauer; Daten inline |
| `/bahnhofsausfluege` | SSG | Öffi-Ziele in 3 Gruppen (direkt an der Bahn / Bahn+Schiff/Bus / Stadt&U-Bahn) mit Anreise-Hinweis je Ziel; Daten inline |
| `/feierabend-ausfluege` | SSG | After-Work-Ziele ab Wien/Graz/Salzburg (≤ ~45 Min. Anfahrt, abendtauglich) mit Abend-Hinweis; Daten inline |
| `/sonnenuntergang-spots` | SSG | Golden-Hour-Ziele in 3 Gruppen (Bergblick, Seen mit Spiegelung, Türme/Straßen/Städte) mit „Warum"-Notiz je Ziel + genereller Rückweg-Hinweisbox (letzte Bahn, Stirnlampe, Sonnenuntergangszeit); Daten in `app/lib/themen-picks.ts` (`SONNENUNTERGANG_GROUPS`) |
| `/zwei-ausfluege-an-einem-tag` | SSG | Tagesplaner: kombiniert je Region bis zu 4 Paare aus zwei nah beieinander liegenden (≤15 km Luftlinie über `startCoords`/`trails`, analog `/wandern-baden`) halbtagstauglichen Zielen für Vormittag+Nachmittag (`app/lib/tagescombo.ts`). Anspruchsvolle Wanderungen (`difficulty` mittel/schwer) und Unterkünfte sind ausgeschlossen. `ItemList`+`BreadcrumbList`-JSON-LD |
| `/badeplaetze` | SSG + Client-Filter | Badeplatz-Check: konkrete Badeplätze mit filterbaren Eigenschaften (gratis/Schatten/flach/WC/Gastro/nach Wanderung/Hund) aus `app/lib/badeplaetze.ts`; Filter-UI in `app/ui/badeplatz-filter.tsx` |
| `/unterkuenfte/am-see` | SSG | Affiliate-Landingpage: Hotels/Ferienwohnungen/Camping mit direkter Lage an einem Badesee, nach Bundesland gruppiert. `unterkuenfteAmSee()` (`app/lib/unterkuenfte.ts`) filtert `unterkuenfte` über eine Whitelist echter Seenamen (`BADESEE_NAMEN`, grenzt Flüsse/Täler/Berge/Thermen im `see`-Feld aus); `lakeSlugFor()` verlinkt optional zum passenden `/blog`-Artikel aus `LAKES` (`app/lib/seen.ts`). `ItemList`+`BreadcrumbList`-JSON-LD |
| `/karte` | Client (dynamic import) | Leaflet map (Popup-HTML wird ueber `escapeHtml()` in `map-client.tsx` abgesichert — betrifft den `?name=`-Deep-Link-Parameter und die frei editierbaren OpenStreetMap-Gipfel-Tags); toggleable layers (OSM/OpenTopoMap base, Waymarked Trails overlay, Overpass peaks, accommodation affiliate pins); custom control panel. **Deep links**: `?lat=&lng=&zoom=&name=` centers the map + drops a "Startpunkt" marker (used by the "Startpunkt auf Karte öffnen" CTA on articles) |
| `/routenplaner` | Client (dynamic import) | Interactive route planner via BRouter (proxied through `/api/brouter`, which snaps waypoints to nearest trail via Overpass); elevation profile + difficulty; saves to `localStorage` |
| `/blog/[slug]` (hiking) | — | Hiking posts with `trails` render a `TrailMap` (OpenTopoMap) where users pick a predefined route. Posts with `routeVariants` render a "Kurz oder lang?" variant list; posts with `planningMistakes` render a red "Schlecht geplant, wenn …" warning box (fehler → besser) |
| `/go` | Route handler | Affiliate redirect with host allowlist + partner-tag injection |
| `/newsletter/bestaetigt` | SSG | Landing page for the newsletter double-opt-in link (noindex, not in the sitemap) |
| `/api/newsletter` | Route handler | POST `{ email }` → Brevo double-opt-in. Same-origin Referer check + per-IP rate limit (5/min); 503 while the Brevo env vars are unset |
| `/api/brouter` | Route handler | Proxies BRouter (CORS) + snaps waypoints to nearest hiking trail via Overpass. Guarded against abuse: same-origin Referer check, in-memory per-IP rate limit (30/min), **strikte Wegpunkt-Validierung** (`parseLonLats`: 2–12 Punkte, endliche Zahlen, Bounding-Box Oesterreich, Roh-String max. 400 Zeichen — ohne Obergrenze koennte eine Anfrage tausende parallele Overpass-Calls ausloesen) und eine **auf das Noetige gekuerzte Antwort** (nur `geometry.coordinates` + die drei vom Routenplaner gelesenen `properties`, statt der kompletten BRouter-Nutzlast) |
| `/api/seewetter` | Route handler | Proxies the Kärnten Hydrographischer Dienst live lake-water-temperature feed (CORS — the source sends no CORS headers, so the client can't call it directly). 15-min `fetch` cache (`next.revalidate`) + same-origin Referer check + in-memory per-IP rate limit (60/min), same pattern as `/api/brouter` |

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
- **Structured data (JSON-LD)**: region-aware via `REGION_META`. Blog posts emit `Article` (with `image` = the auto-generated 1200×630 OG image) + `BreadcrumbList`, tagged with the post's actual region. Hiking posts: those **without** predefined routes emit `sportsActivitySchema` (`SportsActivityLocation`); those **with** `trails` emit one `trailRouteSchema` per trail (`SportsActivityLocation` with a `GeoShape` line of the route + `PropertyValue`s for Distanz/Gehzeit/Aufstieg/Schwierigkeit). Region pages emit `FAQPage` for any region with FAQs; all active regions emit `TouristDestination` (from `REGION_CONTENT`).
- **OpenGraph/Twitter**: `metadataBase` in the root layout; per-post OG in `generateMetadata`.
- **Search**: [app/ui/blog-search.tsx](app/ui/blog-search.tsx) is client-side text search + category filter; it reads an initial `?q=` from the URL. The navbar ([app/ui/navbar.tsx](app/ui/navbar.tsx)) has a global search box (desktop + mobile) that routes to `/blog?q=…`, which also makes the WebSite SearchAction JSON-LD functional.
- **Favicon**: [app/icon.svg](app/icon.svg) (brand mountain on forest-green) — Next auto-generates the icon `<link>`.
- **PWA manifest**: [app/manifest.ts](app/manifest.ts) (name, theme color `#255744`, icon) → installable on mobile.
- **Custom 404**: [app/not-found.tsx](app/not-found.tsx) — branded, `noindex`, links to home/magazine/regions.
- **Post artwork**: [app/ui/post-artwork.tsx](app/ui/post-artwork.tsx) generates a deterministic SVG landscape per post (seeded by slug, palette by category) — used as article hero + card thumbnails everywhere (magazine, home lead, region cards). No real photos yet; this is a branded placeholder so every article has a distinct image without assets/licensing. Swap for real photos later via an optional `image` field on `Post`.
- **Blog post add-ons**: reading time, share buttons ([app/ui/share-buttons.tsx](app/ui/share-buttons.tsx)), related posts (scored by category/difficulty/season via [app/lib/blog-utils.ts](app/lib/blog-utils.ts)).
- **Themenseiten-Rückverlinkung**: [app/lib/themenseiten.ts](app/lib/themenseiten.ts) → `themenFor(slug)` builds a reverse index (post slug → theme pages that list it) from `themen-picks.ts`, `monatstipps.ts`, `seen.ts`, `badeplaetze.ts` and `unterkuenfte.ts` (lakes with a matching stay-at-the-lake entry link to `/unterkuenfte/am-see`). Blog posts render it as a "Dieses Ziel steht auch auf diesen Listen" block (max. 4 links, at most 2 per source, ranked by `rank`). Closes the internal-link loop — the landing pages already point *at* articles, this points back. A new theme page joins it by adding one `addGroups(...)` call.
- **"Mit Öffis erreichbar"-Badge**: same file → `oeffiAnreise(slug)` looks up the post in `BAHNHOF_GROUPS` (from `themen-picks.ts`) and returns its curated `anreise` text. [app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx) shows a header badge + a sidebar card with the concrete transit instructions for the ~30 posts already curated on `/bahnhofsausfluege`. No new `Post` field — reuses the existing curated list instead of tagging all ~165 posts individually. A second, boolean-only helper `isOeffiErreichbar(slug)` (same file, backed by a `Set` over `BAHNHOF_GROUPS`) drives a compact 🚋-badge on the overview cards too — [app/ui/blog-search.tsx](app/ui/blog-search.tsx) (magazine grid) and [app/regionen/[bundesland]/page.tsx](app/regionen/[bundesland]/page.tsx) (region-page post cards) — without pulling in the full anreise text on every card. For posts that also have a precise start point (`startCoords`/trail coords) but no full `startPoint` card, the sidebar card becomes an "Auto oder Öffis?" comparison: the öffi eyebrow/text plus a Google-Maps-Route-Button (same `maps/dir/?api=1&destination=` link as the Wandern-CTA), so both anreise options sit side by side. Posts with a `startPoint` card keep just the plain "Mit Öffis erreichbar" version, since their own Navigation-Button already covers the Auto-Option.
- **External Google Maps navigation button**: `Wandern`-category posts show a "Route in Google Maps öffnen" external link (`google.com/maps/dir/?api=1&destination=...`) in the Wandern-CTA block whenever `precise` (i.e. `startCoords` or the first trail waypoint) is set — covers most of the ~35 hiking posts, not just the 12 with a full `startPoint` card (which already had its own copy of this button in the sidebar; it's suppressed there to avoid showing it twice).
- **„Weite Anfahrt"-Übernachtungshinweis**: `nearestCityKm()` (neu in [app/lib/wochenendtrip.ts](app/lib/wochenendtrip.ts)) berechnet die kürzeste Luftlinie eines Artikel-Startpunkts zu einer der 6 `TRIP_CITIES`. Liegt ein Artikel weiter als 100 km von **allen** sechs Städten entfernt (aktuell nur Vorarlberg-Artikel, da alle anderen Regionen näher an mindestens einer Stadt liegen) **und** gibt es in [app/lib/unterkuenfte.ts](app/lib/unterkuenfte.ts) eine Unterkunft der gleichen Region innerhalb von 60 km des Startpunkts (Sicherheitsabstand gegen geografisch gespaltene Regionen wie Tirol/Osttirol), zeigt [app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx) eine violette Sidebar-Karte „Lieber übernachten statt lange pendeln?" mit den 1–2 nächstgelegenen Unterkünften (Affiliate-Link über `cloak()`). Bewusst ohne konkrete Fahrzeit-Behauptung („ein gutes Stück hierher" statt „X Stunden"), da die Luftlinien-Näherung bei Gebirgsstraßen von der echten Fahrzeit abweichen kann.
- **Saison-Ampel**: [app/lib/season.ts](app/lib/season.ts) → `seasonStatus(bestSeason)` parses the existing `bestSeason` text (e.g. "Mai–Oktober", "Ganzjährig", "Dezember–März & Juni–September") and classifies the current month as `jetzt` / `randzeit` / `ungeeignet` (returns `undefined` if the text can't be parsed, so no ampel is shown rather than a wrong one). No new `Post` field — reuses the already-curated `bestSeason` string on virtually every post. Shown as an emoji in the article header badge + a colored label under "Beste Zeit" in the sidebar ([app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx)), and as a small colored dot next to `bestSeason` on region-page post cards ([app/regionen/[bundesland]/page.tsx](app/regionen/[bundesland]/page.tsx)).
- **Home add-ons**: live lake-weather widget across popular Austrian lakes ([app/ui/seewetter.tsx](app/ui/seewetter.tsx)) — air temperature via Open-Meteo (keyless) for all 6 lakes; water temperature is a genuine live reading (via [app/api/seewetter/route.ts](app/api/seewetter/route.ts), see above) for the 2 Kärnten lakes with an official measuring station (Wörthersee, Klopeiner See — matched by name against the `gewaesser` field), marked with a small green dot; the other 4 lakes (outside Kärnten, no live source found) keep the previous seasonal estimate. Also quick-stats, region cards, map-feature grid.
- **Newsletter** ([app/ui/newsletter.tsx](app/ui/newsletter.tsx)): posts to [app/api/newsletter/route.ts](app/api/newsletter/route.ts), which calls Brevo's `contacts/doubleOptinConfirmation` — Brevo sends the confirmation mail and only adds the address after the click, so we never send mail ourselves. The DOI link redirects to [/newsletter/bestaetigt](app/newsletter/bestaetigt/page.tsx) (noindex). ⚠️ **Needs three env vars** (`BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_DOI_TEMPLATE_ID`); while any is missing the route answers 503 and the form says so honestly instead of silently dropping the address. Duplicate signups are reported as success on purpose (no list-membership disclosure). The privacy policy (§7) names Brevo — **change it too** if the provider ever changes.
- **Global**: scroll-to-top button in the layout.
- **FAQ accordion**: [app/ui/faq.tsx](app/ui/faq.tsx).
- **Bot / geo blocking**: [middleware.ts](middleware.ts) returns HTTP 403 for AI/scraper/SEO crawlers (by User-Agent) and for visitors from CN/RU/HK (`x-vercel-ip-country`). Search/ad crawlers (Google, Bing, AdSense) are explicitly allowed. UA-blocking is spoofable (noise reduction, not real security); the one outbound endpoint `/api/brouter` is additionally rate-limited + Referer-checked.
- **Security headers**: [next.config.ts](next.config.ts) `headers()` adds `Strict-Transport-Security` (HSTS, 2 Jahre + includeSubDomains, bewusst **ohne** `preload` — schwer rueckgaengig zu machen), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` (camera/mic/payment off) to all routes. No CSP yet (would need careful allowlisting for AdSense/GetYourGuide).
- **Third-party scripts**: AdSense loader stays in `<head>` (reliable ad loading) with a `preconnect`; the GetYourGuide tracking script is deferred via `next/script` `strategy="lazyOnload"` to protect Core Web Vitals.

External APIs (all keyless): **BRouter** (routing), **Overpass** (peaks + trail snapping), **Waymarked Trails** (tiles), **OpenTopoMap** (topo tiles), **Open-Meteo** (air temperature), **Hydrographischer Dienst Kärnten** (live lake-water temperature, CC-BY-4.0, proxied via `/api/seewetter` — no CORS headers on the source).

### Environment variables

- `NEXT_PUBLIC_SITE_URL` — production domain for sitemap/robots/canonical/OG (should be `https://www.bergseen-guide.com`)
- `BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_DOI_TEMPLATE_ID` — newsletter signup (see `/api/newsletter` above). **Server-side only, never `NEXT_PUBLIC_`.** Until all three are set in Vercel, the signup form politely refuses instead of losing addresses. Setup in Brevo: create a list (→ list id) and a *Double-Opt-in* template containing the `{{ doubleOptinUrl }}` placeholder (→ template id).
- Affiliate partner IDs live in code ([app/lib/affiliate.ts](app/lib/affiliate.ts) → `PARTNER_IDS`), not env

### Styling

Tailwind CSS 3.4 with a **custom forest-green palette** (overrides Tailwind's default green in [tailwind.config.ts](tailwind.config.ts) — `green-600` = `#2f6b54`, `green-700` = `#255744`) plus a warm `sand` accent. Primary brand color is green-600/700. Responsive layouts use `md:` and `lg:` breakpoints.

**Accent colors:** category color system in [app/lib/blog-utils.ts](app/lib/blog-utils.ts) → `CATEGORY_STYLE` (Wandern=green, Baden=sky, Ausflug=amber, Unterkunft=violet) — used for badges, filter buttons, region-page category chips. Each region card on the homepage has its own gradient accent (`bar` in `POPULAR_DESTINATIONS`). These pull in default Tailwind colors (sky/amber/violet/rose/teal/…) as literal class strings so the JIT picks them up.

### Dependency-Scanning

[.github/dependabot.yml](../.github/dependabot.yml) (im **Repo-Root**, nicht in `nextjs-dashboard/`) laesst Dependabot woechentlich das npm-Verzeichnis `/nextjs-dashboard` pruefen — Minor/Patch gebuendelt, Major-Bumps fuer `next`/`react`/`react-dom` bewusst ignoriert (die sind exakt gepinnt). Noetig, weil lokal kein Node existiert und `pnpm audit` deshalb nicht laufen kann. ⚠️ **Im Repo noch aktivieren:** GitHub → Settings → Code security → *Dependabot alerts* und *Dependabot security updates*.

### Dependencies

- `leaflet` + `@types/leaflet` — interactive maps
- `@vercel/analytics` + `@vercel/speed-insights` — visitor stats & load-time metrics (mounted in the root layout)
- `tailwindcss` 3.4 + `@tailwindcss/forms`
- `eslint` + `eslint-config-next` + `@eslint/eslintrc` — linting (dev)

`next`/`react`/`react-dom` are pinned to exact versions (16.2.7 / 19.2.7) for reproducible builds — bump deliberately, not via `latest`.
