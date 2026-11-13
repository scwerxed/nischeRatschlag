import Link from 'next/link';
import type { Metadata } from 'next';
import { badestellenImBundesland } from '@/app/lib/gewaesser';
import { BADESEEN_LAENDER, nachGewaesser } from '@/app/lib/badeseen';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';

// Zahlen stammen aus dem AGES-Feed – täglich neu erzeugen.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Badeseen in Österreich nach Bundesland – alle offiziellen Badestellen',
  description: 'Badeseen in Österreich nach Bundesland: alle EU-Badestellen mit amtlicher Wasserqualität, Wassertemperatur der letzten Probe und aktuellen Sperren – Daten der AGES.',
  alternates: { canonical: '/badeseen' },
};

const zwei = (n: number) => String(n).padStart(2, '0');

export default async function BadeseenPage() {
  const laender = await Promise.all(
    BADESEEN_LAENDER.map(async (l) => {
      const stellen = await badestellenImBundesland(l.name);
      const gewaesser = nachGewaesser(stellen);
      return { ...l, stellen: stellen.length, gewaesser: gewaesser.length, bekannt: gewaesser.slice(0, 3).map((g) => g.name) };
    }),
  );
  const gesamt = laender.reduce((sum, l) => sum + l.stellen, 0);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Badeseen', url: `${BASE}/badeseen` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Badeseen in Österreich nach Bundesland',
      numberOfItems: laender.length,
      itemListElement: laender.map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Badeseen ${l.wo}`,
        url: `${BASE}/badeseen/${l.slug}`,
      })),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-14 md:py-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="flex flex-wrap items-center gap-2 text-fine text-ink-soft mb-5">
        <Link href="/" className="hover:text-signal-dark">Startseite</Link>
        <span>/</span>
        <span className="text-ink-muted">Badeseen</span>
      </nav>

      <p className="eyebrow mb-3">Offizielle EU-Badestellen</p>
      <h1 className="font-serif text-display-sm md:text-display font-extrabold text-ink mb-4">
        Badeseen in Österreich nach Bundesland
      </h1>
      <p className="text-ink-muted max-w-2xl mb-10">
        {gesamt > 0 ? `${gesamt} Badestellen` : 'Die Badestellen'} in Österreich werden nach der EU-Badegewässerrichtlinie
        überwacht. Wir zeigen sie je Bundesland, geordnet nach See – mit der amtlichen Einstufung der
        Wasserqualität, der Wassertemperatur der letzten offiziellen Probe und aktuellen Sperren.
      </p>

      <ol className="grid sm:grid-cols-2 gap-x-10 border-t-2 border-ink">
        {laender.map((l, i) => (
          <li key={l.slug} className="border-b border-hairline">
            <Link href={`/badeseen/${l.slug}`} className="group flex items-baseline gap-4 py-4">
              <span className="font-mono text-fine text-signal w-6 shrink-0">{zwei(i + 1)}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-tagline font-bold text-ink group-hover:underline decoration-signal decoration-2 underline-offset-4">
                  {l.name}
                </span>
                {l.bekannt.length > 0 && (
                  <span className="block text-caption text-ink-soft truncate">{l.bekannt.join(' · ')}</span>
                )}
              </span>
              {l.stellen > 0 && (
                <span className="font-mono text-fine text-ink-soft shrink-0 text-right" data-numeric>
                  {l.stellen} Stellen
                </span>
              )}
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-fine text-ink-soft max-w-2xl">
        Quelle: AGES, österreichische Badegewässer (Open Government Data, CC BY 3.0 AT). Badeplätze ohne
        EU-Überwachung fehlen in dieser Liste.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/wassertemperatur" className="btn btn-primary btn-sm">
          Wassertemperatur live
        </Link>
        <Link href="/badeplaetze" className="btn btn-secondary btn-sm">
          Badeplatz-Check
        </Link>
        <Link href="/seen-vergleich" className="btn btn-secondary btn-sm">
          Seen-Vergleich
        </Link>
      </div>
    </div>
  );
}
