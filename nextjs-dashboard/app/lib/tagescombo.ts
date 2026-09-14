import { posts, type Post } from '@/app/lib/posts';
import { regionen } from '@/app/lib/regionen';
import { distKm } from '@/app/lib/wochenendtrip';

// „Zwei Ausflüge an einem Tag“: kombiniert je Region zwei nah beieinander
// liegende, jeweils halbtagstaugliche Ziele (Vormittag + Nachmittag) über
// die Luftlinie zwischen den Startpunkten. Landingpage /zwei-ausfluege-an-einem-tag.

export type Combo = { first: Post; second: Post; km: number };
export type ComboGroup = { region: string; combos: Combo[] };

const MAX_COMBO_KM = 15; // beide Ziele müssen an einem Tag realistisch machbar sein
const MAX_PER_REGION = 4;

function coordsOf(p: Post): [number, number] | undefined {
  return p.startCoords ?? p.trails?.[0]?.coords?.[0];
}

// Nur Ziele, die sich realistisch als halber Tag einplanen lassen –
// Unterkünfte sind kein Ausflugsziel, anspruchsvolle Touren füllen den Tag allein.
function eignetSichFuerHalbenTag(p: Post): boolean {
  if (p.category === 'Unterkunft') return false;
  if (p.category === 'Wandern' && p.difficulty && p.difficulty !== 'leicht') return false;
  return true;
}

/** Pro aktiver Region: bis zu 4 Paare aus je zwei nah beieinander liegenden Halbtags-Zielen. */
export function combosByRegion(): ComboGroup[] {
  return regionen
    .filter((r) => r.aktiv)
    .map((r) => {
      const candidates = posts.filter((p) => p.region === r.slug && eignetSichFuerHalbenTag(p) && coordsOf(p));

      const combos: Combo[] = [];
      const used = new Set<string>();

      for (const a of candidates) {
        if (used.has(a.slug)) continue;
        let best: Combo | null = null;
        for (const b of candidates) {
          if (b.slug === a.slug || used.has(b.slug)) continue;
          const km = distKm(coordsOf(a)!, coordsOf(b)!);
          if (km <= MAX_COMBO_KM && (!best || km < best.km)) best = { first: a, second: b, km };
        }
        if (best) {
          combos.push(best);
          used.add(a.slug);
          used.add(best.second.slug);
        }
      }

      combos.sort((a, b) => a.km - b.km);
      return { region: r.slug, combos: combos.slice(0, MAX_PER_REGION) };
    })
    .filter((g) => g.combos.length > 0);
}
