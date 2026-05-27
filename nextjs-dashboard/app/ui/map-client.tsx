'use client';

import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

const KAERNTEN_CENTER: [number, number] = [46.83, 13.83];
const KAERNTEN_ZOOM = 9;
const MIN_ZOOM_PEAKS = 11;
const MAX_VISIBLE_PEAKS = 20;

const OVERPASS_QUERY = encodeURIComponent(
  '[out:json][timeout:25];node["natural"="peak"]["name"](46.3,12.9,47.1,15.2);out body;'
);

export default function MapClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const allPeaksRef = useRef<any[]>([]);
  const peaksLayerRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);
  const [peakCount, setPeakCount] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [zoom, setZoom] = useState(KAERNTEN_ZOOM);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    (async () => {
      try {
        const L = (await import('leaflet')).default;
        leafletRef.current = L;

        if (cancelled || !containerRef.current) return;

        const map = L.map(containerRef.current, {
          center: KAERNTEN_CENTER,
          zoom: KAERNTEN_ZOOM,
        });
        mapRef.current = map;

        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 18,
        });
        osm.addTo(map);

        const hiking = L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://hiking.waymarkedtrails.org">Waymarked Trails</a>',
          opacity: 0.75,
          maxZoom: 18,
        });
        hiking.addTo(map);

        L.control.layers(
          { 'OpenStreetMap': osm },
          { 'Wanderwege (Waymarked Trails)': hiking },
          { collapsed: false }
        ).addTo(map);

        peaksLayerRef.current = L.layerGroup().addTo(map);

        const updatePeaks = () => {
          const currentZoom = map.getZoom();
          setZoom(currentZoom);

          peaksLayerRef.current.clearLayers();

          if (currentZoom < MIN_ZOOM_PEAKS || allPeaksRef.current.length === 0) {
            setVisibleCount(0);
            return;
          }

          const center = map.getCenter();

          // Sort by distance from map center, always show the nearest peaks
          const sorted = allPeaksRef.current
            .filter((el) => el.lat && el.lon)
            .map((el) => {
              const dlat = el.lat - center.lat;
              const dlon = el.lon - center.lng;
              return { ...el, _dist: dlat * dlat + dlon * dlon };
            })
            .sort((a, b) => a._dist - b._dist);

          const visible = sorted.slice(0, MAX_VISIBLE_PEAKS);
          setVisibleCount(visible.length);

          visible.forEach((el) => {
            const name = el.tags?.name ?? 'Gipfel';
            const ele = el.tags?.ele ? `${el.tags.ele} m` : '';

            L.circleMarker([el.lat, el.lon] as [number, number], {
              radius: 7,
              color: '#14532d',
              fillColor: '#16a34a',
              fillOpacity: 0.85,
              weight: 2,
            })
              .bindPopup(`<strong>${name}</strong>${ele ? `<br/>🏔️ ${ele}` : ''}`)
              .addTo(peaksLayerRef.current);
          });
        };

        map.on('moveend', updatePeaks);
        map.on('zoomend', updatePeaks);

        setLoading(false);

        try {
          const res = await fetch(
            `https://overpass-api.de/api/interpreter?data=${OVERPASS_QUERY}`
          );
          if (!res.ok) throw new Error('Overpass API nicht erreichbar');
          const data = await res.json();

          if (cancelled) return;

          allPeaksRef.current = data.elements ?? [];
          setPeakCount(allPeaksRef.current.length);
          updatePeaks();
        } catch {
          console.warn('Overpass API Fehler – Karte bleibt nutzbar');
        }
      } catch {
        setError('Karte konnte nicht geladen werden.');
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50">
          <span className="text-gray-500 text-sm">Karte wird geladen…</span>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50">
          <span className="text-red-500 text-sm">{error}</span>
        </div>
      )}
      <div ref={containerRef} style={{ height: 560 }} />
      <div className="absolute bottom-8 left-3 z-[1000] flex flex-col gap-1">
        {peakCount !== null && zoom >= MIN_ZOOM_PEAKS && (
          <div className="bg-white/90 text-xs text-gray-600 px-3 py-1.5 rounded-lg shadow">
            🏔️ {visibleCount} Gipfel sichtbar
          </div>
        )}
        {peakCount !== null && zoom < MIN_ZOOM_PEAKS && (
          <div className="bg-white/90 text-xs text-gray-500 px-3 py-1.5 rounded-lg shadow">
            Reinzoomen um Gipfel zu sehen
          </div>
        )}
      </div>
    </div>
  );
}
