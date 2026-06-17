'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/blog', label: 'Magazin' },
  { href: '/karte', label: 'Karte' },
  { href: '/routenplaner', label: 'Routenplaner' },
  { href: '/seen-vergleich', label: 'Seen-Vergleich' },
  { href: '/#regionen', label: 'Regionen' },
  { href: '/ueber-uns', label: 'Über uns' },
];

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2.5 group shrink-0">
      <span className="text-green-700 group-hover:text-green-600 transition-colors">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
          <path d="M2 21 L9.5 7 L14 15 L17 10 L24 21 Z" fill="currentColor" />
          <circle cx="19" cy="6" r="2.4" fill="currentColor" opacity="0.55" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-serif text-lg font-bold text-gray-900 tracking-tightish">
          Bergseen&nbsp;Guide
        </span>
        <span className="block text-[10px] uppercase tracking-[0.22em] text-gray-400 mt-0.5">
          Österreich · Seen &amp; Berge
        </span>
      </span>
    </Link>
  );
}

function Heart({ count }: { count: number }) {
  return (
    <Link href="/merkliste" aria-label={`Merkliste (${count})`} className="relative text-gray-500 hover:text-green-700 transition-colors">
      <svg width="22" height="22" viewBox="0 0 16 16" fill={count > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path d="M8 14s-5-3.3-5-7a3 3 0 0 1 5-2.2A3 3 0 0 1 13 7c0 3.7-5 7-5 7z" strokeLinejoin="round" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-green-700 text-white text-[10px] font-bold min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Merklisten-Zähler live aktualisieren
  useEffect(() => {
    const update = () => {
      try { setCount(JSON.parse(localStorage.getItem('bergseen-merkliste') ?? '[]').length); }
      catch { setCount(0); }
    };
    update();
    window.addEventListener('merkliste-changed', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('merkliste-changed', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-[1200] bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-5">
          {/* Desktop-Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-px after:bg-green-600 after:transition-all ${
                  isActive(l.href)
                    ? 'text-green-700 after:w-full'
                    : 'hover:text-green-700 after:w-0 hover:after:w-full'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Merkliste-Herz (immer sichtbar) */}
          <Heart count={count} />

          {/* Hamburger (mobil) */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 -mr-1"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
          >
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 my-1.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobiles Overlay-Menü */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-[1190] bg-white transition-[opacity,transform] duration-300 ${
          open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 py-4 divide-y divide-gray-100">
          {[...LINKS, { href: '/merkliste', label: 'Merkliste' }, { href: '/kontakt', label: 'Kontakt' }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between py-4 font-serif text-xl ${
                isActive(l.href) ? 'text-green-700 font-bold' : 'text-gray-800'
              }`}
            >
              {l.label}
              <span className="text-gray-300 text-base">→</span>
            </Link>
          ))}
        </div>

        <div className="px-6 pt-4">
          <Link
            href="/karte"
            onClick={() => setOpen(false)}
            className="block w-full text-center bg-green-700 text-white font-semibold py-3 hover:bg-green-800 transition-colors"
            style={{ borderRadius: 4 }}
          >
            Wanderkarte öffnen
          </Link>
        </div>
      </div>
    </nav>
  );
}
