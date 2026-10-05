import Link from 'next/link';
import type { Metadata } from 'next';
import { BADEPLAETZE, type BadeplatzQualitaet } from '@/app/lib/badeplaetze';
import { AGES_EINSTUFUNG, badestellenById } from '@/app/lib/gewaesser';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';
import BadeplatzFilter from '@/app/ui/badeplatz-filter';

export const metadata: Metadata = {
  title: 'Badeplatz-Check – gratis, schattig, flach oder mit Hund?',
  description: 'Badeplätze in Österreich im Detail-Check: gratis Zugang, Schattenplätze, flacher Einstieg für Kinder, WC, Gastronomie und Hundestrand – filterbar nach dem, was dir wichtig ist.',
  keywords: ['Badeplatz gratis Österreich', 'Badesee flacher Einstieg', 'Badesee mit Schatten', 'Hundestrand Österreich', 'Badeplatz mit Kindern', 'freier Seezugang'],
  alternates: { canonical: '/badeplaetze' },
};

export default async function BadeplaetzePage() {
  // Offizielle AGES-Badewasserqualität je Badeplatz (täglich neu, siehe gewaesser.ts).
  // Fällt die Quelle aus, ist das Objekt leer und die Karten erscheinen ohne Qualitätszeile.
  const stellen = await badestellenById(BADEPLAETZE.flatMap((p) => (p.agesId ? [p.agesId] : [])));
  const qualitaet: Record<string, BadeplatzQualitaet> = {};
  for (const [id, b] of Object.entries(stellen)) {
    const e = b.einstufung ? AGES_EINSTUFUNG[b.einstufung.code] : undefined;
    qualitaet[id] = {
      messstelle: b.name,
      einstufung: b.einstufung && e ? { jahr: b.einstufung.jahr, label: e.label, tone: e.tone } : undefined,
      letzteProbe: b.letzteProbe?.datum,
      wasser: b.letzteProbe?.wasser ?? null,
      gesperrt: b.gesperrt,
      sperrgrund: b.sperrgrund,
    };
  }
  const mitQualitaet = Object.keys(qualitaet).length > 0;

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: `${BASE}` },
      { name: 'Badeplatz-Check', url: `${BASE}/badeplaetze` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Badeplatz-Check Österreich',
      numberOfItems: BADEPLAETZE.length,
      itemListElement: BADEPLAETZE.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${p.name} (${p.see})`,
        ...(p.slug ? { url: `${BASE}/blog/${p.slug}` } : {}),
      })),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-14 md:py-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="eyebrow mb-2">Badeplatz-Check</p>
      <h1 className="font-serif text-display font-bold mb-3 text-ink">Welcher Badeplatz passt zu dir?</h1>
      <p className="text-ink-soft max-w-2xl mb-8 leading-relaxed">
        „See" ist nicht gleich „See": Mal brauchst du einen flachen Einstieg fürs Kind, mal Schatten,
        mal einfach einen Gratis-Zugang. Filtere unsere Badeplätze nach dem, was dir wichtig ist.
        {mitQualitaet && ' Dazu siehst du bei jedem Platz die offizielle Badewasser-Qualität einer nahen EU-Badestelle.'}
      </p>

      <BadeplatzFilter plaetze={BADEPLAETZE} qualitaet={qualitaet} />

      <p className="text-fine text-ink-soft mt-8">
        Angaben nach bestem Wissen, ohne Gewähr – Ausstattung, Eintritt und Hunde-Regeln können sich
        ändern. Im Zweifel vor der Abfahrt auf der Seite des Betreibers prüfen.
        {mitQualitaet && (
          <>
            {' '}Badewasser-Qualität: Einstufung und Proben der jeweils zugeordneten offiziellen EU-Badestelle
            (Hygiene-Kontrolle nach EU-Badegewässerrichtlinie, mind. 5 Proben je Saison) – die Messstelle kann
            ein paar hundert Meter bis wenige Kilometer vom beschriebenen Badeplatz entfernt liegen.
            Quelle: AGES, CC BY 3.0 AT.
          </>
        )}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/seen-vergleich" className="inline-block bg-green-700 text-white text-caption font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors rounded-full">
          Seen im Vergleich
        </Link>
        <Link href="/wassertemperatur" className="btn btn-secondary btn-sm">
          Wassertemperatur live
        </Link>
        <Link href="/wandern-baden" className="btn btn-secondary btn-sm">
          Wandern + Baden
        </Link>
        <Link href="/hitzefreundliche-ausfluege" className="inline-block border border-amber-500 text-amber-700 text-caption font-semibold px-5 py-2.5 hover:bg-amber-50 transition-colors rounded-full">
          Kühle Ziele für Hitzetage
        </Link>
      </div>
    </div>
  );
}
