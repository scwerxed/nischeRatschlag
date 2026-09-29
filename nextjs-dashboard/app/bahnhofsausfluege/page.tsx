import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug } from '@/app/lib/posts';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import PostArtwork from '@/app/ui/post-artwork';
import { BAHNHOF_GROUPS as GROUPS } from '@/app/lib/themen-picks';

export const metadata: Metadata = {
  title: 'Ausflug ab Bahnhof – Österreich ohne Auto entdecken',
  description: 'Ausflugsziele in Österreich, die per Bahn erreichbar sind: Ziele direkt an der Strecke, Kombis mit Schiff oder Bus und Städte mit U-Bahn-Anschluss – inklusive Anreise-Hinweis pro Ziel.',
  keywords: ['Ausflug ohne Auto', 'Ausflug mit Zug Österreich', 'Bahn Ausflugsziele', 'Ausflug ab Bahnhof', 'öffentlich erreichbar Wandern', 'Klimaticket Ausflug'],
  alternates: { canonical: '/bahnhofsausfluege' },
};

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
    <div className="max-w-5xl mx-auto px-6 py-14 md:py-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="eyebrow mb-2">Ohne Auto</p>
      <h1 className="font-serif text-display font-bold mb-3 text-ink">Ausflug ab Bahnhof</h1>
      <p className="text-ink-soft max-w-2xl mb-8 leading-relaxed">
        Kein Auto, kein Problem: Diese Ziele erreichst du bequem mit der Bahn – vom Badesee mit
        eigenem Bahnhof bis zur Fähre nach Hallstatt. Mit konkretem Anreise-Hinweis pro Ziel.
      </p>

      {/* Öffi-Tipps */}
      <div className="border-l-4 border-green-600 bg-green-50 px-5 py-4 mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Öffi-Tipps</p>
        <ul className="space-y-1.5 text-caption text-ink-muted">
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />Mit dem <strong className="font-semibold">Klimaticket</strong> sind alle diese Ziele ohne Zusatzkosten erreichbar</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />Letzte Rückverbindung <strong className="font-semibold">vor</strong> der Abfahrt prüfen – Regionalstrecken enden früh</li>
          <li className="flex items-start gap-2.5"><span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />Am Wochenende gelten oft ausgedünnte Takte – Scotty/ÖBB-App nutzen</li>
        </ul>
      </div>

      {GROUPS.map((g) => (
        <section key={g.title} className="mb-16 md:mb-20">
          <h2 className="font-serif text-lead font-bold mb-1 text-ink">{g.title}</h2>
          <p className="text-caption text-ink-soft mb-5 max-w-2xl">{g.note}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.picks.map(({ slug, anreise }) => {
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
                    <p className="mt-2 text-caption text-ink-muted border-l-2 border-green-300 pl-2.5">
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
        <Link href="/ausfluege-nach-dauer" className="btn btn-secondary btn-sm">
          Ausflüge nach Dauer
        </Link>
        <Link href="/feierabend-ausfluege" className="btn btn-secondary btn-sm">
          Feierabend-Ausflüge
        </Link>
        <Link href="/ausflugsplaner" className="btn btn-quiet btn-sm">
          Alle Themenseiten
        </Link>
      </div>
    </div>
  );
}
