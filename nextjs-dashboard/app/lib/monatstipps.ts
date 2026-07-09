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
];

export function getMonat(slug: string): Monat | undefined {
  return MONATE.find((m) => m.slug === slug);
}
