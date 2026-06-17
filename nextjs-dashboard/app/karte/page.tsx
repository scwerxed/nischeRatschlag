import MapWrapper from '@/app/ui/map-wrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interaktive Wanderkarte',
  description: 'Interaktive Karte mit Wanderwegen, Gipfeln und Unterkünften – aktuell mit Fokus Kärnten, weitere österreichische Regionen folgen.',
};

export default function KartePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">Interaktive Wanderkarte</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Wanderwege, Gipfel und Unterkünfte (aktuell Fokus Kärnten) — Karte, Topografie und Layer rechts oben ein-/ausblenden
          </p>
        </div>
      </div>

      <MapWrapper />

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5">
        <span className="text-xs text-gray-400">
          © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">OpenStreetMap</a>
        </span>
        <span className="text-xs text-gray-400">
          Wanderwege: <a href="https://hiking.waymarkedtrails.org" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">Waymarked Trails</a>
        </span>
        <span className="text-xs text-gray-400">
          Topo: <a href="https://opentopomap.org" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">OpenTopoMap</a>
        </span>
        <span className="text-xs text-gray-400">
          Gipfel: <a href="https://overpass-api.de" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">Overpass API</a>
        </span>
      </div>
    </div>
  );
}
