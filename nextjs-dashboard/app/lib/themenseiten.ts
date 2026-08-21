import { BADEPLAETZE } from '@/app/lib/badeplaetze';
import { LAKES, SEE_THEMEN } from '@/app/lib/seen';
import { MONATE } from '@/app/lib/monatstipps';
import {
  HITZE_GROUPS,
  AUSSICHT_GROUPS,
  REGEN_GROUPS,
  DAUER_GROUPS,
  BAHNHOF_GROUPS,
  FEIERABEND_CITIES,
} from '@/app/lib/themen-picks';

// Rückwärts-Index: zu welchen Themenseiten gehört ein Artikel?
// Die Landingpages verlinken auf die Artikel – das hier ist der Weg zurück,
// damit Leser (und Suchmaschinen) von einem Ziel zu passenden Listen kommen.

export type ThemenLink = { href: string; label: string; note: string };

type Entry = ThemenLink & { rank: number };

const INDEX = new Map<string, Entry[]>();

function add(slug: string, entry: Entry) {
  const list = INDEX.get(slug);
  if (!list) INDEX.set(slug, [entry]);
  else if (!list.some((e) => e.href === entry.href)) list.push(entry);
}

function addGroups(
  groups: { picks: { slug: string }[] }[],
  href: string,
  label: string,
  note: string,
  rank: number,
) {
  for (const g of groups) for (const p of g.picks) add(p.slug, { href, label, note, rank });
}

addGroups(HITZE_GROUPS, '/hitzefreundliche-ausfluege', 'Kühle Ziele für Hitzetage', 'Wohin, wenn es im Tal 35 Grad hat', 1);
addGroups(REGEN_GROUPS, '/regentaugliche-ausfluege', 'Ausflüge bei Regen', 'Der Plan B, wenn das Wetter kippt', 2);
addGroups(AUSSICHT_GROUPS, '/aussicht-ohne-anstrengung', 'Aussicht ohne Anstrengung', 'Viel Panorama, wenig Höhenmeter', 3);
addGroups(BAHNHOF_GROUPS, '/bahnhofsausfluege', 'Ausflüge ab Bahnhof', 'Ziele, die ohne Auto funktionieren', 4);

for (const m of MONATE) {
  for (const p of m.picks) {
    add(p.slug, {
      href: `/beste-ausfluege/${m.slug}`,
      label: `Beste Ausflüge im ${m.name}`,
      note: 'Was in diesem Monat besonders gut passt',
      rank: 5,
    });
  }
}

for (const thema of SEE_THEMEN) {
  for (const lake of LAKES) {
    if (lake.slug && lake.tags.includes(thema.tag)) {
      add(lake.slug, {
        href: `/seen-vergleich/${thema.slug}`,
        label: thema.h1,
        note: 'Seen im direkten Vergleich',
        rank: 6,
      });
    }
  }
}

for (const b of BADEPLAETZE) {
  if (b.slug) {
    add(b.slug, {
      href: '/badeplaetze',
      label: 'Badeplatz-Check',
      note: 'Konkrete Badeplätze – gratis, Schatten, flacher Einstieg',
      rank: 7,
    });
  }
}

addGroups(DAUER_GROUPS, '/ausfluege-nach-dauer', 'Ausflüge nach Dauer', 'Was in 2 Stunden, einen halben oder ganzen Tag passt', 8);

for (const c of FEIERABEND_CITIES) {
  for (const p of c.picks) {
    add(p.slug, {
      href: '/feierabend-ausfluege',
      label: 'Feierabend-Ausflüge',
      note: 'Kurz raus nach der Arbeit',
      rank: 9,
    });
  }
}

/** Themenseiten, auf denen dieser Artikel vorkommt – max. 2 je Quelle. */
export function themenFor(slug: string, limit = 4): ThemenLink[] {
  const perRank = new Map<number, number>();
  return [...(INDEX.get(slug) ?? [])]
    .sort((a, b) => a.rank - b.rank)
    .filter((e) => {
      const n = (perRank.get(e.rank) ?? 0) + 1;
      perRank.set(e.rank, n);
      return n <= 2;
    })
    .slice(0, limit)
    .map(({ href, label, note }) => ({ href, label, note }));
}
