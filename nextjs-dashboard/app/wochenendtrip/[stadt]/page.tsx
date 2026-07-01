import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TRIP_CITIES, tripsFrom } from '@/app/lib/wochenendtrip';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import { CATEGORY_STYLE } from '@/app/lib/blog-utils';
import PostArtwork from '@/app/ui/post-artwork';

type Props = { params: Promise<{ stadt: string }> };

export function generateStaticParams() {
  return Object.keys(TRIP_CITIES).map((stadt) => ({ stadt }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stadt } = await params;
  const city = TRIP_CITIES[stadt];
  if (!city) return {};
  return {
    title: `Wochenendtrip ab ${city.name} – Ausflüge & Kurztrips nach Fahrzeit`,
    description: `Die schönsten Ausflüge und Wochenendtrips ab ${city.name} – nach Fahrzeit sortiert: unter 1 Stunde, 1–2 und 2–3 Stunden. Seen, Wanderungen und Sehenswürdigkeiten mit echten Tipps.`,
    keywords: [`Ausflug ab ${city.name}`, `Wochenendtrip ${city.name}`, `Tagesausflug ${city.name}`, `Ausflugsziele ${city.name} Umgebung`, 'Kurztrip Österreich'],
    alternates: { canonical: `/wochenendtrip/${stadt}` },
    openGraph: { title: `Wochenendtrip ab ${city.name}`, url: `${BASE}/wochenendtrip/${stadt}`, locale: 'de_AT' },
  };
}

export default async function WochenendtripStadtPage({ params }: Props) {
  const { stadt } = await params;
  const city = TRIP_CITIES[stadt];
  if (!city) notFound();

  const groups = tripsFrom(stadt);
  const allItems = groups.flatMap((g) => g.items);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Wochenendtrips', url: `${BASE}/wochenendtrip` },
      { name: `Ab ${city.name}`, url: `${BASE}/wochenendtrip/${stadt}` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Wochenendtrip ab ${city.name}`,
      numberOfItems: allItems.length,
      itemListElement: allItems.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BASE}/blog/${it.post.slug}`,
        name: it.post.title,
      })),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-5">
        <Link href="/" className="hover:text-green-700">Startseite</Link>
        <span>/</span>
        <Link href="/wochenendtrip" className="hover:text-green-700">Wochenendtrips</Link>
        <span>/</span>
        <span className="text-gray-600">Ab {city.name}</span>
      </nav>

      <p className="eyebrow mb-2">Wochenendtrip</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Ausflüge & Kurztrips ab {city.name}</h1>
      <p className="text-gray-500 max-w-2xl mb-4 leading-relaxed">{city.intro}</p>
      <p className="text-xs text-gray-400 mb-10">Entfernungen als Luftlinie – die tatsächliche Fahrzeit hängt von Route und Verkehr ab.</p>

      {groups.length === 0 && (
        <p className="text-gray-500">Für diese Stadt sind noch keine Ausflüge hinterlegt.</p>
      )}

      {groups.map((g) => (
        <section key={g.bucket.key} className="mb-14">
          <h2 className="font-serif text-2xl font-bold mb-5 text-gray-900 flex items-baseline gap-2">
            {g.bucket.label}
            <span className="text-sm font-sans font-normal text-gray-400">{g.items.length} Ziele</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.items.map(({ post, km }) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-green-400 hover:shadow-md transition-all"
              >
                <div className="aspect-[16/9]">
                  <PostArtwork seed={post.slug} category={post.category} />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-xs font-semibold uppercase tracking-wide ${CATEGORY_STYLE[post.category]?.text ?? 'text-green-700'}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">≈ {Math.round(km)} km</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-700 leading-snug">{post.title}</h3>
                  <span className="mt-1 block text-xs text-gray-500">{regionName(post.region)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/wochenendtrip" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Andere Startstädte
        </Link>
        <Link href="/blog" className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 6 }}>
          Alle Artikel
        </Link>
      </div>
    </div>
  );
}
