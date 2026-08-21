// Kuratierte Ziel-Listen der Themenseiten – zentral, damit sowohl die Seite
// selbst als auch der Rückwärts-Index in `themenseiten.ts` sie nutzen kann.
// Jeder Slug muss in `posts.ts` existieren.

// Kuratierte Ziele mit Hitze-Begründung, gruppiert nach Kühl-Faktor.
export const HITZE_GROUPS: { title: string; note: string; picks: { slug: string; warum: string }[] }[] = [
  {
    title: 'Kühle Klammen, Höhlen & Wasserfälle',
    note: 'In Schluchten und Höhlen hat es oft 15–20 °C weniger als draußen – die natürlichste Klimaanlage des Landes.',
    picks: [
      { slug: 'eisriesenwelt-werfen', warum: 'In der größten Eishöhle der Welt hat es konstant um 0 °C – Jacke nicht vergessen.' },
      { slug: 'liechtensteinklamm', warum: 'Enge Schlucht, Sprühnebel und Schatten – angenehm kühl selbst an Hitzetagen.' },
      { slug: 'wasserlochklamm-palfau', warum: 'Wasserfälle und schattiger Steig durch die Klamm.' },
      { slug: 'lurgrotte-tropfsteinhoehle-steiermark', warum: 'Konstant um 10 °C in der größten Tropfsteinhöhle Österreichs.' },
      { slug: 'krimmler-wasserfaelle', warum: 'Der Sprühnebel der 380-m-Fälle kühlt die Umgebung messbar ab.' },
      { slug: 'salzwelten-hallein-duerrnberg', warum: 'Tief im Berg bleibt es kühl – Ausflug und Abkühlung in einem.' },
    ],
  },
  {
    title: 'Höhenluft: über 1.500 m ist es kühler',
    note: 'Pro 1.000 Höhenmeter sinkt die Temperatur um rund 6 °C – oben wandert es sich auch im Hochsommer angenehm.',
    picks: [
      { slug: 'stubaier-gletscher', warum: 'Auf über 3.000 m liegt selbst im Juli Schnee.' },
      { slug: 'hintertuxer-gletscher', warum: 'Ganzjahres-Gletscher – Winterluft mitten im Sommer.' },
      { slug: 'dachstein-gletscher-skywalk', warum: 'Gletscherluft und Fernblick statt Tal-Hitze.' },
      { slug: 'luenersee-wandern', warum: 'Uferrundweg auf knapp 2.000 m – frische Bergluft garantiert.' },
      { slug: 'grossglockner-tagesausflug', warum: 'Hochalpenstraße bis über 2.500 m – oben weht immer ein kühler Wind.' },
      { slug: 'giglachseen-schladminger-tauern', warum: 'Hochgelegene Bergseen mit erfrischend kaltem Wasser.' },
    ],
  },
  {
    title: 'Wasser direkt vor der Tür',
    note: 'Wenn schon Hitze, dann mit Abkühlung in Reichweite: Ziele, bei denen der Sprung ins Wasser dazugehört.',
    picks: [
      { slug: 'weissensee-kaernten-geheimtipp', warum: 'Höchstgelegener Badesee der Alpen-Südseite – erfrischend statt badewannenwarm.' },
      { slug: 'achensee-tirol', warum: 'Alpin-frisches Wasser, dazu kühlender Talwind.' },
      { slug: 'plansee-tirol-baden', warum: 'Stiller, kühler Bergsee – der Fjord Tirols.' },
      { slug: 'gosausee-dachstein-spiegelung', warum: 'Früh starten: schattiger Uferweg + kaltes Gletscherwasser.' },
      { slug: 'alte-donau-baden-wien', warum: 'Abkühlung ohne Anreise – mitten in Wien, mit der U-Bahn erreichbar.' },
      { slug: 'donauinsel-wien', warum: 'Kilometerlange Gratis-Ufer: Wer eine ruhige Stelle sucht, geht einfach weiter die Insel entlang.' },
      { slug: 'attersee-baden', warum: 'Tiefes, klares Wasser, das auch im Hochsommer frisch bleibt.' },
    ],
  },
];

