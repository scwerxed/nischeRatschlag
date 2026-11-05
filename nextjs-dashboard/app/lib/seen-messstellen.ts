// Offizielle See-Messstellen mit Live-Wassertemperatur (Hydrographische Dienste der Länder).
// Reine Daten ohne Imports – wird von /api/seewetter (Werte holen), app/lib/gewaesser.ts
// (Messstelle zu einem Artikel finden) und den Seen-Steckbriefen /wassertemperatur/[see] gemeinsam genutzt.
//
// Quellen (alle kostenlos, ohne API-Key, Open Government Data):
//   ktn – Hydrographischer Dienst Kärnten, GeoJSON          (CC BY 4.0, Land Kärnten – data.gv.at)
//   sbg – Hydrographischer Dienst Salzburg, JSON            (CC BY 4.0, Land Salzburg)
//   ooe – Hydrographischer Dienst Oberösterreich, ZRXP-Text (CC BY 4.0, Land Oberösterreich – data.gv.at)
//
// `id` = Quelle + Kennung im jeweiligen Feed (ktn: properties.id, sbg: number, ooe: SANR).
// `match` = Suchbegriff (Regex, klein, Umlaute ausgeschrieben) für Titel/Slug/Excerpt eines Artikels –
// und für die Namen der AGES-Badestellen (/wassertemperatur: welche Badestelle liegt an einem See mit
// Live-Messstelle?). Dort heißt der Irrsee „Irr- oder Zellersee“, daher die zweite Variante.
// Mondsee und Attersee-Unterach stehen in Salzburg UND Oberösterreich im Feed (dieselbe Station) –
// hier nur einmal (Salzburg) geführt.

export type SeeQuelle = 'ktn' | 'sbg' | 'ooe';

export type SeeMessstelle = {
  id: string;
  quelle: SeeQuelle;
  see: string;
  ort: string;
  lat: number;
  lng: number;
  match: string;
};

export const QUELLEN_LABEL: Record<SeeQuelle, string> = {
  ktn: 'Hydrographischer Dienst Kärnten',
  sbg: 'Hydrographischer Dienst Salzburg',
  ooe: 'Hydrographischer Dienst Oberösterreich',
};

