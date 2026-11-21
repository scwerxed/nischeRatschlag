'use client';

import { useEffect, useRef, useState } from 'react';
import { unterkuenfte, TYP_INFO } from '@/app/lib/unterkuenfte';
import { cloak } from '@/app/lib/affiliate';
import { CATEGORY_HEX } from '@/app/lib/blog-utils';
import {
  AUSTRIA_BOUNDS, KARTE_REGIONEN, karteRegion,
  KARTE_KATEGORIEN, ALLE_KARTE_KATEGORIEN, karteKategorien, karteKategorienParam,
} from '@/app/lib/karte-regionen';

/** Ein Pin der Ebene „Ausflugsziele“: alle Artikel mit demselben Startpunkt (z. B. die
 *  fünf Wörthersee-Artikel mit Sammel-Koordinate). Kommt schlank von der Server-Page,
 *  damit posts.ts nicht im Client-Bundle landet. */
export type MapSpot = {
  lat: number;
  lng: number;
  articles: { slug: string; title: string; category: string; region: string }[];
};

const MULTI_SPOT_COLOR = '#374151';

/** Steht der Artikel im aktuellen Kategorie-Filter? Kategorien, die der Filter (noch) nicht
 *  kennt, bleiben immer sichtbar – eine neue Post-Kategorie soll nicht still von der Karte fallen. */
function inFilter(category: string, aktiv: string[]): boolean {
  return !ALLE_KARTE_KATEGORIEN.includes(category) || aktiv.includes(category);
}

// Was bei einem Deep-Link auf einen Punkt in der URL steht. Wechselt man danach auf ein
// Bundesland oder ganz Österreich, gilt der Punkt nicht mehr (er hätte beim Neuladen Vorrang).
const DEEP_LINK_AUS = { lat: null, lng: null, zoom: null, name: null };

/** Ansicht in die Adresszeile schreiben (ohne Neuladen), damit man sie teilen oder als
 *  Lesezeichen speichern kann. Next.js übernimmt history.replaceState in seinen Router. */
function updateUrl(changes: Record<string, string | null>) {
  try {
    const url = new URL(window.location.href);
    for (const [k, v] of Object.entries(changes)) {
      if (v) url.searchParams.set(k, v);
      else url.searchParams.delete(k);
    }
    // Komma lesbar lassen (?kat=wandern,baden statt wandern%2Cbaden) – beim Einlesen gleichwertig.
    const qs = url.searchParams.toString().replace(/%2C/gi, ',');
    window.history.replaceState(null, '', `${url.pathname}${qs ? `?${qs}` : ''}${url.hash}`);
  } catch {
    // Nur Komfort – die Karte funktioniert auch ohne.
  }
}

const MIN_ZOOM_PEAKS = 11;
const MAX_VISIBLE_PEAKS = 25;

// Alle benannten Gipfel Österreichs mit Höhenangabe als [lat, lon, name, höhe], absteigend nach Höhe.
// Einmaliger Abzug aus OpenStreetMap (Overpass, © OpenStreetMap-Mitwirkende, ODbL) vom 2026-11-14;
// neu erzeugen mit der Abfrage in CLAUDE.md („Gipfel-Daten“).
const PEAKS_URL = '/daten/gipfel.json';

