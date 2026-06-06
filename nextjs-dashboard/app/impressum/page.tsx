import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Offenlegung gemäß § 5 ECG und § 25 MedienG.',
  alternates: { canonical: '/impressum' },
  robots: { index: true, follow: true },
};

const IMPRESSUM = {
  name: 'Gabriel Seebacher',
  strasse: 'Evaweg 19',
  plz_ort: '9020 Klagenfurt',
  land: 'Österreich',
  email: 'gabriel.seebacher@gmail.com',
  telefon: '',
};

export default function ImpressumPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="eyebrow mb-2">Rechtliches</p>
      <h1 className="font-serif text-4xl font-bold mb-8 text-gray-900">Impressum</h1>

      <section className="mb-8">
        <h2 className="font-serif text-xl font-bold mb-3 text-gray-900">
          Medieninhaber &amp; für den Inhalt verantwortlich
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {IMPRESSUM.name}<br />
          {IMPRESSUM.strasse}<br />
          {IMPRESSUM.plz_ort}<br />
          {IMPRESSUM.land}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-xl font-bold mb-3 text-gray-900">Kontakt</h2>
        <p className="text-gray-700 leading-relaxed">
          E-Mail:{' '}
          <a href={`mailto:${IMPRESSUM.email}`} className="text-green-700 hover:underline">
            {IMPRESSUM.email}
          </a>
          {IMPRESSUM.telefon && !IMPRESSUM.telefon.startsWith('[') && (
            <>
              <br />Telefon: {IMPRESSUM.telefon}
            </>
          )}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-xl font-bold mb-3 text-gray-900">
          Offenlegung gemäß § 25 MedienG
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Wörthersee Guide ist ein privat betriebenes, unabhängiges Reise-Informationsangebot
          über die Region Kärnten. Grundlegende Richtung: redaktionelle, werbefinanzierte
          Information zu Reise, Wandern, Baden und Ausflügen in Kärnten.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-xl font-bold mb-3 text-gray-900">Haftung für Inhalte</h2>
        <p className="text-gray-700 leading-relaxed">
          Alle Inhalte wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte – insbesondere bei Preis-, Öffnungs- und
          Wegangaben – wird jedoch keine Gewähr übernommen. Angaben zu Wanderrouten ersetzen
          keine eigene Tourenplanung; das Begehen erfolgt auf eigene Verantwortung.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-xl font-bold mb-3 text-gray-900">Haftung für Links</h2>
        <p className="text-gray-700 leading-relaxed">
          Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Für diese fremden Inhalte ist stets der jeweilige Anbieter verantwortlich.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-xl font-bold mb-3 text-gray-900">Affiliate- &amp; Werbehinweis</h2>
        <p className="text-gray-700 leading-relaxed">
          Diese Website finanziert sich über Werbung (Google AdSense) und Affiliate-Partnerschaften
          (u. a. Amazon, booking.com). Bei Käufen über entsprechend gekennzeichnete Links erhalten
          wir eine Provision – für dich entstehen dadurch keine Mehrkosten.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-xl font-bold mb-3 text-gray-900">Online-Streitbeilegung</h2>
        <p className="text-gray-700 leading-relaxed">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
            ec.europa.eu/consumers/odr
          </a>. Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor
          einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <p className="text-xs text-gray-400 mt-10">Stand: {new Date().toLocaleDateString('de-AT', { month: 'long', year: 'numeric' })}</p>
    </div>
  );
}
