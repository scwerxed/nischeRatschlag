'use client';

import { useEffect, useState } from 'react';
import type { SeeMesswert } from '@/app/lib/seen-messstellen';

// `stations` = IDs aus app/lib/seen-messstellen.ts (offizielle Live-Messstellen der Länder,
// erste mit aktuellem Wert gewinnt). `water` = saisonaler Richtwert nur für Seen ohne
// Live-Quelle (Neusiedler See, Achensee) – bei allen anderen lieber „—“ als eine Schätzung.
const LAKES: { name: string; lat: number; lng: number; water?: number; stations?: string[] }[] = [
  { name: 'Wörthersee (K)',    lat: 46.62, lng: 14.14, stations: ['ktn-2001056'] },
  { name: 'Klopeiner See (K)', lat: 46.62, lng: 14.57, stations: ['ktn-2001088'] },
  { name: 'Wolfgangsee (S)',   lat: 47.74, lng: 13.42, stations: ['sbg-203646', 'ooe-4310'] },
  { name: 'Zeller See (S)',    lat: 47.32, lng: 12.80, stations: ['sbg-203117'] },
  { name: 'Attersee (OÖ)',     lat: 47.87, lng: 13.54, stations: ['ooe-5290', 'sbg-205328', 'ooe-5250'] },
  { name: 'Traunsee (OÖ)',     lat: 47.87, lng: 13.79, stations: ['ooe-4590', 'ooe-4510'] },
  { name: 'Neusiedler See (B)',lat: 47.84, lng: 16.75, water: 25 },
  { name: 'Achensee (T)',      lat: 47.45, lng: 11.71, water: 20 },
];

function isSwimSeason() {
  const m = new Date().getMonth() + 1;
  return m >= 5 && m <= 9;
}

type Row = { name: string; water: number | null; air: number | null; liveWater: boolean };

export default function Seewetter() {
  const [rows, setRows]   = useState<Row[]>(LAKES.map((l) => ({ name: l.name, water: l.water ?? null, air: null, liveWater: false })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lat = LAKES.map((l) => l.lat).join(',');
    const lng = LAKES.map((l) => l.lng).join(',');

    Promise.all([
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m&timezone=auto`)
        .then((r) => r.json())
        .catch(() => null),
      // Eigene Route statt direktem Fetch: die Landesdienste senden keine CORS-Header.
      fetch('/api/seewetter')
        .then((r) => r.json())
        .catch(() => null),
    ]).then(([air, water]) => {
      const airArr = Array.isArray(air) ? air : air ? [air] : [];
      const messwerte: Record<string, SeeMesswert> = water?.messwerte ?? {};

      setRows(LAKES.map((l, i) => {
        const id = l.stations?.find((s) => typeof messwerte[s]?.wasser === 'number');
        const live = id ? messwerte[id] : undefined;
        return {
          name: l.name,
          water: live ? live.wasser : l.water ?? null,
          liveWater: Boolean(live),
          air: Math.round(airArr[i]?.current?.temperature_2m ?? NaN) || null,
        };
      }));
    }).finally(() => setLoading(false));
  }, []);

  const swim = isSwimSeason();

  return (
    <div className="border border-hairline overflow-hidden h-full flex flex-col rounded-lg">
      <div className="bg-green-800 text-white px-5 py-4 flex items-baseline justify-between">
        <div>
          <h3 className="font-serif text-tagline font-bold flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-300">
              <circle cx="8" cy="5" r="3" />
              <path d="M1 14c1-2 3-3 4-3s2 2 3 2 2-2 3-2 3 1 4 3" />
            </svg>
            Seewetter
          </h3>
          <p className="text-green-200 text-fine mt-0.5">
            Aktuelle Luft- &amp; Wassertemperatur an Österreichs beliebtesten Seen
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
          Live
        </span>
      </div>
      <div className="divide-y divide-divider-soft flex-1">
        {rows.map((row, i) => (
          <div
            key={row.name}
            className="flex items-center justify-between px-5 py-3 hover:bg-green-50/50 transition-colors"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="text-caption font-medium text-ink-muted">{row.name}</span>
            <div className="flex items-center gap-4 text-caption">
              <span className="text-ink-soft tabular-nums">
                {loading ? (
                  <span className="inline-block w-12 h-4 bg-parchment animate-pulse rounded-sm" />
                ) : row.air !== null ? `${row.air} °C Luft` : '—'}
              </span>
              {(swim || row.liveWater) && (
                <span
                  className="font-semibold text-green-800 bg-green-50 border border-green-200 px-2 py-0.5 text-fine tabular-nums inline-flex items-center gap-1 rounded-sm"
                  title={row.liveWater ? 'Offizieller Live-Messwert des Hydrographischen Diensts' : row.water !== null ? 'Saisonaler Richtwert' : 'Derzeit kein Messwert'}
                >
                  {row.water !== null ? `${row.water.toLocaleString('de-AT')} °C Wasser` : '— Wasser'}
                  {row.liveWater && <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden />}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-ink-soft px-5 py-2.5 bg-parchment border-t border-divider-soft flex items-center gap-1.5">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-soft/50 shrink-0">
          <circle cx="8" cy="8" r="6" />
          <path d="M8 5v4" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.5" fill="currentColor" />
        </svg>
        Luft: live via Open-Meteo · Wasser: live (●) von den Hydrographischen Diensten Kärnten, Salzburg &amp; Oberösterreich (CC BY 4.0) · Neusiedler See &amp; Achensee: saisonale Richtwerte
      </p>
    </div>
  );
}
