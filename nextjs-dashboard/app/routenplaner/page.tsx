import RoutenplanerWrapper from '@/app/ui/routenplaner-wrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Routenplaner Kärnten',
  description: 'Plane deine Wanderroute in Kärnten – Wegpunkte setzen, Distanz & Dauer berechnen.',
};

export default function RoutenplanerPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <p className="eyebrow mb-2">Tour planen</p>
      <h1 className="font-serif text-4xl font-bold mb-2 text-gray-900">Routenplaner</h1>
      <p className="text-gray-500 mb-8 max-w-2xl">
        Klick auf die Karte, um Wegpunkte zu setzen – die Route folgt automatisch dem nächsten
        Wanderweg, samt Distanz, Gehzeit und Höhenprofil.
      </p>
      <RoutenplanerWrapper />
      <p className="text-xs text-gray-400 mt-3">
        Kartendaten: © OpenStreetMap · Wanderwege: © Waymarked Trails · Routing: BRouter
      </p>
    </div>
  );
}
