'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;
    try {
      localStorage.setItem('nische-newsletter', email);
    } catch {}
    setDone(true);
  }

  return (
    <div className="relative bg-green-800 text-white overflow-hidden" style={{ borderRadius: 12 }}>
      {/* Decorative mountain silhouette */}
      <svg className="absolute bottom-0 left-0 right-0 text-green-900/30" viewBox="0 0 800 120" preserveAspectRatio="none" style={{ height: 120 }}>
        <path d="M0 120 L0 80 L150 30 L250 70 L350 20 L450 60 L550 10 L650 50 L800 20 L800 120 Z" fill="currentColor" />
      </svg>

      <div className="relative px-6 py-14">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1.5 mb-5" style={{ borderRadius: 20 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-sand-300">
              <rect x="1" y="3" width="14" height="10" rx="1" />
              <path d="M1 3l7 5 7-5" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-200">Newsletter · In Vorbereitung</span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">Die besten Österreich-Tipps per Mail</h2>
          <p className="text-green-100 text-sm mb-7 leading-relaxed max-w-md mx-auto">
            Geheime Badestellen, neue Wanderrouten und Spar-Tipps für deinen Urlaub.
            Der Newsletter ist gerade in Vorbereitung – trag dich ein und sei beim Start dabei.
          </p>

          {done ? (
            <div className="bg-white/10 border border-white/20 px-5 py-4 text-sm inline-flex items-center gap-2" style={{ borderRadius: 8 }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-300 shrink-0">
                <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Danke für dein Interesse! Wir melden uns, sobald der Newsletter startet.
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.at"
                className="flex-1 px-4 py-3 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-sand-300 bg-white" style={{ borderRadius: 6 }}
              />
              <button
                type="submit"
                className="bg-sand-200 text-green-900 font-semibold text-sm px-6 py-3 hover:bg-sand-100 active:bg-sand-300 transition-colors" style={{ borderRadius: 6 }}
              >
                Vormerken
              </button>
            </form>
          )}
          <p className="text-green-200/70 text-xs mt-4">Kein Spam · Jederzeit abbestellbar · Daten nur bei uns</p>
        </div>
      </div>
    </div>
  );
}
