import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug } from '@/app/lib/posts';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import PostArtwork from '@/app/ui/post-artwork';

export const metadata: Metadata = {
  title: 'Feierabend-Ausflüge ab Wien, Graz & Salzburg – raus nach der Arbeit',
  description: 'Nach der Arbeit noch raus: kurze Feierabend-Ausflüge ab Wien, Graz und Salzburg – Abendbad, Sonnenuntergangs-Aussicht oder Buschenschank, alle unter ca. 45 Minuten Anfahrt.',
  keywords: ['Feierabend Ausflug Wien', 'Feierabend Ausflug Graz', 'Feierabend Ausflug Salzburg', 'nach der Arbeit raus', 'Abend Ausflug', 'Sonnenuntergang Ausflug'],
  alternates: { canonical: '/feierabend-ausfluege' },
};

// Kuratierte Feierabend-Ziele je Stadt (Anfahrt grob ≤ 45 Min., abendtauglich).
const CITIES: { name: string; note: string; picks: { slug: string; abend: string }[] }[] = [
  {
    name: 'Ab Wien',
    note: 'U-Bahn oder kurze Fahrt – und um 22 Uhr liegst du wieder im eigenen Bett.',
    picks: [
      { slug: 'wienerwald-wandern', abend: 'Kahlenberg zum Sonnenuntergang – danach Heuriger in Grinzing' },
      { slug: 'alte-donau-baden-wien', abend: 'Abendbad mit Blick auf die Skyline, bis Sonnenuntergang' },
      { slug: 'wien-prater', abend: 'Hauptallee-Runde nach Büroschluss, Riesenrad in der Dämmerung' },
      { slug: 'donauinsel-wien', abend: 'Sprung ins Wasser nach der Arbeit – U-Bahn hin, Sonnenuntergang über dem Wasser' },
      { slug: 'neusiedler-see-baden-segeln', abend: 'ca. 45 Min.: Abendwind, flacher See, weite Sonnenuntergänge' },
    ],
  },
  {
    name: 'Ab Graz',
    note: 'Hausberg, Schlosspark oder Buschenschank – alles in unter einer Dreiviertelstunde.',
    picks: [
      { slug: 'schoeckl-graz-hausberg', abend: 'Abendrunde am Grazer Hausberg – Seilbahn-Zeiten checken' },
      { slug: 'schloss-eggenberg-graz', abend: 'Pfauen im Abendlicht – der Park hat lange offen' },
      { slug: 'stubenbergsee-baden', abend: 'ca. 40 Min.: Abendbad im warmen Badesee' },
      { slug: 'suedsteirische-weinstrasse', abend: 'ca. 45 Min.: Buschenschank-Abend in den Weinhügeln' },
    ],
  },
  {
    name: 'Ab Salzburg',
    note: 'Zwischen Gaisberg und Seenland liegt der perfekte Feierabend nur Minuten entfernt.',
    picks: [
      { slug: 'gaisberg-salzburg-aussicht', abend: 'DER Feierabendberg: per Bus hinauf, Sonnenuntergang über der Stadt' },
      { slug: 'fuschlsee-baden', abend: 'ca. 25 Min.: Abendbad im smaragdgrünen See' },
      { slug: 'salzburger-seenland-baden', abend: 'Wallersee & Co – flache, warme Seen für den Abendsprung' },
      { slug: 'schloss-hellbrunn-salzburg', abend: 'Abendspaziergang durch den Schlosspark' },
      { slug: 'untersberg-salzburg', abend: 'Mit der Bahn hinauf – letzte Talfahrt unbedingt prüfen' },
    ],
  },
];

export default function FeierabendPage() {
  const allPicks = CITIES.flatMap((c) => c.picks).map((p) => ({ ...p, post: getPostBySlug(p.slug) })).filter((p) => p.post);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Feierabend-Ausflüge', url: `${BASE}/feierabend-ausfluege` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Feierabend-Ausflüge ab Wien, Graz und Salzburg',
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

      <p className="eyebrow mb-2">Nach der Arbeit</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Feierabend-Ausflüge: raus, bevor der Tag vorbei ist</h1>
      <p className="text-gray-500 max-w-2xl mb-8 leading-relaxed">
        Um 17 Uhr aus dem Büro, um 18 Uhr am Wasser oder am Aussichtsberg: kurze Ausflüge ab Wien,
        Graz und Salzburg – alle mit grob 45 Minuten Anfahrt oder weniger.
      </p>

      {/* Feierabend-Regeln */}
      <div className="border-l-4 border-amber-400 bg-amber-50 px-5 py-4 mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Kurz gecheckt, entspannt losgefahren</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-amber-500 inline-block" />Letzte Talfahrt von Seil- und Bergbahnen prüfen – am Abend fährt nichts nach</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-amber-500 inline-block" />Sonnenuntergangszeit checken und Stirnlampe einpacken, wenn es knapp wird</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-amber-500 inline-block" />Buschenschanken &amp; Hütten haben Schließtage – vorher kurz anrufen</li>
        </ul>
      </div>

      {CITIES.map((c) => (
        <section key={c.name} className="mb-14">
          <h2 className="font-serif text-2xl font-bold mb-1 text-gray-900">{c.name}</h2>
          <p className="text-sm text-gray-500 mb-5 max-w-2xl">{c.note}</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {c.picks.map(({ slug, abend }) => {
              const post = getPostBySlug(slug);
              if (!post) return null;
              return (
                <Link key={slug} href={`/blog/${slug}`} className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-green-400 hover:shadow-md transition-all">
                  <div className="aspect-[16/6]">
                    <PostArtwork seed={slug} category={post.category} />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-gray-400">{regionName(post.region)}</span>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-700 leading-snug mt-0.5">{post.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 border-l-2 border-amber-300 pl-2.5">
                      <span aria-hidden>🌇</span> {abend}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/wochenendtrip" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 6 }}>
          Mehr Zeit? Wochenendtrips
        </Link>
        <Link href="/ausfluege-nach-dauer" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Ausflüge nach Dauer
        </Link>
        <Link href="/bahnhofsausfluege" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Ausflüge ab Bahnhof
        </Link>
        <Link href="/ausflugsplaner" className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 6 }}>
          Alle Themenseiten
        </Link>
      </div>
    </div>
  );
}
