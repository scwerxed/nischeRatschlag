// Generatives, gebrandetes Landschaftsmotiv pro Artikel.
//
// Deterministisch aus dem Slug (kein Math.random → SSR/CSR identisch, keine
// Hydration-Mismatches). Ersetzt fehlende Fotos durch ein konsistentes,
// markeneigenes Bild – ohne Assets/Lizenzen.
//
// Die erste Fassung zeichnete für jeden Artikel dieselbe Komposition (drei
// verrauschte Grate + Sonne) und variierte nur die Palette – im Grid sahen
// alle Karten gleich aus. Jetzt entscheidet der Slug zusätzlich über
// Bildaufbau (Archetyp), Tageszeit und Staffage, sodass Motive auch
// nebeneinander unterscheidbar bleiben.

type Props = { seed: string; category?: string; className?: string };

const W = 400;
const H = 240;

/* ── Farbwelten ──────────────────────────────────────────────────────────
   Tageszeit liefert Himmel + Licht, Kategorie die Bergfarben. So bleibt die
   Marke erkennbar (immer Forest-Green-Berge), während der Himmel variiert. */

type Mood = { sky: [string, string, string]; light: string; glow: string; water: string };

const MOODS: Record<string, Mood> = {
  klar:   { sky: ['#d9ecf5', '#b9d9e6', '#cfe3dc'], light: '#fffaf0', glow: '#ffffff', water: '#4f9fc4' },
  dunst:  { sky: ['#e6eeef', '#cddcdd', '#dde6df'], light: '#fdf8ec', glow: '#f4f7f3', water: '#6ea3b5' },
  morgen: { sky: ['#fbe6d2', '#f6cfae', '#e8d3bd'], light: '#fff6e4', glow: '#ffe7c4', water: '#7fb0bf' },
  abend:  { sky: ['#f4d5bd', '#e3aa92', '#c79383'], light: '#ffedcf', glow: '#ffcfa3', water: '#5d8fa8' },
  kuehl:  { sky: ['#dbe9e4', '#b4cfc6', '#c6dad2'], light: '#f7fbf5', glow: '#e8f2ec', water: '#3f8fa8' },
};
const MOOD_KEYS = Object.keys(MOODS);

/** Bergfarben je Kategorie, hinten (hell/dunstig) nach vorne (dunkel). */
const RANGES: Record<string, string[]> = {
  Wandern:    ['#9dbcaa', '#6b9a80', '#43775f', '#23493a'],
  Baden:      ['#a7c4bb', '#74a28c', '#477f66', '#22493b'],
  Ausflug:    ['#adbfa5', '#7e9b78', '#55795c', '#254b38'],
  Unterkunft: ['#a3bbb0', '#6f9a86', '#417a63', '#1f4335'],
};

/* ── Deterministischer Zufall ────────────────────────────────────────── */

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeRng(seed: number): () => number {
  let s = seed || 1;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Silhouetten ─────────────────────────────────────────────────────────
   Zwei Grundformen: weiche Hügel (Sinus-Überlagerung) und Gipfel (echte
   Spitzen). Beide liefern nur die Oberkante; geschlossen wird nach unten. */

type Crest = { x: number; y: number }[];

function rollingCrest(rand: () => number, baseY: number, amp: number): Crest {
  const f1 = 0.8 + rand() * 1.4;
  const f2 = 2.1 + rand() * 2.2;
  const f3 = 4.0 + rand() * 3.0;
  const p1 = rand() * 6.283;
  const p2 = rand() * 6.283;
  const p3 = rand() * 6.283;
  const pts: Crest = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const n =
      0.58 * Math.sin(f1 * t * 6.283 + p1) +
      0.28 * Math.sin(f2 * t * 6.283 + p2) +
      0.14 * Math.sin(f3 * t * 6.283 + p3);
    pts.push({ x: W * t, y: baseY - n * amp });
  }
  return pts;
}

function peakCrest(rand: () => number, baseY: number, amp: number): Crest {
  const n = 2 + Math.floor(rand() * 3); // 2–4 Gipfel
  const pts: Crest = [{ x: 0, y: baseY + amp * 0.25 }];
  for (let i = 0; i < n; i++) {
    const seg = W / n;
    const peakX = seg * i + seg * (0.3 + rand() * 0.4);
    const peakY = baseY - amp * (0.55 + rand() * 0.45);
    const saddleY = baseY + amp * (rand() * 0.3);
    pts.push({ x: peakX - seg * 0.12, y: (peakY + saddleY) / 2 });
    pts.push({ x: peakX, y: peakY });
    pts.push({ x: peakX + seg * 0.14, y: (peakY + saddleY) / 2 });
    pts.push({ x: seg * (i + 1), y: saddleY });
  }
  pts.push({ x: W, y: baseY + amp * 0.2 });
  return pts;
}

const toPath = (c: Crest) =>
  `M0,${H} L` + c.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L') + ` L${W},${H} Z`;

/** Gespiegelte Silhouette für die Wasserfläche. */
const toMirrored = (c: Crest, waterY: number) =>
  `M0,${waterY} L` +
  c.map((p) => `${p.x.toFixed(1)},${(2 * waterY - p.y).toFixed(1)}`).join(' L') +
  ` L${W},${waterY} Z`;

/** Höhe der Silhouette an Position x – damit Staffage auf dem Grat sitzt. */
function crestY(c: Crest, x: number): number {
  for (let i = 1; i < c.length; i++) {
    if (c[i].x >= x) {
      const a = c[i - 1];
      const b = c[i];
      const t = b.x === a.x ? 0 : (x - a.x) / (b.x - a.x);
      return a.y + (b.y - a.y) * t;
    }
  }
  return c[c.length - 1].y;
}

