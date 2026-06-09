'use client';

import { useEffect, useState } from 'react';

export type SavedItem = { slug: string; title: string; category: string };
const KEY = 'bergseen-merkliste';

export function readSaved(): SavedItem[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); }
  catch { return []; }
}
function writeSaved(items: SavedItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('merkliste-changed'));
}

export default function SaveButton({ slug, title, category }: SavedItem) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readSaved().some((i) => i.slug === slug));
  }, [slug]);

  function toggle() {
    const items = readSaved();
    const exists = items.some((i) => i.slug === slug);
    const next = exists ? items.filter((i) => i.slug !== slug) : [{ slug, title, category }, ...items];
    writeSaved(next);
    setSaved(!exists);
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={saved}
      className={`flex items-center justify-center gap-2 w-full text-sm font-medium px-4 py-2.5 border transition-colors ${
        saved
          ? 'bg-green-700 text-white border-green-700 hover:bg-green-800'
          : 'border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-700'
      }`}
      style={{ borderRadius: 6 }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
        <path d="M8 14s-5-3.3-5-7a3 3 0 0 1 5-2.2A3 3 0 0 1 13 7c0 3.7-5 7-5 7z" strokeLinejoin="round" />
      </svg>
      {saved ? 'Gemerkt' : 'Merken'}
    </button>
  );
}
