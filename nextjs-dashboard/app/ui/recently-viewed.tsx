'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CATEGORY_DOT } from '@/app/lib/blog-utils';

type ViewedItem = { slug: string; title: string; category: string; ts: number };
const KEY = 'bergseen-recently-viewed';
const MAX = 6;

export function trackView(slug: string, title: string, category: string) {
  try {
    const items: ViewedItem[] = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    const filtered = items.filter((i) => i.slug !== slug);
    filtered.unshift({ slug, title, category, ts: Date.now() });
    localStorage.setItem(KEY, JSON.stringify(filtered.slice(0, MAX)));
  } catch {}
}

export default function RecentlyViewed({ currentSlug }: { currentSlug?: string }) {
  const [items, setItems] = useState<ViewedItem[]>([]);

  useEffect(() => {
    try {
      const stored: ViewedItem[] = JSON.parse(localStorage.getItem(KEY) ?? '[]');
      setItems(stored.filter((i) => i.slug !== currentSlug).slice(0, 4));
    } catch {}
  }, [currentSlug]);

  if (items.length === 0) return null;

  return (
    <div className="border border-gray-200 p-5" style={{ borderRadius: 8 }}>
      <p className="eyebrow mb-3">Zuletzt angesehen</p>
      <div className="space-y-2.5">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/blog/${item.slug}`}
            className="group flex items-start gap-2.5 text-sm"
          >
            <span className={`shrink-0 mt-2 w-1.5 h-1.5 rounded-full ${CATEGORY_DOT[item.category] ?? 'bg-gray-400'}`} />
            <span className="text-gray-700 group-hover:text-green-700 leading-snug transition-colors">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
