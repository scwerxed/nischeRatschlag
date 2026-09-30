'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FEATURES, type Badeplatz, type BadeplatzQualitaet, type FeatureKey } from '@/app/lib/badeplaetze';

const EINSTUFUNG_CLS = {
  gut: 'bg-green-100 text-green-800 border-green-200',
  mittel: 'bg-amber-100 text-amber-800 border-amber-200',
  schlecht: 'bg-red-100 text-red-800 border-red-200',
} as const;

// Interaktiver Badeplatz-Check: Chips togglen Eigenschaften (UND-Logik).
export default function BadeplatzFilter({
  plaetze,
  qualitaet = {},
}: {
  plaetze: Badeplatz[];
  qualitaet?: Record<string, BadeplatzQualitaet>;
}) {
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
              {p.agesId && qualitaet[p.agesId] && <Qualitaet q={qualitaet[p.agesId]} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Offizielle Badewasser-Qualität (AGES) der zugeordneten EU-Badestelle.
function Qualitaet({ q }: { q: BadeplatzQualitaet }) {
  return (
    <div className="mt-3 pt-3 border-t border-hairline text-fine">
      {q.gesperrt && (
        <p className="mb-2 font-semibold text-red-800 bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-sm">
          ⚠️ Badestelle derzeit gesperrt{q.sperrgrund ? `: ${q.sperrgrund}` : ''}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-ink-soft">Badewasser</span>
        {q.einstufung && (
          <span className={`font-semibold px-2 py-0.5 border ${EINSTUFUNG_CLS[q.einstufung.tone]} rounded-sm`}>
            {q.einstufung.label} ({q.einstufung.jahr})
          </span>
        )}
        {q.letzteProbe && (
          <span className="text-ink-soft">
            · Probe {q.letzteProbe}
            {q.wasser !== null && <span className="tabular-nums">: {q.wasser.toLocaleString('de-AT')} °C</span>}
          </span>
        )}
      </div>
      <p className="text-ink-soft mt-1">Messstelle: {q.messstelle}</p>
    </div>
  );
}
