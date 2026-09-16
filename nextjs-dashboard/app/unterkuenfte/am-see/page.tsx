import Link from 'next/link';
import type { Metadata } from 'next';
import { unterkuenfteAmSee, lakeSlugFor, TYP_INFO } from '@/app/lib/unterkuenfte';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import { cloak } from '@/app/lib/affiliate';

export const metadata: Metadata = {
  title: 'Unterkünfte am See – Hotels, Ferienwohnungen & Camping direkt am Wasser',
  description: 'Übernachten direkt am Badesee: Hotels, Ferienwohnungen und Campingplätze am Wörthersee, Attersee, Neusiedler See & Co. – gebündelt nach Bundesland, mit direktem Buchungslink.',
  keywords: ['Unterkunft am See Österreich', 'Hotel am See', 'Ferienwohnung am Badesee', 'Camping am See Österreich', 'übernachten am Wörthersee', 'Hotel Attersee'],
  alternates: { canonical: '/unterkuenfte/am-see' },
};

export default function UnterkuenfteAmSeePage() {
  const stays = unterkuenfteAmSee();
  const regions = [...new Set(stays.map((s) => s.region))];
  // Reihenfolge stabil nach Anzahl Unterkünfte (meiste zuerst) statt Einfüge-Reihenfolge.
  regions.sort((a, b) => stays.filter((s) => s.region === b).length - stays.filter((s) => s.region === a).length);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Unterkünfte am See', url: `${BASE}/unterkuenfte/am-see` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Unterkünfte direkt am Badesee',
      numberOfItems: stays.length,
      itemListElement: stays.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${s.name} (${s.see})`,
      })),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-5">
        <Link href="/" className="hover:text-green-700">Startseite</Link>
        <span>/</span>
        <Link href="/seen-vergleich" className="hover:text-green-700">Seen</Link>
        <span>/</span>
        <span className="text-gray-600">Unterkünfte am See</span>
      </nav>

      <p className="eyebrow mb-2">Übernachten</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Unterkünfte direkt am See</h1>
      <p className="text-gray-500 max-w-2xl mb-4 leading-relaxed">
        Wer morgens vor dem Frühstück schon im Wasser sein will, sollte auch dort übernachten:
        Hotels, Ferienwohnungen und Campingplätze mit direkter Lage an einem der beliebtesten
        Badeseen Österreichs – nach Bundesland sortiert.
      </p>
      <p className="text-xs text-gray-400 mb-10">* Affiliate-Links über booking.com – ohne Mehrkosten für dich.</p>

      {regions.map((region) => {
        const regionStays = stays.filter((s) => s.region === region);
        return (
          <section key={region} className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-5 text-gray-900">
              {regionName(region)}
              <Link href={`/regionen/${region}`} className="ml-3 text-sm font-sans font-normal text-green-700 hover:underline">
                Alle Artikel →
              </Link>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {regionStays.map((u) => {
                const seeSlug = lakeSlugFor(u.see);
                return (
                  <a
                    key={u.id}
                    href={cloak(u.bookingUrl)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="group block border border-gray-200 p-4 hover:border-green-400 hover:bg-green-50 transition-colors"
                    style={{ borderRadius: 8 }}
                  >
                    <span className="block text-xs font-semibold text-green-700 uppercase tracking-wide">
                      {u.typ} · {u.see}
                    </span>
                    <span className="block font-semibold text-gray-900 group-hover:text-green-700 mt-1 leading-snug">{u.name}</span>
                    <span className="block text-sm text-gray-500 mt-0.5">{u.ort} · ab {u.abPreis}&thinsp;€/Nacht →</span>
                    {seeSlug && (
                      <span className="block text-xs text-sky-700 mt-2">Mehr über {u.see} im Artikel</span>
                    )}
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Legende der Unterkunftstypen */}
      <div className="mb-10 flex flex-wrap gap-4 text-xs text-gray-500">
        {Object.entries(TYP_INFO).map(([typ, info]) => (
          <span key={typ} className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: info.color }} />
            {typ}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/seen-vergleich" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 6 }}>
          Seen im Vergleich
        </Link>
        <Link href="/karte" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Auf der Karte ansehen
        </Link>
        <Link href="/wandern-baden" className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 6 }}>
          Wandern + Baden
        </Link>
        <Link href="/ausflugsplaner" className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 6 }}>
          Alle Themenseiten
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-6">Preise sind Richtwerte („ab“-Preise) und können je nach Saison und Verfügbarkeit abweichen – aktuelle Preise direkt beim Anbieter prüfen.</p>
    </div>
  );
}
