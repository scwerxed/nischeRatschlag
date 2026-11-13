import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { posts, type Post } from '@/app/lib/posts';
import { BADEPLAETZE } from '@/app/lib/badeplaetze';
import { LAKES } from '@/app/lib/seen';
import { AGES_EINSTUFUNG, agesBadestellenAmSee, liegtAmSee, seeMessstellenFuer } from '@/app/lib/gewaesser';
import { QUELLEN_LABEL, STECKBRIEF_SEEN, steckbriefFuer } from '@/app/lib/seen-messstellen';
import { UMKREIS_KM, coordsOf, distKm } from '@/app/lib/wochenendtrip';
import { CATEGORY_STYLE } from '@/app/lib/blog-utils';
import { BASE, breadcrumbSchema, regionName } from '@/app/lib/seo';
import SeeSteckbriefLive from '@/app/ui/see-steckbrief-live';

// Steckbrief je See. Seen mit Live-Messstelle: Live-Wert (clientseitig über /api/seewetter). Seen nur mit offiziellen
// Proben (PROBEN_SEEN, z. B. Achensee, Neusiedler See, Alte Donau): jüngste Probe statt Live-Wert. Für beide
// serverseitig die AGES-Badestellen am See (wärmste Probe, Höchstwert je Monat, Qualität), passende Artikel, Ziele im
// Umkreis und die nächsten anderen Seen. Die AGES-Daten ändern sich höchstens täglich – Seite täglich neu erzeugen.
export const revalidate = 86400;

type Props = { params: Promise<{ see: string }> };

export function generateStaticParams() {
  return STECKBRIEF_SEEN.map((s) => ({ see: s.slug }));
}

/** „Kammer, Weißenbach, Unterach“ → „Kammer, Weißenbach und Unterach“. */
function aufzaehlung(namen: string[]): string {
  return namen.join(', ').replace(/, ([^,]*)$/, ' und $1');
}

function formatGrad(v: number): string {
  return `${v.toLocaleString('de-AT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} °C`;
}