// Kuratierte Aussichtsziele, gruppiert nach Art des "Aufstiegs".
export const AUSSICHT_GROUPS: { title: string; note: string; picks: { slug: string; warum: string }[] }[] = [
  {
    title: 'Seilbahn hoch, Aussicht sofort',
    note: 'Bergbahnen nehmen dir den kompletten Aufstieg ab. Oben wartet meist ein Gasthaus mit Terrasse – mehr braucht es nicht für einen guten Tag.',
    picks: [
      { slug: 'rax-seilbahn', warum: 'Österreichs älteste Personenseilbahn bringt dich aufs sanfte Hochplateau – oben genügen flache Wege.' },
      { slug: 'schoeckl-graz-hausberg', warum: 'Grazer Hausberg per Seilbahn: Rundblick über die Steiermark ohne einen einzigen Höhenmeter zu Fuß.' },
      { slug: 'untersberg-salzburg', warum: 'In Minuten von Salzburg-Nähe auf über 1.800 m – der Blick reicht weit über Stadt und Alpenvorland.' },
      { slug: 'dachstein-krippenstein', warum: 'Mehrsektionen-Seilbahn hinauf zum „5fingers"-Aussichtssteg mit Blick über den Hallstätter See.' },
      { slug: 'kitzsteinhorn-kaprun', warum: 'Gletscherwelt und Aussichtsplattform auf rund 3.000 m, komplett per Bahn erschlossen.' },
      { slug: 'hintertuxer-gletscher', warum: 'Ganzjahres-Gletscher – Hochgebirgspanorama auch dann, wenn Wandern keine Option ist.' },
      { slug: 'luenersee-wandern', warum: 'Die Bahn bringt dich direkt an den Seespiegel auf knapp 2.000 m; der Uferweg ist flach.' },
      { slug: 'festung-kufstein', warum: 'Standseilbahn statt Burgberg-Aufstieg – Innblick und Altstadtpanorama inklusive.' },
    ],
  },
  {
    title: 'Panoramastraßen: Aussicht ab dem Parkplatz',
    note: 'Hier fährst du direkt in die Höhe. Beachte: Diese Straßen sind in der Regel mautpflichtig und im Winter gesperrt – Öffnungszeitraum und Tarife vorab beim Betreiber prüfen.',
    picks: [
      { slug: 'grossglockner-tagesausflug', warum: 'Die Hochalpenstraße führt bis über 2.500 m; an der Kaiser-Franz-Josefs-Höhe steht man direkt vor dem Gletscher.' },
      { slug: 'nockalmstrasse-panoramastrasse', warum: 'Sanfte Nockberge-Kuppen, viele Parkbuchten mit Aussicht – Panorama fast ohne Aussteigen.' },
      { slug: 'silvretta-hochalpenstrasse', warum: 'Serpentinen zum Stausee auf über 2.000 m mit Blick auf die Gletscher der Silvretta.' },
      { slug: 'villacher-alpe-dobratsch-wanderung', warum: 'Die Alpenstraße führt weit hinauf; von den oberen Parkplätzen ist es nur noch ein kurzer Weg zur Aussicht.' },
      { slug: 'gaisberg-salzburg-aussicht', warum: 'Salzburgs Hausberg ist bis fast zum Gipfel befahrbar – der beste Stadtblick mit minimalem Aufwand.' },
    ],
  },
  {
    title: 'Aussichtstürme & Plattformen',
    note: 'Gebaute Aussicht: Lift oder kurze Treppe, dafür ein Rundumblick, den man sich sonst erwandern müsste.',
    picks: [
      { slug: 'pyramidenkogel-woerthersee', warum: 'Höchster Holzaussichtsturm der Welt mit Lift – Rundblick über den Wörthersee und die Karawanken.' },
      { slug: 'dachstein-gletscher-skywalk', warum: 'Hängebrücke, Skywalk und „Treppe ins Nichts" direkt bei der Bergstation.' },
      { slug: 'hallstatt-salzkammergut', warum: 'Der Skywalk „Welterbeblick" ist per Schrägaufzug erreichbar – der berühmteste Blick des Salzkammerguts.' },
      { slug: 'geschriebenstein-wandern-burgenland', warum: 'Aussichtsturm auf dem höchsten Punkt des Burgenlands, über kurze Waldwege erreichbar.' },
    ],
  },
  {
    title: 'Kurze Wege, große Wirkung',
    note: 'Kein Lift nötig – hier stimmt einfach das Verhältnis: wenig Höhenmeter, viel Landschaft. Gut für Familien und alle, die es gemütlich mögen.',
    picks: [
      { slug: 'schneeberg-wandern', warum: 'Die Zahnradbahn erledigt den Aufstieg; oben reicht eine kurze Plateaurunde für alpines Panorama.' },
      { slug: 'gosausee-dachstein-spiegelung', warum: 'Flacher Uferweg, und der Dachstein spiegelt sich im See – eines der schönsten Motive Österreichs.' },
      { slug: 'wienerwald-wandern', warum: 'Kahlenberg und Leopoldsberg sind mit Bus erreichbar, der Blick über Wien beginnt am Parkplatz.' },
      { slug: 'maria-woerth-woerthersee', warum: 'Die Halbinsel-Kirche liegt eben am Ufer – Postkartenblick über den See ohne jeden Anstieg.' },
    ],
  },
];

