import Link from 'next/link';
import type { Metadata } from 'next';
import { posts } from '@/app/lib/posts';
import { BADEPLAETZE } from '@/app/lib/badeplaetze';
import { agesProbenNachBundesland, badestelleFuer, seeMessstellenFuer, type AgesProbe } from '@/app/lib/gewaesser';
import { SEE_MESSSTELLEN, QUELLEN_LABEL, type SeeQuelle } from '@/app/lib/seen-messstellen';
import { distKm } from '@/app/lib/wochenendtrip';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';
import WassertemperaturLive, { type WtGruppe } from '@/app/ui/wassertemperatur-live';

// Die AGES-Proben (unterer Teil) werden serverseitig geladen – die Seite täglich neu erzeugen, wie die Artikelseiten.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Wassertemperatur der Seen in Österreich – live',
  description: 'Aktuelle Wassertemperaturen von 33 offiziellen Messstellen an Österreichs Badeseen: Wörthersee, Millstätter See, Wolfgangsee, Attersee, Traunsee, Zeller See & Co. Dazu für Tirol, Steiermark, Burgenland, Niederösterreich, Wien und Vorarlberg die letzte offizielle Probe an jeder EU-Badestelle – vom Achensee bis zum Neusiedler See.',
  keywords: ['Wassertemperatur Seen Österreich', 'Wassertemperatur aktuell', 'Wassertemperatur Wörthersee', 'Wassertemperatur Attersee', 'Wassertemperatur Wolfgangsee', 'Wassertemperatur Achensee', 'Wassertemperatur Neusiedler See', 'Wassertemperatur Bodensee', 'Wassertemperatur Alte Donau', 'Badeseen Temperatur live', 'Seetemperatur Kärnten', 'Seetemperatur Salzkammergut'],
  alternates: { canonical: '/wassertemperatur' },
};

const GRUPPEN: { quelle: SeeQuelle; titel: string; region: string; hinweis?: string }[] = [
  { quelle: 'ktn', titel: 'Kärnten', region: 'kaernten' },
  { quelle: 'sbg', titel: 'Salzburg', region: 'salzburg', hinweis: 'inkl. der grenznahen Messstellen am Mondsee und am Attersee (Unterach)' },
  { quelle: 'ooe', titel: 'Oberösterreich', region: 'oberoesterreich' },
];

/** Bundesländer ohne offenes Live-Messnetz → letzte offizielle Probe der EU-Badestellen (AGES-Schreibweise). */
const PROBEN_LAENDER: { bundesland: string; region: string }[] = [
  { bundesland: 'Burgenland', region: 'burgenland' },
  { bundesland: 'Niederösterreich', region: 'niederoesterreich' },
  { bundesland: 'Steiermark', region: 'steiermark' },
  { bundesland: 'Tirol', region: 'tirol' },
  { bundesland: 'Vorarlberg', region: 'vorarlberg' },
  { bundesland: 'Wien', region: 'wien' },
];

/** Passender Artikel je Messstelle – über dieselbe Zuordnung wie die „Wassertemperatur live“-Karte im Artikel. Bade-Artikel zuerst. */
function artikelJeStation(): Map<string, string> {
  const map = new Map<string, string>();
  const sortiert = [...posts].sort((a, b) => Number(b.category === 'Baden') - Number(a.category === 'Baden'));
  for (const post of sortiert) {
    for (const m of seeMessstellenFuer(post)) {
      if (!map.has(m.id)) map.set(m.id, post.slug);
    }
  }
  return map;
}

