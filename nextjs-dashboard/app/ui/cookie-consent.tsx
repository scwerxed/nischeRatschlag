'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'nische-consent-v1';

type Choice = 'all' | 'necessary';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

function applyConsent(choice: Choice) {
  if (typeof window === 'undefined' || !window.gtag) return;
  const granted = choice === 'all' ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
    analytics_storage: granted,
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Choice | null;
    if (saved) {
      applyConsent(saved);
    } else {
      setVisible(true);
    }
    // Über den Footer-Link erneut öffnen
    const reopen = () => setVisible(true);
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  function choose(choice: Choice) {
    localStorage.setItem(STORAGE_KEY, choice);
    applyConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[2000] p-3 sm:p-4">
      <div className="max-w-3xl mx-auto bg-white border border-gray-300 shadow-xl p-5" style={{ borderRadius: 6 }}>
        <h2 className="font-serif text-lg font-bold text-gray-900 mb-1.5">Cookies &amp; Datenschutz</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Wir verwenden technisch notwendige Cookies sowie – mit deiner Einwilligung – Cookies für
          Werbung (Google AdSense), um diese Seite kostenlos anbieten zu können. Details findest du in
          unserer{' '}
          <Link href="/datenschutz" className="text-green-700 underline">Datenschutzerklärung</Link>.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => choose('all')}
            className="flex-1 bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors"
            style={{ borderRadius: 4 }}
          >
            Alle akzeptieren
          </button>
          <button
            onClick={() => choose('necessary')}
            className="flex-1 border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2.5 hover:border-green-600 hover:text-green-700 transition-colors"
            style={{ borderRadius: 4 }}
          >
            Nur notwendige
          </button>
        </div>
      </div>
    </div>
  );
}
