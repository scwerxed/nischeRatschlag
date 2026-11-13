'use client';

import { useEffect, useState } from 'react';
import type { SeeMesswert } from '@/app/lib/seen-messstellen';

// Live-Werte aller Messstellen eines Sees für die Steckbriefe /wassertemperatur/[see]. Welche Stationen zum
// See gehören, liefert der Server; hier wird nur /api/seewetter abgefragt (gleiche Route und derselbe
// CDN-Cache wie /wassertemperatur und die Artikel-Sidebar). Station ohne frischen Wert → „keine aktuelle Messung“.

export type SteckbriefStation = { id: string; ort: string; quelle: string };

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
  return `${v.toLocaleString('de-AT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} °C`;
}

export default function SeeSteckbriefLive({ stationen }: { stationen: SteckbriefStation[] }) {
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
  const ohneWert = messwerte !== null && stationen.every((s) => typeof messwerte[s.id]?.wasser !== 'number');

  return (
    <section className="mb-12" aria-live="polite">
      <div className={`grid gap-4 ${stationen.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {stationen.map((s) => {
          const w = messwerte?.[s.id];
          const live = typeof w?.wasser === 'number';
          return (
            <div key={s.id} className="border border-sky-200 bg-sky-50 p-5 rounded-lg">
              <p className="eyebrow mb-1 flex items-center gap-1.5">
                {live && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden />}
                Messstelle {s.ort}
              </p>
              {loading ? (
                <div className="space-y-2 mt-2" aria-hidden>
                  <span className="block w-24 h-8 bg-sky-100 animate-pulse rounded-sm" />
                  <span className="block w-32 h-4 bg-sky-100 animate-pulse rounded-sm" />
                </div>
              ) : w && live ? (
                <>
                  <p className="font-serif text-display font-extrabold text-ink tabular-nums">{formatGrad(w.wasser)}</p>
                  <p className="text-fine text-ink-soft mt-1">Stand: {formatStand(w.stand)} Uhr</p>
                </>
              ) : (
                <p className="text-caption text-ink-soft mt-2">Gerade keine aktuelle Messung{fehler ? ' (Verbindung fehlgeschlagen)' : ''}.</p>
              )}
              <p className="text-[11px] text-ink-soft mt-3">Offizieller Messwert: {s.quelle} (CC BY 4.0)</p>
            </div>
          );
        })}
      </div>
      {ohneWert && (
        <p className="text-caption text-ink-soft mt-3">
          Werte, die älter als 72 Stunden sind, zeigen wir nicht an. Im Winter melden manche Stationen keine Werte – bitte
          später noch einmal vorbeischauen.
        </p>
      )}
    </section>
  );
}
