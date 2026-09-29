import Link from 'next/link';
import { posts } from '@/app/lib/posts';
import { regionen } from '@/app/lib/regionen';
import HeroSlideshow from '@/app/ui/hero-slideshow';
import RegionSelector from '@/app/ui/region-selector';
import Newsletter from '@/app/ui/newsletter';
import PostBild from '@/app/ui/post-bild';
import Seewetter from '@/app/ui/seewetter';
import TippDesTages from '@/app/ui/tipp-des-tages';
import FadeIn from '@/app/ui/fade-in';
import { CATEGORY_DOT } from '@/app/lib/blog-utils';
import { currentSeason } from '@/app/lib/season';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bergseen Guide – Wandern, Baden & Urlaub in Österreich',
  description: 'Insider-Tipps für ganz Österreich: die schönsten Wanderwege, wärmsten Badeseen und Ausflugsziele in Kärnten, Salzburg, Tirol, der Steiermark und im Burgenland – ehrlich recherchiert, mit konkreten Routen und Startpunkten.',
  keywords: ['Bergseen Guide', 'Urlaub Österreich', 'Wandern Österreich', 'Badeseen Österreich', 'Bergseen Österreich', 'Ausflugsziele Österreich', 'Wörthersee', 'Neusiedler See', 'Achensee', 'Zeller See'],
  alternates: { canonical: '/' },
};

