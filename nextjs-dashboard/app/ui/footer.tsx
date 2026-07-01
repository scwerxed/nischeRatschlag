import Link from 'next/link';

const QUICK_LINKS = [
  { href: '/blog', label: 'Magazin' },
  { href: '/karte', label: 'Wanderkarte' },
  { href: '/routenplaner', label: 'Routenplaner' },
  { href: '/seen-vergleich', label: 'Seen-Vergleich' },
  { href: '/wochenendtrip', label: 'Wochenendtrips' },
  { href: '/merkliste', label: 'Merkliste' },
  { href: '/reiseinfos', label: 'Reiseinfos' },
  { href: '/#regionen', label: 'Regionen' },
];

const REGIONS = [
  { href: '/regionen/kaernten', label: 'Kärnten' },
  { href: '/regionen/salzburg', label: 'Salzburg' },
  { href: '/regionen/tirol', label: 'Tirol' },
  { href: '/regionen/steiermark', label: 'Steiermark' },
  { href: '/regionen/oberoesterreich', label: 'Oberösterreich' },
  { href: '/regionen/vorarlberg', label: 'Vorarlberg' },
];

const LEGAL = [
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
];

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100/80 mt-20">
      {/* Top wave separator */}
      <div className="bg-white">
        <svg viewBox="0 0 1440 48" className="block w-full text-green-900" preserveAspectRatio="none">
          <path d="M0 48h1440V24c-240-32-480-32-720 0S240 56 0 24v24z" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-5">
        {/* Marke */}
        <div className="md:col-span-2 max-w-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <svg width="28" height="28" viewBox="0 0 26 26" fill="none" aria-hidden>
              <path d="M2 21 L9.5 7 L14 15 L17 10 L24 21 Z" fill="#e6d8c3" />
              <circle cx="19" cy="6" r="2.4" fill="#e6d8c3" opacity="0.6" />
            </svg>
            <span className="font-serif text-xl font-bold text-white">Bergseen Guide</span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Unabhängiger Reiseführer für Österreich: Wanderungen, Badeseen, Ausflüge und
            ehrliche Unterkunfts-Tipps – recherchiert statt abgeschrieben.
          </p>
          <div className="flex items-center gap-3 text-xs text-green-300/70">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 4v4l3 2" strokeLinecap="round" />
              </svg>
              Regelmäßig aktualisiert
            </span>
            <span>·</span>
            <span>Seit 2024</span>
          </div>
        </div>

        {/* Entdecken */}
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-green-300 mb-4 font-semibold">Entdecken</p>
          <ul className="space-y-2.5 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  {l.label}
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Regionen */}
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-green-300 mb-4 font-semibold">Regionen</p>
          <ul className="space-y-2.5 text-sm">
            {REGIONS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/#regionen" className="text-green-300 hover:text-white transition-colors text-xs">
                Alle 9 Bundesländer →
              </Link>
            </li>
          </ul>
        </div>

        {/* Service */}
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-green-300 mb-4 font-semibold">Service</p>
          <ul className="space-y-2.5 text-sm">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-green-300/70">
          <p>© {new Date().getFullYear()} Bergseen Guide. Alle Angaben ohne Gewähr.</p>
          <div className="flex items-center gap-4">
            <span>Enthält Affiliate-Links</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-green-400">
                <path d="M8 1l2 5h5l-4 3.5 1.5 5L8 11.5 3.5 14.5 5 9.5 1 6h5z" strokeLinejoin="round" />
              </svg>
              Made in Austria
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
