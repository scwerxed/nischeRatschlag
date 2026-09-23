import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug } from '@/app/lib/posts';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import PostArtwork from '@/app/ui/post-artwork';
import { FAMILIEN_GROUPS as GROUPS } from '@/app/lib/themen-picks';

export const metadata: Metadata = {
  title: 'Ausflugsziele mit Kindern in Österreich – Familienausflüge',
  description: 'Tiere zum Anfassen, Erlebniswelten, Badeseen mit flachem Einstieg und kurze Naturwege: kuratierte Familienausflüge in ganz Österreich, mit einem konkreten Tipp je Ziel.',
  keywords: ['Ausflugsziele mit Kindern Österreich', 'Familienausflug Österreich', 'Ausflug mit Kindern', 'kinderwagentaugliche Wege', 'Badesee flacher Einstieg Kinder'],
  alternates: { canonical: '/familienausfluege' },
};

export default function FamilienausfluegePage() {
  const allPicks = GROUPS.flatMap((g) => g.picks).map((p) => ({ ...p, post: getPostBySlug(p.slug) })).filter((p) => p.post);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Familienausflüge', url: `${BASE}/familienausfluege` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Ausflugsziele mit Kindern in Österreich',
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

      <p className="eyebrow mb-2">Mit Kindern unterwegs</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Familienausflüge: Ausflugsziele mit Kindern</h1>
      <p className="text-gray-500 max-w-2xl mb-8 leading-relaxed">
        Tiere zum Anfassen, Erlebniswelten, warme Badeseen mit flachem Einstieg und kurze Wege mit
        großer Kulisse – kuratierte Ziele, bei denen Kinder nicht nur mitkommen, sondern Spaß haben.
      </p>

      {/* Familien-Check */}
      <div className="border-l-4 border-sky-400 bg-sky-50 px-5 py-4 mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Familien-Check vor dem Losfahren</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-sky-500 inline-block" />Kinderwagen oder Trage? Nur ausdrücklich „kinderwagentaugliche“ Wege sind ohne Stufen und Wurzeln – im Zweifel die Trage mitnehmen</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-sky-500 inline-block" />Öffnungszeiten, Vorführzeiten und Familientarife vorab beim Betreiber prüfen – sie ändern sich je nach Saison</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-sky-500 inline-block" />Lieber ein Ziel richtig als drei hektisch – Pausen, Spielplatz und Jause einplanen</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-sky-500 inline-block" />Wechselkleidung einpacken: Wasserfälle, Klammen und Badeseen machen nass, Höhlen und Bergwerke sind kühl</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-sky-500 inline-block" />Sonnenschutz und genug zu trinken – gerade an Seen und in der Höhe unterschätzt man die Sonne leicht</li>
        </ul>
      </div>

      {GROUPS.map((g) => (
        <section key={g.title} className="mb-14">
          <h2 className="font-serif text-2xl font-bold mb-1 text-gray-900">{g.title}</h2>
          <p className="text-sm text-gray-500 mb-5 max-w-2xl">{g.note}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.picks.map(({ slug, tipp }) => {
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
                      <span aria-hidden>🧒</span> {tipp}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/seen-vergleich/familienseen" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 6 }}>
          Familienseen im Vergleich
        </Link>
        <Link href="/aussicht-ohne-anstrengung" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Aussicht ohne Anstrengung
        </Link>
        <Link href="/regentaugliche-ausfluege" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Ausflüge bei Regen
        </Link>
        <Link href="/ausflugsplaner" className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 6 }}>
          Alle Themenseiten
        </Link>
      </div>
    </div>
  );
}
