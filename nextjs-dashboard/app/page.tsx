import Link from 'next/link';
import { posts } from '@/app/lib/posts';
import HeroSlideshow from '@/app/ui/hero-slideshow';
import RegionSelector from '@/app/ui/region-selector';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wörthersee Guide – Kärnten entdecken',
  description: 'Tipps, Wanderwege, Badestellen und Hotels am Wörthersee. Dein Reiseführer für Kärnten.',
};

export default function HomePage() {
  const featured = posts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <HeroSlideshow>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Kärnten & Wörthersee entdecken
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow">
          Wandertipps, Badestellen, Ausflugsziele und Hotelempfehlungen –
          alles was du für deinen Urlaub am Wörthersee brauchst.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors"
        >
          Alle Artikel lesen
        </Link>
      </HeroSlideshow>

      {/* Region Selector */}
      <section className="bg-white border-b border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Welches Bundesland möchtest du entdecken?
          </h2>
          <RegionSelector />
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Aktuelle Tipps</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-gray-200 rounded-xl p-5 hover:border-green-400 hover:shadow-md transition-all"
            >
              <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
                {post.category}
              </span>
              <h3 className="mt-2 font-semibold text-gray-900 group-hover:text-green-700 leading-snug">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
              <span className="mt-4 inline-block text-sm text-green-600 font-medium">
                Weiterlesen →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Affiliate Banner */}
      <section className="bg-green-50 border-y border-green-100 px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Hotel am Wörthersee buchen</h2>
          <p className="text-gray-600 mb-5">
            Vergleiche hunderte Unterkünfte – von gemütlichen Pensionen bis zu 5-Sterne-Hotels direkt am See.
          </p>
          <a
            href="https://www.booking.com/region/at/carinthia.de.html"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-green-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-800 transition-colors"
          >
            Hotels auf booking.com suchen
          </a>
        </div>
      </section>
    </>
  );
}
