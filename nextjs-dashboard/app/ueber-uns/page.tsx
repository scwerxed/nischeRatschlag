import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Wer steckt hinter dem Wörthersee Guide?',
};

export default function UeberUnsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Über uns</h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        Der Wörthersee Guide ist ein unabhängiges Reiseblog über Kärnten und den Wörthersee.
        Wir teilen ehrliche Tipps, persönliche Erfahrungen und praktische Empfehlungen für
        deinen Urlaub in der schönsten Seenregion Österreichs.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        Unser Ziel ist es, dir die Planung zu erleichtern – egal ob Tagesausflug, Wanderurlaub
        oder entspannter Badeurlaub mit der Familie.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Hast du Fragen oder Anregungen? Schreib uns über die{' '}
        <a href="/kontakt" className="text-green-600 hover:underline">Kontaktseite</a>.
      </p>
    </div>
  );
}
