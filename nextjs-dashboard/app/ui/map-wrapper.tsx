'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import type { MapSpot } from '@/app/ui/map-client';

const MapClient = dynamic(() => import('@/app/ui/map-client'), {
  ssr: false,
  loading: () => (
    <div className="h-[560px] rounded-lg bg-parchment flex items-center justify-center text-ink-soft text-caption">
      Karte wird geladen…
    </div>
  ),
});

export default function MapWrapper({ spots }: { spots: MapSpot[] }) {
  return <MapClient spots={spots} />;
}