// Kuratierte Schlechtwetter-Ziele, gruppiert danach, wie gut sie Regen vertragen.
export const REGEN_GROUPS: { title: string; note: string; picks: { slug: string; warum: string }[] }[] = [
  {
    title: 'Komplett drinnen: Thermen & Wasserwelten',
    note: 'Der klassische Regentag-Retter – warmes Wasser, Dampf und Ruhe, während es draußen schüttet. Familien planen am besten einen halben bis ganzen Tag ein.',
    picks: [
      { slug: 'therme-loipersdorf-steiermark', warum: 'Große Thermenlandschaft mit Sauna- und Familienbereich – ein Regentag vergeht hier schnell.' },
      { slug: 'rogner-bad-blumau-therme', warum: 'Hundertwasser-Architektur als Sehenswürdigkeit für sich – schauen und baden zugleich.' },
      { slug: 'therme-burgenland-lutzmannsburg', warum: 'Stark auf Familien mit kleinen Kindern ausgelegt, viel überdachter Wasserspaß.' },
      { slug: 'bad-kleinkirchheim-therme-ski', warum: 'Thermalwasser mit Bergblick – funktioniert bei Regen genauso wie bei Sonne.' },
    ],
  },
  {
    title: 'Unter Tage: Höhlen & Bergwerke',
    note: 'Im Berg ist das Wetter egal. Wichtig: Drinnen ist es dauerhaft kühl (oft um 10 °C oder darunter) – warme Jacke und feste Schuhe gehören auch im Hochsommer ins Gepäck.',
    picks: [
      { slug: 'eisriesenwelt-werfen', warum: 'Die größte Eishöhle der Welt – der Zustieg ist allerdings im Freien, Regenjacke einpacken.' },
      { slug: 'lurgrotte-tropfsteinhoehle-steiermark', warum: 'Führung durch die größte Tropfsteinhöhle Österreichs, weitgehend wettergeschützt.' },
      { slug: 'salzwelten-hallein-duerrnberg', warum: 'Rutschen, Grubenbahn und Salzsee tief im Berg – klassischer Familien-Plan-B.' },
      { slug: 'erzberg-eisenerz-steiermark', warum: 'Schaubergwerk unter Tage; die Fahrt mit dem Riesen-Muldenkipper ist dagegen im Freien.' },
    ],
  },
  {
    title: 'Kultur im Trockenen: Burgen, Stifte & Museen',
    note: 'Innenräume mit Substanz – gut für zwei bis drei Stunden. Bei vielen Burgen liegen Höfe und Zuwege im Freien, ein Schirm schadet also nie.',
    picks: [
      { slug: 'stift-admont-bibliothek', warum: 'Die größte Klosterbibliothek der Welt plus Museen – viel Programm komplett drinnen.' },
      { slug: 'stift-melk', warum: 'Bibliothek, Marmorsaal und Stiftskirche; nur der Park will trockenes Wetter.' },
      { slug: 'schloss-eggenberg-graz', warum: 'Prunkräume und Museen unter einem Dach, gut mit der Grazer Altstadt kombinierbar.' },
      { slug: 'burg-hochosterwitz-ausflug', warum: 'Sehr fotogen, aber Achtung: Der Aufstieg über die 14 Tore verläuft im Freien.' },
      { slug: 'burg-hohenwerfen', warum: 'Innenräume und Museum im Trockenen – die Greifvogelschau findet draußen statt.' },
      { slug: 'festung-kufstein', warum: 'Über die Standseilbahn hinauf, viel Ausstellung im Inneren der Festung.' },
      { slug: 'riegersburg-burg-ausflug', warum: 'Burgmuseum plus Schokoladen- und Haubenmanufaktur im Tal als Schlechtwetter-Reserve.' },
      { slug: 'eisenstadt-schloss-esterhazy', warum: 'Schlossräume und Haydnsaal – kompakter Kulturausflug für einen Regenvormittag.' },
    ],
  },
  {
    title: 'Erlebniswelten für Familien',
    note: 'Wenn Kinder dabei sind und der Tag gerettet werden muss: Ziele, bei denen der Großteil überdacht ist.',
    picks: [
      { slug: 'swarovski-kristallwelten', warum: 'Die Wunderkammern sind komplett drinnen; Garten und Spielturm liegen im Freien.' },
      { slug: 'minimundus-klagenfurt', warum: 'Ehrlich gesagt eher ein Schönwetter-Ziel – die Modelle stehen im Park. Nur bei leichtem Nieselregen sinnvoll.' },
    ],
  },
  {
    title: 'Städte bei Regen',
    note: 'Altstädte mit Arkaden, Passagen, Kaffeehäusern und Museen in Gehweite – da lässt sich ein Guss gut aussitzen.',
    picks: [
      { slug: 'graz-altstadt-sehenswuerdigkeiten', warum: 'Landhaushof, Passagen und Museen liegen dicht beieinander – kurze Wege zwischen Trockenzonen.' },
      { slug: 'innsbruck-sehenswuerdigkeiten', warum: 'Goldenes Dachl, Hofburg und Museen kompakt in der Altstadt.' },
      { slug: 'salzburg-stadt-altstadt', warum: 'Getreidegasse, Festung und Museen – Salzburg ist Regen gewohnt.' },
      { slug: 'wien-schoenbrunn', warum: 'Prunkräume, Palmenhaus und Wagenburg als Innenprogramm, wenn der Park ausfällt.' },
      { slug: 'wien-stephansdom-altstadt', warum: 'Dom, Katakomben und die Kaffeehäuser ringsum – Wiens bester Regentag-Klassiker.' },
      { slug: 'museumsquartier-wien', warum: 'Mehrere Museen auf einem Areal, dazwischen überdachte Arkaden – ein ganzer Regentag ohne Umsteigen.' },
      { slug: 'schloss-belvedere-wien', warum: 'Klimt-Sammlung im Oberen Belvedere; der Garten geht auch bei Nieselwetter.' },
      { slug: 'linz-ausflug', warum: 'Ars Electronica Center und Lentos liegen zentral – Linz punktet gerade bei Schlechtwetter.' },
      { slug: 'klagenfurt-stadtfuehrung', warum: 'Kompakte Altstadt mit Innenhöfen und Lokalen, gut als Wörthersee-Ersatzprogramm.' },
    ],
  },
  {
    title: 'Wasserfälle & Klammen – bei Regen oft am schönsten',
    note: '⚠️ Wichtig: Klammen und Wasserfallwege können bei Starkregen wegen Steinschlag oder Hochwasser gesperrt werden. Vorab die Betreiber-Seite prüfen und bei Gewitter grundsätzlich verzichten. Bei leichtem Regen dagegen führen die Fälle am meisten Wasser.',
    picks: [
      { slug: 'krimmler-wasserfaelle', warum: 'Nach Regen besonders gewaltig – Regenjacke sowieso nötig, der Sprühnebel macht ohnehin nass.' },
      { slug: 'liechtensteinklamm', warum: 'Die enge Schlucht wirkt bei feuchtem Wetter noch dramatischer. Sperren vorab prüfen.' },
      { slug: 'wasserlochklamm-palfau', warum: 'Steg und Wasserfälle direkt am Weg; bei starkem Regen kann gesperrt werden.' },
    ],
  },
];

