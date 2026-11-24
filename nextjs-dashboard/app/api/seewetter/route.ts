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
// Seit Herbst 2026 per 301 von data.ooe.gv.at/files/hydro/… hierher umgezogen.
const OOE_URL = 'https://www.land-oberoesterreich.gv.at/files/ogd/hydro/HDOOE_Export_WT.zrxp';

// Die Function muss in Frankfurt laufen statt im Vercel-Standard (Washington): der Kärntner Server
// antwortet Anfragen aus den USA nicht (TimeoutError). Das regelt `"regions": ["fra1"]` in vercel.json
// (gilt für alle Functions) – ein `preferredRegion` hier ist veraltet und auf dem Hobby-Plan wirkungslos.

/** Ältere Werte (z. B. ausgefallene Station) werden verworfen, statt veraltet als „live“ zu erscheinen. */
const MAX_ALTER_MS = 72 * 60 * 60 * 1000;

const KNOWN_IDS = new Set(SEE_MESSSTELLEN.map((m) => m.id));

type Werte = Record<string, SeeMesswert>;

function frisch(stand: Date, wasser: number): boolean {
  const t = stand.getTime();
  return Number.isFinite(t) && Date.now() - t < MAX_ALTER_MS && Number.isFinite(wasser) && wasser > -5 && wasser < 40;
}

const STUNDE_MS = 60 * 60 * 1000;

/** Ein Punkt der Zeitreihe: Zeit in ms, Wassertemperatur in °C. */
type Punkt = { t: number; v: number };

/**
 * Vergleichswert für die Trend-Anzeige („seit gestern“): der Punkt der Zeitreihe, der am nächsten an
 * „aktueller Stand − 24 h“ liegt, aber 12 bis 36 Stunden vor dem aktuellen Wert. Kärnten liefert rund 24 h
 * (nur die Punkte, an denen sich der Wert ändert – der früheste liegt also teils erst 16–20 h zurück),
 * Oberösterreich rund 48 h im 15-Minuten-Takt, Salzburg nur den letzten Wert (→ kein Vergleich).
 * Die Oberfläche nennt deshalb immer Datum und Uhrzeit des Vergleichswerts, nie „vor genau 24 Stunden“.
 */
function vergleichswert(reihe: Punkt[], stand: Date): SeeMesswert['vorher'] {
  const jetzt = stand.getTime();
  let best: Punkt | undefined;
  for (const p of reihe) {
    const abstand = jetzt - p.t;
    if (!Number.isFinite(abstand) || abstand < 12 * STUNDE_MS || abstand > 36 * STUNDE_MS) continue;
    if (!Number.isFinite(p.v) || p.v <= -5 || p.v >= 40) continue;
    if (!best || Math.abs(abstand - 24 * STUNDE_MS) < Math.abs(jetzt - best.t - 24 * STUNDE_MS)) best = p;
  }
  return best ? { wasser: Math.round(best.v * 10) / 10, stand: new Date(best.t).toISOString() } : undefined;
}

function add(out: Werte, id: string, wasser: number, stand: Date, reihe: Punkt[] = []) {
  if (!KNOWN_IDS.has(id) || !frisch(stand, wasser)) return;
  const vorher = vergleichswert(reihe, stand);
  out[id] = { wasser: Math.round(wasser * 10) / 10, stand: stand.toISOString(), ...(vorher ? { vorher } : {}) };
}

// Bewusst `no-store` statt `next: { revalidate }`: Der Next-Data-Cache liefert nach einer ruhigen Phase
// zuerst die alte Kopie aus (Stale-while-revalidate ohne Altersgrenze) – waren deren Werte älter als
// MAX_ALTER_MS, kam eine leere Antwort zurück. Gecacht wird stattdessen die fertige Antwort im CDN
// (s-maxage unten), deren Alter damit klar begrenzt ist.
async function fetchSource(url: string): Promise<Response> {
  const res = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`upstream ${res.status}`);
  return res;
}

