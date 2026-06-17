/**
 * Zentrale SEO-Utilities für den Bergseen Guide.
 *
 * Suchintentionen, die wir abdecken wollen:
 *  — "Wandern Kärnten" / "Wanderwege Wörthersee"
 *  — "Baden Kärnten" / "wärmster See Österreich"
 *  — "Urlaub Wörthersee" / "Hotel Wörthersee"
 *  — "Ausflug Kärnten" / "Kärnten Sehenswürdigkeiten"
 */

export const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bergseen-guide.com';
export const SITE_NAME = 'Bergseen Guide';

// Geo-Schwerpunkt: Österreich (für globales Local SEO). Fokus DACH (AT zuerst, DE/CH folgen).
export const AUSTRIA_GEO = { lat: 47.6, lng: 14.1 };
// Geo-Koordinaten Kärntens (für Kärnten-spezifisches Schema)
export const KAERNTEN_GEO = { lat: 46.83, lng: 13.83 };

// Gemeinsame Keywords für alle Seiten (Österreich-weit)
export const BASE_KEYWORDS = [
  'Urlaub Österreich', 'Wandern Österreich', 'Baden Österreich',
  'Bergseen Österreich', 'Badeseen Österreich', 'Ausflugsziele Österreich',
  'Seen Österreich', 'Wanderwege Österreich',
];

// Pro Region: Anzeigename, Geo-Koordinaten & SEO-Keywords.
// Beim Ausbau auf Deutschland/Schweiz hier einfach weitere Einträge ergänzen.
export const REGION_META: Record<
  string,
  { name: string; geo: { lat: number; lng: number }; keywords: string[] }
> = {
  kaernten:   { name: 'Kärnten',    geo: { lat: 46.83, lng: 13.83 }, keywords: ['Kärnten', 'Wörthersee', 'Millstätter See', 'Klopeiner See', 'Wandern Kärnten', 'Baden Kärnten'] },
  salzburg:   { name: 'Salzburg',   geo: { lat: 47.30, lng: 13.20 }, keywords: ['Salzburg', 'Salzburger Land', 'Zeller See', 'Krimmler Wasserfälle', 'Wandern Salzburg'] },
  tirol:      { name: 'Tirol',      geo: { lat: 47.25, lng: 11.40 }, keywords: ['Tirol', 'Achensee', 'Innsbruck', 'Ötztal', 'Wandern Tirol'] },
  steiermark: { name: 'Steiermark', geo: { lat: 47.36, lng: 15.09 }, keywords: ['Steiermark', 'Grüner See', 'Dachstein', 'Graz', 'Wandern Steiermark'] },
  burgenland: { name: 'Burgenland', geo: { lat: 47.75, lng: 16.55 }, keywords: ['Burgenland', 'Neusiedler See', 'Rust', 'pannonisch', 'Urlaub Burgenland'] },
  wien:              { name: 'Wien',              geo: { lat: 48.21, lng: 16.37 }, keywords: ['Wien', 'Schönbrunn', 'Prater', 'Alte Donau', 'Wienerwald', 'Urlaub Wien'] },
  oberoesterreich:   { name: 'Oberösterreich',    geo: { lat: 47.95, lng: 13.80 }, keywords: ['Oberösterreich', 'Salzkammergut', 'Hallstatt', 'Traunsee', 'Attersee', 'Linz'] },
  niederoesterreich: { name: 'Niederösterreich',  geo: { lat: 48.20, lng: 15.62 }, keywords: ['Niederösterreich', 'Wachau', 'Stift Melk', 'Schneeberg', 'Rax', 'Wein Niederösterreich'] },
  vorarlberg:        { name: 'Vorarlberg',        geo: { lat: 47.25, lng: 9.92 },  keywords: ['Vorarlberg', 'Bodensee', 'Bregenz', 'Bregenzerwald', 'Lünersee', 'Montafon'] },
};

/** Anzeigename einer Region (Fallback: Slug kapitalisiert). */
export function regionName(slug: string): string {
  return REGION_META[slug]?.name ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

// Kategorie-spezifische Keywords
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Wandern:   ['Wandern Kärnten', 'Wanderwege', 'Hiking Kärnten', 'Bergwanderung', 'Wandertipps'],
  Baden:     ['Badesee Kärnten', 'Baden Österreich', 'wärmster See Österreich', 'Strandbad Kärnten'],
  Unterkunft:['Hotel Wörthersee', 'Unterkunft Kärnten', 'Ferienwohnung Kärnten', 'Camping Kärnten'],
  Ausflug:   ['Ausflug Kärnten', 'Sehenswürdigkeiten Kärnten', 'Tipps Kärnten', 'Ausflugsziele Österreich'],
};

// Offizielle Tourismus-Portale pro Region (stabile Quellen für die "Offizielle Infos"-Box)
export const OFFICIAL_REGION_SITES: Record<string, { label: string; url: string }> = {
  kaernten:    { label: 'Kärnten Tourismus (kaernten.at)',          url: 'https://www.kaernten.at' },
  salzburg:    { label: 'SalzburgerLand Tourismus (salzburgerland.com)', url: 'https://www.salzburgerland.com' },
  tirol:       { label: 'Tirol Werbung (tirol.at)',                  url: 'https://www.tirol.at' },
  steiermark:  { label: 'Steiermark Tourismus (steiermark.com)',     url: 'https://www.steiermark.com' },
  burgenland:  { label: 'Burgenland Tourismus (burgenland.info)',    url: 'https://www.burgenland.info' },
};

/** Organisation JSON-LD – erscheint auf allen Seiten */
export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE,
    description: 'Unabhängiger Reiseführer für Österreich: Wanderungen, Bergseen, Badeseen und Ausflüge in Kärnten, Salzburg, Tirol, der Steiermark und im Burgenland.',
    areaServed: { '@type': 'Country', name: 'Österreich' },
  };
}

/** WebSite JSON-LD mit Suchbox (Sitelinks Searchbox) */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE,
    inLanguage: 'de-AT',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** TouristDestination JSON-LD – region-aware (für jede aktive Region). */
export function touristDestinationSchema(opts: {
  name: string;
  description: string;
  url: string;
  geo: { lat: number; lng: number };
  attractions: { name: string; description: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: opts.geo.lat,
      longitude: opts.geo.lng,
    },
    touristType: ['Wanderer', 'Badegäste', 'Familien', 'Naturliebhaber'],
    includesAttraction: opts.attractions.map((a) => ({
      '@type': 'TouristAttraction',
      name: a.name,
      description: a.description,
    })),
  };
}

/** Article JSON-LD für Blog-Posts */
export function articleSchema(opts: {
  title: string; excerpt: string; date: string;
  slug: string; category: string; region: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.excerpt,
    // Auto-generiertes OG-Bild (1200×630) – erfüllt Googles Article-Image-Empfehlung
    image: [`${BASE}/blog/${opts.slug}/opengraph-image`],
    datePublished: opts.date,
    dateModified: opts.date,
    author:    { '@type': 'Organization', name: SITE_NAME, url: BASE },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE },
    mainEntityOfPage: `${BASE}/blog/${opts.slug}`,
    articleSection: opts.category,
    inLanguage: 'de-AT',
    about: {
      '@type': 'Place',
      name: regionName(opts.region),
      containedInPlace: { '@type': 'Country', name: 'Österreich' },
    },
  };
}

/** BreadcrumbList JSON-LD */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