export const SEE_MESSSTELLEN: SeeMessstelle[] = [
  // ── Kärnten ──────────────────────────────────────────────────────────────
  { id: 'ktn-2900120', quelle: 'ktn', see: 'Afritzer See',       ort: 'Afritz',              lat: 46.738914, lng: 13.773286, match: 'afritz' },
  { id: 'ktn-2001042', quelle: 'ktn', see: 'Faaker See',         ort: 'Faak',                lat: 46.577463, lng: 13.91421,  match: 'faak' },
  { id: 'ktn-2900121', quelle: 'ktn', see: 'Brennsee (Feldsee)', ort: 'Feld am See',         lat: 46.772631, lng: 13.747611, match: 'brennsee|feld am see' },
  { id: 'ktn-2002235', quelle: 'ktn', see: 'Gösselsdorfer See',  ort: 'Gösselsdorf',         lat: 46.565756, lng: 14.61973,  match: 'goesselsdorf' },
  { id: 'ktn-2002201', quelle: 'ktn', see: 'Keutschacher See',   ort: 'Keutschach',          lat: 46.588374, lng: 14.168111, match: 'keutschach' },
  { id: 'ktn-2001088', quelle: 'ktn', see: 'Klopeiner See',      ort: 'Unterburg',           lat: 46.604626, lng: 14.595535, match: 'klopein' },
  { id: 'ktn-2002224', quelle: 'ktn', see: 'Längsee',            ort: 'St. Georgen',         lat: 46.785567, lng: 14.41969,  match: 'laengsee' },
  { id: 'ktn-2900132', quelle: 'ktn', see: 'Maltschacher See',   ort: 'Briefelsdorf',        lat: 46.704258, lng: 14.144914, match: 'maltschach' },
  { id: 'ktn-2001018', quelle: 'ktn', see: 'Millstätter See',    ort: 'Millstatt',           lat: 46.80151,  lng: 13.571331, match: 'millstaett' },
  { id: 'ktn-2001082', quelle: 'ktn', see: 'Ossiacher See',      ort: 'St. Andrä',           lat: 46.651912, lng: 13.902914, match: 'ossiach' },
  { id: 'ktn-2001037', quelle: 'ktn', see: 'Pressegger See',     ort: 'Presseggen',          lat: 46.628361, lng: 13.438264, match: 'pressegg' },
  { id: 'ktn-2002213', quelle: 'ktn', see: 'Rauschelesee',       ort: 'Keutschach',          lat: 46.586104, lng: 14.219993, match: 'rauschele' },
  { id: 'ktn-2900222', quelle: 'ktn', see: 'Turnersee',          ort: 'Obersammelsdorf',     lat: 46.587692, lng: 14.572778, match: 'turnersee' },
  { id: 'ktn-2001022', quelle: 'ktn', see: 'Weißensee',          ort: 'Techendorf',          lat: 46.715558, lng: 13.294456, match: 'weissensee' },
  { id: 'ktn-2001056', quelle: 'ktn', see: 'Wörthersee',         ort: 'Pörtschach',          lat: 46.6342,   lng: 14.138018, match: 'woerthersee' },

  // ── Salzburg ─────────────────────────────────────────────────────────────
  { id: 'sbg-203653', quelle: 'sbg', see: 'Fuschlsee',       ort: 'Fuschl am See',   lat: 47.797975, lng: 13.299203, match: 'fuschl' },
  { id: 'sbg-204131', quelle: 'sbg', see: 'Grabensee',       ort: 'Grabensee',       lat: 47.982820, lng: 13.083534, match: 'grabensee' },
  { id: 'sbg-203604', quelle: 'sbg', see: 'Mattsee',         ort: 'Mattsee',         lat: 47.971357, lng: 13.106759, match: 'mattsee' },
  { id: 'sbg-205286', quelle: 'sbg', see: 'Mondsee',         ort: 'Mondsee',         lat: 47.849380, lng: 13.342431, match: 'mondsee' },
  { id: 'sbg-203612', quelle: 'sbg', see: 'Obertrumer See',  ort: 'Obertrum',        lat: 47.942858, lng: 13.069808, match: 'obertrum' },
  { id: 'sbg-203646', quelle: 'sbg', see: 'Wolfgangsee',     ort: 'St. Gilgen',      lat: 47.766614, lng: 13.368594, match: 'wolfgang' },
  { id: 'sbg-205328', quelle: 'sbg', see: 'Attersee',        ort: 'Unterach',        lat: 47.804722, lng: 13.490556, match: 'attersee' },
  { id: 'sbg-203588', quelle: 'sbg', see: 'Wallersee',       ort: 'Seepegel',        lat: 47.915867, lng: 13.157709, match: 'wallersee' },
  { id: 'sbg-203117', quelle: 'sbg', see: 'Zeller See',      ort: 'Zell am See',     lat: 47.322758, lng: 12.800178, match: 'zeller see|zell am see' },

  // ── Oberösterreich (Koordinaten aus BMN M31 der OÖ-Messstellenliste umgerechnet) ──
  { id: 'ooe-5290', quelle: 'ooe', see: 'Attersee',        ort: 'Kammer',            lat: 47.94355, lng: 13.59440, match: 'attersee' },
  { id: 'ooe-5250', quelle: 'ooe', see: 'Attersee',        ort: 'Weißenbach',        lat: 47.81452, lng: 13.54710, match: 'attersee' },
  { id: 'ooe-4590', quelle: 'ooe', see: 'Traunsee',        ort: 'Gmunden',           lat: 47.91496, lng: 13.79181, match: 'traunsee' },
  { id: 'ooe-4510', quelle: 'ooe', see: 'Traunsee',        ort: 'Ebensee',           lat: 47.81368, lng: 13.77632, match: 'traunsee' },
  { id: 'ooe-4130', quelle: 'ooe', see: 'Hallstätter See', ort: 'Hallstatt-Lahn',    lat: 47.55329, lng: 13.65217, match: 'hallst' },
  { id: 'ooe-4190', quelle: 'ooe', see: 'Hallstätter See', ort: 'Steeg',             lat: 47.60938, lng: 13.63487, match: 'hallst' },
  { id: 'ooe-4310', quelle: 'ooe', see: 'Wolfgangsee',     ort: 'Strobl',            lat: 47.72351, lng: 13.48488, match: 'wolfgang' },
  { id: 'ooe-5005', quelle: 'ooe', see: 'Irrsee',          ort: 'Zell am Moos',      lat: 47.90249, lng: 13.31273, match: 'irrsee|irr- oder zeller' },
  { id: 'ooe-6120', quelle: 'ooe', see: 'Almsee',          ort: 'Grünau im Almtal',  lat: 47.76676, lng: 13.95762, match: 'almsee' },
];

// ── Seen-Steckbriefe (/wassertemperatur/[see]) ─────────────────────────────

