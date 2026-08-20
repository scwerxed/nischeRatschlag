import Link from 'next/link';
import type { Metadata } from 'next';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';
import { LAKES, SEE_THEMEN } from '@/app/lib/seen';

export const metadata: Metadata = {
  title: 'Österreichs Seen im Vergleich – welcher Badesee passt zu dir?',
  description: 'Wörthersee, Klopeiner See, Neusiedler See, Achensee & Co. im direkten Vergleich: Wassertemperatur, Größe, Charakter und für wen sich welcher österreichische Badesee am besten eignet.',
  keywords: ['welcher See Österreich', 'wärmster See Österreich', 'Badeseen Österreich Vergleich', 'See Familie Österreich', 'schönster Badesee Österreich'],
  alternates: { canonical: '/seen-vergleich' },
};

export default function SeenVergleichPage() {
  const jsonLd = breadcrumbSchema([
    { name: 'Startseite', url: BASE },
    { name: 'Seen-Vergleich', url: `${BASE}/seen-vergleich` },
  ]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="eyebrow mb-2">Entscheidungshilfe</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Österreichs Seen im Vergleich</h1>
      <p className="text-gray-500 mb-8 max-w-2xl">
        Österreich hat Tausende Badeseen – von den warmen Seen im Süden bis zu glasklaren
        Bergseen in den Alpen. Hier die beliebtesten im direkten Vergleich: Wassertemperatur,
        Charakter und für wen sich welcher See eignet.
      </p>

      {/* Entscheidungs-Seiten nach Thema */}
      <div className="flex flex-wrap gap-2 mb-8 -mt-2">
        {SEE_THEMEN.map((t) => (
          <Link
            key={t.slug}
            href={`/seen-vergleich/${t.slug}`}
            className="text-sm font-medium px-4 py-1.5 bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 transition-colors"
            style={{ borderRadius: 999 }}
          >
            {t.h1} →
          </Link>
        ))}
        <Link
          href="/badeplaetze"
          className="text-sm font-medium px-4 py-1.5 bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 transition-colors"
          style={{ borderRadius: 999 }}
        >
          Badeplatz-Check (gratis, Schatten, flach …) →
        </Link>
      </div>

      {/* Tabelle (Desktop) */}
      <div className="hidden md:block overflow-x-auto border border-gray-200" style={{ borderRadius: 8 }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-800 text-white text-left">
              <th className="px-4 py-3 font-semibold">See</th>
              <th className="px-4 py-3 font-semibold">Region</th>
              <th className="px-4 py-3 font-semibold">max. Wassertemp.</th>
              <th className="px-4 py-3 font-semibold">Größe</th>
              <th className="px-4 py-3 font-semibold">Charakter</th>
              <th className="px-4 py-3 font-semibold">Ideal für</th>
              <th className="px-4 py-3 font-semibold">Gratis baden</th>
            </tr>
          </thead>
          <tbody>
            {LAKES.map((l, i) => (
              <tr key={l.name} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3 font-semibold text-gray-900">
                  {l.slug ? <Link href={`/blog/${l.slug}`} className="text-green-700 hover:underline">{l.name}</Link> : l.name}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{l.region}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{l.maxTemp}</td>
                <td className="px-4 py-3 text-gray-600">{l.groesse}</td>
                <td className="px-4 py-3 text-gray-600">{l.charakter}</td>
                <td className="px-4 py-3 text-gray-600">{l.idealFuer}</td>
                <td className="px-4 py-3">
                  {l.gratis
                    ? <span className="text-green-700 font-medium">ja</span>
                    : <span className="text-gray-400">Strandbad</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Karten (Mobil) */}
      <div className="md:hidden space-y-3">
        {LAKES.map((l) => (
          <div key={l.name} className="border border-gray-200 p-4" style={{ borderRadius: 8 }}>
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-lg font-bold text-gray-900">
                {l.slug ? <Link href={`/blog/${l.slug}`} className="text-green-700">{l.name}</Link> : l.name}
              </h2>
              <span className="text-sm font-semibold text-cyan-700">{l.maxTemp}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{l.region} · {l.charakter} · {l.groesse}</p>
            <p className="text-sm text-gray-500 mt-1">Ideal für: {l.idealFuer}</p>
            <p className="text-xs text-gray-500 mt-2">{l.gratis ? '✓ Gratis-Bademöglichkeit' : 'Strandbad mit Eintritt'} · {l.tipp}</p>
          </div>
        ))}
      </div>

      {/* Tipps-Spalte */}
      <div className="mt-8 border-l-4 border-green-600 bg-green-50 px-5 py-4">
        <p className="eyebrow mb-3">Kurz-Empfehlung</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" /><strong className="font-semibold text-gray-900">Wärmstes Wasser:</strong>&nbsp;Klopeiner See &amp; Wörthersee (bis 28 °C)</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" /><strong className="font-semibold text-gray-900">Familien:</strong>&nbsp;Klopeiner See &amp; Weissensee (flach, ruhig)</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" /><strong className="font-semibold text-gray-900">Ruhe &amp; Natur:</strong>&nbsp;Weissensee &amp; Achensee</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" /><strong className="font-semibold text-gray-900">Action &amp; Ausgehen:</strong>&nbsp;Wörthersee</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" /><strong className="font-semibold text-gray-900">Bergpanorama:</strong>&nbsp;Zeller See &amp; Achensee</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" /><strong className="font-semibold text-gray-900">Segeln &amp; Wind:</strong>&nbsp;Neusiedler See &amp; Achensee</li>
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/blog" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 4 }}>Alle Badeseen-Artikel</Link>
        <Link href="/karte" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 4 }}>Auf der Karte ansehen</Link>
        <Link href="/ausflugsplaner" className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 4 }}>Alle Themenseiten</Link>
      </div>

      <p className="text-xs text-gray-400 mt-6">Wassertemperaturen sind sommerliche Höchstwerte (Juli/August) und können je nach Wetter schwanken.</p>
    </div>
  );
}
