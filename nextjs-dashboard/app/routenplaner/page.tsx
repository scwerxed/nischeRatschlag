import RoutenplanerWrapper from '@/app/ui/routenplaner-wrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Routenplaner Kärnten',
  description: 'Plane deine Wanderroute in Kärnten – Wegpunkte setzen, Distanz & Dauer berechnen.',
};

export default function RoutenplanerPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Routenplaner</h1>
      <p className="text-gray-500 mb-8">
        Klick auf die Karte um Wegpunkte zu setzen. Die Route wird automatisch berechnet.
      </p>
      <RoutenplanerWrapper />
      <p className="text-xs text-gray-400 mt-3">
        Kartendaten: © OpenStreetMap | Wanderwege: © Waymarked Trails | Routing: OpenRouteService
      </p>
    </div>
  );
}
