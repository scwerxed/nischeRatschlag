// „Beste Ausflüge im <Monat>“ – kuratierte Listen bestehender Artikel mit
// „Warum jetzt?“-Begründung. Slugs müssen in posts.ts existieren.

export type MonatsPick = { slug: string; warum: string };
export type Monat = { slug: string; name: string; intro: string; picks: MonatsPick[] };

export const MONATE: Monat[] = [
  {
    slug: 'juli',
    name: 'Juli',
    intro: 'Hochsommer: Die Badeseen haben Bestwerte, in den Bergen ist Hochsaison – und wer der Hitze entkommen will, geht in die Höhe oder ans Wasser.',
    picks: [
      { slug: 'klopeiner-see-badeurlaub', warum: 'Jetzt erreicht Österreichs wärmster Badesee seine 28 °C.' },
      { slug: 'alte-donau-baden-wien', warum: 'Abkühlung mitten in Wien – perfekt für heiße Stadttage.' },
      { slug: 'krimmler-wasserfaelle', warum: 'Der Sprühnebel der Fälle kühlt spürbar – natürliche Klimaanlage.' },
      { slug: 'luenersee-wandern', warum: 'Auf knapp 2.000 m ist es auch im Hochsommer angenehm frisch.' },
      { slug: 'attersee-baden', warum: 'Glasklares Wasser und lange Abende – jetzt am schönsten.' },
      { slug: 'neusiedler-see-baden-segeln', warum: 'Verlässlicher Wind und warmes Wasser – beste Segelzeit.' },
      { slug: 'giglachseen-schladminger-tauern', warum: 'Die Bergseen sind schneefrei und die Almen in voller Blüte.' },
      { slug: 'bregenzer-festspiele-seebuehne', warum: 'Die Festspiele auf der Seebühne starten – Oper unter Sternen.' },
      { slug: 'gosausee-dachstein-spiegelung', warum: 'Früh am Morgen: perfekte Dachstein-Spiegelung vor der Tageshitze.' },
      { slug: 'stubaier-gletscher', warum: 'Oben liegt noch Schnee – Sommer und Winter an einem Tag.' },
    ],
  },
  {
    slug: 'august',
    name: 'August',
    intro: 'Der Sommer auf dem Höhepunkt: Kulturfestivals am Wasser, warme Seen und stabile Bergwetterlagen – aber auch die vollsten Wochen des Jahres. Früh starten lohnt sich doppelt.',
    picks: [
      { slug: 'moerbisch-seefestspiele', warum: 'Operette auf der Seebühne im Neusiedler See – nur im Sommer.' },
      { slug: 'roemersteinbruch-st-margarethen-oper', warum: 'Oper im Steinbruch unter freiem Himmel – August ist Festivalzeit.' },
      { slug: 'bregenzer-festspiele-seebuehne', warum: 'Letzte Chance: Mitte August enden die Festspiele.' },
      { slug: 'faaker-see-badestellen', warum: 'Das türkise Wasser hat jetzt Badewannen-Temperatur.' },
      { slug: 'weissensee-kaernten-geheimtipp', warum: 'Deutlich ruhiger als die großen Seen – auch im Hochsommer.' },
      { slug: 'achensee-tirol', warum: 'Frisches Wasser und thermischer Wind – ideal, wenn es überall sonst zu heiß ist.' },
      { slug: 'plansee-tirol-baden', warum: 'Der stille Fjord Tirols – Abkühlung ohne Trubel.' },
      { slug: 'hohe-tauern-nationalpark-salzburg', warum: 'Beste Zeit für Höhenwege: stabile Wetterlagen, freie Gipfel.' },
      { slug: 'schneeberg-wandern', warum: 'Oben am Hochplateau weht auch im August ein kühler Wind.' },
      { slug: 'wolfgangsee-st-gilgen', warum: 'See, Schafbergbahn und laue Abende im Salzkammergut.' },
    ],
  },
  {
    slug: 'september',
    name: 'September',
    intro: 'Der Geheimtipp-Monat: Die Seen sind noch warm, die Preise fallen, die Wanderwege leeren sich – und im Osten beginnt die Weinlese.',
    picks: [
      { slug: 'millstaetter-see-wandern-und-schwimmen', warum: 'Noch 22–24 °C Wassertemperatur, aber die Strände sind leer.' },
      { slug: 'suedsteirische-weinstrasse', warum: 'Weinlese und Buschenschank-Zeit – die Steiermark von ihrer besten Seite.' },
      { slug: 'wachau-duernstein', warum: 'Die Weinterrassen färben sich golden, die Lese beginnt.' },
      { slug: 'uhudler-suedburgenland-wein', warum: 'Uhudler-Herbst im Südburgenland – jetzt wird verkostet.' },
      { slug: 'kaernten-herbst-geheimtipps', warum: 'Unser Herbst-Guide: baden, wandern und sparen nach der Saison.' },
      { slug: 'wilder-kaiser-wandern', warum: 'Klare Luft, stabile Tage – die beste Wanderzeit am Kaiser.' },
      { slug: 'hochschwab-wandern', warum: 'Kühlere Temperaturen machen die langen Zustiege angenehm.' },
      { slug: 'gaisberg-salzburg-aussicht', warum: 'Herbstliche Fernsicht über Salzburg bis ins Salzkammergut.' },
      { slug: 'neusiedler-see-radweg', warum: 'Mildes Radwetter statt Sommerhitze – ideale Runde um den See.' },
      { slug: 'bad-aussee-ausseerland', warum: 'Ruhiges Ausseerland: Narzissen sind vorbei, der Herbst beginnt sanft.' },
    ],
  },
  {
    slug: 'oktober',
    name: 'Oktober',
    intro: 'Der goldene Monat: Laubfärbung, Almabtriebe und oft klare Fernsicht. Gleichzeitig die letzte Chance auf die hohen Panoramastraßen, bevor sie für den Winter schließen – wer sie noch fahren will, sollte jetzt nicht mehr lange warten.',
    picks: [
      { slug: 'wienerwald-wandern', warum: 'Buchenwald in voller Herbstfärbung – und danach zum Heurigen mit Sturm.' },
      { slug: 'nockalmstrasse-panoramastrasse', warum: 'Die Nockberge leuchten golden; die Straße schließt für den Winter, also jetzt fahren.' },
      { slug: 'grossglockner-tagesausflug', warum: 'Letzte Wochen vor der Wintersperre – Öffnungszeitraum vorab prüfen.' },
      { slug: 'seewinkel-nationalpark-voegel', warum: 'Herbstlicher Vogelzug über dem Seewinkel – jetzt ist am meisten los.' },
      { slug: 'alpbachtal-schoenstes-dorf', warum: 'Almabtriebe und geschmückte Kühe – Tiroler Herbst wie im Bilderbuch.' },
      { slug: 'schoeckl-graz-hausberg', warum: 'Klare Herbstluft sorgt für die weiteste Fernsicht des Jahres.' },
      { slug: 'lienzer-dolomiten-osttirol', warum: 'Osttirol im Herbst: stabile Tage, kaum Andrang, dramatische Felskulisse.' },
      { slug: 'murradweg-steiermark', warum: 'Mildes Radwetter ohne Sommerhitze – die angenehmste Zeit für lange Etappen.' },
      { slug: 'steirisches-vulkanland', warum: 'Kürbiskernöl, junger Wein und Buschenschank – kulinarischer Höhepunkt.' },
      { slug: 'therme-loipersdorf-steiermark', warum: 'Thermensaison beginnt: draußen kühl, im Wasser warm.' },
    ],
  },
  {
    slug: 'november',
    name: 'November',
    intro: 'Der ehrlichste Monat: oft grau, neblig und nass – dafür leer und günstig. November ist die Zeit für Thermen, Museen, Höhlen und Städte. Und für den einen Trick, der wirklich funktioniert: über die Nebeldecke steigen.',
    picks: [
      { slug: 'kulinarik-burgenland-martiniloben', warum: 'Rund um den Martinitag wird der junge Wein verkostet – burgenländische Tradition.' },
      { slug: 'rogner-bad-blumau-therme', warum: 'Warmes Wasser und Hundertwasser-Architektur, während draußen der Nebel hängt.' },
      { slug: 'therme-burgenland-lutzmannsburg', warum: 'Familien-Therme für den Fall, dass draußen gar nichts geht.' },
      { slug: 'untersberg-salzburg', warum: 'Bei Inversionswetter steht man oben in der Sonne, über dem Nebelmeer.' },
      { slug: 'wien-stephansdom-altstadt', warum: 'Dom, Katakomben und Kaffeehaus – der klassische Wiener Novembertag.' },
      { slug: 'graz-altstadt-sehenswuerdigkeiten', warum: 'Kompakte Altstadt mit Museen und Innenhöfen, kurze Wege zwischen Trockenzonen.' },
      { slug: 'linz-ausflug', warum: 'Ars Electronica und Lentos machen Linz zum besten Schlechtwetter-Ziel Oberösterreichs.' },
      { slug: 'stift-admont-bibliothek', warum: 'Die größte Klosterbibliothek der Welt – Kultur komplett im Trockenen.' },
      { slug: 'lurgrotte-tropfsteinhoehle-steiermark', warum: 'Unter Tage ist das Wetter egal – konstant kühl, aber immer trocken.' },
      { slug: 'bad-kleinkirchheim-therme-ski', warum: 'Thermalwasser mit Bergblick, bevor die Skisaison anläuft.' },
    ],
  },
  {
    slug: 'dezember',
    name: 'Dezember',
    intro: 'Advent und Saisonstart: Christkindlmärkte in den Altstädten, erste Skitage in den Bergen und ruhige Winterwanderungen dazwischen. Wann genau die Lifte aufsperren, hängt vom Schnee ab – Saisonstart und Markttermine daher immer vorab prüfen.',
    picks: [
      { slug: 'salzburg-stadt-altstadt', warum: 'Christkindlmarkt vor der Kulisse von Dom und Festung – Advent-Klassiker.' },
      { slug: 'wien-schoenbrunn', warum: 'Adventmarkt vor dem Schloss, dazu die Prunkräume als Warm-Programm.' },
      { slug: 'innsbruck-sehenswuerdigkeiten', warum: 'Christkindlmarkt in der Altstadt unter dem Goldenen Dachl, Berge direkt dahinter.' },
      { slug: 'mariazell-wallfahrt-ausflug', warum: 'Der Mariazeller Advent gehört zu den stimmungsvollsten Märkten des Landes.' },
      { slug: 'hintertuxer-gletscher', warum: 'Ganzjahres-Gletscher: hier liegt verlässlich Schnee, auch wenn es sonst grün ist.' },
      { slug: 'st-anton-am-arlberg', warum: 'Schneesicherer Klassiker am Arlberg – Saisonstart je nach Schneelage.' },
      { slug: 'saalbach-hinterglemm', warum: 'Großes zusammenhängendes Skigebiet für die ersten Wintertage.' },
      { slug: 'nassfeld-skigebiet-hermagor', warum: 'Kärntens schneereichstes Gebiet – oft früh in Betrieb.' },
      { slug: 'seefeld-tirol', warum: 'Langlauf und Winterwandern auf dem Hochplateau, ohne Skipass.' },
      { slug: 'zell-am-see-zeller-see', warum: 'See, Stadt und Schmittenhöhe – Winterstimmung mit Bergpanorama.' },
    ],
  },
];

export function getMonat(slug: string): Monat | undefined {
  return MONATE.find((m) => m.slug === slug);
}
