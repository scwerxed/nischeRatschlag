import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MONATE, getMonat } from '@/app/lib/monatstipps';
import { getPostBySlug } from '@/app/lib/posts';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import { CATEGORY_STYLE } from '@/app/lib/blog-utils';
import PostBild from '@/app/ui/post-bild';

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
    <div className="max-w-5xl mx-auto px-6 py-14 md:py-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="flex flex-wrap items-center gap-2 text-fine text-ink-soft mb-5">
        <Link href="/" className="hover:text-signal-dark">Startseite</Link>
        <span>/</span>
        <Link href="/beste-ausfluege" className="hover:text-signal-dark">Beste Ausflüge</Link>
        <span>/</span>
        <span className="text-ink-muted">{m.name}</span>
      </nav>

      <p className="eyebrow mb-2">Monats-Tipps</p>
      <h1 className="font-serif text-display font-extrabold mb-3 text-ink">Beste Ausflüge im {m.name}</h1>
      <p className="text-ink-soft max-w-2xl mb-10 leading-relaxed">{m.intro}</p>

      <div className="grid sm:grid-cols-2 gap-5">
        {picks.map(({ slug, warum, post }) => (
          <Link
            key={slug}
            href={`/blog/${slug}`}
            className="surface-card-interactive group block overflow-hidden"
          >
            <div className="aspect-[16/7]">
              <PostBild slug={slug} category={post!.category} />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className={`font-mono text-[11.5px] uppercase tracking-[0.06em] ${CATEGORY_STYLE[post!.category]?.text ?? 'text-green-700'}`}>
                  {post!.category}
                </span>
                <span className="text-fine text-ink-soft">{regionName(post!.region)}</span>
              </div>
              <h2 className="font-semibold text-ink group-hover:underline decoration-signal decoration-2 underline-offset-4 leading-snug">{post!.title}</h2>
              <p className="mt-2 text-caption text-ink-muted border-l-2 border-ink pl-2.5">
                <strong className="font-semibold text-ink">Warum jetzt?</strong> {warum}
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
            className="text-caption font-medium px-4 py-1.5 bg-sand-50 text-ink border border-hairline hover:border-ink transition-colors rounded-sm"
          >
            Beste Ausflüge im {x.name} →
          </Link>
        ))}
        <Link href="/wandern-baden" className="text-caption font-medium px-4 py-1.5 border border-hairline text-ink-muted hover:border-ink hover:text-signal-dark transition-colors rounded-sm">
          Wandern + Baden
        </Link>
      </div>
    </div>
  );
}
