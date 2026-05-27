'use client';

import dynamic from 'next/dynamic';

const RoutenplanerClient = dynamic(() => import('@/app/ui/routenplaner-client'), {
  ssr: false,
  loading: () => (
    <div className="h-[560px] rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
      Karte wird geladen…
    </div>
  ),
});

export default function RoutenplanerWrapper() {
  return <RoutenplanerClient />;
}
