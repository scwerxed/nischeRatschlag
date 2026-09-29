import Link from 'next/link';
import type { Metadata } from 'next';
import { combosByRegion } from '@/app/lib/wandern-baden';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import Seewetter from '@/app/ui/seewetter';

export const metadata: Metadata = {
  title: 'Wandern + Baden in Österreich – erst auf den Berg, dann in den See',
  description: 'Die schönsten Sommer-Kombis Österreichs: Wanderungen mit Badesee in der Nähe – je Bundesland gebündelt, mit Entfernung, Schwierigkeit und Live-Wassertemperaturen. Erst Gipfel, dann Abkühlung.',
  keywords: ['Wandern und Baden Österreich', 'Wanderung mit Badesee', 'Sommer Wandern Österreich', 'Badeseen Wanderung', 'Abkühlung nach Wanderung', 'Bergsee baden'],
  alternates: { canonical: '/wandern-baden' },
};

const DIFF_BADGE: Record<string, string> = {
  leicht: 'bg-green-100 text-green-700',
  mittel: 'bg-yellow-100 text-yellow-700',
  schwer: 'bg-red-100 text-red-700',
};

export default function WandernBadenPage() {
  const groups = combosByRegion();
  const allCombos = groups.flatMap((g) => g.combos);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Wandern + Baden', url: `${BASE}/wandern-baden` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Wandern + Baden Kombis in Österreich',
      numberOfItems: allCombos.length,
      itemListElement: allCombos.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BASE}/blog/${c.wandern.slug}`,
        name: `${c.wandern.title} + ${c.baden.title}`,
      })),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-14 md:py-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="eyebrow mb-2">Sommer-Special</p>
      <h1 className="font-serif text-display font-bold mb-3 text-ink">Wandern + Baden: erst Gipfel, dann See</h1>
      <p className="text-ink-soft max-w-2xl mb-4 leading-relaxed">
        Die perfekte Sommer-Formel: vormittags wandern, nachmittags ins kühle Wasser. Wir haben
        Wanderungen mit dem jeweils nächstgelegenen Badeziel kombiniert – je Bundesland, mit
        Entfernung zwischen Tour und See.
      </p>
      <p className="text-fine text-ink-soft mb-10">Entfernungen als Luftlinie zwischen den Startpunkten.</p>

      {groups.map((g) => (
        <section key={g.region} className="mb-12">
          <h2 className="font-serif text-lead font-bold mb-5 text-ink">
            {regionName(g.region)}
            <Link href={`/regionen/${g.region}`} className="ml-3 text-caption font-sans font-normal text-green-700 hover:underline">
              Alle Artikel →
            </Link>
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {g.combos.map((c) => (
              <div key={`${c.wandern.slug}-${c.baden.slug}`} className="border border-hairline rounded-lg overflow-hidden transition-shadow">
                {/* Wanderung */}
                <Link href={`/blog/${c.wandern.slug}`} className="group block p-4 hover:bg-green-50 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-fine font-semibold uppercase tracking-wide text-green-700">Wanderung</span>
                    {c.wandern.difficulty && (
                      <span className={`text-fine font-medium px-2 py-0.5 rounded-full ${DIFF_BADGE[c.wandern.difficulty]}`}>
                        {c.wandern.difficulty}
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-ink group-hover:text-green-700 leading-snug">{c.wandern.title}</p>
                </Link>

                {/* Verbinder */}
                <div className="flex items-center gap-3 px-4">
                  <span className="h-px flex-1 bg-hairline" />
                  <span className="text-fine text-ink-soft whitespace-nowrap">↓ danach ≈ {Math.round(c.km)} km zum Wasser</span>
                  <span className="h-px flex-1 bg-hairline" />
                </div>

                {/* Badeziel */}
                <Link href={`/blog/${c.baden.slug}`} className="group block p-4 hover:bg-sky-50 transition-colors">
                  <span className="text-fine font-semibold uppercase tracking-wide text-sky-700">Baden</span>
                  <p className="font-semibold text-ink group-hover:text-sky-700 leading-snug mt-1">{c.baden.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Live-Wassertemperaturen */}
      <section className="mt-14">
        <p className="eyebrow mb-2">Live</p>
        <h2 className="font-serif text-lead font-bold mb-5 text-ink">Wie warm ist das Wasser gerade?</h2>
        <Seewetter />
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/seen-vergleich" className="inline-block bg-green-700 text-white text-caption font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors rounded-full">
          Seen im Vergleich
        </Link>
        <Link href="/wochenendtrip" className="btn btn-secondary btn-sm">
          Wochenendtrips
        </Link>
        <Link href="/hitzefreundliche-ausfluege" className="inline-block border border-amber-500 text-amber-700 text-caption font-semibold px-5 py-2.5 hover:bg-amber-50 transition-colors rounded-full">
          Kühle Ziele für Hitzetage
        </Link>
        <Link href="/ausflugsplaner" className="btn btn-quiet btn-sm">
          Alle Themenseiten
        </Link>
        <Link href="/badeplaetze" className="inline-block border border-sky-500 text-sky-700 text-caption font-semibold px-5 py-2.5 hover:bg-sky-50 transition-colors rounded-full">
          Badeplatz-Check
        </Link>
        <Link href="/zwei-ausfluege-an-einem-tag" className="btn btn-quiet btn-sm">
          Zwei Ausflüge an einem Tag
        </Link>
      </div>
    </div>
  );
}
