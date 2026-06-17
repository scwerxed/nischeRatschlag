'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Post } from '@/app/lib/posts';
import { CATEGORY_DOT } from '@/app/lib/blog-utils';
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

  // Suchbegriff aus der URL übernehmen (?q=…), z. B. aus der Navbar-Suche oder
  // Googles Sitelinks-Searchbox (WebSite-SearchAction zeigt auf /blog?q=).
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
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suche nach Ort, Aktivität, Tipp…"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            style={{ borderRadius: 4 }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-sm font-medium px-4 py-1.5 transition-colors ${
              cat === c
                ? 'bg-green-700 text-white'
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
          <p className="text-4xl mb-3">🤷</p>
          <p>Keine Artikel gefunden. Versuch einen anderen Suchbegriff.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-gray-200 rounded-xl p-6 overflow-hidden hover:border-green-400 hover:shadow-md transition-all"
            >
              <div className="aspect-[16/9] -mx-6 -mt-6 mb-4 overflow-hidden">
                <PostArtwork seed={post.slug} category={post.category} />
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-green-700 uppercase tracking-wide">
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
              <h2 className="font-serif font-bold text-lg text-gray-900 group-hover:text-green-700 leading-snug">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
              <span className="mt-4 inline-block text-sm text-green-600 font-medium">Weiterlesen →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
