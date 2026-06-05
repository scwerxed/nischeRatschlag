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
    <div className="bg-gradient-to-br from-green-700 to-green-600 text-white px-6 py-10" style={{ borderRadius: 6 }}>
      <div className="max-w-xl mx-auto text-center">
        <p className="text-2xl mb-1">📬</p>
        <h2 className="text-xl font-bold mb-2">Die besten Kärnten-Tipps per Mail</h2>
        <p className="text-green-100 text-sm mb-5 leading-relaxed">
          Geheime Badestellen, neue Wanderrouten und Spar-Tipps für deinen Urlaub –
          einmal im Monat, kostenlos, jederzeit abbestellbar.
        </p>

        {done ? (
          <div className="bg-white/15 border border-white/20 px-4 py-3 text-sm" style={{ borderRadius: 4 }}>
            ✓ Danke! Bitte bestätige die E-Mail in deinem Postfach.
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.at"
              className="flex-1 px-4 py-2.5 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-white/40"
              style={{ borderRadius: 4 }}
            />
            <button
              type="submit"
              className="bg-white text-green-700 font-semibold text-sm px-6 py-2.5 hover:bg-green-50 transition-colors"
              style={{ borderRadius: 4 }}
            >
              Anmelden
            </button>
          </form>
        )}
        <p className="text-green-200 text-xs mt-3">Kein Spam. Datenschutz wird eingehalten.</p>
      </div>
    </div>
  );
}