export default function PostArtwork({ seed, category, className }: Props) {
  const ranges = RANGES[category ?? ''] ?? RANGES.Wandern;
  const h = hash(seed);
  const rand = makeRng(h);
  const id = `pa${h.toString(36)}`;

  const mood = MOODS[MOOD_KEYS[h % MOOD_KEYS.length]];

  // Archetyp: Baden bekommt fast immer Wasser, Wandern eher Gipfel.
  const roll = rand();
  const hasWater = category === 'Baden' ? roll < 0.85 : roll < 0.3;
  const sharp = category === 'Wandern' ? rand() < 0.65 : rand() < 0.35;

  // Horizont wandert, damit nicht jedes Bild gleich „hoch" wirkt.
  const waterY = hasWater ? 168 + rand() * 30 : H;
  const horizon = hasWater ? waterY : 150 + rand() * 40;

  const layers = hasWater ? 2 : 2 + Math.round(rand());
  const crests: Crest[] = [];
  for (let i = 0; i < layers; i++) {
    const depth = i / Math.max(1, layers - 1);
    const baseY = horizon - (1 - depth) * 46 - 8;
    const amp = (sharp && i === layers - 1 ? 54 : 34) - depth * 8;
    crests.push(sharp && i === layers - 1 ? peakCrest(rand, baseY, amp) : rollingCrest(rand, baseY, amp));
  }

  // Lichtquelle: tief bei Abend/Morgen, hoch bei Tag.
  const lowLight = mood === MOODS.abend || mood === MOODS.morgen;
  const sunX = 44 + rand() * 312;
  const sunY = lowLight ? 78 + rand() * 26 : 40 + rand() * 30;
  const sunR = lowLight ? 22 + rand() * 8 : 15 + rand() * 7;

  const front = crests[crests.length - 1];
  const treeCount = !hasWater && rand() < 0.55 ? 3 + Math.floor(rand() * 4) : 0;
  const trees = Array.from({ length: treeCount }, () => {
    const x = 20 + rand() * (W - 40);
    return { x, y: crestY(front, x), s: 9 + rand() * 7 };
  });
  const birds = rand() < 0.35 ? 2 + Math.floor(rand() * 2) : 0;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={mood.sky[0]} />
          <stop offset="62%" stopColor={mood.sky[1]} />
          <stop offset="100%" stopColor={mood.sky[2]} />
        </linearGradient>
        <radialGradient id={`${id}g`}>
          <stop offset="0%" stopColor={mood.glow} stopOpacity="0.85" />
          <stop offset="100%" stopColor={mood.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}h`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={mood.light} stopOpacity="0" />
          <stop offset="55%" stopColor={mood.light} stopOpacity="0.26" />
          <stop offset="100%" stopColor={mood.light} stopOpacity="0" />
        </linearGradient>
        {hasWater && (
          <linearGradient id={`${id}wv`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={mood.light} stopOpacity="0.5" />
            <stop offset="30%" stopColor={mood.water} stopOpacity="0.92" />
            <stop offset="100%" stopColor="#1f5a6e" stopOpacity="0.95" />
          </linearGradient>
        )}
        {hasWater && (
          <clipPath id={`${id}w`}>
            <rect x="0" y={waterY} width={W} height={H - waterY} />
          </clipPath>
        )}
      </defs>

      <rect width={W} height={H} fill={`url(#${id}s)`} />

      {/* Licht: weicher Schein, darin die Scheibe */}
      <circle cx={sunX.toFixed(0)} cy={sunY.toFixed(0)} r={(sunR * 3).toFixed(0)} fill={`url(#${id}g)`} />
      <circle cx={sunX.toFixed(0)} cy={sunY.toFixed(0)} r={sunR.toFixed(0)} fill={mood.light} opacity="0.95" />

      {/* Dunstband über dem Horizont – gibt Tiefe ohne harte Kante */}
      <rect x="0" y={(horizon - 38).toFixed(0)} width={W} height="52" fill={`url(#${id}h)`} />

      {/* Bergketten hinten → vorne */}
      {crests.map((c, i) => (
        <path key={i} d={toPath(c)} fill={ranges[Math.min(ranges.length - 1, ranges.length - layers + i)]} />
      ))}

      {hasWater && (
        <g clipPath={`url(#${id}w)`}>
          <rect x="0" y={waterY} width={W} height={H - waterY} fill={`url(#${id}wv)`} />
          <path d={toMirrored(front, waterY)} fill="#12332a" opacity="0.22" />
          {[0.25, 0.5, 0.78].map((f, i) => (
            <rect
              key={i}
              x={(W * 0.08 * (i + 1)).toFixed(0)}
              y={(waterY + (H - waterY) * f).toFixed(1)}
              width={(W * (0.3 + i * 0.12)).toFixed(0)}
              height="1.6"
              fill={mood.light}
              opacity="0.3"
            />
          ))}
        </g>
      )}

      {/* Nadelbäume auf dem vordersten Grat */}
      {trees.map((t, i) => (
        <path
          key={i}
          d={`M${t.x.toFixed(1)},${(t.y - t.s).toFixed(1)} L${(t.x + t.s * 0.32).toFixed(1)},${(t.y + 1).toFixed(1)} L${(t.x - t.s * 0.32).toFixed(1)},${(t.y + 1).toFixed(1)} Z`}
          fill="#1b3b2f"
          opacity="0.75"
        />
      ))}

      {Array.from({ length: birds }, (_, i) => {
        const bx = 70 + i * 34 + (h % 40);
        const by = 52 + ((h >> (i + 2)) % 26);
        return (
          <path
            key={i}
            d={`M${bx},${by} q4,-3.4 8,0 q4,-3.4 8,0`}
            fill="none"
            stroke="#2b4a3d"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.45"
          />
        );
      })}
    </svg>
  );
}
