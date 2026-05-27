export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: 'Wandern' | 'Baden' | 'Unterkunft' | 'Ausflug';
  affiliateLinks?: { label: string; url: string }[];
};

export const posts: Post[] = [
  {
    slug: 'die-10-besten-wanderwege-am-woerthersee',
    title: 'Die 10 besten Wanderwege am Wörthersee',
    excerpt: 'Von gemütlichen Seepromenaden bis zu anspruchsvollen Gipfeltouren – die schönsten Wanderwege rund um den Wörthersee.',
    date: '2026-05-20',
    category: 'Wandern',
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
  },
  {
    slug: 'beste-badestellen-woerthersee',
    title: 'Die schönsten Badestellen am Wörthersee',
    excerpt: 'Wo badet man am besten? Ein Überblick über die top Badestellen – kostenlos und mit Eintritt.',
    date: '2026-05-15',
    category: 'Baden',
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
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
