'use client';

import { useState } from 'react';

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function url() {
    return typeof window !== 'undefined' ? window.location.href : '';
  }

  function copy() {
    navigator.clipboard?.writeText(url()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function nativeShare() {
    if (navigator.share) {
      try { await navigator.share({ title, url: url() }); } catch {}
    } else {
      copy();
    }
  }

  const waUrl = `https://wa.me/?text=${encodeURIComponent(`${title} `)}`;
  const fbUrl = typeof window !== 'undefined'
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
    : '#';

  const cls = 'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-gray-200 hover:border-green-400 hover:text-green-700 text-gray-500 transition-colors';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mr-1">Teilen</span>
      <button onClick={nativeShare} className={cls} style={{ borderRadius: 3 }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M9 8a2 2 0 100 4 2 2 0 000-4zM3 5a2 2 0 100 4 2 2 0 000-4zM9 0a2 2 0 100 4 2 2 0 000-4z" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M4.8 6.4l2.4-1.8M4.8 5.6L7.2 7.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        Teilen
      </button>
      <a href={waUrl} target="_blank" rel="noopener noreferrer" className={cls} style={{ borderRadius: 3 }}>
        WhatsApp
      </a>
      <a href={fbUrl} target="_blank" rel="noopener noreferrer" className={cls} style={{ borderRadius: 3 }}>
        Facebook
      </a>
      <button onClick={copy} className={cls} style={{ borderRadius: 3 }}>
        {copied ? 'Kopiert' : 'Link kopieren'}
      </button>
    </div>
  );
}
