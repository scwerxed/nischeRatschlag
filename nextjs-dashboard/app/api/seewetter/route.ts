import { NextRequest, NextResponse } from 'next/server';
import { SEE_MESSSTELLEN, type SeeMesswert } from '@/app/lib/seen-messstellen';

// Live-Wassertemperaturen der Badeseen aus drei offiziellen, kostenlosen Quellen
// (Hydrographische Dienste der Länder, Open Government Data, CC BY 4.0):
//   Kärnten        – GeoJSON  (15 Seen)
//   Salzburg       – JSON     (9 Seen)
//   Oberösterreich – ZRXP     (Attersee, Traunsee, Hallstätter See, Wolfgangsee, Irrsee, Almsee)
// Serverseitig geholt (statt direkt im Browser), weil die Dienste keine CORS-Header senden.
// Ergebnis: Messwert je Station-ID aus app/lib/seen-messstellen.ts.
const KTN_URL = 'https://info.ktn.gv.at/asp/hydro/daten/json/hdkaernten_see.json';
const SBG_URL = 'https://www.salzburg.gv.at/wasser/hydro/grafiken/data.json';
const OOE_URL = 'https://data.ooe.gv.at/files/hydro/HDOOE_Export_WT.zrxp';

/** Ältere Werte (z. B. ausgefallene Station) werden verworfen, statt veraltet als „live“ zu erscheinen. */
const MAX_ALTER_MS = 72 * 60 * 60 * 1000;

const KNOWN_IDS = new Set(SEE_MESSSTELLEN.map((m) => m.id));

type Werte = Record<string, SeeMesswert>;

function frisch(stand: Date, wasser: number): boolean {
  const t = stand.getTime();
  return Number.isFinite(t) && Date.now() - t < MAX_ALTER_MS && Number.isFinite(wasser) && wasser > -5 && wasser < 40;
}

function add(out: Werte, id: string, wasser: number, stand: Date) {
  if (!KNOWN_IDS.has(id) || !frisch(stand, wasser)) return;
  out[id] = { wasser: Math.round(wasser * 10) / 10, stand: stand.toISOString() };
}

async function fetchSource(url: string): Promise<Response> {
  const res = await fetch(url, { next: { revalidate: 900 }, signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`upstream ${res.status}`);
  return res;
}

async function kaernten(out: Werte) {
  const data = await (await fetchSource(KTN_URL)).json();
  const features: any[] = Array.isArray(data?.features) ? data.features : [];
  for (const f of features) {
    const p = f?.properties ?? {};
    if (typeof p.letzter_wert_wt === 'number' && typeof p.letzter_wert_wt_date === 'string') {
      add(out, `ktn-${p.id}`, p.letzter_wert_wt, new Date(p.letzter_wert_wt_date));
    }
  }
}

async function salzburg(out: Werte) {
  const data = await (await fetchSource(SBG_URL)).json();
  const stations: any[] = Array.isArray(data) ? data : [];
  for (const s of stations) {
    const wt = s?.values?.WT;
    if (!wt || typeof wt !== 'object') continue;
    // Schlüssel variiert je Station („Cmd“, „15m.Cmd.P-1“ …) – erster Eintrag mit Zahlenwert.
    const v: any = Object.values(wt).find((x: any) => typeof x?.v === 'number' && typeof x?.dt === 'number');
    if (v) add(out, `sbg-${s.number}`, v.v, new Date(v.dt));
  }
}

// ZRXP: je Zeitreihe Kopfzeilen mit „#“ (darin SANR = Stationsnummer), danach Zeilen
// „JJJJMMTThhmmss Wert“ in UTC+1; -777 steht für „kein gültiger Wert“.
async function oberoesterreich(out: Werte) {
  const text = await (await fetchSource(OOE_URL)).text();
  const latest = new Map<string, { t: string; v: number }>();
  let id = '';
  for (const line of text.split('\n')) {
    if (line.startsWith('#')) {
      const m = line.match(/SANR([^|]+)\|/);
      if (m) id = `ooe-${m[1].trim()}`;
      continue;
    }
    const [t, raw] = line.trim().split(/\s+/);
    const v = Number(raw);
    if (!id || !/^\d{14}$/.test(t ?? '') || !Number.isFinite(v) || v === -777) continue;
    const prev = latest.get(id);
    if (!prev || t > prev.t) latest.set(id, { t, v });
  }
  for (const [sid, { t, v }] of latest) {
    const stand = new Date(`${t.slice(0, 4)}-${t.slice(4, 6)}-${t.slice(6, 8)}T${t.slice(8, 10)}:${t.slice(10, 12)}:${t.slice(12, 14)}+01:00`);
    add(out, sid, v, stand);
  }
}

// ── Missbrauchsschutz ────────────────────────────────────────────────────────
// Analog zu /api/brouter: diese Route ruft fremde Gratis-Datenquellen in
// unserem Namen auf. Der 15-Minuten-Cache (next.revalidate) hält die Last bei
// den Landesdiensten ohnehin niedrig, das Rate-Limit ist nur zusätzliche
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

export async function GET(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ messwerte: {} }, { status: 403 });
  }
  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ messwerte: {} }, { status: 429 });
  }

  // Jede Quelle einzeln absichern: fällt ein Land aus, liefern die anderen trotzdem.
  // Ohne Wert fällt der Client auf saisonale Richtwerte zurück bzw. blendet die Anzeige aus.
  const messwerte: Werte = {};
  await Promise.allSettled([kaernten(messwerte), salzburg(messwerte), oberoesterreich(messwerte)]);

  return NextResponse.json(
    {
      messwerte,
      quelle: 'Hydrographische Dienste Kärnten, Salzburg und Oberösterreich (CC BY 4.0)',
    },
    { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=1800' } }
  );
}
