import Link from 'next/link';
import type { Metadata } from 'next';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';

export const metadata: Metadata = {
  title: 'Österreich Reiseinfos – Anreise, Vignette, Maut & Kosten',
  description: 'Alles Praktische für deinen Österreich-Urlaub: Anreise mit Auto/Bahn/Flug, Vignette & Mautstraßen, beste Reisezeit, Kosten, Notfallnummern und Packliste.',
  keywords: ['Österreich Anreise', 'Vignette Österreich', 'Maut Österreich', 'Österreich Reisetipps', 'Österreich Urlaub Kosten', 'Alpenstraßen Maut'],
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
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Österreich Reiseinfos</h1>
      <p className="text-gray-500 mb-10">
        Das Wichtigste für die Planung deines Österreich-Urlaubs auf einen Blick – Anreise, Maut,
        Kosten und was in den Koffer gehört.
      </p>

      <Block title="Anreise">
        <p><strong className="font-semibold text-gray-900">Mit dem Auto:</strong> Aus Deutschland über Tirol (A93/Inntal), Salzburg (A8→A10) oder Richtung Osten nach Wien; aus der Schweiz über Vorarlberg/Tirol. In Österreich gilt auf Autobahnen <strong className="font-semibold text-gray-900">Vignettenpflicht</strong>.</p>
        <p><strong className="font-semibold text-gray-900">Mit der Bahn:</strong> Die ÖBB verbinden alle Landeshauptstädte (Wien, Salzburg, Innsbruck, Graz, Klagenfurt); Railjet aus Deutschland und Nightjets halten an den großen Knoten.</p>
        <p><strong className="font-semibold text-gray-900">Mit dem Flugzeug:</strong> Internationale Flughäfen in Wien (VIE), Salzburg (SZG), Innsbruck (INN), Graz (GRZ) und Klagenfurt (KLU).</p>
      </Block>

      <Block title="Vignette & Mautstraßen">
        <p>Die <strong className="font-semibold text-gray-900">Autobahn-Vignette</strong> ist Pflicht: 10-Tage (~12 €), 2-Monate oder Jahres-Vignette. Erhältlich digital (ÖAMTC/ASFINAG) oder an Tankstellen. Die Digital-Vignette gilt erst ab dem 18. Tag nach Kauf rückwirkend nicht – früh kaufen.</p>
        <p>Zusätzlich <strong className="font-semibold text-gray-900">extra mautpflichtig</strong> (nicht in der Vignette enthalten):</p>
        <ul className="list-none space-y-1.5 border-l-2 border-green-200 pl-4">
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Großglockner Hochalpenstraße – Salzburg/Kärnten (~40 €/Tag PKW)</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Timmelsjoch Hochalpenstraße – Tirol (~30 €)</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Silvretta-Hochalpenstraße – Tirol/Vorarlberg (~17 €)</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Nockalmstraße – Kärnten (~20 €)</li>
        </ul>
      </Block>

      <Block title="Beste Reisezeit">
        <p>Juli/August sind am wärmsten (Badeseen bis 28 °C), aber am vollsten und teuersten. <strong className="font-semibold text-gray-900">Geheimtipp September:</strong> Wasser vielerorts noch 22–25 °C, Preise deutlich günstiger, kaum Touristen. Region-spezifische Saison-Tipps findest du auf den{' '}
          <Link href="/#regionen" className="text-green-700 hover:underline">Regionenseiten</Link>.</p>
      </Block>

      <Block title="Was kostet ein Österreich-Urlaub?">
        <ul className="list-none space-y-1.5 border-l-2 border-green-200 pl-4">
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Campingplatz (Zelt + 2 Pers.): ab ~22 €/Nacht</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Ferienwohnung: ab ~60 €/Nacht</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Mittelklasse-Hotel am See: ~90–180 €/Nacht</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Strandbad-Eintritt: ~5–8 €/Tag</li>
          <li className="flex gap-2"><span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500" />Hauptgericht im Gasthaus: ~14–20 €</li>
        </ul>
        <p className="text-sm text-gray-500">Spar-Tipp: Viele Regionen geben mit der Übernachtung eine <strong className="font-semibold text-gray-900">Gästekarte</strong> aus (z. B. Kärnten Card, SalzburgerLand Card, Tirols Gästekarten) – oft mit freiem Eintritt zu zahlreichen Ausflugszielen oder Bergbahnen.</p>
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
