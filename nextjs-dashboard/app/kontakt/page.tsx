import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Schreib uns – wir freuen uns über Fragen, Feedback und Kooperationsanfragen.',
  alternates: { canonical: '/kontakt' },
};

const EMAIL = 'gabriel.seebacher@gmail.com';

export default function KontaktPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="eyebrow mb-2">Kontakt</p>
      <h1 className="font-serif text-4xl font-bold mb-6 text-gray-900">Schreib uns</h1>
      <p className="text-gray-700 leading-relaxed mb-8">
        Hast du Fragen, Anregungen, einen Korrekturhinweis oder eine Kooperationsanfrage?
        Wir freuen uns über jede Nachricht und antworten in der Regel innerhalb weniger Tage.
      </p>
      <a
        href={`mailto:${EMAIL}`}
        className="inline-block bg-green-700 text-white font-semibold px-6 py-3 hover:bg-green-800 transition-colors"
        style={{ borderRadius: 4 }}
      >
        {EMAIL}
      </a>

      <p className="text-sm text-gray-500 mt-10">
        Vollständige Anbieterkennzeichnung im{' '}
        <a href="/impressum" className="text-green-700 hover:underline">Impressum</a>.
      </p>
    </div>
  );
}
