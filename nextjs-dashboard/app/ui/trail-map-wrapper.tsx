'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import type { Trail } from '@/app/lib/posts';

const TrailMapClient = dynamic(() => import('@/app/ui/trail-map-client'), {
  ssr: false,
  loading: () => (
    <div className="h-[380px] bg-parchment flex items-center justify-center text-ink-soft text-sm rounded-sm">
      Karte wird geladen…
    </div>
  ),
});

export default function TrailMapWrapper({ trails }: { trails: Trail[] }) {
  return <TrailMapClient trails={trails} />;
}
