'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const RoutenplanerClient = dynamic(() => import('@/app/ui/routenplaner-client'), {
  ssr: false,
  loading: () => (
    <div className="h-[560px] rounded-xl bg-parchment flex items-center justify-center text-ink-soft text-sm">
      Karte wird geladen…
    </div>
  ),
});

export default function RoutenplanerWrapper() {
  return <RoutenplanerClient />;
}
