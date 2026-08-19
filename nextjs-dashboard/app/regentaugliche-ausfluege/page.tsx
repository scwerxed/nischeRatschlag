import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug } from '@/app/lib/posts';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import PostArtwork from '@/app/ui/post-artwork';

export const metadata: Metadata = {
  title: 'Ausflüge bei Regen – der Plan B für Schlechtwetter in Österreich',
  description: 'Regen im Urlaub? Thermen, Höhlen und Bergwerke, Burgen und Museen sowie Städte mit Arkaden: die besten regentauglichen Ausflugsziele in Österreich – ehrlich sortiert nach „wie trocken bleibt man wirklich".',
  keywords: ['Ausflug bei Regen Österreich', 'Schlechtwetter Ausflugsziele', 'was tun bei Regen Urlaub', 'Indoor Ausflug Österreich', 'Regentag Österreich', 'Therme bei Regen'],
  alternates: { canonical: '/regentaugliche-ausfluege' },
};

// Kuratierte Schlechtwetter-Ziele, gruppiert danach, wie gut sie Regen vertragen.
const GROUPS: { title: string; note: string; picks: { slug: string; warum: string }[] }[] = [
  {
    title: 'Komplett drinnen: Thermen & Wasserwelten',
    note: 'Der klassische Regentag-Retter – warmes Wasser, Dampf und Ruhe, während es draußen schüttet. Familien planen am besten einen halben bis ganzen Tag ein.',
    picks: [
      { slug: 'therme-loipersdorf-steiermark', warum: 'Große Thermenlandschaft mit Sauna- und Familienbereich – ein Regentag vergeht hier schnell.' },
      { slug: 'rogner-bad-blumau-therme', warum: 'Hundertwasser-Architektur als Sehenswürdigkeit für sich – schauen und baden zugleich.' },
      { slug: 'therme-burgenland-lutzmannsburg', warum: 'Stark auf Familien mit kleinen Kindern ausgelegt, viel überdachter Wasserspaß.' },
      { slug: 'bad-kleinkirchheim-therme-ski', warum: 'Thermalwasser mit Bergblick – funktioniert bei Regen genauso wie bei Sonne.' },
    ],
  },
  {
    title: 'Unter Tage: Höhlen & Bergwerke',
    note: 'Im Berg ist das Wetter egal. Wichtig: Drinnen ist es dauerhaft kühl (oft um 10 °C oder darunter) – warme Jacke und feste Schuhe gehören auch im Hochsommer ins Gepäck.',
    picks: [
      { slug: 'eisriesenwelt-werfen', warum: 'Die größte Eishöhle der Welt – der Zustieg ist allerdings im Freien, Regenjacke einpacken.' },
      { slug: 'lurgrotte-tropfsteinhoehle-steiermark', warum: 'Führung durch die größte Tropfsteinhöhle Österreichs, weitgehend wettergeschützt.' },
      { slug: 'salzwelten-hallein-duerrnberg', warum: 'Rutschen, Grubenbahn und Salzsee tief im Berg – klassischer Familien-Plan-B.' },
      { slug: 'erzberg-eisenerz-steiermark', warum: 'Schaubergwerk unter Tage; die Fahrt mit dem Riesen-Muldenkipper ist dagegen im Freien.' },
    ],
  },
  {
    title: 'Kultur im Trockenen: Burgen, Stifte & Museen',
    note: 'Innenräume mit Substanz – gut für zwei bis drei Stunden. Bei vielen Burgen liegen Höfe und Zuwege im Freien, ein Schirm schadet also nie.',
    picks: [
      { slug: 'stift-admont-bibliothek', warum: 'Die größte Klosterbibliothek der Welt plus Museen – viel Programm komplett drinnen.' },
      { slug: 'stift-melk', warum: 'Bibliothek, Marmorsaal und Stiftskirche; nur der Park will trockenes Wetter.' },
      { slug: 'schloss-eggenberg-graz', warum: 'Prunkräume und Museen unter einem Dach, gut mit der Grazer Altstadt kombinierbar.' },
      { slug: 'burg-hochosterwitz-ausflug', warum: 'Sehr fotogen, aber Achtung: Der Aufstieg über die 14 Tore verläuft im Freien.' },
      { slug: 'burg-hohenwerfen', warum: 'Innenräume und Museum im Trockenen – die Greifvogelschau findet draußen statt.' },
      { slug: 'festung-kufstein', warum: 'Über die Standseilbahn hinauf, viel Ausstellung im Inneren der Festung.' },
      { slug: 'riegersburg-burg-ausflug', warum: 'Burgmuseum plus Schokoladen- und Haubenmanufaktur im Tal als Schlechtwetter-Reserve.' },
      { slug: 'eisenstadt-schloss-esterhazy', warum: 'Schlossräume und Haydnsaal – kompakter Kulturausflug für einen Regenvormittag.' },
    ],
  },
  {
    title: 'Erlebniswelten für Familien',
    note: 'Wenn Kinder dabei sind und der Tag gerettet werden muss: Ziele, bei denen der Großteil überdacht ist.',
    picks: [
      { slug: 'swarovski-kristallwelten', warum: 'Die Wunderkammern sind komplett drinnen; Garten und Spielturm liegen im Freien.' },
      { slug: 'minimundus-klagenfurt', warum: 'Ehrlich gesagt eher ein Schönwetter-Ziel – die Modelle stehen im Park. Nur bei leichtem Nieselregen sinnvoll.' },
    ],
  },
  {
    title: 'Städte bei Regen',
    note: 'Altstädte mit Arkaden, Passagen, Kaffeehäusern und Museen in Gehweite – da lässt sich ein Guss gut aussitzen.',
    picks: [
      { slug: 'graz-altstadt-sehenswuerdigkeiten', warum: 'Landhaushof, Passagen und Museen liegen dicht beieinander – kurze Wege zwischen Trockenzonen.' },
      { slug: 'innsbruck-sehenswuerdigkeiten', warum: 'Goldenes Dachl, Hofburg und Museen kompakt in der Altstadt.' },
      { slug: 'salzburg-stadt-altstadt', warum: 'Getreidegasse, Festung und Museen – Salzburg ist Regen gewohnt.' },
      { slug: 'wien-schoenbrunn', warum: 'Prunkräume, Palmenhaus und Wagenburg als Innenprogramm, wenn der Park ausfällt.' },
      { slug: 'wien-stephansdom-altstadt', warum: 'Dom, Katakomben und die Kaffeehäuser ringsum – Wiens bester Regentag-Klassiker.' },
      { slug: 'museumsquartier-wien', warum: 'Mehrere Museen auf einem Areal, dazwischen überdachte Arkaden – ein ganzer Regentag ohne Umsteigen.' },
      { slug: 'schloss-belvedere-wien', warum: 'Klimt-Sammlung im Oberen Belvedere; der Garten geht auch bei Nieselwetter.' },
      { slug: 'linz-ausflug', warum: 'Ars Electronica Center und Lentos liegen zentral – Linz punktet gerade bei Schlechtwetter.' },
      { slug: 'klagenfurt-stadtfuehrung', warum: 'Kompakte Altstadt mit Innenhöfen und Lokalen, gut als Wörthersee-Ersatzprogramm.' },
    ],
  },
  {
    title: 'Wasserfälle & Klammen – bei Regen oft am schönsten',
    note: '⚠️ Wichtig: Klammen und Wasserfallwege können bei Starkregen wegen Steinschlag oder Hochwasser gesperrt werden. Vorab die Betreiber-Seite prüfen und bei Gewitter grundsätzlich verzichten. Bei leichtem Regen dagegen führen die Fälle am meisten Wasser.',
    picks: [
      { slug: 'krimmler-wasserfaelle', warum: 'Nach Regen besonders gewaltig – Regenjacke sowieso nötig, der Sprühnebel macht ohnehin nass.' },
      { slug: 'liechtensteinklamm', warum: 'Die enge Schlucht wirkt bei feuchtem Wetter noch dramatischer. Sperren vorab prüfen.' },
      { slug: 'wasserlochklamm-palfau', warum: 'Steg und Wasserfälle direkt am Weg; bei starkem Regen kann gesperrt werden.' },
    ],
  },
];

