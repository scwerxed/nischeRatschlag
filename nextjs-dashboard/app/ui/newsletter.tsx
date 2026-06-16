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
    <div className="bg-green-800 text-white px-6 py-12 border-l-4 border-sand-300">
      <div className="max-w-xl mx-auto text-center">
        <p className="eyebrow text-green-300 mb-3">Newsletter · In Vorbereitung</p>
        <h2 className="font-serif text-2xl font-bold mb-2">Die besten Österreich-Tipps per Mail</h2>
        <p className="text-green-100 text-sm mb-6 leading-relaxed">
          Geheime Badestellen, neue Wanderrouten und Spar-Tipps für deinen Urlaub.
          Der Newsletter ist gerade in Vorbereitung – trag dich ein und sei beim Start dabei.
        </p>

        {done ? (
          <div className="bg-white/10 border border-white/20 px-4 py-3 text-sm">
            Danke für dein Interesse! Wir melden uns, sobald der Newsletter startet.
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.at"
              className="flex-1 px-4 py-2.5 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-sand-300"
            />
            <button
              type="submit"
              className="bg-sand-200 text-green-900 font-semibold text-sm px-6 py-2.5 hover:bg-sand-100 transition-colors"
            >
              Vormerken
            </button>
          </form>
        )}
        <p className="text-green-200 text-xs mt-3">Kein Spam, jederzeit abbestellbar.</p>
      </div>
    </div>
  );
}
