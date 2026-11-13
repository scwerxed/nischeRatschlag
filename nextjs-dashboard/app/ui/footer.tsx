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
    <footer className="bg-ink text-white/70 mt-20">
      {/* Rot-weiß-rote Wegmarkierung als Abschlusslinie */}
      <div aria-hidden className="h-[9px]" style={{ background: 'linear-gradient(to bottom, #c4412a 0 33.3%, #ffffff 33.3% 66.6%, #c4412a 66.6% 100%)' }} />

      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
        {/* Marke */}
        <div className="sm:col-span-2 lg:col-span-2 max-w-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <svg width="28" height="28" viewBox="0 0 26 26" fill="none" aria-hidden>
              <path d="M2 21 L9.5 7 L14 15 L17 10 L24 21 Z" fill="#e6d8c3" />
              <circle cx="19" cy="6" r="2.4" fill="#e6d8c3" opacity="0.6" />
            </svg>
            <span className="font-serif text-lead font-extrabold text-white tracking-[-0.03em]">Bergseen Guide</span>
          </div>
          <p className="text-caption leading-relaxed mb-6">
            Unabhängiger Reiseführer für Österreich: Wanderungen, Badeseen, Ausflüge und
            ehrliche Unterkunfts-Tipps – recherchiert statt abgeschrieben.
          </p>
          <p className="label-mono !text-white/45">Seit 2026 · laufend aktualisiert</p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="label-mono !text-white/45 mb-4">{col.title}</p>
            <ul className="space-y-2.5 text-caption">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white hover:underline decoration-signal underline-offset-4">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-fine text-white/45">
          <p>© {new Date().getFullYear()} Bergseen Guide. Alle Angaben ohne Gewähr.</p>
          <div className="flex items-center gap-4">
            <span>Enthält Affiliate-Links</span>
            <span>·</span>
            <span>Gemacht in Österreich</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