async function kaernten(out: Werte) {
  const data = await (await fetchSource(KTN_URL)).json();
  const features: any[] = Array.isArray(data?.features) ? data.features : [];
  for (const f of features) {
    const p = f?.properties ?? {};
    if (typeof p.letzter_wert_wt === 'number' && typeof p.letzter_wert_wt_date === 'string') {
      // Verlauf der letzten rund 24 h: [{ date: ISO-Zeit, value: °C }]
      const verlauf: any[] = Array.isArray(p.werte?.wassertemperatur) ? p.werte.wassertemperatur : [];
      const reihe: Punkt[] = verlauf.map((x) => ({
        t: typeof x?.date === 'string' ? new Date(x.date).getTime() : NaN,
        v: typeof x?.value === 'number' ? x.value : NaN,
      }));
      add(out, `ktn-${p.id}`, p.letzter_wert_wt, new Date(p.letzter_wert_wt_date), reihe);
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
// „JJJJMMTThhmmss Wert“ in UTC+1 (rund 48 h im 15-Minuten-Takt); -777 steht für „kein gültiger Wert“.
function zrxpZeit(t: string): Date {
  return new Date(`${t.slice(0, 4)}-${t.slice(4, 6)}-${t.slice(6, 8)}T${t.slice(8, 10)}:${t.slice(10, 12)}:${t.slice(12, 14)}+01:00`);
}

async function oberoesterreich(out: Werte) {
  const text = await (await fetchSource(OOE_URL)).text();
  // Nur die Reihen unserer Stationen sammeln (die Datei enthält rund 150, meist Flüsse).
  const reihen = new Map<string, { t: string; v: number }[]>();
  let id = '';
  for (const line of text.split('\n')) {
    if (line.startsWith('#')) {
      const m = line.match(/SANR([^|]+)\|/);
      if (m) id = `ooe-${m[1].trim()}`;
      continue;
    }
    if (!KNOWN_IDS.has(id)) continue;
    const [t, raw] = line.trim().split(/\s+/);
    const v = Number(raw);
    if (!/^\d{14}$/.test(t ?? '') || !Number.isFinite(v) || v === -777) continue;
    const reihe = reihen.get(id);
    if (reihe) reihe.push({ t, v });
    else reihen.set(id, [{ t, v }]);
  }
  for (const [sid, reihe] of reihen) {
    const letzter = reihe.reduce((a, b) => (b.t > a.t ? b : a));
    add(out, sid, letzter.v, zrxpZeit(letzter.t), reihe.map((p) => ({ t: zrxpZeit(p.t).getTime(), v: p.v })));
  }
}

// ── Missbrauchsschutz ────────────────────────────────────────────────────────
// Analog zu /api/brouter: diese Route ruft fremde Gratis-Datenquellen in
// unserem Namen auf. Der CDN-Cache der Antwort (s-maxage, höchstens rund
// 15 Minuten alt) hält die Last bei den Landesdiensten ohnehin niedrig, das
// Rate-Limit ist nur zusätzliche Absicherung gegen direktes Traffic-Abgreifen.

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
  const quellen = ['ktn', 'sbg', 'ooe'] as const;
  const results = await Promise.allSettled([kaernten(messwerte), salzburg(messwerte), oberoesterreich(messwerte)]);
  // Welche Quelle ist ausgefallen? Nur die Kennung + Fehlertyp (z. B. TimeoutError), keine Details.
  const ausfall = results.flatMap((r, i) =>
    r.status === 'rejected' ? [`${quellen[i]}: ${r.reason instanceof Error ? r.reason.name : 'Fehler'}`] : []
  );

  // Vollständige Antwort: 10 Min. im CDN (+ 5 Min. stale), im Browser 2 Min. Ist eine Quelle
  // ausgefallen, nur kurz cachen, damit die fehlenden Seen bald wieder erscheinen.
  const cacheControl = ausfall.length === 0
    ? 'public, max-age=120, s-maxage=600, stale-while-revalidate=300'
    : 'public, max-age=60, s-maxage=60';

  return NextResponse.json(
    {
      messwerte,
      ausfall,
      quelle: 'Hydrographische Dienste Kärnten, Salzburg und Oberösterreich (CC BY 4.0)',
    },
    { headers: { 'Cache-Control': cacheControl } }
  );
}
