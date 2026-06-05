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

  const wa = `https://wa.me/?text=${encodeURIComponent(`${title} `)}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=`;

  const btn = 'flex items-center gap-1.5 text-xs font-medium px-3 py-2 border border-gray-200 hover:border-green-400 hover:text-green-700 text-gray-600 transition-colors';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-gray-400 mr-1">Teilen:</span>
      <button onClick={nativeShare} className={btn} style={{ borderRadius: 4 }}>
        📤 Teilen
      </button>
      <a href={wa} target="_blank" rel="noopener noreferrer" className={btn} style={{ borderRadius: 4 }}>
        💬 WhatsApp
      </a>
      <a href={`${fb}${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`} target="_blank" rel="noopener noreferrer" className={btn} style={{ borderRadius: 4 }}>
        f Facebook
      </a>
      <button onClick={copy} className={btn} style={{ borderRadius: 4 }}>
        {copied ? '✓ Kopiert!' : '🔗 Link kopieren'}
      </button>
    </div>
  );
}