/** HTML-Entities escapen. Wird fuer alles gebraucht, was aus fremder Quelle
 *  (URL-Parameter, OpenStreetMap-Tags) in Popup-HTML eingesetzt wird. */
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
};
function escapeHtml(v: string): string {
  return v.replace(/[&<>"']/g, (c) => HTML_ENTITIES[c] ?? c);
}

/** Kategorie-Punkt + „Kategorie · Bundesland“ über dem Artikeltitel im Popup. */
function articleEyebrow(a: MapSpot['articles'][number]): string {
  const color = CATEGORY_HEX[a.category] ?? '#6b7280';
  return `<div style="display:flex;align-items:center;gap:5px;font-size:10px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">
    <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${color}"></span>${escapeHtml(a.category)} &middot; ${escapeHtml(a.region)}
  </div>`;
}

function spotPopupHtml(s: MapSpot): string {
  if (s.articles.length === 1) {
    const a = s.articles[0];
    const href = `/blog/${encodeURIComponent(a.slug)}`;
    return `<div style="min-width:190px;max-width:240px;font-family:system-ui,sans-serif">
      ${articleEyebrow(a)}
      <div style="font-size:14px;font-weight:700;color:#111827;line-height:1.3;margin-bottom:8px">${escapeHtml(a.title)}</div>
      <a href="${href}"
         style="display:block;text-align:center;background:#15803d;color:#fff;font-size:12px;font-weight:600;padding:7px 10px;border-radius:3px;text-decoration:none;letter-spacing:.01em">
         Zum Artikel
      </a>
    </div>`;
  }
  const items = s.articles
    .map((a) => `<a href="/blog/${encodeURIComponent(a.slug)}" style="display:block;padding:6px 0;border-top:1px solid #e5e7eb;text-decoration:none">
        ${articleEyebrow(a)}
        <span style="display:block;font-size:13px;font-weight:700;color:#111827;line-height:1.3">${escapeHtml(a.title)}</span>
      </a>`)
    .join('');
  return `<div style="min-width:200px;max-width:250px;font-family:system-ui,sans-serif">
    <div style="font-size:11px;font-weight:700;color:${MULTI_SPOT_COLOR};margin-bottom:4px">${s.articles.length} Artikel an diesem Ort</div>
    ${items}
  </div>`;
}

// ── tiny SVG checkmark ──────────────────────────────────────────────────────
function Checkmark() {
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
      <path d="M1 3.2 3.5 6 8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MapClient({ spots }: { spots: MapSpot[] }) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const mapRef        = useRef<any>(null);
  const osmLayerRef   = useRef<any>(null);
  const topoLayerRef  = useRef<any>(null);
  const hikingLayerRef= useRef<any>(null);
  const peaksLayerRef = useRef<any>(null);
  const staysLayerRef = useRef<any>(null);
  const articlesLayerRef = useRef<any>(null);
  const leafletRef    = useRef<any>(null);
  const allPeaksRef   = useRef<any[]>([]);
  const showPeaksRef  = useRef(true);

  const [baseLayer,     setBaseLayer]     = useState<'osm' | 'topo'>('osm');
  const [showTrails,    setShowTrails]    = useState(true);
  const [showPeaks,     setShowPeaks]     = useState(true);
  const [showStays,     setShowStays]     = useState(true);
  const [showArticles,  setShowArticles]  = useState(true);
  const [activeCats,    setActiveCats]    = useState<string[]>(ALLE_KARTE_KATEGORIEN);
  const [peakCount,     setPeakCount]     = useState<number | null>(null);
  const [peaksFailed,   setPeaksFailed]   = useState(false);
  const [visibleCount,  setVisibleCount]  = useState(0);
  const [zoom,          setZoom]          = useState(7);
  const [region,        setRegion]        = useState('');
  const [mapReady,      setMapReady]      = useState(false);
  const [error,         setError]         = useState<string | null>(null);
  const [panelOpen,     setPanelOpen]     = useState(true);

  // Ausflugsziele (Artikel-Startpunkte) – ein Pin je Ort, mehrere Artikel → Zahl im Pin. Wird bei
  // jedem Wechsel des Kategorie-Filters neu aufgebaut: Ein Sammel-Pin zählt und listet dann nur die
  // Artikel der aktiven Kategorien, bleibt einer übrig, wird er zum normalen farbigen Pin.
  // Nutzt nur Refs und die (feste) spots-Prop, darf also auch aus dem Init-Effekt laufen.
  function renderArticlePins(aktiv: string[]) {
    const L = leafletRef.current;
    const layer = articlesLayerRef.current;
    if (!L || !layer) return;
    layer.clearLayers();
    spots.forEach((spot) => {
      const articles = spot.articles.filter((a) => inFilter(a.category, aktiv));
      if (!articles.length) return;
      const s: MapSpot = { ...spot, articles };
      const multi = articles.length > 1;
      const color = multi ? MULTI_SPOT_COLOR : CATEGORY_HEX[articles[0].category] ?? '#6b7280';
      const size = multi ? 22 : 16;
      const icon = L.divIcon({
        className: '',
        html: `<div style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;background:${color};color:#fff;font-size:11px;font-weight:700;border:2px solid #fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.4)">${multi ? articles.length : ''}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
      });
      L.marker([s.lat, s.lng], {
        icon,
        title: multi ? `${articles.length} Artikel an diesem Ort` : articles[0].title,
      })
        .bindPopup(spotPopupHtml(s), { closeButton: true })
        .addTo(layer);
    });
  }

  // ── init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      try {
        const L = (await import('leaflet')).default;
        if (cancelled || !containerRef.current) return;
        leafletRef.current = L;

        const el = containerRef.current as any;
        if (el._leaflet_id) el._leaflet_id = null;

        // Startansicht: Deep-Link auf einen Punkt (?lat=&lng=&zoom=) vor Bundesland (?region=)
        // vor ganz Österreich. Zuerst ein grober Ausschnitt über Mittelpunkt + Zoom, der ohne
        // Containergröße auskommt; exakt eingepasst wird weiter unten (fitIfSized).
        const sp = new URLSearchParams(window.location.search);
        const dlLat = parseFloat(sp.get('lat') ?? '');
        const dlLng = parseFloat(sp.get('lng') ?? '');
        const hasDeepLink = Number.isFinite(dlLat) && Number.isFinite(dlLng);
        const startRegion = hasDeepLink ? undefined : karteRegion(sp.get('region'));
        const startBounds = startRegion?.bounds ?? AUSTRIA_BOUNDS;
        const startCats = karteKategorien(sp.get('kat'));

        const dz = parseInt(sp.get('zoom') ?? '', 10);
        const startCenter: [number, number] = hasDeepLink
          ? [dlLat, dlLng]
          : [(startBounds[0][0] + startBounds[1][0]) / 2, (startBounds[0][1] + startBounds[1][1]) / 2];
        const startZoom = hasDeepLink ? (Number.isFinite(dz) ? dz : 14) : startRegion ? 8 : 7;

        const map = L.map(containerRef.current, { center: startCenter, zoom: startZoom });
        mapRef.current = map;
        setZoom(startZoom);
        if (startRegion) setRegion(startRegion.slug);

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

        // Ausflugsziele (Artikel-Startpunkte) layer, gefiltert nach ?kat= (sonst alle Kategorien)
        articlesLayerRef.current = L.layerGroup().addTo(map);
        setActiveCats(startCats);
        renderArticlePins(startCats);

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
            // OSM-Tags sind fremde, von jedem editierbare Daten -> escapen.
            const name = escapeHtml(String(el.tags?.name ?? 'Gipfel'));
            const ele  = el.tags?.ele ? `${escapeHtml(String(el.tags.ele))} m` : '';
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

        // Deep-Link: /karte?lat=..&lng=..&zoom=..&name=.. → Ausschnitt ist oben schon gesetzt,
        // hier nur noch der Startpunkt-Marker.
        if (hasDeepLink) {
          // Der Name stammt aus der URL, landet also in fremd steuerbarem HTML.
          const nm = escapeHtml((sp.get('name') ?? 'Startpunkt').slice(0, 80));
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

        // Ausschnitt exakt einpassen – aber nur, wenn der Container eine Größe hat. Wird die Seite
        // in einem verborgenen Fenster geladen, ist er anfangs 0 px breit (live beobachtet am
        // 2026-11-19); fitBounds landete dann auf Zoomstufe 0, der ganzen Welt. In dem Fall bleibt
        // der grobe Ausschnitt von oben stehen, bis Leaflet einen Größenwechsel meldet ('resize').
        // invalidateSize() liest die Größe neu ein und hält dabei die Mitte (auch beim Deep-Link).
        let fitted = hasDeepLink;
        const fitIfSized = () => {
          if (fitted || cancelled || mapRef.current !== map) return;
          const size = map.getSize();
          if (size.x > 0 && size.y > 0) {
            fitted = true;
            map.off('resize', fitIfSized);
            map.fitBounds(startBounds, { animate: false });
          }
        };
        if (!fitted) map.on('resize', fitIfSized);
        map.invalidateSize();
        fitIfSized();
        if (!fitted) {
          setTimeout(() => {
            if (cancelled || mapRef.current !== map) return;
            map.invalidateSize();
            fitIfSized();
          }, 500);
        }

        setMapReady(true);
        // Am Handy startet das Bedienfeld eingeklappt, sonst verdeckt es die halbe Karte.
        if (window.innerWidth < 640) setPanelOpen(false);

        // Gipfel (non-blocking) aus der mitgelieferten Datei statt live von Overpass: der Dienst war
        // im Herbst 2026 dauerhaft überlastet bzw. sperrte Browser-Anfragen, Gipfel ändern sich aber kaum.
        fetch(PEAKS_URL, { signal: AbortSignal.timeout(15000) })
          .then((r) => {
            if (!r.ok) throw new Error(`Gipfel ${r.status}`);
            return r.json();
          })
          .then((data: [number, number, string, number][]) => {
            if (cancelled) return;
            // In die Form der Overpass-Elemente bringen, die updatePeaks() erwartet.
            allPeaksRef.current = (Array.isArray(data) ? data : []).map(([lat, lon, name, ele]) => ({
              lat, lon, tags: { name, ele },
            }));
            setPeakCount(allPeaksRef.current.length);
            updatePeaks();
          })
          .catch(() => {
            // Karte bleibt nutzbar – nur die Gipfel-Ebene fehlt
            if (!cancelled) setPeaksFailed(true);
          });
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

  function toggleArticles() {
    const map = mapRef.current;
    if (!map || !articlesLayerRef.current) return;
    if (showArticles) map.removeLayer(articlesLayerRef.current);
    else map.addLayer(articlesLayerRef.current);
    setShowArticles((v) => !v);
  }

  function setCategories(next: string[]) {
    setActiveCats(next);
    renderArticlePins(next);
    updateUrl({ kat: karteKategorienParam(next) });
  }

  function toggleCategory(name: string) {
    setCategories(activeCats.includes(name) ? activeCats.filter((c) => c !== name) : [...activeCats, name]);
  }

  function showAustria() {
    setRegion('');
    mapRef.current?.fitBounds(AUSTRIA_BOUNDS);
    updateUrl({ region: null, ...DEEP_LINK_AUS });
  }

  function showRegion(slug: string) {
    const r = karteRegion(slug);
    if (!r) return showAustria();
    setRegion(r.slug);
    mapRef.current?.fitBounds(r.bounds);
    updateUrl({ region: r.slug, ...DEEP_LINK_AUS });
  }

  // ── render ────────────────────────────────────────────────────────────────
  const mapH = 'calc(100vh - 160px)';
  const catCounts: Record<string, number> = {};
  let articleCount = 0;
  for (const s of spots) {
    for (const a of s.articles) {
      catCounts[a.category] = (catCounts[a.category] ?? 0) + 1;
      if (inFilter(a.category, activeCats)) articleCount++;
    }
  }
  const allCatsActive = activeCats.length >= KARTE_KATEGORIEN.length;

  return (
    <div
      className="relative border border-hairline overflow-hidden rounded-sm" style={{ minHeight: 560 }}
    >
      {/* Error */}
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-parchment">
          <span className="text-caption text-red-600">{error}</span>
        </div>
      )}

      {/* Map container */}
      <div ref={containerRef} style={{ height: mapH, minHeight: 560 }} />

      {/* ── Layer control panel – top-right ─────────────────────────────── */}
      {mapReady && (
        <div
          className="absolute top-2 right-2 z-[1000] bg-white border border-ink select-none rounded-sm max-h-[calc(100%-1rem)] overflow-y-auto" style={{ minWidth: panelOpen ? 176 : 0 }}
        >
          <button
            onClick={() => setPanelOpen((o) => !o)}
            aria-expanded={panelOpen}
            className="tap flex items-center justify-between gap-3 w-full px-3 py-2 font-mono text-[11.5px] uppercase tracking-[0.06em] text-ink"
          >
            Ebenen
            <span aria-hidden className="text-signal">{panelOpen ? '–' : '+'}</span>
          </button>
          <div className={panelOpen ? 'border-t border-hairline' : 'hidden'}>
          {/* Basiskarte */}
          <div className="px-3 pt-2.5 pb-1.5">
            <p className="text-[10px] font-semibold text-ink-soft uppercase tracking-widest mb-2">
              Karte
            </p>
            {(['osm', 'topo'] as const).map((id) => (
              <button
                key={id}
                onClick={() => switchBase(id)}
                className="tap flex items-center gap-2 w-full py-1 text-left hover:text-ink transition-colors"
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    baseLayer === id ? 'border-green-600' : 'border-hairline'
                  }`}
                >
                  {baseLayer === id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 block" />
                  )}
                </span>
                <span className={`text-caption ${baseLayer === id ? 'text-ink font-medium' : 'text-ink-soft'}`}>
                  {id === 'osm' ? 'Standard' : 'Topografisch'}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-hairline" />

          {/* Ebenen */}
          <div className="px-3 pt-2 pb-2.5">
            <p className="text-[10px] font-semibold text-ink-soft uppercase tracking-widest mb-2">
              Ebenen
            </p>

            {/* Ausflugsziele (Artikel) */}
            <button
              onClick={toggleArticles}
              className="tap flex items-center gap-2 w-full py-1 text-left hover:text-ink transition-colors"
            >
              <span
                className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors ${ showArticles ? 'bg-ink border-ink' : 'border-hairline' } rounded-sm`}
              >
                {showArticles && <Checkmark />}
              </span>
              <span className="flex items-center gap-2">
                {/* Swatch: two category dots */}
                <svg width="14" height="9" viewBox="0 0 14 9">
                  <circle cx="4.5" cy="4.5" r="3.5" fill={CATEGORY_HEX.Wandern} stroke="#fff" strokeWidth="1" />
                  <circle cx="9.5" cy="4.5" r="3.5" fill={CATEGORY_HEX.Ausflug} stroke="#fff" strokeWidth="1" />
                </svg>
                <span className={`text-caption ${showArticles ? 'text-ink' : 'text-ink-soft'}`}>
                  Ausflugsziele
                  <span className="ml-1 text-fine text-ink-soft">({articleCount})</span>
                </span>
              </span>
            </button>

            {/* Kategorie-Filter = Legende der Pin-Farben: antippen blendet die Kategorie ein/aus */}
            {showArticles && (
              <div className="pl-5 mt-0.5 mb-1">
                <div role="group" aria-label="Ausflugsziele nach Kategorie filtern">
                  {KARTE_KATEGORIEN.map((k) => {
                    const on = activeCats.includes(k.name);
                    const color = CATEGORY_HEX[k.name] ?? '#6b7280';
                    return (
                      <button
                        key={k.slug}
                        type="button"
                        onClick={() => toggleCategory(k.name)}
                        aria-pressed={on}
                        className={`tap flex items-center gap-1.5 w-full py-0.5 text-left text-[11px] leading-tight transition-colors hover:text-ink ${on ? 'text-ink' : 'text-ink-soft'}`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 border-2"
                          style={{ borderColor: color, background: on ? color : 'transparent' }}
                        />
                        {k.name}
                        <span className="ml-auto pl-2 font-mono text-[10px] text-ink-soft">{catCounts[k.name] ?? 0}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="flex items-center gap-1.5 text-[10px] text-ink-soft leading-tight mt-1">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: MULTI_SPOT_COLOR }} />
                  mehrere an einem Ort
                </p>
                {!allCatsActive && (
                  <button
                    type="button"
                    onClick={() => setCategories(ALLE_KARTE_KATEGORIEN)}
                    className="tap mt-1 text-[11px] text-ink underline underline-offset-2 decoration-signal hover:text-signal"
                  >
                    {activeCats.length ? 'Alle Kategorien zeigen' : 'Keine Kategorie gewählt – alle zeigen'}
                  </button>
                )}
              </div>
            )}

            {/* Wanderwege */}
            <button
              onClick={toggleTrails}
              className="tap flex items-center gap-2 w-full py-1 text-left hover:text-ink transition-colors mt-0.5"
            >
              <span
                className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors ${ showTrails ? 'bg-ink border-ink' : 'border-hairline' } rounded-sm`}
              >
                {showTrails && <Checkmark />}
              </span>
              <span className="flex items-center gap-2">
                {/* Swatch: orange dashed line like Waymarked Trails */}
                <svg width="20" height="8" viewBox="0 0 20 8">
                  <path d="M1 4 H6 M9 4 H14 M17 4 H20" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <span className={`text-caption ${showTrails ? 'text-ink' : 'text-ink-soft'}`}>
                  Wanderwege
                </span>
              </span>
            </button>

            {/* Gipfel */}
            <button
              onClick={togglePeaks}
              className="tap flex items-center gap-2 w-full py-1 text-left hover:text-ink transition-colors mt-0.5"
            >
              <span
                className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors ${ showPeaks ? 'bg-ink border-ink' : 'border-hairline' } rounded-sm`}
              >
                {showPeaks && <Checkmark />}
              </span>
              <span className="flex items-center gap-2">
                {/* Swatch: green circle */}
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <circle cx="5" cy="5" r="4" fill="#16a34a" stroke="#14532d" strokeWidth="1" />
                </svg>
                <span className={`text-caption ${showPeaks ? 'text-ink' : 'text-ink-soft'}`}>
                  Gipfel
                  {showPeaks && zoom >= MIN_ZOOM_PEAKS && visibleCount > 0 && (
                    <span className="ml-1 text-fine text-ink-soft">({visibleCount})</span>
                  )}
                </span>
              </span>
            </button>

            {/* Hint if peaks are on but zoom is too low */}
            {showPeaks && zoom < MIN_ZOOM_PEAKS && (
              <p className="text-[11px] text-ink-soft mt-1.5 pl-5 leading-tight">
                Weiter reinzoomen um<br />Gipfel anzuzeigen
              </p>
            )}

            {/* Unterkünfte */}
            <button
              onClick={toggleStays}
              className="tap flex items-center gap-2 w-full py-1 text-left hover:text-ink transition-colors mt-0.5"
            >
              <span
                className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors ${ showStays ? 'bg-ink border-ink' : 'border-hairline' } rounded-sm`}
              >
                {showStays && <Checkmark />}
              </span>
              <span className="flex items-center gap-2">
                <svg width="11" height="11" viewBox="0 0 11 11">
                  <rect x="1.5" y="1.5" width="8" height="8" rx="1.5" fill="#2563eb" stroke="#1e40af" strokeWidth="1" />
                </svg>
                <span className={`text-caption ${showStays ? 'text-ink' : 'text-ink-soft'}`}>
                  Unterkünfte
                </span>
              </span>
            </button>
          </div>

          <div className="border-t border-hairline" />

          {/* Ansicht: ganz Österreich oder ein Bundesland */}
          <div className="px-3 pt-2 pb-2.5">
            <p className="text-[10px] font-semibold text-ink-soft uppercase tracking-widest mb-1.5">
              Ansicht
            </p>
            <button
              onClick={showAustria}
              className={`tap flex items-center gap-1.5 w-full py-1 text-left text-caption hover:text-ink transition-colors ${region ? 'text-ink-soft' : 'text-ink font-medium'}`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M6 1v2M6 9v2M1 6h2M9 6h2M3.05 3.05l1.41 1.41M7.54 7.54l1.41 1.41M3.05 8.95l1.41-1.41M7.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Ganz Österreich
            </button>
            <label htmlFor="karte-region" className="sr-only">Bundesland auf der Karte zeigen</label>
            <select
              id="karte-region"
              value={region}
              onChange={(e) => showRegion(e.target.value)}
              className="tap mt-1 w-full border border-hairline rounded-sm bg-white py-1 pl-2 pr-7 text-caption text-ink focus:border-ink focus:ring-0"
            >
              <option value="">Bundesland wählen…</option>
              {KARTE_REGIONEN.map((r) => (
                <option key={r.slug} value={r.slug}>{r.name}</option>
              ))}
            </select>
          </div>
          </div>
        </div>
      )}

      {/* ── Loading state – minimal bar ──────────────────────────────────── */}
      {!mapReady && !error && (
        <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-white border-t border-hairline px-3 py-1.5 flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin shrink-0" />
          <span className="text-fine text-ink-soft">Karte wird geladen…</span>
        </div>
      )}

      {/* ── Peak loading indicator ───────────────────────────────────────── */}
      {mapReady && peakCount === null && !peaksFailed && (
        <div className="absolute bottom-2 left-2 z-[1000] bg-white border border-hairline px-2.5 py-1 text-fine text-ink-soft flex items-center gap-1.5 rounded-sm">
          <div className="w-2.5 h-2.5 border border-hairline border-t-gray-600 rounded-full animate-spin" />
          Gipfel laden…
        </div>
      )}
      {mapReady && peaksFailed && (
        <div className="absolute bottom-2 left-2 z-[1000] bg-white border border-hairline px-2.5 py-1 text-fine text-ink-soft rounded-sm">
          Gipfel gerade nicht verfügbar – Artikel, Unterkünfte und Wege funktionieren weiter.
        </div>
      )}
    </div>
  );
}
