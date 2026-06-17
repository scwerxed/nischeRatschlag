import type { FaqItem } from '@/app/ui/faq';

// Region-spezifische FAQ – liefert Content + FAQPage-Rich-Snippets pro Region.
export const FAQS_BY_REGION: Record<string, FaqItem[]> = {
  kaernten: [
    { q: 'Welcher ist der wärmste Badesee in Kärnten?', a: 'Der Klopeiner See in Südkärnten ist mit durchschnittlich 26–29 °C der wärmste Badesee Österreichs – durch das flache Becken und die geschützte Lage erwärmt er sich besonders schnell.' },
    { q: 'Wann ist die beste Reisezeit für Kärnten?', a: 'Juli und August sind am wärmsten, aber am vollsten. Geheimtipp ist der September: Die Seen haben noch 22–25 °C, die Preise fallen deutlich und die Strände sind leer. Für Wanderungen ist Juni ideal.' },
    { q: 'Gibt es kostenlose Badestellen am Wörthersee?', a: 'Ja, z. B. der Freistrand Maria Wörth und die Badebucht Reifnitz. Auch kleinere Seen wie der Keutschacher See bieten kostenlose Zugänge.' },
    { q: 'Welche Wanderung lohnt sich für Anfänger?', a: 'Die Seepromenade Klagenfurt–Pörtschach (flach) und der Nockberge-Höhenweg sind ideal für Einsteiger und Familien. Den Wegverlauf siehst du auf unserer interaktiven Karte.' },
    { q: 'Ist Kärnten auch im Winter einen Besuch wert?', a: 'Absolut: Der Weissensee wird zu Europas größter Natureisfläche, und Skigebiete wie Bad Kleinkirchheim (mit Therme) und das Nassfeld bieten über 100 km Pisten.' },
  ],
  salzburg: [
    { q: 'Was muss man in Salzburg gesehen haben?', a: 'Die UNESCO-Altstadt mit Getreidegasse, die Festung Hohensalzburg, Mozarts Geburtshaus und den Mirabellgarten. Im Umland lohnen Zell am See, die Krimmler Wasserfälle und die Eisriesenwelt.' },
    { q: 'Welcher See in Salzburg ist zum Baden am besten?', a: 'Der Zeller See bietet Baden mit Bergpanorama. Im Salzburger Seenland (Wallersee, Mattsee, Obertrumer See) findest du warme, ruhigere Badeseen nur 20–40 Minuten von der Stadt.' },
    { q: 'Lohnt sich die Salzburg Card?', a: 'Wenn du mehrere Sehenswürdigkeiten besuchst: ja. Sie umfasst freien Eintritt zu Museen und Attraktionen sowie die öffentlichen Verkehrsmittel und die Festungsbahn.' },
    { q: 'Beste Reisezeit für Salzburg?', a: 'Die Stadt ist ganzjährig schön (im Advent besonders stimmungsvoll). Für Badeseen und Bergwanderungen sind Juni bis September ideal.' },
  ],
  tirol: [
    { q: 'Was sind die Top-Sehenswürdigkeiten in Tirol?', a: 'Innsbruck mit Goldenem Dachl und Nordkette, der Achensee, das Ötztal mit Sölden, das Zillertal sowie die Swarovski Kristallwelten bei Wattens.' },
    { q: 'Welcher See in Tirol ist zum Baden geeignet?', a: 'Der Achensee ist Tirols größter See – klar und top zum Segeln/Surfen. Ruhiger und ein Geheimtipp ist der Plansee im Westen Tirols.' },
    { q: 'Kann man in Tirol auch im Sommer Ski fahren?', a: 'Ja, am Hintertuxer Gletscher (ganzjährig) sowie saisonal am Stubaier und Sölden-Gletscher liegt auch im Sommer Schnee.' },
    { q: 'Beste Reisezeit für Tirol?', a: 'Zum Wandern und Baden Juni–Oktober, zum Skifahren Dezember–April. Innsbruck und die Gletscher lohnen ganzjährig.' },
  ],
  steiermark: [
    { q: 'Was sind die Highlights der Steiermark?', a: 'Graz mit seiner UNESCO-Altstadt, der Dachstein mit Skywalk, der Grüne See in Tragöß, die Südsteirische Weinstraße und der Nationalpark Gesäuse.' },
    { q: 'Wann ist der Grüne See am schönsten?', a: 'Im Mai und Juni: Dann lässt die Schneeschmelze den See auf den höchsten Stand steigen und das Wasser leuchtet besonders smaragdgrün. Tauchen und Schwimmen sind dort verboten.' },
    { q: 'Was ist typisch steirisch?', a: 'Kürbiskernöl („grünes Gold"), Sauvignon Blanc von der Weinstraße, Käferbohnen und die Zotter-Schokolade. Die Oststeiermark ist als Genussregion bekannt.' },
    { q: 'Beste Reisezeit für die Steiermark?', a: 'Mai bis Oktober. Für die Weinstraße ist der Herbst (Weinlese) besonders stimmungsvoll, für den Grünen See der Frühsommer.' },
  ],
  burgenland: [
    { q: 'Was macht den Neusiedler See besonders?', a: 'Er ist Mitteleuropas größter Steppensee – sehr flach (meist ~1 m), dadurch warm und ideal für Kinder, und durch den verlässlichen Wind top zum Segeln und Surfen. Der Schilfgürtel ist UNESCO-Welterbe.' },
    { q: 'Wann sieht man die Störche in Rust?', a: 'Von April bis etwa August nisten die Störche auf den Kaminen der Altstadt von Rust – am schönsten in den Sommermonaten.' },
    { q: 'Wofür ist das Burgenland bekannt?', a: 'Für Spitzenweine (Blaufränkisch, edelsüße Weine), das pannonische Sonnenklima, den Neusiedler See und Thermen wie Lutzmannsburg.' },
    { q: 'Beste Reisezeit für das Burgenland?', a: 'Mai bis September für See und Wein, der November für das traditionelle Martiniloben mit Gansl und Jungwein.' },
  ],
  wien: [
    { q: 'Was muss man in Wien gesehen haben?', a: 'Schloss Schönbrunn, den Stephansdom und die Altstadt, den Prater mit Riesenrad sowie ein klassisches Kaffeehaus. Im Sommer lohnt zusätzlich ein Bad an der Alten Donau.' },
    { q: 'Wo kann man in Wien baden?', a: 'An der Alten Donau (ruhig, ideal für Familien), auf der Donauinsel (kostenlos, lange Ufer) und im Gänsehäufel-Strandbad. Mitten in der Stadt und gut mit Öffis erreichbar.' },
    { q: 'Wie bewegt man sich in Wien am besten fort?', a: 'Mit den Öffis: U-Bahn, Straßenbahn und Bus decken alles ab. Die Innenstadt erkundet man am besten zu Fuß, ein Auto braucht man nicht.' },
    { q: 'Wann ist die beste Reisezeit für Wien?', a: 'Mai/Juni und September für mildes Wetter und blühende Gärten. Der Advent mit den Christkindlmärkten ist besonders stimmungsvoll.' },
  ],
  oberoesterreich: [
    { q: 'Was ist im Salzkammergut ein Muss?', a: 'Hallstatt mit Salzwelten und Skywalk, der Traunsee bei Gmunden, der Attersee zum Baden und der Dachstein-Krippenstein mit der 5fingers-Plattform.' },
    { q: 'Welcher See ist zum Baden am besten?', a: 'Der Attersee und der Mondsee sind glasklar; der Mondsee wird etwas wärmer. Der Traunsee ist tief und kühl, dafür spektakulär vor dem Traunstein.' },
    { q: 'Ist Hallstatt zu überlaufen?', a: 'Tagsüber ja, vor allem mittags. Früh morgens oder am Abend wird es ruhiger – wer übernachtet, hat den Ort fast für sich.' },
    { q: 'Beste Reisezeit für Oberösterreich?', a: 'Juni bis September zum Baden und für Schifffahrten, der Herbst für ruhiges Wandern mit Nebelstimmung über den Seen.' },
  ],
  niederoesterreich: [
    { q: 'Was muss man in der Wachau sehen?', a: 'Stift Melk, das mittelalterliche Dürnstein mit Burgruine, die Weinterrassen entlang der Donau und eine Donauschifffahrt zwischen Melk und Krems.' },
    { q: 'Rax oder Schneeberg – welcher Hausberg?', a: 'Beide sind bequem per Bahn erreichbar: die Rax mit der Seilbahn, der Schneeberg mit der Salamander-Zahnradbahn. Die Rax bietet ein sanftes Hochplateau, der Schneeberg ist der höchste Berg Niederösterreichs.' },
    { q: 'Wann blüht die Marille in der Wachau?', a: 'Meist Ende März bis Anfang April. Dann verwandeln die blühenden Marillenbäume das Donautal in ein Blütenmeer.' },
    { q: 'Kann man in Niederösterreich baden?', a: 'Ja, etwa im Lunzer See (wärmster Gebirgssee), im Erlaufsee oder im Stausee Ottenstein im Waldviertel.' },
  ],
  vorarlberg: [
    { q: 'Kann man im Bodensee baden?', a: 'Ja, in Bregenz und Lochau gibt es Strandbäder mit Liegewiesen. Im Hochsommer wird der See angenehm warm – dazu Alpenblick inklusive.' },
    { q: 'Was sind die Bregenzer Festspiele?', a: 'Ein berühmtes Opernfestival auf der größten Seebühne der Welt direkt am Bodensee, jeweils im Juli und August.' },
    { q: 'Wie kommt man zum Lünersee?', a: 'Mit der Lünerseebahn vom Brandnertal hinauf; oben führt ein leichter Rundweg um den türkisen Bergsee vor der Rätikon-Kulisse.' },
    { q: 'Beste Reisezeit für Vorarlberg?', a: 'Juni bis September zum Baden, Wandern und für die Festspiele; der Winter zum Skifahren am Arlberg und im Montafon.' },
  ],
};
