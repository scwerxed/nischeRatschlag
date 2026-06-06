'use client';

import { useEffect, useRef, useState } from 'react';

type Waypoint = { lat: number; lng: number; label: string };
type SnappedPoint = { lat: number; lng: number };
type RouteInfo = {
  distance: number;
  duration: number;
  ascent: number;
  descent: number;
  elevations: number[];
  snappedWaypoints: SnappedPoint[];
};
type SavedRoute = { id: string; name: string; waypoints: Waypoint[]; date: string };

const CENTER: [number, number] = [46.83, 13.83];
const MAX_WAYPOINTS = 8;
const STORAGE_KEY = 'nische-ratschlag-routes';

function loadFromStorage(): SavedRoute[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'); }
  catch { return []; }
}
function saveToStorage(routes: SavedRoute[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
}

/**
 * Naismith's Rule (Standard des ÖAV/DAV):
 * 4 km/h auf ebenem Gelände + 1 Stunde je 300 m Aufstieg.
 * Ergibt realistische Wanderzeiten — BRouter's total-time ist unbrauchbar
 * (nutzt interne Straßen-Gehgeschwindigkeiten).
 */
function hikingDuration(distanceM: number, ascentM: number): number {
  const horizontal = (distanceM / 1000 / 4) * 3600; // Sekunden für 4 km/h
  const vertical   = (ascentM / 300) * 3600;         // 1h pro 300 m Aufstieg
  return Math.round(horizontal + vertical);
}

async function fetchRoute(waypoints: Waypoint[]): Promise<{ geojson: any; info: RouteInfo } | null> {
  const lonlats = waypoints.map((w) => `${w.lng.toFixed(6)},${w.lat.toFixed(6)}`).join('|');
  try {
    const res = await fetch(`/api/brouter?lonlats=${encodeURIComponent(lonlats)}`);
    if (!res.ok) return null;
    const data = await res.json();

    const props = data.features?.[0]?.properties ?? {};
    const coords: number[][] = data.features?.[0]?.geometry?.coordinates ?? [];

    const distance = parseInt(props['track-length'] ?? '0');
    const ascent   = parseInt(props['filtered ascend'] ?? '0');
    const descent  = parseInt(props['plain-ascend'] ?? '0');
    // BRouter total-time ignorieren — Naismith's Rule stattdessen:
    const duration = hikingDuration(distance, ascent);

    const raw = coords.map((c) => c[2] ?? 0).filter((e) => e > 0);
    const step = Math.max(1, Math.floor(raw.length / 150));
    const elevations = raw.filter((_, i) => i % step === 0);

    return {
      geojson: data,
      info: { distance, duration, ascent, descent, elevations, snappedWaypoints: data.snappedWaypoints ?? [] },
    };
  } catch {
    return null;
  }
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

function difficultyFromRoute(km: number, asc: number) {
  if (km > 15 || asc > 800) return { label: 'Schwer', color: 'text-red-700 bg-red-50 border-red-200', dot: '🔴' };
  if (km > 8  || asc > 400) return { label: 'Mittel', color: 'text-yellow-700 bg-yellow-50 border-yellow-200', dot: '🟡' };
  return { label: 'Leicht', color: 'text-green-700 bg-green-50 border-green-200', dot: '🟢' };
}

function ElevationProfile({ elevations }: { elevations: number[] }) {
  if (elevations.length < 2) return null;
  const min = Math.min(...elevations);
  const max = Math.max(...elevations);
  const range = max - min || 1;
  const W = 260, H = 84, pl = 38, pr = 6, pt = 8, pb = 4;
  const cw = W - pl - pr, ch = H - pt - pb;
  const pts = elevations.map((e, i) => {
    const x = pl + (i / (elevations.length - 1)) * cw;
    const y = pt + ch - ((e - min) / range) * ch;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = `M ${pts.join(' L ')}`;
  const fill = `${line} L ${(pl + cw).toFixed(1)},${(pt + ch).toFixed(1)} L ${pl},${(pt + ch).toFixed(1)} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 84 }}>
      <path d={fill} fill="#dcfce7" />
      <path d={line} fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1={pl} y1={pt} x2={pl} y2={pt + ch} stroke="#e5e7eb" strokeWidth="1" />
      <line x1={pl} y1={pt + ch} x2={pl + cw} y2={pt + ch} stroke="#e5e7eb" strokeWidth="1" />
      <text x={pl - 3} y={pt + 5} textAnchor="end" fontSize="8" fill="#9ca3af">{max} m</text>
      <text x={pl - 3} y={pt + ch} textAnchor="end" fontSize="8" fill="#9ca3af">{min} m</text>
    </svg>
  );
}

export default function RoutenplanerClient() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const mapRef        = useRef<any>(null);
  const markersRef    = useRef<any[]>([]);
  const routeLayerRef = useRef<any>(null);

  const [waypoints,   setWaypoints]   = useState<Waypoint[]>([]);
  const [routeInfo,   setRouteInfo]   = useState<RouteInfo | null>(null);
  const [loading,     setLoading]     = useState(false);
  const [routeError,  setRouteError]  = useState<string | null>(null);
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([]);
  const [saveName,    setSaveName]    = useState('');
  const [saveOpen,    setSaveOpen]    = useState(false);

  useEffect(() => { setSavedRoutes(loadFromStorage()); }, []);

  // ── Map init ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current) return;

      // Clear stale Leaflet state left by HMR or React Strict Mode
      const el = containerRef.current as any;
      if (el._leaflet_id) { el._leaflet_id = null; }

      const map = L.map(containerRef.current, { center: CENTER, zoom: 9 });
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors', maxZoom: 18,
      }).addTo(map);

      L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
        attribution: '© Waymarked Trails', opacity: 0.6, maxZoom: 18,
      }).addTo(map);

      map.on('click', (e: any) => {
        setWaypoints((prev) => {
          if (prev.length >= MAX_WAYPOINTS) return prev;
          return [...prev, { lat: e.latlng.lat, lng: e.latlng.lng, label: `Punkt ${prev.length + 1}` }];
        });
      });
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // ── Sync markers + fetch route on waypoint change ─────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    (async () => {
      const L = (await import('leaflet')).default;

      markersRef.current.forEach((m) => map.removeLayer(m));
      markersRef.current = [];

      waypoints.forEach((wp, i) => {
        const isStart = i === 0;
        const isEnd   = i === waypoints.length - 1 && waypoints.length > 1;
        const color   = isStart ? '#15803d' : isEnd ? '#b91c1c' : '#1d4ed8';
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)">${i + 1}</div>`,
          iconSize: [28, 28], iconAnchor: [14, 14],
        });
        markersRef.current.push(L.marker([wp.lat, wp.lng], { icon }).bindPopup(wp.label).addTo(map));
      });

      if (routeLayerRef.current) { map.removeLayer(routeLayerRef.current); routeLayerRef.current = null; }

      if (waypoints.length < 2) { setRouteInfo(null); setRouteError(null); return; }

      setLoading(true);
      setRouteError(null);
      try {
        const result = await fetchRoute(waypoints);
        if (result) {
          routeLayerRef.current = L.geoJSON(result.geojson, {
            style: { color: '#16a34a', weight: 4, opacity: 0.85 },
          }).addTo(map);
          map.fitBounds(routeLayerRef.current.getBounds(), { padding: [40, 40] });
          setRouteInfo(result.info);

          // Move markers to snapped trail positions
          result.info.snappedWaypoints.forEach((snapped, i) => {
            markersRef.current[i]?.setLatLng([snapped.lat, snapped.lng]);
          });
        } else {
          setRouteError('Route konnte nicht berechnet werden.');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [waypoints]);

  function clearAll() { setWaypoints([]); setRouteInfo(null); setRouteError(null); }
  function removeWaypoint(idx: number) { setWaypoints((prev) => prev.filter((_, i) => i !== idx)); }
  function handleSave() {
    const name = saveName.trim() || `Route ${savedRoutes.length + 1}`;
    const updated = [{ id: Date.now().toString(), name, waypoints, date: new Date().toLocaleDateString('de-AT') }, ...savedRoutes];
    saveToStorage(updated);
    setSavedRoutes(updated);
    setSaveName(''); setSaveOpen(false);
  }
  function handleDelete(id: string) {
    const updated = savedRoutes.filter((r) => r.id !== id);
    saveToStorage(updated); setSavedRoutes(updated);
  }

  return (
    <div className="flex flex-col xl:flex-row gap-4">

      {/* ── Left sidebar ─────────────────────────────────────────────────── */}
      <div className="xl:w-64 shrink-0 space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h2 className="font-semibold text-gray-800 mb-1">Wegpunkte</h2>
          <p className="text-xs text-gray-400 mb-3">
            Auf die Karte klicken um Punkte zu setzen (max. {MAX_WAYPOINTS})
          </p>

          {waypoints.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 p-3" style={{ borderRadius: 4 }}>
              <p className="text-xs text-gray-600 leading-relaxed">
                Klicke auf die Karte um den ersten Wegpunkt zu setzen.
              </p>
            </div>
          ) : (
            <ul className="space-y-1.5">
              {waypoints.map((wp, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                    i === 0 ? 'bg-green-700' : i === waypoints.length - 1 ? 'bg-red-700' : 'bg-blue-700'
                  }`}>{i + 1}</span>
                  <span className="text-gray-600 truncate flex-1">{wp.label}</span>
                  <button onClick={() => removeWaypoint(i)} className="text-gray-300 hover:text-red-500 text-lg leading-none" aria-label="Entfernen">×</button>
                </li>
              ))}
            </ul>
          )}

          {waypoints.length === 1 && (
            <p className="mt-3 text-xs text-gray-400">
              Noch einen Punkt auf der Karte setzen um die Route zu berechnen.
            </p>
          )}

          {waypoints.length >= 2 && (
            <div className="mt-3 space-y-2">
              {!saveOpen ? (
                <button onClick={() => setSaveOpen(true)} className="w-full text-sm bg-green-700 text-white rounded-lg py-1.5 hover:bg-green-800 transition-colors">
                  Route speichern
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text" placeholder="Routenname…" value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    className="flex-1 text-sm border border-gray-300 rounded-lg px-2 py-1.5 outline-none focus:border-green-500"
                    autoFocus
                  />
                  <button onClick={handleSave} className="text-sm bg-green-700 text-white px-3 rounded-lg hover:bg-green-800">OK</button>
                </div>
              )}
              <button onClick={clearAll} className="w-full text-sm text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 rounded-lg py-1.5 transition-colors">
                Alle löschen
              </button>
            </div>
          )}

          {waypoints.length === 1 && (
            <button onClick={clearAll} className="mt-2 w-full text-sm text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 rounded-lg py-1.5 transition-colors">
              Alle löschen
            </button>
          )}
        </div>

        {savedRoutes.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h2 className="font-semibold text-gray-800 mb-3">Gespeicherte Routen</h2>
            <ul className="space-y-2">
              {savedRoutes.map((route) => (
                <li key={route.id} className="border border-gray-100 rounded-lg p-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{route.name}</p>
                      <p className="text-xs text-gray-400">{route.date} · {route.waypoints.length} Punkte</p>
                    </div>
                    <button onClick={() => handleDelete(route.id)} className="text-gray-300 hover:text-red-500 text-lg leading-none shrink-0">×</button>
                  </div>
                  <button onClick={() => setWaypoints(route.waypoints)} className="mt-2 w-full text-xs text-green-700 border border-green-200 hover:bg-green-50 rounded py-1 transition-colors">
                    Laden →
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── Map ──────────────────────────────────────────────────────────── */}
      <div className="relative flex-1 rounded-xl overflow-hidden border border-gray-200 shadow-sm min-h-[520px]">
        <div
          ref={containerRef}
          style={{ height: 520, cursor: waypoints.length < MAX_WAYPOINTS ? 'crosshair' : 'default' }}
        />
        {/* Floating hint – only before first waypoint */}
        {waypoints.length === 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-[1000]">
            <div className="bg-white/90 backdrop-blur border border-gray-300 px-5 py-2.5 text-sm text-gray-600 tracking-wide" style={{ borderRadius: 3 }}>
              Auf die Karte klicken — Wegpunkte setzen
            </div>
          </div>
        )}
      </div>

      {/* ── Right panel ──────────────────────────────────────────────────── */}
      <div className="xl:w-72 shrink-0 space-y-4">

        {loading && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-3 text-sm text-gray-500">
            <svg className="animate-spin h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Wanderweg suchen &amp; Route berechnen…
          </div>
        )}

        {routeError && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            {routeError}
          </div>
        )}

        {routeInfo && !loading && (
          <>
            <div className="bg-white border border-gray-200 p-5" style={{ borderRadius: 4 }}>
              <p className="eyebrow mb-4">Routendetails</p>
              <div className="grid grid-cols-2 gap-px bg-gray-200">
                {[
                  { v: `${(routeInfo.distance / 1000).toFixed(1)} km`, l: 'Distanz' },
                  { v: formatDuration(routeInfo.duration),              l: 'Gehzeit' },
                  { v: `↑ ${routeInfo.ascent} m`,                      l: 'Aufstieg' },
                  { v: `↓ ${routeInfo.descent} m`,                     l: 'Abstieg' },
                ].map((s) => (
                  <div key={s.l} className="bg-white px-3 py-3 text-center">
                    <p className="font-serif text-lg font-bold text-gray-900 leading-none">{s.v}</p>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {routeInfo.elevations.length > 2 && (
              <div className="bg-white border border-gray-200 p-5" style={{ borderRadius: 4 }}>
                <p className="eyebrow mb-3">Höhenprofil</p>
                <ElevationProfile elevations={routeInfo.elevations} />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">Start</span>
                  <span className="text-xs text-gray-400">Ziel</span>
                </div>
              </div>
            )}

            {(() => {
              const diff = difficultyFromRoute(routeInfo.distance / 1000, routeInfo.ascent);
              return (
                <div className="bg-white border border-gray-200 p-5" style={{ borderRadius: 4 }}>
                  <p className="eyebrow mb-3">Einschätzung</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 border text-xs font-semibold ${diff.color}`} style={{ borderRadius: 3 }}>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      diff.label === 'Leicht' ? 'bg-green-500' : diff.label === 'Mittel' ? 'bg-yellow-400' : 'bg-red-500'
                    }`} />
                    {diff.label}
                  </span>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {(routeInfo.distance / 1000).toFixed(1)} km &middot; {routeInfo.ascent} m Aufstieg
                  </p>
                </div>
              );
            })()}

            <p className="text-xs text-gray-400 text-center">
              Routing: <a href="https://brouter.de" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">BRouter</a> &middot; Wanderprofil
            </p>
          </>
        )}

        {!routeInfo && !loading && !routeError && (
          <div className="border border-gray-200 p-6 text-center" style={{ borderRadius: 4 }}>
            <p className="text-sm font-semibold text-gray-700 mb-1">Noch keine Route</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Mindestens 2 Punkte auf der Karte setzen — Distanz, Gehzeit und Höhenprofil erscheinen hier.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
