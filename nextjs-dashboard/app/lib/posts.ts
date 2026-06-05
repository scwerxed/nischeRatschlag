export type Trail = {
  name: string;
  difficulty: 'leicht' | 'mittel' | 'schwer';
  length: string;       // z.B. "8 km"
  duration: string;     // z.B. "3 Std."
  ascent?: string;      // z.B. "434 hm"
  coords: [number, number][]; // [lat, lng] Wegpunkte des vorgegebenen Wegs
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: 'Wandern' | 'Baden' | 'Unterkunft' | 'Ausflug';
  region: string;
  affiliateLinks?: { label: string; url: string }[];
  difficulty?: 'leicht' | 'mittel' | 'schwer';
  highlights?: string[];
  bestSeason?: string;
  trails?: Trail[];
};

export const posts: Post[] = [
  {
    slug: 'die-10-besten-wanderwege-am-woerthersee',
    title: 'Die 10 besten Wanderwege am Wörthersee',
    excerpt: 'Von gemütlichen Seepromenaden bis zu anspruchsvollen Gipfeltouren – die schönsten Wanderwege rund um den Wörthersee.',
    date: '2026-05-20',
    category: 'Wandern',
    region: 'kaernten',
    difficulty: 'mittel',
    bestSeason: 'April–Oktober',
    highlights: ['10 Touren für jeden Schwierigkeitsgrad', 'Seepromenade bis Gipfel auf 851 m', 'Ideal für Familien und Sportler'],
    content: `
Der Wörthersee ist nicht nur zum Baden da – die Region bietet auch fantastische Wanderwege für jeden Schwierigkeitsgrad.

## 1. Seepromenade Klagenfurt–Pörtschach (leicht, 18 km)
Die klassische Route entlang des Nordufers. Flach, gut befestigt und mit traumhaften Ausblicken auf den See. Ideal für Familien.

## 2. Pyramidenkogel (mittel, 3 Stunden)
Auf den 851 Meter hohen Aussichtsberg mit dem höchsten Holzturm der Welt. Der Panoramablick über den Wörthersee ist einmalig.

## 3. Keutschacher Seenrunde (leicht, 12 km)
Durch das idyllische Keutschacher Seental mit mehreren kleinen Seen. Im Frühling blühen hier die Wiesen in vollem Farbenrausch.

## 4. Dobratsch-Gipfeltour (schwer, 5 Stunden)
Der „Kärntner Hausberg" bietet eine der schönsten Aussichten der Alpen – bei klarem Wetter sieht man bis zum Triglav.

## 5. Maria Wörth Rundweg (leicht, 8 km)
Rund um die malerische Halbinsel mit der berühmten Wallfahrtskirche. Kurz aber wunderschön.

## Ausrüstungs-Tipp
Gute Wanderschuhe sind Pflicht – besonders für die längeren Touren. Aktuelle Preise und Bewertungen:
    `,
    affiliateLinks: [
      { label: 'Wanderschuhe auf Amazon ansehen', url: 'https://www.amazon.de/s?k=wanderschuhe+herren' },
      { label: 'Hotels am Wörthersee – booking.com', url: 'https://www.booking.com/region/at/carinthia.de.html' },
    ],
    trails: [
      {
        name: 'Seepromenade Klagenfurt–Pörtschach',
        difficulty: 'leicht', length: '18 km', duration: '4,5 Std.', ascent: '60 hm',
        coords: [[46.6240, 14.2620], [46.6280, 14.2200], [46.6310, 14.1800], [46.6328, 14.1497]],
      },
      {
        name: 'Pyramidenkogel',
        difficulty: 'mittel', length: '7 km', duration: '3 Std.', ascent: '420 hm',
        coords: [[46.6010, 14.1330], [46.5980, 14.1290], [46.5945, 14.1240], [46.5919, 14.1208]],
      },
      {
        name: 'Maria Wörth Rundweg',
        difficulty: 'leicht', length: '8 km', duration: '2 Std.', ascent: '90 hm',
        coords: [[46.6178, 14.1640], [46.6155, 14.1700], [46.6170, 14.1780], [46.6205, 14.1720], [46.6178, 14.1640]],
      },
    ],
  },
  {
    slug: 'beste-badestellen-woerthersee',
    title: 'Die schönsten Badestellen am Wörthersee',
    excerpt: 'Wo badet man am besten? Ein Überblick über die top Badestellen – kostenlos und mit Eintritt.',
    date: '2026-05-15',
    category: 'Baden',
    region: 'kaernten',
    bestSeason: 'Juni–September',
    highlights: ['Kostenlose & gebührenpflichtige Optionen', 'Wasser bis 28°C im Sommer', 'Für Familien und Schwimmer geeignet'],
    content: `
Der Wörthersee ist einer der wärmsten Seen Österreichs – im Sommer erreicht das Wasser bis zu 28°C. Hier sind die besten Badestellen:

## Strandbad Klagenfurt (mit Eintritt)
Das größte Strandbad Kärntens mit Wasserrutsche, Sprungturm und Gastronomie. Perfekt für einen ganzen Tag.

## Loretto-Strandbad Velden (mit Eintritt)
Im mondänen Velden gelegen, elegantes Strandbad mit gutem Service.

## Freistrand Maria Wörth (kostenlos)
Kleiner, aber charmanter Freistrand direkt neben der berühmten Kirche. Sehr beliebt und oft voll.

## Badebucht Reifnitz (kostenlos)
Ruhigere Alternative am Südufer, ideal für Familien mit kleinen Kindern – flacher Einstieg.

## Tipp
Früh kommen zahlt sich aus – die beliebten Spots sind im Juli/August schnell voll.
    `,
    affiliateLinks: [
      { label: 'Hotels in Velden – booking.com', url: 'https://www.booking.com/city/at/velden-am-worthersee.de.html' },
      { label: 'Strandaccessoires auf Amazon', url: 'https://www.amazon.de/s?k=strand+set+sommer' },
    ],
  },
  {
    slug: 'woerthersee-mit-kindern',
    title: 'Wörthersee mit Kindern – die besten Familienausflüge',
    excerpt: 'Miniaturpark, Reptilienzoo, Schifffahrt und mehr – so wird der Urlaub am Wörthersee für die ganze Familie unvergesslich.',
    date: '2026-05-10',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Mai–September',
    highlights: ['Miniaturpark, Reptilienzoo, Schifffahrt', 'Aktivitäten für Kinder aller Altersgruppen', 'Geheimtipps für Familienhotels'],
    content: `
Ein Urlaub am Wörthersee mit Kindern ist eine tolle Idee – die Region hat für die Kleinen viel zu bieten.

## Minimundus Klagenfurt
Über 150 weltberühmte Bauwerke im Miniaturformat auf 26.000 m². Kinder und Erwachsene gleichermaßen begeistert.

## Reptilienzoo Happ
Mehr als 500 Tiere aus aller Welt – Krokodile, Riesenschlangen und seltene Schildkröten. Ein echtes Highlight.

## Schifffahrt Wörthersee
Mit dem Schiff von Klagenfurt bis Velden – Kinder lieben die Fahrt über den See, und man sieht alle Sehenswürdigkeiten vom Wasser aus.

## Europapark im Strandbad
Kletterturm, Wasserrutschen und Spielplatz direkt am See.

## Unterkunft-Tipp
Familienfreundliche Hotels mit Kinderbetreuung findet man am besten über booking.com:
    `,
    affiliateLinks: [
      { label: 'Familienhotels Wörthersee – booking.com', url: 'https://www.booking.com/region/at/carinthia.de.html?nflt=fc%3D2' },
    ],
  },
  {
    slug: 'weissensee-kaernten-geheimtipp',
    title: 'Weissensee – Kärntens kristallklarer Geheimtipp',
    excerpt: 'Der Weissensee gehört zu den saubersten Seen Europas. Was ihn so besonders macht und welche Wanderungen rund um den See lohnen.',
    date: '2026-05-25',
    category: 'Wandern',
    region: 'kaernten',
    difficulty: 'leicht',
    bestSeason: 'Juni–September',
    highlights: ['Sauberster See Europas – Sichttiefe bis 8 m', 'Motorbootverbot garantiert absolute Stille', 'Wanderrouten für alle Fitnesslevel'],
    content: `
Der Weissensee liegt auf 930 Metern Seehöhe in einem Hochtal der Karnischen Alpen – abgelegen, ruhig und von beeindruckender Reinheit. Mit einer Sichttiefe von bis zu 8 Metern zählt er zu den saubersten Seen Europas.

## Seerundweg Weissensee (leicht, 22 km)
Die komplette Umrundung des Sees dauert etwa 6 Stunden und ist flach genug für die ganze Familie. Wer nicht die ganze Strecke gehen will, nimmt das Schiff für die Rückfahrt.

## Gipfeltour Reißkofel (schwer, 5–6 Stunden)
Der 2.371 m hohe Reißkofel bietet einen der spektakulärsten Blicke über die Karnischen Alpen. Kondition und Trittsicherheit erforderlich.

## Goldeckrunde vom Weissensee (mittel, 4 Stunden)
Durch Almwiesen hinauf zur Goldeckhütte – herrliche Panoramaaussicht und eine gemütliche Einkehr.

## Wasserwanderweg Techendorf
Ein thematischer Weg entlang des Ufers, der die Geschichte des Sees und seiner Bewohner erzählt. Ideal für Kinder.

## Besonderheit: Motorbootverbot
Auf dem Weissensee sind Motorboote verboten. Das sorgt für eine einzigartige Ruhe und hervorragende Wasserqualität – hier ist wirklich noch Urlaub wie früher.

## Unterkunft
Die Auswahl an Hotels und Pensionen am Weissensee ist klein aber fein. Frühzeitig buchen!
    `,
    affiliateLinks: [
      { label: 'Unterkünfte am Weissensee – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Weissensee+K%C3%A4rnten' },
      { label: 'Wanderrucksack für alpine Touren – Amazon', url: 'https://www.amazon.de/s?k=wanderrucksack+30l' },
    ],
    trails: [
      {
        name: 'Seerundweg Weissensee',
        difficulty: 'leicht', length: '22 km', duration: '6 Std.', ascent: '150 hm',
        coords: [[46.7164, 13.3017], [46.7150, 13.3300], [46.7120, 13.3600], [46.7080, 13.3850], [46.7150, 13.3700], [46.7200, 13.3300], [46.7164, 13.3017]],
      },
    ],
  },
  {
    slug: 'millstaetter-see-wandern-und-schwimmen',
    title: 'Millstätter See – Wandern mit Seeblick und traumhafte Badebuchten',
    excerpt: 'Der Millstätter See vereint Wanderberge, klares Wasser und die charmante Altstadt Millstatts. Die schönsten Touren und Badeorte.',
    date: '2026-05-22',
    category: 'Wandern',
    region: 'kaernten',
    difficulty: 'mittel',
    bestSeason: 'Mai–Oktober',
    highlights: ['Wandern & Baden perfekt kombinierbar', 'Nockberge-Panorama direkt am See', 'Historisches Stift Millstatt aus dem 11. Jh.'],
    content: `
Der Millstätter See ist mit 13 km Länge der zweitgrößte See Kärntens. Seine Besonderheit: direkt am Ufer erheben sich die Nockberge – Wandern und Baden lassen sich hier perfekt kombinieren.

## Millstätter Höhenweg (mittel, Mehrtagestour)
Der bekannteste Wanderweg der Region führt in drei Etappen über die Nockberge. Wunderschöne Almlandschaft, gut markiert und mit Hüttenübernachtungen.

## Gipfeltour Millstätter Alpe (mittel, 4 Stunden)
Von Seeboden auf die Millstätter Alpe (1.765 m) – herrlicher Blick auf den See und die umliegenden Berge.

## Lendspitz-Maiernigg Naturschutzgebiet
Ein einzigartiges Schilfgebiet am Westufer, ideal für Naturliebhaber und Vogelbeobachter. Flacher Spazierweg.

## Badestellen am Millstätter See
Am besten badet man in Seeboden (kostenloser Badestrand) oder beim Strandbad Millstatt mit Parkplatz und Gastronomie. Das Wasser erreicht im Sommer bis zu 26°C.

## Altstadt Millstatt
Das Stift Millstatt aus dem 11. Jahrhundert ist eines der bedeutendsten Kunstdenkmäler Kärntens. Ein Besuch nach der Wanderung lohnt sich.
    `,
    affiliateLinks: [
      { label: 'Hotels am Millstätter See – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Millstatt+am+See' },
      { label: 'Wanderstöcke für Bergtouren – Amazon', url: 'https://www.amazon.de/s?k=wanderstock+carbon' },
    ],
  },
  {
    slug: 'nockberge-biosphaerenpark-wandern',
    title: 'Nockberge – Wandern im UNESCO-Biosphärenpark',
    excerpt: 'Sanfte Rundberge, Almen und eine einzigartige Flora: Der Biosphärenpark Nockberge ist das Wanderparadies für alle, die Ruhe suchen.',
    date: '2026-05-18',
    category: 'Wandern',
    region: 'kaernten',
    difficulty: 'leicht',
    bestSeason: 'Juni–September',
    highlights: ['UNESCO-Biosphärenpark seit 2012', 'Sanfte Almwanderungen ohne Felsklettern', 'Alpenrosen-Blüte im Juli/August spektakulär'],
    content: `
Die Nockberge sind anders als die meisten Kärntner Berge: keine steilen Felswände, sondern weich geformte Kuppen, saftige Almen und blumenreiche Wiesen. Im Jahr 2012 wurden sie als UNESCO-Biosphärenpark anerkannt.

## Rundtour Innernock (leicht, 3 Stunden)
Eine der schönsten Almenrunden Kärntens. Über die Flattnitz hinauf auf den Innernock (2.074 m) – fantastische Aussicht bei wenig Höhenmeter.

## Nockalm-Weg (mittel, 5 Stunden)
Ein Weitwanderweg, der die bedeutendsten Gipfel der Nockberge verbindet. Wer nur einen Abschnitt geht, nimmt die Nockalmstraße als Shuttle.

## Nockalmstraße – Fahrt mit Panorama
Die 35 km lange Hochalpenstraße ist auch ohne Wandern ein Erlebnis. Zahlreiche Aussichtspunkte und Parkplätze für kurze Ausflüge.

## Villacher Alpe (Dobratsch) Einstieg
Von der Nockalmstraße aus gut erreichbar, bietet der Dobratsch bei klarem Wetter Sicht bis zum Triglav und zur Adria.

## Beste Reisezeit
Juni bis September – im Juli und August blühen die Alpenrosen in voller Pracht. Ein unvergessliches Farbenspektakel.

## Hütten entlang des Weges
Mehrere Alm- und Schutzhütten laden zur Einkehr ein. Kärntner Brettljause und hausgemachter Topfenstrudel sind Pflicht.
    `,
    affiliateLinks: [
      { label: 'Unterkünfte in den Nockbergen – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Nockberge+K%C3%A4rnten' },
      { label: 'Wanderführer Kärnten – Amazon', url: 'https://www.amazon.de/s?k=wanderf%C3%BChrer+k%C3%A4rnten' },
    ],
  },
  {
    slug: 'ossiacher-see-badeurlaub',
    title: 'Ossiacher See – Der entspannte Badesee Kärntens',
    excerpt: 'Flaches, warmes Wasser und entspannte Atmosphäre: Der Ossiacher See ist ideal für Familien und alle, die einfach abschalten wollen.',
    date: '2026-05-12',
    category: 'Baden',
    region: 'kaernten',
    bestSeason: 'Juni–September',
    highlights: ['Familienfreundlichster Kärntner See', 'SUP & Kanu-Verleih vor Ort', 'Deutlich günstiger und ruhiger als Wörthersee'],
    content: `
Der Ossiacher See liegt zwischen Villach und Feldkirchen und ist mit seiner flachen Uferzone und dem warmen Wasser besonders bei Familien beliebt. Kein Glamour wie am Wörthersee – dafür authentisch und entspannt.

## Freistrand Ossiach (kostenlos)
Der schönste Gratisstrand am See. Gut erreichbar, mit Wiese zum Liegen und flachem Einstieg. Im Sommer bevölkert, aber nicht überlaufen.

## Strandbad Bodensdorf (mit Eintritt)
Gut ausgestattetes Strandbad mit Wasserrutsche, Beachvolleyball und Gastronomie. Besonders beliebt bei Jugendlichen.

## SUP und Kanu am Ossiacher See
Der See ist ideal für Stand-Up-Paddling und Kanufahren. Mehrere Verleihstationen rund um den See.

## Stift Ossiach
Das ehemalige Benediktinerstift direkt am Seeufer ist heute Kulturzentrum und Veranstaltungsort der Carinthischen Musiksommer. Ein Besuch lohnt sich.

## Unterkunft-Tipp
Campingplätze direkt am Seeufer sind die günstigste und schönste Art, den Ossiacher See zu genießen.
    `,
    affiliateLinks: [
      { label: 'Hotels am Ossiacher See – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Ossiacher+See' },
      { label: 'SUP Board günstig – Amazon', url: 'https://www.amazon.de/s?k=sup+board+set' },
    ],
  },
  {
    slug: 'grossglockner-tagesausflug',
    title: 'Großglockner Hochalpenstraße – Tagesausflug mit Wow-Faktor',
    excerpt: 'Österreichs höchster Berg, Gletscher hautnah und eine legendäre Panoramastraße: Der Großglockner ist ein Muss für jeden Kärnten-Besucher.',
    date: '2026-05-08',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Juni–Oktober',
    highlights: ['Österreichs höchster Berg hautnah erleben', 'Pasterzegletscher direkt am Weg', 'Von Kärnten aus bequem als Tagesausflug'],
    content: `
Die Großglockner Hochalpenstraße ist eine der schönsten Alpenstraßen der Welt – und von Kärnten aus bequem als Tagesausflug erreichbar.

## Die Strecke
Von Heiligenblut in Kärnten führt die Straße auf 2.504 Meter Seehöhe hinauf zur Kaiser-Franz-Josefs-Höhe mit direktem Blick auf den Großglockner (3.798 m) und den Pasterzegletscher.

## Kaiser-Franz-Josefs-Höhe
Das Besucherzentrum auf 2.369 m bietet Ausstellungen zum Gletscher, Panoramaterrassen und einen kurzen Wanderweg direkt zum Gletscherrand. Der Pasterze ist Österreichs längster Gletscher.

## Edelweißspitze (2.571 m)
Die höchste befahrbare Stelle der Straße – mit einem 360°-Panorama über 37 Dreitausender. Ein kurzer Fußweg führt zum Gipfelkreuz.

## Fuscher Törl und Hexenküche
Weitere Aussichtspunkte entlang der Strecke mit Informationstafeln über Geologie und Geschichte.

## Praktische Infos
Die Straße ist mautpflichtig (Tagesticket ca. 40 €/Auto). Geöffnet von Mai bis November, je nach Schneelage. Warme Kleidung einpacken – oben kann es auch im Sommer kalt sein.

## Anfahrt aus Kärnten
Von Villach ca. 1,5 Stunden, von Klagenfurt ca. 2 Stunden über Heiligenblut.
    `,
    affiliateLinks: [
      { label: 'Hotels in Heiligenblut – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Heiligenblut+K%C3%A4rnten' },
      { label: 'Fernglas für Bergtouren – Amazon', url: 'https://www.amazon.de/s?k=fernglas+wandern' },
    ],
  },
  {
    slug: 'klopeiner-see-badeurlaub',
    title: 'Klopeiner See – Baden im wärmsten See Österreichs',
    excerpt: 'Mit bis zu 29°C Wassertemperatur ist der Klopeiner See Österreichs wärmster Badesee – und deutlich günstiger als der Wörthersee. Hier erfährst du die besten Badestellen und Insider-Tipps.',
    date: '2026-05-24',
    category: 'Baden',
    region: 'kaernten',
    bestSeason: 'Juli–August',
    highlights: ['Wärmster See Österreichs – bis zu 29°C', 'Deutlich günstiger und ruhiger als Wörthersee', 'Gratis-Badestrand und Geheim-Waldsee inklusive'],
    content: `
Der Klopeiner See in Südkärnten ist mit einer Durchschnittstemperatur von 26–29°C der wärmste See Österreichs – und das ist kein Marketing-Slogan, sondern durch Messreihen seit Jahrzehnten belegt. Der Grund: Das flache Becken (max. 10 m tief), viel Sonne und kaum Wind wärmen das Wasser schneller als jeden anderen heimischen See.

## Warum der Klopeiner See anders ist

Kein Glamour wie am Wörthersee, keine Promis – dafür ehrliche Badefamilien, günstigere Preise und tatsächlich das wärmste Wasser Österreichs. Wer echte Sommerfrische sucht, ist hier goldrichtig.

## Die besten Badestellen

### Strandbad Klopein (mit Eintritt, ca. 8 €)
Das Hauptstrandbad mit Wasserrutsche, Sprungturm und Beachvolleyball. Für Familien mit Kindern erste Wahl. Gastronomie direkt am Strand.

### Freistrand St. Kanzian (kostenlos)
Der beste Gratisstrand am See – ruhige Lage, flacher Einstieg, Liegewiese mit Bäumen für Schatten. Früh ankommen lohnt sich.

### Schwarzensee (kostenlos) – Geheimtipp
Ein kleiner Waldsee 2 km vom Klopeiner See entfernt – noch ruhiger, noch wärmer, noch unbekannter. Kein Tourist, keine Gebühr.

## Tipp: Kombination Spaziergang + Baden
Die Seepromenade rund um den Klopeiner See (7 km, flach) geht man am besten früh morgens – bevor die Hitze kommt. Danach direkt ins Wasser.

## Praktische Infos
- Anfahrt: Von Klagenfurt ca. 30 Minuten über die B70
- Parken: Strandbad Klopein ca. 5 €/Tag; Straßenparken am Freistrand kostenlos, aber begrenzt
- Übernachtung: Ferienwohnungen ab 60 €/Nacht – deutlich günstiger als Wörthersee
    `,
    affiliateLinks: [
      { label: 'Unterkünfte am Klopeiner See – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Klopeiner+See' },
      { label: 'Strandaccessoires auf Amazon', url: 'https://www.amazon.de/s?k=strand+set+sommer' },
    ],
  },
  {
    slug: 'faaker-see-badestellen',
    title: 'Faaker See – Türkisblaues Bergwasser mit Panoramablick',
    excerpt: 'Der Faaker See leuchtet türkisblau wie die Adria, im Hintergrund thront der markante Mittagskogel. Warum dieser See der schönste Kärntens sein könnte – und wie man ihn am besten genießt.',
    date: '2026-05-21',
    category: 'Baden',
    region: 'kaernten',
    bestSeason: 'Juni–September',
    highlights: ['Türkisblaues Wasser wie die Adria', 'Bergpanorama mit Mittagskogel (2.143 m)', 'Ruhiger und naturnaher als der Wörthersee'],
    content: `
Der Faaker See liegt 15 km südlich von Villach und ist einer der schönsten Seen Kärntens – nicht der bekannteste, aber vielleicht der malerischste. Das türkisblaue Wasser entsteht durch den kalkhaltigen Untergrund, und im Hintergrund thront unverkennbar der Mittagskogel (2.143 m).

## Was den Faaker See besonders macht

Kein Massentourismus wie am Wörthersee. Das Wasser erwärmt sich im Sommer auf 25–27°C – kühler als der Klopeiner See, dafür außergewöhnlich klar. Die Landschaft erinnert an Südtirol.

## Beste Badestellen

### Strandbad Egg (mit Eintritt)
Das schönste Strandbad mit direktem Blick auf den Mittagskogel. Boot- und SUP-Verleih vor Ort, gute Gastronomie.

### Freistrand an der Seepromenade (kostenlos)
Mehrere öffentliche Zugänge entlang der Westseite – ruhig, naturnah, bei Einheimischen beliebt.

## Wichtig: Harley-Davidson-Woche im September
Jeden September findet die European Bike Week statt – dann ist der ganze Ort voll mit Motorradfahrern. Wer das vermeiden möchte, kommt besser vorher oder nach Oktober.

## Rund um den See
Die Seerundfahrt mit dem Fahrrad (9 km, flach) schafft man in 45 Minuten. Anschließend lohnt ein Besuch der Burgruine Finkenstein mit Ausblick auf See und Mittagskogel.

## Anfahrt
Von Villach ca. 20 Minuten mit dem Auto. Direktzug von Villach Hauptbahnhof nach Faak am See (ÖBB, ca. 20 Min.).
    `,
    affiliateLinks: [
      { label: 'Hotels am Faaker See – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Faaker+See' },
      { label: 'SUP Board für den Urlaub – Amazon', url: 'https://www.amazon.de/s?k=sup+board+set' },
    ],
  },
  {
    slug: 'gratis-badestellen-kaernten-insider',
    title: 'Gratis Baden in Kärnten – 8 geheime Badestellen abseits der Touristenströme',
    excerpt: 'Während Strandbäder im Sommer Eintritt kosten und überlaufen sind, gibt es in Kärnten noch echte Geheimtipps: kostenlose Badestellen in unberührter Natur, kaum bekannt bei Touristen.',
    date: '2026-05-26',
    category: 'Baden',
    region: 'kaernten',
    bestSeason: 'Juli–August',
    highlights: ['8 kostenlose Badestellen – nur bei Einheimischen bekannt', 'Naturbelassen, ruhig und ohne Gedränge', 'Von Waldseen bis Alpenseen auf 1.400 m'],
    content: `
Kärntens bekannteste Strandbäder kosten Eintritt und sind im Hochsommer überlaufen. Aber das Bundesland hat über 1.270 Seen – und viele davon haben kostenlose, nahezu unbekannte Zugänge, an denen man fast alleine ist.

## 8 geheime Gratis-Badestellen

### 1. Forstsee bei Klagenfurt
Kleiner Waldsee im Stadtwald – 15 Minuten vom Stadtzentrum entfernt. Kristallklares Wasser, Liegewiesen unter alten Bäumen. Fast nur Klagenfurter kennen ihn. Kein Eintritt.

### 2. Brennsee bei Steindorf (Ossiacher See)
Kleiner Badesee hinter dem Ossiacher See, den kaum jemand kennt. Im August bis 28°C warm. Kleiner Parkplatz direkt am Ufer.

### 3. Keutschacher See – Nordufer (kostenlos)
Am bekannten Keutschacher See gibt es am Nordufer einen kaum frequentierten Freiabschnitt – Liegewiese, Schilf, perfekt für Frühschwimmer ohne Gedränge.

### 4. Rauschelesee auf der Villacher Alpe
Kleiner Bergsee auf 1.027 m Höhe, ca. 2 km Fußweg vom Parkplatz. Kühleres Wasser (max. 22°C), aber absolute Stille und Bergpanorama statt Gedränge.

### 5. Silbersee Spittal an der Drau
Ehemaliger Schotterteich, heute naturbelassenes Badegewässer. Tiefes, klares Wasser – besonders gut für Schwimmer, die auch mal tauchen möchten.

### 6. Almsee Flattnitz (Nockberge)
Auf 1.400 m Höhe – kalt (max. 18°C), aber nach einer Wanderung ein unvergessliches Erlebnis. Kein anderer Badegast weit und breit.

### 7. Lärchach-Teiche Villach
Drei kleine Teiche in einem Naturschutzgebiet am Stadtrand von Villach. Warm, ruhig, kostenlos – und trotzdem kaum bekannt.

### 8. Längsee (St. Veit an der Glan)
Kleiner Waldsee mit historischem Damm und glasklarem Wasser. Das ehemalige Kloster direkt daneben macht den Ort magisch.

## Verhaltenstipps
Müll immer mitnehmen – nur so bleiben diese Stellen erhalten. Früh morgens kommen, da Einheimische früh starten. Manche Stellen sind nicht offiziell ausgewiesen – Baden auf eigene Verantwortung.
    `,
    affiliateLinks: [
      { label: 'Wasserdichte Tasche für Ausflüge – Amazon', url: 'https://www.amazon.de/s?k=wasserdichte+tasche+strand' },
    ],
  },
  {
    slug: 'burg-hochosterwitz-ausflug',
    title: 'Burg Hochosterwitz – Mittelalter pur in Kärnten',
    excerpt: 'Auf einem 176 Meter hohen Felsblock thronend ist Burg Hochosterwitz eine der eindrucksvollsten Burgen Österreichs – und soll Walt Disney als Vorlage für Dornröschens Schloss gedient haben.',
    date: '2026-05-17',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Mai–Oktober',
    highlights: ['Spektakulärste Burganlage Österreichs', '14 original erhaltene Torabschnitte', 'Perfekte Kombination mit dem Gurker Dom'],
    content: `
Es gibt Burgen, und dann gibt es Burg Hochosterwitz. Auf einem 176 Meter hohen, freistehenden Felsblock thronend ist sie eine der eindrucksvollsten und meistfotografierten Burgen Österreichs – Walt Disney soll sie als Inspiration für das Schloss im Dornröschen-Film genutzt haben.

## Geschichte

Die Burg wurde erstmals 860 n. Chr. urkundlich erwähnt und war jahrhundertelang ein zentrales Bollwerk gegen türkische Invasionen. Die 14 Torgassen auf dem Aufstieg wurden im 16. Jahrhundert erbaut und sind bis heute nahezu original erhalten – einzigartig in Europa.

## Der Aufstieg: Durch 14 Tore

Jedes der 14 Tore hatte eine eigene Verteidigungsfunktion. Man wandert buchstäblich durch die Geschichte der Habsburgerzeit. Der Aufstieg dauert 30–40 Minuten und ist auch für ältere Besucher gut machbar. Oben erwartet eine vollständig erhaltene Burganlage mit beeindruckendem Waffenmuseum.

## Was macht Hochosterwitz besonders?
- Keine Massen wie bei Schloss Neuschwanstein
- Originalerhaltene Verteidigungsanlage – kein Rekonstruktions-Klotz
- Fantastische Aussicht über das gesamte Klagenfurter Becken
- Romantisches Restaurant in der Burg – Mittagessen im Mittelalter-Ambiente

## Praktische Infos
- Öffnungszeiten: Mai–Oktober täglich 9–18 Uhr
- Eintritt: Erwachsene ca. 14 €, Kinder ca. 7 €
- Parken: Parkplatz am Fuß der Burg, kostenlos
- Anfahrt: 30 km nordöstlich von Klagenfurt (A2, Abfahrt Brückl)
- Tipp: Dienstag und Donnerstag nachmittags am wenigsten besucht

## Kombination: Hochosterwitz + Gurk an einem Tag

Vom Hochosterwitz weiter nach Gurk zum romanischen Dom (12. Jahrhundert) – eines der bedeutendsten Kunstdenkmäler Österreichs, mit einzigartiger Krypta. Der Umweg beträgt nur 20 km. Ein perfekter Kärnten-Kulturtag.
    `,
    affiliateLinks: [
      { label: 'Hotels in der Region St. Veit – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=St.+Veit+an+der+Glan' },
    ],
  },
  {
    slug: 'klagenfurt-stadtfuehrung',
    title: 'Klagenfurt entdecken – die besten Sehenswürdigkeiten der Kärntner Hauptstadt',
    excerpt: 'Klagenfurt wird von den meisten nur als Sprungbrett zum Wörthersee genutzt – zu Unrecht. Die Landeshauptstadt hat schöne Plätze, exzellente Restaurants und einzigartige Denkmäler.',
    date: '2026-05-16',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'April–Oktober',
    highlights: ['Stadtführung zu Fuß in 2 Stunden möglich', 'Lindwurm, Landhaus und Strandbad am See', 'Konkrete Restaurantempfehlungen mit Preisen'],
    content: `
Die meisten Kärnten-Besucher fahren durch Klagenfurt durch, auf dem Weg zum Wörthersee. Schade – denn die Landeshauptstadt hat eine lebendige Innenstadt, schöne Plätze und Sehenswürdigkeiten, die sich in zwei Stunden entspannt zu Fuß erkunden lassen.

## Die wichtigsten Sehenswürdigkeiten

### Neuer Platz & Lindwurmbrunnen
Das Wahrzeichen Klagenfurts: Der Lindwurm – ein mythisches Ungeheuer aus der Stadtlegende – thront über dem Brunnen am Hauptplatz. Perfekter Startpunkt für den Stadtrundgang. Gratis.

### Landhaus Klagenfurt
Prächtiges Renaissance-Gebäude aus dem 17. Jahrhundert. Der Wappensaal zeigt die bemalten Wappen aller Kärntner Gemeinden – beeindruckend und kostenlos besichtigbar.

### Dom zu Klagenfurt
Barockdom mit beeindruckendem Innenraum. 20 Minuten gut investiert, gratis.

### Stadtpfarrkirche St. Egid
Weniger bekannt als der Dom, aber architektonisch interessanter – schöne Stuckaturen aus dem Barock.

## Stadtspaziergang-Route (2 Stunden)
Neuer Platz → Alte Rathausgasse → Dom → Landhaus → Herrengasse → Benediktinerplatz → Viktringer Ring → zurück zum Ausgangspunkt.

## Essen in Klagenfurt – konkrete Empfehlungen
- **Benediktinermarkt**: Täglich (außer So.) frische Marktstände, Käse, Wurst, Gemüse – der schönste Markt Kärntens
- **Zum Augustin** (Pfarrplatz): Kärntner Küche, hervorragende Käsknödel, Hauptgericht ca. 14–18 €
- **Café Musil**: Wiener Kaffeehauskultur in Klagenfurt, bestes Frühstück der Stadt

## Strandbad Klagenfurt
Nur 4 km vom Stadtzentrum – das riesige Strandbad am Wörthersee ist gleichzeitig Naherholungsgebiet. Im Sommer über 6 km Uferpromenade.

## Anreise
Bahn: Von Wien Hauptbahnhof ca. 3,5 Stunden. Von Graz ca. 2,5 Stunden (Südbahn).
Parken: Tiefgarage Heiligengeistplatz, 24/7 geöffnet, günstiger als Innenstadtparkplätze.
    `,
    affiliateLinks: [
      { label: 'Hotels in Klagenfurt – booking.com', url: 'https://www.booking.com/city/at/klagenfurt.de.html' },
    ],
  },
  {
    slug: 'drauradweg-klagenfurt-villach',
    title: 'Drauradweg: Mit dem Rad von Klagenfurt nach Villach',
    excerpt: '50 km flach entlang der Drau, weitgehend verkehrsfrei und durch unberührte Auwälder – der Drauradweg ist eine der schönsten Radtouren Kärntens. Rückfahrt bequem per Zug.',
    date: '2026-05-14',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'April–Oktober',
    highlights: ['50 km flach und weitgehend verkehrsfrei', 'Für alle Fitnesslevel geeignet', 'Rückfahrt per Bahn in 30 Minuten'],
    content: `
Der Drauradweg von Klagenfurt nach Villach ist einer der angenehmsten Radwege Kärntens: 50 km flach entlang des Flusses, größtenteils verkehrsfrei, durch Auwälder, an ruhigen Flussabschnitten und kleinen Dörfern vorbei.

## Streckenübersicht
- Start: Klagenfurt Stadthafen (Wörthersee, Parkplatz)
- Ziel: Villach Hauptbahnhof
- Länge: ca. 50 km
- Höhenmeter: unter 200 m gesamt – sehr flach
- Schwierigkeit: leicht, auch für untrainierte Radfahrer

## Etappen

### Klagenfurt → Feistritz/Drau (17 km)
Entlang der Glan durch das Stadtgebiet und dann entlang der Drau in die Aulandschaft. Gut beschildert (Radwegzeichen R2).

### Feistritz → Rosegg (15 km)
Der schönste Abschnitt: Auwälder, Drauknie, Wildwasser-Kanutraining am Ufer. Hier lohnt eine Pause im Gasthof.

### Rosegg → Villach (18 km)
Durch das breite Drautal, vorbei an Schloss Rosegg mit Tierpark (Eintritt ca. 12 €), nach Villach.

## Rückfahrt
Mit dem Zug von Villach nach Klagenfurt (30 Min., Fahrrad kostenpflichtig, ca. 3 € Aufpreis). Oder Punkt-zu-Punkt-Fahrt ohne Rückweg.

## Nur den besten Teil fahren?
Der Abschnitt Feistritz–Rosegg (15 km) ist der schönste. Als Hin- und Rückweg ergibt das eine bequeme 30-km-Tour.

## Praktische Infos
- Fahrradverleih: ÖBB Radverleih am Klagenfurter Hauptbahnhof, ca. 25 €/Tag
- Einkehr: Gasthäuser in Rosegg (direkt am Radweg) und Feistritz
- Kinder: Weg ist kinderwagentauglich für die ersten 25 km
    `,
    affiliateLinks: [
      { label: 'Fahrradtaschen & Zubehör – Amazon', url: 'https://www.amazon.de/s?k=fahrradtasche+lenker' },
    ],
  },
  {
    slug: 'woerthersee-hotels-alle-budgets',
    title: 'Wörthersee-Unterkünfte für jedes Budget – vom Camping bis zum Luxushotel',
    excerpt: 'Ob Luxushotel in Velden, günstige Ferienwohnung in Maria Wörth oder Campingplatz direkt am Seeufer – hier findest du die passende Unterkunft für jedes Budget am Wörthersee.',
    date: '2026-05-23',
    category: 'Unterkunft',
    region: 'kaernten',
    bestSeason: 'Ganzjährig',
    highlights: ['Überblick von Camping (22 €) bis Luxus (300 €+)', 'Günstige Geheimtipps abseits von Velden', 'Konkrete Buchungshinweise für Hochsaison'],
    content: `
Der Wörthersee gilt als mondäner Urlaubssee – und das stimmt für Velden und Pörtschach. Aber: Es gibt für jedes Budget die richtige Unterkunft. Hier ist der komplette Überblick, damit du nicht zu viel zahlst.

## Luxus: Velden am See (ab 300 €/Nacht)

### Casino Velden & Casineum Hotel
Direkt am See, historisches Gebäude, exzellenter Service. Die bekannteste Adresse am Wörthersee. Buchung früh, da oft ausgebucht.

### Seepark Hotel Klagenfurt
Weniger bekannt als Velden, dafür direkter Seezugang und modernes Design. Häufig günstiger als die Veldener Konkurrenz bei gleichem Komfort.

## Mittelklasse: 80–180 €/Nacht

### Pörtschach – beste Mittelklasse-Option
Ruhiger als Velden, aber ebenfalls direkt am See. Hotels mit Seezugang ab 100 €/Nacht. Gute Infrastruktur, kurze Wege.

### Krumpendorf – unterschätzter Geheimtipp
Gemeinde am Ostufer – günstigere Unterkünfte bei identischem Seeblick und ruhigerem Ambiente. Autobus nach Klagenfurt fährt regelmäßig.

## Budget: Ferienwohnungen & Camping (22–70 €/Nacht)

### Ferienwohnungen in Maria Wörth
Südliches Seeufer, weniger touristisch als Norden, private Vermieter oft sehr günstig. Suche auf booking.com oder Airbnb.

### Camping Metnitzstrand Klagenfurt
Campingplatz direkt am Wörthersee, nur 5 km vom Stadtzentrum. Stellplatz ab 22 €/Nacht, Bungalows ab 50 €.

## Worauf immer achten
- Seezugang: Nicht alle "Seehotels" haben direkten Zugang – im Zweifelsfall nachfragen oder in den Fotos prüfen
- Parken: In Velden und Pörtschach teuer – Unterkunft mit kostenlosem Parkplatz wählen
- Hochsaison Juli/August: Mindestens 3 Monate vorher buchen
- Nebensaison Mai/Juni und September: Oft nur 60% des Sommerpreises
    `,
    affiliateLinks: [
      { label: 'Hotels am Wörthersee – booking.com', url: 'https://www.booking.com/region/at/worthersee.de.html' },
      { label: 'Ferienwohnungen am Wörthersee – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=W%C3%B6rthersee&nflt=ht_id%3D220' },
    ],
  },
  {
    slug: 'glamping-kaernten-tipps',
    title: 'Glamping in Kärnten – die schönsten Naturübernachtungen mit Komfort',
    excerpt: 'Safarizelt am Faaker See, Almhütte auf dem Dobratsch, Öko-Lodge am Weissensee – Kärnten bietet einzigartige Glamping-Erlebnisse zwischen Bergen und Seen.',
    date: '2026-05-19',
    category: 'Unterkunft',
    region: 'kaernten',
    bestSeason: 'Mai–September',
    highlights: ['Naturnächte ohne eigene Ausrüstung nötig', 'Von Safarizelt bis Baumhaus', 'Romantikpakete mit lokalem Wein & Almjause'],
    content: `
Glamping – also Camping mit Komfort – hat sich in Kärnten in den letzten Jahren enorm entwickelt. Die Kulisse aus Bergen und Seen macht die Region prädestiniert für außergewöhnliche Übernachtungserlebnisse ohne Abstriche beim Komfort.

## Was ist Glamping?
Zwischen einfachem Camping und Hotelzimmer: vorgefertigte Zelte, Holzlodges oder Almhütten mit Bett, oft eigenem Bad und manchmal Frühstücksservice. Keine eigene Ausrüstung nötig.

## Die besten Glamping-Spots in Kärnten

### Safarizelt am Faaker See
Direkt am türkisblauen Wasser, mit Seeblick vom Bett. Ab ca. 120 €/Nacht für 2 Personen. Frühstück auf der Terrasse mit Mittagskogel-Panorama.

### Almhütten auf der Villacher Alpe (Dobratsch)
Umgebaute Almhütten auf über 1.700 m Seehöhe, umgeben vom Naturpark. Einzigartige Lage, Sterne-Himmel ohne Lichtverschmutzung.

### Weissensee Öko-Lodge
Am unberührten Weissensee: Lodges aus Naturmaterialien, Motorbootverbot garantiert absolute Stille. Abends kein Lärm, nur Wasser und Wind.

### Bauernhof-Glamping in den Nockbergen
Kärntner Bauernhöfe im UNESCO-Biosphärenpark bieten zunehmend komfortable Unterkünfte – traditionelles Kärnten-Feeling mit Komfort.

## Preise und Buchung
- Preisrahmen: 80–200 €/Nacht für 2 Personen
- Buchung: Direkt beim Anbieter oder über glamping.info

## Wann buchen?
Glamping-Plätze sind limitiert. Für Juli/August spätestens im März buchen – besonders Seezugang-Plätze sind begehrt.

## Tipp für Romantiker
Almhütten mit eigenem Whirlpool und Bergblick sind die romantischste Option. Viele Anbieter haben Pärchenpakete mit lokalem Wein, Kärnter Jause und geführter Almwanderung.
    `,
    affiliateLinks: [
      { label: 'Glamping & besondere Unterkünfte Kärnten – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=K%C3%A4rnten&nflt=class%3D1' },
    ],
  },
  {
    slug: 'camping-kaernten-direkt-am-see',
    title: 'Camping direkt am Kärntner See – die 5 besten Plätze für Naturliebhaber',
    excerpt: 'Zelt auf, See direkt davor, morgens ins Wasser springen: Diese fünf Campingplätze in Kärnten bieten die unmittelbarste Verbindung zu Natur und Wasser – ab 20 €/Nacht.',
    date: '2026-05-11',
    category: 'Unterkunft',
    region: 'kaernten',
    bestSeason: 'Mai–September',
    highlights: ['5 Plätze direkt am Seeufer', 'Ab 20 €/Nacht (Zelt + 2 Personen)', 'Wörthersee, Millstätter See, Weissensee & mehr'],
    content: `
Es gibt keine naturverbundenere Art, Kärntens Seen zu erleben, als morgens das Zelt zu öffnen und direkt ins Wasser zu springen. Diese fünf Campingplätze machen genau das möglich.

## Die 5 besten Campingplätze direkt am See

### 1. Camping Ossiacher See Süd – Strandcamping
- See: Ossiacher See, Südseite
- Lage: Direkt am Seeufer, flaches Gelände
- Preis: Ab 25 €/Nacht (2 Personen + Zelt)
- Besonderheit: Eigener Badestrand, Segelbootverleih, sehr familienfreundlich, gute Sanitäranlagen

### 2. Camping Brunner am See (Millstätter See)
- See: Millstätter See
- Lage: 50 Meter vom Seeufer
- Preis: Ab 30 €/Nacht
- Besonderheit: Familienbetrieb seit 60 Jahren, ruhige Lage, hervorragende Sanitäranlagen

### 3. Strandcamping Metnitz (Wörthersee)
- See: Wörthersee, Ostufer Klagenfurt
- Preis: Ab 22 €/Nacht
- Besonderheit: Günstigster Campingplatz mit direktem Wörthersee-Zugang, Stadtbus nach Klagenfurt verfügbar

### 4. Camping Techendorf (Weissensee)
- See: Weissensee auf 930 m Seehöhe
- Preis: Ab 20 €/Nacht
- Besonderheit: Motorbootverbot = absolute Stille, kristallklares Wasser, ursprüngliche Natur

### 5. Camping Berghof (Faaker See)
- See: Faaker See
- Preis: Ab 28 €/Nacht
- Besonderheit: Schönster Blick auf den Mittagskogel, gute Infrastruktur, Kanuverleih vor Ort

## Worauf beim Buchen achten
- Schatten: Im Hochsommer wichtig – auf Baumplätze achten und danach fragen
- Lärm: Plätze mit Disco/Bar meiden, wenn man Ruhe will
- Sanitäranlagen: Sehr unterschiedliche Qualität – aktuelle Bewertungen lesen
- Buchung: Für Juli/August mind. 3 Monate vorher reservieren, besonders am Wörthersee
    `,
    affiliateLinks: [
      { label: 'Campingzelt für 2 Personen – Amazon', url: 'https://www.amazon.de/s?k=campingzelt+2+personen+wasserdicht' },
      { label: 'Campingplätze Kärnten – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=K%C3%A4rnten&nflt=ht_id%3D9' },
    ],
  },
  {
    slug: 'villacher-alpe-dobratsch-wanderung',
    title: 'Villacher Alpe (Dobratsch) – Kärntens Hausberg mit Blick bis zur Adria',
    excerpt: 'Der Dobratsch ist von fast überall in Kärnten sichtbar – und vom Gipfel sieht man bei klarem Wetter bis zur Adria und zum Triglav. Naturpark, 1.000 Pflanzenarten und einfache Gipfelwanderung.',
    date: '2026-05-13',
    category: 'Wandern',
    region: 'kaernten',
    difficulty: 'mittel',
    bestSeason: 'Mai–Oktober',
    highlights: ['Panorama: Triglav, Großglockner, Adria sichtbar', 'Naturpark mit über 1.000 Pflanzenarten', 'Mit Auto bis 1.732 m – kurzer Gipfelaufstieg möglich'],
    content: `
Der Dobratsch, offiziell Villacher Alpe genannt, ist Kärntens unverwechselbares Wahrzeichen – von fast überall im Bundesland sichtbar. Als Naturpark geschützt und durch die mautpflichtige Villacher Alpenstraße bis auf 1.732 m erreichbar, ist er ein ideales Ziel für alle Fitnesslevel.

## Warum der Dobratsch besonders ist
- Panorama der Extraklasse: Bei klarem Wetter Triglav (Slowenien), Großglockner und sogar die Adria
- Naturpark seit 1996: Über 1.000 Pflanzenarten auf engstem Raum – einmalig in Kärnten
- Zugänglich: Straße bis fast zum Gipfel – kurze Wanderung für jeden machbar

## Wanderrouten

### Route 1: Rosenalm – Gipfel (mittel, 2 Stunden)
Von der Rosenalm (Parkplatz auf 1.732 m) auf den Gipfel (2.166 m): 434 Höhenmeter, gut markierter Weg. Das Panorama vom Gipfelkreuz ist der Höhepunkt jedes Kärnten-Urlaubs.

### Route 2: Kräuterwanderweg (leicht, 1,5 Stunden)
Thematischer Weg ab dem Naturparkhaus mit Infotafeln zu Heilpflanzen und Kräutern. Ideal für Familien und naturinteressierte Wanderer.

### Route 3: Aufstieg aus Villach (schwer, 5–6 Stunden)
Direkt aus dem Stadtgebiet – 1.600 Höhenmeter. Nur für Konditionsstarke mit guten Bergschuhen.

## Naturpark-Highlight: Orchideen im Juni
Im Juni und Juli blühen auf der Rosenalm seltene Orchideenarten, Enzian und Alpenpflanzen. In keinem anderen Kärntner Gebiet gibt es eine solche Pflanzenvielfalt auf kleinem Raum.

## Geologische Besonderheit: Das Erdbeben von 1348
Der Dobratsch birgt Spuren einer Naturkatastrophe: Das Erdbeben von 1348 löste einen massiven Bergsturz aus, dessen Trümmerfelder im Tal noch heute sichtbar sind. Informationstafeln erklären die Geschichte.

## Praktische Infos
- Villacher Alpenstraße: Mautpflichtig, ca. 12 €, keine Jahreskarte anwendbar
- Parkplatz Rosenalm: Kostenlos nach der Mautstation
- Naturparkhaus: Gratis Ausstellung zu Natur und Geschichte
- Restaurant Kanzelhöhe (1.520 m): Beliebt, im Sommer oft voll – früh kommen oder reservieren
    `,
    affiliateLinks: [
      { label: 'Bergschuhe für Kärntner Wanderungen – Amazon', url: 'https://www.amazon.de/s?k=bergschuhe+herren+mittelhoch' },
      { label: 'Hotels in Villach – booking.com', url: 'https://www.booking.com/city/at/villach.de.html' },
    ],
    trails: [
      {
        name: 'Rosenalm – Dobratsch Gipfel',
        difficulty: 'mittel', length: '6 km', duration: '2 Std.', ascent: '434 hm',
        coords: [[46.5985, 13.6720], [46.6010, 13.6790], [46.6035, 13.6850], [46.6064, 13.6903]],
      },
      {
        name: 'Kräuterwanderweg',
        difficulty: 'leicht', length: '4 km', duration: '1,5 Std.', ascent: '120 hm',
        coords: [[46.5950, 13.6680], [46.5965, 13.6720], [46.5980, 13.6760], [46.5960, 13.6700]],
      },
    ],
  },
  {
    slug: 'velden-am-woerthersee-urlaub',
    title: 'Velden am Wörthersee – Glamour, Strandbad und echtes Dorfleben',
    excerpt: 'Velden ist der bekannteste Urlaubsort Kärntens – und zu Unrecht als reine Promi-Location abgestempelt. Was der Ort wirklich zu bieten hat, und wann man ihn am besten besucht.',
    date: '2026-05-27',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Mai–September',
    highlights: ['Berühmte Seepromenade & Casino', 'Strandbad mit direktem Seezugang', 'Belebte Sommerabende mit Konzerten & Events'],
    content: `
Velden polarisiert. Für manche ist es das mondäne Herz Kärntens – für andere der touristischste, überfüllteste Ort am Wörthersee. Beide Seiten haben recht. Aber wer zur richtigen Zeit kommt und die richtigen Orte kennt, erlebt hier eines der schönsten Seenorte Österreichs.

## Die Seepromenade

Die rund 2 km lange Promenade zwischen Seeufer und historischen Villen ist der Kern von Velden. Morgens vor 9 Uhr ist sie fast leer – der beste Moment. Man läuft am Wasser entlang, sieht die alten Bootshäuser, trinkt Kaffee an einem der wenigen Lokale, die früh öffnen. Abends dieselbe Strecke wieder: Musik aus den Bars, Fußgänger, Gondeln auf dem See.

## Casino Velden

Das Schloss-Casino direkt am See ist eine Sehenswürdigkeit für sich – auch wenn man nicht spielt. Das Gebäude (Baujahr 1892) wurde mehrfach umgebaut und ist heute eines der schönsten Casinos Österreichs. Tagsüber ist die Terrasse zum See hin öffentlich zugänglich, und der Blick über den See ist spektakulär.

## Strandbad Velden (Loretto)

Das Loretto-Strandbad liegt 10 Gehminuten vom Ortskern. Sauberes Wasser, ordentliche Infrastruktur, Liegestühle zum Mieten. Eintritt ca. 8 € – in Velden für diese Qualität faire Preise.

## Wann kommen?

- **Mai/Juni**: Promenade fast menschenleer, Temperaturen angenehm, Hotelpreise deutlich unter Hochsaison
- **Juli/August**: Lebhaftes Treiben, Konzerte auf der Promenade, Schiffsverkehr – aber auch Gedränge
- **September**: Geheimtipp: Der Sommer verabschiedet sich, das Wasser ist noch warm (23–25°C), Touristen weg

## Praktische Infos
- Parken: Gebührenpflichtig im Ortszentrum, kostenloser Parkplatz ca. 1 km außerhalb
- Anreise: ÖBB Direktzug von Klagenfurt (20 Min.), von Villach (25 Min.)
- Tipp: Zimmer in Krumpendorf oder Pörtschach buchen – 40% günstiger, Bustransfer möglich
    `,
    affiliateLinks: [
      { label: 'Hotels in Velden – booking.com', url: 'https://www.booking.com/city/at/velden-am-worthersee.de.html' },
    ],
  },
  {
    slug: 'bad-kleinkirchheim-therme-ski',
    title: 'Bad Kleinkirchheim – Therme und Skigebiet in einem',
    excerpt: 'Bad Kleinkirchheim ist Kärntens einziger Ort, wo man direkt vom Skigebiet in eine der schönsten Alpentherme Österreichs einfahren kann. Was es kostet, wie man kombiniert, und welche Pisten wirklich lohnen.',
    date: '2026-05-28',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Dezember–März (Ski), Ganzjährig (Therme)',
    highlights: ['Einziges Skigebiet mit Direkt-Thermenanschluss in Kärnten', '101 km Pisten, ideal für Familien und Fortgeschrittene', 'St. Kathrein Therme direkt an der Talstation'],
    content: `
Bad Kleinkirchheim (BKK) ist das einzige Skigebiet Österreichs, bei dem man buchstäblich von der Piste direkt in eine Therme einfahren kann. Das macht es einzigartig – und erklärt, warum es trotz vergleichsweise teurer Skipässe regelmäßig ausgebucht ist.

## Das Skigebiet

101 km Pisten, 25 Liftanlagen, Seehöhe bis 2.055 m. Für wen ist BKK ideal?
- **Familien**: Breite, gut präparierte Anfänger- und Mittelklassepisten, kaum gefährliche Steilhänge
- **Fortgeschrittene**: Der Kaiserburg-Hang ist eine der schönsten schwarzen Pisten Kärntens – aber ehrlich gesagt gibt es wildere Gebiete in Tirol
- **Thermafans**: Alle

### Was BKK nicht ist
BKK ist kein Freeride-Gebiet und nichts für Powder-Jäger. Wer extreme Hänge sucht, ist in Saalbach oder Lech besser aufgehoben. BKK ist für komfortables, entspanntes Skifahren mit Pool-Garantie danach.

## Die Römerquelle und St. Kathrein Therme

Zwei Thermen im Ort: Die **St. Kathrein Therme** ist direkt an der Talstation – ideal für nach dem Ski. Die **Römerquelle Therme** ist etwas größer, mit Außenbecken und Panoramablick auf die verschneiten Berge. Eintritt je ca. 18–22 € für 3 Stunden.

### Kombiangebot Ski + Therme
Viele Skischulen und Hotels bieten Kombi-Tagestickets an. Oft günstiger als Einzelkauf.

## Sommer in BKK

Auch im Sommer empfehlenswert: Die Therme ist ganzjährig geöffnet, und die Wanderwege um BKK (Nockberge) sind im Sommer hervorragend. Kombination Wanderung + Therme = perfekter Urlaubstag.

## Praktische Infos
- Skipass: Tageskarte ca. 55 € (Erwachsene), günstiger bei Mehrtages-Tickets
- Anreise: Von Villach oder Spittal ca. 45 Minuten
- Unterkunft: Hotels direkt an der Piste, aber früh buchen – BKK ist im Winter sehr beliebt
    `,
    affiliateLinks: [
      { label: 'Hotels in Bad Kleinkirchheim – booking.com', url: 'https://www.booking.com/city/at/bad-kleinkirchheim.de.html' },
      { label: 'Skibekleidung & Zubehör – Amazon', url: 'https://www.amazon.de/s?k=skibekleidung+set+erwachsene' },
    ],
  },
  {
    slug: 'nassfeld-skigebiet-hermagor',
    title: 'Nassfeld – Kärntens größtes Skigebiet mit Blick bis Italien',
    excerpt: 'Das Nassfeld bei Hermagor ist Kärntens größtes zusammenhängendes Skigebiet – 110 km Pisten, direkter Blick nach Italien und Pistenkilometer bis auf slowenisches Terrain. Alles was du wissen musst.',
    date: '2026-05-29',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Dezember–April',
    highlights: ['Kärntens größtes Skigebiet – 110 km Pisten', 'Grenzübergang Österreich–Italien auf der Piste', 'Besonders schneesicher durch Südlage'],
    content: `
Das Nassfeld liegt im Gailtal an der Grenze zu Italien – und das merkt man. Die Pistenkulisse zeigt südliche Berge, die Sonne scheint häufig (Südlage), und auf manchen Pisten kann man buchstäblich die Grenze überqueren.

## Zahlen zum Gebiet
- 110 km markierte Pisten
- 30 Liftanlagen
- Höhe: 600–2.020 m
- Schwerpunkt: 60% blau/rot, 40% schwarz

## Warum Nassfeld anders ist

### Schneesicherheit
Das Nassfeld liegt schneesicherer als die meisten Kärntner Gebiete – durch die südlichere Lage und die Höhe. Schneekanonen gibt es auch, aber oft braucht man sie nicht.

### Grenzpisten nach Italien (Passo Pramollo)
Vom Gipfel fährt man auf italienischem Terrain ab – andere Schilder, andere Hütten, anderes Flair. Kurz, aber eines der schönsten Grenz-Erlebnisse in den Alpen. Kein Pass, keine Kontrolle (Schengen).

### Hermagor – unterschätztes Tal
Das Gailtal unter dem Nassfeld ist eine der wenig touristischen Regionen Kärntens. Günstigere Unterkünfte, authentische Gasthäuser, wenig Après-Ski-Gedränge.

## Für wen ist das Nassfeld ideal?
- Fortgeschrittene Skifahrer, die abwechslungsreiche Pisten wollen
- Familien, die Wert auf Schneesicherheit legen
- Paare, die Kulisse über Aprés-Ski-Lärm stellen

## Nicht-Ski-Aktivitäten
Schneeschuhwandern auf der Garnitzenklamm (auch im Winter offen), Langlaufen im Gailtal (22 km Loipen), Rodeln auf der 5 km langen Familienstrecke.

## Praktische Infos
- Skipässe: Nassfeld-only oder kombiniert (Skiverbund Kärnten mit weiteren Gebieten)
- Anreise: Von Villach ca. 50 Minuten, von Klagenfurt ca. 90 Minuten
- Parken: Parkhaus direkt an der Talstation, ca. 8 €/Tag
    `,
    affiliateLinks: [
      { label: 'Hotels am Nassfeld / Hermagor – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Nassfeld+K%C3%A4rnten' },
      { label: 'Skihelm mit Visier – Amazon', url: 'https://www.amazon.de/s?k=skihelm+mit+visier' },
    ],
  },
  {
    slug: 'weissensee-winter-schlittschuhlaufen',
    title: 'Weissensee im Winter – Europas größte Natureisfläche',
    excerpt: 'Im Winter verwandelt sich der Weissensee in Europas größte natürliche Eislaufbahn. Bis zu 8 km Länge, kristallklares Eis, absolute Stille und null Lift-Gedränge. Ein Wintererlebnis der anderen Art.',
    date: '2026-05-30',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Januar–März',
    highlights: ['Europas größte Natureisfläche – bis 8 km', 'Eislaufen, Eisstockschießen & Langlaufen', 'Absolute Stille ohne Motorboote'],
    content: `
Im Sommer ist der Weissensee für sein kristallklares Wasser bekannt. Im Winter wird er zu einem der spektakulärsten Wintersportziele Europas: Die Natureisfläche ist die größte auf dem Kontinent – bei Volleis bis zu 8 km lang und 1,5 km breit.

## Was ist das Besondere?

Kein Massentourismus. Kein Lifttrubel. Die Weissensee-Saison hängt komplett vom Frost ab – wenn das Eis nicht trägt, öffnet die Fläche nicht. Das macht jeden Winter zu einem anderen Erlebnis und hält die Besucherzahlen auf natürlichem Niveau.

## Aktivitäten auf dem Eis

### Eislaufen
Die offizielle Eislaufbahn ist gespurt und markiert. Schlittschuhe kann man ausleihen (ca. 10 €/Tag). Ein Erlebnis der eigenen Art: Man gleitet über einen ganzen See.

### Eisstockschießen
Tiroler Tradition, in Kärnten am See zum Spektakel. Stöcke ausleihen, Bahnen reservieren – ideal für Gruppen.

### Langlaufen
Rund um den zugefrorenen See gibt es 25 km Langlaufloipen. Das flache Terrain ist auch für Anfänger perfekt.

### Eishockey und Curling
Anlässlich des „Weissensee Eis"-Events finden jährlich Eishockey- und Curling-Turniere statt. Atmosphäre wie aus einem anderen Jahrhundert.

## Wenn das Eis nicht trägt

Nicht jedes Jahr friert der See vollständig zu – das hängt vom Winter ab. Prüfe vor der Anreise die offizielle Website des Weissensees oder ruf beim Tourismusverband an. Enttäuschungsfahrten lassen sich so vermeiden.

## Kombination mit Skifahren
Das nächste Skigebiet (Nassfeld) ist 60 Minuten entfernt. Eis + Ski an zwei Tagen ist eine perfekte Wintertour durch das westliche Kärnten.

## Praktische Infos
- Anreise: Von Villach ca. 1,5 Stunden, von Klagenfurt ca. 2 Stunden
- Eislaufen: Kostenpflichtig (ca. 5–8 € Tageskarte), Schlittschuhverleih am See
- Unterkunft: Hotels und Pensionen direkt am Seeufer – im Winter deutlich günstiger als im Sommer
    `,
    affiliateLinks: [
      { label: 'Unterkünfte am Weissensee – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Weissensee+K%C3%A4rnten' },
      { label: 'Schlittschuhe für Erwachsene – Amazon', url: 'https://www.amazon.de/s?k=schlittschuhe+erwachsene' },
    ],
  },
  {
    slug: 'kaernten-kulinarik-kaesknodel-reindling',
    title: 'Kärntner Küche – Käsknödel, Reindling und was man sonst noch essen muss',
    excerpt: 'Kärnten hat eine der eigenständigsten Regionalküchen Österreichs. Käsknödel, Reindling, Kärntner Nudeln und der obligatorische Almteller – was es ist, wo man es am besten isst, und wie man es selber macht.',
    date: '2026-05-31',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Ganzjährig',
    highlights: ['Käsknödel – das Nationalgericht Kärntens', 'Reindling: Kärntner Germkuchen mit Zimt', 'Almhütten für authentische Kärntner Küche'],
    content: `
Kärnten ist das einzige österreichische Bundesland mit einer eigenen, klar definierten Regionalküche, die sich deutlich von der Wiener Tradition unterscheidet. Slowenische Einflüsse, alpine Zutaten und die Tradition der Almwirtschaft prägen die Gerichte. Wer in Kärnten isst, ohne Käsknödel zu probieren, hat etwas grundlegend verpasst.

## Käsknödel – das Nationalgericht

Der Käsknödel ist rund, kompakt und in heißer Butter gedreht. Innen: Kärnter Bergkäse (oft Lavanttal), Knoblauch, manchmal Kümmel. Dazu: Sauerkraut oder Blattsalat. Preis in Gasthäusern: 12–16 € für 3 Stück.

**Wo die besten?** Authentische Gasthäuser auf dem Land – Klagenfurter Restaurants sind teurer und oft weniger gut. Empfehlung: „Zum Augustin" am Pfarrplatz Klagenfurt oder jeder Almgasthof in den Nockbergen.

## Kärntner Nudeln (Kasnudeln)

Halbmondförmige Teigtaschen gefüllt mit Bröseltopfen, Minze und Kräutern – ein Gericht, das es sonst nirgendwo gibt. In einfacher Butter gedreht. Delikat und überraschend zart für einen Teigtaschenteller. Preis ca. 10–14 €.

## Reindling

Kärntens Sonntagskuchen. Ein süßes Germteig-Gebäck in einer Röhrenform, gefüllt mit Butter, Zimtzucker und manchmal Rosinen. Unterscheidet sich je nach Familie – manche machen ihn locker, manche kompakt. In Bäckereien erhältlich, am besten noch warm.

## Der Almteller (Brettljause)

Auf jeder Alm das Gleiche, überall leicht anders: Kärntner Hauswurst, Speck, Bergkäse, Radieschen, Butter, Brot. Dazu ein Glas Bier oder Most. Preis 12–18 €. Mehr braucht man nach einer Wanderung nicht.

## Kärntner Reindling selbst backen

Zutaten (für 1 Form): 500 g Mehl, 250 ml Milch, 80 g Butter, 2 Eier, 1 Pkg. Germ, 60 g Zucker, Prise Salz. Für die Füllung: 80 g Butter (weich), 100 g Zucker, 2 TL Zimt, optional Rosinen. Teig gehen lassen, ausrollen, füllen, aufrollen, in die gebutterte Form legen, nochmals gehen lassen, bei 180°C ca. 45 Min. backen.

## Wo essen in Kärnten

- **Almgasthöfe in den Nockbergen**: Authentischste Küche, günstigste Preise
- **Klagenfurt Benediktinermarkt**: Frische Produkte, mehrere Standln mit Käsknödeln
- **Velden Promenade**: Schöne Lage, aber höhere Preise
- **Gasthof Kreuzwirt** (Krumpendorf): Lokales Geheimtipp-Gasthaus, hervorragende Hausmannskost
    `,
    affiliateLinks: [
      { label: 'Kärntner Kochbuch – Amazon', url: 'https://www.amazon.de/s?k=k%C3%A4rntner+kochbuch+regionalk%C3%BCche' },
    ],
  },
  {
    slug: 'heiligenblut-grossglockner-dorf',
    title: 'Heiligenblut am Großglockner – das schönste Bergdorf Kärntens',
    excerpt: 'Mit der gotischen Kirche vor der Kulisse des Großglockners ist Heiligenblut eines der meistfotografierten Dörfer Österreichs – und der beste Ausgangspunkt für Touren zum höchsten Berg des Landes.',
    date: '2026-06-01',
    category: 'Wandern',
    region: 'kaernten',
    difficulty: 'schwer',
    bestSeason: 'Juni–Oktober',
    highlights: ['Ikonisches Postkartenpanorama: Kirchturm + Großglockner', 'Ausgangspunkt für Großglockner-Besteigungen', 'Kleines, authentisches Bergdorf ohne Massentourismus'],
    content: `
Es gibt Fotos, die man kennt, ohne zu wissen, woher sie kommen. Das schmale Kirchturmschiff, dahinter das schneebedeckte Massiv des Großglockners – das ist Heiligenblut. Ein Dorf mit 900 Einwohnern auf 1.288 m Seehöhe, in einem engen Tal gelegen, das nach oben ins Eis mündet.

## Das Dorf selbst

Heiligenblut ist kein Touristenkaff. Es hat wenige Hotels, keine Shoppingmeile, keine Après-Ski-Bars im touristischen Sinn. Was es hat: eine außergewöhnliche Lage, eine der schönsten gotischen Wallfahrtskirchen Österreichs (15. Jh.), und den unmittelbaren Zugang zu Österreichs höchstem Berg.

## Wandern in Heiligenblut

### Kaisertörl (mittel, 3 Stunden)
Auf 2.600 m – ein langer, aber technisch einfacher Anstieg. Von oben: direkte Sicht auf die Pasterze und den Glockner. Einer der lohnendsten Halbtagsausflüge in ganz Kärnten.

### Großglockner Normalroute (sehr schwer, 2 Tage)
Für erfahrene Bergsteiger mit Hochtourenerfahrung. Übernachtung in der Salmhütte oder Erzherzog-Johann-Hütte (2.802 m). Gipfelsturm über Ostgrat. Keine Klettersteigausrüstung nötig, aber Steigeisen und Pickel sind Pflicht.

## Großglockner Hochalpenstraße ab Heiligenblut

Die berühmte Panoramastraße beginnt hier. Von Heiligenblut aus fährt man direkt die Straße hinauf – ohne den Zubringer von Norden. Auf dieser Seite ist es oft ruhiger als auf der Salzburger Seite.

## Wissenswertes über das Dorf

Der Name „Heiligenblut" geht auf eine Legende zurück: Ein legendärer isländischer Ritter soll eine Ampulle mit dem Blut Christi hierher gebracht haben – die Ampulle soll noch immer in der Kirche aufbewahrt werden. Ob man das glaubt oder nicht: Die gotische Kirche selbst ist ein Kunstwerk.

## Praktische Infos
- Anfahrt: Von Spittal an der Drau ca. 1 Stunde, von Klagenfurt ca. 1,5 Stunden
- Parken: Im Ortszentrum, gebührenpflichtig im Sommer
- Kleidung: Auch im Sommer Regenjacke und warme Schicht einpacken – Wetter ändert sich schnell
    `,
    affiliateLinks: [
      { label: 'Hotels in Heiligenblut – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Heiligenblut' },
      { label: 'Hochtourenausrüstung – Amazon', url: 'https://www.amazon.de/s?k=hochtourenrucksack+steigeisen' },
    ],
  },
  {
    slug: 'schloss-rosegg-tierpark-ausflug',
    title: 'Schloss Rosegg mit Tierpark – Familienausflug zwischen Adel und Wildtieren',
    excerpt: 'Schloss Rosegg im Rosental verbindet historische Architektur mit einem der schönsten kleinen Tierparks Kärntens. Damwild, Waschbären und altes Schloss – ideal für einen halben Tag mit Kindern.',
    date: '2026-06-01',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'April–Oktober',
    highlights: ['Historisches Schloss mit englischem Landschaftsgarten', 'Kleiner Tierpark mit Damwild, Mufflons und Waschbären', 'Ideal als Zwischenstopp auf dem Drauradweg'],
    content: `
Das Rosental zwischen Klagenfurt und Ferlach ist eines der ruhigsten Täler Kärntens – und Schloss Rosegg liegt mittendrin. Das Schloss selbst ist im Besitz der Fürstenfamilie Auersperg, umgeben von einem großzügigen englischen Landschaftsgarten. Der kleine Tierpark daneben macht den Ausflug für Familien perfekt.

## Das Schloss

Schloss Rosegg (17./18. Jh.) ist nicht von innen besichtigbar, aber das Außengelände mit dem alten Baumbestand und den verschlungenen Wegen ist schön genug. Der englische Park im Stil des 19. Jahrhunderts ist einer der wenigen seiner Art in Kärnten.

## Der Tierpark

Klein, aber fein: Damwild, Sikahirsche, Mufflons, Wildschweine und eine Waschbären-Anlage. Keine Löwen oder Elefanten – dafür naturnah und ruhig. Kinder können Tiere füttern (Heu erhältlich). Eintritt ca. 8–10 € pro Person.

## Als Pausenstopp auf dem Drauradweg

Schloss Rosegg liegt direkt am Drauradweg (zwischen Feistritz und Villach). Wer die 50-km-Tour von Klagenfurt nach Villach macht, kommt automatisch daran vorbei. Die Kombination Radpause + Schloss + Tierpark + Einkehr im Schlosswirtshaus ist eine der besten Möglichkeiten, den Radweg aufzuwerten.

## Schlosswirtshaus Rosegg

Das Restaurant am Schlosseingang bietet Kärntner Küche in historischem Ambiente. Mittagessen ca. 14–20 €. Im Sommer sind die Tische im Freien unter alten Kastanienbäumen – ein perfekter Ort.

## Praktische Infos
- Adresse: Rosegg 1, 9232 Rosegg (Rosental)
- Öffnungszeiten Tierpark: Mai–Oktober täglich 9–17 Uhr
- Eintritt: Erwachsene ca. 10 €, Kinder ca. 5 €
- Parken: Kostenloser Parkplatz am Eingang
- Anfahrt: Von Klagenfurt ca. 20 Minuten, von Villach ca. 25 Minuten
    `,
    affiliateLinks: [
      { label: 'Ferienwohnungen im Rosental – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Rosental+K%C3%A4rnten' },
    ],
  },
  {
    slug: 'keutschacher-seental-radtour',
    title: 'Keutschacher Seental – Entspannte Radtour durch Kärntens schönste Seenlandschaft',
    excerpt: 'Das Keutschacher Seental südlich des Wörthersees beherbergt fünf kleine Seen in einem Tal – ideal für Fahrradtouren, Schwimmen in Ruhe und Naturbeobachtung fernab der Touristenströme.',
    date: '2026-06-01',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Mai–Oktober',
    highlights: ['Fünf Seen in einem Tal – alle kostenlos zugänglich', 'Flache Radroute für alle Altersgruppen', 'Naturparadies 15 Minuten vom Wörthersee'],
    content: `
Wer am Wörthersee urlaubt, übersieht meist das Seental direkt dahinter. Das Keutschacher Tal liegt keine 15 Fahrminuten südlich des Wörthersees und beherbergt gleich fünf kleinere Seen: den Keutschacher See, den Rauschelesee, den Hafnersee, den Gösselsdorfer See und den Silbersee. Alle sind kostenlos zugänglich, alle deutlich ruhiger als die großen Kärntner Seen.

## Die Radtour

Die Runde durch das Seental ist 18 km lang, weitgehend flach und ideal für Familien. Ausgangspunkt ist Klagenfurt-Süd oder der Parkplatz am Keutschacher See. Bikeverleih in Klagenfurt oder Reifnitz.

### Keutschacher See
Der größte der fünf Seen, mit Freistrand am Nordufer. Wasser bis 24°C im Sommer, Ruderbootverleih vor Ort.

### Rauschelesee
Kleiner Bergsee auf 1.027 m – 2 km Fußweg vom nächsten Parkplatz. Kühl, ruhig, kaum besucht. Lohnt sich als Abstecher.

### Gösselsdorfer See
Der abgelegenste der fünf – umgeben von Schilf und Wiesen. Naturschutzgebiet, kein Strandbad, aber Fischereibetrieb und ein kleines Fischlokal direkt am Wasser.

## Kombinationsmöglichkeiten

Das Keutschacher Seental liegt direkt am Weg zwischen Klagenfurt und Maria Wörth. Eine Kombinationsroute: Klagenfurt → Keutschacher Seental → Maria Wörth → Wörthersee-Promenade → zurück. Ca. 45 km, 3–4 Stunden mit Pausen.

## Naturbeobachtung

Das Schilf rund um die kleineren Seen ist ein Vogelparadies – Blässhühner, Rohrsänger, gelegentlich auch Eisvögel. Im Mai und Juni Morgenstunden besonders lohnend.

## Praktische Infos
- Startpunkt: Parkplatz Keutschacher See (kostenlos)
- Radverleih: In Klagenfurt oder vor Ort
- Gastronomie: Fischlokal am Gösselsdorfer See, Gasthöfe in Keutschach
    `,
    affiliateLinks: [
      { label: 'Faltrad / Klapprad für Urlaub – Amazon', url: 'https://www.amazon.de/s?k=klapprad+20+zoll+erwachsene' },
    ],
  },
  {
    slug: 'gurker-dom-romanik-kaernten',
    title: 'Gurker Dom – Romanische Meisterwerk mitten in Kärnten',
    excerpt: 'Der Gurker Dom ist einer der bedeutendsten romanischen Kirchenbauten Österreichs – und kaum jemand kennt ihn. Eine Krypta mit 100 Marmorsäulen, frühchristliche Wandmalereien und absolute Stille.',
    date: '2026-06-01',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'April–Oktober',
    highlights: ['Bedeutendster Romanikbau Österreichs aus dem 12. Jh.', 'Krypta mit 100 Marmorsäulen – einzigartig in Europa', 'Fast unbekannt – kein Touristengedränge'],
    content: `
In Gurk, einem 1.300-Seelen-Dorf im Gurktaler Bezirk, steht ein Kirchenbau, der in Paris oder Rom ein Weltbesuchermagnet wäre. Der Gurker Dom wurde im 12. Jahrhundert von Bischof Roman I. errichtet und ist einer der bedeutendsten romanischen Kirchenbauten im deutschsprachigen Raum – und so gut wie unbekannt im internationalen Tourismus.

## Die Kirche

Der Dom (offiziell: Collegiatstift Gurk) wurde zwischen 1140 und 1200 erbaut. Zwei mächtige Osttürme, der charakteristisch unveränderte romanische Außenbau, kein gotischer oder barocker Umbau – selten in Österreich. Die ursprüngliche Erscheinung ist fast vollständig erhalten.

## Die Krypta – das Herzstück

Die Krypta unter dem Dom ist das Eindrucksvollste. 100 Marmorsäulen, alle unterschiedlich, tragen das niedrige Gewölbe. In der Mitte: das Hochgrab der heiligen Hemma von Gurk. Frühchristliche Wandmalereien aus dem 12. Jahrhundert bedecken die Wände. Diese Kombination – Säulen, Wandmalerei, Stille – ist in Europa ohne direktes Vorbild.

## Bischofskapelle

Die Kapelle über der Sakristei mit den ältesten erhaltenen Fresken Kärntens (um 1260). Führungen nötig, lohnen sich aber.

## Kombination mit Burg Hochosterwitz

Gurk liegt 20 km östlich von Hochosterwitz. Ein Tagesausflug „Romanik + Mittelalter" ist einer der kulturell reichhaltigsten Kärntentage, die man haben kann. Beide zusammen: ca. 3–4 Stunden, keine langen Fußmärsche.

## Praktische Infos
- Öffnungszeiten: April–Oktober täglich 9–17 Uhr; Dom kostenlos, Kryptenführung ca. 5 €
- Führungen: Mehrmals täglich, Anmeldung nicht nötig (außer Gruppen)
- Parken: Kostenloser Dorfparkplatz 5 Gehminuten entfernt
- Anfahrt: Von Klagenfurt ca. 45 Minuten, von St. Veit an der Glan ca. 20 Minuten
    `,
    affiliateLinks: [
      { label: 'Hotels in St. Veit an der Glan – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=St+Veit+an+der+Glan' },
    ],
  },
  {
    slug: 'woerthersee-schifffahrt',
    title: 'Schifffahrt am Wörthersee – der schönste Weg von Klagenfurt nach Velden',
    excerpt: 'Die Wörthersee-Schifffahrt verbindet alle großen Orte am See. Ein Rundticket reicht für einen ganzen Tag – einsteigen, aussteigen, Baden, wieder einsteigen. Das beste Verkehrsmittel Kärntens.',
    date: '2026-06-01',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Mai–Oktober',
    highlights: ['Alle Hauptorte direkt vom Wasser erreichbar', 'Tagesticket zum Einsteigen/Aussteigen', 'Kinder unter 6 Jahren kostenlos'],
    content: `
Die Wörthersee-Schifffahrt ist kein touristisches Beiwerk – sie ist das praktischste Transportmittel am See. Wer ein Tagesticket kauft, kann an allen Anlegestellen ein- und aussteigen, schwimmen, essen gehen und später wieder an Bord gehen. Bessere Möglichkeit, den See zu erkunden, gibt es nicht.

## Die Strecke

Von Klagenfurt-Strandbad bis nach Velden und zurück – 11 Anlegestellen, Gesamtlänge 17 km. Die Fahrt dauert ohne Unterbrechung ca. 2,5 Stunden. Mit Stops und Absteigern kann man den ganzen Tag damit verbringen.

## Highlights entlang der Strecke

### Klagenfurt-Strandbad → Pörtschach (45 Min.)
Das Nordufer ist weniger besiedelt und zeigt den See von der ruhigen Seite. Blick auf die Südalpen im Hintergrund.

### Pörtschach → Maria Wörth (15 Min.)
Maria Wörth liegt auf einer Halbinsel und ist vom Wasser aus am schönsten zu sehen. Die gotische Wallfahrtskirche direkt am Ufer ist das Postkartenmotiv des Wörthersees.

### Maria Wörth → Velden (30 Min.)
Das Westufer, mondän und belebt. Die Promenade von Velden sieht man von Weitem.

## Tipps für die Fahrt

- **Tagesticket kaufen**: Lohnt sich ab zwei Anlegestellen (ca. 16 € Erwachsene)
- **Frühe Fahrt**: Erste Abfahrt um 8 Uhr, fast leer – perfekt für Fotografen
- **Abendfahrt**: Die letzte Abfahrt aus Velden kurz vor Sonnenuntergang ist unvergesslich
- **Mit Fahrrad**: Fahrräder können mitgenommen werden (Aufpreis, Platzkontingent begrenzt)

## Kombination Schiff + Rad

Hinfahrt per Schiff, Rückfahrt am Seeradweg – oder umgekehrt. 17 km Radweg am Nordufer sind flach und gut ausgebaut.

## Praktische Infos
- Saison: Mai–Oktober (je nach Wetterlage)
- Abfahrten: Ca. stündlich von Klagenfurt-Strandbad
- Tickets: Vor Ort oder online (Wörthersee Schifffahrt)
- Kinder unter 6 Jahren: kostenlos
    `,
    affiliateLinks: [
      { label: 'Hotels am Wörthersee – booking.com', url: 'https://www.booking.com/region/at/worthersee.de.html' },
    ],
  },
  {
    slug: 'gailtaler-alpen-wandern-geheimtipp',
    title: 'Gailtaler Alpen – Kärntens vergessene Wanderregion',
    excerpt: 'Zwischen Nassfeld und Weissensee liegen die Gailtaler Alpen – wild, wenig besucht und mit einigen der einsamsten Gipfeltouren Kärntens. Für alle, die Wandern ohne Gedränge suchen.',
    date: '2026-06-01',
    category: 'Wandern',
    region: 'kaernten',
    difficulty: 'mittel',
    bestSeason: 'Juni–Oktober',
    highlights: ['Eine der einsamsten Wanderregionen Kärntens', 'Karnischer Höhenweg: Panoramakamm an der Grenze', 'Kaum Touristen selbst im Hochsommer'],
    content: `
Das Gailtal und die Gailtaler Alpen sind das große Geheimnis Kärntens. Zwischen Nassfeld im Westen und dem Drautal im Osten liegt eine Bergwelt, die im Vergleich zu Wörthersee oder Großglockner kaum besucht wird – und gerade deshalb für Wanderer interessant ist.

## Das Gailtal

Das Haupttal ist 100 km lang und hat eine eigene Sprache (Kärntner Slowenisch), eine eigene Küche und eine Tradition als Durchgangstal nach Italien. Hermagor ist das Zentrum, Nassfeld das bekannteste Ziel. Aber das Tal hält mehr bereit.

## Karnischer Höhenweg

Der bekannteste Weitwanderweg der Gailtaler Alpen führt 12 Etappen lang auf dem Grenzkamm zwischen Österreich und Italien. Spektakuläre Panoramas, gut ausgestattete Hütten, kaum Menschenmassen.

### Empfehlenswerte Einzeletappe: Plöckenpass – Porzehütte
- Länge: 12 km, ca. 5 Stunden
- Höhenmeter: 600 aufwärts, 400 abwärts
- Höhepunkt: Blick auf das Karnische Kamm und die südlichen Alpen

## Garnitzenklamm

Eine der schönsten Klammen Kärntens, direkt bei Hermagor. Im Winter ist sie mit Eis und Schnee bespannt (Natureis), im Sommer ein angenehm kühler Weg durch enges Felsgelände. 2 Stunden, leicht.

## Warum kaum jemand hier wandert

Das Gailtal hat kein Marketingbudget wie der Wörthersee. Keine glamourösen Fotolocations. Keine Influencer-Spots. Dafür: echte Stille, freundliche Hüttenwirte die einen kennenlernen wollen, und Wanderwege ohne Schlangestehen beim Gipfelfoto.

## Praktische Infos
- Anreise Hermagor: Von Villach ca. 45 Minuten
- Übernachtung: Gasthöfe im Tal (günstig) oder Alm-/Schutzhütten am Höhenweg
- Karte: AV-Karte 1:25.000 „Gailtaler Alpen Ost" empfohlen
    `,
    affiliateLinks: [
      { label: 'Hotels in Hermagor – booking.com', url: 'https://www.booking.com/city/at/hermagor.de.html' },
      { label: 'Wanderführer Karnischer Höhenweg – Amazon', url: 'https://www.amazon.de/s?k=karnischer+h%C3%B6henweg+wanderf%C3%BChrer' },
    ],
  },
  {
    slug: 'woerthersee-radweg-komplett',
    title: 'Wörthersee Radweg – Die komplette Runde in einem Tag',
    excerpt: 'Die 52 km lange Radroute rund um den Wörthersee ist eine der schönsten Seeradrunden Österreichs. Wo die Strecke schön ist, wo sie nervt, und wie man die Tour in einem Tag ohne Hetze schafft.',
    date: '2026-06-01',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'April–Oktober',
    highlights: ['52 km – komplette Runde in 4–5 Stunden', 'Mix aus Seepromenade und ruhigen Nebenwegen', 'Strecke mehrfach teilbar – auch kürzere Runden möglich'],
    content: `
Den Wörthersee einmal komplett umrunden? 52 Kilometer, relativ flach, abwechslungsreich – und an einem Tag gut machbar, wenn man es nicht übertreibt. Hier ist das ehrliche Bild der Strecke.

## Streckenübersicht

- Gesamtlänge: ca. 52 km (Rundkurs)
- Höhenmeter: unter 400 m gesamt
- Dauer (ohne Pausen): 3,5–4 Stunden
- Mit Pausen, Baden, Einkehr: 6–7 Stunden

## Nordufer – das Highlight

Das Nordufer zwischen Klagenfurt und Velden ist der schönste Teil. Hier verläuft der Weg größtenteils direkt am Wasser: Promenaden, kurze Waldstücke, Badebuchten zum spontanen Eintauchen. Pörtschach ist der Pflicht-Stopp – die Halbinsel, die ins Wasser ragt, bietet den besten Wörthersee-Blick.

## Südufer – ehrlich bewertet

Das Südufer ist weniger einheitlich. Teile verlaufen auf Landstraßen (mit Radstreifen), durch Dörfer und an Einfahrten vorbei. Weniger romantisch, aber: Maria Wörth liegt am Südufer – und das ist ein Pflichtbesuch. Die Halbinsel mit der gotischen Kirche ist das Herzstück des Sees.

## Startempfehlung

**Klagenfurt-Strandbad**, Uhrzeigersinn (erst Nordufer). Vorteil: Das schönste Stück liegt am Anfang, wenn man noch frisch ist. Velden ist die natürliche Hälftenpause.

## Wo Bad und Pause einbauen?

- Nordufer Pörtschach: Strandbad oder Freistrand Bogenspitz
- Südufer Maria Wörth: Freistrand an der Halbinsel
- Velden: Promenade + Kaffee + obligatorischer Schlenker

## Bikeverleih

ÖBB Radverleih am Klagenfurter Hauptbahnhof, ca. 25 €/Tag. Oder E-Bikes in Velden und Pörtschach – lohnt sich wenn man nachmittags noch gemütlich schwimmen möchte.
    `,
    affiliateLinks: [
      { label: 'Fahrradschloss für Urlaub – Amazon', url: 'https://www.amazon.de/s?k=fahrradschloss+sicher' },
      { label: 'Hotels am Wörthersee – booking.com', url: 'https://www.booking.com/region/at/worthersee.de.html' },
    ],
  },
  {
    slug: 'kaernten-herbst-geheimtipps',
    title: 'Kärnten im Herbst – warum September/Oktober die beste Reisezeit ist',
    excerpt: 'Im September sind die Strandbäder noch offen, die Berge frei von Schnee, die Preise gefallen und die Touristen weg. Wer Kärnten wirklich kennenlernen will, kommt im Herbst.',
    date: '2026-06-01',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'September–Oktober',
    highlights: ['Seentemperaturen noch 22–24°C im September', 'Hotels bis zu 40% günstiger als im Juli', 'Goldenes Herbstlicht für Fotografen und Wanderer'],
    content: `
Kärnten wird oft als Sommerdestination vermarktet – Juli und August, Wasser und Sonne. Aber wer die Region wirklich mag, reist im Herbst. September und Oktober sind ein anderes Kärnten: leerer, ruhiger, goldener – und in jeder Hinsicht entspannter.

## Das Wasser ist noch warm

Die großen Kärntner Seen kühlen langsam ab. Im September: Wörthersee 22–24°C, Klopeiner See bis 25°C, Millstätter See 21–23°C. Das ist warm genug für entspanntes Baden, ohne Gedränge.

## Die Preise

Hotels kosten im September oft 30–40% weniger als im Juli/August. Dasselbe gilt für Ferienwohnungen. Die Strandbäder haben zwar kürzere Öffnungszeiten, aber dafür kaum Warteschlangen.

## Wandern ohne Schweiß

In 1.500–2.000 m Höhe sind die Temperaturen im September ideal für Wanderungen: kühl genug, um nicht zu überhitzen, warm genug für T-Shirt im Aufstieg. Die Bergwiesen leuchten in Herbstfarben.

## Kärntner Herbst-Highlights

### Weißweinlese im Südkärnten
Das Gailtal und das Lavanttal haben kleine Weinbaugebiete. Im Oktober wird gelesen – lokale Kellereien öffnen für Verkostungen.

### Kastanienzeit
Esskastanienwälder gibt es im Lavanttal und bei Wolfsberg. Im Oktober liegen die Kastanien auf den Wegen – Locals sammeln und rösten sie.

### Märkte und Feste
Oktober: Viehscheiden auf den Almen. Das Almvieh wird zum letzten Mal für die Saison ins Tal getrieben – ein Schauspiel mit Tradition.

## Was im Herbst schließt

- Einige Strandbäder: ab Mitte September
- Gondelbahnen: teils ab Oktober
- Campingplätze: die meisten bis Ende September

## Empfehlungen für den Herbst

- **Nockberge wandern**: Goldene Lärchenwälder im Oktober – einer der schönsten Anblicke der Ostalpen
- **Millstätter See**: Ruhig, warm genug, Promenade leer – das beste Wochenende des Jahres am See
- **Klagenfurt**: Herbst-Wochenmärkte am Benediktinermarkt, keine Touristengruppen
    `,
    affiliateLinks: [
      { label: 'Herbstangebote Kärnten – booking.com', url: 'https://www.booking.com/region/at/carinthia.de.html' },
      { label: 'Windjacke für Herbstwanderungen – Amazon', url: 'https://www.amazon.de/s?k=softshell+jacke+damen+wandern' },
    ],
  },
  {
    slug: 'kaernten-top-10-sehenswuerdigkeiten',
    title: 'Kärnten: Die 10 schönsten Sehenswürdigkeiten auf einen Blick',
    excerpt: 'Von Burg Hochosterwitz bis zum Großglockner, vom Wörthersee bis zur romanischen Krypta in Gurk – die 10 Dinge, die man in Kärnten wirklich gesehen haben muss.',
    date: '2026-06-01',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Ganzjährig',
    highlights: ['Top 10 ohne Marketingfloskel – ehrlich bewertet', 'Für Erstbesucher und Wiederkehrer', 'Mit konkreten Fahrtzeiten und Preisen'],
    content: `
Du hast 5 Tage in Kärnten. Was muss man gesehen haben? Nicht nach dem Tourismus-Hochglanzprosekt, sondern ehrlich: Was ist wirklich außergewöhnlich?

## 1. Wörthersee (immer)
Kein Bundesland Österreichs hat einen See wie den Wörthersee – warm, groß, zentralgelegen und infrastrukturell perfekt. Egal was man sonst macht: einmal schwimmen, einmal mit dem Schiff fahren, einmal von Maria Wörth auf die Halbinsel schauen. Das ist Kärnten.

## 2. Großglockner Hochalpenstraße (Juni–Oktober)
Österreichs höchster Berg, eine legendäre Panoramastraße, Gletscher zum Anfassen. Mautpflichtig, aber jeden Cent wert. Mindestens 4 Stunden einplanen.

## 3. Burg Hochosterwitz (Mai–Oktober)
Auf einem freistehenden Felsblock. 14 original erhaltene Tore. Kein Vergleichsobjekt in Österreich. 1,5 Stunden reichen.

## 4. Weissensee
Motorbootverbot, 8 m Sichttiefe, kristallklares Wasser. Im Winter Europas größte Natureisfläche. Zwei Stunden Fahrt von Klagenfurt, aber es lohnt sich.

## 5. Villacher Alpe (Dobratsch)
Mit dem Auto fast bis zum Gipfel. Panorama: Triglav, Großglockner, Adria. Naturpark mit 1.000 Pflanzenarten. Halbtagesausflug.

## 6. Nockberge im UNESCO-Biosphärenpark
Sanfte Almberge, keine Felswände. Im Juli/August Alpenrosenblüte. Wandern ohne Kletterkenntnisse, Hütten zum Einkehren. Für alle.

## 7. Gurker Dom
Der eindrucksvollste Romanikbau Österreichs. Die Krypta mit 100 Marmorsäulen hat kein Pendant in Europa. Kaum bekannt, kaum besucht. Kostenloser Eintritt.

## 8. Karawanken-Grenzkamm
Wandern exakt auf der Grenze Österreich/Slowenien. Blick auf Wörthersee und Ljubljana gleichzeitig. Nur für Wanderer mit guter Kondition.

## 9. Heiligenblut
Das Dorf mit der gotischen Kirche vor dem Großglockner. Eines der meistfotografierten Motive Österreichs. Kein Tourismustrubel. Originaler Bergort.

## 10. Kärntner Kulinarik probieren
Käsknödel, Kärntner Nudeln, Reindling. Am authentischsten auf einer Almhütte in den Nockbergen oder Gailtaler Alpen. Ein gutes Mittagessen hier wiegt schwerer als jede Sehenswürdigkeit.
    `,
    affiliateLinks: [
      { label: 'Reiseführer Kärnten – Amazon', url: 'https://www.amazon.de/s?k=reisef%C3%BChrer+k%C3%A4rnten' },
      { label: 'Unterkünfte in Kärnten – booking.com', url: 'https://www.booking.com/region/at/carinthia.de.html' },
    ],
  },
  {
    slug: 'karawanken-grenzwanderung-oesterreich-slowenien',
    title: 'Karawanken-Grenzkamm – Wandern auf der Staatsgrenze zwischen zwei Ländern',
    excerpt: 'Auf dem Karawanken-Grenzkamm wandert man buchstäblich auf der Grenze – links Österreich, rechts Slowenien. Blick auf den Wörthersee und die slowenischen Alpen gleichzeitig. Unvergesslich.',
    date: '2026-05-09',
    category: 'Wandern',
    region: 'kaernten',
    difficulty: 'schwer',
    bestSeason: 'Juli–September',
    highlights: ['Wandern exakt auf der Staatsgrenze AT/SLO', 'Blick auf Wörthersee und Slowenien gleichzeitig', 'Einzigartiges Grenzerlebnis im Schengen-Raum'],
    content: `
Die Karawanken bilden die natürliche Grenze zwischen Kärnten und Slowenien. Auf dem Grenzkamm zu wandern ist ein Erlebnis der besonderen Art: Der GPS zeigt abwechselnd Österreich und Slowenien an, während man einen Fuß in jedem Land hat.

## Die beste Tagesetappe: Loiblpass – Hochstuhl

### Streckendetails
- Start: Loiblpass (1.368 m) – direkt an der Grenze
- Höchster Punkt: Hochstuhl / Stol (2.236 m)
- Länge: ca. 14 km (Hin- und Rückweg)
- Gehzeit: 6–7 Stunden
- Schwierigkeit: mittel bis schwer (kurze gesicherte Kletterpassagen)

### Was man sieht
Vom Hochstuhl-Gipfel: Klagenfurt und der Wörthersee auf der einen Seite, die slowenischen Alpen und das Ljubljana-Becken auf der anderen. Bei klarem Wetter ist die Adria zu erahnen. Eine der beeindruckendsten Panoramen der Ostalpen.

## Der Grenzkamm selbst
Mehrere Kilometer verläuft der Weg exakt auf der Grenzlinie. Keine Grenzkontrollen (Schengen), man kann jederzeit die Seite wechseln. Das Handy-Roaming schaltet zwischen österreichischem und slowenischem Netz hin und her.

## Schwierigkeitshinweis
Der Aufstieg enthält kurze Kletterpassagen (gesichert mit Stahlseilen, kein Klettersteigset nötig). Trittsicherheit ist aber Pflicht. Bei aufziehendem Gewitter sofort absteigen – der Kamm ist exponiert.

## Slowenische Alternative
Viele Wanderer starten von der slowenischen Seite (Tržič) – andere Landschaft, andere Hütten, noch weniger Wanderer als von Österreich aus.

## Praktische Infos
- Parkplatz Loiblpass: Kostenlos, direkt an der Staatsgrenze
- Ausrüstung: Feste Bergschuhe, Regenjacke, mind. 2 Liter Wasser (keine Hütten auf dieser Etappe)
- Anfahrt: Von Klagenfurt 45 Minuten über Ferlach
- Startzeit: Spätestens 8 Uhr – nachmittags häufig Gewitter auf dem Kamm
- Einkehr: In Ferlach am Fuß des Loiblpasses, bekannt für Gasthäuser und Büchsenmachertradition
    `,
    affiliateLinks: [
      { label: 'Wanderrucksack für alpine Touren – Amazon', url: 'https://www.amazon.de/s?k=wanderrucksack+30l+wasserdicht' },
      { label: 'Wanderkarte Karawanken – Amazon', url: 'https://www.amazon.de/s?k=wanderkarte+karawanken' },
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
