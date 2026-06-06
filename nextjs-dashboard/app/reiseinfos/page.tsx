import Link from 'next/link';
import type { Metadata } from 'next';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';

export const metadata: Metadata = {
  title: 'Kärnten Reiseinfos – Anreise, Maut, Kosten & Packliste',
  description: 'Alles Praktische für deinen Kärnten-Urlaub: Anreise mit Auto/Bahn, Vignette & Mautstraßen, beste Reisezeit, Kosten, Notfallnummern und Packliste.',
  keywords: ['Kärnten Anreise', 'Kärnten Maut', 'Vignette Österreich', 'Kärnten Reisetipps', 'Kärnten Urlaub Kosten', 'Großglockner Maut'],
  alternates: { canonical: '/reiseinfos' },
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-serif text-2xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-2">{title}</h2>
      <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function ReiseinfosPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: 'Startseite', url: BASE },
          { name: 'Reiseinfos', url: `${BASE}/reiseinfos` },
        ])) }}
      />

      <p className="eyebrow mb-2">Praktisches</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Kärnten Reiseinfos</h1>
      <p className="text-gray-500 mb-10">
        Das Wichtigste für die Planung deines Kärnten-Urlaubs auf einen Blick – Anreise, Maut,
        Kosten und was in den Koffer gehört.
      </p>

      <Block title="Anreise">
        <p><strong className="font-semibold text-gray-900">Mit dem Auto:</strong> Aus Deutschland über die A10 (Tauernautobahn) via Salzburg, aus der Schweiz über Tirol/A10. Achtung: In Österreich gilt <strong className="font-semibold text-gray-900">Vignettenpflicht</strong> auf Autobahnen.</p>
        <p><strong className="font-semibold text-gray-900">Mit der Bahn:</strong> Direktverbindungen von Wien (ca. 4 Std.) und München (ca. 4–5 Std.) nach Villach und Klagenfurt. Die ÖBB Nightjets aus Deutschland halten in Villach.</p>
        <p><strong className="font-semibold text-gray-900">Mit dem Flugzeug:</strong> Flughafen Klagenfurt (KLU) ist klein; größere Auswahl über Ljubljana (SLO, ~1 Std.) oder Salzburg (~2 Std.).</p>
      </Block>

      <Block title="Vignette & Mautstraßen">
        <p>Die <strong className="font-semibold text-gray-900">Autobahn-Vignette</strong> ist Pflicht: 10-Tage (~12 €), 2-Monate oder Jahres-Vignette. Erhältlich digital (ÖAMTC/ASFINAG) oder an Tankstellen. Die Digital-Vignette gilt erst ab dem 18. Tag nach Kauf rückwirkend nicht – früh kaufen.</p>
        <p>Zusätzlich <strong className="font-semibold text-gray-900">extra mautpflichtig</strong> (nicht in der Vignette enthalten):</p>
        <ul className="list-none space-y-1.5 border-l-2 border-green-200 pl-4">
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Großglockner Hochalpenstraße (~40 €/Tag PKW)</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Nockalmstraße (~20 €)</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Villacher Alpenstraße / Dobratsch (~22 €)</li>
        </ul>
      </Block>

      <Block title="Beste Reisezeit">
        <p>Juli/August sind am wärmsten (Seen bis 28 °C), aber am vollsten und teuersten. <strong className="font-semibold text-gray-900">Geheimtipp September:</strong> Wasser noch 22–25 °C, Preise bis 40 % günstiger, kaum Touristen. Details und ein Saison-Überblick auf der{' '}
          <Link href="/regionen/kaernten" className="text-green-700 hover:underline">Kärnten-Seite</Link>.</p>
      </Block>

      <Block title="Was kostet ein Kärnten-Urlaub?">
        <ul className="list-none space-y-1.5 border-l-2 border-green-200 pl-4">
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Campingplatz (Zelt + 2 Pers.): ab ~22 €/Nacht</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Ferienwohnung: ab ~60 €/Nacht</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Mittelklasse-Hotel am See: ~90–180 €/Nacht</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Strandbad-Eintritt: ~5–8 €/Tag</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Hauptgericht im Gasthaus: ~14–20 €</li>
        </ul>
        <p className="text-sm text-gray-500">Spar-Tipp: Viele Regionen geben mit der Übernachtung die <strong className="font-semibold text-gray-900">Kärnten Card</strong> aus – freier Eintritt zu über 100 Ausflugszielen.</p>
      </Block>

      <Block title="Notfallnummern">
        <ul className="list-none space-y-1.5 border-l-2 border-green-200 pl-4">
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Euro-Notruf: <strong className="font-semibold text-gray-900">112</strong></li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Rettung: 144 · Polizei: 133 · Feuerwehr: 122</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Bergrettung: <strong className="font-semibold text-gray-900">140</strong></li>
        </ul>
      </Block>

      <Block title="Packliste (Kurzfassung)">
        <p>Für Seen &amp; Berge gleichzeitig solltest du dabeihaben: Badesachen, feste Wanderschuhe, Regenjacke (Bergwetter wechselt schnell), Sonnenschutz, Trinkflasche, Mückenschutz für Seeufer-Abende und eine warme Schicht für höhere Lagen – oben kann es auch im Sommer kühl sein.</p>
      </Block>

      {/* CTA */}
      <div className="border-l-4 border-green-600 bg-green-50 px-5 py-4 mt-10">
        <p className="font-serif text-lg font-bold text-gray-900 mb-1">Bereit für die Planung?</p>
        <p className="text-sm text-gray-700 mb-3">Stöbere durch unsere Tipps oder plane direkt deine Wanderroute.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/blog" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 4 }}>Zum Magazin</Link>
          <Link href="/routenplaner" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-100 transition-colors" style={{ borderRadius: 4 }}>Route planen</Link>
        </div>
      </div>
    </div>
  );
}
