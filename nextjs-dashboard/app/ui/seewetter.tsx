'use client';

import { useEffect, useState } from 'react';

const LAKES = [
  { name: 'Wörthersee (K)',    lat: 46.62, lng: 14.14, water: 26 },
  { name: 'Klopeiner See (K)', lat: 46.62, lng: 14.57, water: 28 },
  { name: 'Neusiedler See (B)',lat: 47.84, lng: 16.75, water: 25 },
  { name: 'Zeller See (S)',    lat: 47.32, lng: 12.80, water: 22 },
  { name: 'Achensee (T)',      lat: 47.45, lng: 11.71, water: 20 },
  { name: 'Wolfgangsee (S)',   lat: 47.74, lng: 13.42, water: 24 },
];

function isSwimSeason() {
  const m = new Date().getMonth() + 1;
  return m >= 5 && m <= 9;
}

type Row = { name: string; water: number; air: number | null };

export default function Seewetter() {
  const [rows, setRows]   = useState<Row[]>(LAKES.map((l) => ({ name: l.name, water: l.water, air: null })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lat = LAKES.map((l) => l.lat).join(',');
    const lng = LAKES.map((l) => l.lng).join(',');
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m&timezone=auto`)
      .then((r) => r.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [data];
        setRows(LAKES.map((l, i) => ({
          name:  l.name,
          water: l.water,
          air:   Math.round(arr[i]?.current?.temperature_2m ?? NaN) || null,
        })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const swim = isSwimSeason();

  return (
    <div className="border border-gray-200 overflow-hidden h-full flex flex-col" style={{ borderRadius: 10 }}>
      <div className="bg-green-800 text-white px-5 py-4 flex items-baseline justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-300">
              <circle cx="8" cy="5" r="3" />
              <path d="M1 14c1-2 3-3 4-3s2 2 3 2 2-2 3-2 3 1 4 3" />
            </svg>
            Seewetter
          </h3>
          <p className="text-green-200 text-xs mt-0.5">
            Aktuelle Lufttemperatur{swim ? ' & Wassertemperatur' : ''} an Österreichs beliebtesten Seen
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
          Live
        </span>
      </div>
      <div className="divide-y divide-gray-100 flex-1">
        {rows.map((row, i) => (
          <div
            key={row.name}
            className="flex items-center justify-between px-5 py-3 hover:bg-green-50/50 transition-colors"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="text-sm font-medium text-gray-700">{row.name}</span>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500 tabular-nums">
                {loading ? (
                  <span className="inline-block w-12 h-4 bg-gray-100 animate-pulse" style={{ borderRadius: 3 }} />
                ) : row.air !== null ? `${row.air} °C Luft` : '—'}
              </span>
              {swim && (
                <span className="font-semibold text-green-800 bg-green-50 border border-green-200 px-2 py-0.5 text-xs tabular-nums" style={{ borderRadius: 3 }}>
                  {row.water} °C Wasser
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-gray-400 px-5 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center gap-1.5">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
          <circle cx="8" cy="8" r="6" />
          <path d="M8 5v4" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.5" fill="currentColor" />
        </svg>
        Luft: live via Open-Meteo · Wasser: saisonale Richtwerte
      </p>
    </div>
  );
}
