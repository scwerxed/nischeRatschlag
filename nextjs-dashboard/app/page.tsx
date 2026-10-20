import Link from 'next/link';
import { posts } from '@/app/lib/posts';
import { regionen } from '@/app/lib/regionen';
import { MONATE } from '@/app/lib/monatstipps';
import { SEE_MESSSTELLEN } from '@/app/lib/seen-messstellen';
import HeroSlideshow from '@/app/ui/hero-slideshow';
import RegionSelector from '@/app/ui/region-selector';
import Newsletter from '@/app/ui/newsletter';
import PostBild from '@/app/ui/post-bild';
import Seewetter from '@/app/ui/seewetter';
import TippDesTages from '@/app/ui/tipp-des-tages';
import FadeIn from '@/app/ui/fade-in';
import { CATEGORY_STYLE } from '@/app/lib/blog-utils';
import { currentSeason } from '@/app/lib/season';
import type { Metadata } from 'next';

// „Tipp des Tages“, Saison-Band und „Jetzt im <Monat>“ hängen vom Datum ab – stündlich neu
// erzeugen, statt bis zum nächsten Deploy auf dem Build-Tag stehen zu bleiben.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Bergseen Guide – Wandern, Baden & Urlaub in Österreich',
  description: 'Insider-Tipps für ganz Österreich: die schönsten Wanderwege, Badeseen und Ausflugsziele in allen neun Bundesländern – ehrlich recherchiert, mit konkreten Routen und Startpunkten.',
  keywords: ['Bergseen Guide', 'Urlaub Österreich', 'Wandern Österreich', 'Badeseen Österreich', 'Bergseen Österreich', 'Ausflugsziele Österreich', 'Wörthersee', 'Neusiedler See', 'Achensee', 'Zeller See'],
  alternates: { canonical: '/' },
};

// Je Bundesland ein Artikel mit geprüftem Ortsfoto (post-bilder.ts) als Kartenbild.
const POPULAR_DESTINATIONS = [
  { slug: 'kaernten',          name: 'Kärnten',          tag: 'Wörthersee & Badeseen',     note: 'Das Land der warmen Badeseen',       bild: 'beste-badestellen-woerthersee' },
  { slug: 'salzburg',          name: 'Salzburg',         tag: 'Seenland & Hohe Tauern',    note: 'Mozartstadt trifft Hohe Tauern',     bild: 'wolfgangsee-st-gilgen' },
  { slug: 'tirol',             name: 'Tirol',            tag: 'Achensee & Ötztal',         note: 'Gletscher, Almen und Bergseen',      bild: 'achensee-tirol' },
  { slug: 'steiermark',        name: 'Steiermark',       tag: 'Grüner See & Dachstein',    note: 'Das grüne Herz Österreichs',         bild: 'gruener-see-tragoess' },
  { slug: 'oberoesterreich',   name: 'Oberösterreich',   tag: 'Salzkammergut & Donau',     note: 'Glasklare Seen, Atter- & Traunsee',  bild: 'traunsee-gmunden' },
  { slug: 'niederoesterreich', name: 'Niederösterreich', tag: 'Wachau & Wiener Alpen',     note: 'Donautal, Wein, Schneeberg & Rax',   bild: 'wachau-duernstein' },
  { slug: 'burgenland',        name: 'Burgenland',       tag: 'Neusiedler See & Wein',     note: 'Pannonische Sonne am Steppensee',    bild: 'rust-stoerche-altstadt' },
  { slug: 'vorarlberg',        name: 'Vorarlberg',       tag: 'Bodensee & Bergseen',       note: 'Von Bregenz bis zum Lünersee',       bild: 'bregenzer-festspiele-seebuehne' },
  { slug: 'wien',              name: 'Wien',             tag: 'Kaiserstadt & Alte Donau',  note: 'Kultur, Kaffeehaus & Baden',         bild: 'wien-schoenbrunn' },
];

