import Link from 'next/link';
import type { Metadata } from 'next';
import { posts } from '@/app/lib/posts';
import { seeMessstellenFuer } from '@/app/lib/gewaesser';
import { SEE_MESSSTELLEN, QUELLEN_LABEL, type SeeQuelle } from '@/app/lib/seen-messstellen';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';
import WassertemperaturLive, { type WtGruppe } from '@/app/ui/wassertemperatur-live';

export const metadata: Metadata = {
  title: 'Wassertemperatur der Seen in Österreich – live',
  description: 'Aktuelle Wassertemperaturen von 33 offiziellen Messstellen an Österreichs Badeseen: Wörthersee, Millstätter See, Wolfgangsee, Attersee, Traunsee, Zeller See & Co. – direkt von den Hydrographischen Diensten Kärnten, Salzburg und Oberösterreich.',
  keywords: ['Wassertemperatur Seen Österreich', 'Wassertemperatur aktuell', 'Wassertemperatur Wörthersee', 'Wassertemperatur Attersee', 'Wassertemperatur Wolfgangsee', 'Badeseen Temperatur live', 'Seetemperatur Kärnten', 'Seetemperatur Salzkammergut'],
  alternates: { canonical: '/wassertemperatur' },
};

const GRUPPEN: { quelle: SeeQuelle; titel: string; region: string; hinweis?: string }[] = [
  { quelle: 'ktn', titel: 'Kärnten', region: 'kaernten' },
  { quelle: 'sbg', titel: 'Salzburg', region: 'salzburg', hinweis: 'inkl. der grenznahen Messstellen am Mondsee und am Attersee (Unterach)' },
  { quelle: 'ooe', titel: 'Oberösterreich', region: 'oberoesterreich' },
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

export default function WassertemperaturPage() {
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

  // ItemList: jeder See einmal (mehrere Messstellen am selben See zusammengefasst).
  const seen = new Map<string, string | undefined>();
  for (const s of gruppen.flatMap((g) => g.stationen)) {
    if (!seen.has(s.see) || (!seen.get(s.see) && s.slug)) seen.set(s.see, s.slug);
  }
  const seeListe = [...seen.entries()].sort((a, b) => a[0].localeCompare(b[0], 'de'));

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
      </p>
      <p className="text-fine text-ink-soft mb-10">
        Springe zu:{' '}
        {gruppen.map((g, i) => (
          <span key={g.key}>
            {i > 0 && ' · '}
            <a href={`#${g.key}`} className="text-green-700 hover:underline">{g.titel}</a>
          </span>
        ))}
      </p>

      <WassertemperaturLive gruppen={gruppen} />

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
          <li>
            <strong>Temperatur ist nicht Wasserqualität.</strong> Die offizielle Badewasser-Einstufung der EU-Badestellen
            findest du im <Link href="/badeplaetze" className="text-green-700 hover:underline">Badeplatz-Check</Link>.
          </li>
        </ul>
      </section>

      <p className="text-fine text-ink-soft mb-8">
        Quellen: Hydrographischer Dienst Kärnten, Hydrographischer Dienst Salzburg und Hydrographischer Dienst
        Oberösterreich (Open Government Data, CC BY 4.0). Werte werden alle 15 Minuten neu abgerufen. Für Tirol,
        die Steiermark und das Burgenland gibt es derzeit keinen vergleichbaren offenen Live-Datensatz für Seen.
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
