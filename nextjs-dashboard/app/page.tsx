import Link from 'next/link';
import { posts } from '@/app/lib/posts';
import { regionen } from '@/app/lib/regionen';
import HeroSlideshow from '@/app/ui/hero-slideshow';
import RegionSelector from '@/app/ui/region-selector';
import Newsletter from '@/app/ui/newsletter';
import PostArtwork from '@/app/ui/post-artwork';
import Seewetter from '@/app/ui/seewetter';
import TippDesTages from '@/app/ui/tipp-des-tages';
import FadeIn from '@/app/ui/fade-in';
import { CATEGORY_DOT } from '@/app/lib/blog-utils';
import { currentSeason } from '@/app/lib/season';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bergseen Guide – Wandern, Baden & Urlaub in Österreich',
  description: 'Insider-Tipps für ganz Österreich: die schönsten Wanderwege, wärmsten Badeseen und Ausflugsziele in Kärnten, Salzburg, Tirol, der Steiermark und im Burgenland – ehrlich recherchiert mit echten Preisen.',
  keywords: ['Bergseen Guide', 'Urlaub Österreich', 'Wandern Österreich', 'Badeseen Österreich', 'Bergseen Österreich', 'Ausflugsziele Österreich', 'Wörthersee', 'Neusiedler See', 'Achensee', 'Zeller See'],
  alternates: { canonical: '/' },
};

const POPULAR_DESTINATIONS = [
  { slug: 'kaernten',          name: 'Kärnten',          tag: 'Wörthersee & Badeseen',     note: 'Wärmstes Seewasser Österreichs',      bar: 'from-sky-400 to-cyan-600' },
  { slug: 'salzburg',          name: 'Salzburg',         tag: 'Zeller See & Großglockner', note: 'Mozartstadt trifft Hohe Tauern',      bar: 'from-violet-400 to-purple-600' },
  { slug: 'tirol',             name: 'Tirol',            tag: 'Achensee & Ötztal',         note: 'Das Herz der Alpen',                  bar: 'from-blue-400 to-indigo-600' },
  { slug: 'steiermark',        name: 'Steiermark',       tag: 'Grüner See & Dachstein',    note: 'Das grüne Herz Österreichs',          bar: 'from-green-500 to-emerald-700' },
  { slug: 'burgenland',        name: 'Burgenland',       tag: 'Neusiedler See & Wein',     note: 'Pannonische Sonne am Steppensee',     bar: 'from-amber-400 to-orange-600' },
  { slug: 'oberoesterreich',   name: 'Oberösterreich',   tag: 'Salzkammergut & Hallstatt', note: 'Glasklare Seen, Atter- & Traunsee',   bar: 'from-teal-400 to-cyan-600' },
  { slug: 'niederoesterreich', name: 'Niederösterreich', tag: 'Wachau & Wiener Alpen',     note: 'Donautal, Wein, Schneeberg & Rax',    bar: 'from-rose-400 to-pink-600' },
  { slug: 'vorarlberg',        name: 'Vorarlberg',       tag: 'Bodensee & Bergseen',       note: 'Von Bregenz bis zum Lünersee',        bar: 'from-cyan-400 to-teal-600' },
  { slug: 'wien',              name: 'Wien',             tag: 'Kaiserstadt & Alte Donau',  note: 'Kultur, Kaffeehaus & Baden',          bar: 'from-red-400 to-rose-600' },
];

