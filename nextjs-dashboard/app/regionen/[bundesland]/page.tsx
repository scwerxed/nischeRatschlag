import { regionen, getRegionBySlug } from '@/app/lib/regionen';
import { posts } from '@/app/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Faq from '@/app/ui/faq';
import { BASE, BASE_KEYWORDS, touristDestinationSchema, breadcrumbSchema } from '@/app/lib/seo';
import { FAQS_BY_REGION } from '@/app/lib/faqs';

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
      ? 'Kärntens schönste Wanderwege, Badeseen, Tiertouren und Ausflugsziele – mit echten Preisen, interaktiver Karte und 40+ Insider-Tipps für deinen Urlaub am Wörthersee.'
      : `${region.beschreibung} Wanderwege, Ausflugsziele, Unterkünfte und Insider-Tipps für deinen Urlaub in ${region.name}.`,
    keywords: isKaernten
      ? [...BASE_KEYWORDS, 'Kärnten Urlaub', 'Wörthersee Hotel', 'Kärnten Wandern']
      : [`${region.name} Urlaub`, `Wandern ${region.name}`, `Ausflug ${region.name}`, `${region.name} Sehenswürdigkeiten`, 'Österreich Urlaub'],
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

const KAERNTEN_SEASONS = [
  {
    season: 'Frühling',
    months: 'Apr – Mai',
    icon: '🌸',
    tip: 'Alpenrosen-Blüte, kaum Touristen, günstige Preise. Ideal für Wanderungen.',
  },
  {
    season: 'Sommer',
    months: 'Jun – Aug',
    icon: '☀️',
    tip: 'Seen bis 29°C, volle Programm. Frühzeitig buchen – Hochsaison.',
  },
  {
    season: 'Herbst',
    months: 'Sep – Okt',
    icon: '🍂',
    tip: 'Goldenes Licht, leere Strände, Berge ohne Gedränge. Geheimtipp-Zeit.',
  },
  {
    season: 'Winter',
    months: 'Nov – Mär',
    icon: '❄️',
    tip: 'Weissensee: Europas größte Natureisfläche zum Schlittschuhlaufen.',
  },
];

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

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Breadcrumb für alle aktiven Regionen */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Startseite', url: BASE },
        { name: region.name,  url: `${BASE}/regionen/${bundesland}` },
      ])) }} />
      {/* Kärnten zusätzlich: TouristDestination mit Attraktionen */}
      {bundesland === 'kaernten' && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristDestinationSchema()) }} />
      )}
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-green-600 hover:underline">
          ← Zurück zur Startseite
        </Link>
        <h1 className="font-serif text-4xl font-bold mt-3 mb-2 text-gray-900">{region.name}</h1>
        <p className="text-gray-500 max-w-2xl">{region.beschreibung}</p>
      </div>

      {/* Inaktive Region */}
      {!region.aktiv && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <p className="text-2xl mb-2">🏔️</p>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Demnächst verfügbar</h2>
          <p className="text-gray-500 text-sm">
            Wir arbeiten gerade an Inhalten für {region.name}. Schau bald wieder vorbei!
          </p>
          <Link
            href="/"
            className="mt-5 inline-block bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-green-800 transition-colors"
          >
            Zu Kärnten & Wörthersee
          </Link>
        </div>
      )}

      {/* Aktive Region */}
      {region.aktiv && (
        <>
          {/* Kärnten Intro */}
          {bundesland === 'kaernten' && (
            <div className="bg-green-800 text-white p-8 mb-8 border-l-4 border-sand-300">
              <p className="eyebrow text-green-300 mb-2">Österreichs Seenland</p>
              <h2 className="font-serif text-2xl font-bold mb-3">Alpenwandern und Badesommer in einem</h2>
              <p className="text-green-100 text-sm leading-relaxed mb-6 max-w-2xl">
                Über 1.270 Seen, Gipfel bis 3.798 m und das wärmste Seewasser Österreichs. Hier findest du
                kuratierte Insider-Tipps – mit konkreten Preisen, ehrlichen Bewertungen und Kombinationsrouten,
                die andere Websites nicht zeigen.
              </p>
              <div className="grid grid-cols-3 gap-px bg-white/15 border border-white/15 max-w-md">
                {[
                  { v: String(regionPosts.length), l: 'Artikel' },
                  { v: '1.270+', l: 'Seen' },
                  { v: '29 °C', l: 'max. Wassertemp.' },
                ].map((s) => (
                  <div key={s.l} className="bg-green-800 py-3 text-center">
                    <p className="font-serif font-bold text-xl">{s.v}</p>
                    <p className="text-green-200 text-xs mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Schnellnavigation */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase()}`}
                className="flex flex-col items-center bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 py-3 px-2 text-center transition-colors"
                style={{ borderRadius: 4 }}
              >
                <span className={`w-2.5 h-2.5 rounded-full mb-2 ${CATEGORY_DOT[cat] ?? 'bg-gray-400'}`} />
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{cat}</span>
                <span className="text-xs text-green-600 font-medium mt-0.5">{counts[cat]}</span>
              </a>
            ))}
          </div>

          {/* Karte & Routenplaner CTA */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <Link
              href="/karte"
              className="group flex items-start gap-4 bg-green-700 text-white rounded-xl p-5 hover:bg-green-800 transition-colors"
            >
              <span className="text-3xl">🗺️</span>
              <div>
                <p className="font-semibold text-lg leading-tight">Interaktive Wanderkarte</p>
                <p className="text-green-100 text-sm mt-1">
                  Alle Wanderwege und Gipfel in Kärnten auf einen Blick – inkl. Waymarked Trails Overlay.
                </p>
                <span className="mt-3 inline-block text-sm font-medium underline underline-offset-2">
                  Karte öffnen →
                </span>
              </div>
            </Link>
            <Link
              href="/routenplaner"
              className="group flex items-start gap-4 border-2 border-green-700 text-green-700 rounded-xl p-5 hover:bg-green-50 transition-colors"
            >
              <span className="text-3xl">📍</span>
              <div>
                <p className="font-semibold text-lg leading-tight">Routenplaner</p>
                <p className="text-gray-500 text-sm mt-1">
                  Eigene Wanderroute planen – Wegpunkte setzen, Distanz und Gehzeit berechnen.
                </p>
                <span className="mt-3 inline-block text-sm font-medium underline underline-offset-2">
                  Route planen →
                </span>
              </div>
            </Link>
          </div>

          {/* Beste Reisezeit */}
          {bundesland === 'kaernten' && (
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-bold mb-5 text-gray-900">Beste Reisezeit für Kärnten</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {KAERNTEN_SEASONS.map((s) => (
                  <div
                    key={s.season}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{s.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{s.season}</p>
                        <p className="text-xs text-gray-400">{s.months}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{s.tip}</p>
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
              <section key={cat} id={cat.toLowerCase()} className="mb-14">
                <h2 className="font-serif text-2xl font-bold mb-5 text-gray-900 flex items-baseline gap-2">
                  {cat}
                  <span className="text-sm font-sans font-normal text-gray-400">{catPosts.length} Artikel</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {catPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block border border-gray-200 rounded-xl p-6 hover:border-green-400 hover:shadow-md transition-all"
                    >
                      {/* Meta */}
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
                            {post.category}
                          </span>
                          {post.difficulty && (
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_STYLES[post.difficulty].cls}`}
                            >
                              {DIFFICULTY_STYLES[post.difficulty].label}
                            </span>
                          )}
                        </div>
                        {post.bestSeason && (
                          <span className="text-xs text-gray-400">{post.bestSeason}</span>
                        )}
                      </div>

                      {/* Titel */}
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-700 leading-snug mb-2">
                        {post.title}
                      </h3>

                      {/* Highlights */}
                      {post.highlights && post.highlights.length > 0 ? (
                        <ul className="space-y-0.5 mb-3">
                          {post.highlights.map((h, i) => (
                            <li key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
                              <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-sm text-gray-500 mb-3">{post.excerpt}</p>
                      )}

                      <span className="inline-block text-sm text-green-600 font-medium">
                        Weiterlesen →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

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
              <h2 className="font-serif text-2xl font-bold mb-5 text-gray-900">Häufige Fragen zu {region.name}</h2>
              <Faq items={FAQS_BY_REGION[bundesland]} />
            </section>
          )}

          {regionPosts.length === 0 && (
            <p className="text-gray-500">Noch keine Artikel für diese Region vorhanden.</p>
          )}
        </>
      )}
    </div>
  );
}
