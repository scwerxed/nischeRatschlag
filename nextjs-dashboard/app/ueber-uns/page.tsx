import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Wer hinter dem Wörthersee Guide steckt – unabhängiger Reiseführer für Kärnten mit ehrlichen, selbst recherchierten Tipps.',
  alternates: { canonical: '/ueber-uns' },
};

export default function UeberUnsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="eyebrow mb-2">Über uns</p>
      <h1 className="font-serif text-4xl font-bold mb-6 text-gray-900">
        Kärnten, wie wir es wirklich erleben
      </h1>

      <p className="text-gray-700 leading-relaxed mb-4">
        Der Wörthersee Guide ist ein unabhängiges Reise-Magazin über Kärnten und seine Seen.
        Wir schreiben über Wanderungen, Badestellen, Ausflüge und Unterkünfte – nicht aus
        Hochglanzprospekten abgeschrieben, sondern aus eigener Erfahrung vor Ort.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        Unser Anspruch: konkrete, ehrliche Tipps mit echten Preisen, klaren Empfehlungen und
        auch mal einem kritischen Wort. Wir nennen Gratis-Alternativen zu teuren Strandbädern,
        sagen, wann ein Ort überlaufen ist, und zeigen Routen mit nachvollziehbaren Geh- und
        Höhenangaben.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        Damit dieses Angebot kostenlos bleiben kann, finanzieren wir uns über Werbung und
        Affiliate-Partnerschaften. Das beeinflusst unsere Empfehlungen nicht – wir verlinken nur,
        wovon wir selbst überzeugt sind. Details dazu im{' '}
        <Link href="/impressum" className="text-green-700 hover:underline">Impressum</Link>.
      </p>

      <div className="border-l-4 border-green-600 bg-green-50 px-5 py-4 mt-8">
        <p className="eyebrow mb-2">Unser Versprechen</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          {[
            'Selbst recherchiert statt abgeschrieben',
            'Echte Preise und ehrliche Einschätzungen',
            'Gratis-Tipps abseits der Touristenströme',
            'Transparente Kennzeichnung von Werbung',
          ].map((t) => (
            <li key={t} className="flex items-start gap-2.5">
              <span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-gray-700 leading-relaxed mt-8">
        Fragen oder Anregungen? Schreib uns über die{' '}
        <Link href="/kontakt" className="text-green-700 hover:underline">Kontaktseite</Link>.
      </p>
    </div>
  );
}
