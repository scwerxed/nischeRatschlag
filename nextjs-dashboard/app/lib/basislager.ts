import { posts, type Post } from '@/app/lib/posts';
import { unterkuenfte, type Unterkunft } from '@/app/lib/unterkuenfte';
import { coordsOf, distKm } from '@/app/lib/wochenendtrip';

// „Basislager“ – welche Unterkunft-Standorte haben die meisten Ausflugsziele in der Nähe?
// Rein berechnet aus den vorhandenen Koordinaten (Unterkunft lat/lng ↔ startCoords/trails der
// Artikel), Luftlinie als Näherung. Keine neuen Daten, keine Fahrzeit-Behauptungen.

export const BASISLAGER_RADIUS_KM = 25;
/** Standorte mit weniger Zielen im Umkreis tauchen nicht auf (sonst kein echtes Basislager). */
const MIN_ZIELE = 3;

export type BasisZiel = { post: Post; km: number };
export type Basislager = {
  stay: Unterkunft;
  ziele: BasisZiel[];
  counts: Record<string, number>; // Kategorie → Anzahl
};
export type BasislagerGroup = { region: string; lager: Basislager[] };

function basislagerFor(stay: Unterkunft): Basislager {
  const home: [number, number] = [stay.lat, stay.lng];
  const ziele: BasisZiel[] = posts
    // Unterkunft-Artikel sind selbst Übernachtungstipps, keine Ausflugsziele.
    .filter((post) => post.category !== 'Unterkunft')
    .map((post) => {
      const c = coordsOf(post);
      return c ? { post, km: distKm(home, c) } : null;
    })
    .filter((x): x is BasisZiel => x !== null && x.km <= BASISLAGER_RADIUS_KM)
    .sort((a, b) => a.km - b.km);

  const counts: Record<string, number> = {};
  for (const z of ziele) counts[z.post.category] = (counts[z.post.category] ?? 0) + 1;
  return { stay, ziele, counts };
}

/** Basislager je Bundesland, meiste Ziele zuerst; Regionen nach ihrem stärksten Basislager sortiert. */
export function basislagerByRegion(): BasislagerGroup[] {
  const all = unterkuenfte.map(basislagerFor).filter((b) => b.ziele.length >= MIN_ZIELE);
  const regions = [...new Set(all.map((b) => b.stay.region))];

  return regions
    .map((region) => ({
      region,
      lager: all
        .filter((b) => b.stay.region === region)
        .sort((a, b) => b.ziele.length - a.ziele.length),
    }))
    .sort((a, b) => b.lager[0].ziele.length - a.lager[0].ziele.length);
}
