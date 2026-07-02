import { posts, type Post } from '@/app/lib/posts';
import { regionen } from '@/app/lib/regionen';
import { distKm } from '@/app/lib/wochenendtrip';

// „Wandern + Baden“: kombiniert je Region Wanderungen mit dem nächstgelegenen
// Badeziel (Luftlinie über startCoords/trails). Sommer-Landingpage /wandern-baden.

export type Combo = { wandern: Post; baden: Post; km: number };
export type ComboGroup = { region: string; combos: Combo[] };

const MAX_COMBO_KM = 25; // Wanderung und Badesee sollen realistisch kombinierbar sein
const MAX_PER_REGION = 4;

function coordsOf(p: Post): [number, number] | undefined {
  return p.startCoords ?? p.trails?.[0]?.coords?.[0];
}

/** Pro aktiver Region: Wanderung + nächstes Badeziel (jedes Badeziel nur einmal). */
export function combosByRegion(): ComboGroup[] {
  return regionen
    .filter((r) => r.aktiv)
    .map((r) => {
      const wandern = posts.filter((p) => p.region === r.slug && p.category === 'Wandern' && coordsOf(p));
      const baden = posts.filter((p) => p.region === r.slug && p.category === 'Baden' && coordsOf(p));

      const combos: Combo[] = [];
      const usedBaden = new Set<string>();

      for (const w of wandern) {
        let best: Combo | null = null;
        for (const b of baden) {
          if (usedBaden.has(b.slug)) continue;
          const km = distKm(coordsOf(w)!, coordsOf(b)!);
          if (km <= MAX_COMBO_KM && (!best || km < best.km)) best = { wandern: w, baden: b, km };
        }
        if (best) {
          combos.push(best);
          usedBaden.add(best.baden.slug);
        }
      }

      combos.sort((a, b) => a.km - b.km);
      return { region: r.slug, combos: combos.slice(0, MAX_PER_REGION) };
    })
    .filter((g) => g.combos.length > 0);
}
