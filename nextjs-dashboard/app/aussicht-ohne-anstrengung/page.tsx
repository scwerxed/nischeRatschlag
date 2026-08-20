import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug } from '@/app/lib/posts';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import PostArtwork from '@/app/ui/post-artwork';

export const metadata: Metadata = {
  title: 'Aussicht ohne Anstrengung – Bergblick ohne lange Wanderung',
  description: 'Großes Panorama, wenig Höhenmeter: Bergbahnen, Panoramastraßen, Aussichtstürme und kurze Wege in Österreich – Ziele für alle, die die Aussicht wollen, aber nicht den Aufstieg.',
  keywords: ['Aussicht ohne Wandern', 'Bergbahn Österreich Aussicht', 'Panoramastraße Österreich', 'Ausflug ohne Anstrengung', 'Aussichtspunkt mit Seilbahn', 'Bergblick ohne Aufstieg'],
  alternates: { canonical: '/aussicht-ohne-anstrengung' },
};

// Kuratierte Aussichtsziele, gruppiert nach Art des "Aufstiegs".
const GROUPS: { title: string; note: string; picks: { slug: string; warum: string }[] }[] = [
  {
    title: 'Seilbahn hoch, Aussicht sofort',
    note: 'Bergbahnen nehmen dir den kompletten Aufstieg ab. Oben wartet meist ein Gasthaus mit Terrasse – mehr braucht es nicht für einen guten Tag.',
    picks: [
      { slug: 'rax-seilbahn', warum: 'Österreichs älteste Personenseilbahn bringt dich aufs sanfte Hochplateau – oben genügen flache Wege.' },
      { slug: 'schoeckl-graz-hausberg', warum: 'Grazer Hausberg per Seilbahn: Rundblick über die Steiermark ohne einen einzigen Höhenmeter zu Fuß.' },
      { slug: 'untersberg-salzburg', warum: 'In Minuten von Salzburg-Nähe auf über 1.800 m – der Blick reicht weit über Stadt und Alpenvorland.' },
      { slug: 'dachstein-krippenstein', warum: 'Mehrsektionen-Seilbahn hinauf zum „5fingers"-Aussichtssteg mit Blick über den Hallstätter See.' },
      { slug: 'kitzsteinhorn-kaprun', warum: 'Gletscherwelt und Aussichtsplattform auf rund 3.000 m, komplett per Bahn erschlossen.' },
      { slug: 'hintertuxer-gletscher', warum: 'Ganzjahres-Gletscher – Hochgebirgspanorama auch dann, wenn Wandern keine Option ist.' },
      { slug: 'luenersee-wandern', warum: 'Die Bahn bringt dich direkt an den Seespiegel auf knapp 2.000 m; der Uferweg ist flach.' },
      { slug: 'festung-kufstein', warum: 'Standseilbahn statt Burgberg-Aufstieg – Innblick und Altstadtpanorama inklusive.' },
    ],
  },
  {
    title: 'Panoramastraßen: Aussicht ab dem Parkplatz',
    note: 'Hier fährst du direkt in die Höhe. Beachte: Diese Straßen sind in der Regel mautpflichtig und im Winter gesperrt – Öffnungszeitraum und Tarife vorab beim Betreiber prüfen.',
    picks: [
      { slug: 'grossglockner-tagesausflug', warum: 'Die Hochalpenstraße führt bis über 2.500 m; an der Kaiser-Franz-Josefs-Höhe steht man direkt vor dem Gletscher.' },
      { slug: 'nockalmstrasse-panoramastrasse', warum: 'Sanfte Nockberge-Kuppen, viele Parkbuchten mit Aussicht – Panorama fast ohne Aussteigen.' },
      { slug: 'silvretta-hochalpenstrasse', warum: 'Serpentinen zum Stausee auf über 2.000 m mit Blick auf die Gletscher der Silvretta.' },
      { slug: 'villacher-alpe-dobratsch-wanderung', warum: 'Die Alpenstraße führt weit hinauf; von den oberen Parkplätzen ist es nur noch ein kurzer Weg zur Aussicht.' },
      { slug: 'gaisberg-salzburg-aussicht', warum: 'Salzburgs Hausberg ist bis fast zum Gipfel befahrbar – der beste Stadtblick mit minimalem Aufwand.' },
    ],
  },
  {
    title: 'Aussichtstürme & Plattformen',
    note: 'Gebaute Aussicht: Lift oder kurze Treppe, dafür ein Rundumblick, den man sich sonst erwandern müsste.',
    picks: [
      { slug: 'pyramidenkogel-woerthersee', warum: 'Höchster Holzaussichtsturm der Welt mit Lift – Rundblick über den Wörthersee und die Karawanken.' },
      { slug: 'dachstein-gletscher-skywalk', warum: 'Hängebrücke, Skywalk und „Treppe ins Nichts" direkt bei der Bergstation.' },
      { slug: 'hallstatt-salzkammergut', warum: 'Der Skywalk „Welterbeblick" ist per Schrägaufzug erreichbar – der berühmteste Blick des Salzkammerguts.' },
      { slug: 'geschriebenstein-wandern-burgenland', warum: 'Aussichtsturm auf dem höchsten Punkt des Burgenlands, über kurze Waldwege erreichbar.' },
    ],
  },
  {
    title: 'Kurze Wege, große Wirkung',
    note: 'Kein Lift nötig – hier stimmt einfach das Verhältnis: wenig Höhenmeter, viel Landschaft. Gut für Familien und alle, die es gemütlich mögen.',
    picks: [
      { slug: 'schneeberg-wandern', warum: 'Die Zahnradbahn erledigt den Aufstieg; oben reicht eine kurze Plateaurunde für alpines Panorama.' },
      { slug: 'gosausee-dachstein-spiegelung', warum: 'Flacher Uferweg, und der Dachstein spiegelt sich im See – eines der schönsten Motive Österreichs.' },
      { slug: 'wienerwald-wandern', warum: 'Kahlenberg und Leopoldsberg sind mit Bus erreichbar, der Blick über Wien beginnt am Parkplatz.' },
      { slug: 'maria-woerth-woerthersee', warum: 'Die Halbinsel-Kirche liegt eben am Ufer – Postkartenblick über den See ohne jeden Anstieg.' },
    ],
  },
];

