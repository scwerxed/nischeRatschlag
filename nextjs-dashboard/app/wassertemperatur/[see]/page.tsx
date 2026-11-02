import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { posts, type Post } from '@/app/lib/posts';
import { BADEPLAETZE } from '@/app/lib/badeplaetze';
import { LAKES } from '@/app/lib/seen';
import { AGES_EINSTUFUNG, agesBadestellenAmSee, seeMessstellenFuer } from '@/app/lib/gewaesser';
import { LIVE_SEEN, QUELLEN_LABEL, seeSlug } from '@/app/lib/seen-messstellen';
import { UMKREIS_KM, coordsOf, distKm } from '@/app/lib/wochenendtrip';
import { CATEGORY_STYLE } from '@/app/lib/blog-utils';
import { BASE, breadcrumbSchema, regionName } from '@/app/lib/seo';
import SeeSteckbriefLive from '@/app/ui/see-steckbrief-live';

// Steckbrief je See mit Live-Messstelle: Live-Wert (clientseitig über /api/seewetter), dazu serverseitig die
// offiziellen AGES-Badestellen am See, passende Artikel, Ziele im Umkreis und die nächsten anderen Live-Seen.
// Die AGES-Daten ändern sich höchstens täglich – Seite wie /wassertemperatur täglich neu erzeugen.
export const revalidate = 86400;

type Props = { params: Promise<{ see: string }> };

export function generateStaticParams() {
  return LIVE_SEEN.map((s) => ({ see: s.slug }));
}

/** „Kammer, Weißenbach, Unterach“ → „Kammer, Weißenbach und Unterach“. */
function aufzaehlung(namen: string[]): string {
  return namen.join(', ').replace(/, ([^,]*)$/, ' und $1');
}

function formatGrad(v: number): string {
  return `${v.toLocaleString('de-AT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} °C`;
}

const EINSTUFUNG_CLS = {
  gut: 'bg-green-100 text-green-800 border-green-200',
  mittel: 'bg-amber-100 text-amber-800 border-amber-200',
  schlecht: 'bg-red-100 text-red-800 border-red-200',
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { see } = await params;
  const s = LIVE_SEEN.find((x) => x.slug === see);
  if (!s) return {};
  const { stellen } = await agesBadestellenAmSee(s.match);
  const orte = aufzaehlung(s.stationen.map((m) => m.ort));
  return {
    title: `Wassertemperatur ${s.see} – aktuell & live`,
    description: `Wie warm ist der ${s.see} gerade? Offizieller Live-Messwert ${s.stationen.length > 1 ? 'der Messstellen' : 'der Messstelle'} ${orte}${
      stellen.length > 0 ? `, dazu Badewasser-Qualität und letzte Probe ${stellen.length > 1 ? `an ${stellen.length} EU-Badestellen` : 'an der EU-Badestelle'}` : ''
    } und Ausflugsziele rund um den See.`,
    keywords: [`Wassertemperatur ${s.see}`, `${s.see} Wassertemperatur aktuell`, `${s.see} Temperatur heute`, `${s.see} baden`, 'Wassertemperatur Seen Österreich'],
    alternates: { canonical: `/wassertemperatur/${s.slug}` },
  };
}

