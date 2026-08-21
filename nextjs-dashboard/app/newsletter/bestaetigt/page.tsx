import Link from 'next/link';
import type { Metadata } from 'next';

// Ziel der Double-Opt-in-Weiterleitung aus der Brevo-Bestätigungsmail
// (siehe `redirectionUrl` in app/api/newsletter/route.ts). Bewusst noindex –
// die Seite hat für die Suche keinen Wert.
export const metadata: Metadata = {
  title: 'Newsletter bestätigt',
  robots: { index: false, follow: true },
};

export default function NewsletterBestaetigtPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <div className="mb-6 inline-block">
        <svg width="120" height="72" viewBox="0 0 120 72" fill="none" className="text-green-200">
          <path d="M0 72L30 20L50 45L65 25L90 55L120 15L120 72Z" fill="currentColor" />
          <path d="M0 72L40 30L60 50L80 35L120 72Z" fill="currentColor" opacity="0.5" />
          <circle cx="100" cy="12" r="8" fill="currentColor" opacity="0.4" />
        </svg>
      </div>

      <p className="eyebrow mb-2">Newsletter</p>
      <h1 className="font-serif text-3xl font-bold mb-4 text-gray-900">Anmeldung bestätigt</h1>
      <p className="text-gray-600 leading-relaxed mb-8">
        Danke! Deine E-Mail-Adresse ist jetzt eingetragen. Du bekommst ab sofort unsere
        Tipps zu Badestellen, Wanderungen und Ausflügen in Österreich – abmelden kannst du
        dich jederzeit über den Link am Ende jeder Mail.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/ausflugsplaner" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 6 }}>
          Zum Ausflugsplaner
        </Link>
        <Link href="/blog" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Zum Magazin
        </Link>
      </div>
    </div>
  );
}
