'use client';

import { useState } from 'react';

export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gray-200 border border-gray-200" style={{ borderRadius: 6 }}>
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex items-center justify-between w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-800 text-sm pr-4">{item.q}</span>
            <span className={`text-green-600 text-xl shrink-0 transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
