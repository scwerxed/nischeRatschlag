// Region-spezifische Seiteninhalte: Intro-Box, beste Reisezeit & Attraktionen
// (Letztere speisen auch das TouristDestination-Schema). Beim DACH-Ausbau
// einfach weitere Regionen ergänzen.

export type RegionContent = {
  intro: { eyebrow: string; title: string; text: string; stats: { v: string; l: string }[] };
  seasons: { season: string; months: string; icon: string; tip: string }[];
  attractions: { name: string; description: string }[];
  destinationDescription: string;
};

const SEASON_ICONS = { fruehling: '🌸', sommer: '☀️', herbst: '🍂', winter: '❄️' };

export const REGION_CONTENT: Record<string, RegionContent> = {
  kaernten: {
    intro: {
      eyebrow: 'Österreichs Seenland',
      title: 'Alpenwandern und Badesommer in einem',
      text: 'Über 1.270 Seen, Gipfel bis 3.798 m und das wärmste Seewasser Österreichs. Hier findest du kuratierte Insider-Tipps – mit konkreten Preisen, ehrlichen Bewertungen und Kombinationsrouten, die andere Websites nicht zeigen.',
      stats: [{ v: '1.270+', l: 'Seen' }, { v: '29 °C', l: 'max. Wassertemp.' }, { v: '3.798 m', l: 'höchster Gipfel' }],
    },
    seasons: [
      { season: 'Frühling', months: 'Apr – Mai', icon: SEASON_ICONS.fruehling, tip: 'Alpenrosen-Blüte, kaum Touristen, günstige Preise. Ideal für Wanderungen.' },
      { season: 'Sommer', months: 'Jun – Aug', icon: SEASON_ICONS.sommer, tip: 'Seen bis 29 °C, volles Programm. Frühzeitig buchen – Hochsaison.' },
      { season: 'Herbst', months: 'Sep – Okt', icon: SEASON_ICONS.herbst, tip: 'Goldenes Licht, leere Strände, Berge ohne Gedränge. Geheimtipp-Zeit.' },
      { season: 'Winter', months: 'Nov – Mär', icon: SEASON_ICONS.winter, tip: 'Weissensee: Europas größte Natureisfläche zum Schlittschuhlaufen.' },
    ],
    attractions: [
      { name: 'Wörthersee', description: 'Wärmstes Gewässer Kärntens, bis 28 °C' },
      { name: 'Großglockner', description: 'Österreichs höchster Berg, 3.798 m' },
      { name: 'Weissensee', description: 'Sauberster See, Sichttiefe bis 8 m' },
      { name: 'Nockberge', description: 'UNESCO-Biosphärenpark, sanfte Almwanderwege' },
    ],
    destinationDescription: 'Österreichs Seenland mit über 1.270 Seen, dem Wörthersee, Millstätter See und Gipfeln bis 3.798 m.',
  },

  salzburg: {
    intro: {
      eyebrow: 'Mozart, Berge & Seen',
      title: 'Von der Festspielstadt in die Hohen Tauern',
      text: 'Salzburg verbindet Weltkultur mit alpiner Wildnis: die barocke Altstadt als UNESCO-Welterbe, der Nationalpark Hohe Tauern mit dem Großglockner und die Krimmler Wasserfälle sowie warme Badeseen im Salzburger Seenland.',
      stats: [{ v: '3.798 m', l: 'Großglockner' }, { v: '380 m', l: 'Krimmler Fälle' }, { v: 'UNESCO', l: 'Altstadt' }],
    },
    seasons: [
      { season: 'Frühling', months: 'Apr – Mai', icon: SEASON_ICONS.fruehling, tip: 'Stadt ohne Gedränge, Almen werden grün, Wasserfälle führen viel Wasser.' },
      { season: 'Sommer', months: 'Jun – Aug', icon: SEASON_ICONS.sommer, tip: 'Festspielzeit, Badeseen im Seenland und Bergwandern in den Tauern.' },
      { season: 'Herbst', months: 'Sep – Okt', icon: SEASON_ICONS.herbst, tip: 'Goldener Herbst in den Tälern, ruhige Wanderwege, klare Fernsicht.' },
      { season: 'Winter', months: 'Nov – Mär', icon: SEASON_ICONS.winter, tip: 'Adventzauber in der Altstadt, Skifahren in Ski amadé.' },
    ],
    attractions: [
      { name: 'Altstadt Salzburg', description: 'UNESCO-Welterbe, Festung & Getreidegasse' },
      { name: 'Krimmler Wasserfälle', description: 'Mit 380 m einer der höchsten Wasserfälle Europas' },
      { name: 'Zeller See', description: 'Baden mit Bergpanorama vor den Hohen Tauern' },
      { name: 'Nationalpark Hohe Tauern', description: 'Größter Nationalpark der Alpen, mit dem Großglockner' },
    ],
    destinationDescription: 'Salzburg verbindet die UNESCO-Welterbe-Altstadt mit dem Nationalpark Hohe Tauern, dem Großglockner, den Krimmler Wasserfällen und warmen Badeseen im Salzburger Seenland.',
  },

  tirol: {
    intro: {
      eyebrow: 'Das Herz der Alpen',
      title: 'Gipfel, Gletscher und glasklare Seen',
      text: 'Tirol ist Hochgebirge pur: Innsbruck zwischen Nordkette und Inn, Gletscher mit Schnee bis in den Sommer, das Ötztal und Zillertal – dazu klare Bergseen wie der Achensee und der Plansee.',
      stats: [{ v: '3.768 m', l: 'Wildspitze' }, { v: 'Achensee', l: 'größter See' }, { v: 'ganzjährig', l: 'Gletscher-Ski' }],
    },
    seasons: [
      { season: 'Frühling', months: 'Apr – Mai', icon: SEASON_ICONS.fruehling, tip: 'In den Tälern blüht es, oben sind noch Skitouren und Gletscher offen.' },
      { season: 'Sommer', months: 'Jun – Sep', icon: SEASON_ICONS.sommer, tip: 'Beste Wanderzeit; Baden im Achensee und Plansee, Gletscher als Ausflug.' },
      { season: 'Herbst', months: 'Sep – Okt', icon: SEASON_ICONS.herbst, tip: 'Goldene Lärchen, stabile Wetterlagen, ideale Bergwander-Zeit.' },
      { season: 'Winter', months: 'Nov – Apr', icon: SEASON_ICONS.winter, tip: 'Skiparadies von Sölden bis zum Stubaier Gletscher.' },
    ],
    attractions: [
      { name: 'Innsbruck & Nordkette', description: 'Altstadt mit Goldenem Dachl, Bergbahn ins Karwendel' },
      { name: 'Achensee', description: 'Tirols größter See – klar, ideal zum Segeln & Surfen' },
      { name: 'Ötztal & Sölden', description: 'Gletscher, Bergbahnen und Hochgebirge' },
      { name: 'Swarovski Kristallwelten', description: 'Erlebniswelt bei Wattens' },
    ],
    destinationDescription: 'Tirol ist das Herz der Alpen: Innsbruck mit der Nordkette, die Gletscher von Ötztal & Stubaital, das Zillertal und klare Bergseen wie der Achensee.',
  },

  steiermark: {
    intro: {
      eyebrow: 'Das grüne Herz Österreichs',
      title: 'Weinhügel, Almen und der Dachstein',
      text: 'Die Steiermark reicht von Graz und der südsteirischen Weinstraße bis zum Dachstein-Gletscher und dem smaragdgrünen Grünen See – Genuss und Natur in einem Bundesland.',
      stats: [{ v: '2.995 m', l: 'Dachstein' }, { v: 'UNESCO', l: 'Graz Altstadt' }, { v: 'Wein', l: 'Südsteiermark' }],
    },
    seasons: [
      { season: 'Frühling', months: 'Apr – Jun', icon: SEASON_ICONS.fruehling, tip: 'Der Grüne See steht am höchsten und leuchtet, Apfel- & Weinblüte.' },
      { season: 'Sommer', months: 'Jun – Aug', icon: SEASON_ICONS.sommer, tip: 'Almwandern, Dachstein-Skywalk und laue Abende in Graz.' },
      { season: 'Herbst', months: 'Sep – Okt', icon: SEASON_ICONS.herbst, tip: 'Weinlese & Buschenschank an der Südsteirischen Weinstraße.' },
      { season: 'Winter', months: 'Dez – Mär', icon: SEASON_ICONS.winter, tip: 'Skifahren in der Region Schladming-Dachstein.' },
    ],
    attractions: [
      { name: 'Graz', description: 'UNESCO-Altstadt, Schlossberg & Kunsthaus' },
      { name: 'Dachstein', description: 'Gletscher mit Skywalk und Hängebrücke' },
      { name: 'Grüner See (Tragöß)', description: 'Smaragdgrüner Bergsee, im Frühsommer am schönsten' },
      { name: 'Südsteirische Weinstraße', description: 'Hügel, Buschenschänken & Sauvignon Blanc' },
    ],
    destinationDescription: 'Die Steiermark – das grüne Herz Österreichs: Graz, die Südsteirische Weinstraße, der Dachstein und der smaragdgrüne Grüne See in Tragöß.',
  },

  burgenland: {
    intro: {
      eyebrow: 'Österreichs sonniger Osten',
      title: 'Steppensee, Wein und pannonische Sonne',
      text: 'Das Burgenland lebt vom Neusiedler See – Mitteleuropas größtem Steppensee –, von Spitzenweinen und dem mildesten, sonnigsten Klima Österreichs. Flach, warm und ideal für Familien, Radler und Genießer.',
      stats: [{ v: '~320 km²', l: 'Neusiedler See' }, { v: '~1 m', l: 'Seetiefe' }, { v: 'UNESCO', l: 'Schilfgürtel' }],
    },
    seasons: [
      { season: 'Frühling', months: 'Apr – Mai', icon: SEASON_ICONS.fruehling, tip: 'Die Störche kehren nach Rust zurück, ideale Zeit zum Radeln um den See.' },
      { season: 'Sommer', months: 'Jun – Aug', icon: SEASON_ICONS.sommer, tip: 'Baden, Segeln und Surfen – der flache See wird angenehm warm.' },
      { season: 'Herbst', months: 'Sep – Nov', icon: SEASON_ICONS.herbst, tip: 'Weinlese und Martiniloben mit Gansl und Jungwein.' },
      { season: 'Winter', months: 'Dez – Mär', icon: SEASON_ICONS.winter, tip: 'Mild; Familientherme Lutzmannsburg als Schlechtwetter-Ziel.' },
    ],
    attractions: [
      { name: 'Neusiedler See', description: 'Mitteleuropas größter Steppensee, top zum Segeln & Surfen' },
      { name: 'Rust', description: 'Freistadt am See, berühmt für die Storchennester' },
      { name: 'Schloss Esterházy (Eisenstadt)', description: 'Prunkschloss & Haydn-Stätte' },
      { name: 'Therme Lutzmannsburg', description: 'Eine der führenden Familienthermen Europas' },
    ],
    destinationDescription: 'Das Burgenland – Österreichs sonniger Osten: der Neusiedler See als Steppensee, Spitzenweine, Störche in Rust und pannonisches Klima.',
  },
};
