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

// Vollständiges Farbsystem je Kategorie (Text / Tint-Hintergrund / Rahmen /
// Voll-Chip / Verlauf). Klassen stehen als Literale → Tailwind-JIT erfasst sie.
export const CATEGORY_STYLE: Record<
  string,
  { text: string; bg: string; border: string; chip: string; grad: string }
> = {
  Wandern:    { text: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200',  chip: 'bg-green-600',  grad: 'from-green-600 to-green-800' },
  Baden:      { text: 'text-sky-700',    bg: 'bg-sky-50',    border: 'border-sky-200',    chip: 'bg-sky-500',    grad: 'from-sky-500 to-cyan-700' },
  Ausflug:    { text: 'text-amber-700',  bg: 'bg-amber-50',  border: 'border-amber-200',  chip: 'bg-amber-500',  grad: 'from-amber-500 to-orange-600' },
  Unterkunft: { text: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-200', chip: 'bg-violet-500', grad: 'from-violet-500 to-purple-700' },
};

// Rückwärtskompatibel für alte Imports
export const CATEGORY_ICONS = CATEGORY_LABEL;