// Kuratierte Zeitfenster – „zeit“ ist die realistische Gesamtdauer vor Ort.
export const DAUER_GROUPS: { title: string; note: string; picks: { slug: string; zeit: string }[] }[] = [
  {
    title: 'Unter 2 Stunden',
    note: 'Schnell hin, kurz staunen, ohne Stress zurück – ideal für spontane Lücken im Tag.',
    picks: [
      { slug: 'pyramidenkogel-woerthersee', zeit: '1–2 Std. inkl. Turm & Rutsche' },
      { slug: 'minimundus-klagenfurt', zeit: '1–2 Std. Rundgang' },
      { slug: 'liechtensteinklamm', zeit: 'ca. 1,5 Std. inkl. Klammweg' },
      { slug: 'gaisberg-salzburg-aussicht', zeit: 'mit dem Bus hinauf: Gipfelrunde in 1 Std.' },
      { slug: 'alte-donau-baden-wien', zeit: 'Abendbad ab 1 Std.' },
      { slug: 'krimmler-wasserfaelle', zeit: 'Unterster Fall: ca. 1 Std.' },
    ],
  },
  {
    title: 'Ein halber Tag',
    note: 'Vormittag oder Nachmittag – genug Zeit für ein echtes Erlebnis samt Einkehr.',
    picks: [
      { slug: 'gruener-see-tragoess', zeit: 'Rundweg + Anfahrt ≈ 4–5 Std.' },
      { slug: 'luenersee-wandern', zeit: 'Bahn + Seerunde ≈ 4 Std.' },
      { slug: 'burg-hochosterwitz-ausflug', zeit: 'Aufstieg + Burg ≈ 3 Std.' },
      { slug: 'stift-melk', zeit: 'Führung + Stiftspark ≈ 3–4 Std.' },
      { slug: 'traunsee-gmunden', zeit: 'Stadt + Seepromenade ≈ 4 Std.' },
      { slug: 'schloss-eggenberg-graz', zeit: 'Prunkräume + Park ≈ 3 Std.' },
    ],
  },
  {
    title: 'Ein ganzer Tag',
    note: 'Früh los, spät zurück – diese Ziele füllen einen Tag, ohne dass Langeweile aufkommt.',
    picks: [
      { slug: 'hallstatt-salzkammergut', zeit: 'Ort + Salzwelten + Skywalk' },
      { slug: 'grossglockner-tagesausflug', zeit: 'Hochalpenstraße mit Stopps' },
      { slug: 'wachau-duernstein', zeit: 'Schiff + Rad + Heuriger' },
      { slug: 'dachstein-krippenstein', zeit: 'Seilbahn + 5fingers + Eishöhle' },
      { slug: 'schneeberg-wandern', zeit: 'Zahnradbahn + Plateau-Wanderung' },
      { slug: 'hochschwab-wandern', zeit: 'lange Zustiege – nur mit ganzem Tag' },
    ],
  },
  {
    title: 'Ein Wochenende',
    note: 'Manche Ziele entfalten sich erst mit einer Übernachtung – langsamer Morgen inklusive.',
    picks: [
      { slug: 'weissensee-kaernten-geheimtipp', zeit: 'entschleunigt erst ab 2 Tagen richtig' },
      { slug: 'bad-aussee-ausseerland', zeit: 'Ausseerland in Ruhe erkunden' },
      { slug: 'grossarltal-tal-der-almen', zeit: 'Almen-Wochenende mit Hüttenabend' },
      { slug: 'alpbachtal-schoenstes-dorf', zeit: 'Dorf, Almen & Bergbahnen' },
    ],
  },
];

