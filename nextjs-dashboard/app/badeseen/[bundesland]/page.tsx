import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { posts } from '@/app/lib/posts';
import { AGES_EINSTUFUNG, badestellenImBundesland, steckbriefFuerBadestelle } from '@/app/lib/gewaesser';
import { BADESEEN_LAENDER, nachGewaesser, stellenName } from '@/app/lib/badeseen';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';

// Einstufung, letzte Probe und Sperren kommen aus dem AGES-Feed – täglich neu erzeugen.
export const revalidate = 86400;

type Props = { params: Promise<{ bundesland: string }> };

export function generateStaticParams() {
  return BADESEEN_LAENDER.map((l) => ({ bundesland: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bundesland } = await params;
  const land = BADESEEN_LAENDER.find((l) => l.slug === bundesland);
  if (!land) return {};
  return {
    title: `Badeseen ${land.wo}: alle offiziellen Badestellen mit Wasserqualität`,
    description: `Alle EU-Badestellen ${land.wo} auf einen Blick: Badewasser-Einstufung, Wassertemperatur der letzten offiziellen Probe und aktuelle Sperren – nach See geordnet, Daten der AGES.`,
    alternates: { canonical: `/badeseen/${land.slug}` },
  };
}

const TON_CLS = {
  gut: 'bg-green-100 text-green-800 border-green-200',
  mittel: 'bg-amber-100 text-amber-800 border-amber-200',
  schlecht: 'bg-red-100 text-red-800 border-red-200',
} as const;

function formatGrad(v: number): string {
  return `${v.toLocaleString('de-AT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} °C`;
}

export default async function BadeseenLandPage({ params }: Props) {
  const { bundesland } = await params;
  const land = BADESEEN_LAENDER.find((l) => l.slug === bundesland);
  if (!land) notFound();

  const stellen = await badestellenImBundesland(land.name);
  const gewaesser = nachGewaesser(stellen);
  const ausgezeichnet = stellen.filter((s) => s.einstufung?.code === 'A').length;
  const gesperrt = stellen.filter((s) => s.gesperrt).length;
  const jahr = stellen.reduce((max, s) => Math.max(max, s.einstufung?.jahr ?? 0), 0);

  const badeArtikel = posts.filter((p) => p.region === land.slug && p.category === 'Baden');

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Badeseen', url: `${BASE}/badeseen` },
      { name: land.name, url: `${BASE}/badeseen/${land.slug}` },
    ]),
    ...(gewaesser.length > 0
      ? [{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `Badeseen ${land.wo}`,
          numberOfItems: gewaesser.length,
          itemListElement: gewaesser.map((g, i) => {
            const steckbrief = steckbriefFuerBadestelle(g.stellen[0].name);
            return {
              '@type': 'ListItem',
              position: i + 1,
              name: g.name,
              ...(steckbrief ? { url: `${BASE}/wassertemperatur/${steckbrief}` } : {}),
            };
          }),
        }]
      : []),
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-14 md:py-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="flex flex-wrap items-center gap-2 text-fine text-ink-soft mb-5">
        <Link href="/" className="hover:text-signal-dark">Startseite</Link>
        <span>/</span>
        <Link href="/badeseen" className="hover:text-signal-dark">Badeseen</Link>
        <span>/</span>
        <span className="text-ink-muted">{land.name}</span>
      </nav>

      <p className="eyebrow mb-3">Offizielle EU-Badestellen</p>
      <h1 className="font-serif text-display-sm md:text-display font-extrabold text-ink mb-4">
        Badeseen {land.wo}
      </h1>
      <p className="text-ink-muted max-w-2xl mb-8">
        Alle Badestellen {land.wo}, die nach der EU-Badegewässerrichtlinie überwacht werden – geordnet nach
        See oder Fluss. Zu jeder Stelle stehen die amtliche Einstufung der Wasserqualität, die Wassertemperatur
        der letzten offiziellen Probe und ein Hinweis, falls sie gerade gesperrt ist.
      </p>

      {stellen.length === 0 ? (
        <p className="border-l-4 border-ink bg-sand-50 px-5 py-4 max-w-2xl text-ink-muted">
          Die Daten der AGES sind im Moment nicht abrufbar. Bitte später noch einmal vorbeischauen – die
          Seite wird täglich neu erzeugt.
        </p>
      ) : (
        <>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5 border-t-2 border-ink pt-5 mb-12">
            <div>
              <dt className="label-mono mb-1">Badestellen</dt>
              <dd className="font-serif text-display-sm font-extrabold text-ink" data-numeric>{stellen.length}</dd>
            </div>
            <div>
              <dt className="label-mono mb-1">Gewässer</dt>
              <dd className="font-serif text-display-sm font-extrabold text-ink" data-numeric>{gewaesser.length}</dd>
            </div>
            <div>
              <dt className="label-mono mb-1">Ausgezeichnet{jahr ? ` (${jahr})` : ''}</dt>
              <dd className="font-serif text-display-sm font-extrabold text-ink" data-numeric>{ausgezeichnet}</dd>
            </div>
            <div>
              <dt className="label-mono mb-1">Derzeit gesperrt</dt>
              <dd className={`font-serif text-display-sm font-extrabold ${gesperrt > 0 ? 'text-signal' : 'text-ink'}`} data-numeric>{gesperrt}</dd>
            </div>
          </dl>

          <div className="space-y-10">
            {gewaesser.map((g) => {
              const steckbrief = steckbriefFuerBadestelle(g.stellen[0].name);
              return (
                <section key={g.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t-2 border-ink pt-3 mb-1">
                    <h2 className="font-serif text-lead font-bold text-ink">{g.name}</h2>
                    {steckbrief && (
                      <Link href={`/wassertemperatur/${steckbrief}`} className="text-caption font-medium text-ink underline decoration-signal underline-offset-[3px] hover:text-signal-dark">
                        Steckbrief &amp; Wassertemperatur
                      </Link>
                    )}
                  </div>
                  <ul>
                    {g.stellen.map((s) => {
                      const e = s.einstufung ? AGES_EINSTUFUNG[s.einstufung.code] : undefined;
                      return (
                        <li key={s.id} className="grid sm:grid-cols-[1fr_auto_11rem] items-baseline gap-x-6 gap-y-1 py-3 border-b border-hairline">
                          <div className="min-w-0">
                            <p className="font-medium text-ink">{stellenName(s)}</p>
                            {s.gemeinde && <p className="text-fine text-ink-soft">{s.gemeinde}</p>}
                            {s.gesperrt && (
                              <p className="text-fine font-semibold text-signal-dark mt-0.5">
                                Derzeit gesperrt{s.sperrgrund ? `: ${s.sperrgrund}` : ''}
                              </p>
                            )}
                          </div>
                          <div>
                            {e && s.einstufung ? (
                              <span className={`inline-block text-fine font-medium px-2 py-0.5 border rounded-sm ${TON_CLS[e.tone]}`}>
                                {e.label} · {s.einstufung.jahr}
                              </span>
                            ) : (
                              <span className="text-fine text-ink-soft">noch keine Einstufung</span>
                            )}
                          </div>
                          <p className="font-mono text-fine text-ink-muted sm:text-right" data-numeric>
                            {s.letzteProbe
                              ? `${s.letzteProbe.wasser !== null ? formatGrad(s.letzteProbe.wasser) : 'Temperatur nicht gemessen'} · ${s.letzteProbe.datum}`
                              : 'keine Probe'}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>

          <p className="mt-8 text-fine text-ink-soft max-w-2xl">
            Quelle: AGES, österreichische Badegewässer (Open Government Data, CC BY 3.0 AT). Die Einstufung gilt
            jeweils für das genannte Jahr, die Temperatur ist ein Einzelwert vom Tag der Probe und kein Live-Messwert.
            Badeplätze ohne EU-Überwachung fehlen in dieser Liste.
          </p>
        </>
      )}

      {badeArtikel.length > 0 && (
        <section className="mt-14">
          <p className="eyebrow mb-3">Aus dem Magazin</p>
          <h2 className="font-serif text-lead font-bold text-ink mb-4">Bade-Artikel {land.wo}</h2>
          <ul className="grid sm:grid-cols-2 gap-x-10 border-t-2 border-ink">
            {badeArtikel.map((p) => (
              <li key={p.slug} className="border-b border-hairline">
                <Link href={`/blog/${p.slug}`} className="group block py-3">
                  <span className="font-medium text-ink group-hover:underline decoration-signal decoration-2 underline-offset-4">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-14">
        <p className="label-mono mb-3">Andere Bundesländer</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {BADESEEN_LAENDER.filter((l) => l.slug !== land.slug).map((l) => (
            <Link key={l.slug} href={`/badeseen/${l.slug}`} className="text-caption font-medium text-ink underline decoration-signal underline-offset-[3px] hover:text-signal-dark">
              {l.name}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={`/wassertemperatur#${land.slug}`} className="btn btn-primary btn-sm">
          Wassertemperatur {land.wo}
        </Link>
        <Link href="/badeplaetze" className="btn btn-secondary btn-sm">
          Badeplatz-Check
        </Link>
        <Link href={`/regionen/${land.slug}`} className="btn btn-secondary btn-sm">
          Alle Tipps für {land.name}
        </Link>
        <Link href="/unterkuenfte/am-see" className="btn btn-secondary btn-sm">
          Unterkünfte am See
        </Link>
      </div>
    </div>
  );
}
