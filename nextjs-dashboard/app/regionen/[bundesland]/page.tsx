import { regionen, getRegionBySlug } from '@/app/lib/regionen';
import { posts } from '@/app/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Faq from '@/app/ui/faq';
import { BASE, REGION_META, touristDestinationSchema, breadcrumbSchema } from '@/app/lib/seo';
import { FAQS_BY_REGION } from '@/app/lib/faqs';
import { REGION_CONTENT } from '@/app/lib/regionen-content';
import { unterkuenfte } from '@/app/lib/unterkuenfte';
import { cloak } from '@/app/lib/affiliate';
import PostBild from '@/app/ui/post-bild';
import { CATEGORY_STYLE } from '@/app/lib/blog-utils';
import { isOeffiErreichbar } from '@/app/lib/themenseiten';
import { seasonStatus, SEASON_LABEL } from '@/app/lib/season';

type Props = { params: Promise<{ bundesland: string }> };

export async function generateStaticParams() {
  return regionen.map((r) => ({ bundesland: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bundesland } = await params;
  const region = getRegionBySlug(bundesland);
  if (!region) return {};
  const isKaernten = bundesland === 'kaernten';
  return {
    title: isKaernten
      ? 'Kärnten Urlaub – Wandern, Badeseen & Ausflüge'
      : `${region.name} Urlaub – Wandern, Baden & Ausflüge`,
    description: isKaernten
      ? 'Kärntens schönste Wanderwege, Badeseen, Tiertouren und Ausflugsziele – mit interaktiver Karte, Live-Wassertemperatur und 40+ Insider-Tipps für deinen Urlaub am Wörthersee.'
      : `${region.beschreibung} Wanderwege, Ausflugsziele, Unterkünfte und Insider-Tipps für deinen Urlaub in ${region.name}.`,
    keywords: [
      ...(REGION_META[bundesland]?.keywords ?? []),
      `${region.name} Urlaub`, `Wandern ${region.name}`, `Ausflug ${region.name}`,
      `${region.name} Sehenswürdigkeiten`, 'Urlaub Österreich',
    ],
    alternates: { canonical: `/regionen/${bundesland}` },
    openGraph: { title: region.name, description: region.beschreibung, url: `${BASE}/regionen/${bundesland}`, locale: 'de_AT' },
  };
}

const CATEGORY_DOT: Record<string, string> = {
  Wandern:   'bg-green-600',
  Baden:     'bg-sky-500',
  Unterkunft:'bg-violet-500',
  Ausflug:   'bg-amber-500',
};

const DIFFICULTY_STYLES: Record<string, { label: string; cls: string }> = {
  leicht: { label: 'Leicht', cls: 'bg-green-100 text-green-700' },
  mittel: { label: 'Mittel', cls: 'bg-yellow-100 text-yellow-700' },
  schwer: { label: 'Schwer', cls: 'bg-red-100 text-red-700' },
};

export default async function RegionPage({ params }: Props) {
  const { bundesland } = await params;
  const region = getRegionBySlug(bundesland);
  if (!region) notFound();

  const regionPosts = posts.filter((p) => p.region === bundesland);
  const categories = ['Wandern', 'Baden', 'Ausflug', 'Unterkunft'] as const;

  const counts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = regionPosts.filter((p) => p.category === cat).length;
    return acc;
  }, {});

  const content = REGION_CONTENT[bundesland];
  const meta = REGION_META[bundesland];
  const stays = unterkuenfte.filter((u) => u.region === bundesland);

  return (
    <div className="max-w-5xl mx-auto px-6 py-14 md:py-section">
      {/* Breadcrumb für alle aktiven Regionen */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Startseite', url: BASE },
        { name: region.name,  url: `${BASE}/regionen/${bundesland}` },
      ])) }} />
      {/* TouristDestination mit Attraktionen – für jede aktive Region */}
      {region.aktiv && content && meta && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristDestinationSchema({
          name: region.name,
          description: content.destinationDescription,
          url: `${BASE}/regionen/${bundesland}`,
          geo: meta.geo,
          attractions: content.attractions,
        })) }} />
      )}
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="text-caption text-green-600 hover:underline">
          ← Zurück zur Startseite
        </Link>
        <h1 className="font-serif text-display font-bold mt-3 mb-2 text-ink">{region.name}</h1>
        <p className="text-ink-soft max-w-2xl">{region.beschreibung}</p>
      </div>

      {/* Inaktive Region */}
      {!region.aktiv && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <p className="text-lead mb-2">🏔️</p>
          <h2 className="text-tagline font-semibold text-ink mb-1">Demnächst verfügbar</h2>
          <p className="text-ink-soft text-caption">
            Wir arbeiten gerade an Inhalten für {region.name}. Schau bald wieder vorbei!
          </p>
          <Link
            href="/#regionen"
            className="mt-5 inline-block bg-green-700 text-white text-caption font-medium px-5 py-2.5 rounded-lg hover:bg-green-800 transition-colors"
          >
            Verfügbare Regionen ansehen
          </Link>
        </div>
      )}

      {/* Aktive Region */}
      {region.aktiv && (
        <>
          {/* Region-Intro */}
          {content && (
            <div className="bg-green-800 text-white p-8 mb-8 border-l-4 border-sand-300">
              <p className="eyebrow text-green-300 mb-2">{content.intro.eyebrow}</p>
              <h2 className="font-serif text-lead font-bold mb-3">{content.intro.title}</h2>
              <p className="text-green-100 text-caption leading-relaxed mb-6 max-w-2xl">{content.intro.text}</p>
              <div className="grid grid-cols-4 gap-px bg-white/15 border border-white/15 max-w-md">
                {[{ v: String(regionPosts.length), l: 'Artikel' }, ...content.intro.stats].map((s) => (
                  <div key={s.l} className="bg-green-800 py-3 text-center">
                    <p className="font-serif font-bold text-tagline whitespace-nowrap" data-numeric>{s.v}</p>
                    <p className="text-green-200 text-fine mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Schnellnavigation */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {categories.map((cat) => {
              const st = CATEGORY_STYLE[cat];
              return (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase()}`}
                  className={`flex flex-col items-center border ${st?.bg ?? 'bg-parchment'} ${st?.border ?? 'border-hairline'} py-3 px-2 text-center transition rounded-sm`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full mb-2 ${CATEGORY_DOT[cat] ?? 'bg-gray-400'}`} />
                  <span className={`text-fine font-semibold uppercase tracking-wide ${st?.text ?? 'text-ink-muted'}`}>{cat}</span>
                  <span className="text-fine text-ink-soft font-medium mt-0.5">{counts[cat]} Artikel</span>
                </a>
              );
            })}
          </div>

          {/* Karte & Routenplaner CTA */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <Link
              href="/karte"
              className="group flex items-start gap-4 bg-green-700 text-white rounded-lg p-5 hover:bg-green-800 transition-colors"
            >
              <span className="text-display-sm">🗺️</span>
              <div>
                <p className="font-semibold text-tagline leading-tight">Interaktive Wanderkarte</p>
                <p className="text-green-100 text-caption mt-1">
                  Wanderwege, Gipfel und Unterkünfte auf einen Blick – inkl. Waymarked Trails Overlay.
                </p>
                <span className="mt-3 inline-block text-caption font-medium underline underline-offset-2">
                  Karte öffnen →
                </span>
              </div>
            </Link>
            <Link
              href="/routenplaner"
              className="group flex items-start gap-4 border-2 border-green-700 text-green-700 rounded-lg p-5 hover:bg-green-50 transition-colors"
            >
              <span className="text-display-sm">📍</span>
              <div>
                <p className="font-semibold text-tagline leading-tight">Routenplaner</p>
                <p className="text-ink-soft text-caption mt-1">
                  Eigene Wanderroute planen – Wegpunkte setzen, Distanz und Gehzeit berechnen.
                </p>
                <span className="mt-3 inline-block text-caption font-medium underline underline-offset-2">
                  Route planen →
                </span>
              </div>
            </Link>
          </div>

          {/* Beste Reisezeit */}
          {content && (
            <section className="mb-12">
              <h2 className="font-serif text-lead font-bold mb-5 text-ink">Beste Reisezeit für {region.name}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {content.seasons.map((s) => (
                  <div
                    key={s.season}
                    className="border border-hairline rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-tagline">{s.icon}</span>
                      <div>
                        <p className="font-semibold text-caption text-ink">{s.season}</p>
                        <p className="text-fine text-ink-soft">{s.months}</p>
                      </div>
                    </div>
                    <p className="text-fine text-ink-muted leading-relaxed">{s.tip}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Posts nach Kategorie */}
          {categories.map((cat) => {
            const catPosts = regionPosts.filter((p) => p.category === cat);
            if (catPosts.length === 0) return null;
            return (
              <section key={cat} id={cat.toLowerCase()} className="mb-16 md:mb-20">
                <h2 className="font-serif text-lead font-bold mb-5 text-ink flex items-baseline gap-2">
                  {cat}
                  <span className="text-caption font-sans font-normal text-ink-soft">{catPosts.length} Artikel</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {catPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block border border-hairline rounded-lg p-6 overflow-hidden hover:border-green-400 transition"
                    >
                      <div className="aspect-[16/9] -mx-6 -mt-6 mb-4 overflow-hidden">
                        <PostBild slug={post.slug} category={post.category} />
                      </div>
                      {/* Meta */}
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-fine font-medium uppercase tracking-wide ${CATEGORY_STYLE[post.category]?.text ?? 'text-green-600'}`}>
                            {post.category}
                          </span>
                          {post.difficulty && (
                            <span
                              className={`text-fine font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_STYLES[post.difficulty].cls}`}
                            >
                              {DIFFICULTY_STYLES[post.difficulty].label}
                            </span>
                          )}
                          {isOeffiErreichbar(post.slug) && (
                            <span className="text-fine font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              🚋 Öffis
                            </span>
                          )}
                        </div>
                        {post.bestSeason && (() => {
                          const season = seasonStatus(post.bestSeason);
                          return (
                            <span className="inline-flex items-center gap-1 text-fine text-ink-soft">
                              {season && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${SEASON_LABEL[season].dot}`} title={SEASON_LABEL[season].label} />}
                              {post.bestSeason}
                            </span>
                          );
                        })()}
                      </div>

                      {/* Titel */}
                      <h3 className="font-semibold text-tagline text-ink group-hover:text-green-700 leading-snug mb-2">
                        {post.title}
                      </h3>

                      {/* Highlights */}
                      {post.highlights && post.highlights.length > 0 ? (
                        <ul className="space-y-0.5 mb-3">
                          {post.highlights.map((h, i) => (
                            <li key={i} className="text-fine text-ink-soft flex items-start gap-1.5">
                              <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-caption text-ink-soft mb-3">{post.excerpt}</p>
                      )}

                      <span className="inline-block text-caption text-green-600 font-medium">
                        Weiterlesen →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Unterkünfte (Affiliate) */}
          {stays.length > 0 && (
            <section className="mb-16 md:mb-20">
              <p className="eyebrow mb-2">Unterkünfte</p>
              <h2 className="font-serif text-lead font-bold mb-1 text-ink">Hotels & Ferienwohnungen in {region.name}</h2>
              <p className="text-caption text-ink-soft mb-5">Verfügbarkeit & Preise direkt über booking.com prüfen.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stays.map((u) => (
                  <a
                    key={u.id}
                    href={cloak(u.bookingUrl)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="group block border border-hairline p-4 hover:border-green-400 hover:bg-green-50 transition-colors rounded-lg"
                  >
                    <span className="block text-fine font-semibold text-green-700 uppercase tracking-wide">{u.typ} · {u.see}</span>
                    <span className="block font-semibold text-ink group-hover:text-green-700 mt-1 leading-snug">{u.name}</span>
                    <span className="block text-caption text-ink-soft mt-0.5">{u.ort} · ab {u.abPreis}&thinsp;€/Nacht →</span>
                  </a>
                ))}
              </div>
              <p className="text-[11px] text-ink-soft mt-3">
                * Affiliate-Links – ohne Mehrkosten für dich. <Link href="/unterkuenfte/am-see" className="text-green-700 hover:underline">Alle Unterkünfte direkt am See →</Link>
              </p>
            </section>
          )}

          {/* FAQ – mit Rich-Snippet JSON-LD (alle Regionen mit FAQ) */}
          {FAQS_BY_REGION[bundesland] && (
            <section className="mb-12">
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: FAQS_BY_REGION[bundesland].map((f) => ({
                      '@type': 'Question',
                      name: f.q,
                      acceptedAnswer: { '@type': 'Answer', text: f.a },
                    })),
                  }),
                }}
              />
              <p className="eyebrow mb-2">FAQ</p>
              <h2 className="font-serif text-lead font-bold mb-5 text-ink">Häufige Fragen zu {region.name}</h2>
              <Faq items={FAQS_BY_REGION[bundesland]} />
            </section>
          )}

          {regionPosts.length === 0 && (
            <p className="text-ink-soft">Noch keine Artikel für diese Region vorhanden.</p>
          )}
        </>
      )}
    </div>
  );
}
