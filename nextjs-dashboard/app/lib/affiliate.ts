// ─────────────────────────────────────────────────────────────────────────────
// Zentrales Affiliate-System
//
// Alle ausgehenden Partnerlinks laufen über unsere eigene Domain (/go?u=…).
// Vorteile:
//   • Wir hängen automatisch unsere Partner-Tags an (Provision!)
//   • Klicks lassen sich an einer Stelle tracken
//   • Ziel-URLs können zentral getauscht werden, ohne 33 Blogposts zu ändern
//   • Link-Cloaking: Besucher sehen "unsere-domain.at/go/…" statt fremde Tracking-URLs
// ─────────────────────────────────────────────────────────────────────────────

// ⚠️ Hier eure echten Partner-IDs eintragen, sobald vorhanden:
export const PARTNER_IDS = {
  amazonTag: 'nischeratschl-21',     // Amazon PartnerNet Tag
  bookingAid: '0000000',             // booking.com Affiliate ID (aid) – noch eintragen
  gygPartnerId: 'CTZDZJB',           // GetYourGuide Partner-ID
};

// Domains, auf die wir weiterleiten dürfen (verhindert Open-Redirect-Missbrauch)
export const ALLOWED_HOSTS = [
  'booking.com',
  'www.booking.com',
  'amazon.de',
  'www.amazon.de',
  'getyourguide.de',
  'www.getyourguide.de',
];

/**
 * Wandelt eine externe Partner-URL in unseren eigenen Cloaking-Link um.
 * Aus  https://www.booking.com/...   wird  /go?u=https%3A%2F%2F...
 */
export function cloak(url: string): string {
  return `/go?u=${encodeURIComponent(url)}`;
}

/**
 * Hängt – serverseitig im Redirect verwendet – unsere Partner-Tags an die Ziel-URL.
 */
export function appendPartnerTag(target: URL): URL {
  const host = target.hostname.replace(/^www\./, '');

  if (host === 'amazon.de' && !target.searchParams.has('tag')) {
    target.searchParams.set('tag', PARTNER_IDS.amazonTag);
  }
  if (host === 'booking.com' && !target.searchParams.has('aid')) {
    target.searchParams.set('aid', PARTNER_IDS.bookingAid);
  }
  if (host === 'getyourguide.de' && !target.searchParams.has('partner_id')) {
    target.searchParams.set('partner_id', PARTNER_IDS.gygPartnerId);
  }
  return target;
}

// Benannte Affiliate-Ziele für Karte, Banner & wiederkehrende CTAs ──────────────
type NamedLink = { label: string; url: string };

export const NAMED_LINKS: Record<string, NamedLink> = {
  'hotels-kaernten':    { label: 'Hotels in Kärnten',        url: 'https://www.booking.com/region/at/carinthia.de.html' },
  'hotels-woerthersee': { label: 'Hotels am Wörthersee',     url: 'https://www.booking.com/region/at/worthersee.de.html' },
  'fewo-kaernten':      { label: 'Ferienwohnungen Kärnten',  url: 'https://www.booking.com/searchresults.de.html?ss=K%C3%A4rnten&nflt=ht_id%3D220' },
  'camping-kaernten':   { label: 'Campingplätze Kärnten',    url: 'https://www.booking.com/searchresults.de.html?ss=K%C3%A4rnten&nflt=ht_id%3D9' },
};

export function namedCloak(id: keyof typeof NAMED_LINKS): string {
  return cloak(NAMED_LINKS[id].url);
}

// Buchbare Ausflüge / Aktivitäten / Tickets (GetYourGuide) ─────────────────────
// Werden in einer "Erlebnisse & Tickets"-Box auf Ausflug-/Wander-Artikeln gezeigt.
// Pro Region eigene Vorschläge – leicht um weitere Regionen/Länder (DE, CH) erweiterbar.
export type Excursion = { label: string; note: string; url: string };

const gyg = (q: string) => `https://www.getyourguide.de/s/?q=${encodeURIComponent(q)}`;

export const EXCURSIONS_BY_REGION: Record<string, Excursion[]> = {
  kaernten: [
    { label: 'Aktivitäten in ganz Kärnten', note: 'Touren, Tickets & Erlebnisse', url: gyg('Kärnten') },
    { label: 'Klagenfurt & Wörthersee',     note: 'Stadtführungen, Schifffahrt, Minimundus', url: gyg('Klagenfurt am Wörthersee') },
    { label: 'Großglockner & Hochalpenstraße', note: 'Geführte Touren & Tagesausflüge', url: gyg('Großglockner') },
    { label: 'Villach & Faaker See',         note: 'Erlebnisse rund um Villach', url: gyg('Villach') },
  ],
  steiermark: [
    { label: 'Aktivitäten in der Steiermark', note: 'Touren, Tickets & Erlebnisse', url: gyg('Steiermark') },
    { label: 'Graz',                          note: 'Stadtführungen & Tickets', url: gyg('Graz') },
    { label: 'Dachstein & Schladming',        note: 'Bergbahnen, Gletscher & Touren', url: gyg('Dachstein') },
    { label: 'Südsteiermark & Wein',          note: 'Weinerlebnisse & Verkostungen', url: gyg('Südsteiermark') },
  ],
  burgenland: [
    { label: 'Aktivitäten im Burgenland', note: 'Touren, Tickets & Erlebnisse', url: gyg('Burgenland') },
    { label: 'Neusiedler See',            note: 'Wassersport, Bootstouren & mehr', url: gyg('Neusiedler See') },
    { label: 'Eisenstadt',                note: 'Schloss Esterházy & Stadtführungen', url: gyg('Eisenstadt') },
    { label: 'Burgenland Wein',           note: 'Weinverkostungen & Genusstouren', url: gyg('Burgenland Wein') },
  ],
};

/** Liefert region-spezifische Ausflugslinks (Fallback: Kärnten). */
export function excursionsFor(region: string): Excursion[] {
  return EXCURSIONS_BY_REGION[region] ?? EXCURSIONS_BY_REGION.kaernten;
}

// Rückwärtskompatibel
export const EXCURSIONS = EXCURSIONS_BY_REGION.kaernten;
