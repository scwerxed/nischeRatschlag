'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Post } from '@/app/lib/posts';
import { CATEGORY_DOT, CATEGORY_STYLE, readingTime } from '@/app/lib/blog-utils';
import PostArtwork from '@/app/ui/post-artwork';

const CATEGORIES = ['Alle', 'Wandern', 'Baden', 'Ausflug', 'Unterkunft'] as const;
const DIFF_STYLE: Record<string, string> = {
  leicht: 'bg-green-100 text-green-700',
  mittel: 'bg-yellow-100 text-yellow-700',
  schwer: 'bg-red-100 text-red-700',
};

export default function BlogSearch({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('Alle');

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
        (p.highlights ?? []).some((h) => h.toLowerCase().includes(q));
      return matchCat && matchText;
    });
  }, [posts, query, cat]);

  return (
    <div>
      {/* Such- und Filterleiste */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <circle cx="7" cy="7" r="5" /><path d="M11 11l3.5 3.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suche nach Ort, Aktivität, Tipp…"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
            style={{ borderRadius: 4 }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-sm font-medium px-4 py-1.5 transition-all duration-200 ${
              cat === c
                ? `${c === 'Alle' ? 'bg-green-700' : CATEGORY_STYLE[c]?.chip ?? 'bg-green-700'} text-white shadow-sm`
                : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'
            }`}
            style={{ borderRadius: 3 }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Ergebnis-Zähler */}
      <p className="text-sm text-gray-400 mb-5">
        {filtered.length} {filtered.length === 1 ? 'Artikel' : 'Artikel'} gefunden
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <svg className="mx-auto mb-4 text-gray-300" width="48" height="48" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="7" cy="7" r="5" /><path d="M11 11l3.5 3.5" strokeLinecap="round" />
          </svg>
          <p className="font-medium text-gray-500 mb-1">Keine Artikel gefunden</p>
          <p className="text-sm">Versuch einen anderen Suchbegriff oder wähle eine andere Kategorie.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((post) => {
            const mins = readingTime(post.content);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-green-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <PostArtwork seed={post.slug} category={post.category} className="transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur text-xs font-medium text-gray-600 px-2 py-1" style={{ borderRadius: 3 }}>
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
                    </div>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <h2 className="font-serif font-bold text-lg text-gray-900 group-hover:text-green-700 leading-snug transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-green-600 font-medium">
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
    </div>
  );
}
