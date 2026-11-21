// Kartenausschnitte der Bundesländer für /karte (Auswahl „Ansicht“ im Bedienfeld und
// Deep-Link /karte?region=<slug>, z. B. von den Regionsseiten). Reine Daten, client-tauglich.
//
// Die Rechtecke sind grob gerundete Umrisse (Süd-West- und Nord-Ost-Ecke) und dienen nur dazu,
// das Land ins Bild zu rücken – keine Grenzangabe. Tirol schließt Osttirol mit ein.

export type KarteRegion = {
  slug: string;
  name: string;
  bounds: [[number, number], [number, number]];
};

export const AUSTRIA_BOUNDS: [[number, number], [number, number]] = [[46.37, 9.53], [49.02, 17.16]];

// Alphabetisch, so erscheinen sie auch in der Auswahl.
export const KARTE_REGIONEN: KarteRegion[] = [
  { slug: 'burgenland',        name: 'Burgenland',       bounds: [[46.83, 16.0],  [48.12, 17.16]] },
  { slug: 'kaernten',          name: 'Kärnten',          bounds: [[46.37, 12.65], [47.13, 15.07]] },
  { slug: 'niederoesterreich', name: 'Niederösterreich', bounds: [[47.42, 14.45], [49.02, 17.07]] },
  { slug: 'oberoesterreich',   name: 'Oberösterreich',   bounds: [[47.46, 12.75], [48.77, 14.99]] },
  { slug: 'salzburg',          name: 'Salzburg',         bounds: [[46.94, 12.08], [48.04, 13.99]] },
  { slug: 'steiermark',        name: 'Steiermark',       bounds: [[46.61, 13.56], [47.83, 16.17]] },
  { slug: 'tirol',             name: 'Tirol',            bounds: [[46.65, 10.1],  [47.75, 12.97]] },
  { slug: 'vorarlberg',        name: 'Vorarlberg',       bounds: [[46.84, 9.53],  [47.6, 10.24]] },
  { slug: 'wien',              name: 'Wien',             bounds: [[48.12, 16.18], [48.32, 16.58]] },
];

/** Kartenausschnitt zu einem Regions-Slug (aus der URL, daher beliebiger Text), sonst undefined. */
export function karteRegion(slug: string | null | undefined): KarteRegion | undefined {
  if (!slug) return undefined;
  return KARTE_REGIONEN.find((r) => r.slug === slug);
}

// Kategorie-Filter der Ebene „Ausflugsziele“ (Bedienfeld und Deep-Link /karte?kat=baden bzw.
// ?kat=wandern,baden, z. B. von den Kategorie-Abschnitten der Regionsseiten). `name` ist die
// Post-Kategorie, `slug` der URL-Teil.
export const KARTE_KATEGORIEN: { name: string; slug: string }[] = [
  { name: 'Wandern',    slug: 'wandern' },
  { name: 'Baden',      slug: 'baden' },
  { name: 'Ausflug',    slug: 'ausflug' },
  { name: 'Unterkunft', slug: 'unterkunft' },
];

export const ALLE_KARTE_KATEGORIEN = KARTE_KATEGORIEN.map((k) => k.name);

/** Aktive Kategorien aus dem URL-Parameter `kat` (beliebiger Text). Fehlt er oder passt
 *  nichts, sind alle aktiv – ein Tippfehler im Link soll nie eine leere Karte ergeben. */
export function karteKategorien(param: string | null | undefined): string[] {
  if (!param) return ALLE_KARTE_KATEGORIEN;
  const wanted = param.toLowerCase().split(',').map((s) => s.trim());
  const found = KARTE_KATEGORIEN.filter((k) => wanted.includes(k.slug)).map((k) => k.name);
  return found.length ? found : ALLE_KARTE_KATEGORIEN;
}

/** URL-Wert für die aktiven Kategorien; null, wenn alle (oder keine) aktiv sind. */
export function karteKategorienParam(aktiv: string[]): string | null {
  if (!aktiv.length || aktiv.length >= KARTE_KATEGORIEN.length) return null;
  return KARTE_KATEGORIEN.filter((k) => aktiv.includes(k.name)).map((k) => k.slug).join(',');
}