export default async function SeeSteckbriefPage({ params }: Props) {
  const { see } = await params;
  const s = LIVE_SEEN.find((x) => x.slug === see);
  if (!s) notFound();

  const { saison, stellen, proben, waermste } = await agesBadestellenAmSee(s.match);
  const orte = s.stationen.map((m) => m.ort);
  const punkte: [number, number][] = s.stationen.map((m) => [m.lat, m.lng]);
  const lake = LAKES.find((l) => seeSlug(l.name) === s.slug);

  // Badeplatz-Check-Einträge an diesen Badestellen (fest per `agesId` zugeordnet).
  const stellenIds = new Set(stellen.map((b) => b.id));
  const badeplatzJeStelle = new Map<string, string>();
  for (const b of BADEPLAETZE) {
    if (b.agesId && stellenIds.has(b.agesId) && !badeplatzJeStelle.has(b.agesId)) badeplatzJeStelle.set(b.agesId, b.name);
  }

  // Artikel zum See: dieselbe Zuordnung wie die „Wassertemperatur live“-Karte im Artikel, dazu der Artikel aus dem
  // Seen-Vergleich und die des Badeplatz-Checks an diesen Badestellen. Bade-Artikel zuerst.
  const direkt = new Set<string>([
    ...posts.filter((p) => seeMessstellenFuer(p)[0]?.see === s.see).map((p) => p.slug),
    ...(lake?.slug ? [lake.slug] : []),
    ...BADEPLAETZE.flatMap((b) => (b.slug && b.agesId && stellenIds.has(b.agesId) ? [b.slug] : [])),
  ]);
  const artikel = posts
    .filter((p) => direkt.has(p.slug))
    .sort((a, b) => Number(b.category === 'Baden') - Number(a.category === 'Baden'))
    .slice(0, 6);

  // Weitere Ziele im Umkreis der Messstelle(n) – gleicher Radius wie „Weitere Ziele im Umkreis“ im Artikel.
  const umkreis = posts
    .filter((p) => !direkt.has(p.slug))
    .map((p) => {
      const c = coordsOf(p);
      return c ? { post: p, km: Math.min(...punkte.map((q) => distKm(c, q))) } : null;
    })
    .filter((x): x is { post: Post; km: number } => x !== null && x.km <= UMKREIS_KM)
    .sort((a, b) => a.km - b.km)
    .slice(0, 4);

  // Die nächsten anderen Seen mit Live-Messstelle (Abstand zwischen den nächstgelegenen Messstellen).
  const nachbarn = LIVE_SEEN.filter((o) => o.slug !== s.slug)
    .map((o) => ({ see: o, km: Math.min(...o.stationen.flatMap((m) => punkte.map((q) => distKm([m.lat, m.lng], q)))) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 6);

  const url = `${BASE}/wassertemperatur/${s.slug}`;
  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Wassertemperatur live', url: `${BASE}/wassertemperatur` },
      { name: s.see, url },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'LakeBodyOfWater',
      name: s.see,
      url,
      geo: { '@type': 'GeoCoordinates', latitude: s.stationen[0].lat, longitude: s.stationen[0].lng },
      containedInPlace: s.regionen.map((r) => ({ '@type': 'AdministrativeArea', name: regionName(r) })),
    },
    ...(artikel.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `Artikel zum ${s.see}`,
            numberOfItems: artikel.length,
            itemListElement: artikel.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: p.title,
              url: `${BASE}/blog/${p.slug}`,
            })),
          },
        ]
      : []),
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-14 md:py-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="flex flex-wrap items-center gap-2 text-fine text-ink-soft mb-5">
        <Link href="/" className="hover:text-green-700">Startseite</Link>
        <span>/</span>
        <Link href="/wassertemperatur" className="hover:text-green-700">Wassertemperatur</Link>
        <span>/</span>
        <span className="text-ink-muted">{s.see}</span>
      </nav>

      <p className="eyebrow mb-2">Live-Daten · {s.regionen.map((r) => regionName(r)).join(' / ')}</p>
      <h1 className="font-serif text-display font-bold mb-3 text-ink">Wassertemperatur {s.see}</h1>
      <p className="text-ink-soft max-w-2xl mb-8 leading-relaxed">
        Wie warm ist der {s.see} gerade?{' '}
        {s.stationen.length > 1
          ? `Hier stehen die aktuellen Messwerte aller ${s.stationen.length} offiziellen Messstellen am See (${aufzaehlung(orte)})`
          : `Hier steht der aktuelle Messwert der offiziellen Messstelle ${orte[0]}`}{' '}
        – offizielle Werte, keine Schätzung.
        {stellen.length > 0 && (
          <>
            {' '}Darunter: {stellen.length > 1 ? `die ${stellen.length} offiziellen EU-Badestellen` : 'die offizielle EU-Badestelle'} am
            See mit Badewasser-Qualität und letzter Probe.
          </>
        )}
      </p>

      <SeeSteckbriefLive stationen={s.stationen.map((m) => ({ id: m.id, ort: m.ort, quelle: QUELLEN_LABEL[m.quelle] }))} />

      {/* Wärmste Probe der Saison (AGES) */}
      {waermste && (
        <section className="mb-12">
          <h2 className="font-serif text-lead font-bold mb-2 text-ink">Die wärmste Probe {saison}</h2>
          <p className="text-ink-soft max-w-2xl leading-relaxed">
            Von {proben === 1 ? 'der offiziellen Wasserprobe' : `den ${proben} offiziellen Wasserproben`} der Badesaison {saison}{' '}
            am {s.see} zeigte die wärmste{' '}
            <strong className="font-semibold text-ink tabular-nums">{formatGrad(waermste.wasser)}</strong> – gemessen am{' '}
            {waermste.datum} an der Badestelle {waermste.stelle}. Die Proben werden während der Badesaison mehrmals am Ufer
            genommen: Sie zeigen, wie warm der See im Sommer wird, sind aber keine Tageswerte.
          </p>
        </section>
      )}

      {/* Offizielle Badestellen (AGES) – serverseitig, also auch für Suchmaschinen lesbar */}
      {stellen.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-lead font-bold mb-1 text-ink">Offizielle Badestellen am {s.see}</h2>
          <p className="text-fine text-ink-soft mb-4">
            {stellen.length} {stellen.length === 1 ? 'EU-Badestelle' : 'EU-Badestellen'} · Qualität = offizielle
            Jahres-Einstufung nach EU-Badegewässerrichtlinie · Quelle: AGES-Badegewässerdatenbank
          </p>
          <div className="border border-hairline rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-parchment text-fine uppercase tracking-wide text-ink-soft">
                <tr>
                  <th scope="col" className="px-4 py-2 font-semibold">Badestelle</th>
                  <th scope="col" className="px-4 py-2 font-semibold hidden sm:table-cell">Qualität</th>
                  <th scope="col" className="px-4 py-2 font-semibold text-right">Letzte Probe</th>
                </tr>
              </thead>
              <tbody>
                {stellen.map((b) => {
                  const einstufung = b.einstufung ? AGES_EINSTUFUNG[b.einstufung.code] : undefined;
                  const jahr = b.einstufung?.jahr;
                  const platz = badeplatzJeStelle.get(b.id);
                  return (
                    <tr key={b.id} className="border-t border-hairline">
                      <td className="px-4 py-3 align-top">
                        <span className="font-semibold text-ink">{b.name}</span>
                        <span className="block text-caption text-ink-muted">{b.gemeinde}</span>
                        {einstufung && (
                          <span className="block sm:hidden text-fine text-ink-soft">
                            Qualität {jahr}: {einstufung.label}
                          </span>
                        )}
                        {b.gesperrt && (
                          <span className="block text-fine font-semibold text-red-700">
                            derzeit behördlich gesperrt{b.sperrgrund ? `: ${b.sperrgrund}` : ''}
                          </span>
                        )}
                        {platz && (
                          <Link href="/badeplaetze" className="block mt-1 text-fine font-medium text-sky-700 hover:underline">
                            Im Badeplatz-Check: {platz} →
                          </Link>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top hidden sm:table-cell">
                        {einstufung ? (
                          <>
                            <span className={`inline-block text-fine font-semibold px-2 py-0.5 border ${EINSTUFUNG_CLS[einstufung.tone]} rounded-sm`}>
                              {einstufung.label}
                            </span>
                            <span className="block text-fine text-ink-soft mt-1">Einstufung {jahr}</span>
                          </>
                        ) : (
                          <span className="text-caption text-ink-soft">–</span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top text-right">
                        {b.letzteProbe ? (
                          <>
                            <span className="font-semibold text-ink tabular-nums">
                              {b.letzteProbe.wasser !== null ? formatGrad(b.letzteProbe.wasser) : 'ohne Temperatur'}
                            </span>
                            <span className="block text-fine text-ink-soft">am {b.letzteProbe.datum}</span>
                          </>
                        ) : (
                          <span className="text-caption text-ink-soft">keine Probe</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Kurzprofil aus dem Seen-Vergleich */}
      {lake && (
        <section className="mb-12 border border-hairline rounded-lg p-6">
          <p className="eyebrow mb-1">Aus dem Seen-Vergleich</p>
          <h2 className="font-serif text-tagline font-bold mb-2 text-ink">Der {s.see} in Kürze</h2>
          <p className="text-caption text-ink-muted">
            {lake.charakter} · {lake.groesse} · ideal für {lake.idealFuer}
          </p>
          <p className="text-caption text-ink-soft mt-2">
            <strong className="font-semibold text-ink">Tipp:</strong> {lake.tipp}
          </p>
          <Link href="/seen-vergleich" className="inline-block mt-3 text-caption font-medium text-green-700 hover:underline">
            Alle Seen im Vergleich →
          </Link>
        </section>
      )}

      {/* Artikel zum See */}
      {artikel.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-lead font-bold mb-4 text-ink">Artikel zum {s.see}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {artikel.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block border border-hairline p-5 hover:border-green-400 transition rounded-lg">
                <span className={`eyebrow ${CATEGORY_STYLE[p.category].text}`}>{p.category}</span>
                <h3 className="mt-1.5 font-serif text-body font-bold text-ink group-hover:text-green-700 leading-snug">{p.title}</h3>
                <p className="mt-1.5 text-caption text-ink-soft line-clamp-2">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Weitere Ziele im Umkreis */}
      {umkreis.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-tagline font-bold mb-1 text-ink">
            {artikel.length > 0 ? 'Weitere Ziele im Umkreis' : `Ausflugsziele rund um den ${s.see}`}
          </h2>
          <p className="text-caption text-ink-soft mb-4">
            Bis {UMKREIS_KM}&nbsp;km Luftlinie von der Messstelle, das nächste zuerst. Im Gebirge ist der tatsächliche Weg oft
            deutlich länger.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {umkreis.map((n) => (
              <Link key={n.post.slug} href={`/blog/${n.post.slug}`} className="group block border border-hairline p-4 hover:border-green-400 transition rounded-lg">
                <span className="flex items-baseline justify-between gap-3">
                  <span className={`eyebrow ${CATEGORY_STYLE[n.post.category].text}`}>{n.post.category}</span>
                  <span className="text-fine text-ink-soft whitespace-nowrap tabular-nums">
                    {n.km < 1 ? 'gleich am See' : `≈ ${Math.round(n.km)} km`}
                  </span>
                </span>
                <h3 className="mt-1.5 text-caption font-semibold text-ink group-hover:text-green-700 leading-snug">{n.post.title}</h3>
                {!s.regionen.includes(n.post.region) && (
                  <span className="block mt-1 text-fine text-ink-soft">{regionName(n.post.region)}</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Nächste andere Live-Seen */}
      <section className="mb-12">
        <h2 className="font-serif text-tagline font-bold mb-1 text-ink">Wassertemperatur der Seen in der Nähe</h2>
        <p className="text-caption text-ink-soft mb-4">Die nächsten anderen Seen mit Live-Messstelle, Abstand der Messstellen in Luftlinie.</p>
        <div className="flex flex-wrap gap-2">
          {nachbarn.map((n) => (
            <Link
              key={n.see.slug}
              href={`/wassertemperatur/${n.see.slug}`}
              className="text-caption font-medium px-4 py-1.5 bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 transition-colors rounded-full"
            >
              {n.see.see} <span className="text-ink-soft font-normal">· ≈ {Math.max(1, Math.round(n.km))} km</span>
            </Link>
          ))}
          <Link
            href="/wassertemperatur"
            className="text-caption font-medium px-4 py-1.5 border border-hairline text-ink-muted hover:border-green-600 hover:text-green-700 transition-colors rounded-full"
          >
            Alle {LIVE_SEEN.length} Seen →
          </Link>
        </div>
      </section>

      {/* Einordnung */}
      <section className="border border-hairline bg-sand-50 p-6 rounded-lg mb-10">
        <h2 className="font-serif text-tagline font-bold mb-3 text-ink">So liest du die Werte</h2>
        <ul className="space-y-2 text-ink-muted leading-relaxed">
          <li>
            <strong>Gemessen wird an einem fixen Punkt.</strong> In seichten Buchten kann das Wasser an sonnigen Tagen wärmer
            sein, an tiefen Stellen und nach Gewittern kühler.
          </li>
          <li>
            <strong>Nur frische Werte.</strong> Messungen, die älter als 72 Stunden sind, blenden wir aus, statt sie als
            „aktuell“ zu verkaufen.
          </li>
          {stellen.length > 0 && (
            <li>
              <strong>Probe ist nicht Live-Wert.</strong> Die Temperatur der Badestellen stammt vom jeweiligen Probentag –
              achte auf das Datum. Die Qualitäts-Einstufung bewertet die Hygiene (E. coli, Enterokokken), nicht die
              Temperatur.
            </li>
          )}
        </ul>
      </section>

      <p className="text-fine text-ink-soft mb-8">
        Quellen: {aufzaehlung([...new Set(s.stationen.map((m) => QUELLEN_LABEL[m.quelle]))])} (Open Government Data, CC BY
        4.0)
        {stellen.length > 0 ? ' sowie die Badegewässer-Datenbank der AGES (CC BY 3.0 AT), täglich aktualisiert.' : '.'}
      </p>

      <div className="flex flex-wrap gap-3">
        <Link href="/wassertemperatur" className="inline-block bg-green-700 text-white text-caption font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors rounded-full">
          Alle Seen: Wassertemperatur live
        </Link>
        <Link href="/badeplaetze" className="inline-block border border-sky-500 text-sky-700 text-caption font-semibold px-5 py-2.5 hover:bg-sky-50 transition-colors rounded-full">
          Badeplatz-Check
        </Link>
        {s.regionen.map((r) => (
          <Link key={r} href={`/regionen/${r}`} className="btn btn-secondary btn-sm">
            Region {regionName(r)}
          </Link>
        ))}
        <Link href="/unterkuenfte/am-see" className="btn btn-quiet btn-sm">
          Unterkünfte am See
        </Link>
      </div>
    </div>
  );
}