// Kuratierte Öffi-Ziele – „anreise“ = konkreter Bahn-Hinweis.
export const BAHNHOF_GROUPS: { title: string; note: string; picks: { slug: string; anreise: string }[] }[] = [
  {
    title: 'Ziel direkt an der Bahn',
    note: 'Aussteigen und loslegen – diese Ziele liegen wenige Gehminuten vom Bahnhof entfernt.',
    picks: [
      { slug: 'schneeberg-wandern', anreise: 'Bahnhof Puchberg – die Zahnradbahn startet direkt daneben' },
      { slug: 'zell-am-see-zeller-see', anreise: 'Bahnhof Zell am See liegt direkt am See' },
      { slug: 'bregenz-bodensee', anreise: 'Vom Bahnhof in 5 Min. an der Seepromenade' },
      { slug: 'stift-melk', anreise: 'Bahnhof Melk, ca. 15 Min. zu Fuß zum Stift' },
      { slug: 'festung-kufstein', anreise: 'Bahnhof Kufstein, 10 Min. zur Festung' },
      { slug: 'seefeld-tirol', anreise: 'Die Mittenwaldbahn hält mitten im Ort' },
      { slug: 'kitzbuehel-ausflug', anreise: 'Bahnhof Kitzbühel im Ortszentrum' },
    ],
  },
  {
    title: 'Bahn + Schiff oder Bus',
    note: 'Ein Umstieg gehört dazu – dafür beginnt das Erlebnis schon bei der Anreise.',
    picks: [
      { slug: 'hallstatt-salzkammergut', anreise: 'Bahn bis Hallstatt, dann die Fähre über den See – schönste Ankunft Österreichs' },
      { slug: 'rax-seilbahn', anreise: 'Bahn bis Payerbach-Reichenau, Bus zur Seilbahn' },
      { slug: 'traunsee-gmunden', anreise: 'Bahn bis Gmunden, Straßenbahn bis zum See' },
      { slug: 'attersee-baden', anreise: 'Lokalbahn ab Vöcklamarkt direkt an den See' },
      { slug: 'wolfgangsee-st-gilgen', anreise: 'Bahn bis Salzburg oder Bad Ischl, Bus an den See' },
      { slug: 'wachau-duernstein', anreise: 'Bahn bis Krems oder Melk, weiter per Schiff oder Rad' },
    ],
  },
  {
    title: 'Stadt & U-Bahn',
    note: 'Städtische Ziele, bei denen das Auto nur stören würde.',
    picks: [
      { slug: 'wien-schoenbrunn', anreise: 'U4 Station Schönbrunn' },
      { slug: 'wien-prater', anreise: 'U1/U2 Praterstern' },
      { slug: 'alte-donau-baden-wien', anreise: 'U1 Alte Donau' },
      { slug: 'salzburg-stadt-altstadt', anreise: 'Vom Hauptbahnhof per Bus oder 20 Min. zu Fuß' },
      { slug: 'graz-altstadt-sehenswuerdigkeiten', anreise: 'Straßenbahn ab Hauptbahnhof ins Zentrum' },
      { slug: 'innsbruck-sehenswuerdigkeiten', anreise: 'Altstadt 10 Min. vom Hauptbahnhof' },
      { slug: 'linz-ausflug', anreise: 'Straßenbahn ab Hauptbahnhof zum Hauptplatz' },
    ],
  },
];