export default function AussichtPage() {
  const allPicks = GROUPS.flatMap((g) => g.picks).map((p) => ({ ...p, post: getPostBySlug(p.slug) })).filter((p) => p.post);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Aussicht ohne Anstrengung', url: `${BASE}/aussicht-ohne-anstrengung` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Aussichtsziele in Österreich ohne langen Aufstieg',
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

      <p className="eyebrow mb-2">Gemütlich unterwegs</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Aussicht ohne Anstrengung: Bergblick ohne lange Wanderung</h1>
      <p className="text-gray-500 max-w-2xl mb-8 leading-relaxed">
        Nicht jeder will – oder kann – 1.000 Höhenmeter steigen, um ein Panorama zu sehen.
        Diese Ziele liefern die Aussicht trotzdem: per Seilbahn, über eine Panoramastraße,
        mit dem Lift auf einen Turm oder über einen wirklich kurzen Weg.
      </p>

      {/* Hinweise */}
      <div className="border-l-4 border-green-500 bg-green-50 px-5 py-4 mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Vorher wissen</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />Bergbahnen und Panoramastraßen sind kostenpflichtig – Tarife und Betriebszeiten vorab prüfen</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />Viele Bahnen und Hochalpenstraßen haben Saison- und Revisionspausen, im Winter oft gesperrt</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />Oben ist es deutlich kühler und windiger als im Tal – auch im Hochsommer eine warme Schicht mitnehmen</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />Letzte Talfahrt notieren, sonst wird aus dem gemütlichen Ausflug doch ein langer Abstieg</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />Barrierefreiheit ist von Ziel zu Ziel sehr verschieden – bei Bedarf konkret beim Betreiber nachfragen</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />Bei Nebel bringt die schönste Bergbahn nichts: Bergwetter und Webcams vor der Fahrt checken</li>
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
                    <p className="mt-2 text-sm text-gray-600 border-l-2 border-green-300 pl-2.5">
                      <strong className="font-semibold text-green-800">Warum leicht:</strong> {warum}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/ausfluege-nach-dauer" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 6 }}>
          Ausflüge nach Dauer
        </Link>
        <Link href="/bahnhofsausfluege" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Ziele mit Öffis
        </Link>
        <Link href="/regentaugliche-ausfluege" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Plan B bei Regen
        </Link>
        <Link href="/ausflugsplaner" className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 6 }}>
          Alle Themenseiten
        </Link>
      </div>
    </div>
  );
}