/** „der Achensee“ → „Der Achensee“ (Satzanfang). */
function gross(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const MONATSNAMEN = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

const EINSTUFUNG_CLS = {
  gut: 'bg-green-100 text-green-800 border-green-200',
  mittel: 'bg-amber-100 text-amber-800 border-amber-200',
  schlecht: 'bg-red-100 text-red-800 border-red-200',
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { see } = await params;
  const s = STECKBRIEF_SEEN.find((x) => x.slug === see);
  if (!s) return {};
  const { stellen } = await agesBadestellenAmSee(s.match);
  const anStellen = stellen.length > 1 ? `an ${stellen.length} EU-Badestellen` : 'an der EU-Badestelle';

  if (s.stationen.length === 0) {
    return {
      title: `Wassertemperatur ${s.see}: letzte Probe & Badewasser-Qualität`,
      description: `Wie warm wird ${s.formen.der}? Jüngste und wärmste offizielle Wasserprobe der Saison${
        stellen.length > 0 ? ` ${anStellen}` : ''
      }, Höchstwerte je Monat, Badewasser-Qualität und Ausflugsziele rund um ${s.formen.den}.`,
      keywords: [`Wassertemperatur ${s.see}`, `${s.see} Wassertemperatur`, `${s.see} Temperatur`, `${s.see} baden`, `${s.see} Badewasserqualität`, 'Wassertemperatur Seen Österreich'],
      alternates: { canonical: `/wassertemperatur/${s.slug}` },
    };
  }

  const orte = aufzaehlung(s.stationen.map((m) => m.ort));
  return {
    title: `Wassertemperatur ${s.see} – aktuell & live`,
    description: `Wie warm ist ${s.formen.der} gerade? Offizieller Live-Messwert ${s.stationen.length > 1 ? 'der Messstellen' : 'der Messstelle'} ${orte}${
      stellen.length > 0 ? `, dazu Badewasser-Qualität und letzte Probe ${anStellen}` : ''
    } und Ausflugsziele rund um den See.`,
    keywords: [`Wassertemperatur ${s.see}`, `${s.see} Wassertemperatur aktuell`, `${s.see} Temperatur heute`, `${s.see} baden`, 'Wassertemperatur Seen Österreich'],
    alternates: { canonical: `/wassertemperatur/${s.slug}` },
  };
}

export default async function SeeSteckbriefPage({ params }: Props) {
  const { see } = await params;
  const s = STECKBRIEF_SEEN.find((x) => x.slug === see);
  if (!s) notFound();

  const live = s.stationen.length > 0;
  const f = s.formen;
  const { saison, stellen, proben, waermste, juengste, monate, punkte: agesPunkte } = await agesBadestellenAmSee(s.match);
  const orte = s.stationen.map((m) => m.ort);
  // Bezugspunkte für Artikel und Umkreis: die Live-Messstellen, sonst alle Badestellen am See (fällt der Feed aus,
  // der Listenpunkt des Sees).
  const punkte: [number, number][] = live || agesPunkte.length === 0 ? s.punkte : agesPunkte;
  const lake = LAKES.find((l) => steckbriefFuer(l.name)?.slug === s.slug);

  // Badeplatz-Check-Einträge an diesen Badestellen (fest per `agesId` zugeordnet).
  const stellenIds = new Set(stellen.map((b) => b.id));
  const badeplatzJeStelle = new Map<string, string>();
  for (const b of BADEPLAETZE) {
    if (b.agesId && stellenIds.has(b.agesId) && !badeplatzJeStelle.has(b.agesId)) badeplatzJeStelle.set(b.agesId, b.name);
  }

  // Artikel zum See: bei Live-Seen dieselbe Zuordnung wie die „Wassertemperatur live“-Karte im Artikel, sonst Seename
  // im Artikel + Startpunkt nahe einer Badestelle (gleiche Regel). Dazu der Artikel aus dem Seen-Vergleich und die des
  // Badeplatz-Checks an diesen Badestellen. Bade-Artikel zuerst.
  const direkt = new Set<string>([
    ...posts.filter((p) => (live ? seeMessstellenFuer(p)[0]?.see === s.see : liegtAmSee(p, s.match, punkte))).map((p) => p.slug),
    ...(lake?.slug ? [lake.slug] : []),
    ...BADEPLAETZE.flatMap((b) => (b.slug && b.agesId && stellenIds.has(b.agesId) ? [b.slug] : [])),
  ]);
  const artikel = posts
    .filter((p) => direkt.has(p.slug))
    .sort((a, b) => Number(b.category === 'Baden') - Number(a.category === 'Baden'))
    .slice(0, 6);

  // Weitere Ziele im Umkreis – gleicher Radius wie „Weitere Ziele im Umkreis“ im Artikel.
  const umkreis = posts
    .filter((p) => !direkt.has(p.slug))
    .map((p) => {
      const c = coordsOf(p);
      return c ? { post: p, km: Math.min(...punkte.map((q) => distKm(c, q))) } : null;
    })
    .filter((x): x is { post: Post; km: number } => x !== null && x.km <= UMKREIS_KM)
    .sort((a, b) => a.km - b.km)
    .slice(0, 4);

  // Die nächsten anderen Seen mit Steckbrief (Abstand zwischen den nächstgelegenen Mess- bzw. Badestellen).
  const nachbarn = STECKBRIEF_SEEN.filter((o) => o.slug !== s.slug)
    .map((o) => ({ see: o, km: Math.min(...o.punkte.flatMap((a) => s.punkte.map((b) => distKm(a, b)))) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 6);
  const nachbarnMitProben = nachbarn.some((n) => n.see.stationen.length === 0);

  const url = `${BASE}/wassertemperatur/${s.slug}`;
  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Wassertemperatur live', url: `${BASE}/wassertemperatur` },
      { name: s.see, url },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': s.schemaTyp,
      name: s.see,
      url,
      geo: { '@type': 'GeoCoordinates', latitude: s.punkte[0][0], longitude: s.punkte[0][1] },
      containedInPlace: s.regionen.map((r) => ({ '@type': 'AdministrativeArea', name: regionName(r) })),
    },
    ...(artikel.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `Artikel ${f.zum}`,
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

  const anStellen = stellen.length > 1 ? `an ${stellen.length} offiziellen EU-Badestellen` : 'an der offiziellen EU-Badestelle';

  return (
    <div className="max-w-4xl mx-auto px-6 py-14 md:py-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="flex flex-wrap items-center gap-2 text-fine text-ink-soft mb-5">
        <Link href="/" className="hover:text-signal-dark">Startseite</Link>
        <span>/</span>
        <Link href="/wassertemperatur" className="hover:text-signal-dark">Wassertemperatur</Link>
        <span>/</span>
        <span className="text-ink-muted">{s.see}</span>
      </nav>

      <p className="eyebrow mb-2">
        {live ? 'Live-Daten' : 'Offizielle Proben'} · {s.regionen.map((r) => regionName(r)).join(' / ')}
      </p>
      <h1 className="font-serif text-display font-extrabold mb-3 text-ink">Wassertemperatur {s.see}</h1>
      {live ? (
        <p className="text-ink-soft max-w-2xl mb-8 leading-relaxed">
          Wie warm ist {f.der} gerade?{' '}
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
      ) : (
        <p className="text-ink-soft max-w-2xl mb-8 leading-relaxed">
          Wie warm wird {f.der} – und wie warm war das Wasser bei der letzten Probe? Eine offene Live-Messstelle gibt es{' '}
          {f.am} nicht.
          {stellen.length > 0 && (
            <>
              {' '}Während der Badesaison werden aber {anStellen} regelmäßig Wasserproben genommen – vor allem zur
              Hygiene-Kontrolle, dabei wird auch die Temperatur gemessen. Hier stehen die jüngste und die wärmste Probe,
              der Höchstwert je Monat und die Badewasser-Qualität.
            </>
          )}
        </p>
      )}

      {live ? (
        <SeeSteckbriefLive stationen={s.stationen.map((m) => ({ id: m.id, ort: m.ort, quelle: QUELLEN_LABEL[m.quelle] }))} />
      ) : (
        /* Jüngste offizielle Probe statt Live-Wert */
        <section className="mb-12">
          {juengste ? (
            <div className="border border-sky-200 bg-sky-50 p-5 rounded-lg max-w-md">
              <p className="eyebrow mb-1">Letzte offizielle Probe</p>
              <p className="font-serif text-display font-extrabold text-ink tabular-nums">{formatGrad(juengste.wasser)}</p>
              <p className="text-fine text-ink-soft mt-1">
                am {juengste.datum} · Badestelle {juengste.stelle}
              </p>
              <p className="text-[11px] text-ink-soft mt-3">Offizielle Wasserprobe nach EU-Badegewässerrichtlinie · Quelle: AGES (CC BY 3.0 AT)</p>
            </div>
          ) : (
            <p className="text-caption text-ink-soft border border-hairline rounded-lg p-5 max-w-2xl">
              {stellen.length > 0
                ? `Aus der Badesaison ${saison} liegt für ${f.den} noch keine Probe mit Temperaturwert vor.`
                : 'Die offiziellen Proben sind gerade nicht abrufbar. Die Seite wird täglich neu erzeugt – schau später noch einmal vorbei.'}
            </p>
          )}
          <p className="text-caption text-ink-soft mt-3 max-w-2xl">
            Das ist kein Live-Wert: Zwischen zwei Proben liegen oft Wochen, außerhalb der Badesaison kommen keine neuen
            dazu. Achte deshalb immer auf das Datum.
          </p>
        </section>
      )}

      {/* Wärmste Probe der Saison (AGES) */}
      {waermste && (
        <section className="mb-12">
          <h2 className="font-serif text-lead font-bold mb-2 text-ink">Die wärmste Probe {saison}</h2>
          <p className="text-ink-soft max-w-2xl leading-relaxed">
            Von {proben === 1 ? 'der offiziellen Wasserprobe' : `den ${proben} offiziellen Wasserproben`} der Badesaison {saison}{' '}
            {f.am} zeigte die wärmste{' '}
            <strong className="font-semibold text-ink tabular-nums">{formatGrad(waermste.wasser)}</strong> – gemessen am{' '}
            {waermste.datum} an der Badestelle {waermste.stelle}. Die Proben werden während der Badesaison mehrmals am Ufer
            genommen: Sie zeigen, wie warm der See im Sommer wird, sind aber keine Tageswerte.
          </p>
        </section>
      )}

      {/* Höchstwert je Monat (AGES) – zeigt, wann das Wasser am wärmsten ist */}
      {monate.length >= 2 && (
        <section className="mb-12">
          <h2 className="font-serif text-lead font-bold mb-1 text-ink">
            So warm wurde {f.der} {saison}
          </h2>
          <p className="text-caption text-ink-soft mb-4 max-w-2xl">
            Wärmste offizielle Probe je Monat {stellen.length > 1 ? 'über alle Badestellen am See' : 'an der Badestelle'} – daran
            sieht man, wann das Wasser am wärmsten ist.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl">
            {monate.map((m) => (
              <div key={m.monat} className="border border-hairline rounded-lg p-4">
                <p className="eyebrow">{MONATSNAMEN[m.monat - 1]}</p>
                <p className="mt-1 font-serif text-tagline font-bold text-ink tabular-nums">{formatGrad(m.wasser)}</p>
                <p className="text-fine text-ink-soft">{m.proben === 1 ? '1 Probe' : `${m.proben} Proben`}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Offizielle Badestellen (AGES) – serverseitig, also auch für Suchmaschinen lesbar */}
      {stellen.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-lead font-bold mb-1 text-ink">Offizielle Badestellen {f.am}</h2>
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
          <h2 className="font-serif text-tagline font-bold mb-2 text-ink">{gross(f.der)} in Kürze</h2>
          <p className="text-caption text-ink-muted">
            {lake.charakter} · {lake.groesse} · ideal für {lake.idealFuer}
          </p>
          <p className="text-caption text-ink-soft mt-2">
            <strong className="font-semibold text-ink">Tipp:</strong> {lake.tipp}
          </p>
          <Link href="/seen-vergleich" className="inline-block mt-3 text-caption font-medium text-ink underline decoration-signal underline-offset-[3px] hover:text-signal-dark">
            Alle Seen im Vergleich →
          </Link>
        </section>
      )}

      {/* Artikel zum See */}
      {artikel.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-lead font-bold mb-4 text-ink">Artikel {f.zum}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {artikel.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block border border-hairline p-5 hover:border-ink transition rounded-lg">
                <span className={`eyebrow ${CATEGORY_STYLE[p.category].text}`}>{p.category}</span>
                <h3 className="mt-1.5 font-serif text-body font-bold text-ink group-hover:underline decoration-signal decoration-2 underline-offset-4 leading-snug">{p.title}</h3>
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
            {artikel.length > 0 ? 'Weitere Ziele im Umkreis' : `Ausflugsziele rund um ${f.den}`}
          </h2>
          <p className="text-caption text-ink-soft mb-4">
            Bis {UMKREIS_KM}&nbsp;km Luftlinie von {live ? 'der Messstelle' : 'den Badestellen am See'}, das nächste zuerst. Im
            Gebirge ist der tatsächliche Weg oft deutlich länger.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {umkreis.map((n) => (
              <Link key={n.post.slug} href={`/blog/${n.post.slug}`} className="group block border border-hairline p-4 hover:border-ink transition rounded-lg">
                <span className="flex items-baseline justify-between gap-3">
                  <span className={`eyebrow ${CATEGORY_STYLE[n.post.category].text}`}>{n.post.category}</span>
                  <span className="text-fine text-ink-soft whitespace-nowrap tabular-nums">
                    {n.km < 1 ? 'gleich am See' : `≈ ${Math.round(n.km)} km`}
                  </span>
                </span>
                <h3 className="mt-1.5 text-caption font-semibold text-ink group-hover:underline decoration-signal decoration-2 underline-offset-4 leading-snug">{n.post.title}</h3>
                {!s.regionen.includes(n.post.region) && (
                  <span className="block mt-1 text-fine text-ink-soft">{regionName(n.post.region)}</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Nächste andere Seen mit Steckbrief */}
      <section className="mb-12">
        <h2 className="font-serif text-tagline font-bold mb-1 text-ink">Wassertemperatur der Seen in der Nähe</h2>
        <p className="text-caption text-ink-soft mb-4">
          Die nächsten anderen Seen mit Steckbrief, Abstand in Luftlinie.
          {nachbarnMitProben && ' Blau: mit Live-Messstelle, grau: nur offizielle Proben.'}
        </p>
        <div className="flex flex-wrap gap-2">
          {nachbarn.map((n) => (
            <Link
              key={n.see.slug}
              href={`/wassertemperatur/${n.see.slug}`}
              className={`text-caption font-medium px-4 py-1.5 border transition-colors rounded-sm ${
                n.see.stationen.length > 0
                  ? 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
                  : 'bg-parchment text-ink-muted border-hairline hover:border-ink hover:text-signal-dark'
              }`}
            >
              {n.see.see} <span className="text-ink-soft font-normal">· ≈ {Math.max(1, Math.round(n.km))} km</span>
            </Link>
          ))}
          <Link
            href="/wassertemperatur"
            className="text-caption font-medium px-4 py-1.5 border border-hairline text-ink-muted hover:border-ink hover:text-signal-dark transition-colors rounded-sm"
          >
            Alle Seen →
          </Link>
        </div>
      </section>

      {/* Einordnung */}
      <section className="border border-hairline bg-sand-50 p-6 rounded-lg mb-10">
        <h2 className="font-serif text-tagline font-bold mb-3 text-ink">So liest du die Werte</h2>
        <ul className="space-y-2 text-ink-muted leading-relaxed">
          {live ? (
            <>
              <li>
                <strong>Gemessen wird an einem fixen Punkt.</strong> In seichten Buchten kann das Wasser an sonnigen Tagen
                wärmer sein, an tiefen Stellen und nach Gewittern kühler.
              </li>
              <li>
                <strong>Nur frische Werte.</strong> Messungen, die älter als 72 Stunden sind, blenden wir aus, statt sie als
                „aktuell“ zu verkaufen.
              </li>
            </>
          ) : (
            <>
              <li>
                <strong>Kein Live-Wert.</strong> Für {f.den} haben wir keinen offenen Live-Datensatz gefunden – daher die
                offiziellen Proben. Die Temperatur stammt vom jeweiligen Probentag am Ufer der Badestelle.
              </li>
              <li>
                <strong>Höchstwerte statt Durchschnitt.</strong> Einzelne Proben fallen je nach Wetter und Stelle deutlich
                kühler aus. Die wärmste Probe je Monat zeigt besser, wie warm der See im Sommer werden kann.
              </li>
            </>
          )}
          {stellen.length > 0 &&
            (live ? (
              <li>
                <strong>Probe ist nicht Live-Wert.</strong> Die Temperatur der Badestellen stammt vom jeweiligen Probentag –
                achte auf das Datum. Die Qualitäts-Einstufung bewertet die Hygiene (E. coli, Enterokokken), nicht die
                Temperatur.
              </li>
            ) : (
              <li>
                <strong>Qualität ist nicht Temperatur.</strong> Die Einstufung der Badestellen bewertet die Hygiene (E. coli,
                Enterokokken) über mehrere Jahre, nicht die Wassertemperatur.
              </li>
            ))}
        </ul>
      </section>

      <p className="text-fine text-ink-soft mb-8">
        {live ? (
          <>
            Quellen: {aufzaehlung([...new Set(s.stationen.map((m) => QUELLEN_LABEL[m.quelle]))])} (Open Government Data, CC
            BY 4.0)
            {stellen.length > 0 ? ' sowie die Badegewässer-Datenbank der AGES (CC BY 3.0 AT), täglich aktualisiert.' : '.'}
          </>
        ) : (
          'Quelle: Badegewässer-Datenbank der AGES (Open Government Data, CC BY 3.0 AT), täglich aktualisiert.'
        )}
      </p>

      <div className="flex flex-wrap gap-3">
        <Link href="/wassertemperatur" className="inline-block bg-ink text-white text-caption font-semibold px-5 py-2.5 hover:bg-green-700 transition-colors rounded-sm">
          Alle Seen: Wassertemperatur live
        </Link>
        <Link href="/badeplaetze" className="inline-block border border-sky-500 text-sky-700 text-caption font-semibold px-5 py-2.5 hover:bg-sky-50 transition-colors rounded-sm">
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
