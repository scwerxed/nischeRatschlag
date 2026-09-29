import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug } from '@/app/lib/posts';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import PostArtwork from '@/app/ui/post-artwork';
import { DAUER_GROUPS as GROUPS } from '@/app/lib/themen-picks';

export const metadata: Metadata = {
  title: 'Ausflüge nach Dauer – was passt in 2 Stunden, einen halben oder ganzen Tag?',
  description: 'Wie viel Zeit hast du? Ausflugsziele in Österreich nach Zeitfenster sortiert: unter 2 Stunden, halber Tag, ganzer Tag oder Wochenende – mit realistischer Zeitangabe pro Ziel.',
  keywords: ['Ausflug 2 Stunden', 'Halbtagesausflug Österreich', 'Tagesausflug Österreich', 'kurzer Ausflug', 'was tun heute Österreich', 'Ausflug wenig Zeit'],
  alternates: { canonical: '/ausfluege-nach-dauer' },
};

export default function DauerPage() {
  const allPicks = GROUPS.flatMap((g) => g.picks).map((p) => ({ ...p, post: getPostBySlug(p.slug) })).filter((p) => p.post);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Ausflüge nach Dauer', url: `${BASE}/ausfluege-nach-dauer` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Ausflüge nach Dauer',
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

      <p className="eyebrow mb-2">Planungshilfe</p>
      <h1 className="font-serif text-display font-bold mb-3 text-ink">Wie viel Zeit hast du?</h1>
      <p className="text-ink-soft max-w-2xl mb-10 leading-relaxed">
        Zwei Stunden Luft, ein freier Nachmittag oder ein ganzes Wochenende? Hier sind unsere
        Ziele nach Zeitfenster sortiert – mit realistischer Dauer statt Wunschdenken.
      </p>

      {GROUPS.map((g) => (
        <section key={g.title} className="mb-14">
          <h2 className="font-serif text-lead font-bold mb-1 text-ink">{g.title}</h2>
          <p className="text-caption text-ink-soft mb-5 max-w-2xl">{g.note}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.picks.map(({ slug, zeit }) => {
              const post = getPostBySlug(slug);
              if (!post) return null;
              return (
                <Link key={slug} href={`/blog/${slug}`} className="surface-card-interactive group block overflow-hidden">
                  <div className="aspect-[16/7]">
                    <PostArtwork seed={slug} category={post.category} />
                  </div>
                  <div className="p-4">
                    <span className="text-fine text-ink-soft">{regionName(post.region)}</span>
                    <h3 className="font-semibold text-ink group-hover:text-green-700 leading-snug mt-0.5">{post.title}</h3>
                    <p className="mt-2 text-caption text-ink-muted"><span aria-hidden>⏱</span> {zeit}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/wochenendtrip" className="inline-block bg-green-700 text-white text-caption font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors rounded-full">
          Wochenendtrips nach Startstadt
        </Link>
        <Link href="/feierabend-ausfluege" className="btn btn-secondary btn-sm">
          Feierabend-Ausflüge
        </Link>
        <Link href="/bahnhofsausfluege" className="btn btn-secondary btn-sm">
          Ausflüge ab Bahnhof
        </Link>
        <Link href="/zwei-ausfluege-an-einem-tag" className="btn btn-secondary btn-sm">
          Zwei Ausflüge an einem Tag
        </Link>
        <Link href="/ausflugsplaner" className="btn btn-quiet btn-sm">
          Alle Themenseiten
        </Link>
      </div>
    </div>
  );
}
