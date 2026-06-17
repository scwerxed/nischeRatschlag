import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100/80 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        {/* Marke */}
        <div className="md:col-span-2 max-w-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden>
              <path d="M2 21 L9.5 7 L14 15 L17 10 L24 21 Z" fill="#e6d8c3" />
              <circle cx="19" cy="6" r="2.4" fill="#e6d8c3" opacity="0.6" />
            </svg>
            <span className="font-serif text-lg font-bold text-white">Bergseen Guide</span>
          </div>
          <p className="text-sm leading-relaxed">
            Unabhängiger Reiseführer für Österreich: Wanderungen, Badeseen, Ausflüge und
            ehrliche Unterkunfts-Tipps – recherchiert statt abgeschrieben.
          </p>
        </div>

        {/* Entdecken */}
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-green-300 mb-4">Entdecken</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/blog" className="hover:text-white transition-colors">Magazin</Link></li>
            <li><Link href="/karte" className="hover:text-white transition-colors">Wanderkarte</Link></li>
            <li><Link href="/routenplaner" className="hover:text-white transition-colors">Routenplaner</Link></li>
            <li><Link href="/seen-vergleich" className="hover:text-white transition-colors">Seen-Vergleich</Link></li>
            <li><Link href="/merkliste" className="hover:text-white transition-colors">Merkliste</Link></li>
            <li><Link href="/reiseinfos" className="hover:text-white transition-colors">Reiseinfos</Link></li>
            <li><Link href="/#regionen" className="hover:text-white transition-colors">Regionen</Link></li>
          </ul>
        </div>

        {/* Rechtliches */}
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-green-300 mb-4">Service</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/ueber-uns" className="hover:text-white transition-colors">Über uns</Link></li>
            <li><Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
            <li><Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
            <li><Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-green-300/70">
          <p>© {new Date().getFullYear()} Bergseen Guide. Alle Angaben ohne Gewähr.</p>
          <p>Enthält Affiliate-Links · Österreich</p>
        </div>
      </div>
    </footer>
  );
}
