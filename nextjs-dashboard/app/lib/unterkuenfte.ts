// Unterkünfte, die wir auf der Karte als Pins anzeigen.
// Der Link läuft über unser /go-Affiliate-System (booking.com Suche pro Ort).

export type Unterkunft = {
  id: string;
  name: string;
  ort: string;
  see: string;
  typ: 'Hotel' | 'Ferienwohnung' | 'Camping' | 'Glamping';
  abPreis: number;          // € pro Nacht ab
  lat: number;
  lng: number;
  bookingUrl: string;       // wird per cloak() umgewandelt
};

export const unterkuenfte: Unterkunft[] = [
  {
    id: 'velden-hotel',
    name: 'Hotels in Velden',
    ort: 'Velden',
    see: 'Wörthersee',
    typ: 'Hotel',
    abPreis: 120,
    lat: 46.6147,
    lng: 14.0411,
    bookingUrl: 'https://www.booking.com/city/at/velden-am-worthersee.de.html',
  },
  {
    id: 'poertschach-hotel',
    name: 'Hotels in Pörtschach',
    ort: 'Pörtschach',
    see: 'Wörthersee',
    typ: 'Hotel',
    abPreis: 95,
    lat: 46.6328,
    lng: 14.1497,
    bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=P%C3%B6rtschach',
  },
  {
    id: 'klagenfurt-fewo',
    name: 'Ferienwohnungen Klagenfurt',
    ort: 'Klagenfurt',
    see: 'Wörthersee',
    typ: 'Ferienwohnung',
    abPreis: 65,
    lat: 46.6247,
    lng: 14.3050,
    bookingUrl: 'https://www.booking.com/city/at/klagenfurt.de.html',
  },
  {
    id: 'millstatt-hotel',
    name: 'Hotels am Millstätter See',
    ort: 'Millstatt',
    see: 'Millstätter See',
    typ: 'Hotel',
    abPreis: 89,
    lat: 46.8044,
    lng: 13.5783,
    bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Millstatt+am+See',
  },
  {
    id: 'weissensee-fewo',
    name: 'Unterkünfte am Weissensee',
    ort: 'Techendorf',
    see: 'Weissensee',
    typ: 'Ferienwohnung',
    abPreis: 70,
    lat: 46.7164,
    lng: 13.3017,
    bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Weissensee+K%C3%A4rnten',
  },
  {
    id: 'faak-camping',
    name: 'Camping am Faaker See',
    ort: 'Faak am See',
    see: 'Faaker See',
    typ: 'Camping',
    abPreis: 28,
    lat: 46.5736,
    lng: 13.9214,
    bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Faaker+See',
  },
  {
    id: 'ossiach-camping',
    name: 'Camping am Ossiacher See',
    ort: 'Ossiach',
    see: 'Ossiacher See',
    typ: 'Camping',
    abPreis: 25,
    lat: 46.6747,
    lng: 13.9839,
    bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Ossiacher+See',
  },
  {
    id: 'klopein-fewo',
    name: 'Unterkünfte am Klopeiner See',
    ort: 'St. Kanzian',
    see: 'Klopeiner See',
    typ: 'Ferienwohnung',
    abPreis: 60,
    lat: 46.6228,
    lng: 14.5697,
    bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Klopeiner+See',
  },
  {
    id: 'bad-kleinkirchheim-hotel',
    name: 'Hotels in Bad Kleinkirchheim',
    ort: 'Bad Kleinkirchheim',
    see: 'Nockberge',
    typ: 'Hotel',
    abPreis: 110,
    lat: 46.8125,
    lng: 13.7944,
    bookingUrl: 'https://www.booking.com/city/at/bad-kleinkirchheim.de.html',
  },
  {
    id: 'heiligenblut-hotel',
    name: 'Hotels in Heiligenblut',
    ort: 'Heiligenblut',
    see: 'Großglockner',
    typ: 'Hotel',
    abPreis: 85,
    lat: 47.0394,
    lng: 12.8447,
    bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Heiligenblut',
  },
];

export const TYP_INFO: Record<Unterkunft['typ'], { color: string; emoji: string }> = {
  Hotel:          { color: '#2563eb', emoji: '🏨' },
  Ferienwohnung:  { color: '#7c3aed', emoji: '🏡' },
  Camping:        { color: '#16a34a', emoji: '⛺' },
  Glamping:       { color: '#db2777', emoji: '✨' },
};
