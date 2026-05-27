import MapWrapper from '@/app/ui/map-wrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wanderkarte Kärnten',
  description: 'Interaktive Karte mit Wanderwegen und Gipfeln in Kärnten.',
};

export default function KartePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Wanderkarte Kärnten</h1>
      <p className="text-gray-500 mb-6">
        Wanderwege und Gipfel in Kärnten. Grüne Punkte = benannte Gipfel. Layer rechts oben zum Ein-/Ausblenden.
      </p>
      <MapWrapper />
      <p className="text-xs text-gray-400 mt-3">
        Kartendaten: © OpenStreetMap | Wanderwege: © Waymarked Trails | Gipfeldaten: Overpass API
      </p>
    </div>
  );
}
