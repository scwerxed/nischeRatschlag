'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Post } from '@/app/lib/posts';
import { CATEGORY_DOT, CATEGORY_STYLE, readingTime } from '@/app/lib/blog-utils';
import { isOeffiErreichbar } from '@/app/lib/themenseiten';
import PostArtwork from '@/app/ui/post-artwork';

const CATEGORIES = ['Alle', 'Wandern', 'Baden', 'Ausflug', 'Unterkunft'] as const;
const DIFF_STYLE: Record<string, string> = {
  leicht: 'bg-green-50 text-green-700 border border-green-200',
  mittel: 'bg-amber-50 text-amber-700 border border-amber-200',
  schwer: 'bg-rose-50 text-rose-700 border border-rose-200',
};
const PAGE_SIZE = 24;

export default function BlogSearch({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('Alle');
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) setQuery(q);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchCat = cat === 'Alle' || p.category === cat;
      const matchText =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        (p.bestSeason ?? '').toLowerCase().includes(q) ||
        (p.highlights ?? []).some((h) => h.toLowerCase().includes(q));
      return matchCat && matchText;
    });
  }, [posts, query, cat]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query, cat]);

  const visiblePosts = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <div>
      {/* Such- und Filterleiste */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <circle cx="7" cy="7" r="5" /><path d="M11 11l3.5 3.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suche nach Ort, Aktivität, Tipp…"
            aria-label="Artikel durchsuchen"
            className="w-full pl-10 pr-4 py-3 bg-canvas border border-hairline text-caption text-ink placeholder:text-ink-soft outline-none transition-colors focus:border-green-600 focus-visible:ring-2 focus-visible:ring-green-600 rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`text-caption font-medium px-4 py-2 border transition duration-200 rounded-full ${
              cat === c
                ? `${c === 'Alle' ? 'bg-green-700' : CATEGORY_STYLE[c]?.chip ?? 'bg-green-700'} border-transparent text-white`
                : 'border-hairline text-ink-muted hover:border-green-600 hover:text-green-700'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Ergebnis-Zähler */}
      <p className="text-caption text-ink-soft mb-5" role="status" aria-live="polite" data-numeric>
        {filtered.length} {filtered.length === 1 ? 'Artikel' : 'Artikel'} gefunden
        {hasMore && ` · ${visiblePosts.length} angezeigt`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-ink-soft">
          <svg className="mx-auto mb-4 text-hairline" width="48" height="48" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="7" cy="7" r="5" /><path d="M11 11l3.5 3.5" strokeLinecap="round" />
          </svg>
          <p className="font-medium text-ink-soft mb-1">Keine Artikel gefunden</p>
          <p className="text-sm">Versuch einen anderen Suchbegriff oder wähle eine andere Kategorie.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {visiblePosts.map((post) => {
            const mins = readingTime(post.content);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="surface-card-interactive group block overflow-hidden"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <PostArtwork seed={post.slug} category={post.category} className="transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 right-3">
                    <span className="bg-canvas/90 backdrop-blur text-fine font-medium text-ink-muted px-2.5 py-1 rounded-full">
                      {mins} Min.
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${CATEGORY_STYLE[post.category]?.text ?? 'text-green-700'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${CATEGORY_DOT[post.category] ?? 'bg-gray-400'}`} />
                        {post.category}
                      </span>
                      {post.difficulty && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFF_STYLE[post.difficulty]}`}>
                          {post.difficulty}
                        </span>
                      )}
                      {isOeffiErreichbar(post.slug) && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          🚋 Öffis
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-ink-soft">{post.date}</span>
                  </div>
                  <h2 className="font-serif font-bold text-tagline text-ink group-hover:text-green-700 leading-snug transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-caption text-ink-soft line-clamp-2">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-caption text-green-700 font-medium">
                    Weiterlesen
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="btn btn-secondary btn-sm"
          >
            Mehr laden ({filtered.length - visiblePosts.length} weitere)
          </button>
        </div>
      )}
    </div>
  );
}
