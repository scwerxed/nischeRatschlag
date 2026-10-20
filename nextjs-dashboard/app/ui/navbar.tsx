'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAV_GROUPS, NAV_SINGLE, NAV_SERVICE, type NavGroup } from '@/app/lib/navigation';

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
        <span className="block font-serif text-tagline font-bold text-ink tracking-tightish">
          Bergseen&nbsp;Guide
        </span>
        <span className="block text-[10px] uppercase tracking-[0.22em] text-ink-soft mt-0.5">
          Österreich · Seen &amp; Berge
        </span>
      </span>
    </Link>
  );
}

function SearchForm({ onSubmit }: { onSubmit?: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const v = q.trim();
        if (!v) return;
        router.push(`/blog?q=${encodeURIComponent(v)}`);
        onSubmit?.();
      }}
      className="relative w-full"
    >
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ziel oder See suchen…"
        aria-label="Artikel durchsuchen"
        className="w-full pl-9 pr-4 py-2 text-caption bg-canvas border border-hairline rounded-full outline-none transition-colors focus:border-green-600 focus-visible:ring-2 focus-visible:ring-green-600"
      />
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <circle cx="7" cy="7" r="5" /><path d="M11 11l3.5 3.5" strokeLinecap="round" />
      </svg>
    </form>
  );
}

function Heart({ count }: { count: number }) {
  return (
    <Link
      href="/merkliste"
      aria-label={`Merkliste (${count})`}
      className="relative text-ink-soft hover:text-green-700 transition-colors after:absolute after:content-[''] after:-inset-2"
    >
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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
      <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Desktop: Hauptpunkt mit aufklappendem Panel (Hover, Klick und Tastatur). */
function DesktopGroup({
  group,
  open,
  active,
  onOpen,
  onClose,
}: {
  group: NavGroup;
  open: boolean;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = `nav-panel-${group.label.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  const isRegionen = group.label === 'Regionen';
  const twoCols = group.links.length > 6;

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) onClose();
      }}
    >
      {/* Klick öffnet nur (Hover hat das Panel meist schon geöffnet – ein Toggle würde es dann
          wieder schließen). Zu geht es über Escape, Klick daneben, Verlassen mit Maus oder Fokus. */}
      <button
        type="button"
        onClick={onOpen}
        aria-expanded={open}
        aria-controls={panelId}
        className={`inline-flex items-center gap-1.5 py-5 transition-colors ${active || open ? 'text-green-700' : 'hover:text-green-700'}`}
      >
        {group.label}
        <Chevron open={open} />
      </button>

      <div
        id={panelId}
        className={`absolute left-1/2 top-full -translate-x-1/2 pt-1 transition-[opacity,transform,visibility] duration-150 ${
          open ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <div className={`bg-canvas border border-hairline rounded-lg shadow-xl shadow-black/5 p-5 max-w-[calc(100vw-2rem)] ${isRegionen ? 'w-[440px]' : twoCols ? 'w-[520px]' : 'w-[300px]'}`}>
          <ul className={`grid gap-x-6 gap-y-1 ${isRegionen ? 'grid-cols-3' : twoCols ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {group.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="block rounded-sm px-2 py-1.5 -mx-2 text-caption text-ink hover:bg-parchment hover:text-green-700 transition-colors"
                >
                  <span className="font-medium">{l.label}</span>
                  {l.note && <span className="block text-fine text-ink-soft">{l.note}</span>}
                </Link>
              </li>
            ))}
          </ul>
          {isRegionen && (
            <Link href={group.href} onClick={onClose} className="mt-4 pt-3 border-t border-hairline block text-fine font-semibold text-green-700 hover:text-green-600">
              Alle 9 Bundesländer im Überblick →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => { setOpen(false); setOpenGroup(null); }, [pathname]);

  // Klick/Tipp außerhalb der Navigation schließt ein offenes Desktop-Panel (wichtig auf Tablets ohne Hover)
  useEffect(() => {
    if (!openGroup) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    // Beim Scrollen zu – sonst hängt das Panel über dem Inhalt, wenn der Zeiger zufällig auf der Leiste ruht.
    const onScroll = () => setOpenGroup(null);
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, [openGroup]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Escape schließt offene Menüs
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenGroup(null); setOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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

  const isActive = (href: string) => {
    const path = href.split('#')[0];
    if (!path || path === '/') return false;
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  const groupActive = (g: NavGroup) => g.links.some((l) => isActive(l.href));

  return (
    <>
    <nav ref={navRef} className="sticky top-0 z-[1200] bg-white/90 backdrop-blur border-b border-hairline">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Logo />

        <div className="flex items-center gap-5">
          {/* Desktop-Navigation */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6 text-caption text-ink-muted">
            {NAV_GROUPS.map((g) => (
              <DesktopGroup
                key={g.label}
                group={g}
                open={openGroup === g.label}
                active={groupActive(g)}
                onOpen={() => setOpenGroup(g.label)}
                onClose={() => setOpenGroup((cur) => (cur === g.label ? null : cur))}
              />
            ))}
            {NAV_SINGLE.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`py-5 transition-colors ${isActive(l.href) ? 'text-green-700' : 'hover:text-green-700'}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop-Suche */}
          <div className="hidden lg:block w-48">
            <SearchForm />
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
            <span className={`block w-6 h-0.5 bg-ink transition duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 my-1.5 transition duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-ink transition duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>
    </nav>

      {/* Mobiles Overlay-Menü – bewusst AUSSERHALB von <nav>: `backdrop-blur` macht die Leiste zum
          Bezugsrahmen für position:fixed, das Overlay schrumpfte darin auf 0 px Höhe und war
          unsichtbar (bis 2026-10-20 ließ sich das Menü auf dem Handy gar nicht öffnen). */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-[1190] overflow-y-auto scroll-panel bg-canvas transition-[opacity,transform,visibility] duration-300 ${
          open
            ? 'visible opacity-100 translate-x-0'
            : 'invisible opacity-0 translate-x-full pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="px-6 pt-5 pb-2">
          <SearchForm onSubmit={() => setOpen(false)} />
        </div>

        <div className="px-6 py-2 divide-y divide-hairline">
          {NAV_GROUPS.map((g) => (
            <details key={g.label} className="group py-1" open={groupActive(g)}>
              <summary className="flex items-center justify-between py-3.5 font-serif text-tagline text-ink cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className={groupActive(g) ? 'text-green-700 font-bold' : ''}>{g.label}</span>
                <span className="text-ink-soft transition-transform duration-200 group-open:rotate-180">
                  <Chevron open={false} />
                </span>
              </summary>
              <ul className={`pb-4 grid gap-x-4 gap-y-0.5 ${g.label === 'Regionen' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block py-2 text-body ${isActive(l.href) ? 'text-green-700 font-semibold' : 'text-ink-muted'}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
          {NAV_SINGLE.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between py-4 font-serif text-tagline ${isActive(l.href) ? 'text-green-700 font-bold' : 'text-ink'}`}
            >
              {l.label}
              <span className="text-ink-soft text-body">→</span>
            </Link>
          ))}
        </div>

        <div className="px-6 pt-3">
          <Link
            href="/karte"
            onClick={() => setOpen(false)}
            className="btn-primary w-full rounded-sm"
          >
            Wanderkarte öffnen
          </Link>
        </div>

        <div className="px-6 pt-6 pb-10 flex flex-wrap gap-x-5 gap-y-2 text-caption text-ink-soft">
          {NAV_SERVICE.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-green-700">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
