import Link from 'next/link';
import type { Metadata } from 'next';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';

export const metadata: Metadata = {
  title: 'Ausflugsplaner – alle Themenseiten auf einen Blick',
  description: 'Der schnellste Weg zum passenden Ausflugsziel: nach Wetter, Zeitfenster, Monat, Anreise oder Badesee sortiert. Alle Themenseiten des Bergseen Guide an einem Ort.',
  keywords: ['Ausflugsziele Österreich finden', 'Ausflugsplaner', 'Tagesausflug Österreich Ideen', 'Ausflug nach Wetter', 'Ausflug nach Zeit'],
  alternates: { canonical: '/ausflugsplaner' },
};

type Item = { href: string; title: string; desc: string };
type Group = { title: string; note: string; items: Item[] };

const GROUPS: Group[] = [
  {
    title: 'Nach Wetter',
    note: 'Erst das Wetter checken, dann das Ziel wählen.',
    items: [
      { href: '/regentaugliche-ausfluege', title: 'Ausflüge bei Regen', desc: 'Thermen, Höhlen, Burgen & Städte für den Schlechtwetter-Tag.' },
      { href: '/hitzefreundliche-ausfluege', title: 'Kühle Ausflüge bei Hitze', desc: 'Klammen, Höhlenkühle und Höhenluft für Tage über 30 Grad.' },
      { href: '/aussicht-ohne-anstrengung', title: 'Aussicht ohne Anstrengung', desc: 'Bergbahnen, Panoramastraßen & Aussichtstürme ohne langen Aufstieg.' },
    ],
  },
  {
    title: 'Nach Zeit',
    note: 'Wie viel Zeit steht wirklich zur Verfügung?',
    items: [
      { href: '/ausfluege-nach-dauer', title: 'Ausflüge nach Dauer', desc: 'Unter 2 Stunden, halber Tag, ganzer Tag oder Wochenende.' },
      { href: '/feierabend-ausfluege', title: 'Feierabend-Ausflüge', desc: 'Ab Wien, Graz & Salzburg – abendtauglich, unter 45 Minuten Anfahrt.' },
      { href: '/wochenendtrip', title: 'Wochenendtrips', desc: 'Kurztrips ab Wien, Graz, Salzburg, Linz, Innsbruck & Klagenfurt, nach Fahrzeit sortiert.' },
    ],
  },
  {
    title: 'Baden & Seen',
    note: 'Für alle, bei denen der See das Ziel ist – nicht nur die Zugabe.',
    items: [
      { href: '/seen-vergleich', title: 'Seen-Vergleich', desc: 'Wassertemperatur, Größe & Charakter der beliebtesten Seen im direkten Vergleich.' },
      { href: '/badeplaetze', title: 'Badeplatz-Check', desc: 'Konkrete Badeplätze, filterbar nach gratis, Schatten, flach, WC, Hund.' },
      { href: '/wandern-baden', title: 'Wandern + Baden', desc: 'Wanderung und Badesee kombiniert – erst der Gipfel, dann die Abkühlung.' },
    ],
  },
  {
    title: 'Nach Monat',
    note: 'Nicht jedes Ziel passt zu jeder Jahreszeit.',
    items: [
      { href: '/beste-ausfluege', title: 'Beste Ausflüge im Monat', desc: 'Kuratierte Tipps von Juli bis Dezember – mit Begründung, warum genau jetzt.' },
    ],
  },
  {
    title: 'Ohne Auto & mit Karte',
    note: 'Für die Anreise- und Routenplanung.',
    items: [
      { href: '/bahnhofsausfluege', title: 'Ausflüge ab Bahnhof', desc: 'Ziele direkt an der Bahnstrecke oder mit Schiff-/Bus-Anschluss – ohne Auto.' },
      { href: '/karte', title: 'Wanderkarte', desc: 'Interaktive Karte mit Wanderwegen, Gipfeln und Unterkünften.' },
      { href: '/routenplaner', title: 'Routenplaner', desc: 'Eigene Wanderroute planen, mit Höhenprofil und Schwierigkeitseinschätzung.' },
    ],
  },
];

export default function AusflugsplanerPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Ausflugsplaner', url: `${BASE}/ausflugsplaner` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Themenseiten des Bergseen Guide',
      numberOfItems: GROUPS.flatMap((g) => g.items).length,
      itemListElement: GROUPS.flatMap((g) => g.items).map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BASE}${item.href}`,
        name: item.title,
      })),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="eyebrow mb-2">Übersicht</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Der Ausflugsplaner</h1>
      <p className="text-gray-500 max-w-2xl mb-12 leading-relaxed">
        Statt durch alle Artikel zu scrollen: Hier sind alle Themenseiten des Bergseen Guide an
        einem Ort – sortiert nach Wetter, Zeitfenster, Monat, Anreise oder Badesee. Einfach das
        passende Kriterium wählen und direkt zu den kuratierten Zielen springen.
      </p>

      {GROUPS.map((g) => (
        <section key={g.title} className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-1 text-gray-900">{g.title}</h2>
          <p className="text-sm text-gray-500 mb-5 max-w-2xl">{g.note}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block border border-gray-200 p-5 hover:border-green-400 hover:shadow-md transition-all"
                style={{ borderRadius: 8 }}
              >
                <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-green-700">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{item.desc}</p>
                <span className="mt-3 inline-block text-sm font-medium text-green-700">Ansehen →</span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/blog" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 6 }}>
          Alle Artikel im Magazin
        </Link>
        <Link href="/#regionen" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Nach Bundesland stöbern
        </Link>
      </div>
    </div>
  );
}
