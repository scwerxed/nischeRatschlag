'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { SeeMesswert } from '@/app/lib/seen-messstellen';

// Live-Tabelle aller offiziellen See-Messstellen für /wassertemperatur. Welche Stationen es gibt
// und welcher Artikel zu welchem See passt, liefert der Server (app/wassertemperatur/page.tsx);
// hier werden nur die aktuellen Werte über /api/seewetter geholt (gleiche Route wie Seewetter-Widget
// und Artikel-Sidebar, 15-Minuten-Cache). Station ohne aktuellen Wert → „keine aktuelle Messung“.

export type WtStation = { id: string; see: string; ort: string; slug?: string };
export type WtGruppe = { key: string; titel: string; hinweis?: string; region: string; quelle: string; stationen: WtStation[] };

function formatStand(iso: string): string {
  return new Date(iso).toLocaleString('de-AT', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Vienna',
  });
}

function formatGrad(v: number): string {
  return `${v.toLocaleString('de-AT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} °C`;
}

export default function WassertemperaturLive({ gruppen }: { gruppen: WtGruppe[] }) {
  const [messwerte, setMesswerte] = useState<Record<string, SeeMesswert> | null>(null);
  const [fehler, setFehler] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/seewetter')
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setMesswerte(data?.messwerte ?? {});
      })
      .catch(() => {
        if (!cancelled) {
          setMesswerte({});
          setFehler(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loading = messwerte === null;
  const alle = gruppen.flatMap((g) => g.stationen);

  // Wärmste Seen: je See nur die wärmste Messstelle, damit z. B. der Attersee nicht dreimal auftaucht.
  const top: { station: WtStation; wert: SeeMesswert }[] = [];
  if (messwerte) {
    const proSee = new Map<string, { station: WtStation; wert: SeeMesswert }>();
    for (const s of alle) {
      const w = messwerte[s.id];
      if (typeof w?.wasser !== 'number') continue;
      const prev = proSee.get(s.see);
      if (!prev || w.wasser > prev.wert.wasser) proSee.set(s.see, { station: s, wert: w });
    }
    top.push(...[...proSee.values()].sort((a, b) => b.wert.wasser - a.wert.wasser).slice(0, 3));
  }
  const anzahlLive = messwerte ? alle.filter((s) => typeof messwerte[s.id]?.wasser === 'number').length : 0;

  return (
    <div>
      {/* Wärmste Seen gerade */}
      <section className="mb-12" aria-live="polite">
        <p className="eyebrow mb-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden />
          Gerade am wärmsten
        </p>
        {loading ? (
          <div className="grid sm:grid-cols-3 gap-4 mt-3" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-28 bg-sky-50 border border-sky-100 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : top.length === 0 ? (
          <p className="text-ink-soft mt-2">
            Gerade liefern die Messdienste keine aktuellen Werte{fehler ? ' (Verbindung fehlgeschlagen)' : ''}. Bitte später noch einmal vorbeischauen.
          </p>
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4 mt-3">
              {top.map(({ station, wert }, i) => (
                <div key={station.id} className="border border-sky-200 bg-sky-50 p-5 rounded-lg">
                  <p className="text-fine font-semibold uppercase tracking-wide text-sky-700">Platz {i + 1}</p>
                  <p className="font-serif text-display font-bold text-ink tabular-nums">{formatGrad(wert.wasser)}</p>
                  <p className="font-semibold text-ink leading-snug">
                    {station.slug ? (
                      <Link href={`/blog/${station.slug}`} className="hover:text-sky-700 hover:underline">
                        {station.see}
                      </Link>
                    ) : (
                      station.see
                    )}
                  </p>
                  <p className="text-caption text-ink-muted">Messstelle {station.ort}</p>
                </div>
              ))}
            </div>
            <p className="text-fine text-ink-soft mt-3">
              {anzahlLive} von {alle.length} Messstellen liefern gerade einen aktuellen Wert (nicht älter als 72 Stunden).
            </p>
          </>
        )}
      </section>

      {/* Alle Messstellen je Messnetz */}
      {gruppen.map((g) => (
        <section key={g.key} id={g.key} className="mb-12 scroll-mt-24">
          <h2 className="font-serif text-lead font-bold mb-1 text-ink">
            {g.titel}
            <Link href={`/regionen/${g.region}`} className="ml-3 text-caption font-sans font-normal text-green-700 hover:underline">
              Region entdecken →
            </Link>
          </h2>
          <p className="text-fine text-ink-soft mb-4">
            Messnetz: {g.quelle}
            {g.hinweis && <> · {g.hinweis}</>}
          </p>
          <div className="border border-hairline rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-parchment text-fine uppercase tracking-wide text-ink-soft">
                <tr>
                  <th scope="col" className="px-4 py-2 font-semibold">See</th>
                  <th scope="col" className="px-4 py-2 font-semibold hidden sm:table-cell">Messstelle</th>
                  <th scope="col" className="px-4 py-2 font-semibold text-right">Wasser</th>
                </tr>
              </thead>
              <tbody>
                {g.stationen.map((s) => {
                  const w = messwerte?.[s.id];
                  return (
                    <tr key={s.id} className="border-t border-hairline">
                      <td className="px-4 py-3 align-top">
                        {s.slug ? (
                          <Link href={`/blog/${s.slug}`} className="font-semibold text-ink hover:text-sky-700 hover:underline">
                            {s.see}
                          </Link>
                        ) : (
                          <span className="font-semibold text-ink">{s.see}</span>
                        )}
                        <span className="block sm:hidden text-caption text-ink-muted">{s.ort}</span>
                      </td>
                      <td className="px-4 py-3 align-top text-caption text-ink-muted hidden sm:table-cell">{s.ort}</td>
                      <td className="px-4 py-3 align-top text-right">
                        {loading ? (
                          <span className="inline-block w-16 h-5 bg-sky-100 animate-pulse rounded-sm" aria-hidden />
                        ) : typeof w?.wasser === 'number' ? (
                          <>
                            <span className="font-semibold text-ink tabular-nums">{formatGrad(w.wasser)}</span>
                            <span className="block text-fine text-ink-soft">Stand {formatStand(w.stand)} Uhr</span>
                          </>
                        ) : (
                          <span className="text-caption text-ink-soft">keine aktuelle Messung</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
