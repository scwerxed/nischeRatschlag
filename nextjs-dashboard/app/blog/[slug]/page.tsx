import React from 'react';
import { posts, getPostBySlug } from '@/app/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { cloak, excursionsFor } from '@/app/lib/affiliate';
import TrailMapWrapper from '@/app/ui/trail-map-wrapper';
import ShareButtons from '@/app/ui/share-buttons';
import SaveButton from '@/app/ui/save-button';
import PostArtwork from '@/app/ui/post-artwork';
import ViewTracker from '@/app/ui/view-tracker';
import RecentlyViewed from '@/app/ui/recently-viewed';
import { readingTime, relatedPosts } from '@/app/lib/blog-utils';
import { themenFor, oeffiAnreise } from '@/app/lib/themenseiten';
import { seasonStatus, SEASON_LABEL } from '@/app/lib/season';
import { unterkuenfte } from '@/app/lib/unterkuenfte';
import { nearestCityKm, distKm } from '@/app/lib/wochenendtrip';
import { basislagerFuer, BASISLAGER_RADIUS_KM } from '@/app/lib/basislager';
import { seeMessstellenFuer, badestelleFuer, AGES_EINSTUFUNG } from '@/app/lib/gewaesser';
import { QUELLEN_LABEL } from '@/app/lib/seen-messstellen';
import SeeLive from '@/app/ui/see-live';
import { BASE, SITE_NAME, CATEGORY_KEYWORDS, REGION_META, regionName, articleSchema, breadcrumbSchema, sportsActivitySchema, trailRouteSchema, OFFICIAL_REGION_SITES } from '@/app/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const catKw = CATEGORY_KEYWORDS[post.category] ?? [];
  const regionKw = REGION_META[post.region]?.keywords ?? [];
  const keywords = [...catKw, ...regionKw, post.bestSeason ?? ''].filter(Boolean);
  const hlText = post.highlights?.slice(0, 2).join(' · ') ?? '';
  const description = hlText ? `${post.excerpt} ${hlText}` : post.excerpt;

  return {
    title: post.title,
    description: description.slice(0, 160),
    keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: description.slice(0, 160),
      type: 'article',
      publishedTime: post.date,
      url: `${BASE}/blog/${post.slug}`,
      siteName: SITE_NAME,
      locale: 'de_AT',
      tags: keywords,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
  };
}

const DIFFICULTY_STYLES: Record<string, { label: string; dot: string; cls: string }> = {
  leicht: { label: 'Leicht', dot: 'bg-green-500', cls: 'bg-green-50 text-green-700 border-green-200' },
  mittel: { label: 'Mittel', dot: 'bg-yellow-400', cls: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  schwer: { label: 'Schwer', dot: 'bg-red-500',   cls: 'bg-red-50 text-red-700 border-red-200' },
};

/** Erzeugt eine stabile Anker-ID aus einer Überschrift (umlaut-sicher). */
function slugifyHeading(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Liest alle ##-Überschriften für das Inhaltsverzeichnis aus. */
function extractHeadings(content: string): { id: string; text: string }[] {
  return content
    .trim()
    .split('\n')
    .filter((l) => l.startsWith('## '))
    .map((l) => {
      const text = l.slice(3).replace(/\*\*/g, '').trim();
      return { id: slugifyHeading(l.slice(3)), text };
    });
}

// Inline-Tokens: **fett** und [Text](url)
const INLINE_RE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string): React.ReactNode {
  const parts = text.split(INLINE_RE);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      // Interne Links bleiben im SPA-Router, externe öffnen sicher in neuem Tab.
      if (href.startsWith('/')) {
        return <Link key={i} href={href} className="text-green-700 font-medium hover:underline">{label}</Link>;
      }
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-green-700 font-medium hover:underline">
          {label}
        </a>
      );
    }
    return part;
  });
}

function renderContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="list-none space-y-2.5 text-body text-ink mb-6 max-w-prose ml-0 border-l-2 border-green-200 pl-5">
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500 inline-block" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={i} id={slugifyHeading(line.slice(3))} className="font-serif text-display-sm font-bold mt-16 mb-5 text-ink border-b border-hairline pb-3 scroll-mt-24">
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={i} className="font-serif text-tagline font-bold mt-10 mb-3 text-ink">
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
    } else if (line.trim() === '---') {
      flushList();
      elements.push(<hr key={i} className="my-12 border-hairline" />);
    } else if (line.trim() === '') {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={i} className="text-body text-ink mb-6 max-w-prose">
          {renderInline(line)}
        </p>
      );
    }
  });

  flushList();
  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const regionLabel = regionName(post.region);

  const minutes = readingTime(post.content);
  const related = relatedPosts(post, posts);
  const themen = themenFor(slug);
  const oeffi = oeffiAnreise(slug);
  const season = seasonStatus(post.bestSeason);
  const headings = extractHeadings(post.content);
  const regionSite = OFFICIAL_REGION_SITES[post.region];
  const officialLinks = [...(post.officialLinks ?? []), ...(regionSite ? [regionSite] : [])];

  // Startpunkt: explizit gesetzt oder erster Wegpunkt der ersten Tour.
  // Fallback: Region-Mittelpunkt, damit jeder Artikel einen Karten-CTA hat.
  const precise = post.startCoords ?? post.trails?.[0]?.coords?.[0];
  const regionGeo = REGION_META[post.region]?.geo;
  const mapPoint: [number, number] | undefined =
    precise ?? (regionGeo ? [regionGeo.lat, regionGeo.lng] : undefined);
  const mapZoom = precise ? 14 : 9;
  const mapHref = mapPoint
    ? `/karte?lat=${mapPoint[0]}&lng=${mapPoint[1]}&zoom=${mapZoom}&name=${encodeURIComponent(precise ? post.title : regionName(post.region))}`
    : '/karte';
  const mapCtaLabel = precise ? 'Startpunkt auf Karte' : 'Region auf Karte';

  // Weite Anfahrt von allen 6 Startstädten? Dann lohnt sich ggf. eine Übernachtung vor Ort statt
  // eines langen Tagesausflugs. MAX_STAY_KM verhindert, dass in geografisch gespaltenen Regionen
  // (z. B. Tirol: Nordtirol/Osttirol) eine weit entfernte Unterkunft der Region vorgeschlagen wird.
  const FAR_KM = 100;
  const MAX_STAY_KM = 60;
  const nearbyStays = (precise && nearestCityKm(precise) > FAR_KM
    ? unterkuenfte
        .filter((u) => u.region === post.region)
        .map((u) => ({ u, km: distKm(precise, [u.lat, u.lng]) }))
        .filter((x) => x.km <= MAX_STAY_KM)
        .sort((a, b) => a.km - b.km)
        .slice(0, 2)
        .map((x) => x.u)
    : []);

  // Basislager: liegt dieses Ziel im Umkreis eines Unterkunft-Standorts mit vielen weiteren Zielen?
  // Nicht zeigen, wenn dieselbe Unterkunft schon in der „Weite Anfahrt“-Karte steht.
  const basis = basislagerFuer(post.slug);
  const basisLager = basis && !nearbyStays.some((u) => u.id === basis.lager.stay.id) ? basis : undefined;
  const basisAndere = basisLager
    ? basisLager.lager.ziele.filter((z) => z.post.slug !== post.slug).slice(0, 3)
    : [];

  // Gewässer-Daten: Live-Wassertemperatur (offizielle See-Messstellen der Länder) und
  // AGES-Badewasserqualität (nur Bade-Artikel). Beide leer, wenn nichts Passendes in der Nähe liegt.
  const seeStationen = seeMessstellenFuer(post).map((m) => ({
    id: m.id, see: m.see, ort: m.ort, km: m.km, quelle: QUELLEN_LABEL[m.quelle],
  }));
  const badestelle = await badestelleFuer(post);
  const einstufung = badestelle?.einstufung ? AGES_EINSTUFUNG[badestelle.einstufung.code] : undefined;
  const probe = badestelle?.letzteProbe;
  const EINSTUFUNG_CLS = {
    gut: 'bg-green-100 text-green-800 border-green-200',
    mittel: 'bg-amber-100 text-amber-800 border-amber-200',
    schlecht: 'bg-red-100 text-red-800 border-red-200',
  } as const;

  const jsonLd = [
    articleSchema({ title: post.title, excerpt: post.excerpt, date: post.date, slug: post.slug, category: post.category, region: post.region }),
    breadcrumbSchema([
      { name: 'Startseite',  url: BASE },
      { name: regionLabel,   url: `${BASE}/regionen/${post.region}` },
      { name: post.title,    url: `${BASE}/blog/${post.slug}` },
    ]),
    // Wander-Artikel ohne vordefinierte Route: generische Aktivitäts-Location
    ...(post.category === 'Wandern' && !(post.trails && post.trails.length)
      ? [sportsActivitySchema({ name: post.title, description: post.excerpt, region: post.region })]
      : []),
    // Artikel mit vordefinierten Touren: pro Route ein Schema mit Wegverlauf & Eckdaten
    ...(post.trails ?? []).map((trail) =>
      trailRouteSchema({ title: post.title, description: post.excerpt, region: post.region, trail })
    ),
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <link rel="alternate" hrefLang="de-AT" href={`${BASE}/blog/${post.slug}`} />
      <ViewTracker slug={post.slug} title={post.title} category={post.category} />

      {/* ── Kopfbereich mit Landschaftsmotiv ─────────────────────────────── */}
      <header className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <PostArtwork seed={post.slug} category={post.category} className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 via-green-900/80 to-green-900/55" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-fine text-white/70 mb-5">
            <Link href="/" className="hover:text-white">Startseite</Link>
            <span>/</span>
            <Link href={`/regionen/${post.region}`} className="hover:text-white">{regionLabel}</Link>
            <span>/</span>
            <span className="text-white/90">{post.category}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-4 text-fine">
            <span className="font-semibold bg-white/15 border border-white/20 px-3 py-1 uppercase tracking-wide rounded-full">
              {post.category}
            </span>
            {post.difficulty && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 px-3 py-1 rounded-full">
                <span className={`w-2 h-2 rounded-full shrink-0 ${DIFFICULTY_STYLES[post.difficulty].dot}`} />
                {DIFFICULTY_STYLES[post.difficulty].label}
              </span>
            )}
            {post.bestSeason && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 px-3 py-1 rounded-full">
                {season && <span aria-hidden>{SEASON_LABEL[season].emoji}</span>}
                {post.bestSeason}
              </span>
            )}
            {oeffi && (
              <span className="bg-white/15 border border-white/20 px-3 py-1 rounded-full">🚋 Mit Öffis erreichbar</span>
            )}
            <span className="text-white/60 ml-auto">{post.date} · {minutes} Min. Lesen</span>
          </div>

          <h1 className="font-serif text-display-sm md:text-hero font-bold max-w-3xl">{post.title}</h1>
          <p className="text-white/85 text-lead-airy font-light mt-5 max-w-2xl">{post.excerpt}</p>
        </div>
      </header>

      {/* ── Zweispaltiger Inhalt ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-14">

        {/* Hauptspalte */}
        <article className="min-w-0">
          {post.highlights && post.highlights.length > 0 && (
            <div className="border-l-4 border-green-600 bg-green-50 px-5 py-4 mb-8">
              <p className="eyebrow mb-3">Auf einen Blick</p>
              <ul className="space-y-1.5">
                {post.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-caption text-ink-muted">
                    <span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="prose-style">{renderContent(post.content)}</div>

          {/* Typische Planungsfehler */}
          {post.planningMistakes && post.planningMistakes.length > 0 && (
            <div className="mt-10 border-l-4 border-red-400 bg-red-50 px-5 py-4">
              <p className="eyebrow mb-3 !text-red-700">Schlecht geplant, wenn …</p>
              <ul className="space-y-3">
                {post.planningMistakes.map((m) => (
                  <li key={m.fehler} className="text-caption leading-relaxed">
                    <p className="text-ink"><span className="font-semibold text-red-700">✗</span> {m.fehler}</p>
                    <p className="text-ink-muted mt-0.5 pl-4"><span className="font-semibold text-green-700">→</span> {m.besser}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Kurz- / Lang-Varianten */}
          {post.routeVariants && post.routeVariants.length > 0 && (
            <div className="mt-10">
              <p className="eyebrow mb-2">Kurz oder lang?</p>
              <h2 className="font-serif text-lead font-bold text-ink mb-4">Deine Routen-Varianten</h2>
              <div className="space-y-3">
                {post.routeVariants.map((v) => (
                  <div key={v.label} className="flex flex-wrap items-center gap-x-4 gap-y-1 border border-hairline px-4 py-3 rounded-lg">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${DIFFICULTY_STYLES[v.difficulty].dot}`} />
                    <span className="font-semibold text-ink flex-1 min-w-[160px]">{v.label}</span>
                    <span className="text-caption text-ink-muted whitespace-nowrap">{v.length}</span>
                    <span className="text-caption text-ink-muted whitespace-nowrap">{v.duration}</span>
                    {v.ascent && <span className="text-caption text-ink-muted whitespace-nowrap">↑ {v.ascent}</span>}
                    <span className={`text-fine font-medium px-2 py-0.5 rounded-full border ${DIFFICULTY_STYLES[v.difficulty].cls}`}>
                      {DIFFICULTY_STYLES[v.difficulty].label}
                    </span>
                    {v.note && <span className="w-full text-fine text-ink-soft">{v.note}</span>}
                  </div>
                ))}
              </div>
              <p className="text-fine text-ink-soft mt-2">Angaben ca. – je nach Startpunkt und Tempo.</p>
            </div>
          )}

          {/* Wegekarte */}
          {post.trails && post.trails.length > 0 && (
            <div className="mt-12">
              <p className="eyebrow mb-2">Wanderkarte</p>
              <h2 className="font-serif text-lead font-bold text-ink mb-1">
                {post.trails.length > 1 ? 'Wähle deinen Weg' : 'Der Weg auf der Karte'}
              </h2>
              {post.trails.length > 1 && (
                <p className="text-caption text-ink-soft mb-4">Tippe auf eine Tour, um den vorgegebenen Wegverlauf zu sehen.</p>
              )}
              <TrailMapWrapper trails={post.trails} />
            </div>
          )}

          {/* Wandern-CTA */}
          {post.category === 'Wandern' && (
            <div className="mt-6 space-y-3">
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href={mapHref} className="flex items-center justify-center bg-green-700 text-white font-medium text-caption px-5 py-3 hover:bg-green-800 transition-colors rounded-full">
                  {mapCtaLabel}
                </Link>
                <Link href="/routenplaner" className="flex items-center justify-center border border-green-700 text-green-700 font-medium text-caption px-5 py-3 hover:bg-green-50 transition-colors rounded-full">
                  Route planen
                </Link>
              </div>
              {precise && !post.startPoint && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${precise[0]},${precise[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 border border-hairline text-ink-muted font-medium text-caption px-5 py-3 hover:bg-parchment transition-colors rounded-full"
                >
                  <span aria-hidden>🧭</span> Route in Google Maps öffnen ↗
                </a>
              )}
            </div>
          )}

          {/* Teilen */}
          <div className="mt-10 pt-6 border-t border-divider-soft">
            <ShareButtons title={post.title} />
          </div>

          {/* Verwandte Artikel */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="font-serif text-tagline font-bold text-ink mb-4">Das könnte dich auch interessieren</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group block border border-hairline p-4 hover:border-green-400 transition rounded-lg">
                    <span className="eyebrow">{r.category}</span>
                    <h3 className="mt-1.5 text-caption font-semibold text-ink group-hover:text-green-700 leading-snug">{r.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Themenseiten, auf denen dieser Artikel vorkommt */}
          {themen.length > 0 && (
            <div className="mt-12">
              <h2 className="font-serif text-tagline font-bold text-ink mb-1">Dieses Ziel steht auch auf diesen Listen</h2>
              <p className="text-caption text-ink-soft mb-4">Passt der Ausflug gerade nicht? Über die Themenseiten findest du Alternativen mit demselben Anspruch.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {themen.map((t) => (
                  <Link key={t.href} href={t.href} className="group flex items-start gap-3 border border-hairline p-4 hover:border-green-400 transition rounded-lg">
                    <span className="shrink-0 mt-2 w-3 h-px bg-green-600 inline-block" />
                    <span>
                      <span className="block text-caption font-semibold text-ink group-hover:text-green-700 leading-snug">{t.label}</span>
                      <span className="block mt-0.5 text-fine text-ink-soft leading-snug">{t.note}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link href="/ausflugsplaner" className="inline-block mt-4 text-caption text-green-700 hover:underline font-medium">
                Alle Themenseiten im Ausflugsplaner →
              </Link>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-divider-soft">
            <Link href={`/regionen/${post.region}`} className="text-caption text-green-700 hover:underline font-medium">
              ← Alle {regionLabel}-Artikel anzeigen
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-20 self-start">
          {/* Inhaltsverzeichnis */}
          {headings.length >= 3 && (
            <nav className="border border-hairline p-5 rounded-lg" aria-label="Inhaltsverzeichnis">
              <p className="eyebrow mb-3">Inhalt</p>
              <ol className="space-y-1.5 text-caption">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-ink-muted hover:text-green-700 transition-colors block leading-snug">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Schnellinfo */}
          <div className="border border-hairline p-5 rounded-lg">
            <p className="eyebrow mb-3">Schnellinfo</p>
            <dl className="space-y-2.5 text-caption">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-soft">Kategorie</dt>
                <dd className="font-medium text-ink">{post.category}</dd>
              </div>
              {post.difficulty && (
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-soft">Schwierigkeit</dt>
                  <dd className="font-medium text-ink inline-flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${DIFFICULTY_STYLES[post.difficulty].dot}`} />
                    {DIFFICULTY_STYLES[post.difficulty].label}
                  </dd>
                </div>
              )}
              {post.bestSeason && (
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-soft">Beste Zeit</dt>
                  <dd className="font-medium text-ink text-right">
                    {post.bestSeason}
                    {season && (
                      <span className={`block mt-1.5 text-fine font-medium px-1.5 py-0.5 border ${SEASON_LABEL[season].cls} rounded-sm`}>
                        {SEASON_LABEL[season].emoji} {SEASON_LABEL[season].label}
                      </span>
                    )}
                  </dd>
                </div>
              )}
              <div className="flex justify-between gap-3">
                <dt className="text-ink-soft">Lesezeit</dt>
                <dd className="font-medium text-ink">{minutes} Min.</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-soft">Region</dt>
                <dd className="font-medium text-ink">{regionLabel}</dd>
              </div>
            </dl>
            <div className="mt-4 pt-4 border-t border-divider-soft">
              <SaveButton slug={post.slug} title={post.title} category={post.category} />
            </div>
            {mapPoint && (
              <Link
                href={mapHref}
                className="mt-3 flex items-center justify-center gap-1.5 w-full text-caption font-medium px-4 py-2.5 border border-green-700 text-green-700 hover:bg-green-50 transition-colors rounded-full"
              >
                <span aria-hidden>📍</span> {precise ? 'Startpunkt auf Karte öffnen' : 'Region auf Karte öffnen'}
              </Link>
            )}
          </div>

          {/* Live-Wassertemperatur */}
          {seeStationen.length > 0 && <SeeLive stationen={seeStationen} />}

          {/* Badewasser-Qualität (AGES) */}
          {badestelle && (
            <div className="border border-sky-200 p-5 rounded-lg">
              <p className="eyebrow mb-1">Badewasser-Qualität</p>
              <h3 className="font-serif text-body font-bold text-ink leading-snug">{badestelle.name}</h3>
              <p className="text-fine text-ink-soft mt-0.5">
                Offizielle EU-Badestelle{badestelle.km >= 0.5 ? ` · ≈ ${Math.max(1, Math.round(badestelle.km))} km vom Startpunkt` : ''}
              </p>
              {badestelle.gesperrt && (
                <p className="mt-3 text-caption font-semibold text-red-800 bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-sm">
                  ⚠️ Derzeit gesperrt{badestelle.sperrgrund ? `: ${badestelle.sperrgrund}` : ''}
                </p>
              )}
              <dl className="mt-3 space-y-2 text-caption">
                {badestelle.einstufung && einstufung && (
                  <div className="flex justify-between items-center gap-3">
                    <dt className="text-ink-soft">Einstufung {badestelle.einstufung.jahr}</dt>
                    <dd className={`text-fine font-semibold px-2 py-0.5 border ${EINSTUFUNG_CLS[einstufung.tone]} rounded-sm`}>
                      {einstufung.label}
                    </dd>
                  </div>
                )}
                {probe && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Letzte Probe</dt>
                    <dd className="font-medium text-ink">{probe.datum}</dd>
                  </div>
                )}
                {probe && probe.wasser !== null && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Wasser bei der Probe</dt>
                    <dd className="font-medium text-ink tabular-nums">{probe.wasser.toLocaleString('de-AT')} °C</dd>
                  </div>
                )}
                {probe && probe.sichttiefe !== null && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-soft">Sichttiefe</dt>
                    <dd className="font-medium text-ink tabular-nums">{probe.sichttiefe.toLocaleString('de-AT')} m</dd>
                  </div>
                )}
              </dl>
              <p className="text-[11px] text-ink-soft mt-3">
                Hygiene-Kontrolle nach EU-Badegewässerrichtlinie{probe && badestelle.probenSaison > 0 ? ` (${badestelle.probenSaison} Proben in der Saison ${probe.datum.slice(6)})` : ''}.
                Quelle: AGES, CC BY 3.0 AT.
              </p>
            </div>
          )}

          {/* Mit Öffis erreichbar / Auto oder Öffis */}
          {oeffi && (
            <div className="border border-sky-200 bg-sky-50 p-5 rounded-lg">
              <p className="eyebrow mb-3">{precise && !post.startPoint ? 'Auto oder Öffis?' : 'Mit Öffis erreichbar'}</p>
              <p className="text-caption text-ink-muted leading-relaxed">🚋 {oeffi}</p>
              {precise && !post.startPoint && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${precise[0]},${precise[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-1.5 w-full text-caption font-medium px-4 py-2.5 border border-sky-300 bg-white text-ink-muted hover:bg-sky-100 transition-colors rounded-full"
                >
                  <span aria-hidden>🚗</span> Route für die Anreise mit dem Auto ↗
                </a>
              )}
              <Link href="/bahnhofsausfluege" className="mt-3 inline-flex items-center gap-1 text-caption font-medium text-green-700 hover:text-green-800">
                Weitere Öffi-Ziele ansehen →
              </Link>
            </div>
          )}

          {/* Startpunkt & Parken */}
          {post.startPoint && (
            <div className="border border-sand-200 bg-sand-50 p-5 rounded-lg">
              <p className="eyebrow mb-3">Startpunkt &amp; Parken</p>
              <p className="font-semibold text-ink text-caption leading-snug">🅿️ {post.startPoint.name}</p>
              <dl className="mt-3 space-y-2 text-caption">
                {post.startPoint.parking && (
                  <div>
                    <dt className="text-ink-soft text-fine uppercase tracking-wide">Parken</dt>
                    <dd className="text-ink-muted mt-0.5">{post.startPoint.parking}</dd>
                  </div>
                )}
                {post.startPoint.arrival && (
                  <div>
                    <dt className="text-ink-soft text-fine uppercase tracking-wide">Beste Ankunft</dt>
                    <dd className="text-ink-muted mt-0.5">{post.startPoint.arrival}</dd>
                  </div>
                )}
              </dl>
              {post.startPoint.note && (
                <p className="mt-3 text-fine text-ink-muted border-l-2 border-amber-400 bg-amber-50 px-2.5 py-1.5">
                  {post.startPoint.note}
                </p>
              )}
              {precise && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${precise[0]},${precise[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-1.5 w-full text-caption font-medium px-4 py-2.5 bg-green-700 text-white hover:bg-green-800 transition-colors rounded-full"
                >
                  Navigation starten ↗
                </a>
              )}
            </div>
          )}

          {/* Weite Anfahrt: Übernachtung vor Ort statt langem Tagesausflug (Affiliate) */}
          {nearbyStays.length > 0 && (
            <div className="border border-violet-200 bg-violet-50 p-5 rounded-lg">
              <p className="eyebrow mb-1">Weite Anfahrt</p>
              <h3 className="font-serif text-body font-bold text-ink mb-3">Lieber übernachten statt lange pendeln?</h3>
              <p className="text-caption text-ink-muted leading-relaxed mb-3">
                Von Wien, Graz, Salzburg, Linz, Innsbruck und Klagenfurt aus ist es ein gutes Stück hierher – wer nicht alles an einem Tag hin und zurück fahren will, findet in der Nähe Unterkünfte.
              </p>
              <div className="space-y-2.5">
                {nearbyStays.map((u) => (
                  <a key={u.id} href={cloak(u.bookingUrl)} target="_blank" rel="noopener noreferrer sponsored"
                    className="group block border border-violet-200 bg-white px-3 py-2.5 hover:border-violet-400 transition-colors rounded-full">
                    <span className="block text-fine font-semibold text-violet-700 uppercase tracking-wide">{u.typ} · {u.see}</span>
                    <span className="block text-caption font-semibold text-ink group-hover:text-violet-700 leading-snug mt-0.5">{u.name} →</span>
                  </a>
                ))}
              </div>
              <p className="text-[11px] text-ink-soft mt-3">* Affiliate-Links – ohne Mehrkosten für dich.</p>
              <Link href="/unterkuenfte/basislager" className="mt-2 inline-flex items-center gap-1 text-caption font-medium text-green-700 hover:text-green-800">
                Beste Ausgangsorte ansehen →
              </Link>
            </div>
          )}

          {/* Basislager: guter Standort für mehrere Tage in der Gegend (Affiliate) */}
          {basisLager && (
            <div className="border border-violet-200 bg-violet-50 p-5 rounded-lg">
              <p className="eyebrow mb-1">Mehrere Tage bleiben?</p>
              <h3 className="font-serif text-body font-bold text-ink mb-2">Basislager {basisLager.lager.stay.ort}</h3>
              <p className="text-caption text-ink-muted leading-relaxed mb-3">
                Rund {Math.max(1, Math.round(basisLager.km))}&nbsp;km Luftlinie von hier – und insgesamt{' '}
                <strong>{basisLager.lager.ziele.length} unserer Ziele</strong> im Umkreis von {BASISLAGER_RADIUS_KM}&nbsp;km.
                {basisAndere.length > 0 && ' Zum Beispiel:'}
              </p>
              {basisAndere.length > 0 && (
                <ul className="space-y-1 mb-3">
                  {basisAndere.map((z) => (
                    <li key={z.post.slug} className="text-caption leading-snug">
                      <Link href={`/blog/${z.post.slug}`} className="text-ink hover:text-green-700 hover:underline">
                        {z.post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <a href={cloak(basisLager.lager.stay.bookingUrl)} target="_blank" rel="noopener noreferrer sponsored"
                className="group block border border-violet-200 bg-white px-3 py-2.5 hover:border-violet-400 transition-colors rounded-full">
                <span className="block text-fine font-semibold text-violet-700 uppercase tracking-wide">{basisLager.lager.stay.typ} · {basisLager.lager.stay.see}</span>
                <span className="block text-caption font-semibold text-ink group-hover:text-violet-700 leading-snug mt-0.5">{basisLager.lager.stay.name} →</span>
              </a>
              <p className="text-[11px] text-ink-soft mt-3">* Affiliate-Link – ohne Mehrkosten für dich. Entfernungen als Luftlinie.</p>
              <Link href={`/unterkuenfte/basislager#${basisLager.lager.stay.region}`} className="mt-2 inline-flex items-center gap-1 text-caption font-medium text-green-700 hover:text-green-800">
                Alle Basislager in {regionName(basisLager.lager.stay.region)} →
              </Link>
            </div>
          )}

          {/* Erlebnisse & Tickets */}
          {(post.category === 'Ausflug' || post.category === 'Wandern') && (
            <div className="border border-hairline p-5 rounded-lg">
              <p className="eyebrow mb-1">Erlebnisse &amp; Tickets</p>
              <h3 className="font-serif text-body font-bold text-ink mb-3">Ausflüge in {regionLabel} buchen</h3>
              <div className="space-y-2.5">
                {excursionsFor(post.region).map((ex) => (
                  <a key={ex.url} href={cloak(ex.url)} target="_blank" rel="noopener noreferrer sponsored"
                    className="group block border border-hairline px-3 py-2.5 hover:border-green-400 hover:bg-green-50 transition-colors rounded-full">
                    <span className="block text-caption font-semibold text-ink group-hover:text-green-700 leading-snug">{ex.label} →</span>
                    <span className="block text-fine text-ink-soft mt-0.5">{ex.note}</span>
                  </a>
                ))}
              </div>
              <p className="text-[11px] text-ink-soft mt-2.5">* Partner-Links (GetYourGuide)</p>
            </div>
          )}

          {/* Empfehlungen */}
          {post.affiliateLinks && post.affiliateLinks.length > 0 && (
            <div className="border border-green-100 bg-green-50 p-5 rounded-lg">
              <p className="eyebrow mb-3">Empfehlungen</p>
              <ul className="space-y-2.5">
                {post.affiliateLinks.map((link) => (
                  <li key={link.url}>
                    <a href={cloak(link.url)} target="_blank" rel="noopener noreferrer sponsored"
                      className="text-green-700 hover:underline font-medium text-caption leading-snug block">
                      {link.label} →
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-ink-soft mt-3">* Affiliate-Links – ohne Mehrkosten für dich.</p>
            </div>
          )}

          {/* Zuletzt angesehen */}
          <RecentlyViewed currentSlug={post.slug} />

          {/* Offizielle Infos & Quellen (keine Affiliate-Links) */}
          {officialLinks.length > 0 && (
            <div className="border border-hairline p-5 rounded-lg">
              <p className="eyebrow mb-3">Offizielle Infos</p>
              <ul className="space-y-2.5">
                {officialLinks.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer"
                      className="text-ink-muted hover:text-green-700 text-caption leading-snug block">
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-ink-soft mt-3">Aktuelle Öffnungszeiten &amp; Preise bitte auf den offiziellen Seiten prüfen.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