export default function RegenPage() {
  const allPicks = GROUPS.flatMap((g) => g.picks).map((p) => ({ ...p, post: getPostBySlug(p.slug) })).filter((p) => p.post);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Ausflüge bei Regen', url: `${BASE}/regentaugliche-ausfluege` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Regentaugliche Ausflugsziele in Österreich',
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

      <p className="eyebrow mb-2">Plan B</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Ausflüge bei Regen: der Schlechtwetter-Plan für Österreich</h1>
      <p className="text-gray-500 max-w-2xl mb-8 leading-relaxed">
        Ein verregneter Urlaubstag ist kein verlorener Tag – man muss nur umplanen. Hier sind Ziele,
        die bei Regen funktionieren, sortiert danach, wie trocken man dabei wirklich bleibt.
        Wir sagen auch dazu, wo es trotzdem Regenjacke braucht.
      </p>

      {/* Regen-Tipps */}
      <div className="border-l-4 border-sky-400 bg-sky-50 px-5 py-4 mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Vor dem Losfahren</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-sky-500 inline-block" />Öffnungszeiten und Ruhetage vorab prüfen – gerade außerhalb der Hauptsaison</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-sky-500 inline-block" />An Regentagen sind Thermen und Museen voll: früh da sein oder Tickets vorab sichern</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-sky-500 inline-block" />Höhlen und Bergwerke sind dauerhaft kühl – warme Schicht auch im Sommer einpacken</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-sky-500 inline-block" />Klammen &amp; Wasserfallwege können bei Starkregen gesperrt sein – Betreiber-Info checken</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-sky-500 inline-block" />Bei Gewitter gilt: keine Bergtour, keine Klamm, keine exponierte Aussichtsplattform</li>
        </ul>
      </div>

      {GROUPS.map((g) => (
        <section key={g.title} className="mb-14">
          <h2 className="font-serif text-2xl font-bold mb-1 text-gray-900">{g.title}</h2>
          <p className="text-sm text-gray-500 mb-5 max-w-2xl">{g.note}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.picks.map(({ slug, warum }) => {
              const post = getPostBySlug(slug);
              if (!post) return null;
              return (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-green-400 hover:shadow-md transition-all"
                >
                  <div className="aspect-[16/7]">
                    <PostArtwork seed={slug} category={post.category} />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-gray-400">{regionName(post.region)}</span>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-700 leading-snug mt-0.5">{post.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 border-l-2 border-sky-300 pl-2.5">
                      <strong className="font-semibold text-sky-800">Bei Regen:</strong> {warum}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/hitzefreundliche-ausfluege" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 6 }}>
          Und bei Hitze?
        </Link>
        <Link href="/ausfluege-nach-dauer" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Ausflüge nach Dauer
        </Link>
        <Link href="/beste-ausfluege" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Beste Ausflüge im Monat
        </Link>
      </div>
    </div>
  );
}
