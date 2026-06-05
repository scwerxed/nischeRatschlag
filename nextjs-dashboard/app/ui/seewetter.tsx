'use client';

import { useEffect, useState } from 'react';

// Live-Lufttemperatur via Open-Meteo (kostenlos, ohne API-Key).
// Wassertemperatur = saisonale Richtwerte aus unseren Recherchen.

const LAKES = [
  { name: 'Wörthersee',     lat: 46.62, lng: 14.14, water: 26 },
  { name: 'Klopeiner See',  lat: 46.62, lng: 14.57, water: 28 },
  { name: 'Millstätter See',lat: 46.80, lng: 13.58, water: 24 },
  { name: 'Faaker See',     lat: 46.57, lng: 13.92, water: 25 },
  { name: 'Ossiacher See',  lat: 46.67, lng: 13.98, water: 25 },
  { name: 'Weissensee',     lat: 46.71, lng: 13.30, water: 23 },
];

function weatherEmoji(code: number): string {
  if (code === 0) return '☀️';
  if (code <= 2) return '🌤️';
  if (code === 3) return '☁️';
  if (code <= 48) return '🌫️';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '🌨️';
  if (code <= 82) return '🌦️';
  if (code <= 99) return '⛈️';
  return '🌡️';
}

// Wassertemperatur nur in der Badesaison anzeigen
function isSwimSeason() {
  const m = new Date().getMonth() + 1;
  return m >= 5 && m <= 9;
}

type Row = { name: string; water: number; air: number | null; code: number | null };

export default function Seewetter() {
  const [rows, setRows] = useState<Row[]>(LAKES.map((l) => ({ name: l.name, water: l.water, air: null, code: null })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lat = LAKES.map((l) => l.lat).join(',');
    const lng = LAKES.map((l) => l.lng).join(',');
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code&timezone=auto`)
      .then((r) => r.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [data];
        setRows(LAKES.map((l, i) => ({
          name: l.name,
          water: l.water,
          air: Math.round(arr[i]?.current?.temperature_2m ?? NaN) || null,
          code: arr[i]?.current?.weather_code ?? null,
        })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const swim = isSwimSeason();

  return (
    <div className="border border-gray-200 overflow-hidden" style={{ borderRadius: 8 }}>
      <div className="bg-green-800 text-white px-5 py-4 flex items-baseline justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold">Seewetter</h3>
          <p className="text-green-200 text-xs mt-0.5">
            Aktuelle Lufttemperatur{swim ? ' & Wassertemperatur' : ''} an Kärntens Seen
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" /> Live
        </span>
      </div>
      <div className="divide-y divide-gray-100">
        {rows.map((row) => (
          <div key={row.name} className="flex items-center justify-between px-5 py-3">
            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
              {row.code !== null && <span>{weatherEmoji(row.code)}</span>}
              {row.name}
            </span>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">
                {loading ? '…' : row.air !== null ? `${row.air}°C Luft` : '–'}
              </span>
              {swim && (
                <span className="font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5" style={{ borderRadius: 4 }}>
                  {row.water}°C 💧
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-gray-400 px-5 py-2 bg-gray-50">
        Luft: live von Open-Meteo · Wasser: saisonale Richtwerte
      </p>
    </div>
  );
}
