import { regionen, getRegionBySlug } from '@/app/lib/regionen';
import { posts } from '@/app/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = { params: Promise<{ bundesland: string }> };

export async function generateStaticParams() {
  return regionen.map((r) => ({ bundesland: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bundesland } = await params;
  const region = getRegionBySlug(bundesland);
  if (!region) return {};
  return {
    title: region.name,
    description: region.beschreibung,
  };
}

export default async function RegionPage({ params }: Props) {
  const { bundesland } = await params;
  const region = getRegionBySlug(bundesland);
  if (!region) notFound();

  const regionPosts = posts.filter((p) => p.region === bundesland);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link href="/" className="text-sm text-green-600 hover:underline">
          ← Zurück zur Startseite
        </Link>
        <h1 className="text-3xl font-bold mt-3 mb-2">{region.name}</h1>
        <p className="text-gray-500">{region.beschreibung}</p>
      </div>

      {/* Inaktive Region */}
      {!region.aktiv && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <p className="text-2xl mb-2">🏔️</p>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Demnächst verfügbar</h2>
          <p className="text-gray-500 text-sm">
            Wir arbeiten gerade an Inhalten für {region.name}. Schau bald wieder vorbei!
          </p>
          <Link
            href="/"
            className="mt-5 inline-block bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-green-800 transition-colors"
          >
            Zu Kärnten & Wörthersee
          </Link>
        </div>
      )}

      {/* Aktive Region mit Posts */}
      {region.aktiv && regionPosts.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {regionPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-gray-200 rounded-xl p-6 hover:border-green-400 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
              <h2 className="font-semibold text-lg text-gray-900 group-hover:text-green-700 leading-snug">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-gray-500">{post.excerpt}</p>
              <span className="mt-4 inline-block text-sm text-green-600 font-medium">
                Weiterlesen →
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Aktive Region aber noch keine Posts */}
      {region.aktiv && regionPosts.length === 0 && (
        <p className="text-gray-500">Noch keine Artikel für diese Region vorhanden.</p>
      )}
    </div>
  );
}
