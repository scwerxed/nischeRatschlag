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
    <div className="relative bg-green-900 text-white overflow-hidden rounded-sm">

      <div className="relative px-6 sm:px-12 py-12">
        <div className="max-w-2xl">
          <p className="eyebrow !text-white/70 mb-4">Newsletter</p>

          <h2 className="font-serif text-lead md:text-display-sm font-extrabold mb-3">Die besten Österreich-Tipps per Mail</h2>
          <p className="text-green-100 text-caption mb-7 max-w-md">
            Geheime Badestellen, neue Wanderrouten und Spar-Tipps für deinen Urlaub.
            Nach der Anmeldung bekommst du eine Bestätigungsmail – erst mit dem Klick darin
            bist du dabei.
          </p>

          {status === 'done' ? (
            <div className="bg-white/10 border border-white/20 px-5 py-4 text-caption inline-flex items-start gap-2 text-left rounded-lg">
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
              <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.at"
                  aria-label="E-Mail-Adresse"
                  aria-invalid={status === 'error'}
                  disabled={status === 'sending'}
                  className="flex-1 px-5 py-3 text-ink text-caption outline-none focus-visible:ring-2 focus-visible:ring-sand-300 bg-canvas disabled:opacity-70 rounded-sm"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn bg-sand-200 text-green-900 font-semibold text-caption hover:bg-sand-100 active:bg-sand-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Wird gesendet …' : 'Anmelden'}
                </button>
              </form>

              {status === 'error' && (
                <p role="alert" className="mt-3 text-caption text-sand-100 bg-red-900/30 border border-red-300/30 px-4 py-2.5 inline-block rounded-sm">
                  {error}
                </p>
              )}
            </>
          )}

          <p className="text-green-200/70 text-fine mt-4">
            Kein Spam · Jederzeit abbestellbar ·{' '}
            <a href="/datenschutz" className="underline hover:text-green-100">Datenschutz</a>
          </p>
        </div>
      </div>
    </div>
  );
}