// „Was hast du vor?“ – direkte Einstiege in die Themenseiten, nach Anlass statt nach Ort.
const INTENTS = [
  { href: '/badeplaetze', icon: '🏊', label: 'Baden gehen' },
  { href: '/wassertemperatur', icon: '🌡️', label: 'Wassertemperatur' },
  { href: '/regentaugliche-ausfluege', icon: '🌧️', label: 'Bei Regen' },
  { href: '/hitzefreundliche-ausfluege', icon: '☀️', label: 'Hitzetag' },
  { href: '/familienausfluege', icon: '🧒', label: 'Mit Kindern' },
  { href: '/bahnhofsausfluege', icon: '🚆', label: 'Ohne Auto' },
  { href: '/ausfluege-nach-dauer', icon: '⏱️', label: 'Wenig Zeit' },
];

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
      <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
  const activeRegions = regionen.filter((r) => r.aktiv).length;
  const countByRegion = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.region] = (acc[p.region] ?? 0) + 1;
    return acc;
  }, {});
  const season = currentSeason();
  const monat = MONATE[new Date().getMonth()];
  const monatPicks = monat.picks
    .flatMap((pick) => {
      const post = bySlug.get(pick.slug);
      return post ? [{ pick, post }] : [];
    })
    .slice(0, 4);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <HeroSlideshow>
        <p className="eyebrow text-green-200 mb-4">Reisemagazin · Österreich</p>
        <h1 className="font-serif text-display-sm sm:text-display md:text-6xl font-bold leading-[1.05] mb-5">
          Österreichs Seen &amp; Berge,<br />ehrlich erklärt.
        </h1>
        <p className="text-body md:text-tagline text-white/85 mb-7 max-w-xl leading-relaxed">
          Handverlesene Wanderungen, Badeseen und Ausflüge in allen neun Bundesländern – mit
          echten Startpunkten, klaren Empfehlungen und offiziellen Live-Daten.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/blog" className="btn bg-white text-green-800 hover:bg-green-50">
            Zum Magazin
          </Link>
          <Link href="/karte" className="btn border border-white/60 text-white hover:bg-white/10">
            Karte öffnen
          </Link>
        </div>

        {/* Einstieg nach Anlass – auf dem Handy horizontal scrollbar statt fünf Zeilen hoch */}
        <div className="mt-8">
          <p className="text-fine uppercase tracking-[0.18em] text-white/60 mb-2.5 font-semibold">Was hast du vor?</p>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {INTENTS.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/25 px-3.5 py-1.5 text-caption text-white backdrop-blur-sm hover:bg-white hover:text-green-800 transition-colors"
              >
                <span aria-hidden>{i.icon}</span>
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      </HeroSlideshow>

      {/* ── Saison-Band: ein Streifen statt drei ───────────────────────── */}
      <section className="bg-green-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="text-caption">
            <span className="mr-2" aria-hidden>{season.icon}</span>
            <span className="font-medium">{season.greeting}</span>
            <span className="text-green-200 mx-2">·</span>
            <span className="text-green-200">{posts.length} Ziele in {activeRegions} Bundesländern</span>
          </p>
          <div className="flex items-center gap-5 text-fine font-semibold">
            <Link href={`/beste-ausfluege/${monat.slug}`} className="text-green-200 hover:text-white transition-colors">
              Beste Ausflüge im {monat.name} →
            </Link>
            <Link href="/ausflugsplaner" className="text-green-200 hover:text-white transition-colors hidden sm:inline">
              Ausflugsplaner →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Jetzt im <Monat> ───────────────────────────────────────────── */}
      {monatPicks.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-4">
          <div className="flex items-end justify-between gap-4 mb-7">
            <div>
              <p className="eyebrow mb-2">Passt gerade</p>
              <h2 className="font-serif text-display-sm md:text-display font-bold text-ink">Jetzt im {monat.name}</h2>
              <p className="text-ink-soft mt-2 max-w-2xl">{monat.intro}</p>
            </div>
            <Link href={`/beste-ausfluege/${monat.slug}`} className="group hidden md:inline-flex items-center gap-1.5 shrink-0 text-caption font-medium text-green-700 hover:text-green-600">
              Alle {monat.picks.length} Tipps <Arrow />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {monatPicks.map(({ pick, post }) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-3">
                  <PostBild slug={post.slug} category={post.category} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className={`eyebrow mb-1 ${CATEGORY_STYLE[post.category]?.text ?? ''}`}>{post.category}</p>
                <h3 className="font-serif text-tagline font-bold text-ink group-hover:text-green-700 leading-snug transition-colors">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-caption text-ink-soft leading-relaxed">
                  <span className="font-semibold text-ink-muted">Warum jetzt: </span>{pick.warum}
                </p>
              </Link>
            ))}
          </div>
          <Link href={`/beste-ausfluege/${monat.slug}`} className="md:hidden mt-6 inline-flex items-center gap-1.5 text-caption font-medium text-green-700">
            Alle {monat.picks.length} Tipps für den {monat.name} →
          </Link>
        </section>
      )}

      {/* ── Heute: Tipp des Tages + Live-Seewetter ─────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn direction="up">
            <TippDesTages posts={posts} />
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <Seewetter />
          </FadeIn>
        </div>
        <p className="mt-4 text-caption text-ink-soft">
          Alle {SEE_MESSSTELLEN.length} offiziellen See-Messstellen und die letzte Probe jeder EU-Badestelle:{' '}
          <Link href="/wassertemperatur" className="font-medium text-green-700 hover:underline">Wassertemperatur live</Link>
          {' '}·{' '}
          <Link href="/badeplaetze" className="font-medium text-green-700 hover:underline">Badeplatz-Check</Link>
        </p>
      </section>

      {/* ── Regionen mit Bild ──────────────────────────────────────────── */}
      <section id="regionen" className="surface-parchment scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-9">
            <p className="eyebrow mb-2">Alle neun Bundesländer</p>
            <h2 className="font-serif text-display-sm md:text-display font-bold text-ink">Wohin in Österreich?</h2>
            <p className="text-ink-soft mt-2 max-w-xl mx-auto">
              Jede Region mit eigenen Wanderungen, Badeseen, Ausflugstipps und Unterkünften.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POPULAR_DESTINATIONS.map((d, i) => (
              <FadeIn key={d.slug} direction="up" delay={(i % 3) * 60} duration={450}>
                <Link href={`/regionen/${d.slug}`} className="group relative block overflow-hidden rounded-lg aspect-[16/10] bg-green-900">
                  <PostBild slug={d.bild} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/0" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-fine font-semibold uppercase tracking-[0.18em] text-white/75 mb-1">{d.tag}</p>
                    <h3 className="font-serif text-lead font-bold leading-tight">{d.name}</h3>
                    <p className="mt-1 flex items-center justify-between gap-3 text-caption text-white/80">
                      <span>{d.note}</span>
                      <span className="inline-flex items-center gap-1 shrink-0 font-medium text-white">
                        {countByRegion[d.slug] ?? 0} Artikel <Arrow />
                      </span>
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="mt-8">
            <RegionSelector />
          </div>
          <p className="mt-4 text-center text-fine text-ink-soft">
            Fotos unter freien Lizenzen (u. a. Wikimedia Commons) – Urheber und Lizenz stehen im jeweiligen Artikel.
          </p>
        </div>
      </section>

      {/* ── Neu im Magazin ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-2">Aus dem Magazin</p>
            <h2 className="font-serif text-display-sm md:text-display font-bold text-ink">Neu &amp; frisch geprüft</h2>
          </div>
          <Link href="/blog" className="group hidden sm:inline-flex items-center gap-1.5 text-caption font-medium text-green-700 hover:text-green-600 transition-colors">
            Alle {posts.length} Artikel <Arrow />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {latest.map((post, i) => (
            <FadeIn key={post.slug} direction="up" delay={(i % 3) * 60} duration={450}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-4">
                  <PostBild slug={post.slug} category={post.category} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className={`eyebrow mb-1.5 ${CATEGORY_STYLE[post.category]?.text ?? ''}`}>
                  {post.category}{post.bestSeason ? ` · ${post.bestSeason}` : ''}
                </p>
                <h3 className="font-serif text-tagline font-bold text-ink group-hover:text-green-700 leading-snug transition-colors">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-caption text-ink-soft line-clamp-2">{post.excerpt}</p>
              </Link>
            </FadeIn>
          ))}
        </div>

        <Link href="/blog" className="sm:hidden mt-8 btn-secondary w-full">
          Alle {posts.length} Artikel
        </Link>
      </section>

      {/* ── So recherchieren wir ───────────────────────────────────────── */}
      <section className="border-y border-hairline bg-sand-50">
        <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="eyebrow mb-2">Ehrlich recherchiert</p>
            <h2 className="font-serif text-display-sm font-bold text-ink leading-tight">Was das bei uns konkret heißt</h2>
            <p className="text-ink-soft mt-3 leading-relaxed">
              Im Netz kursieren viele abgeschriebene Ausflugstipps. Wir prüfen gegen offizielle
              Quellen – und schreiben lieber „vorab prüfen“ als eine Zahl, die wir nicht belegen können.
            </p>
            <Link href="/ueber-uns" className="group mt-5 inline-flex items-center gap-1.5 text-caption font-semibold text-green-700 hover:text-green-600">
              Mehr über uns <Arrow />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { t: 'Faktencheck', d: 'Höhen, Seegrößen und Wegzeiten prüfen wir gegen Gemeinden, Tourismusverbände, Naturparks und Wikipedia – ältere Artikel gehen wir Schritt für Schritt neu durch.' },
              { t: 'Preise mit Vorbehalt', d: 'Eintritt, Maut und Öffnungszeiten ändern sich laufend. Statt scheinbar genauer Beträge sagen wir, wo du den aktuellen Stand nachsehen kannst.' },
              { t: 'Offizielle Live-Daten', d: `Wassertemperaturen von ${SEE_MESSSTELLEN.length} Messstellen der Landes-Hydrographie und die Badewasser-Proben der AGES – mit Quelle und Messzeit.` },
            ].map((c) => (
              <div key={c.t} className="border-t-2 border-green-600 pt-4">
                <p className="font-semibold text-ink">{c.t}</p>
                <p className="text-caption text-ink-soft mt-1.5 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Karte-CTA ──────────────────────────────────────────────────── */}
      <FadeIn direction="up">
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-3">Interaktiv</p>
              <h2 className="font-serif text-display-sm md:text-display font-bold text-ink mb-4 leading-tight">
                Ziele, Wege und Unterkünfte auf einer Karte
              </h2>
              <p className="text-ink-muted mb-7 leading-relaxed">
                Unsere Wanderkarte zeigt die Ausflugsziele aus dem Magazin als Pins – ein Klick führt
                zum Artikel. Dazu das offizielle Wegenetz, live geladene Gipfel und handverlesene
                Unterkünfte mit Verfügbarkeit auf einen Klick.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/karte" className="btn-primary">
                  Karte öffnen
                </Link>
                <Link href="/routenplaner" className="btn-quiet">
                  Route planen
                </Link>
              </div>
            </div>
            <div className="border-t border-hairline">
              {[
                { t: 'Ausflugsziele', d: 'Jeder Artikel mit Startpunkt als Pin – farbig nach Wandern, Baden und Ausflug', icon: 'M8 15s5-4.5 5-8.5A5 5 0 0 0 3 6.5C3 10.5 8 15 8 15zM8 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
                { t: 'Wanderwege', d: 'Offizielles Wegenetz mit Höhenprofil im Routenplaner', icon: 'M3 13l3-5 3 3 4-7 3 5' },
                { t: 'Unterkünfte', d: 'Hotels, Camping & Ferienwohnungen direkt am See', icon: 'M3 7h10l-1.5-4H4.5L3 7zM2 8v6h1v2h2v-2h6v2h2v-2h1V8H2z' },
              ].map((c) => (
                <div key={c.t} className="flex gap-4 py-5 border-b border-hairline">
                  <span className="shrink-0 w-8 h-8 bg-green-50 border border-green-200 flex items-center justify-center rounded-full">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-700" aria-hidden>
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
