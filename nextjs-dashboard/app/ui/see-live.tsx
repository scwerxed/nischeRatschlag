'use client';

import { useEffect, useState } from 'react';
import type { SeeMesswert } from '@/app/lib/seen-messstellen';

// Live-Wassertemperatur für die Artikel-Sidebar. Welche Messstellen passen, entscheidet der Server
// (app/lib/gewaesser.ts → seeMessstellenFuer); hier wird nur der aktuelle Wert über /api/seewetter
// geholt. Erste Station mit gültigem Wert gewinnt; ohne Wert wird die Karte gar nicht angezeigt.

type Station = { id: string; see: string; ort: string; km: number; quelle: string };

function formatStand(iso: string): string {
  return new Date(iso).toLocaleString('de-AT', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Vienna',
  });
}

export default function SeeLive({ stationen }: { stationen: Station[] }) {
  const [state, setState] = useState<'loading' | 'none' | { station: Station; wert: SeeMesswert }>('loading');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/seewetter')
      .then((r) => r.json())
      .then((data) => {
        const messwerte: Record<string, SeeMesswert> = data?.messwerte ?? {};
        const station = stationen.find((s) => typeof messwerte[s.id]?.wasser === 'number');
        if (!cancelled) setState(station ? { station, wert: messwerte[station.id] } : 'none');
      })
      .catch(() => {
        if (!cancelled) setState('none');
      });
    return () => {
      cancelled = true;
    };
  }, [stationen]);

  if (state === 'none') return null;

  return (
    <div className="border border-sky-200 bg-sky-50 p-5 rounded-lg">
      <p className="eyebrow mb-1 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden />
        Wassertemperatur live
      </p>
      {state === 'loading' ? (
        <div className="space-y-2 mt-2" aria-hidden>
          <span className="block w-24 h-8 bg-sky-100 animate-pulse rounded-sm" />
          <span className="block w-40 h-4 bg-sky-100 animate-pulse rounded-sm" />
        </div>
      ) : (
        <>
          <p className="font-serif text-display font-bold text-ink tabular-nums">
            {state.wert.wasser.toLocaleString('de-AT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}&nbsp;°C
          </p>
          <p className="text-caption text-ink-muted mt-1 leading-snug">
            {state.station.see}, Messstelle {state.station.ort}
            {state.station.km >= 1 && <span className="text-ink-soft"> · ≈ {Math.round(state.station.km)} km von hier</span>}
          </p>
          <p className="text-fine text-ink-soft mt-1">Stand: {formatStand(state.wert.stand)} Uhr</p>
          <p className="text-[11px] text-ink-soft mt-3">
            Offizieller Messwert: {state.station.quelle} (CC BY 4.0). An einzelnen Badeplätzen kann die Temperatur davon abweichen.
          </p>
        </>
      )}
    </div>
  );
}