// Kuratierte Feierabend-Ziele je Stadt (Anfahrt grob ≤ 45 Min., abendtauglich).
export const FEIERABEND_CITIES: { name: string; note: string; picks: { slug: string; abend: string }[] }[] = [
  {
    name: 'Ab Wien',
    note: 'U-Bahn oder kurze Fahrt – und um 22 Uhr liegst du wieder im eigenen Bett.',
    picks: [
      { slug: 'wienerwald-wandern', abend: 'Kahlenberg zum Sonnenuntergang – danach Heuriger in Grinzing' },
      { slug: 'alte-donau-baden-wien', abend: 'Abendbad mit Blick auf die Skyline, bis Sonnenuntergang' },
      { slug: 'wien-prater', abend: 'Hauptallee-Runde nach Büroschluss, Riesenrad in der Dämmerung' },
      { slug: 'donauinsel-wien', abend: 'Sprung ins Wasser nach der Arbeit – U-Bahn hin, Sonnenuntergang über dem Wasser' },
      { slug: 'neusiedler-see-baden-segeln', abend: 'ca. 45 Min.: Abendwind, flacher See, weite Sonnenuntergänge' },
    ],
  },
  {
    name: 'Ab Graz',
    note: 'Hausberg, Schlosspark oder Buschenschank – alles in unter einer Dreiviertelstunde.',
    picks: [
      { slug: 'schoeckl-graz-hausberg', abend: 'Abendrunde am Grazer Hausberg – Seilbahn-Zeiten checken' },
      { slug: 'schloss-eggenberg-graz', abend: 'Pfauen im Abendlicht – der Park hat lange offen' },
      { slug: 'stubenbergsee-baden', abend: 'ca. 40 Min.: Abendbad im warmen Badesee' },
      { slug: 'suedsteirische-weinstrasse', abend: 'ca. 45 Min.: Buschenschank-Abend in den Weinhügeln' },
    ],
  },
  {
    name: 'Ab Salzburg',
    note: 'Zwischen Gaisberg und Seenland liegt der perfekte Feierabend nur Minuten entfernt.',
    picks: [
      { slug: 'gaisberg-salzburg-aussicht', abend: 'DER Feierabendberg: per Bus hinauf, Sonnenuntergang über der Stadt' },
      { slug: 'fuschlsee-baden', abend: 'ca. 25 Min.: Abendbad im smaragdgrünen See' },
      { slug: 'salzburger-seenland-baden', abend: 'Wallersee & Co – flache, warme Seen für den Abendsprung' },
      { slug: 'schloss-hellbrunn-salzburg', abend: 'Abendspaziergang durch den Schlosspark' },
      { slug: 'untersberg-salzburg', abend: 'Mit der Bahn hinauf – letzte Talfahrt unbedingt prüfen' },
    ],
  },
];

