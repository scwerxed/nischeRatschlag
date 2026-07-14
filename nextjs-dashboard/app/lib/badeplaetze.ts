// Badeplatz-Check: konkrete Badeplätze mit den Eigenschaften, nach denen
// wirklich gesucht wird (gratis, Schatten, flacher Einstieg, WC, Gastro,
// nach Wanderung erreichbar, Hundestrand in der Nähe).
// Angaben nach bestem Wissen – auf der Seite steht ein Ohne-Gewähr-Hinweis.

export const FEATURES = {
  gratis:   { label: 'Gratis',              icon: '✓' },
  schatten: { label: 'Schattenplätze',      icon: '🌳' },
  flach:    { label: 'Flacher Einstieg',    icon: '👶' },
  wc:       { label: 'WC vorhanden',        icon: '🚻' },
  gastro:   { label: 'Essen & Trinken',     icon: '🍽' },
  wandern:  { label: 'Nach Wanderung',      icon: '🥾' },
  hund:     { label: 'Hundestrand nahe',    icon: '🐕' },
} as const;

export type FeatureKey = keyof typeof FEATURES;

export type Badeplatz = {
  name: string;
  see: string;
  region: string;       // Anzeigename
  slug?: string;        // zugehöriger Artikel
  features: FeatureKey[];
  hinweis: string;
};

export const BADEPLAETZE: Badeplatz[] = [
  // Kärnten
  { name: 'Freistrand Maria Wörth', see: 'Wörthersee', region: 'Kärnten', slug: 'beste-badestellen-woerthersee', features: ['gratis', 'schatten'], hinweis: 'Einer der schönsten Gratis-Zugänge am See – früh kommen, wenig Platz.' },
  { name: 'Strandbad Klagenfurt', see: 'Wörthersee', region: 'Kärnten', slug: 'beste-badestellen-woerthersee', features: ['flach', 'wc', 'gastro', 'schatten'], hinweis: 'Eines der größten Strandbäder Europas – Kinderbereich mit flachem Wasser.' },
  { name: 'Ostufer Klopeiner See', see: 'Klopeiner See', region: 'Kärnten', slug: 'klopeiner-see-badeurlaub', features: ['flach', 'wc', 'gastro', 'hund'], hinweis: 'Wärmster Badesee Österreichs; eigener Hundestrand in St. Kanzian.' },
  { name: 'Uferwege Techendorf', see: 'Weissensee', region: 'Kärnten', slug: 'weissensee-kaernten-geheimtipp', features: ['gratis', 'schatten', 'wandern'], hinweis: 'Freie Einstiege entlang der Uferwege – ideal nach einer Runde am See.' },
  { name: 'Strandbad Faak', see: 'Faaker See', region: 'Kärnten', slug: 'faaker-see-badestellen', features: ['flach', 'wc', 'gastro'], hinweis: 'Türkises Wasser; die Gratis-Plätze am See sind rar.' },
  { name: 'Bodensdorf Nordufer', see: 'Ossiacher See', region: 'Kärnten', slug: 'ossiacher-see-badeurlaub', features: ['gratis', 'wc'], hinweis: 'Freie Uferabschnitte am Nordufer; beliebt bei SUP und Surfern.' },
  // Salzburg
  { name: 'Badeplätze am Fuschlsee', see: 'Fuschlsee', region: 'Salzburg', slug: 'fuschlsee-baden', features: ['gratis', 'schatten', 'wandern'], hinweis: 'Kombiniere den Seerundweg (ca. 3 Std.) mit einem Sprung ins smaragdgrüne Wasser.' },
  { name: 'Strandbad Zell am See', see: 'Zeller See', region: 'Salzburg', slug: 'zell-am-see-zeller-see', features: ['flach', 'wc', 'gastro'], hinweis: 'Baden mit Blick auf die Hohen Tauern.' },
  { name: 'Strandbad St. Gilgen', see: 'Wolfgangsee', region: 'Salzburg', slug: 'wolfgangsee-st-gilgen', features: ['flach', 'wc', 'gastro', 'schatten'], hinweis: 'Familienfreundlich, direkt im Ort.' },
  // Oberösterreich
  { name: 'Freie Einstiege Attersee-Ostufer', see: 'Attersee', region: 'Oberösterreich', slug: 'attersee-baden', features: ['gratis', 'wandern'], hinweis: 'Glasklares Wasser; wenige Parkplätze – Rad oder Bus nutzen.' },
  { name: 'Strandbad Gmunden', see: 'Traunsee', region: 'Oberösterreich', slug: 'traunsee-gmunden', features: ['wc', 'gastro', 'schatten'], hinweis: 'Kühles, tiefes Wasser unterm Traunstein.' },
  // Tirol
  { name: 'Uferzonen Pertisau', see: 'Achensee', region: 'Tirol', slug: 'achensee-tirol', features: ['gratis', 'wandern', 'wc'], hinweis: 'Alpin-frisch – nach einer Karwendel-Wanderung genau richtig.' },
  { name: 'Badeplätze am Plansee', see: 'Plansee', region: 'Tirol', slug: 'plansee-tirol-baden', features: ['gratis', 'schatten'], hinweis: 'Ruhig und naturbelassen – der Fjord Tirols.' },
  { name: 'Strandbad Walchsee', see: 'Walchsee', region: 'Tirol', slug: 'walchsee-kaiserwinkl', features: ['flach', 'wc', 'gastro'], hinweis: 'Warmer Familiensee im Kaiserwinkl.' },
  // Wien
  { name: 'Gänsehäufel', see: 'Alte Donau', region: 'Wien', slug: 'alte-donau-baden-wien', features: ['flach', 'wc', 'gastro', 'schatten'], hinweis: 'Wiens Klassiker – Strandbad-Insel mit altem Baumbestand.' },
  { name: 'Donauinsel', see: 'Neue Donau', region: 'Wien', slug: 'alte-donau-baden-wien', features: ['gratis', 'wc', 'gastro'], hinweis: 'Kilometerlange freie Badezonen, mit der U-Bahn erreichbar.' },
  // Burgenland
  { name: 'Strandbad Podersdorf', see: 'Neusiedler See', region: 'Burgenland', slug: 'podersdorf-am-see', features: ['flach', 'wc', 'gastro'], hinweis: 'Sehr flach und warm – der Klassiker am Ostufer.' },
  // Niederösterreich
  { name: 'Strandbad Lunz', see: 'Lunzer See', region: 'Niederösterreich', slug: 'lunzer-see-baden', features: ['wc', 'gastro', 'wandern', 'schatten'], hinweis: 'Wärmster Gebirgssee der Region; Uferwege direkt ab Bad.' },
  // Vorarlberg
  { name: 'Strandbad Bregenz', see: 'Bodensee', region: 'Vorarlberg', slug: 'bregenz-bodensee', features: ['flach', 'wc', 'gastro', 'schatten'], hinweis: 'Baden mit Blick über den Bodensee – abends Festspiel-Kulisse.' },
];
