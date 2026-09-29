'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FEATURES, type Badeplatz, type FeatureKey } from '@/app/lib/badeplaetze';

// Interaktiver Badeplatz-Check: Chips togglen Eigenschaften (UND-Logik).
export default function BadeplatzFilter({ plaetze }: { plaetze: Badeplatz[] }) {
  const [active, setActive] = useState<FeatureKey[]>([]);

  const toggle = (k: FeatureKey) =>
    setActive((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));

  const filtered = useMemo(
    () => plaetze.filter((p) => active.every((k) => p.features.includes(k))),
    [plaetze, active]
  );

  return (
    <div>
      {/* Filter-Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(FEATURES) as FeatureKey[]).map((k) => (
          <button
            key={k}
            onClick={() => toggle(k)}
            aria-pressed={active.includes(k)}
            className={`text-caption font-medium px-4 py-1.5 border transition-colors ${ active.includes(k) ? 'bg-sky-600 border-sky-600 text-white' : 'bg-white border-hairline text-ink-muted hover:border-sky-400 hover:text-sky-700' } rounded-full`}
          >
            {FEATURES[k].icon} {FEATURES[k].label}
          </button>
        ))}
        {active.length > 0 && (
          <button
            onClick={() => setActive([])}
            className="text-caption font-medium px-4 py-1.5 text-ink-soft hover:text-ink-muted"
          >
            Zurücksetzen ✕
          </button>
        )}
      </div>

      <p className="text-caption text-ink-soft mb-5">{filtered.length} von {plaetze.length} Badeplätzen</p>

      {filtered.length === 0 ? (
        <div className="text-center py-14 text-ink-soft">
          <p>Kein Badeplatz erfüllt alle gewählten Kriterien – nimm einen Filter raus.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <div key={`${p.name}-${p.see}`} className="border border-hairline p-5 rounded-lg">
              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                <h2 className="font-serif text-tagline font-bold text-ink leading-snug">
                  {p.slug ? (
                    <Link href={`/blog/${p.slug}`} className="text-green-700 hover:underline">{p.name}</Link>
                  ) : (
                    p.name
                  )}
                </h2>
                <span className="text-fine text-ink-soft whitespace-nowrap">{p.see} · {p.region}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {p.features.map((k) => (
                  <span key={k} className="text-fine font-medium px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-full">
                    {FEATURES[k].icon} {FEATURES[k].label}
                  </span>
                ))}
              </div>
              <p className="text-caption text-ink-muted mt-2.5 leading-relaxed">{p.hinweis}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
