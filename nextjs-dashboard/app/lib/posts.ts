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
  officialLinks?: { label: string; url: string }[]; // offizielle Quellen (keine Affiliate-Links)
  difficulty?: 'leicht' | 'mittel' | 'schwer';
  highlights?: string[];
  bestSeason?: string;
  trails?: Trail[];
};

export const posts: Post[] = [
  {
    slug: 'alpaka-wanderung-kaernten',
    title: 'Alpaka-Wanderung in Kärnten – die schönsten Touren mit den flauschigen Begleitern',
    excerpt: 'Mit Alpakas durch die Kärntner Natur spazieren: Wo es die besten Touren gibt, was sie kosten, und warum das gerade für Familien und gestresste Großstädter ein Erlebnis ist.',
    date: '2026-06-07',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'April–Oktober',
    highlights: ['Mehrere Höfe in ganz Kärnten', 'Ideal für Familien & ohne Vorkenntnisse', 'Entschleunigung pur – das „Tier-Yoga" der Berge'],
    content: `
Alpaka-Wandern ist von der Kuriosität zum echten Trend-Ausflug geworden – und Kärnten hat einige der schönsten Höfe dafür. Die ruhigen, neugierigen Tiere führt man an der Leine über Wiesen- und Waldwege. Kein Reiten, kein Stress, einfach gemeinsames Spazieren. Klingt simpel, wirkt aber erstaunlich entspannend.

## Was ist eine Alpaka-Wanderung?

Du bekommst auf dem Hof ein (oder zwei) Alpakas zugeteilt, eine kurze Einführung im Umgang mit den Tieren, und dann geht's los – meist 1 bis 2 Stunden gemütlich durch die Landschaft. Alpakas sind sanftmütig, spucken (anders als ihr Ruf) selten Menschen an und eignen sich perfekt auch für Kinder ab ca. 4 Jahren.

## Für wen lohnt sich das?

- **Familien**: Kinder lieben die flauschigen Tiere, das Tempo ist kindgerecht
- **Paare**: ungewöhnliches Date abseits von Restaurant und Kino
- **Gestresste**: Der langsame Rhythmus der Tiere wirkt nachweislich beruhigend – manche Höfe bieten sogar „Alpaka-Yoga" an
- **Fotografen**: Alpakas vor Bergkulisse sind ein dankbares Motiv

## Wo in Kärnten?

Alpaka-Höfe gibt es u. a. rund um den Wörthersee, im Gegendtal, im Lavanttal und in den Nockbergen. Die meisten bieten Touren nur **mit Voranmeldung** an – spontan vorbeifahren funktioniert selten. Such am besten nach „Alpakawanderung + [deine Urlaubsregion]" und buche ein paar Tage im Voraus.

## Was kostet es?

- Pro Person ca. **25–40 €** für eine 1–2-stündige Tour
- Kinder oft ermäßigt
- Manche Höfe nehmen pro Alpaka (für 2 Personen teilbar)

## Praktische Tipps

- **Festes Schuhwerk** anziehen – es geht über Wiesen und Waldwege
- Alpakas mögen **keine hektischen Bewegungen** – ruhig bleiben, dann sind sie zutraulich
- **Nicht füttern** ohne Erlaubnis – die Höfe haben klare Regeln
- Bei Hitze starten viele Touren früh morgens oder am Abend
- Wetterfest packen: Bei Dauerregen werden Touren oft abgesagt

## Kombi-Tipp

Viele Alpaka-Höfe liegen in ruhigen Seitentälern – ideal, um danach in einem Almgasthof einzukehren oder einen nahen Badesee anzusteuern. So wird aus der Tour ein ganzer Ausflugstag.
    `,
    affiliateLinks: [
      { label: 'Outdoor-Schuhe für die Tour – Amazon', url: 'https://www.amazon.de/s?k=wanderschuhe+leicht' },
      { label: 'Unterkünfte in Kärnten – booking.com', url: 'https://www.booking.com/region/at/carinthia.de.html' },
    ],
  },
  {
    slug: 'lama-trekking-kaernten',
    title: 'Lama-Trekking in Kärnten – Wandern mit den ruhigen Packtieren',
    excerpt: 'Lamas sind etwas größer und eigenständiger als Alpakas – und perfekte Wanderbegleiter. Was Lama-Trekking ausmacht, wo es das in Kärnten gibt und worauf du achten solltest.',
    date: '2026-06-06',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Mai–Oktober',
    highlights: ['Längere Touren als mit Alpakas möglich', 'Lamas tragen Gepäck & Picknick', 'Ruhige, trittsichere Bergbegleiter'],
    content: `
Lamas werden oft mit Alpakas verwechselt, sind aber größer, kräftiger und eigenständiger. Genau das macht sie zu hervorragenden Trekking-Partnern: Sie tragen sogar dein Picknick oder leichtes Gepäck und sind auf schmalen Bergpfaden erstaunlich trittsicher.

## Lama vs. Alpaka – was ist der Unterschied?

- **Größe**: Lamas sind deutlich größer (bis 1,20 m Schulterhöhe) und stärker
- **Charakter**: eigenständiger, „cooler" – Alpakas sind verschmuster und ängstlicher
- **Touren**: Mit Lamas sind längere Wanderungen (halbtags) üblich, oft mit Packsattel

## Der Ablauf

Nach einer Einführung führst du dein Lama am Strick. Anders als beim Reiten bleibst du auf dem Boden – das Tier ist Begleiter, nicht Transportmittel. Auf Halbtagestouren tragen die Lamas Satteltaschen mit Verpflegung, die unterwegs gemeinsam ausgepackt wird.

## Für wen geeignet?

Lama-Trekking ist ideal für alle, die etwas mehr Wanderung und weniger Streichelzoo wollen. Kinder sollten etwas älter sein (ca. ab 6 Jahren), weil die Tiere kräftig sind und die Touren länger. Für ältere Kinder und Erwachsene ein tolles, ruhiges Naturerlebnis.

## Wo in Kärnten?

Lama-Höfe gibt es vereinzelt in den Nockbergen, im Drau- und Gailtal sowie im Lavanttal. Wie bei Alpakas gilt: **vorab buchen**, die Gruppen sind klein.

## Kosten

- Kurztour (1–1,5 Std.): ca. **30–40 €** p. P.
- Halbtagestour mit Picknick: ca. **55–75 €** p. P.

## Tipps

- **Lange Hose & feste Schuhe** – es geht ins Gelände
- Lamas brauchen **Abstand zu Hunden** – lass deinen Hund daheim oder kläre es vorab
- Ruhig und geduldig bleiben: Lamas spüren Hektik sofort
- Wettercheck vorher – bei Gewitter wird abgesagt
    `,
    affiliateLinks: [
      { label: 'Tagesrucksack für die Tour – Amazon', url: 'https://www.amazon.de/s?k=wanderrucksack+20l' },
      { label: 'Unterkünfte in Kärnten – booking.com', url: 'https://www.booking.com/region/at/carinthia.de.html' },
    ],
  },
  {
    slug: 'eselwanderung-kaernten',
    title: 'Eselwanderung in Kärnten – das geduldigste Abenteuer für Kinder',
    excerpt: 'Esel sind klug, geduldig und bei Kindern beliebt. Eine Eselwanderung ist eines der entspanntesten Familienerlebnisse in Kärnten – hier die Infos dazu.',
    date: '2026-06-05',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Mai–September',
    highlights: ['Perfekt für kleine Kinder', 'Esel tragen müde Kinderbeine', 'Sehr ruhiges, geduldiges Wesen'],
    content: `
Esel haben zu Unrecht den Ruf, stur zu sein – tatsächlich sind sie klug, vorsichtig und extrem geduldig. Für Familien mit kleineren Kindern ist die Eselwanderung deshalb oft das beste Tiererlebnis: Wenn die Kinderbeine müde werden, dürfen die Kleinen meist sogar ein Stück auf dem Esel mitreiten.

## Warum Esel?

- **Geduldig**: Esel lassen sich von Kindern nicht aus der Ruhe bringen
- **Sicher**: Sie gehen langsam und überlegt, stürzen praktisch nie
- **Tragen mit**: Picknick, Jacken – und müde Kinder

## Der Ablauf

Auf dem Hof lernst du „deinen" Esel kennen, wirst eingewiesen und führst ihn dann auf gemütlichen Wegen. Die Touren sind bewusst kurz und flach gehalten (oft 1–2 Stunden), damit auch die Kleinsten mitkommen.

## Für wen?

Klar im Fokus: **Familien mit Kindern von 3 bis 10 Jahren**. Aber auch Großeltern-Enkel-Ausflüge funktionieren super, weil das Tempo niedrig ist.

## Wo & was kostet es?

Eselhöfe gibt es im Lavanttal, Gegendtal und rund um die Nockberge. Preise meist **20–35 €** pro Person/Esel, Kinder oft günstiger. Voranmeldung nötig.

## Tipps

- **Geschlossene Schuhe** für die Kinder
- Esel mögen **klare, ruhige Ansagen** – die Höfe zeigen dir, wie's geht
- Snacks & Trinken für die Kinder mitnehmen
- Bei großer Hitze: Vormittagstermin wählen
    `,
    affiliateLinks: [
      { label: 'Kinder-Wanderschuhe – Amazon', url: 'https://www.amazon.de/s?k=kinder+wanderschuhe' },
      { label: 'Familienunterkünfte Kärnten – booking.com', url: 'https://www.booking.com/region/at/carinthia.de.html' },
    ],
  },
  {
    slug: 'reiten-pferdetrekking-kaernten',
    title: 'Reiten & Pferdetrekking in Kärnten – vom Ponyhof bis zum Almritt',
    excerpt: 'Ob erster Ponyritt für Kinder oder mehrstündiger Ausritt über die Almen: Kärnten bietet Reiterlebnisse für jedes Level. Überblick, Reviere und Tipps.',
    date: '2026-06-04',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Mai–Oktober',
    highlights: ['Vom Ponyführen bis zum Wanderritt', 'Islandpferde-Höfe mit ruhigem Gang', 'Almritte mit Panoramablick'],
    content: `
Kärnten ist Pferdeland – sanfte Hügel, weite Almen und ruhige Seitentäler bieten ideale Reitreviere. Vom geführten Ponyführen für die Kleinsten bis zum mehrstündigen Wanderritt über die Almen ist alles dabei.

## Für Einsteiger & Kinder

Viele Höfe bieten **Ponyführen** und Reitstunden auf dem Platz an – ideal für den ersten Kontakt. Kinder werden geführt, Sicherheit steht an erster Stelle (Helmpflicht). Perfekt, um zu testen, ob der Funke überspringt.

## Für Fortgeschrittene: Almritte & Wanderritte

Wer sicher im Sattel sitzt, kann geführte **Ausritte über die Almen** machen – teils halbtags mit Einkehr. Besonders beliebt sind **Islandpferde-Höfe**: Die Tiere sind klein, trittsicher und haben mit dem „Tölt" einen besonders ruhigen, bequemen Gang – auch für weniger Geübte angenehm.

## Wo in Kärnten?

Reiterhöfe verteilen sich über das ganze Land – Schwerpunkte im Lavanttal, Gailtal, Gegendtal und in den Nockbergen. Almritte gibt's vor allem in den höher gelegenen Regionen.

## Kosten (Richtwerte)

- Ponyführen / Reitstunde: ca. **20–35 €**
- Geführter Ausritt (1–2 Std.): ca. **35–60 €**
- Halbtags-Almritt mit Einkehr: ca. **80–120 €**

## Tipps

- **Lange Hose** und Schuhe mit kleinem Absatz mitbringen
- Helm wird gestellt, eigener ist aber hygienischer
- Reiterfahrung **ehrlich angeben** – die Höfe teilen passende Pferde zu
- Frühzeitig buchen, gute Höfe sind im Sommer schnell ausgebucht
    `,
    affiliateLinks: [
      { label: 'Reithelm & Zubehör – Amazon', url: 'https://www.amazon.de/s?k=reithelm' },
      { label: 'Unterkünfte in Kärnten – booking.com', url: 'https://www.booking.com/region/at/carinthia.de.html' },
    ],
  },
  {
    slug: 'husky-schlittenhunde-kaernten',
    title: 'Husky-Touren in Kärnten – Schlittenhunde im Winter erleben',
    excerpt: 'Ein Gespann begeisterter Huskys durch den Schnee: Husky-Touren sind das winterliche Tier-Highlight. Wo es das in Kärnten gibt und was dich erwartet.',
    date: '2026-06-03',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Dezember–März',
    highlights: ['Echtes Winter-Abenteuer mit Schlittenhunden', 'Auch Schnuppern & Hunde-Kennenlernen', 'Unvergesslich für Tierliebhaber'],
    content: `
Wenn im Winter der Schnee liegt, wird in Kärnten ein ganz besonderes Tiererlebnis möglich: Touren mit **Schlittenhunden**. Die Energie und Begeisterung eines Husky-Gespanns, das losziehen will, ist schwer zu beschreiben – das muss man erlebt haben.

## Was wird angeboten?

- **Schnupper-/Kennenlern-Termine**: Hunde streicheln, Rudel verstehen, kurze Runde – ideal für Familien und Einsteiger
- **Mitfahrten im Schlitten**: Du sitzt, der Musher lenkt
- **Selbst lenken (für Erwachsene)**: nach Einweisung das Gespann selbst führen – das intensivste Erlebnis

## Wichtig zu wissen

Husky-Touren sind **stark wetter- und schneeabhängig**. Liegt zu wenig Schnee, werden Touren auf Wagen (Trockenland-Training) umgestellt oder abgesagt. Die Anzahl der Anbieter in Kärnten ist begrenzt – früh informieren und buchen.

## Für wen?

Tierliebhaber, Familien (Schnuppertermine), Abenteuerlustige. Kleine Kinder dürfen meist nur mitfahren, nicht selbst lenken. Hunde-Allergiker sollten verzichten.

## Kosten

Sehr unterschiedlich je nach Format – von ca. **40 €** (Schnuppern) bis zu mehreren Hundert Euro für längere, selbst gelenkte Touren mit Einschulung.

## Tipps

- **Warm anziehen** in Schichten – es ist kalt und windig auf dem Schlitten
- Respekt vor den Tieren: Den Anweisungen des Mushers genau folgen
- Kamera mit vollem Akku (Kälte entlädt schnell)
- Als Winter-Kombi: danach in eine der Kärntner Thermen (z. B. Bad Kleinkirchheim) zum Aufwärmen
    `,
    affiliateLinks: [
      { label: 'Warme Winterbekleidung – Amazon', url: 'https://www.amazon.de/s?k=thermo+winterjacke' },
      { label: 'Winterunterkünfte Kärnten – booking.com', url: 'https://www.booking.com/region/at/carinthia.de.html' },
    ],
  },
  {
    slug: 'greifvogelschau-adler-kaernten',
    title: 'Adlerflugschau & Greifvögel in Kärnten – Falknerei hautnah',
    excerpt: 'Adler, Geier und Falken im freien Flug erleben: Die Greifvogelschauen in Kärnten sind ein eindrucksvolles Erlebnis für die ganze Familie. Wo, wann und worauf achten.',
    date: '2026-06-02',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'April–Oktober',
    highlights: ['Adler & Geier im freien Flug', 'Lehrreich & spektakulär zugleich', 'Überdacht – auch bei wechselhaftem Wetter'],
    content: `
Wenn ein Steinadler mit über zwei Metern Spannweite knapp über die Köpfe der Zuschauer gleitet, hält das ganze Publikum den Atem an. Greifvogel- und Adlerflugschauen gehören zu den eindrucksvollsten Tiererlebnissen Kärntens – und sind dabei lehrreich und absolut familientauglich.

## Was dich erwartet

Erfahrene Falkner zeigen Adler, Geier, Falken, Bussarde und Eulen im **freien Flug**. Du erfährst viel über die Tiere, ihre Jagdtechniken und den Artenschutz. Viele Vorführungen sind moderiert und kindgerecht aufbereitet.

## Wo in Kärnten?

Bekannte Anlaufstellen sind Adlerarena/Greifvogelwarten, die oft an **Burgen oder in Bergregionen** angesiedelt sind – die Kulisse macht das Erlebnis komplett. Vorführungszeiten sind fix (meist 1–2 mal täglich), also vorher die Zeiten checken.

## Für wen?

Für **alle Altersgruppen** – besonders eindrucksvoll für Kinder, die Tiere lieben. Da man sitzt und zuschaut, ist es auch für weniger Mobile gut geeignet.

## Kosten

Eintritt meist **12–18 €** für Erwachsene, Kinder ermäßigt, Familienkarten verfügbar.

## Tipps

- **Vorführungszeiten** vorab prüfen – außerhalb der Show sieht man die Tiere nur in Volieren
- **Hut/Kappe** kann praktisch sein – die Vögel fliegen tief
- Frühzeitig kommen für gute Sitzplätze
- Oft mit Burgbesichtigung kombinierbar – ein toller Halbtagesausflug
    `,
    affiliateLinks: [
      { label: 'Fernglas für Tierbeobachtung – Amazon', url: 'https://www.amazon.de/s?k=fernglas+10x42' },
      { label: 'Ausflüge & Tickets – GetYourGuide', url: 'https://www.getyourguide.de/-l158762/' },
    ],
  },
  {
    slug: 'tiererlebnisse-kaernten-familien',
    title: 'Tiererlebnisse in Kärnten – die schönsten Touren mit Tieren für Familien',
    excerpt: 'Alpaka, Lama, Esel, Pferd, Husky oder Greifvogel? Der große Überblick über alle Tiertouren in Kärnten – mit Empfehlungen nach Alter, Saison und Budget.',
    date: '2026-06-07',
    category: 'Ausflug',
    region: 'kaernten',
    bestSeason: 'Ganzjährig',
    highlights: ['Alle Tiertouren auf einen Blick', 'Empfehlungen nach Kinderalter', 'Sommer- und Winter-Erlebnisse'],
    content: `
Kärnten ist ein Paradies für Tierfreunde – und gerade Familien finden hier Erlebnisse, die Kindern jahrelang in Erinnerung bleiben. Dieser Überblick hilft dir, das passende Tierabenteuer zu finden.

## Welche Tour passt zu welchem Alter?

- **Ab 3 Jahren**: Eselwanderung (geduldig, langsam, Kinder dürfen mitreiten)
- **Ab 4 Jahren**: Alpaka-Wanderung (flauschig, ruhig, kurz)
- **Ab 6 Jahren**: Lama-Trekking, Ponyführen
- **Ab 8 Jahren**: längere Ausritte, Husky-Schnuppern
- **Jedes Alter**: Greifvogelschau (man sitzt und schaut zu)

## Sommer oder Winter?

- **Frühling–Herbst**: Alpaka, Lama, Esel, Reiten, Greifvögel
- **Winter**: Husky-/Schlittenhundetouren – das einzige saisonale Highlight, das nur bei Schnee geht

## Was kostet ein Tierausflug?

Die meisten geführten Touren liegen zwischen **20 und 60 €** pro Person. Greifvogelschauen sind mit ~12–18 € am günstigsten, selbst gelenkte Husky-Touren am teuersten.

## Unsere Detail-Artikel

- **Alpaka-Wanderung** – der entspannte Klassiker
- **Lama-Trekking** – für etwas längere Touren
- **Eselwanderung** – das geduldigste Tier für kleine Kinder
- **Reiten & Pferdetrekking** – vom Ponyhof bis zum Almritt
- **Husky-Touren** – das Winter-Abenteuer
- **Adlerflugschau** – Greifvögel hautnah

## Goldene Regeln für Tiertouren

- **Immer vorab buchen** – die Gruppen sind klein, spontan klappt selten
- **Festes Schuhwerk** und wetterfeste Kleidung
- **Ruhe bewahren** – Tiere spüren Hektik sofort
- **Regeln der Höfe respektieren** (Füttern, Abstand, Hunde)
- Bei schlechtem Wetter flexibel bleiben – manche Touren werden abgesagt
    `,
    affiliateLinks: [
      { label: 'Familienunterkünfte Kärnten – booking.com', url: 'https://www.booking.com/region/at/carinthia.de.html' },
      { label: 'Outdoor-Ausrüstung für Familien – Amazon', url: 'https://www.amazon.de/s?k=outdoor+ausr%C3%BCstung+kinder' },
    ],
  },
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

## 6. Reinzackel-Gipfel (mittel, 4 Stunden)
Über dem Südufer gelegen, mit weniger Andrang als der Pyramidenkogel. Schöner Wald-Aufstieg, oben freier Blick über den ganzen See.

## 7. Forstsee-Runde (leicht, 6 km)
Der kleine Forstsee oberhalb von Pörtschach ist ein Geheimtipp: ruhiger Rundweg durch Wald, kaum Touristen, ideal für eine schnelle Feierabendrunde.

## 8. Sattnitz-Höhenweg (mittel, 14 km)
Auf dem bewaldeten Höhenrücken südlich von Klagenfurt. Aussichtspunkte über den Wörthersee und das Klagenfurter Becken, angenehm schattig im Hochsommer.

## 9. Ulrichsberg (mittel, 3 Stunden)
Geschichtsträchtiger Aussichtsberg mit Ruine und Rundblick bis in die Karawanken. Kombinierbar mit dem benachbarten Magdalensberg.

## 10. Kompolan & Aussichtsturm Pyramidenkogel-Höhenweg (schwer, 5 Stunden)
Die sportliche Verbindungstour über mehrere Höhenzüge des Südufers – für konditionsstarke Wanderer, die Ruhe und Weitblick suchen.

## Beste Zeit & Tipps
April bis Juni und September/Oktober sind ideal: angenehme Temperaturen, klare Sicht, weniger Andrang. Im Hochsommer früh starten und schattige Wald-Routen (Sattnitz, Forstsee) bevorzugen. Wasser, Sonnenschutz und eine Regenjacke gehören immer in den Rucksack – das Bergwetter kann rasch umschlagen.

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

## Strandbad Pörtschach (mit Eintritt)
Großzügige Liegewiesen, Stege weit in den See, Kinderbereich. Eines der gepflegtesten Bäder am Nordufer mit toller Blickachse über den See.

## Bad Saag & Aussichtsbuchten am Südufer
Das ruhigere Südufer hat mehrere kleine, weniger bekannte Buchten. Hier ist es auch in der Hochsaison entspannter als am belebten Nordufer.

## Kostenlos vs. mit Eintritt – was lohnt sich?
- **Strandbäder (Eintritt ~5–8 €):** Liegewiese, sanitäre Anlagen, Gastronomie, Bademeister – ideal für ganze Tage und Familien.
- **Freistrände (gratis):** schnelles Bad, weniger Komfort, oft kein WC. Früh da sein, dann hat man die schönsten Plätze.

## Wassertemperatur & beste Zeit
Von Juni bis September liegt das Wasser meist zwischen 23 und 28 °C – Spitzenwerte im Juli/August. Im September ist es oft noch über 22 °C, bei deutlich weniger Andrang.

## Praktische Tipps
- **Parken:** an beliebten Bädern gebührenpflichtig; früh kommen oder mit dem Rad/Schiff anreisen
- **Anreise per Schiff:** viele Bäder haben einen eigenen Anlegesteg – stressfreier als Parkplatzsuche
- **Frühschwimmer:** vor 10 Uhr sind selbst die Top-Spots leer
- **Schlechtwetter-Alternative:** bei Regen lohnt eine der Thermen in der Umgebung
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

## Pyramidenkogel – Aussichtsturm mit Riesenrutsche
Der höchste Holzaussichtsturm der Welt hat für Kinder ein besonderes Highlight: die 120 m lange Indoor-Rutsche vom Turm nach unten. Panoramablick für die Eltern, Adrenalin für die Kids.

## Tierische Erlebnisse
Für tierbegeisterte Kinder lohnen sich die Tiertouren der Region – von der **Alpaka-Wanderung** über **Eselwanderungen** bis zur **Greifvogelschau**. Sanft, lehrreich und ein echtes Urlaubs-Highlight (eigene Artikel dazu im Magazin).

## Schlechtwetter-Programm
- **Hallenbäder & Thermen** in der Umgebung (z. B. Bad Kleinkirchheim)
- **Minimundus** ist teils überdacht
- **Reptilienzoo Happ** funktioniert auch bei Regen

## Tipps für entspannte Familientage
- **Früh starten:** Vormittags sind Parkplätze und Attraktionen leerer
- **Kärnten Card:** Mit vielen Übernachtungen gratis – freier Eintritt zu über 100 Ausflugszielen, rechnet sich für Familien schnell
- **Mittagshitze meiden:** vormittags Aktivität, mittags See, nachmittags Schatten

## Unterkunft-Tipp
Familienfreundliche Hotels mit Kinderbetreuung findet man am besten über booking.com:
    `,
    officialLinks: [
      { label: 'Minimundus Klagenfurt (minimundus.at)', url: 'https://www.minimundus.at' },
      { label: 'Reptilienzoo Happ (reptilienzoo.at)', url: 'https://www.reptilienzoo.at' },
    ],
    affiliateLinks: [
      { label: 'Familienhotels Wörthersee – booking.com', url: 'https://www.booking.com/region/at/carinthia.de.html?nflt=fc%3D2' },
      { label: 'Familienausflüge & Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=K%C3%A4rnten' },
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
    officialLinks: [
      { label: 'Großglockner Hochalpenstraße (grossglockner.at)', url: 'https://www.grossglockner.at' },
    ],
    affiliateLinks: [
      { label: 'Großglockner-Touren & Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Gro%C3%9Fglockner' },
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
      { label: 'Burg Hochosterwitz – Tickets & Touren auf GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Hochosterwitz' },
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
      { label: 'Klagenfurt: Stadtführungen, Minimundus & Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Klagenfurt%20am%20W%C3%B6rthersee' },
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
      { label: 'Erlebnisse rund um Velden & den Wörthersee – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Velden%20am%20W%C3%B6rthersee' },
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
      { label: 'Bootstouren & Schifffahrt am Wörthersee – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=W%C3%B6rthersee%20Schifffahrt' },
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

  // ─── STEIERMARK ──────────────────────────────────────────────────────────────
  {
    slug: 'graz-altstadt-sehenswuerdigkeiten',
    title: 'Graz entdecken – die schönsten Sehenswürdigkeiten der UNESCO-Altstadt',
    excerpt: 'Grazer Schlossberg, Uhrturm, Murinsel und Kunsthaus: Die steirische Hauptstadt verbindet mittelalterliche Altstadt mit moderner Architektur. Der kompakte Stadtführer.',
    date: '2026-06-09',
    category: 'Ausflug',
    region: 'steiermark',
    bestSeason: 'Ganzjährig',
    highlights: ['UNESCO-Weltkulturerbe Altstadt', 'Schlossberg mit Uhrturm & Aussicht', 'Studentenstadt mit lebendiger Kulinarik'],
    content: `
Graz ist die zweitgrößte Stadt Österreichs – und eine der unterschätztesten. Die Altstadt zählt zum UNESCO-Weltkulturerbe, gleichzeitig ist Graz dank zweier Universitäten jung, lebendig und kulinarisch top.

## Der Schlossberg
Das Wahrzeichen über der Stadt. Hinauf geht's per Standseilbahn, Lift im Berg oder über die Treppe. Oben: der berühmte **Uhrturm**, ein Panoramablick über die roten Dächer und gemütliche Gastgärten.

## Historische Altstadt
Enge Gassen, Renaissance-Innenhöfe, das Landhaus und der Hauptplatz mit dem Rathaus. Alles bequem zu Fuß erkundbar – plane mindestens einen halben Tag ein.

## Modernes Graz
Das blubberblasenförmige **Kunsthaus** („Friendly Alien") und die **Murinsel** – eine schwimmende Plattform mitten in der Mur – zeigen die moderne Seite. Spannender Kontrast zur Altstadt.

## Kulinarik
Graz ist „Genusshauptstadt": steirisches Kürbiskernöl, Backhendl, Buschenschank-Tradition. Am **Kaiser-Josef-Markt** gibt's frische regionale Produkte.

## Praktische Tipps
- Anreise: Bahn von Wien ca. 2,5 Std., von Klagenfurt ca. 2 Std.
- Parken: Tiefgaragen in der Innenstadt, Altstadt großteils Fußgängerzone
- Tipp: Die Stadt ist ideal mit einem Tagesausflug ins Umland (Riegersburg, Weinstraße) kombinierbar
    `,
    affiliateLinks: [
      { label: 'Graz: Touren & Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Graz' },
      { label: 'Hotels in Graz – booking.com', url: 'https://www.booking.com/city/at/graz.de.html' },
    ],
  },
  {
    slug: 'dachstein-gletscher-skywalk',
    title: 'Dachstein Gletscher & Sky Walk – über den Wolken in der Steiermark',
    excerpt: 'Hängebrücke, Treppe ins Nichts und Eispalast auf 2.700 m: Der Dachstein ist das spektakulärste Hochgebirgs-Erlebnis der Steiermark – ganz ohne Bergsteigen.',
    date: '2026-06-09',
    category: 'Ausflug',
    region: 'steiermark',
    bestSeason: 'Mai–Oktober',
    highlights: ['Bequem per Seilbahn auf 2.700 m', 'Hängebrücke & "Treppe ins Nichts"', 'Ganzjährig Gletscher & Eispalast'],
    content: `
Der Dachstein ist mit 2.995 m der höchste Berg der Steiermark – und das Beste: Man muss kein Bergsteiger sein, um oben zu stehen. Die Dachstein-Seilbahn bringt dich bequem auf rund 2.700 m.

## Die Highlights oben
- **Sky Walk:** Aussichtsplattform mit Blick bis nach Slowenien und Tschechien
- **Hängebrücke:** Österreichs höchstgelegene Hängebrücke, 100 m lang über dem Abgrund
- **Treppe ins Nichts:** 14 Stufen, die frei im Fels enden – nur für Schwindelfreie
- **Eispalast:** in den Gletscher gegrabene Eisskulpturen, ganzjährig

## Für wen geeignet?
Für alle, die ein Hochgebirgserlebnis ohne Anstrengung wollen – Familien, ältere Besucher, alle. Schwindelfreiheit hilft bei Brücke und Treppe.

## Wichtig
- Auch im Sommer **warm anziehen** – oben ist es deutlich kälter und windig
- Feste Schuhe (es kann Schnee/Eis liegen)
- Bei schlechter Sicht lohnt die Auffahrt weniger – Wetter & Webcam vorab checken

## Praktische Infos
- Talstation bei Ramsau am Dachstein
- Anfahrt: Von Schladming ca. 20 Minuten
- Tickets: Seilbahn-Kombiticket inkl. aller Attraktionen
    `,
    affiliateLinks: [
      { label: 'Dachstein & Schladming: Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Dachstein' },
      { label: 'Hotels in Ramsau/Schladming – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Ramsau+am+Dachstein' },
      { label: 'Warme Outdoor-Jacke – Amazon', url: 'https://www.amazon.de/s?k=softshelljacke+wandern' },
    ],
  },
  {
    slug: 'schladming-dachstein-wandern',
    title: 'Wandern in Schladming-Dachstein – Touren für jedes Level',
    excerpt: 'Die Region Schladming-Dachstein ist ein Wanderparadies: von der gemütlichen Almwanderung bis zur hochalpinen Tour. Die schönsten Routen und Hütten im Überblick.',
    date: '2026-06-08',
    category: 'Wandern',
    region: 'steiermark',
    difficulty: 'mittel',
    bestSeason: 'Juni–Oktober',
    highlights: ['Von Almwanderung bis Hochtour', 'Seilbahnen erleichtern den Aufstieg', 'Urige Almhütten zum Einkehren'],
    content: `
Schladming kennen viele vom Skifahren und vom Weltcup-Nachtslalom. Aber im Sommer ist die Region ein erstklassiges Wandergebiet – mit der Planai, Hochwurzen, Reiteralm und dem Dachsteinmassiv.

## Einsteiger & Familien
Die **Seilbahnen** (Planai, Hochwurzen) bringen dich bequem nach oben – von dort gemütliche Höhenwanderungen mit Panoramablick und Einkehr auf urigen Hütten. Ideal mit Kindern.

## Die Schladminger Tauern
Wer höher hinaus will: Im Süden locken die **Tauern-Seen** (z. B. die Giglachseen) auf Mehrstundentouren – glasklare Bergseen, einsame Pfade.

## Hochalpin: Dachstein-Rundwanderwege
Am Fuß des Dachsteins führen anspruchsvolle Touren entlang der Gletscherwelt – für Geübte mit Trittsicherheit.

## Hütten-Tipp
Die Region ist dicht mit bewirtschafteten Almen besetzt – Brettljause, Kaspressknödel und hausgemachter Kuchen sind nie weit. Viele Hütten haben auch Lager für Mehrtagestouren.

## Praktische Infos
- Sommercard: Mit vielen Übernachtungen sind Bergbahnen inkludiert
- Anfahrt: A10 Tauernautobahn, Abfahrt Schladming
- Ausrüstung: Feste Schuhe, Regenschutz, am Berg schnelle Wetterwechsel
    `,
    affiliateLinks: [
      { label: 'Hotels in Schladming – booking.com', url: 'https://www.booking.com/city/at/schladming.de.html' },
      { label: 'Wanderschuhe – Amazon', url: 'https://www.amazon.de/s?k=wanderschuhe+damen' },
    ],
  },
  {
    slug: 'gruener-see-tragoess',
    title: 'Grüner See in Tragöß – der smaragdgrüne Naturschatz der Steiermark',
    excerpt: 'Im Frühling verwandelt sich der Grüne See durch Schmelzwasser in ein türkises Naturwunder. Was du über den berühmtesten Bergsee der Steiermark wissen musst.',
    date: '2026-06-08',
    category: 'Ausflug',
    region: 'steiermark',
    bestSeason: 'Mai–Juni',
    highlights: ['Türkisgrünes Wasser durch Schmelzwasser', 'Tauchen verboten – strenger Naturschutz', 'Leichte Rundwanderung möglich'],
    content: `
Der Grüne See bei Tragöß im Hochschwabgebiet ist einer der fotogensten Orte Österreichs. Seinen Namen verdankt er der intensiv smaragdgrünen Farbe – und seine Besonderheit dem Wechsel der Jahreszeiten.

## Das Naturphänomen
Im Frühjahr lässt die Schneeschmelze den See stark ansteigen – Wiesen, Bänke und Wege stehen dann unter kristallklarem Wasser. Im Hochsommer zieht sich das Wasser wieder zurück. **Höchststand meist Mai/Juni** – die schönste Zeit für den Besuch.

## Wichtig: strenger Schutz
Der See steht unter Naturschutz. **Tauchen und Schwimmen sind verboten**, um das empfindliche Ökosystem zu schützen. Bitte unbedingt respektieren – Verstöße werden geahndet.

## Rundweg
Ein leichter Spazierweg führt um den See – familientauglich, knapp eine Stunde. Festes Schuhwerk reicht.

## Praktische Tipps
- **Früh kommen:** Der See ist sehr beliebt, Parkplätze füllen sich schnell
- Parkgebühr vor Ort
- Anfahrt: Von Bruck an der Mur ca. 30 Minuten
- Kombinierbar mit einer Wanderung im Hochschwabgebiet
    `,
    affiliateLinks: [
      { label: 'Unterkünfte in der Region Bruck/Tragöß – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Trag%C3%B6%C3%9F' },
      { label: 'Kamera-Stativ für Naturfotos – Amazon', url: 'https://www.amazon.de/s?k=reisestativ+kamera' },
    ],
  },
  {
    slug: 'suedsteirische-weinstrasse',
    title: 'Südsteirische Weinstraße – Toskana-Feeling und Buschenschank',
    excerpt: 'Sanfte Rebhügel, Klapotetz und gemütliche Buschenschänke: Die Südsteirische Weinstraße ist eine der schönsten Genussregionen Österreichs. Route, Tipps und Einkehr.',
    date: '2026-06-08',
    category: 'Ausflug',
    region: 'steiermark',
    bestSeason: 'Mai–Oktober',
    highlights: ['Hügellandschaft wie in der Toskana', 'Buschenschank: Wein & Brettljause', 'Sauvignon Blanc von Weltrang'],
    content: `
Die Südsteirische Weinstraße zwischen Ehrenhausen und Leutschach wird oft „steirische Toskana" genannt – zu Recht: sanfte Rebhügel, Zypressen-ähnliche Baumreihen und ein mildes Klima.

## Was ist ein Buschenschank?
Die typische Einkehr der Region: Weinbauern schenken ihren eigenen Wein aus und servieren kalte Brettljausen (Speck, Käse, Aufstriche, Kernöl-Eier). Bodenständig, günstig, herrlich. Der **Klapotetz** – ein hölzernes Windrad – ist das Wahrzeichen der Weingärten.

## Die Weine
Die Südsteiermark ist berühmt für **Sauvignon Blanc**, Welschriesling und Morillon (Chardonnay) – frische, mineralische Weißweine von internationalem Rang.

## Die schönste Route
Von Ehrenhausen über die Kernölhügel nach Gamlitz und Leutschach. Viele Aussichtspunkte, Weingüter mit Verkostung und Buschenschänke säumen den Weg. Auch per Rad oder zu Fuß (Weinwanderwege) erlebbar.

## Wichtig
- **Nicht selbst fahren nach der Verkostung** – Fahrer bestimmen oder Taxi/Shuttle nutzen
- Buschenschänke haben wechselnde Öffnungstage („Ausg'steckt is") – vorab prüfen
- Hochsaison Herbst (Weinlese, Sturm-Zeit) – früh Tisch reservieren

## Praktische Infos
- Anfahrt: Von Graz ca. 45 Minuten
- Beste Zeit: Spätsommer/Herbst für Weinlese-Stimmung
    `,
    affiliateLinks: [
      { label: 'Weingüter & Touren Südsteiermark – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=S%C3%BCdsteiermark' },
      { label: 'Hotels an der Weinstraße – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Gamlitz' },
    ],
  },
  {
    slug: 'riegersburg-burg-ausflug',
    title: 'Riegersburg – mächtige Burg, Greifvögel und Schokolade',
    excerpt: 'Die Riegersburg thront auf einem Vulkanfelsen über der Oststeiermark. Mit Greifvogelschau, Burgmuseum und der Zotter-Schokoladenmanufaktur nebenan ein perfekter Familientag.',
    date: '2026-06-08',
    category: 'Ausflug',
    region: 'steiermark',
    bestSeason: 'April–Oktober',
    highlights: ['Imposante Burg auf erloschenem Vulkan', 'Greifvogelschau mit Adlern & Geiern', 'Zotter-Schokoladentheater nebenan'],
    content: `
Die Riegersburg ist eine der eindrucksvollsten Burgen Österreichs – sie thront auf einem 482 m hohen Vulkanfelsen und galt als uneinnehmbar. Heute ist sie ein lohnendes Ausflugsziel für die ganze Familie.

## Die Burg
Über mehrere Tore und Mauern geht es hinauf (oder bequem mit dem Lift). Oben warten Burgmuseum, das Hexenmuseum und ein atemberaubender Rundblick über die Oststeiermark.

## Greifvogelschau
Auf der Burg gibt es regelmäßige **Flugvorführungen** mit Adlern, Geiern und Falken – beeindruckend und lehrreich, besonders für Kinder. Vorführungszeiten vorab checken.

## Zotter Schokolade
Nur wenige Minuten entfernt liegt die berühmte **Zotter Schokoladenmanufaktur** mit „Schoko-Laden-Theater" und Verkostung von über 100 Sorten. Die perfekte Kombination zum Burgbesuch.

## Praktische Infos
- Anfahrt: Von Graz ca. 1 Stunde
- Lift hinauf gegen Gebühr (sonst ~20 Min. Aufstieg)
- Tipp: Burg + Greifvogelschau + Zotter ergeben einen vollen, abwechslungsreichen Tag
    `,
    affiliateLinks: [
      { label: 'Oststeiermark: Ausflüge & Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Steiermark' },
      { label: 'Unterkünfte Oststeiermark – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Riegersburg' },
    ],
  },
  {
    slug: 'therme-loipersdorf-steiermark',
    title: 'Thermen in der Steiermark – Entspannung im Thermenland',
    excerpt: 'Loipersdorf, Bad Waltersdorf, Bad Radkersburg: Die Oststeiermark ist Österreichs Thermenland. Welche Therme zu wem passt – Familie, Wellness oder Ruhe.',
    date: '2026-06-08',
    category: 'Ausflug',
    region: 'steiermark',
    bestSeason: 'Ganzjährig',
    highlights: ['Eine der größten Thermen Europas (Loipersdorf)', 'Familien- und reine Ruhebereiche', 'Ideal als Schlechtwetter-Programm'],
    content: `
Die Oststeiermark ist das Thermenland Österreichs – warmes, mineralreiches Wasser aus der Tiefe, eingebettet in sanfte Hügel. Ideal das ganze Jahr, besonders aber als Schlechtwetter- oder Winterprogramm.

## Therme Loipersdorf
Eine der größten Thermen Europas, mit riesigem Familienbereich (Rutschen, Erlebnisbecken) und einem separaten, ruhigen Schaffelbad für Erwachsene. Für alle Zielgruppen.

## Heiltherme Bad Waltersdorf
Fokus auf Wellness, Ruhe und Gesundheit – elegantes Ambiente, weniger Trubel. Ideal für Paare und Erholungssuchende.

## Parktherme Bad Radkersburg
Großzügige Saunalandschaft und Thermalwasser, im hübschen Kurort Bad Radkersburg nahe der slowenischen Grenze.

## Tipps
- **Wochentags** ist es deutlich ruhiger als am Wochenende
- Eigene Badeschlapfen & Bademantel sparen Leihgebühren
- Viele Thermenhotels bieten direkten Bademantelgang in die Therme

## Praktische Infos
- Region: Oststeiermark, ca. 1 Std. von Graz
- Kombinierbar mit Weinstraße & Riegersburg
    `,
    affiliateLinks: [
      { label: 'Thermenhotels Steiermark – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Loipersdorf' },
      { label: 'Bademantel & Wellness-Zubehör – Amazon', url: 'https://www.amazon.de/s?k=bademantel+unisex' },
    ],
  },
  {
    slug: 'gesaeuse-nationalpark-wandern',
    title: 'Nationalpark Gesäuse – wildes Wandern zwischen Fels und Wasser',
    excerpt: 'Der Nationalpark Gesäuse ist die wildeste Bergregion der Steiermark: tosende Enns, steile Kalkwände und einsame Steige. Für Wanderer, die echte Natur suchen.',
    date: '2026-06-08',
    category: 'Wandern',
    region: 'steiermark',
    difficulty: 'schwer',
    bestSeason: 'Juni–September',
    highlights: ['Wildester Nationalpark der Steiermark', 'Wildwasser der Enns & steile Kalkwände', 'Touren von leicht bis hochalpin'],
    content: `
„Im Gsäus" – so nennen Einheimische den Nationalpark Gesäuse, wo sich die Enns in Jahrtausenden durch das Kalkmassiv gefräst hat. Das Ergebnis: eine der dramatischsten Berglandschaften Österreichs.

## Für Einsteiger
Auch ohne hochalpine Erfahrung gibt es lohnende Wege: der **Wasserweg Johnsbach** oder Spaziergänge entlang der Enns zeigen die Wildnis aus sicherer Distanz. Familientauglich.

## Für Geübte
Die Gipfel des Gesäuses (Hochtor, Planspitze) sind ernste, hochalpine Ziele mit Klettersteig-Charakter – nur für erfahrene, trittsichere Bergsteiger mit passender Ausrüstung.

## Wildwasser
Die Enns ist ein bekanntes **Rafting- und Kajakrevier**. Geführte Rafting-Touren sind ein Highlight für Abenteuerlustige.

## Wichtig
- Wetter im Gebirge schlägt schnell um – früh starten
- Auf markierten Wegen bleiben (Naturschutz + Sicherheit)
- Schwierigkeitsgrade ernst nehmen: viele Gesäuse-Touren sind anspruchsvoll

## Praktische Infos
- Nationalpark-Pavillon in Gstatterboden mit Infos
- Anfahrt: Von Liezen ca. 30 Minuten
- Ausrüstung: Bergschuhe, Regenschutz, bei Gipfeln Helm/Klettersteigset
    `,
    affiliateLinks: [
      { label: 'Rafting & Touren im Gesäuse – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Ges%C3%A4use' },
      { label: 'Unterkünfte im Gesäuse – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Ges%C3%A4use' },
    ],
  },

  // ─── BURGENLAND ──────────────────────────────────────────────────────────────
  {
    slug: 'neusiedler-see-baden-segeln',
    title: 'Neusiedler See – Baden, Segeln und Surfen im Steppensee',
    excerpt: 'Der Neusiedler See ist Mitteleuropas größter Steppensee: flach, warm und windsicher. Perfekt für Familien, Segler und Surfer. Die besten Strandbäder und Spots.',
    date: '2026-06-09',
    category: 'Baden',
    region: 'burgenland',
    bestSeason: 'Mai–September',
    highlights: ['Maximal ~1,8 m tief – ideal für Kinder', 'Verlässlicher Wind: Top für Segeln & Surfen', 'UNESCO-Welterbe & Naturparadies'],
    content: `
Der Neusiedler See ist einzigartig: ein flacher Steppensee, der im Schnitt nur rund 1 Meter tief ist. Das Wasser erwärmt sich dadurch schnell – und der beständige Wind macht ihn zum Eldorado für Segler und Surfer.

## Baden mit Kindern
Durch die geringe Tiefe ist der See **extrem kinderfreundlich** – man kann weit hinauslaufen. Strandbäder gibt es u. a. in Podersdorf (der bekannteste Badeort), Neusiedl und Illmitz.

## Segeln & Surfen
Der verlässliche Wind macht den See zu einem der besten **Segel- und Windsurf-Reviere** Österreichs. Schulen und Verleih gibt es in Podersdorf und Neusiedl.

## Podersdorf am See
Der einzige Ort direkt am offenen Wasser (sonst umgibt ein breiter Schilfgürtel den See). Leuchtturm, Strandbad, Promenade – das touristische Zentrum.

## Besonderheit Schilfgürtel
Der größte Teil des Ufers ist von kilometerbreitem Schilf gesäumt – ein einzigartiger Lebensraum und UNESCO-Welterbe. Zum Wasser kommt man meist über angelegte Kanäle und Stege.

## Praktische Infos
- Anfahrt: Von Wien ca. 1 Stunde
- Fahrrad ist das ideale Fortbewegungsmittel (flach, Radweg um den See)
- Sonnenschutz nicht vergessen – wenig Schatten in der Steppe
    `,
    officialLinks: [
      { label: 'Neusiedler See Tourismus (neusiedlersee.com)', url: 'https://www.neusiedlersee.com' },
    ],
    affiliateLinks: [
      { label: 'Hotels in Podersdorf am See – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Podersdorf+am+See' },
      { label: 'Sonnenschutz & Strandzubehör – Amazon', url: 'https://www.amazon.de/s?k=sonnenschirm+strand' },
    ],
  },
  {
    slug: 'seewinkel-nationalpark-voegel',
    title: 'Nationalpark Neusiedler See-Seewinkel – Vogelparadies der Pannonischen Steppe',
    excerpt: 'Salzlacken, Schilf und über 350 Vogelarten: Der Seewinkel ist eines der bedeutendsten Vogelgebiete Europas. Wo und wann man Reiher, Säbelschnäbler & Co. beobachtet.',
    date: '2026-06-09',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'April–Mai, September–Oktober',
    highlights: ['Über 350 Vogelarten', 'Einzigartige Salzlacken-Landschaft', 'Beobachtungstürme & geführte Touren'],
    content: `
Der Seewinkel östlich des Neusiedler Sees ist eine flache Steppenlandschaft mit zahllosen flachen **Salzlacken** – ein Lebensraum, den es so sonst nirgends in Mitteleuropa gibt. Für Vogelbeobachter ist er ein Mekka.

## Die Vogelwelt
Über 350 Arten wurden hier gezählt: Säbelschnäbler, Löffler, Silberreiher, Seeadler, Großtrappen und unzählige Zugvögel. Im Frühjahr und Herbst ziehen Zehntausende durch.

## Beste Zeit
**Frühling (April/Mai)** und **Herbst (September/Oktober)** zur Zugzeit. Früh morgens und in der Abenddämmerung ist die Aktivität am höchsten.

## So beobachtest du
- **Beobachtungstürme** und -hütten verteilen sich über das Gebiet
- **Fernglas oder Spektiv** ist Pflicht
- Geführte Touren mit Rangern (Nationalpark-Infozentrum Illmitz) lohnen sich enorm

## Verhaltensregeln
Auf Wegen bleiben, leise sein, Abstand halten – die Tiere sind störungsempfindlich. Hunde an der Leine bzw. besser zu Hause lassen.

## Praktische Infos
- Infozentrum: Nationalpark-Haus in Illmitz
- Anfahrt: Von Wien ca. 1,5 Stunden
- Mit dem Rad gut erkundbar (flach)
    `,
    affiliateLinks: [
      { label: 'Fernglas für Vogelbeobachtung – Amazon', url: 'https://www.amazon.de/s?k=fernglas+10x42+vogelbeobachtung' },
      { label: 'Unterkünfte in Illmitz – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Illmitz' },
    ],
  },
  {
    slug: 'rust-stoerche-altstadt',
    title: 'Rust am Neusiedler See – Storchenstadt und Weinjuwel',
    excerpt: 'Die kleinste Freistadt Österreichs ist berühmt für die Störche auf ihren Kaminen und exzellenten Wein. Ein Bummel durch Rust gehört zu jedem Burgenland-Besuch.',
    date: '2026-06-09',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'April–September',
    highlights: ['Störche nisten auf den Dächern', 'Malerische Barock-Altstadt', 'Berühmter Ruster Ausbruch (Süßwein)'],
    content: `
Rust ist ein Bilderbuchstädtchen am Westufer des Neusiedler Sees – und vor allem für seine **Störche** bekannt, die jeden Sommer auf den Kaminen der Altstadthäuser nisten.

## Die Störche
Von Frühling bis Spätsommer brüten zahlreiche Storchenpaare mitten in der Stadt. Man kann sie direkt von der Gasse aus auf ihren Horsten beobachten – ein einzigartiges Schauspiel. Beste Zeit: April bis August.

## Die Altstadt
Bunte Barock- und Renaissancehäuser, der Rathausplatz und die Fischerkirche machen Rust zu einem der schönsten Ortsbilder des Burgenlands. Alles in wenigen Minuten zu Fuß.

## Wein
Rust ist eine Weinhochburg – berühmt für den **Ruster Ausbruch**, einen edelsüßen Wein von Weltrang. In den Weingütern und Vinotheken kann man verkosten.

## Zum See
Über einen schmalen Damm durch den Schilfgürtel gelangt man zum Seebad Rust mit Bootshafen.

## Praktische Infos
- Anfahrt: Von Eisenstadt ca. 20 Minuten
- Kombinierbar mit einer Radtour um den See
- Tipp: Abends ist das Storchengeklapper am schönsten
    `,
    affiliateLinks: [
      { label: 'Hotels in Rust – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Rust+Burgenland' },
      { label: 'Weinverkostungen im Burgenland – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland' },
    ],
  },
  {
    slug: 'eisenstadt-schloss-esterhazy',
    title: 'Eisenstadt – Schloss Esterházy und auf Haydns Spuren',
    excerpt: 'Die burgenländische Landeshauptstadt vereint barocke Pracht und Musikgeschichte. Schloss Esterházy, der Haydnsaal und das Bergkirchen-Mausoleum sind die Highlights.',
    date: '2026-06-09',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'Ganzjährig',
    highlights: ['Prunkvolles Schloss Esterházy', 'Haydnsaal mit weltbekannter Akustik', 'Kompakte, entspannte Landeshauptstadt'],
    content: `
Eisenstadt ist die kleinste Landeshauptstadt Österreichs – und gerade deshalb charmant: Die Highlights liegen kompakt beisammen und lassen sich in einem halben Tag entspannt erkunden.

## Schloss Esterházy
Das barocke Wahrzeichen der Stadt, einst Residenz der mächtigen Fürstenfamilie Esterházy. Prunkräume, wechselnde Ausstellungen und ein schöner Schlosspark.

## Haydnsaal
Im Schloss liegt der berühmte **Haydnsaal** – einer der akustisch besten Konzertsäle der Welt. Joseph Haydn wirkte hier fast 40 Jahre als Hofkapellmeister. Bei einem Konzert ein unvergessliches Erlebnis.

## Bergkirche & Haydn-Mausoleum
In der Bergkirche befindet sich das Mausoleum Haydns sowie ein begehbarer Kalvarienberg – eine architektonische Besonderheit.

## Kulinarik & Wein
Eisenstadt liegt am Fuß des Leithagebirges, einer feinen Weinregion. In der Fußgängerzone gibt's gemütliche Lokale und Vinotheken.

## Praktische Infos
- Anfahrt: Von Wien ca. 1 Stunde
- Schloss-Tickets vor Ort oder online
- Kombinierbar mit Rust und dem Neusiedler See
    `,
    affiliateLinks: [
      { label: 'Hotels in Eisenstadt – booking.com', url: 'https://www.booking.com/city/at/eisenstadt.de.html' },
      { label: 'Eisenstadt: Touren & Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Eisenstadt' },
    ],
  },
  {
    slug: 'burgenland-wein-blaufraenkisch',
    title: 'Wein im Burgenland – Blaufränkischland und Rotwein-Hochburg',
    excerpt: 'Das Burgenland ist Österreichs wärmste Weinregion und die Heimat großer Rotweine. Vom Blaufränkisch im Mittelburgenland bis zum edelsüßen Wein am See – ein Überblick.',
    date: '2026-06-09',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'Mai–Oktober',
    highlights: ['Österreichs Rotwein-Hochburg', 'Blaufränkisch von internationalem Rang', 'Viele Weingüter mit Verkostung'],
    content: `
Das pannonische Klima – heiße Sommer, viele Sonnenstunden – macht das Burgenland zur wärmsten und für Rotwein besten Weinregion Österreichs.

## Die Weinregionen
- **Mittelburgenland („Blaufränkischland"):** Heimat des kräftigen Blaufränkisch, der Leitsorte des Burgenlands
- **Neusiedlersee:** Rotweine (Zweigelt) und weltberühmte edelsüße Weine (Beerenauslesen, Trockenbeerenauslesen)
- **Leithaberg:** elegante Weiß- und Rotweine am Fuß des Leithagebirges

## Verkostung & Buschenschank
Unzählige Weingüter bieten Verkostungen an, viele mit Ab-Hof-Verkauf. In Buschenschänken gibt's Wein und regionale Jause in gemütlicher Atmosphäre.

## Genuss-Tipp
Die Region verbindet Wein mit exzellenter Kulinarik – Gänsebraten zur Martinizeit (November) ist eine burgenländische Institution.

## Wichtig
- **Nie selbst fahren** nach der Verkostung – Fahrer bestimmen oder Shuttle nutzen
- Öffnungszeiten der Weingüter/Buschenschänke vorab prüfen

## Praktische Infos
- Basis: Rust, Mörbisch oder Neusiedl als Ausgangspunkt
- Ideal mit Radtour oder Seebesuch zu kombinieren
    `,
    affiliateLinks: [
      { label: 'Weingüter & Verkostungen Burgenland – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland%20Wein' },
      { label: 'Unterkünfte am Neusiedler See – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Neusiedler+See' },
    ],
  },
  {
    slug: 'neusiedler-see-radweg',
    title: 'Neusiedler See Radweg – die flache Genussrunde um den Steppensee',
    excerpt: 'Rund 125 km flach um den Neusiedler See – durch Österreich und Ungarn, vorbei an Weingärten, Schilf und Storchendörfern. Einer der beliebtesten Radwege Europas.',
    date: '2026-06-09',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'April–Oktober',
    highlights: ['Komplett flach – ideal für Familien', 'Grenzüberschreitend AT/Ungarn', 'Per Fähre abkürzbar'],
    content: `
Der Neusiedler See Radweg ist ein Klassiker: Die komplette Seeumrundung ist rund 125 km lang, führt durch Österreich und Ungarn – und ist dabei **fast vollkommen flach**. Perfekt für entspannte Genussradler und Familien.

## Die Strecke
Der Weg verläuft größtenteils abseits des Autoverkehrs durch Weingärten, Schilfgürtel, Naturschutzgebiete und charmante Dörfer wie Rust, Mörbisch, Podersdorf und (auf ungarischer Seite) Fertőrákos.

## Flexibel dank Fähre
Wer nicht die ganze Runde fahren will: Eine **Fähre zwischen Mörbisch und Illmitz** (saisonal) kürzt die Runde ab – ideal für eine Halbtagestour.

## Etappen-Tipp
- Einsteiger: Teilstück Neusiedl–Podersdorf (Ostufer, viel direkter Seekontakt)
- Genießer: Westufer mit Rust & Mörbisch (Wein & Störche)

## Praktische Infos
- E-Bike-Verleih in fast allen Orten rund um den See
- Ausweis mitnehmen (Grenzübertritt nach Ungarn)
- Einkehr: Buschenschänke und Heurige entlang der Strecke
- Wind beachten: Gegenwind kann anstrengend sein – Richtung clever wählen
    `,
    affiliateLinks: [
      { label: 'Fahrradtaschen & Zubehör – Amazon', url: 'https://www.amazon.de/s?k=fahrradtasche+gep%C3%A4cktr%C3%A4ger' },
      { label: 'Unterkünfte am Neusiedler See – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Neusiedler+See' },
    ],
  },
  {
    slug: 'burg-forchtenstein-ausflug',
    title: 'Burg Forchtenstein – die Schatzkammer der Esterházy',
    excerpt: 'Eine der best erhaltenen Burgen Österreichs, nie erobert: Burg Forchtenstein beherbergt eine der größten privaten Waffen- und Kunstsammlungen Europas. Ein Highlight für Familien.',
    date: '2026-06-09',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'April–Oktober',
    highlights: ['Nie erobert – original erhalten', 'Riesige Waffen- & Schatzkammer', 'Spannend für Kinder & Erwachsene'],
    content: `
Burg Forchtenstein thront auf einem Felssporn am Rand des Rosaliengebirges im Nordburgenland. Sie wurde nie erobert – und beherbergt deshalb original erhaltene Sammlungen der Fürsten Esterházy.

## Die Schatzkammer
Die fürstliche Schatzkammer zählt zu den bedeutendsten privaten Kunstsammlungen Europas: Prunkuhren, exotische Kuriositäten, Gold- und Silberarbeiten. Nur im Rahmen von Führungen zugänglich.

## Die Waffensammlung
Eine der größten privaten Rüstkammern – Ritterrüstungen, historische Waffen, Kanonen. Für Kinder besonders spannend.

## Der tiefe Brunnen
Ein 142 m tiefer Brunnen, einst von Kriegsgefangenen in den Fels geschlagen – beeindruckendes Zeugnis der Burggeschichte.

## Familienprogramm
Im Sommer gibt es oft Ritterfeste und Kinderführungen – ein Erlebnis für die ganze Familie.

## Praktische Infos
- Anfahrt: Von Wiener Neustadt ca. 20 Minuten, von Eisenstadt ca. 30 Minuten
- Führungen mit Anmeldung empfohlen
- Festes Schuhwerk für die Burganlage
    `,
    affiliateLinks: [
      { label: 'Unterkünfte im Nordburgenland – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Forchtenstein' },
      { label: 'Burgen & Ausflüge Burgenland – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland' },
    ],
  },
  {
    slug: 'therme-burgenland-lutzmannsburg',
    title: 'Thermen im Burgenland – von der Familientherme bis zur Ruheoase',
    excerpt: 'St. Martins Therme, Sonnentherme Lutzmannsburg und mehr: Das Burgenland hat Thermen für jeden – ob Familienspaß mit Riesenrutschen oder Wellness in der Lagune.',
    date: '2026-06-09',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'Ganzjährig',
    highlights: ['Europas familienfreundlichste Therme (Lutzmannsburg)', 'St. Martins Therme mit Naturbadesee', 'Ideal bei Regen & im Winter'],
    content: `
Das pannonische Klima und Thermalquellen machen das Burgenland zu einer Wohlfühlregion. Die Thermen sind ganzjährig ein verlässliches Ziel – ob Familienurlaub oder Wellness-Wochenende.

## Sonnentherme Lutzmannsburg
Gilt als eine der **familienfreundlichsten Thermen Europas** – mit langen Rutschen, eigenem Babybereich und Kleinkind-Welt. Perfekt für Familien mit kleinen Kindern.

## St. Martins Therme & Lodge (Frauenkirchen)
Eine Besonderheit: Therme kombiniert mit einem **Naturbadesee** und geführten Touren in den angrenzenden Nationalpark. Wellness und Natur in einem.

## Tipps
- **Wochentags** ruhiger und günstiger als am Wochenende
- Familien: Lutzmannsburg; Paare/Ruhe: St. Martins oder Erwachsenenbereiche
- Thermenhotels mit direktem Zugang sparen Anfahrt

## Praktische Infos
- Region: Mittel- und Nordburgenland
- Anfahrt: Von Wien je nach Therme 1–1,5 Stunden
- Gut mit See- und Weinregion kombinierbar
    `,
    affiliateLinks: [
      { label: 'Thermenhotels Burgenland – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Lutzmannsburg' },
      { label: 'Badezubehör für Kinder – Amazon', url: 'https://www.amazon.de/s?k=schwimmhilfe+kinder' },
    ],
  },

  // ─── STEIERMARK (Vertiefung) ─────────────────────────────────────────────────
  {
    slug: 'murradweg-steiermark',
    title: 'Murradweg – mit dem Rad quer durch die Steiermark',
    excerpt: 'Der Murradweg (R2) folgt der Mur von den Tauern bis ins Grazer Becken: rund 365 km, überwiegend flach und gut beschildert. Eine der beliebtesten Radrouten Österreichs.',
    date: '2026-06-10',
    category: 'Ausflug',
    region: 'steiermark',
    bestSeason: 'April–Oktober',
    highlights: ['365 km von den Bergen bis Graz', 'Überwiegend flach & familientauglich', 'Bahn-Rückreise einfach möglich'],
    content: `
Der Murradweg ist ein Klassiker unter Österreichs Fernradwegen. Er begleitet die Mur vom Lungau über die Obersteiermark bis nach Graz und weiter an die slowenische Grenze.

## Die Strecke
Vom alpinen Oberlauf geht es stetig sanft bergab durch das Murtal – an Schladming und Murau vorbei, durch Wälder und Auen bis ins Grazer Becken. Dadurch ist der Weg überwiegend flach und auch für Genussradler und Familien gut machbar.

## Etappen-Tipp
- **Einsteiger:** Murau–Unzmarkt, gemütlich und landschaftlich schön
- **Kultur:** Endspurt nach Graz mit der UNESCO-Altstadt als Ziel
- Rückreise: Die Bahn fährt großteils parallel – Abkürzen jederzeit möglich

## Praktische Infos
- E-Bike-Verleih in vielen Orten entlang der Route
- Gute Beschilderung (R2)
- Einkehr: Gasthäuser und Buschenschänke am Weg
    `,
    affiliateLinks: [
      { label: 'Fahrradtaschen & Zubehör – Amazon', url: 'https://www.amazon.de/s?k=fahrradtasche+gep%C3%A4cktr%C3%A4ger' },
      { label: 'Unterkünfte im Murtal – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Murau' },
    ],
  },
  {
    slug: 'schoeckl-graz-hausberg',
    title: 'Schöckl – der Hausberg von Graz',
    excerpt: 'Der Schöckl ist Graz’ Hausberg: Wandern, Seilbahn, Hängebrücke und ein Panoramablick über die ganze Steiermark. Ideal für einen Halbtagesausflug aus der Stadt.',
    date: '2026-06-10',
    category: 'Wandern',
    region: 'steiermark',
    difficulty: 'mittel',
    bestSeason: 'April–Oktober',
    highlights: ['Panorama über die ganze Steiermark', 'Seilbahn oder Aufstieg zu Fuß', 'Hängebrücke & Motorikpark am Gipfel'],
    content: `
Der 1.445 m hohe Schöckl ist der Hausberg von Graz – an klaren Tagen reicht der Blick über das Grazer Becken bis zu den Gipfeln der Tauern.

## Hinauf
Bequem per **Seilbahn** in wenigen Minuten, oder zu Fuß über mehrere Wanderwege (1,5–2 Std., mittel). Eine beliebte Kombination: hinauf wandern, hinunter mit der Bahn.

## Oben am Gipfel
- Panorama-Rundblick über die Steiermark
- **Hängebrücke** und Aussichtsplattform
- Gipfelhaus zum Einkehren
- Im Sommer Motorikpark & Wanderwege

## Praktische Infos
- Anfahrt: Von Graz ca. 25 Minuten nach St. Radegund
- Festes Schuhwerk für den Aufstieg
- Bei guter Fernsicht besonders lohnend – Wetter checken
    `,
    affiliateLinks: [
      { label: 'Graz: Touren & Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Graz' },
      { label: 'Wanderschuhe – Amazon', url: 'https://www.amazon.de/s?k=wanderschuhe' },
    ],
  },
  {
    slug: 'erzberg-eisenerz-steiermark',
    title: 'Steirischer Erzberg – der „Brotlaib der Steiermark"',
    excerpt: 'Der Erzberg bei Eisenerz ist der größte Tagebau Mitteleuropas. Mit der Hauly-Riesentruck-Fahrt und einem Bergwerksstollen ein Abenteuer für die ganze Familie.',
    date: '2026-06-10',
    category: 'Ausflug',
    region: 'steiermark',
    bestSeason: 'Mai–Oktober',
    highlights: ['Größter Tagebau Mitteleuropas', 'Mitfahrt im 860-PS-Hauly-Truck', 'Bergwerksstollen zum Erleben'],
    content: `
Der Erzberg ist ein 700 m hoher, terrassenförmig abgetragener Berg aus Eisenerz – ein industrielles Wahrzeichen der Steiermark und ein überraschend spannendes Ausflugsziel.

## Abenteuer Erzberg
- **Hauly-Fahrt:** Mitfahrt in einem gigantischen Schwerlast-Truck über die Abbauterrassen
- **Schaubergwerk:** Mit der Grubenbahn in die Stollen des historischen Untertagebaus
- Spektakuläre Einblicke in den aktiven Erzabbau

## Für wen?
Familien, Technik-Fans und alle, die mal etwas anderes als Seen und Berge sehen wollen. Robuste Kleidung empfohlen.

## Praktische Infos
- Ort: Eisenerz, Obersteiermark
- Touren nur mit Anmeldung/zu festen Zeiten – vorab buchen
- Warme Jacke für die Stollen (auch im Sommer kühl)
    `,
    affiliateLinks: [
      { label: 'Unterkünfte in Eisenerz – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Eisenerz' },
      { label: 'Steiermark: Erlebnisse – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Steiermark' },
    ],
  },
  {
    slug: 'stift-admont-bibliothek',
    title: 'Stift Admont – die größte Klosterbibliothek der Welt',
    excerpt: 'Der barocke Bibliothekssaal von Stift Admont ist ein Weltwunder des Wissens: 70.000 Bände unter prachtvollen Deckenfresken. Ein Kulturhighlight am Rand des Gesäuses.',
    date: '2026-06-10',
    category: 'Ausflug',
    region: 'steiermark',
    bestSeason: 'April–Oktober',
    highlights: ['Größter Klosterbibliothekssaal der Welt', 'Prachtvolle Barock-Deckenfresken', 'Museen & Naturkundesammlung im Stift'],
    content: `
Stift Admont liegt am Tor zum Nationalpark Gesäuse – und beherbergt einen der schönsten Räume Österreichs: den größten klösterlichen Bibliothekssaal der Welt.

## Der Bibliothekssaal
70 Meter lang, mit sieben Kuppeln, vergoldeten Verzierungen und Deckenfresken, die das menschliche Wissen darstellen. Rund 70.000 Bände – ein überwältigender Anblick.

## Mehr als nur Bücher
Das Stift beherbergt auch ein Kunsthistorisches Museum, eine bedeutende Naturkundesammlung und moderne Kunst – eine seltene Mischung aus Barock und Gegenwart.

## Kombi-Tipp
Ideal mit einem Besuch im **Nationalpark Gesäuse** zu verbinden – Kultur am Vormittag, Natur am Nachmittag.

## Praktische Infos
- Ort: Admont, Obersteiermark
- Anfahrt: Von Liezen ca. 25 Minuten
- Öffnungszeiten saisonal – vorab prüfen
    `,
    affiliateLinks: [
      { label: 'Unterkünfte in Admont – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Admont' },
      { label: 'Reiseführer Steiermark – Amazon', url: 'https://www.amazon.de/s?k=reisef%C3%BChrer+steiermark' },
    ],
  },
  {
    slug: 'lurgrotte-tropfsteinhoehle-steiermark',
    title: 'Lurgrotte – Österreichs größte erschlossene Tropfsteinhöhle',
    excerpt: 'Riesige Tropfsteine, unterirdische Bäche und beeindruckende Hallen: Die Lurgrotte bei Graz ist ein ideales Ausflugsziel bei Hitze oder Regen – kühl und faszinierend.',
    date: '2026-06-10',
    category: 'Ausflug',
    region: 'steiermark',
    bestSeason: 'Ganzjährig',
    highlights: ['Größte erschlossene Tropfsteinhöhle Österreichs', 'Konstant kühl – perfekt bei Hitze', 'Geführte Touren für Familien'],
    content: `
Die Lurgrotte zwischen Peggau und Semriach nördlich von Graz ist die größte wasserführende und erschlossene Tropfsteinhöhle Österreichs – ein faszinierendes unterirdisches Naturwunder.

## Was dich erwartet
Geführte Rundgänge durch riesige Hallen, vorbei an bizarren Tropfsteinen und dem unterirdischen Lurbach. Der größte Tropfstein, „der Riese", ist über 13 m hoch.

## Ideal als Wetter-Joker
In der Höhle herrschen konstant rund 10 °C – das perfekte Ziel an heißen Sommertagen oder bei Regen.

## Praktische Infos
- Zwei Eingänge: Peggau (kürzere Tour) und Semriach (längere Tour)
- **Warme Jacke** und feste Schuhe mitnehmen
- Führungen zu festen Zeiten – vorab Zeiten prüfen
- Anfahrt: Von Graz ca. 25 Minuten
    `,
    affiliateLinks: [
      { label: 'Unterkünfte bei Graz – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Peggau' },
      { label: 'Stirnlampe für Höhlen – Amazon', url: 'https://www.amazon.de/s?k=stirnlampe' },
    ],
  },
  {
    slug: 'mariazell-wallfahrt-ausflug',
    title: 'Mariazell – Österreichs bedeutendster Wallfahrtsort',
    excerpt: 'Die Basilika von Mariazell zieht seit Jahrhunderten Pilger an. Doch der Ort in der Obersteiermark bietet auch Bergbahnen, Lebkuchen und Natur – ein lohnender Ausflug.',
    date: '2026-06-10',
    category: 'Ausflug',
    region: 'steiermark',
    bestSeason: 'Mai–Oktober, Dezember (Advent)',
    highlights: ['Wichtigster Wallfahrtsort Österreichs', 'Bürgeralpe-Bergbahn & Erlebniswelt', 'Berühmter Mariazeller Lebkuchen'],
    content: `
Mariazell ist seit über 850 Jahren das spirituelle Herz Österreichs – die Basilika mit der „Magna Mater Austriae" zieht jährlich hunderttausende Pilger an. Aber auch ohne religiösen Hintergrund lohnt der Ausflug.

## Die Basilika
Das eindrucksvolle Gotteshaus mit barocker Ausstattung und der berühmten Gnadenkapelle steht im Zentrum des Ortes.

## Für Familien
Die **Bürgeralpe** (Bergbahn) bietet die Erlebniswelt „Holzknechtland" und tolle Wanderungen mit Blick über die Mariazeller Berge.

## Kulinarik
Mariazeller **Lebkuchen** und Kräuterliköre sind beliebte Mitbringsel – die Traditionsbetriebe gibt es seit Generationen.

## Praktische Infos
- Anreise nostalgisch mit der **Mariazellerbahn** (Schmalspurbahn von St. Pölten)
- Im Advent stimmungsvoller Adventmarkt
- Anfahrt mit Auto: Von Bruck an der Mur ca. 45 Minuten
    `,
    affiliateLinks: [
      { label: 'Hotels in Mariazell – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Mariazell' },
      { label: 'Steiermark: Ausflüge – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Steiermark' },
    ],
  },
  {
    slug: 'steirisches-vulkanland',
    title: 'Steirisches Vulkanland – Genussregion auf erloschenen Vulkanen',
    excerpt: 'Sanfte Hügel auf alten Vulkanen, Kürbiskernöl, Schokolade und Buschenschänke: Das Steirische Vulkanland in der Oststeiermark ist eine der genussvollsten Ecken Österreichs.',
    date: '2026-06-10',
    category: 'Ausflug',
    region: 'steiermark',
    bestSeason: 'Mai–Oktober',
    highlights: ['Genussregion: Kernöl, Wein, Schokolade', 'Riegersburg & Zotter mittendrin', 'Vulkanland-Thermen zum Entspannen'],
    content: `
Vor Millionen Jahren brodelten hier Vulkane – heute ist das Steirische Vulkanland eine sanfte Hügellandschaft und eine der bekanntesten Genussregionen Österreichs.

## Genuss pur
Die Region steht für höchste Produktqualität: steirisches **Kürbiskernöl** („grünes Gold"), Wein, Edelbrände, Käferbohnen und die weltbekannte **Zotter-Schokolade**.

## Sehenswertes
- **Riegersburg** – mächtige Burg auf einem Vulkanfelsen
- **Zotter Schokoladenmanufaktur** mit Verkostung
- Vulkanland-Thermen (Loipersdorf, Bad Gleichenberg)

## Genuss-Tour
Eine Rundfahrt durch das Vulkanland verbindet Buschenschänke, Hofläden und Aussichtspunkte. Ideal mit dem Auto oder E-Bike.

## Praktische Infos
- Anfahrt: Von Graz ca. 45–60 Minuten
- Hofläden & Buschenschänke haben wechselnde Öffnungszeiten
- Gut mit Riegersburg + Therme zu einem Tag kombinierbar
    `,
    affiliateLinks: [
      { label: 'Unterkünfte im Vulkanland – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Bad+Gleichenberg' },
      { label: 'Steirisches Kürbiskernöl – Amazon', url: 'https://www.amazon.de/s?k=steirisches+k%C3%BCrbiskern%C3%B6l' },
    ],
  },

  // ─── BURGENLAND (Vertiefung) ─────────────────────────────────────────────────
  {
    slug: 'moerbisch-seefestspiele',
    title: 'Mörbisch & die Seefestspiele – Operette auf dem Neusiedler See',
    excerpt: 'Auf der größten Seebühne Europas erklingt in Mörbisch jeden Sommer Operette unter freiem Himmel. Plus: das charmanteste Weindorf am Westufer.',
    date: '2026-06-10',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'Juli–August',
    highlights: ['Größte Seebühne Europas', 'Operette unter Sternenhimmel', 'Charmantes Weindorf mit Hofgassen'],
    content: `
Mörbisch am See am Westufer des Neusiedler Sees ist berühmt für zwei Dinge: seine malerischen weiß getünchten Hofgassen und die Seefestspiele auf der größten Seebühne Europas.

## Die Seefestspiele
Jeden Sommer (Juli/August) wird auf der riesigen Bühne direkt am Wasser Operette aufgeführt – ein unvergessliches Erlebnis unter freiem Himmel. Karten früh sichern, die Vorstellungen sind beliebt.

## Das Weindorf
Die typischen „Hofgassen" mit Maiskolben an den Fassaden, kleine Weingüter und Buschenschänke machen Mörbisch zu einem der hübschesten Orte am See.

## Praktische Infos
- Anfahrt: Von Eisenstadt ca. 20 Minuten
- Über den Seedamm zum Strandbad & Bootshafen
- Tipp: Festspiele + Abendessen im Weindorf = perfekter Sommerabend
    `,
    affiliateLinks: [
      { label: 'Hotels in Mörbisch – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=M%C3%B6rbisch+am+See' },
      { label: 'Burgenland: Tickets & Touren – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland' },
    ],
  },
  {
    slug: 'familypark-st-margarethen',
    title: 'Familypark St. Margarethen – der größte Freizeitpark Österreichs',
    excerpt: 'Über 100 Attraktionen für Familien mit Kindern: Der Familypark im Burgenland ist Österreichs größter Freizeitpark – ideal für einen ganzen Tag mit der Familie.',
    date: '2026-06-10',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'April–Oktober',
    highlights: ['Österreichs größter Freizeitpark', 'Über 100 Attraktionen', 'Besonders für jüngere Kinder ideal'],
    content: `
Der Familypark bei St. Margarethen im Burgenland ist der größte Freizeitpark Österreichs – und im Gegensatz zu vielen Parks klar auf **Familien mit jüngeren Kindern** ausgerichtet.

## Was geboten wird
Über 100 Attraktionen – von sanften Karussells und Märchenwelten für die Kleinen bis zu Achterbahnen und Wasserbahnen für die etwas Größeren. Viel Grün, kurze Wartezeiten, durchdachte Themenwelten.

## Für wen?
Ideal für Familien mit Kindern von etwa 2 bis 12 Jahren. Ein voller Tag ist leicht zu füllen.

## Praktische Infos
- Anfahrt: Von Wien ca. 1 Stunde, von Eisenstadt ca. 15 Minuten
- Tickets online oft günstiger
- Tipp: Unter der Woche deutlich ruhiger als am Wochenende
    `,
    affiliateLinks: [
      { label: 'Familienhotels Burgenland – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=St.+Margarethen+im+Burgenland' },
      { label: 'Burgenland: Familienausflüge – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland' },
    ],
  },
  {
    slug: 'roemersteinbruch-st-margarethen-oper',
    title: 'Römersteinbruch St. Margarethen – Oper in spektakulärer Kulisse',
    excerpt: 'Der historische Römersteinbruch wird im Sommer zur gewaltigen Opernbühne. Auch außerhalb der Festspiele ein eindrucksvolles Naturdenkmal und Ausflugsziel.',
    date: '2026-06-10',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'Juli–August',
    highlights: ['Oper in monumentaler Felskulisse', 'Historischer Steinbruch der Römer', 'Eindrucksvoll auch ohne Vorstellung'],
    content: `
Schon die Römer brachen hier den Stein für ihre Bauten – heute ist der Römersteinbruch St. Margarethen eine der eindrucksvollsten Naturbühnen Europas.

## Oper im Steinbruch
Im Sommer wird die gewaltige Felskulisse zur Bühne für große Opernproduktionen unter freiem Himmel. Die Akustik und das Ambiente sind einzigartig – ein Höhepunkt des burgenländischen Kultursommers.

## Auch tagsüber lohnend
Außerhalb der Festspiele ist der Steinbruch ein beeindruckendes Naturdenkmal mit Skulpturen und Wanderwegen.

## Praktische Infos
- Anfahrt: Nahe St. Margarethen, ca. 15 Min. von Eisenstadt
- Festspiel-Karten früh sichern
- Gut mit Familypark (gleicher Ort) kombinierbar
    `,
    affiliateLinks: [
      { label: 'Unterkünfte bei St. Margarethen – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=St.+Margarethen+im+Burgenland' },
      { label: 'Burgenland: Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland' },
    ],
  },
  {
    slug: 'geschriebenstein-wandern-burgenland',
    title: 'Geschriebenstein – auf den höchsten Berg des Burgenlands',
    excerpt: 'Mit 884 m ist der Geschriebenstein der höchste Punkt des Burgenlands. Eine gemütliche Waldwanderung mit Aussichtsturm direkt an der Grenze zu Ungarn.',
    date: '2026-06-10',
    category: 'Wandern',
    region: 'burgenland',
    difficulty: 'leicht',
    bestSeason: 'April–November',
    highlights: ['Höchster Berg des Burgenlands (884 m)', 'Aussichtsturm mit Blick AT/Ungarn', 'Sanfte, schattige Waldwanderung'],
    content: `
Der Geschriebenstein im Günser Gebirge ist mit 884 m der höchste Berg des Burgenlands – und liegt genau auf der Grenze zu Ungarn. Eine entspannte Wanderung für alle Levels.

## Die Wanderung
Sanfte, gut beschilderte Waldwege führen zum Gipfel – angenehm schattig, daher auch im Hochsommer machbar. Mehrere Ausgangspunkte (z. B. Lockenhaus, Rechnitz).

## Am Gipfel
Ein **Aussichtsturm** bietet Rundblick über das Günser Gebirge, das Burgenland und nach Ungarn hinein. Eine Schutzhütte lädt zur Rast.

## Praktische Infos
- Naturpark Geschriebenstein-Írottkő
- Festes Schuhwerk reicht, kein alpines Terrain
- Kombinierbar mit der Ritterburg Lockenhaus
    `,
    affiliateLinks: [
      { label: 'Unterkünfte im Südburgenland – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Lockenhaus' },
      { label: 'Wanderschuhe – Amazon', url: 'https://www.amazon.de/s?k=wanderschuhe' },
    ],
  },
  {
    slug: 'burg-guessing-suedburgenland',
    title: 'Burg Güssing – Wahrzeichen des Südburgenlands',
    excerpt: 'Die älteste Burg des Burgenlands thront auf einem Vulkankegel über Güssing. Mit Museum, Aussicht und Greifvogel-Tradition ein lohnender Ausflug im grünen Süden.',
    date: '2026-06-10',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'April–Oktober',
    highlights: ['Älteste Burg des Burgenlands', 'Auf erloschenem Vulkankegel', 'Weiter Blick über das Südburgenland'],
    content: `
Burg Güssing wurde im 12. Jahrhundert auf einem erloschenen Vulkankegel errichtet und ist die älteste Burg des Burgenlands. Sie prägt das Bild des grünen, hügeligen Südburgenlands.

## Die Burg
Über einen Schrägaufzug oder zu Fuß erreicht man die Anlage. Oben warten ein Burgmuseum, eine Schatzkammer und ein herrlicher Rundblick über die sanfte Landschaft bis nach Ungarn.

## Region Südburgenland
Güssing liegt mitten in einer ruhigen Genussregion – Uhudler-Wein, Thermen und das Naturparkland laden zum Verweilen.

## Praktische Infos
- Anfahrt: Von Graz ca. 1 Stunde, von Wien ca. 1,5 Stunden
- Öffnungszeiten saisonal
- Gut mit einer Uhudler-Verkostung kombinierbar
    `,
    affiliateLinks: [
      { label: 'Unterkünfte in Güssing – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=G%C3%BCssing' },
      { label: 'Burgenland: Ausflüge – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland' },
    ],
  },
  {
    slug: 'uhudler-suedburgenland-wein',
    title: 'Uhudler – die kuriose Weinspezialität des Südburgenlands',
    excerpt: 'Erdbeer- und Waldbeerenaromen aus einer fast verbotenen Rebsorte: Der Uhudler ist die eigenwillige Weinspezialität des Südburgenlands. Wo man ihn verkostet.',
    date: '2026-06-10',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'Mai–Oktober',
    highlights: ['Einzigartige, fast verbotene Spezialität', 'Aromen von Erdbeere & Waldbeere', 'Uhudler-Weinstraße mit Buschenschänken'],
    content: `
Der Uhudler ist eine der kuriosesten Weinspezialitäten Österreichs – ein Wein aus „Direktträger"-Reben, der lange umstritten und zeitweise sogar verboten war. Heute ist er das Aushängeschild des Südburgenlands.

## Was macht ihn besonders?
Der Uhudler schmeckt unverwechselbar nach Walderdbeeren und Johannisbeeren – fruchtig, eigenwillig, einzigartig. Man liebt ihn oder findet ihn gewöhnungsbedürftig, aber probieren sollte man ihn unbedingt.

## Die Uhudler-Weinstraße
Im Südburgenland (rund um Heiligenbrunn) führt eine eigene Weinstraße zu Kellerstöckln und Buschenschänken, in denen der Uhudler ausgeschenkt wird – urig und bodenständig.

## Praktische Infos
- Region: Südburgenland, rund um Heiligenbrunn/Güssing
- **Nicht selbst fahren** nach der Verkostung
- Kellerstöckl als besondere Übernachtung – sehr beliebt
    `,
    affiliateLinks: [
      { label: 'Kellerstöckl & Unterkünfte Südburgenland – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Heiligenbrunn' },
      { label: 'Burgenland Wein – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland%20Wein' },
    ],
  },
  {
    slug: 'kulinarik-burgenland-martiniloben',
    title: 'Kulinarik im Burgenland – Gans, Wein und Martiniloben',
    excerpt: 'Das Burgenland ist eine Genussregion: pannonische Küche, Spitzenweine und im November das traditionelle Martiniloben mit Gansl. Was man probieren muss.',
    date: '2026-06-10',
    category: 'Ausflug',
    region: 'burgenland',
    bestSeason: 'Ganzjährig (Martiniloben im November)',
    highlights: ['Pannonische Küche & Spitzenweine', 'Martiniloben: Gansl & Jungwein im November', 'Buschenschank-Kultur'],
    content: `
Das milde pannonische Klima macht das Burgenland nicht nur zur Weinregion, sondern auch zur Genussregion. Wer herkommt, sollte sich Zeit zum Essen und Verkosten nehmen.

## Pannonische Küche
Deftig und bodenständig: Gänsebraten, Grammelpogatscherl, Kürbisgerichte, Fisch aus dem Neusiedler See (Zander, Karpfen) und reichlich frisches Gemüse aus dem „Gemüsegarten Österreichs" (Seewinkel).

## Martiniloben
Rund um den Martinitag (11. November) feiert das Burgenland das **Martiniloben**: Weingüter öffnen ihre Keller, der neue Jahrgang wird verkostet, dazu gibt es traditionell **Martinigansl**. Eine der schönsten Zeiten für einen kulinarischen Besuch.

## Wo genießen?
In Buschenschänken, Heurigen und Weingütern rund um den Neusiedler See und im Südburgenland. Reservierung in der Hauptsaison empfohlen.

## Praktische Infos
- Beste Zeit für Wein & Gansl: November
- Mit Weinverkostung kombinieren – aber Fahrer bestimmen
    `,
    affiliateLinks: [
      { label: 'Unterkünfte am Neusiedler See – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Neusiedler+See' },
      { label: 'Genusstouren Burgenland – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland%20Wein' },
    ],
  },

  // ─── SALZBURG ────────────────────────────────────────────────────────────────
  {
    slug: 'salzburg-stadt-altstadt',
    title: 'Salzburg Stadt – Mozart, Festung und barocke Altstadt',
    excerpt: 'Die Mozartstadt zählt zum UNESCO-Welterbe: Festung Hohensalzburg, Getreidegasse, Dom und Mirabellgarten. Der kompakte Guide für die schönste Barockstadt Österreichs.',
    date: '2026-06-11',
    category: 'Ausflug',
    region: 'salzburg',
    bestSeason: 'Ganzjährig',
    highlights: ['UNESCO-Welterbe Altstadt', 'Festung Hohensalzburg über der Stadt', 'Mozart-Geburtshaus & Mirabellgarten'],
    content: `
Salzburg ist eine der schönsten Städte Europas – die barocke Altstadt mit der mächtigen Festung gehört zum UNESCO-Welterbe und ist zu Fuß perfekt erkundbar.

## Festung Hohensalzburg
Das Wahrzeichen thront über der Stadt – eine der größten erhaltenen Burgen Europas. Hinauf per Standseilbahn oder zu Fuß. Oben: Museen und ein traumhafter Blick über Salzburg und die Alpen.

## Altstadt & Getreidegasse
Die berühmte Getreidegasse mit ihren schmiedeeisernen Zunftschildern, Mozarts Geburtshaus, der Dom und die Residenz – alles dicht beisammen. Mindestens einen halben Tag einplanen.

## Mirabellgarten
Der barocke Schlossgarten mit Blick auf die Festung – bekannt aus „The Sound of Music" und gratis zugänglich.

## Praktische Infos
- Anreise: Bahn von Wien ca. 2,5 Std., von München ca. 1,5 Std.
- Salzburg Card: freier Eintritt zu Sehenswürdigkeiten + öffentliche Verkehrsmittel
- Tipp: Früh morgens ist die Altstadt am ruhigsten
    `,
    affiliateLinks: [
      { label: 'Salzburg: Touren & Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Salzburg%20Stadt' },
      { label: 'Hotels in Salzburg – booking.com', url: 'https://www.booking.com/city/at/salzburg.de.html' },
    ],
  },
  {
    slug: 'zell-am-see-zeller-see',
    title: 'Zell am See & Zeller See – Baden mit Gletscherblick',
    excerpt: 'Türkiser Bergsee, die Schmittenhöhe und der Kitzsteinhorn-Gletscher in Reichweite: Zell am See ist eine der vielseitigsten Urlaubsregionen Salzburgs – Sommer wie Winter.',
    date: '2026-06-11',
    category: 'Baden',
    region: 'salzburg',
    bestSeason: 'Mai–September',
    highlights: ['Badesee mit Bergpanorama', 'Schmittenhöhe-Bergbahn', 'Kitzsteinhorn-Gletscher ganzjährig'],
    content: `
Zell am See liegt malerisch zwischen dem türkisen Zeller See und den Gipfeln der Hohen Tauern – eine der schönsten Kombinationen aus Wasser und Bergen in Österreich.

## Der Zeller See
Trinkwasserqualität, im Sommer bis ~23 °C, mit Strandbädern und einer Seepromenade. Rundherum führt ein flacher Rad- und Spazierweg (rund 11 km).

## Berge ringsum
- **Schmittenhöhe:** Hausberg mit Bergbahn, Panoramaweg und Aussicht über die Tauern
- **Kitzsteinhorn (Kaprun):** Gletscher mit Schnee das ganze Jahr – Bergbahn bis 3.000 m

## Für wen?
Familien (flacher See, viele Aktivitäten), Aktive (Wandern, Radfahren, Wassersport) und alle, die See + Hochgebirge an einem Ort wollen.

## Praktische Infos
- Anfahrt: Von Salzburg ca. 1 Stunde
- Sommercard mit Übernachtung: Bergbahnen & Schifffahrt oft inkludiert
- Kombi-Tipp: Großglockner Hochalpenstraße ist nicht weit
    `,
    affiliateLinks: [
      { label: 'Hotels in Zell am See – booking.com', url: 'https://www.booking.com/city/at/zell-am-see.de.html' },
      { label: 'Zell am See & Kaprun: Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Zell%20am%20See' },
    ],
  },
  {
    slug: 'krimmler-wasserfaelle',
    title: 'Krimmler Wasserfälle – Europas höchster Wasserfall',
    excerpt: 'Mit 380 m Fallhöhe sind die Krimmler Wasserfälle die höchsten Europas. Ein gut angelegter Wasserfallweg führt entlang der tosenden Kaskaden – ein Naturschauspiel für alle.',
    date: '2026-06-11',
    category: 'Ausflug',
    region: 'salzburg',
    bestSeason: 'Mai–Oktober',
    highlights: ['380 m – höchster Wasserfall Europas', 'Gut angelegter Wasserfallweg', 'Heilklima durch Wassernebel'],
    content: `
Die Krimmler Wasserfälle im Nationalpark Hohe Tauern stürzen in drei gewaltigen Stufen 380 Meter in die Tiefe – ein Naturschauspiel, das jährlich Hunderttausende anzieht.

## Der Wasserfallweg
Ein gut angelegter, stetig ansteigender Weg führt entlang der Kaskaden zu mehreren Aussichtskanzeln. Hin und zurück ca. 3–4 Stunden (mit Pausen), aber auch kürzere Abschnitte lohnen.

## Gesundes Mikroklima
Der feine Wassernebel gilt als heilsam für die Atemwege – die Krimmler Wasserfälle werden sogar für Allergiker-Studien genutzt.

## Praktische Infos
- Festes Schuhwerk & Regenschutz (es ist nass und kann rutschig sein)
- Eintritt/Parkgebühr vor Ort
- Anfahrt: Im Oberpinzgau, von Zell am See ca. 1 Stunde
- Kombinierbar mit dem Nationalpark Hohe Tauern
    `,
    affiliateLinks: [
      { label: 'Unterkünfte in Krimml/Oberpinzgau – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Krimml' },
      { label: 'Regenjacke für Ausflüge – Amazon', url: 'https://www.amazon.de/s?k=regenjacke+wandern' },
    ],
  },
  {
    slug: 'hohe-tauern-nationalpark-salzburg',
    title: 'Nationalpark Hohe Tauern – Wandern im größten Schutzgebiet der Alpen',
    excerpt: 'Gletscher, Dreitausender und seltene Tierwelt: Der Nationalpark Hohe Tauern ist das größte Schutzgebiet der Alpen. Die schönsten Wanderungen auf der Salzburger Seite.',
    date: '2026-06-11',
    category: 'Wandern',
    region: 'salzburg',
    difficulty: 'mittel',
    bestSeason: 'Juni–September',
    highlights: ['Größtes Schutzgebiet der Alpen', 'Gletscher, Murmeltiere & Steinadler', 'Touren von leicht bis hochalpin'],
    content: `
Der Nationalpark Hohe Tauern erstreckt sich über Salzburg, Kärnten und Tirol und schützt eine der eindrucksvollsten Hochgebirgslandschaften Europas – mit dem Großvenediger und unzähligen Dreitausendern.

## Für Einsteiger
Talwanderungen wie im **Obersulzbachtal** oder zu den Almen sind familientauglich und führen durch unberührte Natur – mit guter Chance auf Murmeltiere.

## Für Geübte
Hochtouren zum Großvenediger oder auf die umliegenden Gipfel sind ernsthafte alpine Unternehmungen – nur mit Erfahrung, Ausrüstung und ggf. Bergführer.

## Tierwelt
Murmeltiere, Steinböcke, Gämsen und der Steinadler – die Hohen Tauern sind ein Paradies für Naturbeobachter. Fernglas mitnehmen.

## Praktische Infos
- Nationalpark-Zentren mit Infos und geführten Rangertouren
- Wetter im Hochgebirge ernst nehmen – früh starten
- Ausrüstung je nach Tour: von Wanderschuhen bis Hochtourenset
    `,
    affiliateLinks: [
      { label: 'Unterkünfte im Pinzgau – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Pinzgau' },
      { label: 'Fernglas für Tierbeobachtung – Amazon', url: 'https://www.amazon.de/s?k=fernglas+10x42' },
    ],
  },
  {
    slug: 'salzburger-seenland-baden',
    title: 'Salzburger Seenland – Badeseen vor den Toren der Stadt',
    excerpt: 'Wallersee, Mattsee, Obertrumer See und Fuschlsee: Das Salzburger Seenland bietet warme Badeseen in idyllischer Landschaft – ruhiger und günstiger als die großen Touristenseen.',
    date: '2026-06-11',
    category: 'Baden',
    region: 'salzburg',
    bestSeason: 'Juni–September',
    highlights: ['Mehrere warme Badeseen', 'Nur 20–40 Min. von Salzburg Stadt', 'Ruhiger als die großen Seen'],
    content: `
Nördlich und östlich der Stadt Salzburg liegt das Salzburger Seenland – eine sanfte Hügellandschaft mit mehreren angenehm warmen Badeseen, ideal für entspannte Sommertage.

## Die Seen
- **Wallersee:** der größte, mit Strandbädern und Naturschutzgebiet
- **Mattsee & Obertrumer See:** warm, familienfreundlich, mit Segel- und SUP-Möglichkeiten
- **Fuschlsee:** kristallklar, im Salzkammergut-Stil, vor Bergkulisse

## Warum hierher?
Die Seen sind weniger überlaufen als die berühmten Salzkammergut-Seen, das Wasser ist warm, und Salzburg Stadt ist in 20–40 Minuten erreichbar – perfekt für Stadt + Badeurlaub.

## Praktische Infos
- Mit dem Rad gut verbindbar (Seenland-Radwege)
- Strandbäder meist mit kleinem Eintritt, einige Gratis-Stellen
- Anfahrt: Von Salzburg je nach See 20–40 Minuten
    `,
    affiliateLinks: [
      { label: 'Unterkünfte im Salzburger Seenland – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Mattsee' },
      { label: 'SUP-Board für Einsteiger – Amazon', url: 'https://www.amazon.de/s?k=sup+board+aufblasbar' },
    ],
  },
  {
    slug: 'eisriesenwelt-werfen',
    title: 'Eisriesenwelt Werfen – die größte Eishöhle der Welt',
    excerpt: 'In den Tennengebirge-Felsen verbirgt sich die größte Eishöhle der Welt. Gewaltige Eisformationen, eine spektakuläre Anfahrt mit Seilbahn – ein einzigartiges Naturerlebnis.',
    date: '2026-06-11',
    category: 'Ausflug',
    region: 'salzburg',
    bestSeason: 'Mai–Oktober',
    highlights: ['Größte Eishöhle der Welt', 'Spektakuläre Lage mit Seilbahn', 'Auch im Hochsommer eisig schön'],
    content: `
Hoch über dem Salzachtal bei Werfen liegt die Eisriesenwelt – mit über 42 km Länge die größte Eishöhle der Welt. Der zugängliche Teil zeigt monumentale Eisformationen.

## Der Besuch
Eine kurvige Bergstraße, ein steiler Fußweg und eine **Seilbahn** bringen dich zum Höhleneingang auf 1.640 m. Drinnen führt eine geführte Tour (mit Karbidlampen) durch glitzernde Eishallen und an gewaltigen Eisfiguren vorbei.

## Wichtig
- In der Höhle ist es **um 0 °C** – warm anziehen, auch im Hochsommer!
- Festes Schuhwerk, es geht über viele Stufen
- Nicht für Gehbehinderte geeignet (anstrengender Weg)

## Praktische Infos
- Anfahrt: Von Salzburg ca. 45 Minuten
- Mehrere Stunden einplanen (Anfahrt, Aufstieg, Führung)
- Kombinierbar mit der Burg Hohenwerfen direkt gegenüber
    `,
    officialLinks: [
      { label: 'Eisriesenwelt Werfen (eisriesenwelt.at)', url: 'https://www.eisriesenwelt.at' },
    ],
    affiliateLinks: [
      { label: 'Unterkünfte bei Werfen – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Werfen' },
      { label: 'Salzburg: Ausflüge & Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Salzburg' },
    ],
  },
  {
    slug: 'saalbach-hinterglemm',
    title: 'Saalbach-Hinterglemm – Bergsommer und Ski-Eldorado',
    excerpt: 'Im Winter eines der größten Skigebiete Österreichs, im Sommer ein Bike- und Wanderparadies: Saalbach-Hinterglemm im Salzburger Land bietet ganzjährig Action am Berg.',
    date: '2026-06-11',
    category: 'Ausflug',
    region: 'salzburg',
    bestSeason: 'Dezember–März & Juni–September',
    highlights: ['Skicircus: 270 km Pisten', 'Top Mountainbike-Region im Sommer', 'Bergbahnen für bequeme Wanderungen'],
    content: `
Saalbach-Hinterglemm im Pinzgau ist eine der bekanntesten Bergsportregionen Österreichs – im Winter Teil des riesigen „Skicircus", im Sommer ein Eldorado für Biker und Wanderer.

## Winter
Der **Skicircus Saalbach Hinterglemm Leogang Fieberbrunn** bietet rund 270 Pistenkilometer – eines der größten zusammenhängenden Skigebiete Österreichs, ideal für ausgedehnte Skitage.

## Sommer
- **Mountainbiking:** zahlreiche Trails und Bikeparks, Bergbahnen mit Radtransport
- **Wandern:** Höhenwege mit Panoramablick, viele Hütten
- Familienangebote rund um die Bergbahnen

## Praktische Infos
- Anfahrt: Von Zell am See ca. 20 Minuten
- Sommer- bzw. Skipass-Karten oft mit Übernachtung vergünstigt
- Lebhaftes Aprés-Ski im Winter – wer Ruhe sucht, weicht aus
    `,
    affiliateLinks: [
      { label: 'Hotels in Saalbach-Hinterglemm – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Saalbach+Hinterglemm' },
      { label: 'Skiausrüstung – Amazon', url: 'https://www.amazon.de/s?k=skihelm+mit+visier' },
    ],
  },
  {
    slug: 'schloss-hellbrunn-salzburg',
    title: 'Schloss Hellbrunn – Wasserspiele und Sound of Music',
    excerpt: 'Das Lustschloss Hellbrunn ist berühmt für seine 400 Jahre alten Wasserspiele, die Besucher mit versteckten Fontänen überraschen. Plus: der Pavillon aus „The Sound of Music".',
    date: '2026-06-11',
    category: 'Ausflug',
    region: 'salzburg',
    bestSeason: 'April–Oktober',
    highlights: ['Historische Wasserspiele zum Staunen', 'Sound-of-Music-Pavillon im Park', 'Familienfreundlich & verspielt'],
    content: `
Schloss Hellbrunn am Stadtrand von Salzburg wurde im 17. Jahrhundert als fürsterzbischöfliches Lustschloss erbaut – berühmt für seine raffinierten Wasserspiele.

## Die Wasserspiele
Bei der Führung durch den Park aktivieren versteckte Fontänen unerwartet das Wasser – ein verspielter Spaß, der schon vor 400 Jahren die Gäste überraschte. Auf trockene Sitzplätze sollte man nicht zu sehr vertrauen!

## Sound of Music
Der gläserne Pavillon („Sixteen Going on Seventeen") aus dem berühmten Film steht im Schlosspark – ein beliebtes Fotomotiv.

## Praktische Infos
- Wasserspiele nur in der warmen Jahreszeit (April–Okt.)
- Wechselkleidung für Kinder kann sinnvoll sein – man wird (absichtlich) nass
- Anfahrt: Vom Salzburger Zentrum ca. 15 Minuten, gut mit dem Bus erreichbar
    `,
    affiliateLinks: [
      { label: 'Salzburg: Touren & Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Salzburg' },
      { label: 'Hotels in Salzburg – booking.com', url: 'https://www.booking.com/city/at/salzburg.de.html' },
    ],
  },

  // ─── TIROL ───────────────────────────────────────────────────────────────────
  {
    slug: 'innsbruck-sehenswuerdigkeiten',
    title: 'Innsbruck – Alpenmetropole zwischen Altstadt und Nordkette',
    excerpt: 'Goldenes Dachl, Kaiserliche Hofburg und die Nordkette direkt über der Stadt: Innsbruck verbindet historische Altstadt mit Hochgebirge in Rekordzeit. Der Stadtguide.',
    date: '2026-06-11',
    category: 'Ausflug',
    region: 'tirol',
    bestSeason: 'Ganzjährig',
    highlights: ['Goldenes Dachl & Kaiserliche Hofburg', 'Nordkettenbahn von der Stadt aufs Hochgebirge', 'Alpenpanorama mitten in der Stadt'],
    content: `
Innsbruck ist die einzige Großstadt der Alpen, in der man in 20 Minuten von der barocken Altstadt auf 2.000 m Höhe gelangt – das macht die Tiroler Landeshauptstadt einzigartig.

## Altstadt
Das **Goldene Dachl** mit seinen 2.657 vergoldeten Schindeln ist das Wahrzeichen. Dazu die Kaiserliche Hofburg, der Dom und die bunten Bürgerhäuser – kompakt und sehenswert.

## Nordkettenbahn
Von der Innenstadt fährt die futuristische Hungerburgbahn (von Stararchitektin Zaha Hadid) und weiter die Seilbahn aufs **Hafelekar (2.256 m)** – Hochgebirge mit Blick über die ganze Stadt, in Minuten erreichbar.

## Praktische Infos
- Anreise: Bahn-Knotenpunkt, gut aus DE/AT/CH erreichbar
- Innsbruck Card: Bergbahnen, Museen & öffentlicher Verkehr inklusive
- Tipp: Sonnenuntergang vom Hafelekar ist spektakulär
    `,
    officialLinks: [
      { label: 'Innsbruck Tourismus (innsbruck.info)', url: 'https://www.innsbruck.info' },
      { label: 'Nordkettenbahnen (nordkette.com)', url: 'https://www.nordkette.com' },
    ],
    affiliateLinks: [
      { label: 'Innsbruck: Touren & Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Innsbruck' },
      { label: 'Hotels in Innsbruck – booking.com', url: 'https://www.booking.com/city/at/innsbruck.de.html' },
    ],
  },
  {
    slug: 'achensee-tirol',
    title: 'Achensee – Tirols größter See, der „Tiroler Fjord"',
    excerpt: 'Tiefblaues Wasser zwischen Karwendel und Rofan: Der Achensee ist Tirols größter See und ein Paradies für Segler, Wanderer und Genießer. Alles zum „Tiroler Meer".',
    date: '2026-06-11',
    category: 'Baden',
    region: 'tirol',
    bestSeason: 'Juni–September',
    highlights: ['Tirols größter See – tiefblau & klar', 'Top zum Segeln & Surfen (verlässlicher Wind)', 'Wandern im Karwendel & Rofan'],
    content: `
Der Achensee liegt auf 930 m zwischen den Karwendel- und Rofangebirgen – ein tiefblauer, klarer Bergsee, der wegen seiner langgestreckten Form auch „Tiroler Fjord" genannt wird.

## Wasser & Wind
Das Wasser ist klar und im Hochsommer angenehm (bis ~20 °C). Der verlässliche Wind macht den Achensee zu einem der besten **Segel- und Surfreviere** der Alpen. Strandbäder gibt es in Pertisau und Maurach.

## Berge ringsum
- **Rofan-Seilbahn** mit Aussicht und dem „Airrofan Skyglider"
- **Karwendel:** anspruchsvolle Wanderungen und Almen
- Schifffahrt über den See als entspannte Alternative

## Praktische Infos
- Anfahrt: Von Innsbruck ca. 45 Minuten
- Nostalgische Anreise mit der Achenseebahn (Zahnrad-Dampfbahn) von Jenbach
- Achensee Card mit Übernachtung: Bergbahnen & Schiff oft inkludiert
    `,
    affiliateLinks: [
      { label: 'Hotels am Achensee – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Achensee' },
      { label: 'Neoprenanzug / Wassersport – Amazon', url: 'https://www.amazon.de/s?k=neoprenanzug' },
    ],
  },
  {
    slug: 'oetztal-soelden',
    title: 'Ötztal & Sölden – Gletscher, Gipfel und Action',
    excerpt: 'Das Ötztal ist Tirols Abenteuer-Tal: Gletscher-Skigebiet Sölden, der Aqua Dome, hochalpine Wanderungen und das höchstgelegene Bergdorf Österreichs. Was du erleben kannst.',
    date: '2026-06-11',
    category: 'Ausflug',
    region: 'tirol',
    bestSeason: 'Ganzjährig',
    highlights: ['Gletscher-Skigebiet Sölden', 'Aqua Dome Therme', 'Hochalpine Touren bis 3.000 m'],
    content: `
Das Ötztal zieht sich tief in die Ötztaler Alpen – ein Tal der Superlative mit Gletschern, Dreitausendern und dem actionreichen Sölden.

## Sölden
Bekannt durch den Ski-Weltcup-Auftakt und das Gletscherskigebiet (Schnee bis in den Frühsommer). Die „Gaislachkogl"-Bahn führt zum Gipfelrestaurant und zur 007-ELEMENTS-James-Bond-Erlebniswelt.

## Sommer im Ötztal
- **Wandern:** von Talwegen bis zu hochalpinen Touren (z. B. rund um Obergurgl, das höchste Kirchdorf Österreichs)
- **Aqua Dome** in Längenfeld: spektakuläre Thermenlandschaft mit Bergblick
- Klettersteige, Rafting und Bikeparks

## Praktische Infos
- Anfahrt: Von Innsbruck ca. 1 Stunde
- Hochalpine Touren nur mit Erfahrung & Ausrüstung
- Aqua Dome ideal als Schlechtwetter- oder Aprés-Programm
    `,
    affiliateLinks: [
      { label: 'Hotels in Sölden/Ötztal – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=S%C3%B6lden' },
      { label: 'Ötztal: Tickets & Touren – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=%C3%96tztal' },
    ],
  },
  {
    slug: 'zillertal-wandern',
    title: 'Zillertal – Wandern zwischen Almen und Dreitausendern',
    excerpt: 'Das Zillertal ist eines der beliebtesten Wandertäler Tirols: sanfte Almwege im Tal, hochalpine Touren am Zillertaler Hauptkamm und der Hintertuxer Gletscher als ganzjähriges Highlight.',
    date: '2026-06-11',
    category: 'Wandern',
    region: 'tirol',
    difficulty: 'mittel',
    bestSeason: 'Juni–Oktober',
    highlights: ['Von Almwanderung bis Hochtour', 'Hintertuxer Gletscher – Schnee im Sommer', 'Dichtes Netz an Hütten'],
    content: `
Das Zillertal südlich von Jenbach ist ein Wanderklassiker – breit gefächert von gemütlichen Talwegen bis zu ernsthaften Hochtouren am vergletscherten Hauptkamm.

## Für Einsteiger & Familien
Almwanderungen und Höhenwege mit Bergbahn-Unterstützung (z. B. am Penken oder in Mayrhofen). Viele bewirtschaftete Almen mit Tiroler Schmankerln.

## Für Geübte
Der **Berliner Höhenweg** ist eine bekannte mehrtägige Hüttentour über den Zillertaler Hauptkamm – für trittsichere, konditionsstarke Bergwanderer.

## Hintertuxer Gletscher
Das einzige ganzjährige Skigebiet Österreichs – auch im Sommer Schnee und ein begehbares Natureispalast-Erlebnis im Gletscher.

## Praktische Infos
- Anfahrt: Von Innsbruck ca. 1 Stunde
- Zillertal Card mit Bergbahnen & Bussen
- Wetter und Tourenschwierigkeit ernst nehmen
    `,
    affiliateLinks: [
      { label: 'Hotels im Zillertal – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Zillertal' },
      { label: 'Wanderstöcke – Amazon', url: 'https://www.amazon.de/s?k=wanderst%C3%B6cke+teleskop' },
    ],
  },
  {
    slug: 'kitzbuehel-ausflug',
    title: 'Kitzbühel – Gamsstadt zwischen Glamour und Bergsport',
    excerpt: 'Die legendäre Streif, eine charmante mittelalterliche Altstadt und mondänes Flair: Kitzbühel ist einer der bekanntesten Orte der Alpen – im Sommer ein ruhiges Wander- und Golfparadies.',
    date: '2026-06-11',
    category: 'Ausflug',
    region: 'tirol',
    bestSeason: 'Ganzjährig',
    highlights: ['Legendäre Skiabfahrt „Streif"', 'Charmante mittelalterliche Altstadt', 'Sommer: Wandern, Golf & Bergbahnen'],
    content: `
Kitzbühel, die „Gamsstadt", ist einer der berühmtesten Orte der Alpen – bekannt durch das Hahnenkamm-Skirennen, aber auch im Sommer ein lohnendes Ziel.

## Winter
Die **Streif** am Hahnenkamm gilt als schwierigste Abfahrt der Welt – das jährliche Rennen ist ein gesellschaftliches Großereignis. Das Skigebiet ist groß und schneesicher.

## Sommer
Ruhiger und entspannter: Wandern und Biken am Kitzbüheler Horn, Golfplätze, der Schwarzsee zum Baden und eine hübsche Fußgängerzone mit Geschäften und Cafés.

## Altstadt
Die bemalten Bürgerhäuser der Vorderstadt geben Kitzbühel sein unverwechselbares, mittelalterliches Flair.

## Praktische Infos
- Anfahrt: Von Innsbruck ca. 1 Stunde, gut per Bahn erreichbar
- Im Winter (v. a. zur Rennzeit) teuer & ausgebucht – früh planen
- Sommer ist deutlich günstiger und ruhiger
    `,
    affiliateLinks: [
      { label: 'Hotels in Kitzbühel – booking.com', url: 'https://www.booking.com/city/at/kitzbuhel.de.html' },
      { label: 'Tirol: Erlebnisse – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Tirol' },
    ],
  },
  {
    slug: 'swarovski-kristallwelten',
    title: 'Swarovski Kristallwelten – funkelndes Erlebnis bei Innsbruck',
    excerpt: 'Der Riese, glitzernde Wunderkammern und ein verspielter Garten: Die Swarovski Kristallwelten in Wattens sind eines der meistbesuchten Ausflugsziele Tirols – für Groß und Klein.',
    date: '2026-06-11',
    category: 'Ausflug',
    region: 'tirol',
    bestSeason: 'Ganzjährig',
    highlights: ['Kunstvolle Kristall-Wunderkammern', 'Großer Spiel- & Erlebnisgarten', 'Auch bei Regen ein top Ziel'],
    content: `
Die Swarovski Kristallwelten in Wattens bei Innsbruck sind ein Mix aus Kunst, Design und Inszenierung – und eines der beliebtesten Ausflugsziele Tirols.

## Die Wunderkammern
Renommierte Künstler haben Räume rund um das Thema Kristall gestaltet – von funkelnden Installationen bis zu begehbaren Kunstwerken. Der „Riese" speit Wasser am Eingang.

## Für Familien
Der weitläufige Garten mit Spielturm, Karussell und Wasserspielen begeistert Kinder. Drinnen wie draußen gibt es viel zu entdecken – ideal auch bei wechselhaftem Wetter.

## Praktische Infos
- Anfahrt: Von Innsbruck ca. 20 Minuten, Shuttle-Bus verfügbar
- Tickets online oft günstiger und ohne Anstehen
- Mehrere Stunden einplanen
    `,
    officialLinks: [
      { label: 'Swarovski Kristallwelten (kristallwelten.swarovski.com)', url: 'https://kristallwelten.swarovski.com' },
    ],
    affiliateLinks: [
      { label: 'Swarovski Kristallwelten: Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Swarovski%20Kristallwelten' },
      { label: 'Hotels bei Innsbruck – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Wattens' },
    ],
  },
  {
    slug: 'wilder-kaiser-wandern',
    title: 'Wilder Kaiser – schroffe Gipfel und sanfte Almen',
    excerpt: 'Das markante Kaisergebirge ist eine der eindrucksvollsten Kulissen Tirols. Vom gemütlichen Almweg bis zur ausgesetzten Klettertour bietet der Wilde Kaiser Wandern für jeden.',
    date: '2026-06-11',
    category: 'Wandern',
    region: 'tirol',
    difficulty: 'mittel',
    bestSeason: 'Juni–Oktober',
    highlights: ['Spektakuläre Felskulisse', 'Familienwege & Bergsteiger-Touren', 'Bekannte Filmkulisse (Bergdoktor)'],
    content: `
Der Wilde Kaiser im Tiroler Unterland ragt mit schroffen Kalkwänden über sanften grünen Almen auf – eine der fotogensten Bergkulissen Österreichs und bekannt aus der TV-Serie „Der Bergdoktor".

## Für Familien & Einsteiger
Rund um Ellmau, Going und Scheffau führen viele leichte Almwege – mit Einkehrhütten und Spielstationen. Bergbahnen (z. B. in Söll) erleichtern den Aufstieg.

## Für Bergsteiger
Die schroffen Gipfel des Kaisergebirges sind ein Eldorado für erfahrene Bergsteiger und Kletterer – ausgesetzte Steige und alpine Touren.

## Praktische Infos
- Region „Wilder Kaiser" um Ellmau, Going, Scheffau, Söll
- Anfahrt: Von Innsbruck ca. 1 Stunde, von Kufstein ca. 20 Minuten
- Festes Schuhwerk; bei alpinen Touren entsprechende Ausrüstung
    `,
    affiliateLinks: [
      { label: 'Hotels am Wilden Kaiser – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Ellmau' },
      { label: 'Wanderschuhe – Amazon', url: 'https://www.amazon.de/s?k=wanderschuhe' },
    ],
  },
  {
    slug: 'plansee-tirol-baden',
    title: 'Plansee & Heiterwanger See – Tirols stille Badeseen im Westen',
    excerpt: 'Der Plansee ist Tirols zweitgrößter See: tiefblau, ruhig und von Bergen umrahmt. Mit dem benachbarten Heiterwanger See ein Geheimtipp für Badeurlaub abseits der Massen.',
    date: '2026-06-11',
    category: 'Baden',
    region: 'tirol',
    bestSeason: 'Juni–September',
    highlights: ['Tiefblauer Bergsee, ruhig & klar', 'Verbunden mit dem Heiterwanger See', 'Bootsverleih & Schifffahrt'],
    content: `
Im äußersten Westen Tirols, nahe der bayerischen Grenze, liegt der Plansee – Tirols zweitgrößter See und ein ruhiger Gegenpol zu den belebten Tourismusseen.

## Der See
Tiefblaues, klares Wasser, von bewaldeten Bergen umrahmt. Im Hochsommer angenehm zum Baden, dazu Bootsverleih und eine kleine Schifffahrt. Über einen Kanal ist der Plansee mit dem **Heiterwanger See** verbunden.

## Aktiv
Rund um den See führen Rad- und Spazierwege; die Gegend ist auch bei Stand-up-Paddlern und Anglern beliebt. Ruhe und Natur stehen im Vordergrund.

## Praktische Infos
- Anfahrt: Nahe Reutte, von Innsbruck ca. 1,5 Stunden, von München ca. 1,5 Stunden
- Gut mit einem Ausflug zu Schloss Neuschwanstein (Bayern) kombinierbar
- Wenig Infrastruktur – Verpflegung mitnehmen
    `,
    affiliateLinks: [
      { label: 'Unterkünfte bei Reutte/Plansee – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Reutte' },
      { label: 'SUP-Board – Amazon', url: 'https://www.amazon.de/s?k=sup+board+aufblasbar' },
    ],
  },
  // ─── STEIERMARK (Ausbau 2) ───────────────────────────────────────────────────
  {
    slug: 'altausseer-see-baden',
    title: 'Altausseer See – kristallklares Wasser im Ausseerland',
    excerpt: 'Eingerahmt vom Loser und dem Dachsteinmassiv zählt der Altausseer See zu den schönsten und saubersten Bergseen der Steiermark. Baden, Wandern und Plättenfahrten.',
    date: '2026-06-12', category: 'Baden', region: 'steiermark', bestSeason: 'Juni–September',
    highlights: ['Glasklares, sauberes Wasser', 'Seeumrundung in 2 Std. (flach)', 'Traditionelle Plätten-Bootsfahrten'],
    content: `
Der Altausseer See im steirischen Salzkammergut ist ein Postkartenmotiv: tiefgrünes, kristallklares Wasser vor der Kulisse von Loser und Trisselwand.

## Baden & Bootfahren
Das Wasser ist sauber und im Hochsommer erfrischend (bis ~20 °C). Ruderboote und die traditionellen flachen „Plätten" kann man mieten – die ruhigste Art, den See zu erleben.

## Seeumrundung
Ein flacher, knapp 8 km langer Rundweg führt um den See – familientauglich, schattig, mit traumhaften Ausblicken. Ideal zum Spazieren oder Radeln.

## Praktische Infos
- Anfahrt: Von Bad Aussee wenige Minuten
- Parkplätze gebührenpflichtig, früh kommen
- Kombinierbar mit der Loser-Panoramastraße
    `,
    affiliateLinks: [
      { label: 'Unterkünfte im Ausseerland – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Altaussee' },
      { label: 'Steiermark: Erlebnisse – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Steiermark' },
    ],
  },
  {
    slug: 'grundlsee-steirisches-meer',
    title: 'Grundlsee – das „steirische Meer"',
    excerpt: 'Der Grundlsee ist der größte See der Steiermark und Tor zum geheimnisvollen Toplitzsee. Baden, Bootfahren und die „Drei-Seen-Tour" durch unberührte Bergnatur.',
    date: '2026-06-12', category: 'Baden', region: 'steiermark', bestSeason: 'Juni–September',
    highlights: ['Größter See der Steiermark', '"Drei-Seen-Tour" zum Toplitzsee', 'Unberührte Bergkulisse'],
    content: `
Der Grundlsee bei Bad Aussee wird liebevoll „steirisches Meer" genannt – ein langgestreckter, klarer See, umgeben von steilen Bergflanken.

## Baden & Bootfahren
Mehrere Badeplätze und Bootsverleihe säumen das Ufer. Das Wasser ist sauber und ruhig – ideal für Familien und Ruhesuchende.

## Drei-Seen-Tour
Ein Klassiker: vom Grundlsee per Boot und zu Fuß weiter zum **Toplitzsee** (Schauplatz vieler Legenden) und zum kleinen Kammersee, der Quelle der Traun. Geführte Plättenfahrten machen es zum Erlebnis.

## Praktische Infos
- Anfahrt: Von Bad Aussee ca. 10 Minuten
- Drei-Seen-Touren saisonal, Boot empfehlenswert
- Festes Schuhwerk für die Wege zwischen den Seen
    `,
    affiliateLinks: [
      { label: 'Unterkünfte am Grundlsee – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Grundlsee' },
      { label: 'Ausseerland: Touren – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Ausseerland' },
    ],
  },
  {
    slug: 'stubenbergsee-baden',
    title: 'Stubenbergsee – Familienbadesee in der Oststeiermark',
    excerpt: 'Warmes Wasser, flache Ufer und viel Programm: Der Stubenbergsee ist einer der beliebtesten Badeseen der Oststeiermark – perfekt für Familien.',
    date: '2026-06-12', category: 'Baden', region: 'steiermark', bestSeason: 'Mai–September',
    highlights: ['Warmer, flacher Familienbadesee', 'Tretboote, Strandbäder & Spielplätze', 'Tierwelt Herberstein in der Nähe'],
    content: `
Der Stubenbergsee bei Stubenberg ist ein künstlich angelegter, aber herrlich warmer Badesee – einer der Top-Familienseen der Oststeiermark.

## Baden & Aktivitäten
Flache Einstiege, mehrere Strandbäder, Tretboote und Liegewiesen. Das Wasser wird im Sommer angenehm warm – ideal für Kinder.

## In der Nähe
Die **Tierwelt Herberstein** (Zoo + Schloss + Gironcoli-Museum) liegt nur wenige Minuten entfernt – eine perfekte Ergänzung für einen Familientag.

## Praktische Infos
- Anfahrt: Von Graz ca. 45 Minuten
- Eintritt in die Strandbäder, einige freie Uferzonen
- Sonnenschutz mitnehmen – wenig Schatten
    `,
    affiliateLinks: [
      { label: 'Unterkünfte bei Stubenberg – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Stubenberg+am+See' },
      { label: 'Strandzubehör – Amazon', url: 'https://www.amazon.de/s?k=strandmuschel' },
    ],
  },
  {
    slug: 'hochschwab-wandern',
    title: 'Hochschwab – einsame Gipfel und Gämsen in der Obersteiermark',
    excerpt: 'Das Hochschwabmassiv ist eine der wildesten und einsamsten Bergregionen der Steiermark – mit großen Gämsrudeln, Karstlandschaft und anspruchsvollen Gipfeltouren.',
    date: '2026-06-12', category: 'Wandern', region: 'steiermark', difficulty: 'schwer', bestSeason: 'Juni–Oktober',
    highlights: ['Wilde, einsame Karstberge', 'Große Gämsbestände', 'Anspruchsvolle Gipfeltouren'],
    content: `
Das Hochschwabgebiet nördlich von Bruck an der Mur ist eine raue Kalk-Hochfläche – wenig erschlossen, dafür ursprünglich und tierreich.

## Die Touren
Der Gipfel des Hochschwab (2.277 m) ist ein langer, konditionsfordernder Anstieg, oft über Karstgelände und vorbei am Schiestlhaus. Trittsicherheit und Ausdauer sind Pflicht.

## Tierwelt
Das Gebiet beherbergt einen der größten Gämsbestände der Alpen – mit etwas Glück sieht man ganze Rudel. Auch Steinadler kreisen hier.

## Praktische Infos
- Wasser mitnehmen: Karst führt kaum Oberflächenwasser, Hütten sind rar
- Früh starten, Wetter ernst nehmen (Nebelgefahr auf der Hochfläche)
- Ausgangspunkte u. a. Seewiesen, Bodenbauer
    `,
    affiliateLinks: [
      { label: 'Wanderausrüstung – Amazon', url: 'https://www.amazon.de/s?k=wanderrucksack+30l' },
      { label: 'Unterkünfte Obersteiermark – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Bruck+an+der+Mur' },
    ],
  },
  {
    slug: 'giglachseen-schladminger-tauern',
    title: 'Giglachseen – Bergseen-Wanderung in den Schladminger Tauern',
    excerpt: 'Zwei türkise Bergseen auf über 1.900 m, urige Hütten und ein Panorama wie im Bilderbuch: Die Giglachseen sind eine der lohnendsten Wanderungen der Steiermark.',
    date: '2026-06-12', category: 'Wandern', region: 'steiermark', difficulty: 'mittel', bestSeason: 'Juli–September',
    highlights: ['Zwei türkise Bergseen auf 1.900 m', 'Urige Hütten zum Einkehren', 'Auch für geübte Familien machbar'],
    content: `
Die Giglachseen in den Schladminger Tauern sind ein Wanderklassiker – zwei glasklare Bergseen, eingebettet in eine sanfte Hochgebirgslandschaft.

## Die Wanderung
Vom Parkplatz Ursprungalm führt ein gut markierter Weg in 1,5–2 Stunden zu den Seen. Mäßige Steigung, technisch einfach – auch für trittsichere Familien geeignet.

## Einkehr & Übernachtung
Die Giglachseehütte und die Ignaz-Mattis-Hütte liegen direkt am Wasser – ideal für eine Brettljause oder als Etappe auf der Schladminger Tauern-Höhenrunde.

## Praktische Infos
- Mautstraße zur Ursprungalm (Ausgangspunkt)
- Anfahrt: Von Schladming ca. 45 Minuten
- Wetterumschwung möglich – Regenschutz & warme Schicht
    `,
    affiliateLinks: [
      { label: 'Hotels in Schladming – booking.com', url: 'https://www.booking.com/city/at/schladming.de.html' },
      { label: 'Wanderschuhe – Amazon', url: 'https://www.amazon.de/s?k=wanderschuhe' },
    ],
  },
  {
    slug: 'murau-murtalbahn',
    title: 'Murau & die Murtalbahn – Bier, Holz und Nostalgie-Dampf',
    excerpt: 'Das mittelalterliche Murau in der Obersteiermark ist bekannt für seine Brauerei und die nostalgische Murtalbahn. Eine charmante Auszeit abseits des Trubels.',
    date: '2026-06-12', category: 'Ausflug', region: 'steiermark', bestSeason: 'Mai–Oktober',
    highlights: ['Mittelalterliches Stadtbild', 'Murauer Brauerei mit Bierschau', 'Nostalgische Dampf-Schmalspurbahn'],
    content: `
Murau im oberen Murtal ist ein hübsches mittelalterliches Städtchen – dominiert von Schloss Murau und der weithin bekannten Murauer Brauerei.

## Stadt & Bier
Die Altstadt mit Bürgerhäusern, Kirche und Schloss lädt zum Bummeln. Die Murauer Brauerei bietet Führungen und eine „Bierwelt" zum Verkosten.

## Murtalbahn
Die nostalgische Schmalspurbahn fährt durchs Murtal – an manchen Tagen mit Dampflok. Man kann sogar selbst eine Draisine mieten und auf den Schienen strampeln.

## Praktische Infos
- Anfahrt: im oberen Murtal, gut über die Murtal-Bundesstraße
- Brauereiführung & Dampffahrten an festen Terminen – vorab prüfen
- Kombinierbar mit dem Murradweg
    `,
    affiliateLinks: [
      { label: 'Unterkünfte in Murau – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Murau' },
      { label: 'Steiermark: Touren – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Steiermark' },
    ],
  },
  {
    slug: 'bad-aussee-ausseerland',
    title: 'Bad Aussee & das Ausseerland – Herz des Salzkammguts',
    excerpt: 'Im geografischen Mittelpunkt Österreichs liegt das Ausseerland: Bad Aussee mit Tradition, Narzissenwiesen, Salzbergwerk und drei traumhaften Seen.',
    date: '2026-06-12', category: 'Ausflug', region: 'steiermark', bestSeason: 'Mai–Oktober',
    highlights: ['Mittelpunkt Österreichs', 'Narzissenfest im Frühsommer', 'Tracht, Tradition & Salzkammergut-Flair'],
    content: `
Bad Aussee ist die Kurstadt im Herzen des Ausseerlands – ein Landstrich, der für seine ursprüngliche Tradition, Tracht und Naturschönheit berühmt ist.

## Stadt & Tradition
Der hübsche Kurort lebt gelebtes Brauchtum: Trachten, Handwerk und das berühmte **Narzissenfest** (Ende Mai/Anfang Juni) mit kunstvollen Blumenfiguren.

## Natur ringsum
Drei Seen (Altausseer See, Grundlsee, Toplitzsee), der Loser als Hausberg und Salz­bergwerke machen das Ausseerland zum Naturparadies.

## Praktische Infos
- Anreise per Bahn (Salzkammergutbahn) gut möglich
- Narzissenfest: früh Unterkunft buchen
- Idealer Ausgangspunkt für die Seen-Ausflüge
    `,
    affiliateLinks: [
      { label: 'Hotels in Bad Aussee – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Bad+Aussee' },
      { label: 'Ausseerland: Erlebnisse – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Ausseerland' },
    ],
  },
  {
    slug: 'rogner-bad-blumau-therme',
    title: 'Rogner Bad Blumau – Hundertwasser-Therme in der Oststeiermark',
    excerpt: 'Bunte Fassaden, goldene Kuppeln und Türme: Die Therme Rogner Bad Blumau ist ein begehbares Hundertwasser-Kunstwerk – Wellness und Architektur in einem.',
    date: '2026-06-12', category: 'Ausflug', region: 'steiermark', bestSeason: 'Ganzjährig',
    highlights: ['Therme als Hundertwasser-Gesamtkunstwerk', 'Vulkanisches Thermalwasser', 'Ganzjähriges Wellness-Ziel'],
    content: `
Die Therme Rogner Bad Blumau ist weltweit einzigartig: ein vollständig nach den Ideen von Friedensreich Hundertwasser gestaltetes Thermendorf – bunt, organisch, ohne gerade Linien.

## Architektur & Therme
Begrünte Dächer, schiefe Säulen, goldene Zwiebeltürme – und mittendrin warmes Thermalwasser aus vulkanischem Untergrund. Baden im Kunstwerk.

## Für wen?
Wellness-Suchende, Architektur-Fans und alle, die etwas Außergewöhnliches wollen. Tagesgäste wie Übernachtungsgäste.

## Praktische Infos
- Anfahrt: Von Graz ca. 1 Stunde
- Tageskarten oder Übernachtung im Thermendorf
- Wochentags ruhiger
    `,
    affiliateLinks: [
      { label: 'Thermenhotels Oststeiermark – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Bad+Blumau' },
      { label: 'Bademantel & Wellness – Amazon', url: 'https://www.amazon.de/s?k=bademantel+unisex' },
    ],
  },
  {
    slug: 'poellauer-tal-naturpark',
    title: 'Naturpark Pöllauer Tal – Hirschbirne, Klöster und sanfte Hügel',
    excerpt: 'Das Pöllauer Tal in der Oststeiermark ist ein „Tal der Genüsse": Streuobstwiesen mit der seltenen Hirschbirne, das Schloss Pöllau und ruhige Wanderwege.',
    date: '2026-06-12', category: 'Ausflug', region: 'steiermark', bestSeason: 'April–Oktober',
    highlights: ['Genuss-Naturpark mit Hirschbirne', 'Barockes Schloss & "steirischer Petersdom"', 'Sanfte Wander- & Radwege'],
    content: `
Der Naturpark Pöllauer Tal ist eine sanfte, grüne Hügellandschaft – bekannt für die seltene Hirschbirne und kulinarische Spezialitäten daraus (Most, Brand, Schokolade).

## Genuss & Kultur
Die Streuobstwiesen prägen das Tal. Sehenswert sind das Schloss Pöllau und die Wallfahrtskirche Pöllauberg, der „steirische Petersdom".

## Aktiv
Gemütliche Wander- und Radwege durch Obstgärten und Wälder – ideal für entspannte Tage mit Einkehr bei Buschenschänken und Mostheurigen.

## Praktische Infos
- Anfahrt: Von Hartberg ca. 15 Minuten
- Herbst (Ernte) besonders stimmungsvoll
- Hofläden mit Hirschbirnen-Spezialitäten
    `,
    affiliateLinks: [
      { label: 'Unterkünfte im Pöllauer Tal – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=P%C3%B6llau' },
      { label: 'Steiermark: Genusstouren – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Steiermark' },
    ],
  },
  {
    slug: 'wasserlochklamm-palfau',
    title: 'Wasserlochklamm Palfau – Brücken, Wasserfälle und Smaragdwasser',
    excerpt: 'Über Hängebrücken und Steige durch eine tosende Schlucht zum smaragdgrünen Wasserloch: Die Wasserlochklamm in Palfau ist ein Naturerlebnis für die ganze Familie.',
    date: '2026-06-12', category: 'Ausflug', region: 'steiermark', bestSeason: 'Mai–Oktober',
    highlights: ['Spektakuläre Schlucht mit Hängebrücken', 'Smaragdgrünes Quellwasser', 'Familientauglicher Steig'],
    content: `
Die Wasserlochklamm bei Palfau im Gesäuse-Vorland ist eine der schönsten erschlossenen Klammen der Steiermark – mit fünf Wasserfällen und leuchtend grünem Wasser.

## Der Klammweg
Gut gesicherte Steige, Holzbrücken und eine Hängebrücke führen entlang der Wasserfälle bergauf zum „Wasserloch", dem smaragdgrünen Quelltopf. Hin und zurück ca. 2 Stunden.

## Für wen?
Familientauglich (Kinder lieben die Brücken), aber festes Schuhwerk nötig – es ist nass und teils steil.

## Praktische Infos
- Eintritt/Parkgebühr vor Ort
- Rutschfeste Schuhe & Regenjacke
- Anfahrt: nahe Palfau, gut mit dem Gesäuse kombinierbar
    `,
    affiliateLinks: [
      { label: 'Unterkünfte bei Palfau – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Palfau' },
      { label: 'Wanderschuhe rutschfest – Amazon', url: 'https://www.amazon.de/s?k=wanderschuhe+wasserdicht' },
    ],
  },

  // ─── BURGENLAND (Ausbau 2) ───────────────────────────────────────────────────
  {
    slug: 'podersdorf-am-see',
    title: 'Podersdorf am See – das Strandbad-Zentrum des Neusiedler Sees',
    excerpt: 'Podersdorf ist der einzige Ort direkt am offenen Neusiedler See – mit dem berühmten Leuchtturm, langem Strandbad und besten Bedingungen zum Surfen und Segeln.',
    date: '2026-06-13', category: 'Baden', region: 'burgenland', bestSeason: 'Mai–September',
    highlights: ['Direkter Zugang zum offenen See', 'Wahrzeichen Leuchtturm', 'Top zum Kitesurfen & Segeln'],
    content: `
Podersdorf am See ist der Badeort am Neusiedler See schlechthin – als einziger Ort liegt er ohne breiten Schilfgürtel direkt am offenen Wasser.

## Strandbad & Leuchtturm
Das langgezogene Strandbad mit flachem Einstieg ist ideal für Familien, der weiße Leuchtturm das Fotomotiv. Liegewiesen, Gastronomie und Promenade gehören dazu.

## Wassersport
Der verlässliche Wind macht Podersdorf zum Hotspot für **Surfer, Kitesurfer und Segler** – mit Schulen und Verleih vor Ort.

## Praktische Infos
- Anfahrt: Von Wien ca. 1 Stunde
- Mit dem Rad: direkt am Neusiedler See Radweg
- Wenig Schatten – Sonnenschutz mitnehmen
    `,
    affiliateLinks: [
      { label: 'Hotels in Podersdorf – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Podersdorf+am+See' },
      { label: 'Sonnen- & Strandzubehör – Amazon', url: 'https://www.amazon.de/s?k=strandmuschel+windschutz' },
    ],
  },
  {
    slug: 'burg-lockenhaus',
    title: 'Burg Lockenhaus – Ritterburg mit Geheimnissen',
    excerpt: 'Die mittelalterliche Burg Lockenhaus im Südburgenland gilt als eine der besterhaltenen Wehrburgen Österreichs – mit Kultsaal, Greifvögeln und legendärem Templer-Mythos.',
    date: '2026-06-13', category: 'Ausflug', region: 'burgenland', bestSeason: 'April–Oktober',
    highlights: ['Besterhaltene Wehrburg der Region', 'Geheimnisvoller Kultraum', 'Greifvogelschau & Museum'],
    content: `
Burg Lockenhaus thront über dem gleichnamigen Ort am Fuß des Geschriebensteins – eine der besterhaltenen mittelalterlichen Burgen Österreichs.

## Die Burg
Der berühmte gotische „Kultraum" gibt bis heute Rätsel auf, dazu Verliese, Rüstkammer und ein Museum. Die Templer-Legende sorgt für Gänsehaut.

## Erlebnis
Greifvogelvorführungen, Ritterfeste und ein Burgrestaurant machen den Besuch zum Erlebnis für die ganze Familie.

## Praktische Infos
- Anfahrt: Südburgenland, von Oberpullendorf ca. 20 Minuten
- Kombinierbar mit Wanderung auf den Geschriebenstein
- Öffnungszeiten/Vorführungen vorab prüfen
    `,
    affiliateLinks: [
      { label: 'Unterkünfte in Lockenhaus – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Lockenhaus' },
      { label: 'Burgenland: Ausflüge – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland' },
    ],
  },
  {
    slug: 'schloss-halbturn',
    title: 'Schloss Halbturn – barockes Juwel im Seewinkel',
    excerpt: 'Das ehemalige kaiserliche Jagdschloss Halbturn ist das bedeutendste Barockschloss des Burgenlands – mit Deckenfresko, Schlosspark und eigenem Weingut.',
    date: '2026-06-13', category: 'Ausflug', region: 'burgenland', bestSeason: 'April–Oktober',
    highlights: ['Bedeutendstes Barockschloss des Burgenlands', 'Fresko von Maulbertsch', 'Schlosspark & eigenes Weingut'],
    content: `
Schloss Halbturn wurde im 18. Jahrhundert als kaiserliches Jagd- und Lustschloss erbaut – ein eleganter Barockbau im flachen Seewinkel.

## Schloss & Kunst
Das prächtige Deckenfresko von Franz Anton Maulbertsch im Festsaal ist ein Höhepunkt. Wechselnde Ausstellungen und ein weitläufiger Schlosspark laden zum Verweilen.

## Wein
Das Schloss Halbturn ist auch ein renommiertes Weingut – Verkostungen im historischen Ambiente sind möglich.

## Praktische Infos
- Anfahrt: Von Neusiedl am See ca. 20 Minuten
- Ausstellungen saisonal – Termine prüfen
- Gut mit dem Seewinkel-Nationalpark kombinierbar
    `,
    affiliateLinks: [
      { label: 'Unterkünfte im Seewinkel – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Halbturn' },
      { label: 'Burgenland Wein – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland%20Wein' },
    ],
  },
  {
    slug: 'leithagebirge-purbach-wandern',
    title: 'Leithagebirge & Purbach – Wandern und Wein am Nordwestufer',
    excerpt: 'Bewaldete Höhen, Aussicht über den Neusiedler See und Kellergassen voller Wein: Das Leithagebirge bei Purbach verbindet sanftes Wandern mit Genuss.',
    date: '2026-06-13', category: 'Wandern', region: 'burgenland', difficulty: 'leicht', bestSeason: 'April–Oktober',
    highlights: ['Sanfte Wälder mit Seeblick', 'Kellergassen & Weingüter', 'Familientaugliche Wege'],
    content: `
Das Leithagebirge im Nordwesten des Neusiedler Sees ist ein bewaldeter Höhenzug mit gemütlichen Wanderwegen und herrlichem Blick über die pannonische Ebene.

## Wandern
Leichte bis mittlere Wege führen durch Eichen- und Buchenwälder zu Aussichtspunkten über den See. Ideal für Familien und Genusswanderer.

## Wein & Kultur
Orte wie Purbach und Donnerskirchen sind für ihren Wein (Leithaberg DAC) und ihre Kellergassen bekannt – perfekt für eine Einkehr nach der Tour.

## Praktische Infos
- Anfahrt: Von Eisenstadt ca. 15 Minuten
- Gut mit Weinverkostung kombinierbar (nicht selbst fahren)
- Feste Schuhe reichen, kein alpines Gelände
    `,
    affiliateLinks: [
      { label: 'Unterkünfte in Purbach – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Purbach+am+Neusiedler+See' },
      { label: 'Wanderschuhe leicht – Amazon', url: 'https://www.amazon.de/s?k=wanderschuhe+leicht' },
    ],
  },
  {
    slug: 'burg-bernstein-edelserpentin',
    title: 'Bernstein – Burg, Edelserpentin und Südburgenland-Idylle',
    excerpt: 'Der Ort Bernstein im Südburgenland ist berühmt für den seltenen Edelserpentin-Stein und seine Burg mit Sternwarte. Ein ruhiges, ursprüngliches Stück Burgenland.',
    date: '2026-06-13', category: 'Ausflug', region: 'burgenland', bestSeason: 'April–Oktober',
    highlights: ['Seltener Edelserpentin („Bernsteiner Jade")', 'Burg mit Hotel & Sternwarte', 'Ursprüngliches Südburgenland'],
    content: `
Bernstein liegt in den sanften Hügeln des Südburgenlands – bekannt für eine geologische Besonderheit: den grünen Edelserpentin, der hier seit Generationen verarbeitet wird.

## Edelserpentin
Der „Bernsteiner Edelserpentin" (auch „steirische Jade" genannt) wird in örtlichen Werkstätten zu Schmuck und Skulpturen verarbeitet – Schauwerkstätten geben Einblick.

## Burg Bernstein
Die mittelalterliche Burg ist heute teils Hotel, beherbergt eine Sternwarte und ist mit dem Forscher Graf Almásy („Der englische Patient") verbunden.

## Praktische Infos
- Anfahrt: Südburgenland, von Oberwart ca. 20 Minuten
- Schauwerkstätten & Burg mit eigenen Öffnungszeiten
- Ruhige Region – ideal zum Entschleunigen
    `,
    affiliateLinks: [
      { label: 'Unterkünfte in Bernstein – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Bernstein+Burgenland' },
      { label: 'Burgenland: Erlebnisse – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland' },
    ],
  },
  {
    slug: 'friedensburg-stadtschlaining',
    title: 'Friedensburg Stadtschlaining – Mittelalter und Friedensarbeit',
    excerpt: 'Die mächtige Burg Schlaining im Südburgenland ist heute Sitz des Friedenszentrums und ein eindrucksvolles Ausflugsziel mit Museum und mittelalterlichem Stadtbild.',
    date: '2026-06-13', category: 'Ausflug', region: 'burgenland', bestSeason: 'April–Oktober',
    highlights: ['Gut erhaltene mittelalterliche Burg', 'Europäisches Friedenszentrum', 'Hübsches historisches Städtchen'],
    content: `
Die Friedensburg Schlaining in Stadtschlaining ist eine der eindrucksvollsten Burgen des Südburgenlands – und ein besonderer Ort: Sie beherbergt das Österreichische Studienzentrum für Frieden und Konfliktlösung.

## Burg & Museum
Die wuchtige Anlage mit Bergfried und Arkadenhof beherbergt Ausstellungen rund um Krieg und Frieden. Das kleine Städtchen ringsum ist hübsch erhalten.

## Für wen?
Geschichts- und Kulturinteressierte – ein nachdenklicher, ruhiger Kontrast zu reinen Naturzielen.

## Praktische Infos
- Anfahrt: Südburgenland, von Oberwart ca. 15 Minuten
- Museum mit saisonalen Öffnungszeiten
- Gut mit Bernstein & Güssing kombinierbar
    `,
    affiliateLinks: [
      { label: 'Unterkünfte bei Stadtschlaining – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Stadtschlaining' },
      { label: 'Burgenland: Touren – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland' },
    ],
  },
  {
    slug: 'steppentierpark-pamhagen',
    title: 'Steppentierpark Pamhagen – Wildtiere im Seewinkel',
    excerpt: 'Wasserbüffel, Przewalski-Pferde, Wölfe und Steppenrinder: Der Steppentierpark Pamhagen zeigt die Tierwelt der pannonischen Steppe – ideal für Familien.',
    date: '2026-06-13', category: 'Ausflug', region: 'burgenland', bestSeason: 'April–Oktober',
    highlights: ['Tiere der pannonischen Steppe', 'Weitläufiges Freigelände', 'Familienfreundlich, naturnah'],
    content: `
Der Steppentierpark Pamhagen im Seewinkel zeigt rund 50 Tierarten – mit Schwerpunkt auf der ursprünglichen Tierwelt der pannonischen Steppe.

## Die Tiere
Wasserbüffel, Przewalski-Wildpferde, Steppenrinder, Wölfe, Luchse und viele Vögel leben in weitläufigen, naturnahen Gehegen. Kinder können einen Streichelbereich besuchen.

## Kombi-Tipp
Direkt benachbart liegen die St. Martins Therme & Lodge mit Naturbadesee – ein ganzer Familientag aus Tierpark + Baden.

## Praktische Infos
- Anfahrt: Von Wien ca. 1,5 Stunden
- Großes Gelände – gutes Schuhwerk
- Saisonale Öffnungszeiten beachten
    `,
    affiliateLinks: [
      { label: 'Unterkünfte in Pamhagen – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Pamhagen' },
      { label: 'Fernglas für Kinder – Amazon', url: 'https://www.amazon.de/s?k=fernglas+kinder' },
    ],
  },
  {
    slug: 'weinidylle-radweg-suedburgenland',
    title: 'Weinidylle-Radweg – durch das hügelige Südburgenland',
    excerpt: 'Sanfte Rebhügel, Kellerstöckl und Uhudler-Buschenschänke: Der Weinidylle-Radweg führt gemütlich durch eine der ursprünglichsten Genussregionen Österreichs.',
    date: '2026-06-13', category: 'Ausflug', region: 'burgenland', bestSeason: 'April–Oktober',
    highlights: ['Hügelige Genuss-Radtour', 'Kellerstöckl & Uhudler', 'Ruhig & wenig befahren'],
    content: `
Der Weinidylle-Radweg erschließt das südliche Burgenland rund um Güssing, Heiligenbrunn und Eberau – eine sanfte, von Weingärten geprägte Hügellandschaft.

## Die Tour
Im Gegensatz zum flachen Neusiedler-See-Radweg geht es hier wellig auf und ab – mit E-Bike entspannt machbar. Unterwegs locken Kellerstöckl, Buschenschänke und der einzigartige Uhudler.

## Genuss
Hofläden, Mostheurige und Weingüter säumen die Strecke. Die Region ist deutlich ruhiger und ursprünglicher als der Norden.

## Praktische Infos
- E-Bike-Verleih in größeren Orten empfehlenswert
- Buschenschank-Öffnungszeiten („ausg'steckt") prüfen
- Kombinierbar mit Burg Güssing
    `,
    affiliateLinks: [
      { label: 'Unterkünfte im Südburgenland – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=G%C3%BCssing' },
      { label: 'Fahrradzubehör – Amazon', url: 'https://www.amazon.de/s?k=fahrradtasche+gep%C3%A4cktr%C3%A4ger' },
    ],
  },
  {
    slug: 'kittsee-schloss',
    title: 'Kittsee – Barockschloss im Dreiländereck',
    excerpt: 'Ganz im Norden des Burgenlands, wo Österreich, Ungarn und die Slowakei zusammentreffen, liegt Kittsee mit seinem Barockschloss und dem Ethnographischen Museum.',
    date: '2026-06-13', category: 'Ausflug', region: 'burgenland', bestSeason: 'April–Oktober',
    highlights: ['Barockschloss mit Museum', 'Dreiländereck AT/HU/SK', 'Nahe Bratislava & Wien'],
    content: `
Kittsee liegt im äußersten Nordburgenland – nur wenige Kilometer von Bratislava und gut eine halbe Stunde von Wien entfernt, im Dreiländereck.

## Schloss & Museum
Das barocke Schloss Kittsee beherbergt das Ethnographische Museum mit wechselnden Ausstellungen zu Volkskultur und Brauchtum Mittel- und Osteuropas.

## Lage
Durch die Nähe zu zwei Hauptstädten ein idealer Zwischenstopp – Wien und Bratislava sind beide schnell erreichbar.

## Praktische Infos
- Anfahrt: Von Wien ca. 45 Minuten
- Museum mit saisonalen Öffnungszeiten
- Gut mit einem Bratislava-Ausflug kombinierbar
    `,
    affiliateLinks: [
      { label: 'Unterkünfte in Kittsee/Umgebung – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Kittsee' },
      { label: 'Burgenland: Touren – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Burgenland' },
    ],
  },
  {
    slug: 'naturpark-rosalia-kogelberg',
    title: 'Naturpark Rosalia-Kogelberg – Wandern im hügeligen Mittelburgenland',
    excerpt: 'Zwischen Wäldern, Wiesen und der Wallfahrtskapelle Rosalia: Der Naturpark Rosalia-Kogelberg bietet sanftes Wandern und Ruhe an der Grenze zu Niederösterreich.',
    date: '2026-06-13', category: 'Wandern', region: 'burgenland', difficulty: 'leicht', bestSeason: 'April–Oktober',
    highlights: ['Sanfte Wald- & Wiesenwege', 'Rosalienkapelle als Ausflugsziel', 'Ruhig & familientauglich'],
    content: `
Der Naturpark Rosalia-Kogelberg erstreckt sich über die bewaldeten Hügel im Norden des Mittelburgenlands – ein ruhiges Wandergebiet abseits der Touristenströme.

## Wandern
Markierte Wege führen durch Mischwälder und über Wiesen, vorbei an der barocken **Rosalienkapelle** auf dem Rosaliengebirge. Sanfte Anstiege, ideal für Familien.

## Natur
Artenreiche Wiesen, alte Eichenwälder und ein Lehrpfad machen den Naturpark auch für Kinder lehrreich.

## Praktische Infos
- Anfahrt: Von Mattersburg/Forchtenstein wenige Minuten
- Gut mit Burg Forchtenstein kombinierbar
- Feste Schuhe genügen
    `,
    affiliateLinks: [
      { label: 'Unterkünfte im Mittelburgenland – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Forchtenstein' },
      { label: 'Wanderschuhe – Amazon', url: 'https://www.amazon.de/s?k=wanderschuhe' },
    ],
  },

  // ─── TIROL (Ausbau 2) ────────────────────────────────────────────────────────
  {
    slug: 'stubaital-stubaier-gletscher',
    title: 'Stubaital & Stubaier Gletscher – Tirols größtes Gletscherskigebiet',
    excerpt: 'Nur 45 Minuten von Innsbruck: Das Stubaital bietet das größte Gletscherskigebiet Österreichs, Höhenwanderungen und die Aussichtsplattform „TOP OF TYROL" auf über 3.200 m.',
    date: '2026-06-14', category: 'Ausflug', region: 'tirol', bestSeason: 'Ganzjährig',
    highlights: ['Größtes Gletscherskigebiet Österreichs', 'Aussichtsplattform auf 3.210 m', 'Wandern & Skifahren ganzjährig'],
    content: `
Das Stubaital südlich von Innsbruck endet am mächtigen Stubaier Gletscher – einem Ganzjahres-Skigebiet und Hochgebirgs-Erlebnis ohne alpinistische Anforderungen.

## Gletscher & Aussicht
Bergbahnen bringen dich bequem ins ewige Eis. Die Plattform **„TOP OF TYROL"** auf 3.210 m bietet einen Rundblick über mehr als 100 Dreitausender.

## Sommer
Höhenwanderungen, der Wilde-Wasser-Weg entlang tosender Bäche und Klettersteige – das Tal ist auch im Sommer ein Wanderparadies.

## Praktische Infos
- Anfahrt: Von Innsbruck ca. 45 Minuten
- Auch im Sommer warm anziehen (Gletscher!)
- Bergbahn-Tickets online oft günstiger
    `,
    officialLinks: [
      { label: 'Stubaier Gletscher (stubaier-gletscher.com)', url: 'https://www.stubaier-gletscher.com' },
    ],
    affiliateLinks: [
      { label: 'Hotels im Stubaital – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Stubaital' },
      { label: 'Tirol: Tickets & Touren – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Stubaital' },
    ],
  },
  {
    slug: 'seefeld-tirol',
    title: 'Seefeld in Tirol – Hochplateau für Genießer und Langläufer',
    excerpt: 'Auf einem sonnigen Hochplateau über Innsbruck liegt Seefeld – zweifacher Olympia-Austragungsort, Langlauf-Mekka und im Sommer ein sanftes Wander- und Wellnessziel.',
    date: '2026-06-14', category: 'Ausflug', region: 'tirol', bestSeason: 'Ganzjährig',
    highlights: ['Sonniges Hochplateau (1.200 m)', 'Langlauf-Weltzentrum', 'Mondänes Flair & Wellness'],
    content: `
Seefeld liegt auf einem sonnenverwöhnten Hochplateau nordwestlich von Innsbruck – elegant, leicht erreichbar und ganzjährig beliebt.

## Winter
Eines der bekanntesten **Langlaufgebiete** der Welt (zweimal Olympia, mehrfach WM), dazu Abfahrtspisten und Winterwanderwege.

## Sommer
Sanfte Wanderungen über das Plateau, Golf, Wellness und gemütliche Cafés – Seefeld gilt als mondänes, aber entspanntes Ziel.

## Praktische Infos
- Anreise bequem per Bahn von Innsbruck (ca. 30 Min.)
- Höhenlage = angenehm im Hochsommer
- Gut für Familien & ältere Gäste geeignet
    `,
    affiliateLinks: [
      { label: 'Hotels in Seefeld – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Seefeld+in+Tirol' },
      { label: 'Tirol: Erlebnisse – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Seefeld' },
    ],
  },
  {
    slug: 'festung-kufstein',
    title: 'Festung Kufstein – Wahrzeichen am Tor zu Tirol',
    excerpt: 'Hoch über dem Inn thront die Festung Kufstein mit der berühmten Heldenorgel. Eine der mächtigsten Burganlagen Österreichs – mit Panoramablick und lebendiger Altstadt.',
    date: '2026-06-14', category: 'Ausflug', region: 'tirol', bestSeason: 'April–Oktober',
    highlights: ['Mächtige Festung über dem Inn', 'Berühmte Heldenorgel', 'Charmante Altstadt (Römerhofgasse)'],
    content: `
Kufstein, das „Tor zu Tirol", wird überragt von einer der eindrucksvollsten Festungsanlagen Österreichs.

## Die Festung
Über einen Panoramaaufzug oder zu Fuß erreichbar, bietet sie Museen, den Kaiserturm und einen weiten Blick über das Inntal. Täglich erklingt die **Heldenorgel** – eine der größten Freiluftorgeln der Welt.

## Altstadt
Die malerische Römerhofgasse mit ihren Gasthäusern (bekannt durch das Lied „Kufsteinlied") lädt zum Bummeln und Einkehren.

## Praktische Infos
- Anfahrt: An der A12/Grenze zu Bayern, ca. 1 Std. von Innsbruck
- Heldenorgel täglich zur Mittagszeit
- Gut mit dem Kaisergebirge (Wandern) kombinierbar
    `,
    affiliateLinks: [
      { label: 'Hotels in Kufstein – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Kufstein' },
      { label: 'Tirol: Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Kufstein' },
    ],
  },
  {
    slug: 'lienzer-dolomiten-osttirol',
    title: 'Lienzer Dolomiten & Osttirol – schroffe Felsen, südliches Flair',
    excerpt: 'Abgeschieden im Süden liegt Osttirol mit der Sonnenstadt Lienz und den schroffen Lienzer Dolomiten – ein Geheimtipp für Wanderer und Ruhesuchende.',
    date: '2026-06-14', category: 'Wandern', region: 'tirol', difficulty: 'mittel', bestSeason: 'Juni–Oktober',
    highlights: ['Schroffe Dolomiten-Kulisse', 'Sonnenstadt Lienz', 'Ruhig & wenig überlaufen'],
    content: `
Osttirol ist vom übrigen Tirol durch hohe Berge getrennt und dadurch ursprünglich geblieben. Über der Bezirksstadt Lienz ragen die markanten Lienzer Dolomiten auf.

## Wandern
Vom gemütlichen Talweg bis zur hochalpinen Tour über Klettersteige reicht das Angebot. Die Dolomitenhütte ist ein beliebter Ausgangspunkt mit spektakulärem Blick.

## Lienz & Umgebung
Die „Sonnenstadt" Lienz mit ihrer italienisch anmutenden Altstadt, dazu Schloss Bruck und die Nähe zum Nationalpark Hohe Tauern.

## Praktische Infos
- Anfahrt: über Felbertauern oder von Kärnten (Drautal)
- Hochtouren nur für Geübte mit Ausrüstung
- Geheimtipp – auch in der Hochsaison ruhiger
    `,
    affiliateLinks: [
      { label: 'Hotels in Lienz/Osttirol – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Lienz' },
      { label: 'Wanderausrüstung – Amazon', url: 'https://www.amazon.de/s?k=wanderausr%C3%BCstung' },
    ],
  },
  {
    slug: 'reschensee-versunkener-kirchturm',
    title: 'Reschensee – der versunkene Kirchturm im Wasser',
    excerpt: 'Ein einzelner Kirchturm ragt aus dem Wasser: Der Reschensee im äußersten Westen Tirols/Südtirols ist eines der meistfotografierten Motive der Alpen.',
    date: '2026-06-14', category: 'Ausflug', region: 'tirol', bestSeason: 'Mai–Oktober',
    highlights: ['Ikonischer versunkener Kirchturm', 'Fotomotiv von Weltrang', 'Top-Spot für Wind- & Kitesurfer'],
    content: `
Der Reschensee am Reschenpass entstand 1950 durch einen Stausee – ein ganzes Dorf wurde geflutet. Geblieben ist der romanische Kirchturm, der bis heute aus dem Wasser ragt.

## Das Wahrzeichen
Der einsame Turm im türkisen Wasser vor Bergkulisse ist eines der berühmtesten Fotomotive der Alpen – im Winter, wenn der See gefroren ist, sogar begehbar.

## Aktiv
Durch den beständigen Wind ist der Reschensee ein Hotspot für **Kite- und Windsurfer**. Ein Rad-/Wanderweg führt um den See.

## Praktische Infos
- Lage: Reschenpass, Grenze Tirol/Südtirol/Schweiz
- Anfahrt: von Landeck ca. 1 Stunde
- Gut mit einem Ausflug ins Südtiroler Vinschgau kombinierbar
    `,
    affiliateLinks: [
      { label: 'Unterkünfte am Reschensee – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Reschensee' },
      { label: 'Kamera-Zubehör – Amazon', url: 'https://www.amazon.de/s?k=reisestativ' },
    ],
  },
  {
    slug: 'hintertuxer-gletscher',
    title: 'Hintertuxer Gletscher – Skifahren mitten im Sommer',
    excerpt: 'Österreichs einziges Ganzjahres-Skigebiet: Am Hintertuxer Gletscher im Zillertal kann man an 365 Tagen Ski fahren – plus den begehbaren Natur-Eispalast erkunden.',
    date: '2026-06-14', category: 'Ausflug', region: 'tirol', bestSeason: 'Ganzjährig',
    highlights: ['Ganzjähriges Skigebiet (365 Tage)', 'Begehbarer Natur-Eispalast', 'Gletscherflugbahn bis 3.250 m'],
    content: `
Am hintersten Ende des Zillertals liegt der Hintertuxer Gletscher – das einzige Skigebiet Österreichs, das das ganze Jahr geöffnet hat.

## Ski im Sommer
Selbst im Juli und August liegt hier oben bestens präparierter Schnee – ein Erlebnis für alle, die nicht auf den Winter warten wollen.

## Natur-Eispalast
Eine Besonderheit: der begehbare Eispalast im Inneren des Gletschers, mit glitzernden Eiskristallen und einem unterirdischen See.

## Praktische Infos
- Anfahrt: durchs Zillertal bis Hintertux
- Warme, wetterfeste Kleidung – auch im Hochsommer
- Bergbahn-Kombitickets prüfen
    `,
    affiliateLinks: [
      { label: 'Hotels in Hintertux/Zillertal – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Hintertux' },
      { label: 'Skiausrüstung – Amazon', url: 'https://www.amazon.de/s?k=skihandschuhe' },
    ],
  },
  {
    slug: 'alpbachtal-schoenstes-dorf',
    title: 'Alpbachtal – das „schönste Dorf Österreichs"',
    excerpt: 'Holzhäuser mit Blumenbalkonen, sattgrüne Almen und gelebte Tradition: Alpbach wurde zum schönsten Dorf Österreichs gekürt. Ein Bilderbuch-Tirol zum Wandern.',
    date: '2026-06-14', category: 'Ausflug', region: 'tirol', bestSeason: 'Mai–Oktober',
    highlights: ['Gekürtes „schönstes Dorf Österreichs"', 'Einheitliche Tiroler Holzarchitektur', 'Familienfreundliches Wandergebiet'],
    content: `
Alpbach im Alpbachtal gilt als eines der schönsten Dörfer der Alpen – berühmt für seine einheitliche, traditionelle Holzbauweise mit blumengeschmückten Balkonen.

## Dorf & Tradition
Strenge Bauvorschriften haben das harmonische Ortsbild bewahrt. Alpbach ist auch durch das Europäische Forum (Denkertreffen) international bekannt.

## Aktiv
Das Wandergebiet rund um das Wiedersbergerhorn ist familienfreundlich, mit Bergbahnen, Almen und Erlebniswegen. Im Winter ein gemütliches Skigebiet.

## Praktische Infos
- Anfahrt: von der A12, Abfahrt Brixlegg/Kramsach
- Gut mit dem Reintalersee (Baden) kombinierbar
- Sommercard mit Bergbahnen
    `,
    affiliateLinks: [
      { label: 'Hotels im Alpbachtal – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Alpbach' },
      { label: 'Tirol: Erlebnisse – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Alpbachtal' },
    ],
  },
  {
    slug: 'st-anton-am-arlberg',
    title: 'St. Anton am Arlberg – Wiege des alpinen Skilaufs',
    excerpt: 'St. Anton am Arlberg gilt als eines der besten Skigebiete der Welt und legendäres Après-Ski-Ziel. Im Sommer ein hochalpines Wander- und Bikerevier.',
    date: '2026-06-14', category: 'Ausflug', region: 'tirol', bestSeason: 'Dezember–April & Juni–September',
    highlights: ['Weltklasse-Skigebiet am Arlberg', 'Legendäres Après-Ski', 'Sommer: Wandern & Biken hochalpin'],
    content: `
St. Anton am Arlberg im Westen Tirols ist eine Ikone des Wintersports – hier wurde der alpine Skilauf maßgeblich geprägt.

## Winter
Teil des riesigen **Skigebiets Arlberg** (Ski Arlberg) mit über 300 Pistenkilometern, anspruchsvollen Hängen und berühmtem, lautem Après-Ski.

## Sommer
Ruhiger und naturnah: hochalpine Wanderungen, Mountainbike-Trails und Bergbahnen mit Panoramablick.

## Praktische Infos
- Anreise bequem per Bahn (Arlberg-Strecke)
- Winter teuer & ausgebucht – früh buchen
- Sommer deutlich günstiger und ruhiger
    `,
    affiliateLinks: [
      { label: 'Hotels in St. Anton – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=St.+Anton+am+Arlberg' },
      { label: 'Skiausrüstung – Amazon', url: 'https://www.amazon.de/s?k=skibrille' },
    ],
  },
  {
    slug: 'walchsee-kaiserwinkl',
    title: 'Walchsee im Kaiserwinkl – warmer Badesee vor dem Zahmen Kaiser',
    excerpt: 'Der Walchsee im Tiroler Kaiserwinkl ist einer der wärmsten Badeseen Tirols – flach, sauber und ideal für Familien, mit dem Kaisergebirge als Kulisse.',
    date: '2026-06-14', category: 'Baden', region: 'tirol', bestSeason: 'Juni–September',
    highlights: ['Einer der wärmsten Seen Tirols (bis ~24 °C)', 'Flach & familienfreundlich', 'Kaisergebirge als Kulisse'],
    content: `
Der Walchsee im nordtiroler Kaiserwinkl ist ein angenehm warmer Moorsee – ideal zum Baden vor der markanten Kulisse des Zahmen Kaisers.

## Baden
Durch die geringe Tiefe erwärmt sich der See schnell (bis ~24 °C) – perfekt für Familien. Strandbäder, Liegewiesen und Bootsverleih am Ufer.

## Aktiv
Ein Rundweg führt um den See, dazu SUP, Segeln und Wanderungen am Zahmen Kaiser. Im Winter Langlauf und Winterwandern.

## Praktische Infos
- Anfahrt: nahe Kufstein, von Innsbruck ca. 1 Stunde
- Strandbäder mit Eintritt, einige freie Uferstellen
- Ruhiger als die großen Tourismusseen
    `,
    affiliateLinks: [
      { label: 'Unterkünfte am Walchsee – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Walchsee' },
      { label: 'SUP-Board – Amazon', url: 'https://www.amazon.de/s?k=sup+board+aufblasbar' },
    ],
  },
  {
    slug: 'pitztaler-gletscher',
    title: 'Pitztaler Gletscher – Tirols höchster Gletscher per Bahn',
    excerpt: 'Mit der unterirdischen Gletscherbahn und der Seilbahn geht es auf 3.440 m zum Café 3.440, dem höchstgelegenen Café Österreichs – mit Panoramabrücke und Gletscherblick.',
    date: '2026-06-14', category: 'Ausflug', region: 'tirol', bestSeason: 'Ganzjährig',
    highlights: ['Höchster Punkt per Bahn in Tirol (3.440 m)', 'Höchstes Café Österreichs', 'Panoramabrücke über dem Eis'],
    content: `
Der Pitztaler Gletscher am Ende des einsamen Pitztals bringt dich besonders hoch hinauf – per unterirdischer Standseilbahn und Gletscherseilbahn auf 3.440 m.

## Café 3.440 & Panoramabrücke
Oben warten das höchstgelegene Café Österreichs und eine Aussichtsbrücke mit Blick auf die Wildspitze (3.768 m), Tirols höchsten Berg.

## Ski & Sommer
Skifahren bis weit in den Frühsommer, dazu Gletscherführungen und ein einzigartiges Hochgebirgserlebnis – auch für Nicht-Skifahrer.

## Praktische Infos
- Anfahrt: durchs Pitztal bis Mittelberg
- Warme Kleidung – Hochgebirge, dünne Luft
- Wetter & Sicht vorab prüfen (Webcams)
    `,
    affiliateLinks: [
      { label: 'Unterkünfte im Pitztal – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Pitztal' },
      { label: 'Tirol: Tickets & Touren – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Pitztal' },
    ],
  },

  // ─── SALZBURG (Ausbau 2) ─────────────────────────────────────────────────────
  {
    slug: 'salzwelten-hallein-duerrnberg',
    title: 'Salzwelten Hallein – ins Salzbergwerk am Dürrnberg',
    excerpt: 'Mit der Grubenbahn in den Berg, über Bergmannsrutschen in die Tiefe und mit dem Floß über einen unterirdischen Salzsee: Die Salzwelten Hallein sind ein Abenteuer für die ganze Familie.',
    date: '2026-06-15', category: 'Ausflug', region: 'salzburg', bestSeason: 'Ganzjährig',
    highlights: ['Ältestes Salzbergwerk-Erlebnis der Welt', 'Bergmannsrutschen & Salzsee-Floß', 'Ganzjährig – ideal bei Regen'],
    content: `
Am Dürrnberg bei Hallein wurde schon vor über 2.500 Jahren von den Kelten Salz abgebaut. Heute führt eine Erlebnisführung tief in den Berg.

## Das Erlebnis
Mit der Grubenbahn geht's hinein, über zwei lange **Bergmannsrutschen** hinab, und mit einem beleuchteten Floß über einen unterirdischen Salzsee. Dazu Einblicke in keltische Geschichte.

## Für wen?
Familien (Kinder lieben die Rutschen), Geschichtsinteressierte – und alle, die ein wetterunabhängiges Ziel suchen.

## Praktische Infos
- Im Berg konstant ~10 °C – warme Jacke (Overall wird gestellt)
- Anfahrt: von Salzburg ca. 20 Minuten
- Festes Schuhwerk, Führung mit fixen Zeiten
    `,
    officialLinks: [
      { label: 'Salzwelten (salzwelten.at)', url: 'https://www.salzwelten.at' },
    ],
    affiliateLinks: [
      { label: 'Unterkünfte in Hallein – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Hallein' },
      { label: 'Salzburg: Tickets & Touren – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Salzburg' },
    ],
  },
  {
    slug: 'wolfgangsee-st-gilgen',
    title: 'Wolfgangsee & St. Gilgen – Salzkammergut-Idylle',
    excerpt: 'Tiefblaues Wasser, das „Weiße Rössl" und die Schafbergbahn: Der Wolfgangsee an der Grenze zum Salzkammergut gehört zu den schönsten Badeseen rund um Salzburg.',
    date: '2026-06-15', category: 'Baden', region: 'salzburg', bestSeason: 'Juni–September',
    highlights: ['Klares Salzkammergut-Wasser', 'Schafbergbahn mit Traumblick', 'Nostalgische Raddampfer'],
    content: `
Der Wolfgangsee liegt malerisch zwischen St. Gilgen (Salzburg) und St. Wolfgang – eine der bekanntesten Postkartenkulissen Österreichs.

## Baden & Schifffahrt
Sauberes, im Sommer angenehm warmes Wasser, mehrere Strandbäder und nostalgische Schaufelraddampfer, die die Orte verbinden.

## Schafberg
Mit der historischen Zahnradbahn geht es auf den Schafberg (1.783 m) – der Panoramablick über den See und die Salzkammergut-Seen ist legendär.

## Praktische Infos
- Anfahrt: Von Salzburg ca. 40 Minuten nach St. Gilgen
- Schafbergbahn saisonal, früh buchen
- St. Gilgen mit Mozart-Bezug (Geburtsort der Mutter)
    `,
    affiliateLinks: [
      { label: 'Hotels am Wolfgangsee – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=St.+Gilgen' },
      { label: 'Salzkammergut: Touren – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Wolfgangsee' },
    ],
  },
  {
    slug: 'fuschlsee-baden',
    title: 'Fuschlsee – kristallklarer Badesee bei Salzburg',
    excerpt: 'Trinkwasserqualität, smaragdgrünes Wasser und ein Schloss am Ufer: Der Fuschlsee ist einer der saubersten und schönsten Badeseen im Salzburger Seengebiet.',
    date: '2026-06-15', category: 'Baden', region: 'salzburg', bestSeason: 'Juni–September',
    highlights: ['Trinkwasserqualität, smaragdgrün', 'Naturbelassenes Ufer', 'Nur 20 Min. von Salzburg'],
    content: `
Der Fuschlsee östlich von Salzburg besticht durch sein klares, grün schimmerndes Wasser und ein weitgehend naturbelassenes Ufer.

## Baden & Natur
Mehrere Badeplätze, dazu ein 6,5 km langer Seerundweg durch Wald und am Wasser entlang. Das Schloss Fuschl thront elegant am Ufer.

## Ruhe statt Trubel
Im Vergleich zu den großen Salzkammergut-Seen geht es hier ruhiger zu – ideal für entspannte Badetage und Spaziergänge.

## Praktische Infos
- Anfahrt: Von Salzburg ca. 20 Minuten
- Begrenzte Parkplätze – früh kommen
- Gut mit Wolfgangsee/St. Gilgen kombinierbar
    `,
    affiliateLinks: [
      { label: 'Unterkünfte am Fuschlsee – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Fuschl+am+See' },
      { label: 'Strandzubehör – Amazon', url: 'https://www.amazon.de/s?k=badetuch+mikrofaser' },
    ],
  },
  {
    slug: 'bad-gastein-wasserfall',
    title: 'Bad Gastein – Wasserfall, Belle Époque und Thermen',
    excerpt: 'Ein tosender Wasserfall mitten im Ort, prachtvolle Belle-Époque-Hotels und heilendes Thermalwasser: Bad Gastein erlebt als stilvolles Bergdorf ein spektakuläres Comeback.',
    date: '2026-06-15', category: 'Ausflug', region: 'salzburg', bestSeason: 'Ganzjährig',
    highlights: ['Wasserfall mitten im Ortszentrum', 'Belle-Époque-Architektur', 'Heilende Gasteiner Thermen'],
    content: `
Bad Gastein im Gasteinertal ist ein einzigartiges Bergdorf: An steile Hänge gebaut, mit einem **Wasserfall mitten im Zentrum** und prachtvollen Hotelpalästen aus der Belle Époque.

## Atmosphäre
Lange etwas verschlafen, erlebt der Ort ein stilvolles Comeback – mit Designhotels, Kunst und dem morbiden Charme der alten Grandhotels.

## Thermen & Berge
Das heilende Thermalwasser (Felsentherme, Alpentherme) ist berühmt. Ringsum: Skifahren im Winter, Wandern im Sommer.

## Praktische Infos
- Anreise bequem per Bahn (Tauernbahn)
- Wasserfallweg führt mitten durch den Ort
- Kombinierbar mit dem Nationalpark Hohe Tauern
    `,
    affiliateLinks: [
      { label: 'Hotels in Bad Gastein – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Bad+Gastein' },
      { label: 'Salzburg: Erlebnisse – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Gastein' },
    ],
  },
  {
    slug: 'burg-hohenwerfen',
    title: 'Burg Hohenwerfen – Mittelalterburg mit Greifvogelschau',
    excerpt: 'Hoch über dem Salzachtal thront die 900 Jahre alte Burg Hohenwerfen. Mit historischer Falknerei-Flugschau und Blick auf das Tennengebirge ein Highlight für Familien.',
    date: '2026-06-15', category: 'Ausflug', region: 'salzburg', bestSeason: 'April–Oktober',
    highlights: ['900 Jahre alte Höhenburg', 'Historische Greifvogel-Flugschau', 'Gegenüber der Eisriesenwelt'],
    content: `
Burg Hohenwerfen wacht seit über 900 Jahren über das Salzachtal bei Werfen – eine der eindrucksvollsten Höhenburgen Österreichs.

## Burg & Falknerei
Neben Waffenkammer, Verlies und Türmen ist die **historische Falknerei** das Highlight: Adler, Geier und Falken im freien Flug vor der Bergkulisse.

## Lage
Direkt gegenüber liegt die Eisriesenwelt – beide lassen sich gut zu einem vollen Ausflugstag verbinden.

## Praktische Infos
- Anfahrt: Von Salzburg ca. 45 Minuten
- Schrägaufzug oder Fußweg hinauf
- Flugvorführungszeiten vorab prüfen
    `,
    affiliateLinks: [
      { label: 'Unterkünfte bei Werfen – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Werfen' },
      { label: 'Salzburg: Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Werfen' },
    ],
  },
  {
    slug: 'grossarltal-tal-der-almen',
    title: 'Großarltal – das „Tal der Almen"',
    excerpt: 'Mit über 40 bewirtschafteten Almen hat das Großarltal die höchste Almendichte der Alpen. Ein Paradies für Wanderer, die urige Einkehr und sanfte Berge lieben.',
    date: '2026-06-15', category: 'Wandern', region: 'salzburg', difficulty: 'mittel', bestSeason: 'Juni–Oktober',
    highlights: ['Höchste Almendichte der Alpen', 'Über 40 bewirtschaftete Almen', 'Familienfreundliche Touren'],
    content: `
Das Großarltal im Salzburger Pongau trägt seinen Beinamen „Tal der Almen" zu Recht – nirgends gibt es so viele bewirtschaftete Almen auf engem Raum.

## Wandern & Einkehr
Von der gemütlichen Almwanderung bis zur Gipfeltour ist alles dabei – und überall lockt eine Alm mit hausgemachter Jause, Buttermilch und Kaiserschmarrn.

## Für Familien
Viele Wege sind kinderwagentauglich oder kurz, mit Tieren zum Streicheln auf den Almen.

## Praktische Infos
- Anfahrt: über St. Johann im Pongau ins Großarltal
- Bergbahn Großarl erleichtert den Einstieg
- Almsaison ca. Juni bis September
    `,
    affiliateLinks: [
      { label: 'Hotels im Großarltal – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Gro%C3%9Farl' },
      { label: 'Wanderschuhe – Amazon', url: 'https://www.amazon.de/s?k=wanderschuhe+damen' },
    ],
  },
  {
    slug: 'untersberg-salzburg',
    title: 'Untersberg – Salzburgs sagenumwobener Hausberg',
    excerpt: 'Mit der Seilbahn schwebt man von der Stadt auf 1.776 m: Der Untersberg bietet Panoramablick über Salzburg, Wanderungen und jede Menge Sagen und Mythen.',
    date: '2026-06-15', category: 'Wandern', region: 'salzburg', difficulty: 'mittel', bestSeason: 'Mai–Oktober',
    highlights: ['Seilbahn von Salzburg aufs Hochplateau', 'Panorama über Stadt & Alpen', 'Sagenumwobener Berg'],
    content: `
Der Untersberg an der Grenze zu Bayern ist Salzburgs markanter Hausberg – ein wuchtiges Kalkmassiv, um das sich zahlreiche Sagen ranken (Kaiser Karl soll im Berg schlafen).

## Hinauf
Die Untersbergbahn bringt dich in wenigen Minuten von St. Leonhard auf 1.776 m. Oben: Aussichtsplattform, Gipfelkreuz-Wanderungen und Blick über Salzburg.

## Wandern
Vom kurzen Gipfelweg bis zu längeren Plateau-Touren – festes Schuhwerk und Wetterfestigkeit vorausgesetzt.

## Praktische Infos
- Anfahrt: Von Salzburg ca. 20 Minuten zur Talstation
- Oben deutlich kühler – warme Schicht mitnehmen
- Bei guter Fernsicht besonders lohnend
    `,
    affiliateLinks: [
      { label: 'Hotels bei Salzburg – booking.com', url: 'https://www.booking.com/city/at/salzburg.de.html' },
      { label: 'Wanderausrüstung – Amazon', url: 'https://www.amazon.de/s?k=wanderrucksack+20l' },
    ],
  },
  {
    slug: 'kitzsteinhorn-kaprun',
    title: 'Kitzsteinhorn Kaprun – Salzburgs Gletscher am „Top of Salzburg"',
    excerpt: 'Schnee das ganze Jahr, die Aussichtsplattform „Top of Salzburg" auf 3.029 m und eine Gletscher-Erlebniswelt: Das Kitzsteinhorn über Kaprun ist Hochgebirge zum Anfassen.',
    date: '2026-06-15', category: 'Ausflug', region: 'salzburg', bestSeason: 'Ganzjährig',
    highlights: ['Ganzjähriger Gletscher über Kaprun', 'Plattform "Top of Salzburg" (3.029 m)', 'Gletscher-Erlebniswelt & Stollen'],
    content: `
Das Kitzsteinhorn über Kaprun ist Salzburgs einziges Gletscherskigebiet – und ein beeindruckendes Hochgebirgserlebnis, das man bequem per Bahn erreicht.

## Top of Salzburg
Die Aussichtsplattform und der Aussichtsstollen auf rund 3.000 m bieten einen Rundblick über die Hohen Tauern und den Großglockner.

## Ganzjährig
Skifahren bis in den Frühsommer, dazu eine Gletscher-Erlebniswelt mit Infos über Eis und Permafrost.

## Praktische Infos
- Anfahrt: über Zell am See nach Kaprun
- Warme Kleidung – auch im Sommer Gletschertemperaturen
- Kombi mit Zeller See & Tauern Spa möglich
    `,
    affiliateLinks: [
      { label: 'Hotels in Kaprun – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Kaprun' },
      { label: 'Zell am See–Kaprun: Tickets – GetYourGuide', url: 'https://www.getyourguide.de/s/?q=Kaprun' },
    ],
  },
  {
    slug: 'liechtensteinklamm',
    title: 'Liechtensteinklamm – tief, eng und spektakulär',
    excerpt: 'Eine der längsten und tiefsten Schluchten der Alpen: Über neue Stege und Brücken führt der Weg durch die tosende Liechtensteinklamm bei St. Johann im Pongau.',
    date: '2026-06-15', category: 'Ausflug', region: 'salzburg', bestSeason: 'Mai–Oktober',
    highlights: ['Eine der tiefsten Klammen der Alpen', 'Neue Stege & spektakuläre Wendeltreppe', 'Tosendes Wasser & Wasserfall'],
    content: `
Die Liechtensteinklamm bei St. Johann im Pongau ist eine der eindrucksvollsten Schluchten der Alpen – stellenweise nur wenige Meter breit und über 300 m tief.

## Der Klammweg
Moderne Stege, Brücken und eine spektakuläre Wendeltreppe führen entlang der tosenden Salzach-Ache bis zum Wasserfall am Ende. Hin und zurück ca. 1–1,5 Stunden.

## Wichtig
Festes, rutschfestes Schuhwerk und Regenschutz – in der Klamm ist es feucht und kühl.

## Praktische Infos
- Eintritt/Parkgebühr vor Ort
- Anfahrt: Von Salzburg ca. 50 Minuten
- Bei Starkregen kann die Klamm gesperrt sein
    `,
    affiliateLinks: [
      { label: 'Unterkünfte bei St. Johann/Pongau – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=St.+Johann+im+Pongau' },
      { label: 'Regenjacke – Amazon', url: 'https://www.amazon.de/s?k=regenjacke+wandern' },
    ],
  },
  {
    slug: 'filzmoos-bischofsmuetze',
    title: 'Filzmoos & Bischofsmütze – Bilderbuch-Wandern im Pongau',
    excerpt: 'Das beschauliche Filzmoos vor der markanten Bischofsmütze ist ein Geheimtipp für Genusswanderer und Familien – sanfte Almen, gute Luft und alpine Ruhe.',
    date: '2026-06-15', category: 'Wandern', region: 'salzburg', difficulty: 'leicht', bestSeason: 'Juni–Oktober',
    highlights: ['Markante Bischofsmütze als Kulisse', 'Sanfte Almwanderungen', 'Ruhig & familienfreundlich'],
    content: `
Filzmoos im Salzburger Pongau liegt idyllisch zu Füßen der Gosaukamm-Berge mit der markanten **Bischofsmütze**. Ein ruhiger Ort für Genusswanderer.

## Wandern
Sanfte Almwege, der Almerlebnisbus und gemütliche Hütten machen das Wandern familienfreundlich. Für Geübte locken Touren Richtung Hofpürglhütte und Gosaukamm.

## Charakter
Filzmoos ist bewusst ruhig geblieben – kein Massentourismus, dafür Bergidylle, gute Luft und Sternenhimmel.

## Praktische Infos
- Anfahrt: Von Salzburg ca. 1 Stunde
- Sommercard mit Bergbahn & Bus
- Im Winter familienfreundliches Skigebiet
    `,
    affiliateLinks: [
      { label: 'Hotels in Filzmoos – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Filzmoos' },
      { label: 'Wanderstöcke – Amazon', url: 'https://www.amazon.de/s?k=wanderst%C3%B6cke+teleskop' },
    ],
  },
  {
    slug: 'pyramidenkogel-woerthersee',
    title: 'Pyramidenkogel – der Aussichtsturm über dem Wörthersee',
    excerpt: 'Vom höchsten Holz-Aussichtsturm der Welt reicht der Blick über den Wörthersee bis zu den Karawanken – und runter geht es wahlweise mit Österreichs höchster Turmrutsche.',
    date: '2026-06-17', category: 'Ausflug', region: 'kaernten', bestSeason: 'April–Oktober',
    highlights: ['100 m hoher Holzturm mit Panorama-Lift', 'Rundumblick über den Wörthersee', 'Indoor-Rutsche als Highlight für Kinder'],
    content: `
Hoch über dem Keutschacher Seental thront der **Pyramidenkogel** – mit rund 100 Metern der höchste Holz-Aussichtsturm der Welt. Bei klarer Sicht reicht der Blick vom Wörthersee über die Karawanken bis zu den Hohen Tauern.

## Was dich oben erwartet
Drei Aussichtsplattformen, erreichbar per Lift oder über die Treppe. Von ganz oben siehst du fast ganz Mittelkärnten – ideal zum Sonnenuntergang, wenn sich der See orange färbt.

## Für Familien
Das Highlight für Kinder (und Mutige): die **52 m lange Indoor-Rutsche**, eine der höchsten Turmrutschen Europas. In wenigen Sekunden geht es spiralförmig nach unten.

## Praktische Infos
- Anfahrt: ca. 20 Minuten von Klagenfurt
- Großer Parkplatz vorhanden
- Abends teils länger geöffnet (Sonnenuntergangs-Tickets)
- Gut kombinierbar mit einer Runde um den Keutschacher See
    `,
    affiliateLinks: [
      { label: 'Unterkünfte am Wörthersee – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=W%C3%B6rthersee' },
    ],
  },
  {
    slug: 'minimundus-klagenfurt',
    title: 'Minimundus in Klagenfurt – die kleine Welt am Wörthersee',
    excerpt: 'Eiffelturm, Taj Mahal und Petersdom auf einem Spaziergang: Der Miniaturpark Minimundus zeigt über 150 Bauwerke aus aller Welt im Maßstab 1:25 – ein Klassiker für Familien.',
    date: '2026-06-17', category: 'Ausflug', region: 'kaernten', bestSeason: 'April–Oktober',
    highlights: ['Über 150 Modelle berühmter Bauwerke', 'Maßstab 1:25, liebevoll detailliert', 'Ideal für Familien & als Schlechtwetter-Alternative'],
    content: `
Am Rande von Klagenfurt, nahe dem Wörthersee, liegt **Minimundus** – „die kleine Welt am Wörthersee". Auf rund 26.000 m² stehen über 150 originalgetreue Modelle berühmter Bauwerke im Maßstab 1:25.

## Was es zu sehen gibt
Vom Eiffelturm über den Petersdom und das Taj Mahal bis zur Freiheitsstatue – eine Weltreise zu Fuß in ein bis zwei Stunden. Viele Modelle bestehen aus Originalmaterialien.

## Für Familien
Modelleisenbahnen, Schiffe und Flugzeuge in Bewegung begeistern Kinder. Es gibt einen Spielplatz und genug Platz zum Toben.

## Praktische Infos
- Zentral in Klagenfurt, nahe Strandbad & Europapark
- Tickets oft günstiger mit der Kärnten Card
- Gut kombinierbar mit dem benachbarten Reptilienzoo
    `,
    affiliateLinks: [
      { label: 'Hotels in Klagenfurt – booking.com', url: 'https://www.booking.com/city/at/klagenfurt.de.html' },
    ],
  },
  {
    slug: 'gaisberg-salzburg-aussicht',
    title: 'Gaisberg – Salzburgs Hausberg mit Rundblick',
    excerpt: 'Der Gaisberg ist der Aussichtsbalkon der Stadt Salzburg: oben Rundblick über die Altstadt, das Alpenvorland und die Salzkammergut-Seen – zu Fuß oder bequem mit dem Bus.',
    date: '2026-06-16', category: 'Wandern', region: 'salzburg', difficulty: 'mittel', bestSeason: 'Mai–Oktober',
    highlights: ['Rundblick über Salzburg & Salzkammergut', 'Per Wanderung oder Bus erreichbar', 'Beliebter Startplatz für Paragleiter'],
    content: `
Der **Gaisberg** (1.287 m) ist der Hausberg der Stadt Salzburg – ein bewaldeter Rücken im Osten, von dem aus du die Altstadt, das Alpenvorland und bei klarer Sicht die Seen des Salzkammerguts überblickst.

## Hinauf
Mehrere Wanderwege führen vom Stadtrand in 2–3 Stunden hinauf. Wer es bequem mag, nimmt den **Gaisberg-Bus** bis zum Gipfelplateau und spaziert oben nur die Rundwege.

## Oben
Ein leichter Gipfelrundweg, Almwiesen und meist mehrere Paragleiter, die hier starten. Bei Föhn ist die Fernsicht spektakulär.

## Praktische Infos
- Vom Gipfel kurze Spazierwege für alle Niveaus
- Gasthaus am Plateau
- Festes Schuhwerk; oben oft kühler & windiger als in der Stadt
    `,
    affiliateLinks: [
      { label: 'Hotels in Salzburg – booking.com', url: 'https://www.booking.com/city/at/salzburg.de.html' },
      { label: 'Wanderschuhe – Amazon', url: 'https://www.amazon.de/s?k=wanderschuhe' },
    ],
  },
  {
    slug: 'stubaier-gletscher',
    title: 'Stubaier Gletscher – Schnee und Bergpanorama auch im Sommer',
    excerpt: 'Tirols größtes Gletscherskigebiet im Stubaital bietet Pisten bis in den Frühsommer und mit der Aussichtsplattform „Top of Tyrol" einen Logenblick auf über 3.200 m.',
    date: '2026-06-16', category: 'Ausflug', region: 'tirol', bestSeason: 'Ganzjährig',
    highlights: ['Tirols größtes Gletscherskigebiet', 'Aussichtsplattform „Top of Tyrol" (3.210 m)', 'Schnee bis in den Frühsommer'],
    content: `
Am Talschluss des **Stubaitals**, rund 45 Minuten von Innsbruck, liegt Tirols größtes Gletscherskigebiet. Dank der Höhe liegt hier oft bis in den Frühsommer Schnee.

## Im Sommer
Auch ohne Ski lohnt die Auffahrt: Die Aussichtsplattform **„Top of Tyrol"** auf 3.210 m schwebt förmlich über dem Gletscher, ringsum ein Meer aus Dreitausendern. Ein kurzer Steig führt vom Bergrestaurant hin.

## Gut zu wissen
Oben ist es auch im Sommer kalt – warme Jacke, Sonnenbrille und Sonnencreme (Gletscherstrahlung!) sind Pflicht. Feste Schuhe für die Plattform-Wege.

## Praktische Infos
- Mehrstufige Gondelauffahrt ab Mutterbergalm
- Wetter vorab prüfen – bei Nebel lohnt es kaum
- Familienfreundlich, vieles auch ohne Wanderung erlebbar
    `,
    affiliateLinks: [
      { label: 'Unterkünfte im Stubaital – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Stubaital' },
    ],
  },
  {
    slug: 'schloss-eggenberg-graz',
    title: 'Schloss Eggenberg in Graz – Barockpracht und Pfauengarten',
    excerpt: 'Das prunkvolle Schloss Eggenberg am Rand von Graz ist UNESCO-Welterbe: 365 Fenster, der prachtvolle Planetensaal und ein weitläufiger Park, in dem Pfauen frei umherstolzieren.',
    date: '2026-06-16', category: 'Ausflug', region: 'steiermark', bestSeason: 'Park ganzjährig · Prunkräume April–Oktober',
    highlights: ['UNESCO-Welterbe in Graz', 'Planetensaal & Prunkräume', 'Großer Park mit freilaufenden Pfauen'],
    content: `
Am westlichen Stadtrand von Graz liegt **Schloss Eggenberg**, die prächtigste Barockanlage der Steiermark und Teil des UNESCO-Welterbes.

## Symbolik in Stein
Die Anlage ist als Abbild des Kosmos angelegt: **365 Außenfenster** für die Tage des Jahres und im Mittelpunkt der prunkvolle **Planetensaal** mit seinen Deckengemälden.

## Der Park
Rund um das Schloss erstreckt sich ein weitläufiger Landschaftspark – beliebt für Spaziergänge und berühmt für die **Pfauen**, die hier frei umherlaufen.

## Praktische Infos
- Mit der Straßenbahn aus der Grazer Innenstadt erreichbar
- Prunkräume nur mit Führung, Park frei zugänglich
- Gut kombinierbar mit Alter Galerie & Münzkabinett vor Ort
    `,
    affiliateLinks: [
      { label: 'Hotels in Graz – booking.com', url: 'https://www.booking.com/city/at/graz.de.html' },
    ],
  },
  {
    slug: 'therme-lutzmannsburg',
    title: 'Sonnentherme Lutzmannsburg – Familientherme im Burgenland',
    excerpt: 'Die Sonnentherme Lutzmannsburg im südlichen Burgenland gilt als eine der besten Familien- und Babythermen Europas – mit langen Rutschen, eigener Babywelt und pannonischem Sonnenklima.',
    date: '2026-06-16', category: 'Unterkunft', region: 'burgenland', bestSeason: 'Ganzjährig',
    highlights: ['Eine der führenden Familienthermen Europas', 'Eigene Baby- & Kleinkindwelt', 'Lange Rutschen für ältere Kinder'],
    content: `
Im südlichen Burgenland, nahe der ungarischen Grenze, liegt die **Sonnentherme Lutzmannsburg** – bekannt als eine der familienfreundlichsten Thermen Europas.

## Für die Kleinsten
Die eigene **Babywelt** mit warmem Wasser, flachen Becken und Wickelbereichen macht die Therme zum Klassiker für Familien mit Babys und Kleinkindern.

## Für größere Kinder
Mehrere lange Rutschen sorgen bei älteren Kindern für Action, während Erwachsene Ruhezonen und Saunen finden.

## Übernachten
Rund um die Therme gibt es Hotels und Apartments, viele mit Thermeneintritt im Paket – ideal für einen Wochenend- oder Wellnessaufenthalt.

## Praktische Infos
- Lage: Südburgenland, ca. 1,5 Std. von Wien
- Verlässlich warmes, pannonisches Klima
- Tickets in der Hauptsaison vorab sichern
    `,
    affiliateLinks: [
      { label: 'Hotels in Lutzmannsburg – booking.com', url: 'https://www.booking.com/searchresults.de.html?ss=Lutzmannsburg' },
    ],
  },

];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
