import Link from 'next/link';
import type { Metadata } from 'next';
import { basislagerByRegion, BASISLAGER_RADIUS_KM } from '@/app/lib/basislager';
import { BASE, regionName, breadcrumbSchema } from '@/app/lib/seo';
import { CATEGORY_STYLE } from '@/app/lib/blog-utils';
import { cloak } from '@/app/lib/affiliate';

export const metadata: Metadata = {
  title: 'Basislager in Österreich – die besten Ausgangsorte für mehrere Ausflüge',
  description: 'Einmal einchecken, jeden Tag ein anderes Ziel: Welche Urlaubsorte in Österreich die meisten Wanderungen, Badeseen und Ausflugsziele im Umkreis haben – je Bundesland, mit Unterkunftslink.',
  keywords: ['Ausgangsort Wandern Österreich', 'Basislager Urlaub', 'wo übernachten Ausflüge Österreich', 'Standort Urlaub Kärnten', 'Unterkunft Wanderurlaub', 'Sternfahrt Urlaub Österreich'],
  alternates: { canonical: '/unterkuenfte/basislager' },
};

const MAX_ZIELE = 6;

export default function BasislagerPage() {
  const groups = basislagerByRegion();
  const allLager = groups.flatMap((g) => g.lager);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Basislager', url: `${BASE}/unterkuenfte/basislager` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Die besten Ausgangsorte für Ausflüge in Österreich',
      numberOfItems: allLager.length,
      itemListElement: allLager.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${b.stay.ort} – ${b.ziele.length} Ziele im Umkreis von ${BASISLAGER_RADIUS_KM} km`,
      })),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-14 md:py-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="flex flex-wrap items-center gap-2 text-fine text-ink-soft mb-5">
        <Link href="/" className="hover:text-green-700">Startseite</Link>
        <span>/</span>
        <Link href="/ausflugsplaner" className="hover:text-green-700">Ausflugsplaner</Link>
        <span>/</span>
        <span className="text-ink-muted">Basislager</span>
      </nav>

      <p className="eyebrow mb-2">Übernachten</p>
      <h1 className="font-serif text-display font-bold mb-3 text-ink">Basislager: einmal einchecken, jeden Tag ein neues Ziel</h1>
      <p className="text-ink-soft max-w-2xl mb-4 leading-relaxed">
        Wer mehrere Tage bleibt, will nicht jeden Morgen den Koffer packen. Hier siehst du, welche
        Urlaubsorte die meisten unserer Wanderungen, Badeziele und Ausflüge im Umkreis von
        {' '}{BASISLAGER_RADIUS_KM}&nbsp;km haben – je Bundesland, das stärkste Basislager zuerst.
      </p>
      <p className="text-fine text-ink-soft mb-10">
        Entfernungen als Luftlinie vom Ort zum Startpunkt – auf Bergstraßen kann die Anfahrt deutlich länger dauern.
        {' '}* Affiliate-Links über booking.com – ohne Mehrkosten für dich.
      </p>

      {groups.map((g) => (
        <section key={g.region} id={g.region} className="mb-12 scroll-mt-24">
          <h2 className="font-serif text-lead font-bold mb-5 text-ink">
            {regionName(g.region)}
            <Link href={`/regionen/${g.region}`} className="ml-3 text-caption font-sans font-normal text-green-700 hover:underline">
              Alle Artikel →
            </Link>
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {g.lager.map((b) => (
              <div key={b.stay.id} className="border border-hairline rounded-lg overflow-hidden transition-shadow flex flex-col">
                <div className="p-4 border-b border-divider-soft">
                  <span className="block text-fine font-semibold text-violet-700 uppercase tracking-wide">{b.stay.typ} · {b.stay.see}</span>
                  <p className="font-serif text-tagline font-bold text-ink mt-1">{b.stay.ort}</p>
                  <p className="text-caption text-ink-soft mt-0.5">
                    <strong className="text-ink">{b.ziele.length} Ziele</strong> im Umkreis von {BASISLAGER_RADIUS_KM}&nbsp;km
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {Object.entries(b.counts).map(([cat, n]) => {
                      const s = CATEGORY_STYLE[cat];
                      return (
                        <span key={cat} className={`text-fine font-medium px-2 py-0.5 rounded-full ${s ? `${s.bg} ${s.text}` : 'bg-parchment text-ink-muted'}`}>
                          {n}× {cat}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <ul className="p-4 space-y-1.5 flex-1">
                  {b.ziele.slice(0, MAX_ZIELE).map((z) => (
                    <li key={z.post.slug} className="flex items-baseline justify-between gap-3 text-caption">
                      <Link href={`/blog/${z.post.slug}`} className="text-ink hover:text-green-700 hover:underline leading-snug">
                        {z.post.title}
                      </Link>
                      <span className="text-fine text-ink-soft whitespace-nowrap">≈ {Math.max(1, Math.round(z.km))} km</span>
                    </li>
                  ))}
                  {b.ziele.length > MAX_ZIELE && (
                    <li className="text-fine text-ink-soft pt-1">+ {b.ziele.length - MAX_ZIELE} weitere Ziele in der Nähe</li>
                  )}
                </ul>

                <a
                  href={cloak(b.stay.bookingUrl)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block bg-violet-50 border-t border-violet-100 px-4 py-3 text-caption font-semibold text-violet-700 hover:bg-violet-100 transition-colors"
                >
                  {b.stay.name} ansehen* →
                </a>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/unterkuenfte/am-see" className="inline-block bg-green-700 text-white text-caption font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors rounded-full">
          Unterkünfte am See
        </Link>
        <Link href="/wochenendtrip" className="btn btn-secondary btn-sm">
          Wochenendtrips
        </Link>
        <Link href="/zwei-ausfluege-an-einem-tag" className="btn btn-quiet btn-sm">
          Zwei Ausflüge an einem Tag
        </Link>
        <Link href="/karte" className="btn btn-quiet btn-sm">
          Auf der Karte ansehen
        </Link>
        <Link href="/ausflugsplaner" className="btn btn-quiet btn-sm">
          Alle Themenseiten
        </Link>
      </div>

      <p className="text-fine text-ink-soft mt-6">
        Die Auswahl ergibt sich automatisch aus den Startpunkten unserer Artikel – je mehr wir über eine Region schreiben,
        desto vollständiger wird das Bild. Aktuelle Preise und Verfügbarkeit direkt beim Anbieter prüfen.
      </p>
    </div>
  );
}
