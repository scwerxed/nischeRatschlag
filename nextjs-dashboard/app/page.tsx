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
import { CATEGORY_STYLE } from '@/app/lib/blog-utils';
import { currentSeason } from '@/app/lib/season';
import type { Metadata } from 'next';

// „Tipp des Tages“, Saison-Zeile und „Jetzt im <Monat>“ hängen vom Datum ab – stündlich neu
// erzeugen, statt bis zum nächsten Deploy auf dem Build-Tag stehen zu bleiben.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Bergseen Guide – Wandern, Baden & Urlaub in Österreich',
  description: 'Insider-Tipps für ganz Österreich: die schönsten Wanderwege, Badeseen und Ausflugsziele in allen neun Bundesländern – ehrlich recherchiert, mit konkreten Routen und Startpunkten.',
  keywords: ['Bergseen Guide', 'Urlaub Österreich', 'Wandern Österreich', 'Badeseen Österreich', 'Bergseen Österreich', 'Ausflugsziele Österreich', 'Wörthersee', 'Neusiedler See', 'Achensee', 'Zeller See'],
  alternates: { canonical: '/' },
};

// Je Bundesland ein Artikel mit geprüftem Ortsfoto (post-bilder.ts) als Vorschaubild.
const POPULAR_DESTINATIONS = [
  { slug: 'kaernten',          name: 'Kärnten',          tag: 'Wörthersee & Badeseen',     bild: 'beste-badestellen-woerthersee' },
  { slug: 'salzburg',          name: 'Salzburg',         tag: 'Seenland & Hohe Tauern',    bild: 'wolfgangsee-st-gilgen' },
  { slug: 'tirol',             name: 'Tirol',            tag: 'Achensee & Ötztal',         bild: 'achensee-tirol' },
  { slug: 'steiermark',        name: 'Steiermark',       tag: 'Grüner See & Dachstein',    bild: 'gruener-see-tragoess' },
  { slug: 'oberoesterreich',   name: 'Oberösterreich',   tag: 'Salzkammergut & Donau',     bild: 'traunsee-gmunden' },
  { slug: 'niederoesterreich', name: 'Niederösterreich', tag: 'Wachau & Wiener Alpen',     bild: 'wachau-duernstein' },
  { slug: 'burgenland',        name: 'Burgenland',       tag: 'Neusiedler See & Wein',     bild: 'rust-stoerche-altstadt' },
  { slug: 'vorarlberg',        name: 'Vorarlberg',       tag: 'Bodensee & Bergseen',       bild: 'bregenzer-festspiele-seebuehne' },
  { slug: 'wien',              name: 'Wien',             tag: 'Kaiserstadt & Alte Donau',  bild: 'wien-schoenbrunn' },
];

// „Direkt zu“ – Einstiege in die Themenseiten, nach Anlass statt nach Ort.
const INTENTS = [
  { href: '/badeplaetze', label: 'Baden gehen' },
  { href: '/wassertemperatur', label: 'Wassertemperatur' },
  { href: '/regentaugliche-ausfluege', label: 'Bei Regen' },
  { href: '/hitzefreundliche-ausfluege', label: 'Hitzetag' },
  { href: '/familienausfluege', label: 'Mit Kindern' },
  { href: '/bahnhofsausfluege', label: 'Ohne Auto' },
  { href: '/ausfluege-nach-dauer', label: 'Wenig Zeit' },
];

