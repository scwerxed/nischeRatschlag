export type Unterkunft = {
  id: string;
  region: string;       // Bundesland-Slug (kaernten, salzburg, …)
  name: string;
  ort: string;
  see: string;
  typ: 'Hotel' | 'Ferienwohnung' | 'Camping' | 'Glamping';
  abPreis: number;
  lat: number;
  lng: number;
  bookingUrl: string;
};

export const unterkuenfte: Unterkunft[] = [
  // ── Kärnten ────────────────────────────────────────────────────────────────
  { id: 'velden-hotel',           region: 'kaernten', name: 'Hotels in Velden',              ort: 'Velden',          see: 'Wörthersee',     typ: 'Hotel',         abPreis: 120, lat: 46.6147, lng: 14.0411, bookingUrl: 'https://www.booking.com/city/at/velden-am-worthersee.de.html' },
  { id: 'poertschach-hotel',      region: 'kaernten', name: 'Hotels in Pörtschach',          ort: 'Pörtschach',      see: 'Wörthersee',     typ: 'Hotel',         abPreis: 95,  lat: 46.6328, lng: 14.1497, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=P%C3%B6rtschach' },
  { id: 'klagenfurt-fewo',        region: 'kaernten', name: 'Ferienwohnungen Klagenfurt',    ort: 'Klagenfurt',      see: 'Wörthersee',     typ: 'Ferienwohnung', abPreis: 65,  lat: 46.6247, lng: 14.3050, bookingUrl: 'https://www.booking.com/city/at/klagenfurt.de.html' },
  { id: 'millstatt-hotel',        region: 'kaernten', name: 'Hotels am Millstätter See',     ort: 'Millstatt',       see: 'Millstätter See',typ: 'Hotel',         abPreis: 89,  lat: 46.8044, lng: 13.5783, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Millstatt+am+See' },
  { id: 'weissensee-fewo',        region: 'kaernten', name: 'Unterkünfte am Weissensee',     ort: 'Techendorf',      see: 'Weissensee',     typ: 'Ferienwohnung', abPreis: 70,  lat: 46.7164, lng: 13.3017, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Weissensee+K%C3%A4rnten' },
  { id: 'faak-camping',           region: 'kaernten', name: 'Camping am Faaker See',         ort: 'Faak am See',     see: 'Faaker See',     typ: 'Camping',       abPreis: 28,  lat: 46.5736, lng: 13.9214, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Faaker+See' },
  { id: 'ossiach-camping',        region: 'kaernten', name: 'Camping am Ossiacher See',      ort: 'Ossiach',         see: 'Ossiacher See',  typ: 'Camping',       abPreis: 25,  lat: 46.6747, lng: 13.9839, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Ossiacher+See' },
  { id: 'klopein-fewo',           region: 'kaernten', name: 'Unterkünfte am Klopeiner See',  ort: 'St. Kanzian',     see: 'Klopeiner See',  typ: 'Ferienwohnung', abPreis: 60,  lat: 46.6228, lng: 14.5697, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Klopeiner+See' },
  { id: 'bad-kleinkirchheim-hotel',region: 'kaernten', name: 'Hotels in Bad Kleinkirchheim', ort: 'Bad Kleinkirchheim',see:'Nockberge',     typ: 'Hotel',         abPreis: 110, lat: 46.8125, lng: 13.7944, bookingUrl: 'https://www.booking.com/city/at/bad-kleinkirchheim.de.html' },
  { id: 'heiligenblut-hotel',     region: 'kaernten', name: 'Hotels in Heiligenblut',        ort: 'Heiligenblut',    see: 'Großglockner',   typ: 'Hotel',         abPreis: 85,  lat: 47.0394, lng: 12.8447, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Heiligenblut' },

  // ── Salzburg ─────────────────────────────────────────────────────────────
  { id: 'zellamsee-hotel',        region: 'salzburg', name: 'Hotels in Zell am See',         ort: 'Zell am See',     see: 'Zeller See',     typ: 'Hotel',         abPreis: 110, lat: 47.3230, lng: 12.7960, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Zell+am+See' },
  { id: 'salzburg-stadt-hotel',   region: 'salzburg', name: 'Hotels in Salzburg Stadt',      ort: 'Salzburg',        see: 'Salzach',        typ: 'Hotel',         abPreis: 120, lat: 47.8009, lng: 13.0430, bookingUrl: 'https://www.booking.com/city/at/salzburg.de.html' },
  { id: 'wolfgangsee-fewo',       region: 'salzburg', name: 'Unterkünfte am Wolfgangsee',    ort: 'St. Gilgen',      see: 'Wolfgangsee',    typ: 'Ferienwohnung', abPreis: 75,  lat: 47.7680, lng: 13.3710, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Wolfgangsee' },

  // ── Tirol ────────────────────────────────────────────────────────────────
  { id: 'innsbruck-hotel',        region: 'tirol',    name: 'Hotels in Innsbruck',           ort: 'Innsbruck',       see: 'Inn',            typ: 'Hotel',         abPreis: 100, lat: 47.2654, lng: 11.3927, bookingUrl: 'https://www.booking.com/city/at/innsbruck.de.html' },
  { id: 'achensee-hotel',         region: 'tirol',    name: 'Hotels am Achensee',            ort: 'Pertisau',        see: 'Achensee',       typ: 'Hotel',         abPreis: 105, lat: 47.4400, lng: 11.7100, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Achensee' },
  { id: 'soelden-fewo',           region: 'tirol',    name: 'Unterkünfte in Sölden',         ort: 'Sölden',          see: 'Ötztal',         typ: 'Ferienwohnung', abPreis: 90,  lat: 46.9680, lng: 11.0070, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=S%C3%B6lden' },

  // ── Steiermark ─────────────────────────────────────────────────────────────
  { id: 'graz-hotel',             region: 'steiermark', name: 'Hotels in Graz',              ort: 'Graz',            see: 'Mur',            typ: 'Hotel',         abPreis: 90,  lat: 47.0707, lng: 15.4395, bookingUrl: 'https://www.booking.com/city/at/graz.de.html' },
  { id: 'schladming-hotel',       region: 'steiermark', name: 'Hotels in Schladming',        ort: 'Schladming',      see: 'Dachstein',      typ: 'Hotel',         abPreis: 105, lat: 47.3940, lng: 13.6870, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Schladming' },
  { id: 'suedsteiermark-fewo',    region: 'steiermark', name: 'Unterkünfte Südsteiermark',   ort: 'Leutschach',      see: 'Weinstraße',     typ: 'Ferienwohnung', abPreis: 80,  lat: 46.6820, lng: 15.4670, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=S%C3%BCdsteiermark' },

  // ── Burgenland ─────────────────────────────────────────────────────────────
  { id: 'neusiedl-hotel',         region: 'burgenland', name: 'Hotels am Neusiedler See',    ort: 'Neusiedl am See', see: 'Neusiedler See', typ: 'Hotel',         abPreis: 85,  lat: 47.9490, lng: 16.8420, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Neusiedler+See' },
  { id: 'rust-fewo',              region: 'burgenland', name: 'Unterkünfte in Rust',         ort: 'Rust',            see: 'Neusiedler See', typ: 'Ferienwohnung', abPreis: 75,  lat: 47.8000, lng: 16.6720, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Rust+Burgenland' },
  { id: 'lutzmannsburg-hotel',    region: 'burgenland', name: 'Hotels in Lutzmannsburg',     ort: 'Lutzmannsburg',   see: 'Therme',         typ: 'Hotel',         abPreis: 95,  lat: 47.4640, lng: 16.6360, bookingUrl: 'https://www.booking.com/searchresults.de.html?ss=Lutzmannsburg' },
];

// Farben & einbuchstabige Label für Karten-Pins (kein Emoji)
export const TYP_INFO: Record<Unterkunft['typ'], { color: string; short: string }> = {
  Hotel:         { color: '#2563eb', short: 'H' },
  Ferienwohnung: { color: '#7c3aed', short: 'F' },
  Camping:       { color: '#15803d', short: 'C' },
  Glamping:      { color: '#db2777', short: 'G' },
};
