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
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="eyebrow mb-2">Deine Merkliste</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Gemerkte Artikel</h1>
      <p className="text-gray-500 mb-8">
        Deine gespeicherten Tipps – gespeichert nur in diesem Browser, ganz ohne Konto.
      </p>

      {items === null ? (
        <p className="text-gray-400 text-sm">Lädt…</p>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-gray-300 p-8 text-center" style={{ borderRadius: 8 }}>
          <p className="text-gray-700 font-medium mb-1">Noch nichts gemerkt</p>
          <p className="text-sm text-gray-500 mb-4">
            Tippe in einem Artikel auf <strong className="font-semibold">„Merken"</strong>, um ihn hier zu sammeln.
          </p>
          <Link href="/blog" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 4 }}>
            Zum Magazin
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100 border-y border-gray-100">
          {items.map((item) => (
            <li key={item.slug} className="flex items-center gap-4 py-4">
              <div className="min-w-0 flex-1">
                <span className="eyebrow">{item.category}</span>
                <h2 className="font-serif text-lg font-bold text-gray-900 leading-snug">
                  <Link href={`/blog/${item.slug}`} className="hover:text-green-700">{item.title}</Link>
                </h2>
              </div>
              <button
                onClick={() => remove(item.slug)}
                className="shrink-0 text-gray-300 hover:text-red-500 text-xl leading-none"
                aria-label="Aus Merkliste entfernen"
              >×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
