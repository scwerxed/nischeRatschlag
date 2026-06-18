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

  const cls = 'inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 border border-gray-200 hover:border-green-400 hover:text-green-700 hover:bg-green-50 text-gray-500 transition-all duration-200';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mr-1">Teilen</span>
      <button onClick={nativeShare} className={cls} style={{ borderRadius: 6 }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="3" r="2" />
          <circle cx="4" cy="8" r="2" />
          <circle cx="12" cy="13" r="2" />
          <path d="M5.8 7L10.2 4M5.8 9L10.2 12" strokeLinecap="round" />
        </svg>
        Teilen
      </button>
      <a href={waUrl} target="_blank" rel="noopener noreferrer" className={cls} style={{ borderRadius: 6 }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-green-600">
          <path d="M8 1a7 7 0 00-6.1 10.4L1 15l3.7-.9A7 7 0 108 1zm3.5 9.8c-.2.5-.9.9-1.4 1-.4.1-.9.2-2.6-.6-2.1-1-3.4-3.1-3.5-3.3-.1-.1-.9-1.2-.9-2.3s.6-1.6.8-1.8c.2-.2.4-.3.6-.3h.4c.2 0 .3 0 .5.4.2.4.6 1.5.7 1.6.1.1.1.3 0 .4-.1.2-.1.3-.2.4l-.3.4c-.1.1-.2.3-.1.5.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.1.2.1.4 0 .6-.2.2-.3.4-.5.6-.7.1-.2.3-.2.5-.1l1.5.7c.2.1.4.2.5.3.1.2.1.6-.1 1z"/>
        </svg>
        WhatsApp
      </a>
      <a href={fbUrl} target="_blank" rel="noopener noreferrer" className={cls} style={{ borderRadius: 6 }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-blue-600">
          <path d="M16 8A8 8 0 100 8a8 8 0 0016 0zm-4.3-1.3h-1.4c-.2 0-.3.2-.3.3v1h1.7l-.2 1.7H10v5H8V9.7H6.5V8H8V6.8c0-1.4.9-2.2 2.2-2.2.6 0 1.2 0 1.5.1v1.5z"/>
        </svg>
        Facebook
      </a>
      <button onClick={copy} className={cls} style={{ borderRadius: 6 }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          {copied ? (
            <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <>
              <rect x="5" y="5" width="9" height="9" rx="1" />
              <path d="M2 11V3a1 1 0 011-1h8" />
            </>
          )}
        </svg>
        {copied ? 'Kopiert!' : 'Link kopieren'}
      </button>
    </div>
  );
}
