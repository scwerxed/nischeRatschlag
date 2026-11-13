import type { Badestelle } from '@/app/lib/gewaesser';

/**
 * Bundesländer der Seiten /badeseen/[bundesland]. `name` ist zugleich die Schreibweise im AGES-Feed,
 * `wo` die Ortsangabe im Satz („in der Steiermark“, „im Burgenland“).
 */
export const BADESEEN_LAENDER: { slug: string; name: string; wo: string }[] = [
  { slug: 'kaernten', name: 'Kärnten', wo: 'in Kärnten' },
  { slug: 'salzburg', name: 'Salzburg', wo: 'in Salzburg' },
  { slug: 'oberoesterreich', name: 'Oberösterreich', wo: 'in Oberösterreich' },
  { slug: 'steiermark', name: 'Steiermark', wo: 'in der Steiermark' },
  { slug: 'tirol', name: 'Tirol', wo: 'in Tirol' },
  { slug: 'niederoesterreich', name: 'Niederösterreich', wo: 'in Niederösterreich' },
  { slug: 'burgenland', name: 'Burgenland', wo: 'im Burgenland' },
  { slug: 'vorarlberg', name: 'Vorarlberg', wo: 'in Vorarlberg' },
  { slug: 'wien', name: 'Wien', wo: 'in Wien' },
];

export type Gewaesser = { name: string; stellen: Badestelle[] };

/**
 * Fasst Badestellen nach Gewässer zusammen. Die AGES benennt sie meist „Gewässer, Badestelle“
 * (z. B. „Wörthersee, Strandbad Velden“) – der Teil vor dem ersten Komma ist das Gewässer.
 * Sortiert nach Anzahl der Badestellen, dann alphabetisch.
 */
export function nachGewaesser(stellen: Badestelle[]): Gewaesser[] {
  const map = new Map<string, Badestelle[]>();
  for (const s of stellen) {
    const name = s.name.split(',')[0].trim() || s.name;
    const liste = map.get(name);
    if (liste) liste.push(s);
    else map.set(name, [s]);
  }
  return [...map.entries()]
    .map(([name, liste]) => ({ name, stellen: liste }))
    .sort((a, b) => b.stellen.length - a.stellen.length || a.name.localeCompare(b.name, 'de'));
}

/** Bezeichnung der einzelnen Badestelle innerhalb ihres Gewässers (Teil nach dem Komma, sonst die Gemeinde). */
export function stellenName(s: Badestelle): string {
  const rest = s.name.split(',').slice(1).join(',').trim();
  return rest || s.gemeinde || s.name;
}
