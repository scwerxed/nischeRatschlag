import RoutenplanerWrapper from '@/app/ui/routenplaner-wrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Routenplaner – Wanderrouten in Österreich',
  description: 'Plane deine Wanderroute in Österreich – Wegpunkte setzen, Distanz, Gehzeit & Höhenprofil berechnen.',
};

export default function RoutenplanerPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-14 md:py-section">
      <p className="eyebrow mb-2">Tour planen</p>
      <h1 className="font-serif text-display font-bold mb-2 text-ink">Routenplaner</h1>
      <p className="text-ink-soft mb-8 max-w-2xl">
        Klick auf die Karte, um Wegpunkte zu setzen – die Route folgt automatisch dem nächsten
        Wanderweg, samt Distanz, Gehzeit und Höhenprofil.
      </p>
      <RoutenplanerWrapper />
      <p className="text-fine text-ink-soft mt-3">
        Kartendaten: © OpenStreetMap · Wanderwege: © Waymarked Trails · Routing: BRouter
      </p>
    </div>
  );
}
