import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO – Hosting, cookielose Reichweitenmessung, Google AdSense, Cookies und deine Rechte.',
  alternates: { canonical: '/datenschutz' },
};

const KONTAKT_EMAIL = 'gabriel.seebacher@gmail.com';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-tagline font-bold mb-3 text-ink">{title}</h2>
      <div className="text-ink-muted leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function DatenschutzPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-14 md:py-section">
      <p className="eyebrow mb-2">Rechtliches</p>
      <h1 className="font-serif text-display font-bold mb-3 text-ink">Datenschutzerklärung</h1>
      <p className="text-ink-soft mb-10">
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
        <p>
          Die Reichweitenmessung (Punkt 4) arbeitet ohne Cookies und ohne Speicherung in deinem
          Browser und ist daher nicht Teil dieser Einwilligungsabfrage.
        </p>
      </Section>

      <Section title="4. Reichweitenmessung (Vercel Web Analytics, PostHog)">
        <p>
          Um zu verstehen, welche Seiten gelesen werden und wo die Website verbessert werden
          muss, nutzen wir zwei Statistikdienste, die beide <strong>ohne Cookies</strong> und ohne
          Einträge im Local oder Session Storage deines Browsers arbeiten:
        </p>
        <p>
          <strong>Vercel Web Analytics und Speed Insights</strong> (Vercel Inc., siehe Punkt 2)
          zählen Seitenaufrufe und messen Ladezeiten. Besuche werden über einen kurzlebigen Hash aus
          Anfragedaten unterschieden, der nach 24 Stunden verworfen wird.
        </p>
        <p>
          <strong>PostHog</strong> (PostHog Inc., 2261 Market Street #4008, San Francisco, CA 94114,
          USA) nutzen wir in der EU-Cloud mit Serverstandort Frankfurt am Main. PostHog erfasst
          Seitenaufrufe, Klicks und Scrolltiefe (auch als Heatmap) sowie technische Angaben wie
          Browser, Betriebssystem, Gerätetyp und die verweisende Seite. Wir verwenden den
          cookielosen Modus: Zur Unterscheidung von Besuchen bildet PostHog auf dem Server einen
          Hash aus IP-Adresse, Browserkennung und einem täglich wechselnden Zufallswert, der nach der
          Verarbeitung gelöscht wird. IP-Adressen werden nicht gespeichert, Sitzungsaufzeichnungen
          sind ausgeschaltet, und es wird kein Profil über mehrere Tage oder Websites hinweg gebildet.
        </p>
        <p>
          Rechtsgrundlage ist unser berechtigtes Interesse an einer datensparsamen Reichweitenmessung
          (Art. 6 Abs. 1 lit. f DSGVO). Mit PostHog besteht ein Auftragsverarbeitungsvertrag gemäß
          Art. 28 DSGVO; soweit Daten in die USA übermittelt werden, erfolgt dies auf Basis der
          EU-Standardvertragsklauseln. Du kannst der Messung durch PostHog jederzeit widersprechen,
          indem du die Option „Do Not Track“ in deinem Browser aktivierst (wir werten sie aus) oder
          einen Skript-Blocker nutzt.
        </p>
      </Section>

      <Section title="5. Google AdSense">
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

      <Section title="6. Affiliate-Links">
        <p>
          Diese Website enthält Affiliate-Links (u. a. Amazon, booking.com). Klickst du auf einen
          solchen Link, kann der jeweilige Partner Cookies setzen, um einen Kaufabschluss uns
          zuzuordnen. Wir erhalten in diesem Fall eine Provision – für dich entstehen keine
          Mehrkosten. Es werden dabei keine Daten von uns an die Partner übermittelt, die über
          den Klick hinausgehen.
        </p>
      </Section>

      <Section title="7. Externe Dienste & Karten">
        <p>
          Auf den Karten- und Routenseiten binden wir Kartenmaterial und Daten externer Anbieter
          ein: OpenStreetMap, OpenTopoMap, Waymarked Trails, Overpass API, BRouter sowie das
          Wetter-API Open-Meteo. Beim Laden dieser Inhalte wird deine IP-Adresse an den jeweiligen
          Anbieter übermittelt, was technisch notwendig ist, um die Inhalte anzuzeigen
          (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </Section>

      <Section title="8. Newsletter">
        <p>
          Wenn du dich für den Newsletter anmeldest, verarbeiten wir deine E-Mail-Adresse
          ausschließlich zum Versand der Informationen, in die du eingewilligt hast
          (Art. 6 Abs. 1 lit. a DSGVO). Du kannst dich jederzeit über den Abmeldelink abmelden.
        </p>
        <p>
          Die Anmeldung erfolgt im Double-Opt-in-Verfahren: Nach dem Absenden des Formulars
          erhältst du eine Bestätigungsmail. Erst wenn du den darin enthaltenen Link anklickst,
          wird deine Adresse in den Verteiler aufgenommen. Bestätigst du nicht, wird die
          Adresse nicht weiter verarbeitet.
        </p>
        <p>
          Für Versand und Verwaltung des Newsletters nutzen wir Brevo (Sendinblue GmbH,
          Köpenicker Str. 126, 10179 Berlin). Deine E-Mail-Adresse sowie die zur Protokollierung
          der Einwilligung nötigen Daten werden dort gespeichert. Mit dem Anbieter besteht ein
          Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.
        </p>
      </Section>

      <Section title="9. Deine Rechte">
        <p>
          Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung, Datenübertragbarkeit sowie auf Widerspruch gegen die Verarbeitung.
          Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen.
          Wende dich dazu an{' '}
          <a href={`mailto:${KONTAKT_EMAIL}`} className="text-green-700 hover:underline">{KONTAKT_EMAIL}</a>.
        </p>
      </Section>

      <Section title="10. Beschwerderecht">
        <p>
          Du hast das Recht, dich bei einer Aufsichtsbehörde zu beschweren. In Österreich ist dies
          die Österreichische Datenschutzbehörde (dsb.gv.at), in Deutschland die jeweils zuständige
          Landesdatenschutzbehörde.
        </p>
      </Section>

      {/* Datum der letzten inhaltlichen Änderung – bei jeder Textänderung hier mitziehen
          (nicht `new Date()`: das wäre nur das Build-Datum und täuscht eine Aktualisierung vor). */}
      <p className="text-fine text-ink-soft mt-10">Stand: Oktober 2026</p>
    </div>
  );
}
