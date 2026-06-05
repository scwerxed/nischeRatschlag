import Link from 'next/link';

const LINKS = [
  { href: '/blog', label: 'Magazin' },
  { href: '/karte', label: 'Karte' },
  { href: '/routenplaner', label: 'Routenplaner' },
  { href: '/regionen/kaernten', label: 'Kärnten' },
  { href: '/ueber-uns', label: 'Über uns' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[1200] bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wortmarke mit Bergsignet */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-green-700 group-hover:text-green-600 transition-colors">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
              <path d="M2 21 L9.5 7 L14 15 L17 10 L24 21 Z" fill="currentColor" />
              <circle cx="19" cy="6" r="2.4" fill="currentColor" opacity="0.55" />
            </svg>
          </span>
          <span className="leading-none">
            <span className="block font-serif text-lg font-bold text-gray-900 tracking-tightish">
              Wörthersee&nbsp;Guide
            </span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-gray-400 mt-0.5">
              Kärnten · Seen &amp; Berge
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm text-gray-600">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative hover:text-green-700 transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-green-600 hover:after:w-full after:transition-all"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile: kompakte Links */}
        <div className="flex md:hidden gap-4 text-sm text-gray-600">
          <Link href="/blog" className="hover:text-green-700">Magazin</Link>
          <Link href="/karte" className="hover:text-green-700">Karte</Link>
        </div>
      </div>
    </nav>
  );
}
