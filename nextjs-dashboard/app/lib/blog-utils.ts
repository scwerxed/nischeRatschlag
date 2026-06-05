import type { Post } from '@/app/lib/posts';

/** Grobe Lesezeit in Minuten (~200 Wörter/Min). */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Verwandte Artikel: gleiche Region, gewichtet nach Kategorie & gemeinsamer Saison. */
export function relatedPosts(current: Post, all: Post[], limit = 3): Post[] {
  return all
    .filter((p) => p.slug !== current.slug && p.region === current.region)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 3;
      if (p.difficulty && p.difficulty === current.difficulty) score += 1;
      if (p.bestSeason && p.bestSeason === current.bestSeason) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

// Text-Labels statt Emoji – wirkt redaktioneller
export const CATEGORY_LABEL: Record<string, string> = {
  Wandern:   'Wandern',
  Baden:     'Baden',
  Unterkunft:'Unterkunft',
  Ausflug:   'Ausflug',
};

// Kleine farbige Punkte als Kategorie-Marker (CSS-Klassen)
export const CATEGORY_DOT: Record<string, string> = {
  Wandern:   'bg-green-600',
  Baden:     'bg-sky-500',
  Unterkunft:'bg-violet-500',
  Ausflug:   'bg-amber-500',
};

// Rückwärtskompatibel für alte Imports
export const CATEGORY_ICONS = CATEGORY_LABEL;
