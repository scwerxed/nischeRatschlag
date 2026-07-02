import { posts, type Post } from '@/app/lib/posts';

// „Wochenendtrip ab …“ – bündelt bestehende Artikel nach Entfernung zur Startstadt.
// Nutzt die startCoords/trails-Koordinaten der Posts (Luftlinie als Näherung).

export type TripCity = { slug: string; name: string; geo: [number, number]; intro: string };

// slug = URL-Segment (/wochenendtrip/ab-wien → 'ab-wien')
export const TRIP_CITIES: Record<string, TripCity> = {
  'ab-wien': {
    slug: 'ab-wien',
    name: 'Wien',
    geo: [48.2082, 16.3738],
    intro: 'Von Wien aus sind Wachau, Neusiedler See, Schneeberg & Rax und sogar das Salzkammergut gut erreichbar. Hier die schönsten Ausflüge und Kurztrips – sortiert nach Fahrzeit ab der Stadt.',
  },
  'ab-graz': {
    slug: 'ab-graz',
    name: 'Graz',
    geo: [47.0707, 15.4395],
    intro: 'Ab Graz liegen die Südsteirische Weinstraße, der Grüne See, das Gesäuse und die burgenländischen Seen in bequemer Reichweite. Die besten Ziele für einen Tages- oder Wochenendausflug, nach Fahrzeit gebündelt.',
  },
  'ab-salzburg': {
    slug: 'ab-salzburg',
    name: 'Salzburg',
    geo: [47.8009, 13.0430],
    intro: 'Salzburg ist das Tor zum Salzkammergut: Wolfgangsee, Fuschlsee, Hallstatt und die Hohen Tauern sind schnell erreicht. Ausflüge und Kurztrips ab der Mozartstadt, sortiert nach Fahrzeit.',
  },
};

export const TIME_BUCKETS = [
  { key: 'u1', label: 'Unter 1 Stunde', maxKm: 70 },
  { key: '1-2', label: '1–2 Stunden', maxKm: 140 },
  { key: '2-3', label: '2–3 Stunden', maxKm: 220 },
] as const;

function coordsOf(p: Post): [number, number] | undefined {
  return p.startCoords ?? p.trails?.[0]?.coords?.[0];
}

/** Luftlinie in km (Haversine). */
export function distKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const la1 = toRad(a[0]);
  const la2 = toRad(b[0]);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

export type TripItem = { post: Post; km: number };
export type TripGroup = { bucket: (typeof TIME_BUCKETS)[number]; items: TripItem[] };

/** Artikel mit Koordinaten nach Fahrzeit-Bucket gruppiert (nächste zuerst, max. 12 je Bucket). */
export function tripsFrom(citySlug: string): TripGroup[] {
  const city = TRIP_CITIES[citySlug];
  if (!city) return [];

  const scored: TripItem[] = posts
    .map((post) => {
      const c = coordsOf(post);
      return c ? { post, km: distKm(city.geo, c) } : null;
    })
    .filter((x): x is TripItem => x !== null && x.km <= 220);

  return TIME_BUCKETS.map((bucket, i) => {
    const min = i === 0 ? 0 : TIME_BUCKETS[i - 1].maxKm;
    const items = scored
      .filter((x) => x.km > min && x.km <= bucket.maxKm)
      .sort((a, b) => a.km - b.km)
      .slice(0, 12);
    return { bucket, items };
  }).filter((g) => g.items.length > 0);
}
