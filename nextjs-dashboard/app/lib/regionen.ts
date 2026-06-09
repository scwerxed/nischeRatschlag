export type Region = {
  slug: string;
  name: string;
  beschreibung: string;
  aktiv: boolean;
};

export const regionen: Region[] = [
  {
    slug: 'kaernten',
    name: 'Kärnten',
    beschreibung: 'Wörthersee, Millstätter See, Weissensee – Kärntens Seen sind unschlagbar.',
    aktiv: true,
  },
  {
    slug: 'salzburg',
    name: 'Salzburg',
    beschreibung: 'Mozartstadt, Hohe Tauern, Zeller See und das Salzburger Seenland – Kultur und Bergwelt vereint.',
    aktiv: true,
  },
  {
    slug: 'tirol',
    name: 'Tirol',
    beschreibung: 'Innsbruck, Achensee, Ötztal & Zillertal – das Herz der Alpen mit Bergseen und Gipfeln.',
    aktiv: true,
  },
  {
    slug: 'steiermark',
    name: 'Steiermark',
    beschreibung: 'Das grüne Herz Österreichs – Graz, Weinstraßen, Almen, der Dachstein und smaragdgrüne Bergseen.',
    aktiv: true,
  },
  {
    slug: 'wien',
    name: 'Wien',
    beschreibung: 'Die Kaiserstadt – Kultur, Kaffeehäuser und Donau.',
    aktiv: false,
  },
  {
    slug: 'oberoesterreich',
    name: 'Oberösterreich',
    beschreibung: 'Salzkammergut, Hallstatt und der Traunsee.',
    aktiv: false,
  },
  {
    slug: 'niederoesterreich',
    name: 'Niederösterreich',
    beschreibung: 'Wachau, Weinviertel und die Donauregion.',
    aktiv: false,
  },
  {
    slug: 'vorarlberg',
    name: 'Vorarlberg',
    beschreibung: 'Bodensee, Bregenzerwald und Alpenrheintal.',
    aktiv: false,
  },
  {
    slug: 'burgenland',
    name: 'Burgenland',
    beschreibung: 'Neusiedler See, Spitzenweine, Störche und pannonisches Sonnenklima – Österreichs Osten.',
    aktiv: true,
  },
];

export function getRegionBySlug(slug: string): Region | undefined {
  return regionen.find((r) => r.slug === slug);
}
