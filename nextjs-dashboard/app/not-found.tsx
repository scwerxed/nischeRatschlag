import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      {/* Decorative mountain SVG */}
      <div className="mb-6 inline-block">
        <svg width="120" height="72" viewBox="0 0 120 72" fill="none" className="text-green-200">
          <path d="M0 72L30 20L50 45L65 25L90 55L120 15L120 72Z" fill="currentColor" />
          <path d="M0 72L40 30L60 50L80 35L120 72Z" fill="currentColor" opacity="0.5" />
          <circle cx="100" cy="12" r="8" fill="currentColor" opacity="0.4" />
        </svg>
      </div>

      <p className="font-serif text-7xl font-bold text-green-700 mb-2">404</p>
      <h1 className="font-serif text-2xl font-bold text-gray-900 mt-2 mb-3">
        Diese Seite gibt es (noch) nicht
      </h1>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Vielleicht wurde sie verschoben oder du hast dich vertippt. Kein Problem –
        hier geht&apos;s zurück ins Magazin oder direkt zu deiner Region.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-block bg-green-700 text-white text-sm font-semibold px-6 py-3 hover:bg-green-800 hover:shadow-lg transition-all"
          style={{ borderRadius: 6 }}
        >
          Zur Startseite
        </Link>
        <Link
          href="/blog"
          className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-3 hover:border-green-600 hover:text-green-700 transition-all"
          style={{ borderRadius: 6 }}
        >
          Zum Magazin
        </Link>
        <Link
          href="/#regionen"
          className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-3 hover:border-green-600 hover:text-green-700 transition-all"
          style={{ borderRadius: 6 }}
        >
          Regionen
        </Link>
      </div>
    </div>
  );
}
