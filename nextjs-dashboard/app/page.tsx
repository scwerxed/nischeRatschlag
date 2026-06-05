import Link from 'next/link';
import { posts } from '@/app/lib/posts';
import HeroSlideshow from '@/app/ui/hero-slideshow';
import RegionSelector from '@/app/ui/region-selector';
import Newsletter from '@/app/ui/newsletter';
import Seewetter from '@/app/ui/seewetter';
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

      {/* Quick-Stats */}
      <section className="max-w-5xl mx-auto px-6 pt-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '33', label: 'Insider-Artikel', icon: '📖' },
            { value: '1.270+', label: 'Seen in Kärnten', icon: '🏞️' },
            { value: '29°C', label: 'wärmstes Seewasser', icon: '🌡️' },
            { value: '3.798 m', label: 'höchster Gipfel', icon: '⛰️' },
          ].map((s) => (
            <div key={s.label} className="text-center border border-gray-200 py-5 px-3" style={{ borderRadius: 6 }}>
              <p className="text-2xl mb-1">{s.icon}</p>
              <p className="text-xl font-bold text-gray-900 leading-none">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seewetter live */}
      <section className="max-w-5xl mx-auto px-6 pt-14">
        <Seewetter />
      </section>

      {/* Featured Posts */}
      <section className="max-w-5xl mx-auto px-6 py-14">
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

      {/* Karte-CTA: Besucher auf unsere Karte mit Unterkünften lenken */}
      <section className="bg-green-50 border-y border-green-100 px-6 py-14">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">Interaktiv</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-3">
              Finde Wanderwege, Gipfel &amp; Unterkünfte auf der Karte
            </h2>
            <p className="text-gray-600 mb-5 leading-relaxed">
              Unsere interaktive Wanderkarte zeigt dir alle Wege, Gipfel und handverlesene
              Unterkünfte direkt am See. Verfügbarkeit &amp; Preise mit einem Klick prüfen.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/karte"
                className="inline-block bg-green-700 text-white font-semibold px-7 py-3 hover:bg-green-800 transition-colors"
                style={{ borderRadius: 4 }}
              >
                🗺️ Karte öffnen
              </Link>
              <Link
                href="/routenplaner"
                className="inline-block border border-green-700 text-green-700 font-semibold px-7 py-3 hover:bg-green-100 transition-colors"
                style={{ borderRadius: 4 }}
              >
                📍 Route planen
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: '🏨', t: 'Hotels', d: 'direkt am See' },
              { emoji: '⛺', t: 'Camping', d: 'ab 25 €/Nacht' },
              { emoji: '🥾', t: 'Wanderwege', d: 'mit Höhenprofil' },
              { emoji: '🏔️', t: 'Gipfel', d: 'live von OSM' },
            ].map((c) => (
              <div key={c.t} className="bg-white border border-green-100 p-4" style={{ borderRadius: 6 }}>
                <p className="text-2xl mb-1">{c.emoji}</p>
                <p className="font-semibold text-gray-900 text-sm">{c.t}</p>
                <p className="text-xs text-gray-500">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <Newsletter />
      </section>
    </>
  );
}
