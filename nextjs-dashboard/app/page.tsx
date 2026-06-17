import Link from 'next/link';
import { posts } from '@/app/lib/posts';
import { regionen } from '@/app/lib/regionen';
import HeroSlideshow from '@/app/ui/hero-slideshow';
import RegionSelector from '@/app/ui/region-selector';
import Newsletter from '@/app/ui/newsletter';
import PostArtwork from '@/app/ui/post-artwork';
import { CATEGORY_DOT } from '@/app/lib/blog-utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bergseen Guide – Wandern, Baden & Urlaub in Österreich',
  description: 'Insider-Tipps für ganz Österreich: die schönsten Wanderwege, wärmsten Badeseen und Ausflugsziele in Kärnten, Salzburg, Tirol, der Steiermark und im Burgenland – ehrlich recherchiert mit echten Preisen.',
  keywords: ['Bergseen Guide', 'Urlaub Österreich', 'Wandern Österreich', 'Badeseen Österreich', 'Bergseen Österreich', 'Ausflugsziele Österreich', 'Wörthersee', 'Neusiedler See', 'Achensee', 'Zeller See'],
  alternates: { canonical: '/' },
};

// Beliebte Reiseziele in Österreich – verlinken auf die jeweilige Region.
const POPULAR_DESTINATIONS = [
  { slug: 'kaernten',   name: 'Kärnten',    tag: 'Wörthersee & Badeseen',     note: 'Wärmstes Seewasser Österreichs' },
  { slug: 'salzburg',   name: 'Salzburg',   tag: 'Zeller See & Großglockner', note: 'Mozartstadt trifft Hohe Tauern' },
  { slug: 'tirol',      name: 'Tirol',      tag: 'Achensee & Ötztal',         note: 'Das Herz der Alpen' },
  { slug: 'steiermark', name: 'Steiermark', tag: 'Grüner See & Dachstein',    note: 'Das grüne Herz Österreichs' },
  { slug: 'burgenland', name: 'Burgenland', tag: 'Neusiedler See & Wein',     note: 'Pannonische Sonne am Steppensee' },
];

