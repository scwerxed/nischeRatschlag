import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Schreib uns – wir freuen uns über Fragen und Feedback.',
};

export default function KontaktPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Kontakt</h1>
      <p className="text-gray-700 mb-8">
        Hast du Fragen, Anregungen oder Kooperationsanfragen? Schreib uns einfach eine E-Mail.
      </p>
      <a
        href="mailto:hallo@woerthersee-guide.at"
        className="inline-block bg-green-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
      >
        hallo@woerthersee-guide.at
      </a>
    </div>
  );
}
