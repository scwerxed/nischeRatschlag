type Season = { key: string; label: string; greeting: string; cta: string; icon: string };

const SEASONS: Season[] = [
  { key: 'winter',   label: 'Winter',    greeting: 'Winterzauber in den Alpen',          cta: 'Winterwanderungen entdecken',  icon: '❄️' },
  { key: 'fruehling',label: 'Frühling',  greeting: 'Der Frühling erwacht in Österreich', cta: 'Frühlingsausflüge entdecken',  icon: '🌱' },
  { key: 'sommer',   label: 'Sommer',    greeting: 'Badesaison in Österreich',           cta: 'Die besten Badeseen finden',   icon: '☀️' },
  { key: 'herbst',   label: 'Herbst',    greeting: 'Goldener Herbst in den Bergen',      cta: 'Herbstwanderungen entdecken',  icon: '🍂' },
];

export function currentSeason(): Season {
  const m = new Date().getMonth() + 1;
  if (m >= 3 && m <= 5) return SEASONS[1];
  if (m >= 6 && m <= 8) return SEASONS[2];
  if (m >= 9 && m <= 11) return SEASONS[3];
  return SEASONS[0];
}

// ── Saison-Ampel ─────────────────────────────────────────────────────────────
// Leitet aus dem bereits vorhandenen `bestSeason`-Text jedes Posts (z. B.
// "Mai–Oktober", "Ganzjährig", "Dezember–März & Juni–September") ab, ob der
// aktuelle Monat in der besten Reisezeit liegt. Keine neuen Fakten – nur eine
// Einordnung des Textes, der ohnehin schon redaktionell geprüft in posts.ts steht.

const MONTH_NAMES = [
  'januar', 'februar', 'märz', 'april', 'mai', 'juni',
  'juli', 'august', 'september', 'oktober', 'november', 'dezember',
];

export type SeasonStatus = 'jetzt' | 'randzeit' | 'ungeeignet';

function monthIndex(name: string): number {
  return MONTH_NAMES.indexOf(name.toLowerCase());
}

// Findet alle "Monat–Monat"-Bereiche im Text (mehrere möglich, z. B. bei
// "Dezember–März & Juni–September" oder "April–Mai, September–Oktober").
function parseRanges(text: string): [number, number][] {
  const ranges: [number, number][] = [];
  const re = /([a-zäöü]+)\s*[–-]\s*([a-zäöü]+)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const a = monthIndex(m[1]);
    const b = monthIndex(m[2]);
    if (a !== -1 && b !== -1) ranges.push([a, b]);
  }
  return ranges;
}

// Berücksichtigt Bereiche, die über den Jahreswechsel gehen (z. B. Dezember–März).
function inRange(month: number, [start, end]: [number, number]): boolean {
  return start <= end ? month >= start && month <= end : month >= start || month <= end;
}

/**
 * Ordnet den aktuellen Monat einer Ampel zu:
 * - "jetzt": "Ganzjährig" im Text, oder der Monat liegt in einem der Bereiche
 * - "randzeit": ein Monat vor/nach einem Bereich (Übergangszeit)
 * - "ungeeignet": deutlich außerhalb aller Bereiche
 * Liefert `undefined`, wenn der Text nicht sicher auswertbar ist – dann lieber
 * keine Ampel zeigen als eine falsche Einschätzung riskieren.
 */
export function seasonStatus(bestSeason: string | undefined, now: Date = new Date()): SeasonStatus | undefined {
  if (!bestSeason) return undefined;
  if (/ganzjährig/i.test(bestSeason)) return 'jetzt';

  const ranges = parseRanges(bestSeason);
  if (ranges.length === 0) return undefined;

  const month = now.getMonth();
  if (ranges.some((r) => inRange(month, r))) return 'jetzt';

  const prevMonth = (month + 11) % 12;
  const nextMonth = (month + 1) % 12;
  if (ranges.some((r) => inRange(prevMonth, r) || inRange(nextMonth, r))) return 'randzeit';

  return 'ungeeignet';
}

export const SEASON_LABEL: Record<SeasonStatus, { emoji: string; label: string; cls: string; dot: string }> = {
  jetzt:      { emoji: '🟢', label: 'Jetzt ideal',         cls: 'bg-green-50 text-green-700 border-green-200',   dot: 'bg-green-500' },
  randzeit:   { emoji: '🟡', label: 'Geht, Übergangszeit', cls: 'bg-yellow-50 text-yellow-700 border-yellow-200', dot: 'bg-yellow-400' },
  ungeeignet: { emoji: '🔴', label: 'Aktuell eher ungünstig', cls: 'bg-red-50 text-red-700 border-red-200',        dot: 'bg-red-400' },
};