export default function HomePage() {
  const featured = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  const [lead, ...rest] = featured;
  const activeRegions = regionen.filter((r) => r.aktiv).length;
  const season = currentSeason();

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

      {/* ── Saisonaler Akzent-Banner ───────────────────────────────────── */}
      <FadeIn direction="none" duration={400}>
        <section className="border-b border-gray-200 bg-gradient-to-r from-green-800 to-green-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
            <p className="text-sm">
              <span className="mr-2">{season.icon}</span>
              <span className="font-medium">{season.greeting}</span>
              <span className="text-green-200 mx-2">·</span>
              <span className="text-green-200">{posts.length} Insider-Tipps für dich</span>
            </p>
            <Link href="/blog" className="text-xs font-semibold text-green-200 hover:text-white transition-colors hidden sm:block">
              {season.cta} →
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ── Kennzahlen-Band ────────────────────────────────────────────── */}
      <FadeIn direction="up" delay={100}>
        <section className="border-b border-gray-200 bg-sand-50">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {[
              { value: String(posts.length), label: 'Insider-Artikel', color: 'text-green-700' },
              { value: String(activeRegions), label: 'Bundesländer', color: 'text-sky-600' },
              { value: '4', label: 'Kategorien', color: 'text-amber-600' },
              { value: '100 %', label: 'ehrlich recherchiert', color: 'text-violet-600' },
            ].map((s) => (
              <div key={s.label} className="py-7 px-4 text-center">
                <p className={`font-serif text-2xl md:text-3xl font-bold leading-none ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ── Tipp des Tages + Seewetter ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn direction="left" delay={0}>
            <TippDesTages posts={posts} />
          </FadeIn>
          <FadeIn direction="right" delay={150}>
            <Seewetter />
          </FadeIn>
        </div>
      </section>

      {/* ── Beliebte Reiseziele ────────────────────────────────────────── */}
      <section id="regionen" className="bg-gradient-to-b from-sand-50 to-white scroll-mt-20">
       <div className="max-w-6xl mx-auto px-6 py-16">
        <FadeIn direction="up">
          <div className="text-center mb-9">
            <p className="eyebrow mb-2">Beliebte Reiseziele</p>
            <h2 className="font-serif text-3xl font-bold text-gray-900">Wohin in Österreich?</h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">
              Wähle dein Bundesland – jede Region mit eigenen Wanderungen, Badeseen und Ausflugstipps.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR_DESTINATIONS.map((d, i) => (
            <FadeIn key={d.slug} direction="up" delay={i * 60} duration={500}>
              <Link
                href={`/regionen/${d.slug}`}
                className="group block border border-gray-200 overflow-hidden hover:border-green-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ borderRadius: 8 }}
              >
                <div className={`h-2 bg-gradient-to-r ${d.bar} transition-all duration-300 group-hover:h-3`} />
                <div className="p-6">
                  <p className={`text-xs font-semibold uppercase tracking-[0.14em] mb-1.5 bg-gradient-to-r ${d.bar} bg-clip-text text-transparent`}>{d.tag}</p>
                  <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-green-700 leading-snug transition-colors">
                    {d.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1.5">{d.note}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-green-700 group-hover:text-green-600 transition-colors">
                    Tipps &amp; Hotels
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={200}>
          <div className="mt-8">
            <RegionSelector />
          </div>
        </FadeIn>
       </div>
      </section>

      {/* ── Featured: Magazin-Layout (1 groß + Liste) ──────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-16 border-t border-gray-100 pt-16">
        <FadeIn direction="up">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow mb-2">Aus dem Magazin</p>
              <h2 className="font-serif text-3xl font-bold text-gray-900">Aktuelle Tipps</h2>
            </div>
            <Link href="/blog" className="text-sm font-medium text-green-700 hover:text-green-600 hidden sm:block transition-colors">
              Alle {posts.length} Artikel →
            </Link>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn direction="left">
            <Link href={`/blog/${lead.slug}`} className="group block">
              <div className="relative aspect-[16/10] mb-4 overflow-hidden" style={{ borderRadius: 8 }}>
                <PostArtwork seed={lead.slug} category={lead.category} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute bottom-0 left-0 p-6 font-serif text-2xl text-white leading-snug">{lead.title}</span>
              </div>
              <p className="eyebrow mb-1.5">{lead.category}{lead.bestSeason ? ` · ${lead.bestSeason}` : ''}</p>
              <p className="text-gray-600 leading-relaxed">{lead.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-green-700 group-hover:text-green-600 transition-colors">
                Weiterlesen
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </FadeIn>

          <FadeIn direction="right" delay={150}>
            <div className="divide-y divide-gray-100">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-4 py-5 first:pt-0">
                  <span className={`shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full ${CATEGORY_DOT[post.category] ?? 'bg-gray-400'}`} />
                  <div>
                    <p className="eyebrow mb-1">{post.category}</p>
                    <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-green-700 leading-snug transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Karte-CTA ──────────────────────────────────────────────────── */}
      <FadeIn direction="up">
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
                <Link href="/karte" className="inline-block bg-green-700 text-white font-semibold px-7 py-3 hover:bg-green-800 transition-colors hover:shadow-lg" style={{ borderRadius: 4 }}>
                  Karte öffnen
                </Link>
                <Link href="/routenplaner" className="inline-block border border-gray-300 text-gray-700 font-semibold px-7 py-3 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 4 }}>
                  Route planen
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-200">
              {[
                { t: 'Unterkünfte', d: 'Hotels, Camping & Ferienwohnungen direkt am See', icon: 'M3 7h10l-1.5-4H4.5L3 7zM2 8v6h1v2h2v-2h6v2h2v-2h1V8H2z' },
                { t: 'Wanderwege', d: 'Offizielles Wegenetz mit Höhenprofil im Routenplaner', icon: 'M3 13l3-5 3 3 4-7 3 5' },
                { t: 'Gipfel', d: 'Über 1.000 benannte Gipfel, live von OpenStreetMap', icon: 'M2 14L8 3l6 11H2z' },
              ].map((c) => (
                <div key={c.t} className="flex gap-4 py-5 border-b border-gray-200 group">
                  <span className="shrink-0 w-8 h-8 bg-green-50 border border-green-200 flex items-center justify-center" style={{ borderRadius: 6 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-700">
                      <path d={c.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{c.t}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Newsletter ─────────────────────────────────────────────────── */}
      <FadeIn direction="up">
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <Newsletter />
        </section>
      </FadeIn>
    </>
  );
}
