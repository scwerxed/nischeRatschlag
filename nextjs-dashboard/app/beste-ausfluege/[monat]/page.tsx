import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MONATE, getMonat } from '@/app/lib/monatstipps';
import { getPostBySlug } from '@/app/lib/posts';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import { CATEGORY_STYLE } from '@/app/lib/blog-utils';
import PostArtwork from '@/app/ui/post-artwork';

type Props = { params: Promise<{ monat: string }> };

export function generateStaticParams() {
  return MONATE.map((m) => ({ monat: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { monat } = await params;
  const m = getMonat(monat);
  if (!m) return {};
  return {
    title: `Beste Ausflüge im ${m.name} – Österreich-Tipps für den Monat`,
    description: `${m.intro} Unsere kuratierten Ausflugsziele für den ${m.name} – mit Begründung, warum sich jedes Ziel genau jetzt lohnt.`,
    keywords: [`Ausflüge ${m.name}`, `Ausflugsziele ${m.name} Österreich`, `was tun im ${m.name}`, `${m.name} Urlaub Österreich`],
    alternates: { canonical: `/beste-ausfluege/${monat}` },
  };
}

export default async function MonatPage({ params }: Props) {
  const { monat } = await params;
  const m = getMonat(monat);
  if (!m) notFound();

  const picks = m.picks
    .map((p) => ({ ...p, post: getPostBySlug(p.slug) }))
    .filter((p) => p.post);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Beste Ausflüge', url: `${BASE}/beste-ausfluege` },
      { name: m.name, url: `${BASE}/beste-ausfluege/${monat}` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Beste Ausflüge im ${m.name}`,
      numberOfItems: picks.length,
      itemListElement: picks.map((p, i) => ({
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

      <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-5">
        <Link href="/" className="hover:text-green-700">Startseite</Link>
        <span>/</span>
        <Link href="/beste-ausfluege" className="hover:text-green-700">Beste Ausflüge</Link>
        <span>/</span>
        <span className="text-gray-600">{m.name}</span>
      </nav>

      <p className="eyebrow mb-2">Monats-Tipps</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Beste Ausflüge im {m.name}</h1>
      <p className="text-gray-500 max-w-2xl mb-10 leading-relaxed">{m.intro}</p>

      <div className="grid sm:grid-cols-2 gap-5">
        {picks.map(({ slug, warum, post }) => (
          <Link
            key={slug}
            href={`/blog/${slug}`}
            className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-green-400 hover:shadow-md transition-all"
          >
            <div className="aspect-[16/7]">
              <PostArtwork seed={slug} category={post!.category} />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className={`text-xs font-semibold uppercase tracking-wide ${CATEGORY_STYLE[post!.category]?.text ?? 'text-green-700'}`}>
                  {post!.category}
                </span>
                <span className="text-xs text-gray-400">{regionName(post!.region)}</span>
              </div>
              <h2 className="font-semibold text-gray-900 group-hover:text-green-700 leading-snug">{post!.title}</h2>
              <p className="mt-2 text-sm text-gray-600 border-l-2 border-green-300 pl-2.5">
                <strong className="font-semibold text-green-800">Warum jetzt?</strong> {warum}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Andere Monate */}
      <div className="mt-10 flex flex-wrap gap-2">
        {MONATE.filter((x) => x.slug !== monat).map((x) => (
          <Link
            key={x.slug}
            href={`/beste-ausfluege/${x.slug}`}
            className="text-sm font-medium px-4 py-1.5 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors"
            style={{ borderRadius: 999 }}
          >
            Beste Ausflüge im {x.name} →
          </Link>
        ))}
        <Link href="/wandern-baden" className="text-sm font-medium px-4 py-1.5 border border-gray-300 text-gray-600 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 999 }}>
          Wandern + Baden
        </Link>
      </div>
    </div>
  );
}
