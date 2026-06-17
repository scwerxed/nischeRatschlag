import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <p className="font-serif text-6xl font-bold text-green-700">404</p>
      <h1 className="font-serif text-2xl font-bold text-gray-900 mt-4 mb-2">
        Diese Seite gibt es (noch) nicht
      </h1>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Vielleicht wurde sie verschoben oder du hast dich vertippt. Hier geht&apos;s zurück ins Magazin
        oder direkt zu deiner Region.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-block bg-green-700 text-white text-sm font-semibold px-6 py-3 hover:bg-green-800 transition-colors"
          style={{ borderRadius: 6 }}
        >
          Zur Startseite
        </Link>
        <Link
          href="/blog"
          className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-3 hover:border-green-600 hover:text-green-700 transition-colors"
          style={{ borderRadius: 6 }}
        >
          Zum Magazin
        </Link>
        <Link
          href="/#regionen"
          className="inline-block border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-3 hover:border-green-600 hover:text-green-700 transition-colors"
          style={{ borderRadius: 6 }}
        >
          Regionen
        </Link>
      </div>
    </div>
  );
}
