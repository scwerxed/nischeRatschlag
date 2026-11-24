import type { SeeMesswert } from '@/app/lib/seen-messstellen';

// Trend-Zeile unter einem Live-Wert der Seen: Veränderung gegenüber dem Vergleichswert von etwa einem Tag
// vorher (`vorher` aus /api/seewetter – nur die Messnetze Kärnten und Oberösterreich liefern einen Verlauf).
// Immer mit Datum und Uhrzeit des Vergleichswerts, weil der Abstand je Station zwischen 12 und 36 Stunden
// liegt. Ohne Vergleichswert (z. B. Salzburg) wird nichts angezeigt.
// Genutzt von /wassertemperatur, den Seen-Steckbriefen und der „Wassertemperatur live“-Karte im Artikel.

function formatZeit(iso: string): string {
  return new Date(iso).toLocaleString('de-AT', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Vienna',
  });
}

export default function SeeTrend({ wert, className = '' }: { wert: SeeMesswert; className?: string }) {
  const vorher = wert.vorher;
  if (!vorher || typeof vorher.wasser !== 'number' || typeof vorher.stand !== 'string') return null;

  const diff = Math.round((wert.wasser - vorher.wasser) * 10) / 10;
  const seit = `seit ${formatZeit(vorher.stand)} Uhr`;
  if (diff === 0) return <span className={className}>unverändert {seit}</span>;

  const betrag = Math.abs(diff).toLocaleString('de-AT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const waermer = diff > 0;
  return (
    <span className={className}>
      <span aria-hidden className={waermer ? 'text-amber-700' : 'text-sky-700'}>
        {waermer ? '↑' : '↓'}{' '}
      </span>
      {betrag}&nbsp;°C {waermer ? 'wärmer' : 'kühler'} {seit}
    </span>
  );
}
