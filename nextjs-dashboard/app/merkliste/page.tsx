'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readSaved, type SavedItem } from '@/app/ui/save-button';

export default function MerklistePage() {
  const [items, setItems] = useState<SavedItem[] | null>(null);

  useEffect(() => {
    const load = () => setItems(readSaved());
    load();
    window.addEventListener('merkliste-changed', load);
    return () => window.removeEventListener('merkliste-changed', load);
  }, []);

  function remove(slug: string) {
    const next = readSaved().filter((i) => i.slug !== slug);
    localStorage.setItem('bergseen-merkliste', JSON.stringify(next));
    window.dispatchEvent(new Event('merkliste-changed'));
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-14 md:py-section">
      <p className="eyebrow mb-2">Deine Merkliste</p>
      <h1 className="font-serif text-display font-bold mb-3 text-ink">Gemerkte Artikel</h1>
      <p className="text-ink-soft mb-8">
        Deine gespeicherten Tipps – gespeichert nur in diesem Browser, ganz ohne Konto.
      </p>

      {items === null ? (
        <p className="text-ink-soft text-caption">Lädt…</p>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-hairline p-8 text-center rounded-lg">
          <p className="text-ink-muted font-medium mb-1">Noch nichts gemerkt</p>
          <p className="text-caption text-ink-soft mb-4">
            Tippe in einem Artikel auf <strong className="font-semibold">„Merken"</strong>, um ihn hier zu sammeln.
          </p>
          <Link href="/blog" className="inline-block bg-green-700 text-white text-caption font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors rounded-sm">
            Zum Magazin
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-divider-soft border-y border-divider-soft">
          {items.map((item) => (
            <li key={item.slug} className="flex items-center gap-4 py-4">
              <div className="min-w-0 flex-1">
                <span className="eyebrow">{item.category}</span>
                <h2 className="font-serif text-tagline font-bold text-ink leading-snug">
                  <Link href={`/blog/${item.slug}`} className="hover:text-green-700">{item.title}</Link>
                </h2>
              </div>
              <button
                onClick={() => remove(item.slug)}
                className="shrink-0 text-ink-soft/50 hover:text-red-500 text-tagline leading-none"
                aria-label="Aus Merkliste entfernen"
              >×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
