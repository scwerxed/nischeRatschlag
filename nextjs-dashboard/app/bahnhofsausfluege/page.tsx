import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug } from '@/app/lib/posts';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import PostArtwork from '@/app/ui/post-artwork';

export const metadata: Metadata = {
  title: 'Ausflug ab Bahnhof – Österreich ohne Auto entdecken',
  description: 'Ausflugsziele in Österreich, die per Bahn erreichbar sind: Ziele direkt an der Strecke, Kombis mit Schiff oder Bus und Städte mit U-Bahn-Anschluss – inklusive Anreise-Hinweis pro Ziel.',
  keywords: ['Ausflug ohne Auto', 'Ausflug mit Zug Österreich', 'Bahn Ausflugsziele', 'Ausflug ab Bahnhof', 'öffentlich erreichbar Wandern', 'Klimaticket Ausflug'],
  alternates: { canonical: '/bahnhofsausfluege' },
};

// Kuratierte Öffi-Ziele – „anreise“ = konkreter Bahn-Hinweis.
const GROUPS: { title: string; note: string; picks: { slug: string; anreise: string }[] }[] = [
  {
    title: 'Ziel direkt an der Bahn',
    note: 'Aussteigen und loslegen – diese Ziele liegen wenige Gehminuten vom Bahnhof entfernt.',
    picks: [
      { slug: 'schneeberg-wandern', anreise: 'Bahnhof Puchberg – die Zahnradbahn startet direkt daneben' },
      { slug: 'zell-am-see-zeller-see', anreise: 'Bahnhof Zell am See liegt direkt am See' },
      { slug: 'bregenz-bodensee', anreise: 'Vom Bahnhof in 5 Min. an der Seepromenade' },
      { slug: 'stift-melk', anreise: 'Bahnhof Melk, ca. 15 Min. zu Fuß zum Stift' },
      { slug: 'festung-kufstein', anreise: 'Bahnhof Kufstein, 10 Min. zur Festung' },
      { slug: 'seefeld-tirol', anreise: 'Die Mittenwaldbahn hält mitten im Ort' },
      { slug: 'kitzbuehel-ausflug', anreise: 'Bahnhof Kitzbühel im Ortszentrum' },
    ],
  },
  {
    title: 'Bahn + Schiff oder Bus',
    note: 'Ein Umstieg gehört dazu – dafür beginnt das Erlebnis schon bei der Anreise.',
    picks: [
      { slug: 'hallstatt-salzkammergut', anreise: 'Bahn bis Hallstatt, dann die Fähre über den See – schönste Ankunft Österreichs' },
      { slug: 'rax-seilbahn', anreise: 'Bahn bis Payerbach-Reichenau, Bus zur Seilbahn' },
      { slug: 'traunsee-gmunden', anreise: 'Bahn bis Gmunden, Straßenbahn bis zum See' },
      { slug: 'attersee-baden', anreise: 'Lokalbahn ab Vöcklamarkt direkt an den See' },
      { slug: 'wolfgangsee-st-gilgen', anreise: 'Bahn bis Salzburg oder Bad Ischl, Bus an den See' },
      { slug: 'wachau-duernstein', anreise: 'Bahn bis Krems oder Melk, weiter per Schiff oder Rad' },
    ],
  },
  {
    title: 'Stadt & U-Bahn',
    note: 'Städtische Ziele, bei denen das Auto nur stören würde.',
    picks: [
      { slug: 'wien-schoenbrunn', anreise: 'U4 Station Schönbrunn' },
      { slug: 'wien-prater', anreise: 'U1/U2 Praterstern' },
      { slug: 'alte-donau-baden-wien', anreise: 'U1 Alte Donau' },
      { slug: 'salzburg-stadt-altstadt', anreise: 'Vom Hauptbahnhof per Bus oder 20 Min. zu Fuß' },
      { slug: 'graz-altstadt-sehenswuerdigkeiten', anreise: 'Straßenbahn ab Hauptbahnhof ins Zentrum' },
      { slug: 'innsbruck-sehenswuerdigkeiten', anreise: 'Altstadt 10 Min. vom Hauptbahnhof' },
      { slug: 'linz-ausflug', anreise: 'Straßenbahn ab Hauptbahnhof zum Hauptplatz' },
    ],
  },
];

export default function BahnhofsausfluegePage() {
  const allPicks = GROUPS.flatMap((g) => g.picks).map((p) => ({ ...p, post: getPostBySlug(p.slug) })).filter((p) => p.post);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Ausflug ab Bahnhof', url: `${BASE}/bahnhofsausfluege` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Ausflüge ab Bahnhof in Österreich',
      numberOfItems: allPicks.length,
      itemListElement: allPicks.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BASE}/blog/${p.slug}`,
        name: p.post!.title,
      })),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="eyebrow mb-2">Ohne Auto</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Ausflug ab Bahnhof</h1>
      <p className="text-gray-500 max-w-2xl mb-8 leading-relaxed">
        Kein Auto, kein Problem: Diese Ziele erreichst du bequem mit der Bahn – vom Badesee mit
        eigenem Bahnhof bis zur Fähre nach Hallstatt. Mit konkretem Anreise-Hinweis pro Ziel.
      </p>

      {/* Öffi-Tipps */}
      <div className="border-l-4 border-green-600 bg-green-50 px-5 py-4 mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Öffi-Tipps</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />Mit dem <strong className="font-semibold">Klimaticket</strong> sind alle diese Ziele ohne Zusatzkosten erreichbar</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />Letzte Rückverbindung <strong className="font-semibold">vor</strong> der Abfahrt prüfen – Regionalstrecken enden früh</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />Am Wochenende gelten oft ausgedünnte Takte – Scotty/ÖBB-App nutzen</li>
        </ul>
      </div>

      {GROUPS.map((g) => (
        <section key={g.title} className="mb-14">
          <h2 className="font-serif text-2xl font-bold mb-1 text-gray-900">{g.title}</h2>
          <p className="text-sm text-gray-500 mb-5 max-w-2xl">{g.note}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.picks.map(({ slug, anreise }) => {
              const post = getPostBySlug(slug);
              if (!post) return null;
              return (
                <Link key={slug} href={`/blog/${slug}`} className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-green-400 hover:shadow-md transition-all">
                  <div className="aspect-[16/7]">
                    <PostArtwork seed={slug} category={post.category} />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-gray-400">{regionName(post.region)}</span>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-700 leading-snug mt-0.5">{post.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 border-l-2 border-green-300 pl-2.5">
                      <span aria-hidden>🚆</span> {anreise}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/ausfluege-nach-dauer" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Ausflüge nach Dauer
        </Link>
        <Link href="/feierabend-ausfluege" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Feierabend-Ausflüge
        </Link>
        <Link href="/ausflugsplaner" className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 6 }}>
          Alle Themenseiten
        </Link>
      </div>
    </div>
  );
}
