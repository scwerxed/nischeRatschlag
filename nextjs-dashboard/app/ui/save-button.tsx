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
      className={`flex items-center justify-center gap-2 w-full text-caption font-medium px-4 py-2.5 border transition-colors ${ saved ? 'bg-ink text-white border-ink hover:bg-green-700' : 'border-hairline text-ink-muted hover:border-ink hover:text-signal-dark' } rounded-sm`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
        <path d="M8 14s-5-3.3-5-7a3 3 0 0 1 5-2.2A3 3 0 0 1 13 7c0 3.7-5 7-5 7z" strokeLinejoin="round" />
      </svg>
      {saved ? 'Gemerkt' : 'Merken'}
    </button>
  );
}
