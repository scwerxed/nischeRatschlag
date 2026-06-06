import Link from 'next/link';
import { posts } from '@/app/lib/posts';
import HeroSlideshow from '@/app/ui/hero-slideshow';
import RegionSelector from '@/app/ui/region-selector';
import Newsletter from '@/app/ui/newsletter';
import Seewetter from '@/app/ui/seewetter';
import { CATEGORY_DOT } from '@/app/lib/blog-utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wörthersee Guide – Wandern, Baden & Urlaub in Kärnten',
  description: 'Insider-Tipps für Kärnten: Wanderwege am Wörthersee, die wärmsten Badeseen Österreichs, Ausflüge und Unterkünfte – ehrlich recherchiert mit echten Preisen.',
  keywords: ['Wörthersee Guide', 'Kärnten Urlaub', 'Wandern Kärnten', 'Badeseen Kärnten', 'Klopeiner See', 'Millstätter See', 'Weissensee'],
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const [lead, ...rest] = posts.slice(0, 4);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <HeroSlideshow>
        <p className="eyebrow text-green-200 mb-4">Reisemagazin · Kärnten</p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[1.05] mb-5">
          Kärntens Seen &amp; Berge,<br />ehrlich erklärt.
        </h1>
        <p className="text-lg text-white/85 mb-8 max-w-xl leading-relaxed">
          Handverlesene Wanderungen, Badestellen und Ausflüge – mit echten Preisen,
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
            { value: '33', label: 'Insider-Artikel' },
            { value: '1.270+', label: 'Seen in Kärnten' },
            { value: '29 °C', label: 'wärmstes Seewasser' },
            { value: '3.798 m', label: 'höchster Gipfel' },
          ].map((s) => (
            <div key={s.label} className="py-7 px-4 text-center">
              <p className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-none">{s.value}</p>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Region-Auswahl ─────────────────────────────────────────────── */}
      <section className="px-6 py-10 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-3">Bundesland wählen</p>
          <RegionSelector />
        </div>
      </section>

      {/* ── Featured: Magazin-Layout (1 groß + Liste) ──────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
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
            <div className="aspect-[16/10] bg-gradient-to-br from-green-700 to-green-900 mb-4 flex items-end p-6 overflow-hidden">
              <span className="font-serif text-2xl text-white/95 leading-snug">{lead.title}</span>
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

      {/* ── Seewetter ──────────────────────────────────────────────────── */}
      <section className="bg-sand-50 border-y border-gray-200 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-7">
            <p className="eyebrow mb-2">Live aus Kärnten</p>
            <h2 className="font-serif text-3xl font-bold text-gray-900">Wie warm ist das Wasser gerade?</h2>
          </div>
          <Seewetter />
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
