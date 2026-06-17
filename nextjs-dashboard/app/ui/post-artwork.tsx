// Generatives, gebrandetes Landschaftsmotiv pro Artikel.
// Deterministisch aus dem Slug (kein Math.random → SSR/CSR identisch, keine
// Hydration-Mismatches), variiert nach Kategorie. Ersetzt fehlende Fotos durch
// ein konsistentes, markeneigenes Bild – ohne Assets/Lizenzen.

type Props = { seed: string; category?: string; className?: string };

const PALETTES: Record<string, { sky: [string, string]; sun: string; ranges: string[]; lake?: string }> = {
  Wandern:    { sky: ['#cfe6da', '#8fbaa3'], sun: '#fdf6e3', ranges: ['#5e9079', '#3c6f58', '#244c3b'] },
  Baden:      { sky: ['#cfe8f3', '#92c4dd'], sun: '#fff3d0', ranges: ['#6fa088', '#3c6f58', '#244c3b'], lake: '#3f9ec6' },
  Ausflug:    { sky: ['#fbe7cb', '#edb974'], sun: '#fff2cf', ranges: ['#7e9b84', '#4d7a60', '#244c3b'] },
  Unterkunft: { sky: ['#d6e6df', '#90b3a4'], sun: '#fdf3df', ranges: ['#4f8068', '#2f6b54', '#173027'] },
};

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

const W = 400;
const H = 240;

function rangePath(rand: () => number, baseY: number, amp: number, steps: number): string {
  const pts: string[] = [`0,${H}`];
  for (let i = 0; i <= steps; i++) {
    const x = (W * i) / steps;
    const y = baseY - rand() * amp;
    pts.push(`${x.toFixed(0)},${y.toFixed(0)}`);
  }
  pts.push(`${W},${H}`);
  return 'M' + pts.join(' L') + ' Z';
}

export default function PostArtwork({ seed, category, className }: Props) {
  const pal = PALETTES[category ?? ''] ?? PALETTES.Wandern;
  const h = hash(seed);
  const rand = makeRng(h);
  const id = `pa${h.toString(36)}`;

  const sunX = 50 + rand() * 300;
  const sunY = 45 + rand() * 30;

  const back = rangePath(rand, 120, 70, 5);
  const mid = rangePath(rand, 158, 60, 6);
  const front = rangePath(rand, 196, 46, 7);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Dekoratives Landschaftsmotiv"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={pal.sky[0]} />
          <stop offset="100%" stopColor={pal.sky[1]} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id})`} />
      <circle cx={sunX.toFixed(0)} cy={sunY.toFixed(0)} r="22" fill={pal.sun} opacity="0.9" />
      <path d={back} fill={pal.ranges[0]} opacity="0.85" />
      <path d={mid} fill={pal.ranges[1]} opacity="0.92" />
      <path d={front} fill={pal.ranges[2]} />
      {pal.lake && <rect x="0" y="200" width={W} height={H - 200} fill={pal.lake} opacity="0.9" />}
    </svg>
  );
}
