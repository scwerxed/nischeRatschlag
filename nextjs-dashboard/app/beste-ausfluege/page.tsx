import Link from 'next/link';
import type { Metadata } from 'next';
import { MONATE } from '@/app/lib/monatstipps';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';

export const metadata: Metadata = {
  title: 'Beste Ausflüge nach Monat – Österreich im Jahresverlauf',
  description: 'Welcher Ausflug passt zu welchem Monat? Kuratierte Österreich-Tipps für alle 12 Monate – mit Begründung, warum sich jedes Ziel genau jetzt lohnt.',
  alternates: { canonical: '/beste-ausfluege' },
};

export default function BesteAusfluegeHub() {
  const jsonLd = breadcrumbSchema([
    { name: 'Startseite', url: BASE },
    { name: 'Beste Ausflüge', url: `${BASE}/beste-ausfluege` },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-14 md:py-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="eyebrow mb-2">Saisonal</p>
      <h1 className="font-serif text-display font-bold mb-3 text-ink">Beste Ausflüge nach Monat</h1>
      <p className="text-ink-soft max-w-2xl mb-10 leading-relaxed">
        Nicht jedes Ziel passt zu jeder Jahreszeit. Hier bündeln wir unsere Artikel für alle 12 Monate –
        mit ehrlicher Begründung, warum sich ein Ausflug genau jetzt lohnt.
      </p>

      <div className="mb-8">
        <Link href="/ausflugsplaner" className="btn btn-quiet btn-sm">
          Alle Themenseiten
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        {MONATE.map((m) => (
          <Link
            key={m.slug}
            href={`/beste-ausfluege/${m.slug}`}
            className="group block border border-hairline p-6 hover:border-green-400 transition rounded-lg"
          >
            <p className="eyebrow mb-1.5">{m.picks.length} Ziele</p>
            <h2 className="font-serif text-tagline font-bold text-ink group-hover:text-green-700">{m.name}</h2>
            <span className="mt-3 inline-block text-caption font-medium text-green-700">Tipps ansehen →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
