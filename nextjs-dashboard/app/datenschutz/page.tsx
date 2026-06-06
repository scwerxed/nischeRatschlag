import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO – Google AdSense, Hosting, Cookies und deine Rechte.',
  alternates: { canonical: '/datenschutz' },
};

const KONTAKT_EMAIL = 'gabriel.seebacher@gmail.com';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-bold mb-3 text-gray-900">{title}</h2>
      <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function DatenschutzPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="eyebrow mb-2">Rechtliches</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Datenschutzerklärung</h1>
      <p className="text-gray-500 mb-10">
        Wir nehmen den Schutz deiner Daten ernst. Nachfolgend informieren wir dich gemäß
        Datenschutz-Grundverordnung (DSGVO) über die Verarbeitung personenbezogener Daten.
      </p>

      <Section title="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist der im{' '}
          <a href="/impressum" className="text-green-700 hover:underline">Impressum</a> genannte
          Medieninhaber. Kontakt:{' '}
          <a href={`mailto:${KONTAKT_EMAIL}`} className="text-green-700 hover:underline">{KONTAKT_EMAIL}</a>
        </p>
      </Section>

      <Section title="2. Hosting (Vercel)">
        <p>
          Diese Website wird bei der Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA)
          gehostet. Beim Aufruf der Website werden automatisch technische Zugriffsdaten in
          Server-Logfiles verarbeitet: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite,
          Browsertyp und Betriebssystem. Dies ist technisch notwendig, um die Website
          auszuliefern und ihre Sicherheit zu gewährleisten (Rechtsgrundlage:
          Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse). Mit Vercel besteht ein
          Auftragsverarbeitungsvertrag; die Übermittlung in die USA erfolgt auf Basis der
          EU-Standardvertragsklauseln.
        </p>
      </Section>

      <Section title="3. Cookies & Einwilligung">
        <p>
          Für Werbe-Cookies holen wir vorab deine Einwilligung über eine von Google zertifizierte
          Plattform zur Einwilligungsverwaltung (Consent Management Platform, CMP) ein
          (Art. 6 Abs. 1 lit. a DSGVO). Beim ersten Besuch aus dem EWR, dem Vereinigten Königreich
          oder der Schweiz erscheint ein entsprechendes Einwilligungsfenster mit den Optionen
          „Einwilligen“, „Nicht einwilligen“ und „Optionen verwalten“. Deine Auswahl kannst du
          jederzeit über dieses Fenster ändern.
        </p>
      </Section>

      <Section title="4. Google AdSense">
        <p>
          Diese Website nutzt Google AdSense, einen Dienst der Google Ireland Limited
          (Gordon House, Barrow Street, Dublin 4, Irland), zur Einbindung von Werbeanzeigen.
          Google verwendet Cookies und vergleichbare Technologien, um Anzeigen auszuspielen und
          deren Auslieferung zu messen. Dabei können Daten wie deine IP-Adresse, Geräteinformationen
          und dein Nutzungsverhalten verarbeitet werden.
        </p>
        <p>
          In der EU/im EWR werden personalisierte Anzeigen nur ausgespielt, wenn du über die
          Einwilligungsabfrage (Google-zertifizierte CMP mit Consent Mode v2) zustimmst. Ohne
          Einwilligung werden – soweit möglich – nur nicht-personalisierte Anzeigen ausgeliefert.
          Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
        </p>
        <p>
          Mehr Informationen und Widerspruchsmöglichkeiten:{' '}
          <a href="https://policies.google.com/technologies/ads?hl=de" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
            Google – Werbung
          </a>{' '}
          und{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
            Google Anzeigeneinstellungen
          </a>.
        </p>
      </Section>

      <Section title="5. Affiliate-Links">
        <p>
          Diese Website enthält Affiliate-Links (u. a. Amazon, booking.com). Klickst du auf einen
          solchen Link, kann der jeweilige Partner Cookies setzen, um einen Kaufabschluss uns
          zuzuordnen. Wir erhalten in diesem Fall eine Provision – für dich entstehen keine
          Mehrkosten. Es werden dabei keine Daten von uns an die Partner übermittelt, die über
          den Klick hinausgehen.
        </p>
      </Section>

      <Section title="6. Externe Dienste & Karten">
        <p>
          Auf den Karten- und Routenseiten binden wir Kartenmaterial und Daten externer Anbieter
          ein: OpenStreetMap, OpenTopoMap, Waymarked Trails, Overpass API, BRouter sowie das
          Wetter-API Open-Meteo. Beim Laden dieser Inhalte wird deine IP-Adresse an den jeweiligen
          Anbieter übermittelt, was technisch notwendig ist, um die Inhalte anzuzeigen
          (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </Section>

      <Section title="7. Newsletter">
        <p>
          Wenn du dich für den Newsletter anmeldest, verarbeiten wir deine E-Mail-Adresse
          ausschließlich zum Versand der Informationen, in die du eingewilligt hast
          (Art. 6 Abs. 1 lit. a DSGVO). Du kannst dich jederzeit über den Abmeldelink abmelden.
        </p>
      </Section>

      <Section title="8. Deine Rechte">
        <p>
          Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung, Datenübertragbarkeit sowie auf Widerspruch gegen die Verarbeitung.
          Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen.
          Wende dich dazu an{' '}
          <a href={`mailto:${KONTAKT_EMAIL}`} className="text-green-700 hover:underline">{KONTAKT_EMAIL}</a>.
        </p>
      </Section>

      <Section title="9. Beschwerderecht">
        <p>
          Du hast das Recht, dich bei einer Aufsichtsbehörde zu beschweren. In Österreich ist dies
          die Österreichische Datenschutzbehörde (dsb.gv.at), in Deutschland die jeweils zuständige
          Landesdatenschutzbehörde.
        </p>
      </Section>

      <p className="text-xs text-gray-400 mt-10">
        Stand: {new Date().toLocaleDateString('de-AT', { month: 'long', year: 'numeric' })}
      </p>
    </div>
  );
}