/** URL-Teil eines Sees: „Hallstätter See“ → „hallstaetter-see“, „Brennsee (Feldsee)“ → „brennsee-feldsee“. */
export function seeSlug(see: string): string {
  return see
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const QUELLE_REGION: Record<SeeQuelle, string> = { ktn: 'kaernten', sbg: 'salzburg', ooe: 'oberoesterreich' };

/**
 * Bundesland (Regions-Slug), wo es nicht das Land des ersten Messnetzes ist – laut den AGES-Badestellen am See:
 * Mondsee und Attersee liegen in Oberösterreich, der Wolfgangsee hat Badestellen in Salzburg und Oberösterreich.
 */
const SEE_REGIONEN: Record<string, string[]> = {
  Mondsee: ['oberoesterreich'],
  Attersee: ['oberoesterreich'],
  Wolfgangsee: ['salzburg', 'oberoesterreich'],
};

export type LiveSee = { slug: string; see: string; regionen: string[]; match: string; stationen: SeeMessstelle[] };

/** Jeder See mit Live-Messstelle genau einmal (Stationen in Listenreihenfolge), alphabetisch. */
export const LIVE_SEEN: LiveSee[] = Object.values(
  SEE_MESSSTELLEN.reduce<Record<string, LiveSee>>((acc, m) => {
    const eintrag = (acc[m.see] ??= {
      slug: seeSlug(m.see),
      see: m.see,
      regionen: SEE_REGIONEN[m.see] ?? [QUELLE_REGION[m.quelle]],
      match: m.match,
      stationen: [],
    });
    eintrag.stationen.push(m);
    return acc;
  }, {}),
).sort((a, b) => a.see.localeCompare(b.see, 'de'));

/** Live-Messwert einer Station, wie ihn /api/seewetter liefert. */
export type SeeMesswert = { wasser: number; stand: string };

// ── Seen ohne Live-Messstelle, aber mit offiziellen Proben (AGES) ───────────
// Bekannte Badeseen ohne offenes Live-Messnetz (v. a. Tirol, Steiermark, Burgenland, Wien, Vorarlberg) bekommen
// ebenfalls einen Steckbrief – Wassertemperatur und Qualität dann nur aus den AGES-Proben der EU-Badestellen.
// Aufgenommen sind Seen mit eigenem Artikel oder mehreren EU-Badestellen. `match` wie oben: Regex (klein, Umlaute
// ausgeschrieben) auf die AGES-Badestellennamen und auf Slug/Titel/Excerpt der Artikel; jede AGES-Badestelle darf
// nur zu einem See passen (z. B. „stausee… ottenstein“ statt „ottenstein“, sonst träfe es das Waldbad Rappottenstein).
// `punkt` = eine Badestelle am See laut AGES (für Abstände zwischen den Seen, auch wenn der Feed ausfällt).
// `dativ` nur bei weiblichen Gewässern („an der Alten Donau“), `schemaTyp` nur, wo es kein natürlicher See ist.

/** schema.org-Typ für das JSON-LD des Steckbriefs (Standard: LakeBodyOfWater). */
export type GewaesserTyp = 'LakeBodyOfWater' | 'Reservoir' | 'Canal';

export type ProbenSee = {
  slug: string;
  see: string;
  regionen: string[];
  match: string;
  punkt: [number, number];
  dativ?: string;
  schemaTyp?: GewaesserTyp;
};

const PROBEN_SEEN_DATEN: Omit<ProbenSee, 'slug'>[] = [
  { see: 'Achensee',           regionen: ['tirol'],             match: 'achensee',              punkt: [47.434398, 11.7257] },
  { see: 'Alte Donau',         regionen: ['wien'],              match: 'alte donau',            punkt: [48.2434, 16.417999], dativ: 'Alten Donau' },
  { see: 'Altausseer See',     regionen: ['steiermark'],        match: 'altausseer ?see',       punkt: [47.634799, 13.7782] },
  { see: 'Bodensee',           regionen: ['vorarlberg'],        match: 'bodensee',              punkt: [47.506599, 9.73427] },
  { see: 'Gleinkersee',        regionen: ['oberoesterreich'],   match: 'gleinker ?see',         punkt: [47.689498, 14.295399] },
  { see: 'Grundlsee',          regionen: ['steiermark'],        match: 'grundlsee',             punkt: [47.6217, 13.838399] },
  { see: 'Heiterwanger See',   regionen: ['tirol'],             match: 'heiterwang',            punkt: [47.456001, 10.7606] },
  { see: 'Hintersteiner See',  regionen: ['tirol'],             match: 'hintersteiner ?see',    punkt: [47.541999, 12.222299] },
  { see: 'Lunzer See',         regionen: ['niederoesterreich'], match: 'lunzer ?see',           punkt: [47.853401, 15.0444] },
  { see: 'Neue Donau',         regionen: ['wien'],              match: 'neue donau',            punkt: [48.2262, 16.416599], dativ: 'Neuen Donau', schemaTyp: 'Canal' },
  { see: 'Neusiedler See',     regionen: ['burgenland'],        match: 'neusiedler ?see',       punkt: [47.859699, 16.824499] },
  { see: 'Offensee',           regionen: ['oberoesterreich'],   match: 'offensee',              punkt: [47.750801, 13.8385] },
  { see: 'Plansee',            regionen: ['tirol'],             match: 'plansee',               punkt: [47.4855, 10.841899] },
  { see: 'Reintaler See',      regionen: ['tirol'],             match: 'reintaler ?see',        punkt: [47.4622, 11.8956] },
  { see: 'Stausee Ottenstein', regionen: ['niederoesterreich'], match: 'stausee[ ,-]*ottenstein', punkt: [48.590301, 15.322299], schemaTyp: 'Reservoir' },
  { see: 'Stubenbergsee',      regionen: ['steiermark'],        match: 'stubenberg',            punkt: [47.229801, 15.8027] },
  { see: 'Thiersee',           regionen: ['tirol'],             match: 'thiersee',              punkt: [47.5923, 12.1201] },
  { see: 'Walchsee',           regionen: ['tirol'],             match: 'walchsee',              punkt: [47.650798, 12.326299] },
];

export const PROBEN_SEEN: ProbenSee[] = PROBEN_SEEN_DATEN.map((s) => ({ ...s, slug: seeSlug(s.see) }));

// ── Alle Steckbriefe (/wassertemperatur/[see]) ──────────────────────────────

/** Satzbausteine: „der Achensee / am Achensee / zum Achensee / um den Achensee“, bei weiblichen Gewässern „die Alte Donau / an der Alten Donau …“. */
export type SeeFormen = { der: string; am: string; zum: string; den: string };

function seeFormen(see: string, dativ?: string): SeeFormen {
  return dativ
    ? { der: `die ${see}`, am: `an der ${dativ}`, zum: `zur ${dativ}`, den: `die ${see}` }
    : { der: `der ${see}`, am: `am ${see}`, zum: `zum ${see}`, den: `den ${see}` };
}

export type SteckbriefSee = {
  slug: string;
  see: string;
  regionen: string[];
  match: string;
  /** Live-Messstellen am See – leer bei Seen, die nur offizielle Proben haben. */
  stationen: SeeMessstelle[];
  /** Messstellen bzw. eine Badestelle laut Liste – für Abstände zwischen den Seen. */
  punkte: [number, number][];
  formen: SeeFormen;
  schemaTyp: GewaesserTyp;
};

/** Jeder See mit Steckbrief genau einmal: zuerst die mit Live-Messstelle, dann die nur mit Proben (je alphabetisch). */
export const STECKBRIEF_SEEN: SteckbriefSee[] = [
  ...LIVE_SEEN.map((s): SteckbriefSee => ({
    ...s,
    punkte: s.stationen.map((m): [number, number] => [m.lat, m.lng]),
    formen: seeFormen(s.see),
    schemaTyp: 'LakeBodyOfWater',
  })),
  ...[...PROBEN_SEEN]
    .sort((a, b) => a.see.localeCompare(b.see, 'de'))
    .map((s): SteckbriefSee => ({
      slug: s.slug,
      see: s.see,
      regionen: s.regionen,
      match: s.match,
      stationen: [],
      punkte: [s.punkt],
      formen: seeFormen(s.see, s.dativ),
      schemaTyp: s.schemaTyp ?? 'LakeBodyOfWater',
    })),
];

/**
 * Steckbrief zu einem Seenamen, z. B. aus dem Seen-Vergleich („Bodensee (Bregenz)“ → bodensee); `live` = mit
 * Live-Messstelle. Ohne Steckbrief `undefined`.
 */
export function steckbriefFuer(name: string): { slug: string; live: boolean } | undefined {
  for (const slug of [seeSlug(name), seeSlug(name.replace(/\s*\(.*\)\s*$/, ''))]) {
    const s = STECKBRIEF_SEEN.find((x) => x.slug === slug);
    if (s) return { slug: s.slug, live: s.stationen.length > 0 };
  }
  return undefined;
}
