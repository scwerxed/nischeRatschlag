import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug } from '@/app/lib/posts';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import PostArtwork from '@/app/ui/post-artwork';
import { HITZE_GROUPS as GROUPS } from '@/app/lib/themen-picks';

export const metadata: Metadata = {
  title: 'Hitzefreundliche Sommerausflüge – kühle Ziele für heiße Tage',
  description: 'Wohin bei 35 Grad? Kühle Klammen und Höhlen, Höhenluft über 1.500 m und Ziele direkt am Wasser: hitzefreundliche Ausflüge in Österreich – mit Tipps für heiße Tage.',
  keywords: ['Ausflug bei Hitze', 'kühle Ausflugsziele Österreich', 'Ausflug 35 Grad', 'Klamm Österreich', 'Abkühlung Sommer Ausflug', 'wohin bei Hitze'],
  alternates: { canonical: '/hitzefreundliche-ausfluege' },
};

export default function HitzePage() {
  const allPicks = GROUPS.flatMap((g) => g.picks).map((p) => ({ ...p, post: getPostBySlug(p.slug) })).filter((p) => p.post);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Hitzefreundliche Ausflüge', url: `${BASE}/hitzefreundliche-ausfluege` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Hitzefreundliche Sommerausflüge in Österreich',
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

      <p className="eyebrow mb-2">Sommer-Special</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Hitzefreundliche Ausflüge: kühle Ziele für heiße Tage</h1>
      <p className="text-gray-500 max-w-2xl mb-8 leading-relaxed">
        35 Grad im Tal? Dann eben dorthin, wo es von Natur aus kühl ist: in Klammen und Höhlen,
        in die Höhenluft der Berge oder direkt ans (frische) Wasser.
      </p>

      {/* Hitze-Tipps */}
      <div className="border-l-4 border-amber-400 bg-amber-50 px-5 py-4 mb-12 max-w-2xl">
        <p className="eyebrow mb-2">An Hitzetagen beachten</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-amber-500 inline-block" />Früh starten – die Mittagshitze (12–16 Uhr) im Schatten oder im Wasser verbringen</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-amber-500 inline-block" />Mindestens 2–3 Liter Wasser pro Person mitnehmen</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-amber-500 inline-block" />Für Höhlen &amp; Gletscher warme Schicht einpacken – drinnen/oben ist es kalt</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-amber-500 inline-block" />Nachmittags-Gewitter im Gebirge einplanen (Wetterbericht!)</li>
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
                      <strong className="font-semibold text-sky-800">Kühl-Faktor:</strong> {warum}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/wandern-baden" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 6 }}>
          Wandern + Baden Kombis
        </Link>
        <Link href="/seen-vergleich" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Seen im Vergleich
        </Link>
        <Link href="/ausflugsplaner" className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 6 }}>
          Alle Themenseiten
        </Link>
      </div>
    </div>
  );
}
