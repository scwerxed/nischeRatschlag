import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutz',
};

export default function DatenschutzPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Verantwortlicher</h2>
        <p className="text-gray-700">
          Verantwortlicher im Sinne der DSGVO ist der Betreiber dieser Website.
          Kontakt: <a href="mailto:hallo@woerthersee-guide.at" className="text-green-600 hover:underline">hallo@woerthersee-guide.at</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Erhobene Daten</h2>
        <p className="text-gray-700">
          Diese Website erhebt keine personenbezogenen Daten über Formulare oder Tracking-Tools,
          soweit dies nicht ausdrücklich angegeben ist. Beim Aufruf der Website werden technische
          Zugriffsdaten (IP-Adresse, Zeitpunkt, Browser) vom Hosting-Anbieter protokolliert.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Affiliate-Links</h2>
        <p className="text-gray-700">
          Diese Website enthält Affiliate-Links zu externen Anbietern (z. B. booking.com, Amazon).
          Beim Klick auf solche Links können Cookies durch den jeweiligen Anbieter gesetzt werden.
          Wir erhalten eine Provision, wenn du über diese Links einkaufst – für dich entstehen
          keine Mehrkosten.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Deine Rechte</h2>
        <p className="text-gray-700">
          Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung
          der Verarbeitung deiner Daten sowie das Recht auf Datenübertragbarkeit.
          Wende dich dazu an die oben genannte Kontaktadresse.
        </p>
      </section>

      <p className="text-xs text-gray-400 mt-8">Stand: Mai 2026</p>
    </div>
  );
}
