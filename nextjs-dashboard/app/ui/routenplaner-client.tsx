'use client';

import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

type Waypoint = { lat: number; lng: number; label: string };
type RouteInfo = { distance: number; duration: number };

const CENTER: [number, number] = [46.83, 13.83];
const MAX_WAYPOINTS = 8;

async function fetchRoute(waypoints: Waypoint[]): Promise<{ geojson: any; info: RouteInfo } | null> {
  const apiKey = process.env.NEXT_PUBLIC_ORS_API_KEY;
  if (!apiKey) return null;

  const coordinates = waypoints.map((w) => [w.lng, w.lat]);

  const res = await fetch(
    'https://api.openrouteservice.org/v2/directions/foot-hiking/geojson',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
      body: JSON.stringify({ coordinates }),
    }
  );

  if (!res.ok) return null;
  const data = await res.json();

  const summary = data.features?.[0]?.properties?.summary;
  return {
    geojson: data,
    info: {
      distance: summary?.distance ?? 0,
      duration: summary?.duration ?? 0,
    },
  };
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

export default function RoutenplanerClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const routeLayerRef = useRef<any>(null);

  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [noApiKey, setNoApiKey] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_ORS_API_KEY) setNoApiKey(true);
  }, []);

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current, { center: CENTER, zoom: 9 });
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
        attribution: '© Waymarked Trails',
        opacity: 0.6,
        maxZoom: 18,
      }).addTo(map);

      map.on('click', (e: any) => {
        setWaypoints((prev) => {
          if (prev.length >= MAX_WAYPOINTS) return prev;
          const idx = prev.length + 1;
          return [...prev, { lat: e.latlng.lat, lng: e.latlng.lng, label: `Punkt ${idx}` }];
        });
      });
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Sync markers when waypoints change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    (async () => {
      const L = (await import('leaflet')).default;

      // Remove old markers
      markersRef.current.forEach((m) => map.removeLayer(m));
      markersRef.current = [];

      // Add new markers
      waypoints.forEach((wp, i) => {
        const isStart = i === 0;
        const isEnd = i === waypoints.length - 1 && waypoints.length > 1;
        const color = isStart ? '#15803d' : isEnd ? '#b91c1c' : '#1d4ed8';

        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width:28px;height:28px;border-radius:50%;
            background:${color};color:white;
            display:flex;align-items:center;justify-content:center;
            font-size:12px;font-weight:bold;
            border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);
          ">${i + 1}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([wp.lat, wp.lng], { icon })
          .bindPopup(wp.label)
          .addTo(map);
        markersRef.current.push(marker);
      });

      // Remove old route
      if (routeLayerRef.current) {
        map.removeLayer(routeLayerRef.current);
        routeLayerRef.current = null;
      }

      if (waypoints.length < 2) {
        setRouteInfo(null);
        return;
      }

      // Fetch route
      setLoading(true);
      try {
        const result = await fetchRoute(waypoints);
        if (result) {
          routeLayerRef.current = L.geoJSON(result.geojson, {
            style: { color: '#16a34a', weight: 4, opacity: 0.85 },
          }).addTo(map);
          map.fitBounds(routeLayerRef.current.getBounds(), { padding: [40, 40] });
          setRouteInfo(result.info);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [waypoints]);

  function clearAll() {
    setWaypoints([]);
    setRouteInfo(null);
  }

  function removeWaypoint(idx: number) {
    setWaypoints((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Sidebar */}
      <div className="lg:w-72 shrink-0 space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h2 className="font-semibold text-gray-800 mb-1">Wegpunkte</h2>
          <p className="text-xs text-gray-400 mb-3">Klick auf die Karte um Punkte zu setzen (max. {MAX_WAYPOINTS})</p>

          {waypoints.length === 0 && (
            <p className="text-sm text-gray-400 italic">Noch keine Punkte gesetzt.</p>
          )}

          <ul className="space-y-1.5">
            {waypoints.map((wp, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                  i === 0 ? 'bg-green-700' : i === waypoints.length - 1 ? 'bg-red-700' : 'bg-blue-700'
                }`}>
                  {i + 1}
                </span>
                <span className="text-gray-600 truncate flex-1">{wp.label}</span>
                <button
                  onClick={() => removeWaypoint(i)}
                  className="text-gray-300 hover:text-red-500 text-lg leading-none"
                  aria-label="Entfernen"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          {waypoints.length > 0 && (
            <button
              onClick={clearAll}
              className="mt-3 w-full text-sm text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 rounded-lg py-1.5 transition-colors"
            >
              Alle löschen
            </button>
          )}
        </div>

        {/* Route Info */}
        {loading && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-400">
            Route wird berechnet…
          </div>
        )}

        {routeInfo && !loading && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Route</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Distanz</span>
                <span className="font-medium">{(routeInfo.distance / 1000).toFixed(1)} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Dauer (zu Fuß)</span>
                <span className="font-medium">{formatDuration(routeInfo.duration)}</span>
              </div>
            </div>
          </div>
        )}

        {/* API Key Hinweis */}
        {noApiKey && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800">
            <strong>Kein API-Key.</strong> Wegpunkte setzen funktioniert, aber Routen werden erst berechnet wenn{' '}
            <code>NEXT_PUBLIC_ORS_API_KEY</code> in <code>.env.local</code> gesetzt ist.{' '}
            <a href="https://openrouteservice.org/dev/#/signup" target="_blank" rel="noopener noreferrer" className="underline">
              Kostenlos registrieren →
            </a>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="flex-1 rounded-xl overflow-hidden border border-gray-200 shadow-sm" style={{ minHeight: 560 }}>
        <div ref={containerRef} style={{ height: 560 }} />
      </div>
    </div>
  );
}
