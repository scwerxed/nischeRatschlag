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
  { name: 'Attersee', region: 'Oberösterreich', slug: 'attersee-baden', maxTemp: '23 °C', groesse: 'sehr groß', charakter: 'Glasklar & sportlich', idealFuer: 'Segeln, Tauchen, Baden', gratis: true, tipp: 'Top Sichtweiten – einer der beliebtesten Tauchseen des Landes', tags: ['wassersport', 'familie', 'wanderung'] },
  { name: 'Traunsee', region: 'Oberösterreich', slug: 'traunsee-gmunden', maxTemp: '21 °C', groesse: 'groß & sehr tief', charakter: 'Dramatisch & kühl', idealFuer: 'Tauchen, Schifffahrt, Fotografie', gratis: true, tipp: 'Tiefster See Österreichs, direkt unter dem Traunstein', tags: ['wanderung', 'wassersport'] },
  { name: 'Grundlsee', region: 'Steiermark', slug: 'grundlsee-steirisches-meer', maxTemp: '20 °C', groesse: 'groß', charakter: 'Naturnah & weit', idealFuer: 'Ruhe, Wandern, Bootsfahrt', gratis: true, tipp: 'Das „steirische Meer" – Dreiseentour zum Toplitzsee', tags: ['ruhig', 'wanderung'] },
  { name: 'Altausseer See', region: 'Steiermark', slug: 'altausseer-see-baden', maxTemp: '20 °C', groesse: 'mittel', charakter: 'Still & tiefgrün', idealFuer: 'Ruhe, Uferrunde, Natur', gratis: true, tipp: 'Flacher Rundweg mit Loser-Kulisse, Motorboote verboten', tags: ['ruhig', 'wanderung'] },
  { name: 'Stubenbergsee', region: 'Steiermark', slug: 'stubenbergsee-baden', maxTemp: '26 °C', groesse: 'klein', charakter: 'Warm & unkompliziert', idealFuer: 'Familien, Badetag ab Graz', gratis: false, tipp: 'Einer der wärmsten Badeseen der Oststeiermark', tags: ['warm', 'familie'] },
  { name: 'Fuschlsee', region: 'Salzburg', slug: 'fuschlsee-baden', maxTemp: '23 °C', groesse: 'mittel', charakter: 'Klar & idyllisch', idealFuer: 'Ruhiger Badetag ab Salzburg', gratis: true, tipp: 'Trinkwasserqualität, nur 20 Minuten von Salzburg', tags: ['ruhig', 'familie', 'wanderung'] },
  { name: 'Plansee', region: 'Tirol', slug: 'plansee-tirol-baden', maxTemp: '20 °C', groesse: 'groß', charakter: 'Fjordartig & still', idealFuer: 'Ruhe, Kajak, Fotografie', gratis: true, tipp: 'Der „Fjord Tirols" – kühl, klar und erstaunlich leer', tags: ['ruhig', 'wanderung'] },
  { name: 'Walchsee', region: 'Tirol', slug: 'walchsee-kaiserwinkl', maxTemp: '24 °C', groesse: 'mittel', charakter: 'Warm & familiär', idealFuer: 'Familien, Baden mit Kaiserblick', gratis: false, tipp: 'Für Tiroler Verhältnisse ungewöhnlich warm', tags: ['warm', 'familie'] },
  { name: 'Lunzer See', region: 'Niederösterreich', slug: 'lunzer-see-baden', maxTemp: '24 °C', groesse: 'klein', charakter: 'Gebirgssee, aber warm', idealFuer: 'Familien, ruhiger Badetag', gratis: false, tipp: 'Wärmster Gebirgssee Niederösterreichs, flacher Rundweg', tags: ['warm', 'familie', 'ruhig'] },
  { name: 'Alte Donau', region: 'Wien', slug: 'alte-donau-baden-wien', maxTemp: '25 °C', groesse: 'mittel', charakter: 'Stadtgewässer ohne Strömung', idealFuer: 'Baden ohne Anreise, SUP, Segeln', gratis: true, tipp: 'Wiens einziger Badesee mit direktem U-Bahn-Anschluss', tags: ['warm', 'familie', 'wassersport'] },
  { name: 'Keutschacher See', region: 'Kärnten', slug: 'keutschacher-seental-radtour', maxTemp: '27 °C', groesse: 'klein', charakter: 'Warm & unaufgeregt', idealFuer: 'Familien, Radtour im Seental', gratis: true, tipp: 'Ruhigere Alternative zum Wörthersee gleich nebenan', tags: ['warm', 'familie', 'ruhig'] },
  { name: 'Bodensee (Bregenz)', region: 'Vorarlberg', slug: 'bregenz-bodensee', maxTemp: '23 °C', groesse: 'sehr groß', charakter: 'Weit & städtisch', idealFuer: 'Segeln, Promenade, Familien', gratis: true, tipp: 'Baden mit Alpenblick, Pfänderbahn direkt dahinter', tags: ['warm', 'familie', 'wassersport'] },
  { name: 'Gosausee', region: 'Oberösterreich', slug: 'gosausee-dachstein-spiegelung', maxTemp: '18 °C', groesse: 'klein', charakter: 'Eiskalt & spektakulär', idealFuer: 'Fotografie, Uferrunde, Wandern', gratis: true, tipp: 'Dachstein-Spiegelung am Morgen – zum Baden ehrlich zu kalt', tags: ['wanderung', 'ruhig'] },
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
  {
    slug: 'warme-seen',
    tag: 'warm',
    title: 'Die wärmsten Badeseen Österreichs – Baden ohne Kälteschock',
    h1: 'Warme Badeseen in Österreich',
    intro: 'Nicht jeder Alpensee ist eine Mutprobe: Diese Seen sind flach genug oder geschützt genug gelegen, um im Hochsommer richtig warm zu werden – gut für Kinder und alle, die ungern frieren.',
  },
  {
    slug: 'seen-mit-wassersport',
    tag: 'wassersport',
    title: 'Seen für Wassersport in Österreich – Segeln, Surfen, SUP & Tauchen',
    h1: 'Seen für Wassersport',
    intro: 'Verlässlicher Wind, klare Sicht unter Wasser oder einfach genug Platz: An diesen Seen geht mehr als Planschen – vom Segelrevier über Surfspots bis zu Österreichs beliebtesten Tauchgewässern.',
  },
];