const zwei = (n: number) => String(n).padStart(2, '0');

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
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
  const monatTop = monatPicks[0];
  const monatRest = monatPicks.slice(1);
  const neuTop = latest[0];
  const neuRest = latest.slice(1);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <HeroSlideshow>
        <p className="eyebrow !text-white/80 mb-5">Reiseführer für Österreich</p>
        <h1 className="font-serif text-[40px] leading-[1.02] sm:text-hero md:text-[76px] md:leading-[0.98] font-extrabold tracking-[-0.035em] mb-6">
          Seen &amp; Berge,<br />ehrlich erklärt.
        </h1>
        <p className="text-body md:text-tagline text-white/85 mb-8 max-w-xl">
          Wanderungen, Badeseen und Ausflüge in allen neun Bundesländern – mit echten
          Startpunkten, klaren Empfehlungen und offiziellen Messdaten.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/blog" className="btn bg-white text-ink hover:bg-sand-100">
            Zum Magazin
          </Link>
          <Link href="/karte" className="btn border border-white/70 text-white hover:bg-white hover:text-ink">
            Karte öffnen
          </Link>
        </div>

        {/* Einstieg nach Anlass – schlichte Textlinks statt Chips */}
        <div className="mt-9 border-t border-white/25 pt-4">
          <p className="label-mono !text-white/60 mb-2">Direkt zu</p>
          <div className="flex gap-x-5 gap-y-1.5 overflow-x-auto pb-1 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {INTENTS.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="shrink-0 text-caption font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      </HeroSlideshow>

      {/* ── Saison-Zeile ───────────────────────────────────────────────── */}
      <section className="border-b-2 border-ink">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 font-mono text-[12px] uppercase tracking-[0.04em]">
          <p className="text-ink">
            {season.greeting}
            <span className="text-ink-soft"> — {posts.length} Ziele, {activeRegions} Bundesländer</span>
          </p>
          <div className="flex items-center gap-5">
            <Link href={`/beste-ausfluege/${monat.slug}`} className="text-ink underline decoration-signal underline-offset-4 hover:text-signal-dark">
              Beste Ausflüge im {monat.name}
            </Link>
            <Link href="/ausflugsplaner" className="text-ink underline decoration-signal underline-offset-4 hover:text-signal-dark hidden sm:inline">
              Ausflugsplaner
            </Link>
          </div>
        </div>
      </section>

      {/* ── Jetzt im <Monat>: ein großer Tipp, daneben die weiteren als Liste ── */}
      {monatTop && (
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-6">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="eyebrow mb-3">Passt gerade</p>
              <h2 className="font-serif text-display-sm md:text-display font-extrabold text-ink">Jetzt im {monat.name}</h2>
            </div>
            <Link href={`/beste-ausfluege/${monat.slug}`} className="group hidden md:inline-flex items-center gap-2 shrink-0 text-caption font-semibold text-ink hover:text-signal-dark">
              Alle {monat.picks.length} Tipps <Arrow />
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-x-12 gap-y-10">
            <Link href={`/blog/${monatTop.post.slug}`} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden rounded-sm mb-5 bg-sand-100">
                <PostBild slug={monatTop.post.slug} category={monatTop.post.category} sizes="(max-width: 1024px) 100vw, 60vw" className="absolute inset-0" />
              </div>
              <p className={`label-mono mb-2 ${CATEGORY_STYLE[monatTop.post.category]?.text ?? ''}`}>{monatTop.post.category}</p>
              <h3 className="font-serif text-lead md:text-display-sm font-bold text-ink group-hover:underline decoration-signal decoration-2 underline-offset-4">
                {monatTop.post.title}
              </h3>
              <p className="mt-3 text-ink-muted max-w-xl">
                <span className="font-semibold text-ink">Warum jetzt: </span>{monatTop.pick.warum}
              </p>
            </Link>

            <div>
              <p className="text-ink-soft mb-5">{monat.intro}</p>
              <ol className="border-t-2 border-ink">
                {monatRest.map(({ pick, post }, i) => (
                  <li key={post.slug} className="border-b border-hairline">
                    <Link href={`/blog/${post.slug}`} className="group flex gap-4 py-4">
                      <span className="font-mono text-fine text-signal pt-1 w-6 shrink-0">{zwei(i + 2)}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-tagline font-bold text-ink leading-snug group-hover:underline decoration-signal decoration-2 underline-offset-4">
                          {post.title}
                        </span>
                        <span className="block mt-1 text-caption text-ink-soft">{pick.warum}</span>
                      </span>
                      <span className="relative hidden sm:block w-24 h-[72px] shrink-0 overflow-hidden rounded-sm bg-sand-100">
                        <PostBild slug={post.slug} category={post.category} sizes="96px" className="absolute inset-0" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link href={`/beste-ausfluege/${monat.slug}`} className="md:hidden mt-5 inline-flex items-center gap-2 text-caption font-semibold text-ink underline decoration-signal underline-offset-4">
                Alle {monat.picks.length} Tipps für den {monat.name}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Heute: Tipp des Tages + Live-Seewetter ─────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-8">
          <TippDesTages posts={posts} />
          <Seewetter />
        </div>
        <p className="mt-4 text-caption text-ink-soft">
          Alle {SEE_MESSSTELLEN.length} offiziellen See-Messstellen und die letzte Probe jeder EU-Badestelle:{' '}
          <Link href="/wassertemperatur" className="font-medium text-ink underline decoration-signal underline-offset-4 hover:text-signal-dark">Wassertemperatur live</Link>
          {' '}·{' '}
          <Link href="/badeplaetze" className="font-medium text-ink underline decoration-signal underline-offset-4 hover:text-signal-dark">Badeplatz-Check</Link>
        </p>
      </section>

      {/* ── Regionen als Verzeichnis ───────────────────────────────────── */}
      <section id="regionen" className="surface-parchment scroll-mt-20 border-y border-hairline">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-[1fr_2.2fr] gap-x-12 gap-y-8">
            <div>
              <p className="eyebrow mb-3">Neun Bundesländer</p>
              <h2 className="font-serif text-display-sm md:text-display font-extrabold text-ink">Wohin in Österreich?</h2>
              <p className="text-ink-muted mt-4">
                Jede Region mit eigenen Wanderungen, Badeseen, Ausflugstipps und Unterkünften.
              </p>
              <div className="mt-6">
                <RegionSelector />
              </div>
            </div>

            <ol className="grid sm:grid-cols-2 gap-x-10 border-t-2 border-ink">
              {POPULAR_DESTINATIONS.map((d, i) => (
                <li key={d.slug} className="border-b border-hairline">
                  <Link href={`/regionen/${d.slug}`} className="group flex items-center gap-4 py-3.5">
                    <span className="relative w-[76px] h-[57px] shrink-0 overflow-hidden rounded-sm bg-sand-100">
                      <PostBild slug={d.bild} sizes="76px" className="absolute inset-0" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-tagline font-bold text-ink leading-tight group-hover:underline decoration-signal decoration-2 underline-offset-4">
                        {d.name}
                      </span>
                      <span className="block text-caption text-ink-soft truncate">{d.tag}</span>
                    </span>
                    <span className="font-mono text-fine text-ink-soft shrink-0 text-right">
                      <span className="text-signal">{zwei(i + 1)}</span>
                      <span className="block">{countByRegion[d.slug] ?? 0} Art.</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-6 text-fine text-ink-soft">
            Fotos unter freien Lizenzen (u. a. Wikimedia Commons) – Urheber und Lizenz stehen im jeweiligen Artikel.
          </p>
        </div>
      </section>

      {/* ── Neu im Magazin: Aufmacher + Spalte ─────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="eyebrow mb-3">Aus dem Magazin</p>
            <h2 className="font-serif text-display-sm md:text-display font-extrabold text-ink">Neu &amp; frisch geprüft</h2>
          </div>
          <Link href="/blog" className="group hidden sm:inline-flex items-center gap-2 text-caption font-semibold text-ink hover:text-signal-dark">
            Alle {posts.length} Artikel <Arrow />
          </Link>
        </div>

        {neuTop && (
          <Link href={`/blog/${neuTop.slug}`} className="group grid md:grid-cols-[1.4fr_1fr] gap-x-10 gap-y-5 items-end border-t-2 border-ink pt-6 mb-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-sand-100">
              <PostBild slug={neuTop.slug} category={neuTop.category} sizes="(max-width: 768px) 100vw, 60vw" className="absolute inset-0" />
            </div>
            <div>
              <p className={`label-mono mb-2 ${CATEGORY_STYLE[neuTop.category]?.text ?? ''}`}>
                {neuTop.category}{neuTop.bestSeason ? ` · ${neuTop.bestSeason}` : ''}
              </p>
              <h3 className="font-serif text-lead md:text-display-sm font-bold text-ink group-hover:underline decoration-signal decoration-2 underline-offset-4">
                {neuTop.title}
              </h3>
              <p className="mt-3 text-ink-muted line-clamp-4">{neuTop.excerpt}</p>
            </div>
          </Link>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-9">
          {neuRest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-3 bg-sand-100">
                <PostBild slug={post.slug} category={post.category} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" className="absolute inset-0" />
              </div>
              <p className={`label-mono mb-1.5 ${CATEGORY_STYLE[post.category]?.text ?? ''}`}>{post.category}</p>
              <h3 className="font-serif text-body font-bold text-ink leading-snug group-hover:underline decoration-signal decoration-2 underline-offset-4">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>

        <Link href="/blog" className="sm:hidden mt-8 btn-secondary w-full">
          Alle {posts.length} Artikel
        </Link>
      </section>

      {/* ── So recherchieren wir ───────────────────────────────────────── */}
      <section className="bg-ink text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="eyebrow !text-white/70 mb-3">Ehrlich recherchiert</p>
            <h2 className="font-serif text-display-sm font-extrabold">Was das bei uns konkret heißt</h2>
            <p className="text-white/75 mt-4">
              Im Netz kursieren viele abgeschriebene Ausflugstipps. Wir prüfen gegen offizielle
              Quellen – und schreiben lieber „vorab prüfen“ als eine Zahl, die wir nicht belegen können.
            </p>
            <Link href="/ueber-uns" className="group mt-6 inline-flex items-center gap-2 text-caption font-semibold text-white underline decoration-signal decoration-2 underline-offset-4">
              Mehr über uns <Arrow />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { t: 'Faktencheck', d: 'Höhen, Seegrößen und Wegzeiten prüfen wir gegen Gemeinden, Tourismusverbände, Naturparks und Wikipedia – ältere Artikel gehen wir Schritt für Schritt neu durch.' },
              { t: 'Preise mit Vorbehalt', d: 'Eintritt, Maut und Öffnungszeiten ändern sich laufend. Statt scheinbar genauer Beträge sagen wir, wo du den aktuellen Stand nachsehen kannst.' },
              { t: 'Offizielle Live-Daten', d: `Wassertemperaturen von ${SEE_MESSSTELLEN.length} Messstellen der Landes-Hydrographie und die Badewasser-Proben der AGES – mit Quelle und Messzeit.` },
            ].map((c, i) => (
              <div key={c.t} className="border-t border-white/30 pt-4">
                <p className="font-mono text-fine text-signal mb-2">{zwei(i + 1)}</p>
                <p className="font-serif text-tagline font-bold">{c.t}</p>
                <p className="text-caption text-white/70 mt-2">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Karte ──────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="eyebrow mb-3">Karte &amp; Routenplaner</p>
            <h2 className="font-serif text-display-sm md:text-display font-extrabold text-ink mb-5">
              Ziele, Wege und Unterkünfte auf einer Karte
            </h2>
            <p className="text-ink-muted mb-7">
              Unsere Wanderkarte zeigt die Ausflugsziele aus dem Magazin als Pins – ein Klick führt
              zum Artikel. Dazu das markierte Wanderwegenetz und ausgewählte Unterkünfte.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/karte" className="btn-primary">
                Karte öffnen
              </Link>
              <Link href="/routenplaner" className="btn-secondary">
                Route planen
              </Link>
            </div>
          </div>
          <dl className="border-t-2 border-ink">
            {[
              { t: 'Ausflugsziele', d: 'Jeder Artikel mit Startpunkt als Pin – farbig nach Wandern, Baden und Ausflug' },
              { t: 'Wanderwege', d: 'Offizielles Wegenetz mit Höhenprofil im Routenplaner' },
              { t: 'Unterkünfte', d: 'Hotels, Camping & Ferienwohnungen direkt am See' },
            ].map((c) => (
              <div key={c.t} className="grid grid-cols-[9.5rem_1fr] gap-4 py-4 border-b border-hairline">
                <dt className="font-serif font-bold text-ink">{c.t}</dt>
                <dd className="text-caption text-ink-soft">{c.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Newsletter ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <Newsletter />
      </section>
    </>
  );
}
