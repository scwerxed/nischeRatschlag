'use client';

import { useEffect, useRef, useState } from 'react';
import { unterkuenfte, TYP_INFO } from '@/app/lib/unterkuenfte';
import { cloak } from '@/app/lib/affiliate';

const KAERNTEN_CENTER: [number, number] = [46.83, 13.83];
const KAERNTEN_ZOOM = 9;
const MIN_ZOOM_PEAKS = 11;
const MAX_VISIBLE_PEAKS = 25;

const OVERPASS_QUERY = encodeURIComponent(
  '[out:json][timeout:25];node["natural"="peak"]["name"](46.3,12.9,47.1,15.2);out body;'
);

// ── tiny SVG checkmark ──────────────────────────────────────────────────────
function Checkmark() {
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
      <path d="M1 3.2 3.5 6 8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MapClient() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const mapRef        = useRef<any>(null);
  const osmLayerRef   = useRef<any>(null);
  const topoLayerRef  = useRef<any>(null);
  const hikingLayerRef= useRef<any>(null);
  const peaksLayerRef = useRef<any>(null);
  const staysLayerRef = useRef<any>(null);
  const allPeaksRef   = useRef<any[]>([]);
  const showPeaksRef  = useRef(true);

  const [baseLayer,     setBaseLayer]     = useState<'osm' | 'topo'>('osm');
  const [showTrails,    setShowTrails]    = useState(true);
  const [showPeaks,     setShowPeaks]     = useState(true);
  const [showStays,     setShowStays]     = useState(true);
  const [peakCount,     setPeakCount]     = useState<number | null>(null);
  const [visibleCount,  setVisibleCount]  = useState(0);
  const [zoom,          setZoom]          = useState(KAERNTEN_ZOOM);
  const [mapReady,      setMapReady]      = useState(false);
  const [error,         setError]         = useState<string | null>(null);

  // ── init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      try {
        const L = (await import('leaflet')).default;
        if (cancelled || !containerRef.current) return;

        const el = containerRef.current as any;
        if (el._leaflet_id) el._leaflet_id = null;

        const map = L.map(containerRef.current, { center: KAERNTEN_CENTER, zoom: KAERNTEN_ZOOM });
        mapRef.current = map;

        // Base layers
        osmLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 18, zIndex: 1,
        }).addTo(map);

        topoLayerRef.current = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://opentopomap.org">OpenTopoMap</a>',
          maxZoom: 17, zIndex: 1,
        }); // not added yet

        // Hiking overlay
        hikingLayerRef.current = L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://hiking.waymarkedtrails.org">Waymarked Trails</a>',
          opacity: 0.8, maxZoom: 18, zIndex: 2,
        }).addTo(map);

        // Peaks layer group
        peaksLayerRef.current = L.layerGroup().addTo(map);

        // Unterkünfte (Affiliate) layer
        staysLayerRef.current = L.layerGroup().addTo(map);
        unterkuenfte.forEach((u) => {
          const info = TYP_INFO[u.typ];
          const icon = L.divIcon({
            className: '',
            html: `<div style="display:flex;align-items:center;justify-content:center;width:26px;height:26px;background:${info.color};color:#fff;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.35);border-radius:3px 3px 3px 0;transform:rotate(-45deg)"><span style="transform:rotate(45deg);letter-spacing:0">${info.short}</span></div>`,
            iconSize: [26, 26],
            iconAnchor: [13, 26],
            popupAnchor: [0, -24],
          });
          L.marker([u.lat, u.lng], { icon })
            .bindPopup(
              `<div style="min-width:185px;font-family:system-ui,sans-serif">
                <div style="font-size:10px;color:${info.color};font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">${u.typ} &middot; ${u.see}</div>
                <div style="font-size:14px;font-weight:700;color:#111827;margin-bottom:2px">${u.name}</div>
                <div style="font-size:12px;color:#6b7280;margin-bottom:8px">${u.ort} &nbsp;&middot;&nbsp; ab <strong style="color:#15803d">${u.abPreis}&thinsp;&euro;</strong>/Nacht</div>
                <a href="${cloak(u.bookingUrl)}" target="_blank" rel="noopener sponsored"
                   style="display:block;text-align:center;background:#15803d;color:#fff;font-size:12px;font-weight:600;padding:7px 10px;border-radius:3px;text-decoration:none;letter-spacing:.01em">
                   Verfügbarkeit prüfen
                </a>
               </div>`,
              { closeButton: true }
            )
            .addTo(staysLayerRef.current);
        });

        const updatePeaks = () => {
          const z = map.getZoom();
          setZoom(z);
          peaksLayerRef.current?.clearLayers();
          if (z < MIN_ZOOM_PEAKS || !allPeaksRef.current.length || !showPeaksRef.current) {
            setVisibleCount(0);
            return;
          }
          const center = map.getCenter();
          const sorted = allPeaksRef.current
            .filter((el) => el.lat && el.lon)
            .map((el) => ({ ...el, _d: (el.lat - center.lat) ** 2 + (el.lon - center.lng) ** 2 }))
            .sort((a, b) => a._d - b._d)
            .slice(0, MAX_VISIBLE_PEAKS);
          setVisibleCount(sorted.length);
          sorted.forEach((el) => {
            const name = el.tags?.name ?? 'Gipfel';
            const ele  = el.tags?.ele ? `${el.tags.ele} m` : '';
            L.circleMarker([el.lat, el.lon] as [number, number], {
              radius: 6, color: '#14532d', fillColor: '#16a34a', fillOpacity: 0.9, weight: 1.5,
            })
              .bindPopup(
                `<strong style="font-size:13px">${name}</strong>${ele ? `<br/><span style="color:#6b7280;font-size:12px">▲ ${ele}</span>` : ''}`
              )
              .addTo(peaksLayerRef.current);
          });
        };

        map.on('moveend', updatePeaks);
        map.on('zoomend', updatePeaks);

        // Deep-Link: /karte?lat=..&lng=..&zoom=..&name=.. → dorthin zentrieren + Startpunkt-Marker
        const sp = new URLSearchParams(window.location.search);
        const dlLat = parseFloat(sp.get('lat') ?? '');
        const dlLng = parseFloat(sp.get('lng') ?? '');
        if (Number.isFinite(dlLat) && Number.isFinite(dlLng)) {
          const dz = parseInt(sp.get('zoom') ?? '', 10);
          map.setView([dlLat, dlLng], Number.isFinite(dz) ? dz : 14);
          const nm = (sp.get('name') ?? 'Startpunkt').replace(/[<>]/g, '').slice(0, 80);
          const startIcon = L.divIcon({
            className: '',
            html: `<div style="width:22px;height:22px;background:#15803d;border:3px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 1px 5px rgba(0,0,0,.45)"></div>`,
            iconSize: [22, 22],
            iconAnchor: [11, 22],
            popupAnchor: [0, -20],
          });
          L.marker([dlLat, dlLng], { icon: startIcon, zIndexOffset: 1000 })
            .addTo(map)
            .bindPopup(`<strong style="font-size:13px">${nm}</strong><br/><span style="color:#6b7280;font-size:12px">Startpunkt</span>`)
            .openPopup();
        }

        setMapReady(true);

        // Fetch peaks (non-blocking)
        fetch(`https://overpass-api.de/api/interpreter?data=${OVERPASS_QUERY}`)
          .then((r) => r.json())
          .then((data) => {
            if (cancelled) return;
            allPeaksRef.current = data.elements ?? [];
            setPeakCount(allPeaksRef.current.length);
            updatePeaks();
          })
          .catch(() => {/* Karte bleibt nutzbar */});
      } catch {
        setError('Karte konnte nicht geladen werden.');
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── layer toggle handlers ─────────────────────────────────────────────────
  function switchBase(to: 'osm' | 'topo') {
    const map = mapRef.current;
    if (!map) return;
    if (to === 'osm') {
      map.removeLayer(topoLayerRef.current);
      map.addLayer(osmLayerRef.current);
    } else {
      map.removeLayer(osmLayerRef.current);
      map.addLayer(topoLayerRef.current);
    }
    setBaseLayer(to);
  }

  function toggleTrails() {
    const map = mapRef.current;
    if (!map) return;
    if (showTrails) map.removeLayer(hikingLayerRef.current);
    else map.addLayer(hikingLayerRef.current);
    setShowTrails((v) => !v);
  }

  function togglePeaks() {
    const map = mapRef.current;
    const layer = peaksLayerRef.current;
    if (!map || !layer) return;
    const next = !showPeaks;
    showPeaksRef.current = next;
    if (next) { map.addLayer(layer); mapRef.current.fire('moveend'); }
    else { layer.clearLayers(); map.removeLayer(layer); }
    setShowPeaks(next);
  }

  function toggleStays() {
    const map = mapRef.current;
    if (!map || !staysLayerRef.current) return;
    if (showStays) map.removeLayer(staysLayerRef.current);
    else map.addLayer(staysLayerRef.current);
    setShowStays((v) => !v);
  }

  function resetView() {
    mapRef.current?.setView(KAERNTEN_CENTER, KAERNTEN_ZOOM);
  }

  // ── render ────────────────────────────────────────────────────────────────
  const mapH = 'calc(100vh - 160px)';

  return (
    <div
      className="relative border border-gray-300 overflow-hidden"
      style={{ borderRadius: 3, minHeight: 560 }}
    >
      {/* Error */}
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50">
          <span className="text-sm text-red-600">{error}</span>
        </div>
      )}

      {/* Map container */}
      <div ref={containerRef} style={{ height: mapH, minHeight: 560 }} />

      {/* ── Layer control panel – top-right ─────────────────────────────── */}
      {mapReady && (
        <div
          className="absolute top-2 right-2 z-[1000] bg-white border border-gray-300 select-none"
          style={{ borderRadius: 3, minWidth: 176, boxShadow: '0 1px 4px rgba(0,0,0,.12)' }}
        >
          {/* Basiskarte */}
          <div className="px-3 pt-2.5 pb-1.5">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Karte
            </p>
            {(['osm', 'topo'] as const).map((id) => (
              <button
                key={id}
                onClick={() => switchBase(id)}
                className="flex items-center gap-2 w-full py-1 text-left hover:text-gray-900 transition-colors"
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    baseLayer === id ? 'border-green-600' : 'border-gray-300'
                  }`}
                >
                  {baseLayer === id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 block" />
                  )}
                </span>
                <span className={`text-sm ${baseLayer === id ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                  {id === 'osm' ? 'Standard' : 'Topografisch'}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200" />

          {/* Ebenen */}
          <div className="px-3 pt-2 pb-2.5">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Ebenen
            </p>

            {/* Wanderwege */}
            <button
              onClick={toggleTrails}
              className="flex items-center gap-2 w-full py-1 text-left hover:text-gray-900 transition-colors"
            >
              <span
                className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors ${
                  showTrails ? 'bg-green-600 border-green-600' : 'border-gray-300'
                }`}
                style={{ borderRadius: 2 }}
              >
                {showTrails && <Checkmark />}
              </span>
              <span className="flex items-center gap-2">
                {/* Swatch: orange dashed line like Waymarked Trails */}
                <svg width="20" height="8" viewBox="0 0 20 8">
                  <path d="M1 4 H6 M9 4 H14 M17 4 H20" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <span className={`text-sm ${showTrails ? 'text-gray-800' : 'text-gray-400'}`}>
                  Wanderwege
                </span>
              </span>
            </button>

            {/* Gipfel */}
            <button
              onClick={togglePeaks}
              className="flex items-center gap-2 w-full py-1 text-left hover:text-gray-900 transition-colors mt-0.5"
            >
              <span
                className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors ${
                  showPeaks ? 'bg-green-600 border-green-600' : 'border-gray-300'
                }`}
                style={{ borderRadius: 2 }}
              >
                {showPeaks && <Checkmark />}
              </span>
              <span className="flex items-center gap-2">
                {/* Swatch: green circle */}
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <circle cx="5" cy="5" r="4" fill="#16a34a" stroke="#14532d" strokeWidth="1" />
                </svg>
                <span className={`text-sm ${showPeaks ? 'text-gray-800' : 'text-gray-400'}`}>
                  Gipfel
                  {showPeaks && zoom >= MIN_ZOOM_PEAKS && visibleCount > 0 && (
                    <span className="ml-1 text-xs text-gray-400">({visibleCount})</span>
                  )}
                </span>
              </span>
            </button>

            {/* Hint if peaks are on but zoom is too low */}
            {showPeaks && zoom < MIN_ZOOM_PEAKS && (
              <p className="text-[11px] text-gray-400 mt-1.5 pl-5 leading-tight">
                Weiter reinzoomen um<br />Gipfel anzuzeigen
              </p>
            )}

            {/* Unterkünfte */}
            <button
              onClick={toggleStays}
              className="flex items-center gap-2 w-full py-1 text-left hover:text-gray-900 transition-colors mt-0.5"
            >
              <span
                className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors ${
                  showStays ? 'bg-green-600 border-green-600' : 'border-gray-300'
                }`}
                style={{ borderRadius: 2 }}
              >
                {showStays && <Checkmark />}
              </span>
              <span className="flex items-center gap-2">
                <svg width="11" height="11" viewBox="0 0 11 11">
                  <rect x="1.5" y="1.5" width="8" height="8" rx="1.5" fill="#2563eb" stroke="#1e40af" strokeWidth="1" />
                </svg>
                <span className={`text-sm ${showStays ? 'text-gray-800' : 'text-gray-400'}`}>
                  Unterkünfte
                </span>
              </span>
            </button>
          </div>

          <div className="border-t border-gray-200" />

          {/* Reset-to-Kärnten */}
          <button
            onClick={resetView}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v2M6 9v2M1 6h2M9 6h2M3.05 3.05l1.41 1.41M7.54 7.54l1.41 1.41M3.05 8.95l1.41-1.41M7.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Kärnten anzeigen
          </button>
        </div>
      )}

      {/* ── Loading state – minimal bar ──────────────────────────────────── */}
      {!mapReady && !error && (
        <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-white border-t border-gray-200 px-3 py-1.5 flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin shrink-0" />
          <span className="text-xs text-gray-500">Karte wird geladen…</span>
        </div>
      )}

      {/* ── Peak loading indicator ───────────────────────────────────────── */}
      {mapReady && peakCount === null && (
        <div className="absolute bottom-2 left-2 z-[1000] bg-white border border-gray-200 px-2.5 py-1 text-xs text-gray-400 flex items-center gap-1.5" style={{ borderRadius: 2 }}>
          <div className="w-2.5 h-2.5 border border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          Gipfel laden…
        </div>
      )}
    </div>
  );
}