export default function HomePage() {
  // Neueste Artikel zuerst – so erscheint Content aus allen Regionen, nicht nur Kärnten.
  const featured = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  const [lead, ...rest] = featured;
  const activeRegions = regionen.filter((r) => r.aktiv).length;

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <HeroSlideshow>
        <p className="eyebrow text-green-200 mb-4">Reisemagazin · Österreich</p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[1.05] mb-5">
          Österreichs Seen &amp; Berge,<br />ehrlich erklärt.
        </h1>
        <p className="text-lg text-white/85 mb-8 max-w-xl leading-relaxed">
          Handverlesene Wanderungen, Badeseen und Ausflüge in ganz Österreich – mit echten Preisen,
          klaren Empfehlungen und Routen, die du sonst nirgends findest.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="inline-block bg-white text-green-800 font-semibold px-7 py-3 hover:bg-green-50 transition-colors"
          >
            Zum Magazin
          </Link>
          <Link
            href="/karte"
            className="inline-block border border-white/60 text-white font-semibold px-7 py-3 hover:bg-white/10 transition-colors"
          >
            Wanderkarte öffnen
          </Link>
        </div>
      </HeroSlideshow>

      {/* ── Kennzahlen-Band ────────────────────────────────────────────── */}
      <section className="border-b border-gray-200 bg-sand-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
          {[
            { value: String(posts.length), label: 'Insider-Artikel' },
            { value: String(activeRegions), label: 'Regionen' },
            { value: '4', label: 'Kategorien' },
            { value: '100 %', label: 'ehrlich recherchiert' },
          ].map((s) => (
            <div key={s.label} className="py-7 px-4 text-center">
              <p className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-none">{s.value}</p>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Beliebte Reiseziele ────────────────────────────────────────── */}
      <section id="regionen" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-20">
        <div className="text-center mb-9">
          <p className="eyebrow mb-2">Beliebte Reiseziele</p>
          <h2 className="font-serif text-3xl font-bold text-gray-900">Wohin in Österreich?</h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Wähle dein Bundesland – jede Region mit eigenen Wanderungen, Badeseen und Ausflugstipps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR_DESTINATIONS.map((d) => (
            <Link
              key={d.slug}
              href={`/regionen/${d.slug}`}
              className="group block border border-gray-200 p-6 hover:border-green-400 hover:shadow-md transition-all"
              style={{ borderRadius: 8 }}
            >
              <p className="eyebrow mb-1.5">{d.tag}</p>
              <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-green-700 leading-snug">
                {d.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1.5">{d.note}</p>
              <span className="mt-4 inline-block text-sm font-medium text-green-700 group-hover:text-green-600">
                Tipps &amp; Hotels →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <RegionSelector />
        </div>
      </section>

      {/* ── Featured: Magazin-Layout (1 groß + Liste) ──────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-16 border-t border-gray-100 pt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-2">Aus dem Magazin</p>
            <h2 className="font-serif text-3xl font-bold text-gray-900">Aktuelle Tipps</h2>
          </div>
          <Link href="/blog" className="text-sm font-medium text-green-700 hover:text-green-600 hidden sm:block">
            Alle {posts.length} Artikel →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Lead-Artikel */}
          <Link href={`/blog/${lead.slug}`} className="group block">
            <div className="relative aspect-[16/10] mb-4 overflow-hidden">
              <PostArtwork seed={lead.slug} category={lead.category} className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute bottom-0 left-0 p-6 font-serif text-2xl text-white leading-snug">{lead.title}</span>
            </div>
            <p className="eyebrow mb-1.5">{lead.category}{lead.bestSeason ? ` · ${lead.bestSeason}` : ''}</p>
            <p className="text-gray-600 leading-relaxed">{lead.excerpt}</p>
            <span className="mt-3 inline-block text-sm font-medium text-green-700 group-hover:text-green-600">
              Weiterlesen →
            </span>
          </Link>

          {/* Liste */}
          <div className="divide-y divide-gray-100">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-4 py-5 first:pt-0">
                <span className={`shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full ${CATEGORY_DOT[post.category] ?? 'bg-gray-400'}`} />
                <div>
                  <p className="eyebrow mb-1">{post.category}</p>
                  <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-green-700 leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Karte-CTA ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-3">Interaktiv</p>
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Wege, Gipfel und Unterkünfte auf einer Karte
            </h2>
            <p className="text-gray-600 mb-7 leading-relaxed">
              Unsere Wanderkarte verbindet das offizielle Wegenetz mit live geladenen Gipfeln
              und handverlesenen Unterkünften direkt am See – Verfügbarkeit mit einem Klick.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/karte" className="inline-block bg-green-700 text-white font-semibold px-7 py-3 hover:bg-green-800 transition-colors">
                Karte öffnen
              </Link>
              <Link href="/routenplaner" className="inline-block border border-gray-300 text-gray-700 font-semibold px-7 py-3 hover:border-green-600 hover:text-green-700 transition-colors">
                Route planen
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-200">
            {[
              { t: 'Unterkünfte', d: 'Hotels, Camping & Ferienwohnungen direkt am See' },
              { t: 'Wanderwege', d: 'Offizielles Wegenetz mit Höhenprofil im Routenplaner' },
              { t: 'Gipfel', d: 'Über 1.000 benannte Gipfel, live von OpenStreetMap' },
            ].map((c) => (
              <div key={c.t} className="flex gap-4 py-5 border-b border-gray-200">
                <span className="font-serif text-xl text-green-700 font-bold w-6 shrink-0">·</span>
                <div>
                  <p className="font-semibold text-gray-900">{c.t}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <Newsletter />
      </section>
    </>
  );
}
