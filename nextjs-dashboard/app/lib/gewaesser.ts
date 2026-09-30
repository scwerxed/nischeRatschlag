import type { Post } from '@/app/lib/posts';
import { coordsOf, distKm } from '@/app/lib/wochenendtrip';
import { SEE_MESSSTELLEN, type SeeMessstelle } from '@/app/lib/seen-messstellen';

// Serverseitige Helfer für Gewässer-Daten auf Artikelseiten:
//  1. Welche Live-See-Messstelle passt zu einem Artikel?  (Werte kommen clientseitig über /api/seewetter)
//  2. Offizielle Badegewässer-Qualität der AGES für Bade-Artikel (EU-Badegewässerrichtlinie).

function normalize(s: string): string {
  return s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
}

/** Maximaler Abstand Artikel-Startpunkt ↔ Messstelle (große Seen wie Attersee/Ossiacher See brauchen Spielraum). */
const SEE_MAX_KM = 8;

export type MessstelleTreffer = SeeMessstelle & { km: number };

/**
 * Live-Messstellen für einen Artikel: nur Seen, deren Name im Titel/Slug/Excerpt vorkommt UND deren
 * Messstelle nahe am Startpunkt liegt (verhindert z. B. „Längsee“ bei Burg Hochosterwitz).
 * Liefert alle Stationen des nächstgelegenen passenden Sees, nächste zuerst – der Client nimmt die
 * erste mit aktuellem Wert (fällt eine Station aus, springt die nächste am selben See ein).
 */
export function seeMessstellenFuer(post: Post): MessstelleTreffer[] {
  const c = coordsOf(post);
  if (!c) return [];
  const text = normalize(`${post.slug} ${post.title} ${post.excerpt}`);
  const treffer = SEE_MESSSTELLEN
    .filter((m) => new RegExp(m.match).test(text))
    .map((m) => ({ ...m, km: distKm(c, [m.lat, m.lng]) }))
    .filter((m) => m.km <= SEE_MAX_KM)
    .sort((a, b) => a.km - b.km);
  if (treffer.length === 0) return [];
  return treffer.filter((m) => m.see === treffer[0].see);
}

// ── AGES Badegewässer ────────────────────────────────────────────────────────
// Offizielle Messungen aller rund 260 EU-Badestellen Österreichs (E. coli, Enterokokken,
// Wassertemperatur, Sichttiefe; mind. 5 Proben je Saison) + jährliche Qualitätseinstufung.
// Quelle: AGES, Open Government Data, CC BY 3.0 AT (data.gv.at, „österreichische Badegewässer“).
const AGES_URL = 'https://www.ages.at/typo3temp/badegewaesser_db.json';
const AGES_MAX_KM = 2.5;

/** Einstufungs-Codes im AGES-Feed; Zuordnung per Abgleich mit dem offiziellen Bericht 2025 (251/7/1/1). */
export const AGES_EINSTUFUNG: Record<string, { label: string; tone: 'gut' | 'mittel' | 'schlecht' }> = {
  A: { label: 'ausgezeichnet', tone: 'gut' },
  B: { label: 'gut', tone: 'gut' },
  C: { label: 'ausreichend', tone: 'mittel' },
  D: { label: 'mangelhaft', tone: 'schlecht' },
};

export type Badestelle = {
  name: string;
  gemeinde: string;
  km: number;
  gesperrt: boolean;
  sperrgrund: string;
  einstufung?: { jahr: number; code: string };
  letzteProbe?: { datum: string; wasser: number | null; sichttiefe: number | null };
  probenSaison: number;
};

type AgesSpot = {
  BADEGEWAESSERID?: string;
  BADEGEWAESSERNAME?: string;
  GEMEINDE?: string;
  LATITUDE?: string;
  LONGITUDE?: string;
  TGESPERRT?: string;
  SPERRGRUND?: string;
  MESSWERTE?: { D?: string; W?: number | null; S?: number | null }[];
  [key: string]: unknown;
};

// Pro Server-Instanz einmal laden (≈300 KB) statt je Artikelseite; nach einer Stunde neu.
// Bei einem Fehler liefert loadAges() eine leere Liste – die Seite rendert dann ohne AGES-Karte.
let agesCache: { at: number; data: Promise<AgesSpot[]> } | undefined;