/** „Achensee, Nord“ / „Grundlsee Nord-West“ → „achensee“ / „grundlsee“: derselbe See, andere Badestelle. */
function seeSchluessel(name: string): string {
  return name
    .split(',')[0]
    .replace(/\s+(nord|süd|ost|west)(-(nord|süd|ost|west))?$/i, '')
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Passender Artikel je AGES-Badestelle. Fest zugeordnet sind die Badestellen aus dem Badeplatz-Check (`agesId`)
 * und die der „Badewasser-Qualität“-Karte eines Bade-Artikels (`badestelleFuer`). Weitere Badestellen am selben
 * See (gleicher Name, ≤ 25 km) übernehmen den Link – bevorzugt den Artikel, der den See schon im Slug trägt.
 */
async function artikelJeBadestelle(stellen: AgesProbe[]): Promise<Map<string, string>> {
  const fest = new Map<string, string>();
  for (const p of BADEPLAETZE) {
    if (p.agesId && p.slug && !fest.has(p.agesId)) fest.set(p.agesId, p.slug);
  }
  const badeArtikel = posts.filter((p) => p.category === 'Baden');
  const treffer = await Promise.all(badeArtikel.map((p) => badestelleFuer(p)));
  treffer.forEach((b, i) => {
    if (b?.id && !fest.has(b.id)) fest.set(b.id, badeArtikel[i].slug);
  });

  const map = new Map<string, string>();
  for (const s of stellen) {
    const eigen = fest.get(s.id);
    if (eigen) {
      map.set(s.id, eigen);
      continue;
    }
    const key = seeSchluessel(s.name);
    let best: { slug: string; passt: boolean; km: number } | undefined;
    for (const o of stellen) {
      const slug = fest.get(o.id);
      if (!slug || seeSchluessel(o.name) !== key) continue;
      const km = distKm([s.lat, s.lng], [o.lat, o.lng]);
      if (km > 25) continue;
      const passt = slug.replace(/-/g, '').includes(key);
      if (!best || (passt && !best.passt) || (passt === best.passt && km < best.km)) best = { slug, passt, km };
    }
    if (best) map.set(s.id, best.slug);
  }
  return map;
}

function formatGrad(v: number): string {
  return `${v.toLocaleString('de-AT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} °C`;
}

export default async function WassertemperaturPage() {
  const artikel = artikelJeStation();

  const gruppen: WtGruppe[] = GRUPPEN.map((g) => ({
    key: g.region,
    titel: g.titel,
    region: g.region,
    hinweis: g.hinweis,
    quelle: QUELLEN_LABEL[g.quelle],
    stationen: SEE_MESSSTELLEN.filter((m) => m.quelle === g.quelle)
      .map((m) => ({ id: m.id, see: m.see, ort: m.ort, slug: artikel.get(m.id) }))
      .sort((a, b) => a.see.localeCompare(b.see, 'de') || a.ort.localeCompare(b.ort, 'de')),
  }));

  // Letzte offizielle Proben (AGES, täglich neu). Fällt die Quelle aus, entfällt dieser Teil einfach.
  const { saison, stellen } = await agesProbenNachBundesland(PROBEN_LAENDER.map((l) => l.bundesland));
  const probenGruppen = PROBEN_LAENDER.map((l) => ({ ...l, stellen: stellen[l.bundesland] ?? [] })).filter((g) => g.stellen.length > 0);
  const anzahlProben = probenGruppen.reduce((n, g) => n + g.stellen.length, 0);
  const artikelProbe = await artikelJeBadestelle(probenGruppen.flatMap((g) => g.stellen));

  // ItemList: jeder See einmal (mehrere Messstellen am selben See zusammengefasst).
  const seen = new Map<string, string | undefined>();
  for (const s of gruppen.flatMap((g) => g.stationen)) {
    if (!seen.has(s.see) || (!seen.get(s.see) && s.slug)) seen.set(s.see, s.slug);
  }
  const seeListe = [...seen.entries()].sort((a, b) => a[0].localeCompare(b[0], 'de'));

  const sprungziele = [
    ...gruppen.map((g) => ({ key: g.key, titel: g.titel })),
    ...probenGruppen.map((g) => ({ key: g.region, titel: g.bundesland })),
  ];

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Wassertemperatur live', url: `${BASE}/wassertemperatur` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Seen in Österreich mit Live-Wassertemperatur',
      numberOfItems: seeListe.length,
      itemListElement: seeListe.map(([see, slug], i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: see,
        url: slug ? `${BASE}/blog/${slug}` : `${BASE}/wassertemperatur`,
      })),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-14 md:py-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="eyebrow mb-2">Live-Daten</p>
      <h1 className="font-serif text-display font-bold mb-3 text-ink">Wassertemperatur der Seen in Österreich</h1>
      <p className="text-ink-soft max-w-2xl mb-4 leading-relaxed">
        Wie warm ist der See gerade? Hier stehen die aktuellen Messwerte von {SEE_MESSSTELLEN.length} offiziellen
        Messstellen an {seeListe.length} Seen in Kärnten, Salzburg und Oberösterreich – keine Schätzungen, sondern
        die Werte der Hydrographischen Dienste der Länder.
        {anzahlProben > 0 && (
          <>
            {' '}Für die übrigen Bundesländer gibt es kein offenes Live-Messnetz – dort zeigen wir die Wassertemperatur
            der letzten offiziellen Probe an {anzahlProben} EU-Badestellen.
          </>
        )}
      </p>
      <p className="text-fine text-ink-soft mb-10">
        Springe zu:{' '}
        {sprungziele.map((g, i) => (
          <span key={g.key}>
            {i > 0 && ' · '}
            <a href={`#${g.key}`} className="text-green-700 hover:underline">{g.titel}</a>
          </span>
        ))}
      </p>

      <WassertemperaturLive gruppen={gruppen} />

      {/* Bundesländer ohne Live-Messnetz: letzte Probe der EU-Badestellen (serverseitig, also auch für Suchmaschinen lesbar) */}
      {probenGruppen.length > 0 && (
        <section className="mb-12">
          <p className="eyebrow mb-1">Letzte offizielle Probe</p>
          <h2 className="font-serif text-lead font-bold mb-2 text-ink">
            {probenGruppen.map((g) => g.bundesland).join(', ').replace(/, ([^,]*)$/, ' und $1')}: Wassertemperatur der letzten Probe
          </h2>
          <p className="text-ink-soft max-w-2xl mb-8 leading-relaxed">
            An jeder offiziellen EU-Badestelle werden während der Badesaison mehrmals Wasserproben genommen – für die
            Hygiene-Kontrolle, aber dabei wird auch die Temperatur gemessen. Hier steht jeweils der Wert der jüngsten
            Probe der Saison {saison} mit Datum. Das ist ein guter Anhaltspunkt, wie warm der See im Sommer wird, aber
            kein Live-Wert: Zwischen zwei Proben liegen oft Wochen, außerhalb der Badesaison kommen keine neuen dazu.
          </p>

          {probenGruppen.map((g) => (
            <div key={g.region} id={g.region} className="mb-10 scroll-mt-24">
              <h3 className="font-serif text-tagline font-bold mb-1 text-ink">
                {g.bundesland}
                <Link href={`/regionen/${g.region}`} className="ml-3 text-caption font-sans font-normal text-green-700 hover:underline">
                  Region entdecken →
                </Link>
              </h3>
              <p className="text-fine text-ink-soft mb-4">{g.stellen.length} offizielle Badestellen · Quelle: AGES-Badegewässerdatenbank</p>
              <div className="border border-hairline rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-parchment text-fine uppercase tracking-wide text-ink-soft">
                    <tr>
                      <th scope="col" className="px-4 py-2 font-semibold">Badestelle</th>
                      <th scope="col" className="px-4 py-2 font-semibold hidden sm:table-cell">Gemeinde</th>
                      <th scope="col" className="px-4 py-2 font-semibold text-right">Letzte Probe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.stellen.map((s) => {
                      const slug = artikelProbe.get(s.id);
                      return (
                        <tr key={s.id} className="border-t border-hairline">
                          <td className="px-4 py-3 align-top">
                            {slug ? (
                              <Link href={`/blog/${slug}`} className="font-semibold text-ink hover:text-sky-700 hover:underline">
                                {s.name}
                              </Link>
                            ) : (
                              <span className="font-semibold text-ink">{s.name}</span>
                            )}
                            <span className="block sm:hidden text-caption text-ink-muted">{s.gemeinde}</span>
                            {s.gesperrt && <span className="block text-fine font-semibold text-red-700">derzeit behördlich gesperrt</span>}
                          </td>
                          <td className="px-4 py-3 align-top text-caption text-ink-muted hidden sm:table-cell">{s.gemeinde}</td>
                          <td className="px-4 py-3 align-top text-right">
                            {s.probe ? (
                              <>
                                <span className="font-semibold text-ink tabular-nums">{formatGrad(s.probe.wasser)}</span>
                                <span className="block text-fine text-ink-soft">am {s.probe.datum}</span>
                              </>
                            ) : (
                              <span className="text-caption text-ink-soft">keine Probe {saison}</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Einordnung */}
      <section className="border border-hairline bg-sand-50 p-6 rounded-lg mb-10">
        <h2 className="font-serif text-tagline font-bold mb-3 text-ink">So liest du die Werte</h2>
        <ul className="space-y-2 text-ink-muted leading-relaxed">
          <li>
            <strong>Gemessen wird an einem fixen Punkt.</strong> Die Messstelle liegt oft an einem Pegel oder Steg – an
            seichten Buchten kann das Wasser an sonnigen Tagen wärmer sein, an tiefen Stellen und nach Gewittern kühler.
          </li>
          <li>
            <strong>Große Seen sind nicht überall gleich warm.</strong> Deshalb zeigen wir z. B. am Attersee, Traunsee und
            Hallstätter See mehrere Messstellen getrennt an.
          </li>
          <li>
            <strong>Nur frische Werte.</strong> Messungen, die älter als 72 Stunden sind, blenden wir aus, statt sie als
            „aktuell“ zu verkaufen. Im Winter melden manche Stationen keine Werte.
          </li>
          {anzahlProben > 0 && (
            <li>
              <strong>„Letzte Probe“ ist kein Live-Wert.</strong> Die Temperaturen für die Bundesländer ohne Messnetz
              zeigen, wie warm das Wasser am Probentag war – achte auf das Datum daneben.
            </li>
          )}
          <li>
            <strong>Temperatur ist nicht Wasserqualität.</strong> Die offizielle Badewasser-Einstufung der EU-Badestellen
            findest du im <Link href="/badeplaetze" className="text-green-700 hover:underline">Badeplatz-Check</Link>.
          </li>
        </ul>
      </section>

      <p className="text-fine text-ink-soft mb-8">
        Quellen: Hydrographischer Dienst Kärnten, Hydrographischer Dienst Salzburg und Hydrographischer Dienst
        Oberösterreich (Open Government Data, CC BY 4.0). Werte werden alle 15 Minuten neu abgerufen. Für die übrigen
        Bundesländer gibt es derzeit keinen vergleichbaren offenen Live-Datensatz für Seen
        {anzahlProben > 0 ? (
          <> – die Werte der letzten Probe stammen aus der Badegewässer-Datenbank der AGES (CC BY 3.0 AT) und werden täglich aktualisiert.</>
        ) : (
          '.'
        )}
      </p>

      <div className="flex flex-wrap gap-3">
        <Link href="/seen-vergleich" className="inline-block bg-green-700 text-white text-caption font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors rounded-full">
          Seen im Vergleich
        </Link>
        <Link href="/badeplaetze" className="inline-block border border-sky-500 text-sky-700 text-caption font-semibold px-5 py-2.5 hover:bg-sky-50 transition-colors rounded-full">
          Badeplatz-Check
        </Link>
        <Link href="/seen-vergleich/warme-seen" className="btn btn-secondary btn-sm">
          Die wärmsten Seen
        </Link>
        <Link href="/wandern-baden" className="btn btn-secondary btn-sm">
          Wandern + Baden
        </Link>
        <Link href="/unterkuenfte/am-see" className="btn btn-quiet btn-sm">
          Unterkünfte am See
        </Link>
        <Link href="/ausflugsplaner" className="btn btn-quiet btn-sm">
          Alle Themenseiten
        </Link>
      </div>
    </div>
  );
}