const POPULAR_DESTINATIONS = [
  { slug: 'kaernten',          name: 'Kärnten',          tag: 'Wörthersee & Badeseen',     note: 'Wärmstes Seewasser Österreichs' },
  { slug: 'salzburg',          name: 'Salzburg',         tag: 'Zeller See & Großglockner', note: 'Mozartstadt trifft Hohe Tauern' },
  { slug: 'tirol',             name: 'Tirol',            tag: 'Achensee & Ötztal',         note: 'Das Herz der Alpen' },
  { slug: 'steiermark',        name: 'Steiermark',       tag: 'Grüner See & Dachstein',    note: 'Das grüne Herz Österreichs' },
  { slug: 'burgenland',        name: 'Burgenland',       tag: 'Neusiedler See & Wein',     note: 'Pannonische Sonne am Steppensee' },
  { slug: 'oberoesterreich',   name: 'Oberösterreich',   tag: 'Salzkammergut & Hallstatt', note: 'Glasklare Seen, Atter- & Traunsee' },
  { slug: 'niederoesterreich', name: 'Niederösterreich', tag: 'Wachau & Wiener Alpen',     note: 'Donautal, Wein, Schneeberg & Rax' },
  { slug: 'vorarlberg',        name: 'Vorarlberg',       tag: 'Bodensee & Bergseen',       note: 'Von Bregenz bis zum Lünersee' },
  { slug: 'wien',              name: 'Wien',             tag: 'Kaiserstadt & Alte Donau',  note: 'Kultur, Kaffeehaus & Baden' },
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
        <h1 className="font-serif text-display md:text-6xl font-bold leading-[1.05] mb-5">
          Österreichs Seen &amp; Berge,<br />ehrlich erklärt.
        </h1>
        <p className="text-tagline text-white/85 mb-8 max-w-xl leading-relaxed">
          Handverlesene Wanderungen, Badeseen und Ausflüge in ganz Österreich – mit klaren
          Empfehlungen, echten Startpunkten und Routen, die du sonst nirgends findest.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="btn bg-white text-green-800 hover:bg-green-50"
          >
            Zum Magazin
          </Link>
          <Link
            href="/karte"
            className="btn border border-white/60 text-white hover:bg-white/10"
          >
            Wanderkarte öffnen
          </Link>
        </div>
      </HeroSlideshow>

      {/* ── Saisonaler Akzent-Banner ───────────────────────────────────── */}
      <FadeIn direction="none" duration={400}>
        <section className="border-b border-hairline bg-green-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
            <p className="text-caption">
              <span className="mr-2">{season.icon}</span>
              <span className="font-medium">{season.greeting}</span>
              <span className="text-green-200 mx-2">·</span>
              <span className="text-green-200">{posts.length} Insider-Tipps für dich</span>
            </p>
            <Link href="/blog" className="text-fine font-semibold text-green-200 hover:text-white transition-colors hidden sm:block">
              {season.cta} →
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ── Kennzahlen-Band ────────────────────────────────────────────── */}
      <FadeIn direction="up" delay={100}>
        <section className="border-b border-hairline bg-sand-50">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-hairline">
            {[
              { value: String(posts.length), label: 'Insider-Artikel' },
              { value: String(activeRegions), label: 'Bundesländer' },
              { value: '4', label: 'Kategorien' },
              { value: '100 %', label: 'ehrlich recherchiert' },
            ].map((s) => (
              <div key={s.label} className="py-9 px-4 text-center">
                <p className="font-serif text-display-sm font-bold leading-none text-ink">{s.value}</p>
                <p className="text-fine text-ink-soft mt-2 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ── Ausflugsplaner-Teaser ──────────────────────────────────────── */}
      <FadeIn direction="none" duration={400}>
        <section className="border-b border-hairline bg-sand-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-caption text-ink-muted">
              <strong className="text-ink">Nicht sicher, wohin?</strong>{' '}
              Der Ausflugsplaner sortiert alle Ziele nach Wetter, Zeitfenster und Monat.
            </p>
            <Link href="/ausflugsplaner" className="inline-flex items-center gap-1.5 text-caption font-semibold text-green-700 hover:text-green-600 transition-colors">
              Ausflugsplaner öffnen
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
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
      <section id="regionen" className="surface-parchment scroll-mt-20">
       <div className="max-w-6xl mx-auto px-6 py-16">
        <FadeIn direction="up">
          <div className="text-center mb-9">
            <p className="eyebrow mb-2">Beliebte Reiseziele</p>
            <h2 className="font-serif text-display font-bold text-ink">Wohin in Österreich?</h2>
            <p className="text-ink-soft mt-2 max-w-xl mx-auto">
              Wähle dein Bundesland – jede Region mit eigenen Wanderungen, Badeseen und Ausflugstipps.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR_DESTINATIONS.map((d, i) => (
            <FadeIn key={d.slug} direction="up" delay={i * 60} duration={500}>
              <Link
                href={`/regionen/${d.slug}`}
                className="surface-card-interactive group block overflow-hidden"
              >
                <div className="p-7">
                  <p className="eyebrow mb-2">{d.tag}</p>
                  <h3 className="font-serif text-tagline font-bold text-ink group-hover:text-green-700 leading-snug transition-colors">
                    {d.name}
                  </h3>
                  <p className="text-caption text-ink-soft mt-1.5">{d.note}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-caption font-medium text-green-700 group-hover:text-green-600 transition-colors">
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
      <section className="max-w-6xl mx-auto px-6 pb-16 border-t border-hairline pt-16">
        <FadeIn direction="up">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow mb-2">Aus dem Magazin</p>
              <h2 className="font-serif text-display font-bold text-ink">Aktuelle Tipps</h2>
            </div>
            <Link href="/blog" className="text-caption font-medium text-green-700 hover:text-green-600 hidden sm:block transition-colors">
              Alle {posts.length} Artikel →
            </Link>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn direction="left">
            <Link href={`/blog/${lead.slug}`} className="group block">
              <div className="relative aspect-[16/10] mb-4 overflow-hidden rounded-lg">
                <PostBild slug={lead.slug} category={lead.category} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute bottom-0 left-0 p-6 font-serif text-lead text-white leading-snug">{lead.title}</span>
              </div>
              <p className="eyebrow mb-1.5">{lead.category}{lead.bestSeason ? ` · ${lead.bestSeason}` : ''}</p>
              <p className="text-ink-muted leading-relaxed">{lead.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-caption font-medium text-green-700 group-hover:text-green-600 transition-colors">
                Weiterlesen
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </FadeIn>

          <FadeIn direction="right" delay={150}>
            <div className="divide-y divide-hairline">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-4 py-5 first:pt-0">
                  <span className={`shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full ${CATEGORY_DOT[post.category] ?? 'bg-gray-400'}`} />
                  <div>
                    <p className="eyebrow mb-1">{post.category}</p>
                    <h3 className="font-serif text-tagline font-bold text-ink group-hover:text-green-700 leading-snug transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-caption text-ink-soft line-clamp-2">{post.excerpt}</p>
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
              <h2 className="font-serif text-display font-bold text-ink mb-4 leading-tight">
                Wege, Gipfel und Unterkünfte auf einer Karte
              </h2>
              <p className="text-ink-muted mb-7 leading-relaxed">
                Unsere Wanderkarte verbindet das offizielle Wegenetz mit live geladenen Gipfeln
                und handverlesenen Unterkünften direkt am See – Verfügbarkeit mit einem Klick.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/karte" className="inline-block bg-green-700 text-white font-semibold px-7 py-3 hover:bg-green-800 transition-colors rounded-sm">
                  Karte öffnen
                </Link>
                <Link href="/routenplaner" className="inline-block border border-hairline text-ink-muted font-semibold px-7 py-3 hover:border-green-600 hover:text-green-700 transition-colors rounded-sm">
                  Route planen
                </Link>
              </div>
            </div>
            <div className="border-t border-hairline">
              {[
                { t: 'Unterkünfte', d: 'Hotels, Camping & Ferienwohnungen direkt am See', icon: 'M3 7h10l-1.5-4H4.5L3 7zM2 8v6h1v2h2v-2h6v2h2v-2h1V8H2z' },
                { t: 'Wanderwege', d: 'Offizielles Wegenetz mit Höhenprofil im Routenplaner', icon: 'M3 13l3-5 3 3 4-7 3 5' },
                { t: 'Gipfel', d: 'Über 1.000 benannte Gipfel, live von OpenStreetMap', icon: 'M2 14L8 3l6 11H2z' },
              ].map((c) => (
                <div key={c.t} className="flex gap-4 py-5 border-b border-hairline group">
                  <span className="shrink-0 w-8 h-8 bg-green-50 border border-green-200 flex items-center justify-center rounded-full">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-700">
                      <path d={c.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{c.t}</p>
                    <p className="text-caption text-ink-soft mt-0.5">{c.d}</p>
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
