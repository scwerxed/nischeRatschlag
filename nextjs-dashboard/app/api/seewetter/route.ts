import { NextRequest, NextResponse } from 'next/server';

// Live-Wassertemperaturen der Kärntner Badeseen: offizielle Messwerte des
// Hydrographischen Diensts Kärnten (CC-BY-4.0, Land Kärnten - data.gv.at).
// Serverseitig geholt (statt direkt im Browser), weil der Dienst keine
// CORS-Header sendet – ein Fetch aus dem Client würde dort scheitern.
const SOURCE_URL = 'https://info.ktn.gv.at/asp/hydro/daten/json/hdkaernten_see.json';

// ── Missbrauchsschutz ────────────────────────────────────────────────────────
// Analog zu /api/brouter: diese Route ruft eine fremde Gratis-Datenquelle in
// unserem Namen auf. Der 15-Minuten-Cache (next.revalidate) hält die Last auf
// der Kärntner Seite ohnehin niedrig, das Rate-Limit ist nur zusätzliche
// Absicherung gegen direktes Traffic-Abgreifen über unsere Route.

function sameOrigin(req: NextRequest): boolean {
  const ref = req.headers.get('referer');
  if (!ref) return true;
  try {
    return new URL(ref).host === req.headers.get('host');
  } catch {
    return false;
  }
}

const RATE = { limit: 60, windowMs: 60_000 };
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

type Station = { gewaesser: string; wasser: number; stand: string | null };

export async function GET(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ stations: [] }, { status: 403 });
  }
  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ stations: [] }, { status: 429 });
  }

  try {
    const res = await fetch(SOURCE_URL, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = await res.json();
    const features: any[] = Array.isArray(data.features) ? data.features : [];

    const stations: Station[] = [];
    for (const f of features) {
      const p = f?.properties ?? {};
      if (typeof p.gewaesser === 'string' && typeof p.letzter_wert_wt === 'number') {
        stations.push({
          gewaesser: p.gewaesser,
          wasser: p.letzter_wert_wt,
          stand: typeof p.letzter_wert_wt_date === 'string' ? p.letzter_wert_wt_date : null,
        });
      }
    }

    return NextResponse.json(
      { stations, quelle: 'Hydrographischer Dienst Kärnten (CC-BY-4.0, data.gv.at)' },
      { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=1800' } }
    );
  } catch {
    // Quelle nicht erreichbar: leere Liste, der Client fällt auf die saisonalen Richtwerte zurück.
    return NextResponse.json({ stations: [] }, { status: 200 });
  }
}
