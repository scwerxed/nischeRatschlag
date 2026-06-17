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
    beschreibung: 'Die Kaiserstadt – Kultur, Kaffeehäuser, Donau und überraschend viel Grün und Bademöglichkeiten.',
    aktiv: true,
  },
  {
    slug: 'oberoesterreich',
    name: 'Oberösterreich',
    beschreibung: 'Salzkammergut, Hallstatt, Traun- und Attersee – glasklare Seen zwischen sanften Bergen.',
    aktiv: true,
  },
  {
    slug: 'niederoesterreich',
    name: 'Niederösterreich',
    beschreibung: 'Wachau, Wein, Donau und die Wiener Hausberge Schneeberg und Rax.',
    aktiv: true,
  },
  {
    slug: 'vorarlberg',
    name: 'Vorarlberg',
    beschreibung: 'Vom Bodensee über den Bregenzerwald bis zu den Bergseen von Montafon und Silvretta.',
    aktiv: true,
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