async function loadAges(): Promise<AgesSpot[]> {
  try {
    const res = await fetch(AGES_URL, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(10000) });
    if (!res.ok) return [];
    const json = await res.json();
    const laender: any[] = Array.isArray(json?.BUNDESLAENDER) ? json.BUNDESLAENDER : [];
    return laender.flatMap((l) => (Array.isArray(l?.BADEGEWAESSER) ? l.BADEGEWAESSER : []));
  } catch {
    return [];
  }
}

function agesSpots(): Promise<AgesSpot[]> {
  if (!agesCache || Date.now() - agesCache.at > 60 * 60 * 1000) {
    agesCache = { at: Date.now(), data: loadAges() };
  }
  return agesCache.data;
}

/** „20.08.2026“ → sortierbarer Schlüssel „20260820“. */
function dateKey(d: string): string {
  const [dd, mm, yyyy] = d.split('.');
  return `${yyyy}${mm}${dd}`;
}

/** Nächste offizielle Badestelle (≤ 2,5 km) zu einem Bade-Artikel, sonst `undefined`. */
export async function badestelleFuer(post: Post): Promise<Badestelle | undefined> {
  if (post.category !== 'Baden') return undefined;
  const c = coordsOf(post);
  if (!c) return undefined;

  let best: { spot: AgesSpot; km: number } | undefined;
  for (const spot of await agesSpots()) {
    const lat = Number(spot.LATITUDE);
    const lng = Number(spot.LONGITUDE);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
    const km = distKm(c, [lat, lng]);
    if (km <= AGES_MAX_KM && (!best || km < best.km)) best = { spot, km };
  }
  if (!best) return undefined;
  return toBadestelle(best.spot, best.km);
}

/**
 * Offizielle Badestellen per AGES-ID (`BADEGEWAESSERID`) – für kuratierte Listen wie den
 * Badeplatz-Check, deren Einträge fest einer Messstelle zugeordnet sind. Unbekannte IDs fehlen im Ergebnis.
 */
export async function badestellenById(ids: string[]): Promise<Record<string, Badestelle>> {
  const wanted = new Set(ids);
  const result: Record<string, Badestelle> = {};
  for (const spot of await agesSpots()) {
    const id = spot.BADEGEWAESSERID;
    if (typeof id === 'string' && wanted.has(id)) result[id] = toBadestelle(spot, 0);
  }
  return result;
}

function toBadestelle(spot: AgesSpot, km: number): Badestelle {
  // Jüngste vorhandene Jahres-Einstufung (Felder QUALITAET_JJJJ, das laufende Jahr ist bis Saisonende leer).
  let einstufung: Badestelle['einstufung'];
  for (const [key, value] of Object.entries(spot)) {
    const m = key.match(/^QUALITAET_(\d{4})$/);
    if (m && typeof value === 'string' && AGES_EINSTUFUNG[value] && (!einstufung || Number(m[1]) > einstufung.jahr)) {
      einstufung = { jahr: Number(m[1]), code: value };
    }
  }

  const proben = (Array.isArray(spot.MESSWERTE) ? spot.MESSWERTE : [])
    .filter((p) => typeof p.D === 'string' && /^\d{2}\.\d{2}\.\d{4}$/.test(p.D))
    .sort((a, b) => dateKey(b.D as string).localeCompare(dateKey(a.D as string)));
  const letzte = proben[0];
  const saison = letzte ? (letzte.D as string).slice(6) : '';

  return {
    name: spot.BADEGEWAESSERNAME ?? 'Badestelle',
    gemeinde: spot.GEMEINDE ?? '',
    km,
    gesperrt: spot.TGESPERRT === '1',
    sperrgrund: spot.SPERRGRUND ?? '',
    einstufung,
    letzteProbe: letzte
      ? {
          datum: letzte.D as string,
          wasser: typeof letzte.W === 'number' ? letzte.W : null,
          sichttiefe: typeof letzte.S === 'number' ? letzte.S : null,
        }
      : undefined,
    probenSaison: proben.filter((p) => (p.D as string).endsWith(saison)).length,
  };
}
