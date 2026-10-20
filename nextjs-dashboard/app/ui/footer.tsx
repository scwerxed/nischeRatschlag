import Link from 'next/link';
import { NAV_GROUPS, NAV_REGIONEN, NAV_SINGLE, NAV_SERVICE, type NavLink } from '@/app/lib/navigation';

// Footer-Spalten aus derselben Struktur wie das Menü (app/lib/navigation.ts) –
// neue Themenseiten tauchen damit automatisch an beiden Stellen auf.
const byLabel = (label: string) => NAV_GROUPS.find((g) => g.label === label)?.links ?? [];
const COLUMNS: { title: string; links: NavLink[] }[] = [
  { title: 'Ausflugsideen', links: byLabel('Ausflugsideen') },
  { title: 'Seen & Karte', links: [...byLabel('Seen & Baden'), ...byLabel('Karte'), ...NAV_SINGLE] },
  { title: 'Regionen', links: NAV_REGIONEN },
  { title: 'Service', links: NAV_SERVICE },
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

      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
        {/* Marke */}
        <div className="sm:col-span-2 lg:col-span-2 max-w-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <svg width="28" height="28" viewBox="0 0 26 26" fill="none" aria-hidden>
              <path d="M2 21 L9.5 7 L14 15 L17 10 L24 21 Z" fill="#e6d8c3" />
              <circle cx="19" cy="6" r="2.4" fill="#e6d8c3" opacity="0.6" />
            </svg>
            <span className="font-serif text-tagline font-bold text-white">Bergseen Guide</span>
          </div>
          <p className="text-caption leading-relaxed mb-6">
            Unabhängiger Reiseführer für Österreich: Wanderungen, Badeseen, Ausflüge und
            ehrliche Unterkunfts-Tipps – recherchiert statt abgeschrieben.
          </p>
          <div className="flex items-center gap-3 text-fine text-green-300/70">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 4v4l3 2" strokeLinecap="round" />
              </svg>
              Regelmäßig aktualisiert
            </span>
            <span>·</span>
            <span>Seit 2026</span>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-fine uppercase tracking-[0.18em] text-green-300 mb-4 font-semibold">{col.title}</p>
            <ul className="space-y-2.5 text-caption">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                    {l.label}
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition duration-200">
                      <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-fine text-green-300/70">
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
