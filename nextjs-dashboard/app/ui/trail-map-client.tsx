'use client';

import { useEffect, useRef, useState } from 'react';
import type { Trail } from '@/app/lib/posts';

const DIFF: Record<Trail['difficulty'], { label: string; cls: string; color: string }> = {
  leicht: { label: 'Leicht', cls: 'bg-green-100 text-green-700',  color: '#16a34a' },
  mittel: { label: 'Mittel', cls: 'bg-yellow-100 text-yellow-700', color: '#ca8a04' },
  schwer: { label: 'Schwer', cls: 'bg-red-100 text-red-700',     color: '#dc2626' },
};

export default function TrailMapClient({ trails }: { trails: Trail[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<any>(null);
  const lineRef      = useRef<any>(null);
  const markersRef   = useRef<any[]>([]);
  const reqIdRef     = useRef(0);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading]   = useState(false);

  // init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current) return;

      const el = containerRef.current as any;
      if (el._leaflet_id) el._leaflet_id = null;

      const map = L.map(containerRef.current, { scrollWheelZoom: false });
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenTopoMap, © OpenStreetMap', maxZoom: 17,
      }).addTo(map);

      drawTrail(L, map, trails[0]);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // redraw on selection change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    (async () => {
      const L = (await import('leaflet')).default;
      drawTrail(L, map, trails[selected]);
    })();
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Zeichnet eine Route. Holt die echte Wegführung von BRouter (folgt Wanderwegen).
   * Fällt auf die direkte Verbindung der Wegpunkte zurück, falls das Routing scheitert.
   */
  async function drawTrail(L: any, map: any, trail: Trail) {
    const myReq = ++reqIdRef.current;

    if (lineRef.current) { map.removeLayer(lineRef.current); lineRef.current = null; }
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    const color = DIFF[trail.difficulty].color;

    // Sofort die Luftlinie zeichnen (damit nie eine leere Karte zu sehen ist)
    let latlngs: [number, number][] = trail.coords;
    lineRef.current = L.polyline(latlngs, { color, weight: 4, opacity: 0.45, dashArray: '6 6' }).addTo(map);
    map.fitBounds(lineRef.current.getBounds(), { padding: [30, 30] });

    // Echte Wegführung von BRouter nachladen
    setLoading(true);
    try {
      const lonlats = trail.coords.map(([lat, lng]) => `${lng.toFixed(6)},${lat.toFixed(6)}`).join('|');
      const res = await fetch(`/api/brouter?lonlats=${encodeURIComponent(lonlats)}`);
      if (res.ok) {
        const data = await res.json();
        const coords: number[][] = data?.features?.[0]?.geometry?.coordinates ?? [];
        if (coords.length > 1) latlngs = coords.map((c) => [c[1], c[0]]);
      }
    } catch {
      // Fallback bleibt die Luftlinie
    }

    if (myReq !== reqIdRef.current) return; // veraltete Anfrage – Nutzer hat umgeschaltet
    setLoading(false);

    // Luftlinie durch die echte (oder Fallback-)Route ersetzen
    if (lineRef.current) { map.removeLayer(lineRef.current); }
    lineRef.current = L.polyline(latlngs, { color, weight: 5, opacity: 0.9 }).addTo(map);

    const start = latlngs[0];
    const end = latlngs[latlngs.length - 1];
    const oStart = trail.coords[0];
    const oEnd = trail.coords[trail.coords.length - 1];
    const isLoop = oStart[0] === oEnd[0] && oStart[1] === oEnd[1];

    const dot = (c: string, label: string) =>
      L.divIcon({
        className: '',
        html: `<div style="width:22px;height:22px;border-radius:50%;background:${c};color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4)">${label}</div>`,
        iconSize: [22, 22], iconAnchor: [11, 11],
      });

    markersRef.current.push(L.marker(start, { icon: dot('#15803d', 'S') }).addTo(map));
    if (!isLoop) markersRef.current.push(L.marker(end, { icon: dot('#b91c1c', 'Z') }).addTo(map));

    map.fitBounds(lineRef.current.getBounds(), { padding: [30, 30] });
  }

  const t = trails[selected];

  return (
    <div className="border border-gray-200 overflow-hidden" style={{ borderRadius: 4 }}>
      {/* Trail-Auswahl */}
      {trails.length > 1 && (
        <div className="flex gap-1.5 p-2 bg-gray-50 border-b border-gray-200 overflow-x-auto">
          {trails.map((tr, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`shrink-0 text-xs font-medium px-3 py-1.5 transition-colors ${
                i === selected
                  ? 'bg-green-700 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400'
              }`}
              style={{ borderRadius: 3 }}
            >
              {tr.name}
            </button>
          ))}
        </div>
      )}

      {/* Map */}
      <div className="relative">
        <div ref={containerRef} style={{ height: 380 }} />
        {loading && (
          <div className="absolute top-2 left-2 z-[1000] bg-white/90 border border-gray-200 px-2.5 py-1 text-xs text-gray-600 flex items-center gap-1.5" style={{ borderRadius: 3 }}>
            <span className="w-2.5 h-2.5 border border-gray-300 border-t-green-600 rounded-full animate-spin" />
            Wegverlauf wird geladen…
          </div>
        )}
      </div>

      {/* Stats-Leiste */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 px-4 py-3 bg-white border-t border-gray-200">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${DIFF[t.difficulty].cls}`}>
          {DIFF[t.difficulty].label}
        </span>
        <span className="text-sm text-gray-700 font-medium">{t.name}</span>
        <span className="flex items-center gap-1 text-sm text-gray-500">
          <span className="text-gray-400">↔</span> {t.length}
        </span>
        <span className="flex items-center gap-1 text-sm text-gray-500">
          <span className="text-gray-400">⏱</span> {t.duration}
        </span>
        {t.ascent && (
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <span className="text-gray-400">↑</span> {t.ascent}
          </span>
        )}
      </div>
    </div>
  );
}
