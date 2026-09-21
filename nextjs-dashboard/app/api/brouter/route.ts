import { NextRequest, NextResponse } from 'next/server';

// ── Missbrauchsschutz ────────────────────────────────────────────────────────
// Diese Route ruft fremde Gratis-APIs (BRouter, Overpass) in unserem Namen auf.
// Ohne Schutz könnte sie als kostenloser Routing-Proxy missbraucht werden.
// Schutzschichten: Same-Origin-Check, Rate-Limit pro IP, strikte Validierung der
// Wegpunkte (Anzahl + Wertebereich) und eine auf das Nötige gekürzte Antwort.

/** Erlaubt nur Aufrufe von der eigenen Domain (Referer-Host == Host).
 *  Fehlt der Referer ganz, blocken wir nicht hart – dafür greift das Rate-Limit. */
function sameOrigin(req: NextRequest): boolean {
  const ref = req.headers.get('referer');
  if (!ref) return true;
  try {
    return new URL(ref).host === req.headers.get('host');
  } catch {
    return false;
  }
}

// Einfaches In-Memory-Rate-Limit pro IP (pro warmer Serverless-Instanz).
const RATE = { limit: 30, windowMs: 60_000 };
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now > e.reset) {
    hits.set(ip, { count: 1, reset: now + RATE.windowMs });
    return false;
  }
  e.count += 1;
  return e.count > RATE.limit;
}

// ── Eingabevalidierung ───────────────────────────────────────────────────────
// Ohne Obergrenze könnte eine einzige Anfrage mit tausenden Wegpunkten ebenso
// viele parallele Overpass-Aufrufe auslösen – also ein Verstärkungsangriff über
// unsere Domain. Zusätzlich fangen wir NaN und Koordinaten außerhalb des
// Planungsgebiets ab, damit keine Müll-Anfragen bei den Fremd-APIs landen.
const MAX_POINTS = 12;
const MAX_RAW_LEN = 400;
/** Grobe Bounding-Box Österreich inkl. Grenzregionen – weiter plant die Seite nicht. */
const BOUNDS = { latMin: 45.5, latMax: 49.5, lngMin: 9.0, lngMax: 17.5 };

type Point = { lat: number; lng: number };

function parseLonLats(raw: string): Point[] | null {
  const parts = raw.split('|');
  if (parts.length < 2 || parts.length > MAX_POINTS) return null;

  const out: Point[] = [];
  for (const part of parts) {
    const seg = part.split(',');
    if (seg.length !== 2) return null;
    const lng = Number(seg[0]);
    const lat = Number(seg[1]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    if (lat < BOUNDS.latMin || lat > BOUNDS.latMax) return null;
    if (lng < BOUNDS.lngMin || lng > BOUNDS.lngMax) return null;
    out.push({ lat, lng });
  }
  return out;
}

async function snapToTrail(lat: number, lng: number): Promise<Point> {
  // Find nodes on foot-accessible ways within 500 m.
  // lat/lng sind hier bereits validierte endliche Zahlen (siehe parseLonLats),
  // toFixed(6) liefert daher garantiert eine reine Zahl in die Query.
  const q = `[out:json][timeout:8];way(around:500,${lat.toFixed(6)},${lng.toFixed(6)})[highway~"^(path|footway|track|bridleway)$"][foot!="no"];node(w);out skel;`;
  try {
    const res = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(q)}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return { lat, lng };
    const data = await res.json();

    const nodes: { lat?: number; lon?: number; type?: string }[] =
      (data.elements ?? []).filter((e: { type?: string }) => e.type === 'node');
    if (!nodes.length) return { lat, lng };

    let best = { lat, lng };
    let minD = Infinity;
    for (const n of nodes) {
      if (typeof n.lat !== 'number' || typeof n.lon !== 'number') continue;
      const d = (n.lat - lat) ** 2 + (n.lon - lng) ** 2;
      if (d < minD) { minD = d; best = { lat: n.lat, lng: n.lon }; }
    }
    return best;
  } catch {
    return { lat, lng };
  }
}

export async function GET(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const lonlats = request.nextUrl.searchParams.get('lonlats');
  if (!lonlats || lonlats.length > MAX_RAW_LEN) {
    return NextResponse.json({ error: 'lonlats fehlt oder ist zu lang.' }, { status: 400 });
  }

  const parsed = parseLonLats(lonlats);
  if (!parsed) {
    return NextResponse.json(
      { error: `Ungültige Wegpunkte – erwartet werden 2 bis ${MAX_POINTS} Punkte innerhalb Österreichs.` },
      { status: 400 },
    );
  }

  // Snap all waypoints to nearest hiking trail in parallel (max. MAX_POINTS Aufrufe)
  const snapped = await Promise.all(parsed.map((p) => snapToTrail(p.lat, p.lng)));
  const snappedLonlats = snapped.map((p) => `${p.lng.toFixed(6)},${p.lat.toFixed(6)}`).join('|');

  try {
    const res = await fetch(
      `https://brouter.de/brouter?lonlats=${snappedLonlats}&profile=trekking&format=geojson&alternativeidx=0`,
      { headers: { 'User-Agent': 'NischeRatschlag/1.0' }, signal: AbortSignal.timeout(20000) }
    );
    if (!res.ok) return NextResponse.json({ error: `BRouter ${res.status}` }, { status: 502 });

    const data = await res.json();
    const feature = Array.isArray(data?.features) ? data.features[0] : undefined;
    const coordinates = feature?.geometry?.coordinates;
    if (!Array.isArray(coordinates)) {
      return NextResponse.json({ error: 'BRouter lieferte keine Route.' }, { status: 502 });
    }

    // Antwort auf das Nötige kürzen: nur die Felder, die der Routenplaner liest.
    // So geben wir keine fremden Rohdaten (Sprachhinweise, interne Felder) weiter.
    const props = feature?.properties ?? {};
    return NextResponse.json({
      features: [
        {
          geometry: { coordinates },
          properties: {
            'track-length': props['track-length'] ?? '0',
            'filtered ascend': props['filtered ascend'] ?? '0',
            'plain-ascend': props['plain-ascend'] ?? '0',
          },
        },
      ],
      snappedWaypoints: snapped,
    });
  } catch {
    return NextResponse.json({ error: 'BRouter nicht erreichbar' }, { status: 504 });
  }
}
