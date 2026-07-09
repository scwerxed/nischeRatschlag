// Zentrale Seen-Daten für /seen-vergleich und die Themen-Unterseiten
// (/seen-vergleich/ruhige-seen etc.). Tags steuern die Zuordnung.

export type LakeTag = 'ruhig' | 'familie' | 'wanderung' | 'wassersport' | 'warm';

export type Lake = {
  name: string;
  region: string;
  slug?: string;        // verlinkter Artikel, falls vorhanden
  maxTemp: string;
  groesse: string;
  charakter: string;
  idealFuer: string;
  gratis: boolean;
  tipp: string;
  tags: LakeTag[];
};

export const LAKES: Lake[] = [
  { name: 'Wörthersee', region: 'Kärnten', slug: 'beste-badestellen-woerthersee', maxTemp: '28 °C', groesse: 'sehr groß', charakter: 'Mondän & belebt', idealFuer: 'Action, Ausgehen, Familien', gratis: true, tipp: 'Gratis-Strände in Maria Wörth & Reifnitz', tags: ['warm', 'familie', 'wassersport'] },
  { name: 'Klopeiner See', region: 'Kärnten', slug: 'klopeiner-see-badeurlaub', maxTemp: '28 °C', groesse: 'klein', charakter: 'Ruhig & familiär', idealFuer: 'Familien mit Kindern', gratis: false, tipp: 'Wärmster Badesee Österreichs', tags: ['warm', 'familie', 'ruhig'] },
  { name: 'Millstätter See', region: 'Kärnten', slug: 'millstaetter-see-wandern-und-schwimmen', maxTemp: '26 °C', groesse: 'groß & tief', charakter: 'Elegant & ruhig', idealFuer: 'Wandern + Baden, Paare', gratis: true, tipp: 'Im Herbst herrlich leer', tags: ['ruhig', 'wanderung', 'warm'] },
  { name: 'Faaker See', region: 'Kärnten', slug: 'faaker-see-badestellen', maxTemp: '27 °C', groesse: 'mittel', charakter: 'Türkis & malerisch', idealFuer: 'Familien, Fotografen', gratis: false, tipp: 'Karibisches Türkis durch Kalk', tags: ['warm', 'familie'] },
  { name: 'Ossiacher See', region: 'Kärnten', slug: 'ossiacher-see-badeurlaub', maxTemp: '26 °C', groesse: 'groß', charakter: 'Sportlich & lebhaft', idealFuer: 'Wassersport, Aktive', gratis: true, tipp: 'Top zum Surfen & SUP', tags: ['wassersport', 'familie'] },
  { name: 'Weissensee', region: 'Kärnten', slug: 'weissensee-kaernten-geheimtipp', maxTemp: '24 °C', groesse: 'mittel', charakter: 'Naturnah & still', idealFuer: 'Ruhe, Natur, Familien', gratis: true, tipp: 'Sauberster See – Motorbootverbot', tags: ['ruhig', 'wanderung', 'familie'] },
  { name: 'Neusiedler See', region: 'Burgenland', slug: 'neusiedler-see-baden-segeln', maxTemp: '25 °C', groesse: 'sehr groß & flach', charakter: 'Steppensee & windig', idealFuer: 'Segeln, Surfen, Familien', gratis: true, tipp: 'Mitteleuropas größter Steppensee, meist nur ~1 m tief', tags: ['wassersport', 'familie', 'warm'] },
  { name: 'Zeller See', region: 'Salzburg', slug: 'zell-am-see-zeller-see', maxTemp: '23 °C', groesse: 'mittel', charakter: 'Bergpanorama', idealFuer: 'Baden mit Bergblick, Familien', gratis: true, tipp: 'Baden vor der Kulisse der Hohen Tauern', tags: ['wanderung', 'familie'] },
  { name: 'Wolfgangsee', region: 'Salzburg', slug: 'wolfgangsee-st-gilgen', maxTemp: '24 °C', groesse: 'groß', charakter: 'Idyllisch & beliebt', idealFuer: 'Familien, Ausflüge', gratis: true, tipp: 'St. Wolfgang & Schafbergbahn', tags: ['familie', 'wanderung'] },
  { name: 'Achensee', region: 'Tirol', slug: 'achensee-tirol', maxTemp: '20 °C', groesse: 'groß', charakter: 'Alpin & glasklar', idealFuer: 'Segeln, Surfen, Wandern', gratis: true, tipp: 'Tirols größter See – frisch, aber top zum Segeln', tags: ['wassersport', 'wanderung', 'ruhig'] },
];

export type SeeThema = { slug: string; tag: LakeTag; title: string; h1: string; intro: string };

export const SEE_THEMEN: SeeThema[] = [
  {
    slug: 'ruhige-seen',
    tag: 'ruhig',
    title: 'Ruhige Seen in Österreich – Baden abseits des Trubels',
    h1: 'Ruhige Seen zum Abschalten',
    intro: 'Kein Partyufer, keine Motorboote, kein Gedränge: Diese Seen sind die richtige Wahl, wenn du Ruhe, Natur und klares Wasser suchst.',
  },
  {
    slug: 'familienseen',
    tag: 'familie',
    title: 'Die besten Seen für Familien in Österreich',
    h1: 'Familienfreundliche Badeseen',
    intro: 'Flache Einstiege, warmes Wasser und Infrastruktur für Kinder: Diese Seen funktionieren mit der ganzen Familie – vom Kleinkind bis zu den Großeltern.',
  },
  {
    slug: 'seen-mit-wanderung',
    tag: 'wanderung',
    title: 'Seen mit Wanderung – Baden und Bergtour kombinieren',
    h1: 'Seen, an denen sich Wandern lohnt',
    intro: 'Erst auf den Berg, dann ins Wasser: An diesen Seen starten lohnende Wanderungen direkt am Ufer – ideal für einen aktiven Sommertag.',
  },
];
