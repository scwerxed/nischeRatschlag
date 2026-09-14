import Link from 'next/link';
import type { Metadata } from 'next';
import { combosByRegion } from '@/app/lib/tagescombo';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import { CATEGORY_STYLE, CATEGORY_LABEL } from '@/app/lib/blog-utils';

// Volle Klassennamen literal im Quelltext, damit Tailwinds JIT sie erkennt
// (dynamisch zusammengesetzte `hover:${...}`-Strings werden nicht gefunden).
const HOVER_BG: Record<string, string> = {
  Wandern: 'hover:bg-green-50',
  Baden: 'hover:bg-sky-50',
  Ausflug: 'hover:bg-amber-50',
  Unterkunft: 'hover:bg-violet-50',
};

export const metadata: Metadata = {
  title: 'Zwei Ausflüge an einem Tag – Kombis für Vormittag & Nachmittag',
  description: 'Zwei nah beieinander liegende Ziele für einen vollen Tag: vormittags das eine, nachmittags das andere – je Bundesland kombiniert, mit Entfernung zwischen den Startpunkten.',
  keywords: ['zwei Ausflüge an einem Tag', 'Tagesausflug kombinieren Österreich', 'Vormittag Nachmittag Ausflug', 'Ausflugsziele kombinieren', 'Tagesplan Österreich'],
  alternates: { canonical: '/zwei-ausfluege-an-einem-tag' },
};

export default function ZweiAusfluegeAnEinemTagPage() {
  const groups = combosByRegion();
  const allCombos = groups.flatMap((g) => g.combos);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Zwei Ausflüge an einem Tag', url: `${BASE}/zwei-ausfluege-an-einem-tag` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Zwei-Ausflüge-Kombis in Österreich',
      numberOfItems: allCombos.length,
      itemListElement: allCombos.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BASE}/blog/${c.first.slug}`,
        name: `${c.first.title} + ${c.second.title}`,
      })),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="eyebrow mb-2">Tagesplaner</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Zwei Ausflüge an einem Tag</h1>
      <p className="text-gray-500 max-w-2xl mb-4 leading-relaxed">
        Wenn ein Ziel allein den Tag nicht füllt: Wir haben halbtagstaugliche Ausflüge kombiniert,
        die nah genug beieinander liegen, um beide an einem Tag zu schaffen – vormittags das eine,
        nachmittags das andere.
      </p>
      <p className="text-xs text-gray-400 mb-10">
        Entfernungen als Luftlinie zwischen den Startpunkten. Anspruchsvolle Wanderungen (mittel/schwer)
        sind bewusst ausgeschlossen – die füllen einen Tag allein.
      </p>

      {groups.map((g) => (
        <section key={g.region} className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-5 text-gray-900">
            {regionName(g.region)}
            <Link href={`/regionen/${g.region}`} className="ml-3 text-sm font-sans font-normal text-green-700 hover:underline">
              Alle Artikel →
            </Link>
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {g.combos.map((c) => (
              <div key={`${c.first.slug}-${c.second.slug}`} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                {/* Vormittag */}
                <Link href={`/blog/${c.first.slug}`} className={`group block p-4 ${HOVER_BG[c.first.category]} transition-colors`}>
                  <span className={`text-xs font-semibold uppercase tracking-wide ${CATEGORY_STYLE[c.first.category].text}`}>
                    Vormittag · {CATEGORY_LABEL[c.first.category]}
                  </span>
                  <p className="font-semibold text-gray-900 group-hover:text-green-700 leading-snug mt-1">{c.first.title}</p>
                </Link>

                {/* Verbinder */}
                <div className="flex items-center gap-3 px-4">
                  <span className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs text-gray-400 whitespace-nowrap">↓ danach ≈ {Math.round(c.km)} km weiter</span>
                  <span className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Nachmittag */}
                <Link href={`/blog/${c.second.slug}`} className={`group block p-4 ${HOVER_BG[c.second.category]} transition-colors`}>
                  <span className={`text-xs font-semibold uppercase tracking-wide ${CATEGORY_STYLE[c.second.category].text}`}>
                    Nachmittag · {CATEGORY_LABEL[c.second.category]}
                  </span>
                  <p className="font-semibold text-gray-900 group-hover:text-green-700 leading-snug mt-1">{c.second.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/ausfluege-nach-dauer" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 6 }}>
          Ausflüge nach Dauer
        </Link>
        <Link href="/wandern-baden" className="inline-block border border-sky-500 text-sky-700 text-sm font-semibold px-5 py-2.5 hover:bg-sky-50 transition-colors" style={{ borderRadius: 6 }}>
          Wandern + Baden
        </Link>
        <Link href="/wochenendtrip" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Wochenendtrips
        </Link>
        <Link href="/ausflugsplaner" className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 6 }}>
          Alle Themenseiten
        </Link>
      </div>
    </div>
  );
}
