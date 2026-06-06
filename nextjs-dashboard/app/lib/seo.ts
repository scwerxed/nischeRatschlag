/**
 * Zentrale SEO-Utilities für den Wörthersee Guide.
 *
 * Suchintentionen, die wir abdecken wollen:
 *  — "Wandern Kärnten" / "Wanderwege Wörthersee"
 *  — "Baden Kärnten" / "wärmster See Österreich"
 *  — "Urlaub Wörthersee" / "Hotel Wörthersee"
 *  — "Ausflug Kärnten" / "Kärnten Sehenswürdigkeiten"
 */

export const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nische-ratschlag.vercel.app';
export const SITE_NAME = 'Wörthersee Guide';

// Geo-Koordinaten Kärntens (für Local SEO)
export const KAERNTEN_GEO = { lat: 46.83, lng: 13.83 };

// Gemeinsame Keywords für alle Seiten
export const BASE_KEYWORDS = [
  'Kärnten', 'Wörthersee', 'Wandern Kärnten', 'Baden Kärnten',
  'Urlaub Kärnten', 'Seen Kärnten', 'Ausflug Kärnten',
  'Kärntner Seen', 'Wanderwege Wörthersee',
];

// Kategorie-spezifische Keywords
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Wandern:   ['Wandern Kärnten', 'Wanderwege', 'Hiking Kärnten', 'Bergwanderung', 'Wandertipps'],
  Baden:     ['Badesee Kärnten', 'Baden Österreich', 'wärmster See Österreich', 'Strandbad Kärnten'],
  Unterkunft:['Hotel Wörthersee', 'Unterkunft Kärnten', 'Ferienwohnung Kärnten', 'Camping Kärnten'],
  Ausflug:   ['Ausflug Kärnten', 'Sehenswürdigkeiten Kärnten', 'Tipps Kärnten', 'Ausflugsziele Österreich'],
};

/** Organisation JSON-LD – erscheint auf allen Seiten */
export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE,
    description: 'Unabhängiger Reiseführer für Kärnten: Wanderungen, Badeseen und Ausflüge am Wörthersee.',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Kärnten',
      containedIn: { '@type': 'Country', name: 'Österreich' },
    },
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

/** TouristDestination JSON-LD für Kärnten-Seite */
export function touristDestinationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'Kärnten',
    description: 'Österreichs Seenland mit über 1.270 Seen, dem Wörthersee, Millstätter See und Gipfeln bis 3.798 m.',
    url: `${BASE}/regionen/kaernten`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: KAERNTEN_GEO.lat,
      longitude: KAERNTEN_GEO.lng,
    },
    touristType: ['Wanderer', 'Badegäste', 'Familien', 'Naturliebhaber'],
    includesAttraction: [
      { '@type': 'TouristAttraction', name: 'Wörthersee', description: 'Wärmstes Gewässer Kärntens, bis 28 °C' },
      { '@type': 'TouristAttraction', name: 'Großglockner', description: 'Österreichs höchster Berg, 3.798 m' },
      { '@type': 'TouristAttraction', name: 'Weissensee', description: 'Sauberster See Europas, Sichttiefe 8 m' },
      { '@type': 'TouristAttraction', name: 'Nockberge', description: 'UNESCO-Biosphärenpark, sanfte Almwanderwege' },
    ],
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
    datePublished: opts.date,
    dateModified: opts.date,
    author:    { '@type': 'Organization', name: SITE_NAME, url: BASE },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE },
    mainEntityOfPage: `${BASE}/blog/${opts.slug}`,
    articleSection: opts.category,
    inLanguage: 'de-AT',
    about: { '@type': 'Place', name: 'Kärnten', containedIn: { '@type': 'Country', name: 'Österreich' } },
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
