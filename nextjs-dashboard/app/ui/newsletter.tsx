'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('done');
        setEmail('');
      } else {
        setError(data?.error ?? 'Die Anmeldung hat gerade nicht geklappt.');
        setStatus('error');
      }
    } catch {
      setError('Keine Verbindung zum Server. Bitte prüf deine Internetverbindung.');
      setStatus('error');
    }
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
            <span className="text-xs font-semibold uppercase tracking-wider text-green-200">Newsletter</span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">Die besten Österreich-Tipps per Mail</h2>
          <p className="text-green-100 text-sm mb-7 leading-relaxed max-w-md mx-auto">
            Geheime Badestellen, neue Wanderrouten und Spar-Tipps für deinen Urlaub.
            Nach der Anmeldung bekommst du eine Bestätigungsmail – erst mit dem Klick darin
            bist du dabei.
          </p>

          {status === 'done' ? (
            <div className="bg-white/10 border border-white/20 px-5 py-4 text-sm inline-flex items-start gap-2 text-left" style={{ borderRadius: 8 }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-300 shrink-0 mt-0.5">
                <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>
                Fast geschafft! Wir haben dir eine Bestätigungsmail geschickt –
                bitte klick den Link darin. Falls nichts ankommt: kurz im Spam-Ordner nachsehen.
              </span>
            </div>
          ) : (
            <>
              <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.at"
                  aria-label="E-Mail-Adresse"
                  aria-invalid={status === 'error'}
                  disabled={status === 'sending'}
                  className="flex-1 px-4 py-3 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-sand-300 bg-white disabled:opacity-70" style={{ borderRadius: 6 }}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="bg-sand-200 text-green-900 font-semibold text-sm px-6 py-3 hover:bg-sand-100 active:bg-sand-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed" style={{ borderRadius: 6 }}
                >
                  {status === 'sending' ? 'Wird gesendet …' : 'Anmelden'}
                </button>
              </form>

              {status === 'error' && (
                <p role="alert" className="mt-3 text-sm text-sand-100 bg-red-900/30 border border-red-300/30 px-4 py-2.5 inline-block" style={{ borderRadius: 6 }}>
                  {error}
                </p>
              )}
            </>
          )}

          <p className="text-green-200/70 text-xs mt-4">
            Kein Spam · Jederzeit abbestellbar ·{' '}
            <a href="/datenschutz" className="underline hover:text-green-100">Datenschutz</a>
          </p>
        </div>
      </div>
    </div>
  );
}
