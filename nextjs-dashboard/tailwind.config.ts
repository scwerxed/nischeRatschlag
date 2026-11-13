import type { Config } from 'tailwindcss';

/**
 * Design-System „Wanderführer“ (seit 2026-11-13).
 *
 * Leitbild: ein gedruckter Alpen-Führer bzw. eine Wanderkarte – Papierton statt Weiß,
 * dunkle Tinte, eckige Formen, Hairlines statt Schatten. Marke bleibt Forest-Green;
 * dazu EIN Signalton (`signal`, das Rot der rot-weiß-roten Wegmarkierung), sparsam.
 * Schriften: `font-serif` = Display-Grotesk für Überschriften (Name historisch),
 * `font-sans` = Oberfläche, `font-reading` = Artikel-Fließtext, `font-mono` = Labels/Messwerte.
 */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        reading: ['var(--font-reading)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Eigene, leicht entsättigte Forest-/Pine-Green-Palette
        // (ersetzt das generische Tailwind-Neongrün)
        green: {
          50:  '#f2f7f4',
          100: '#e0ede7',
          200: '#c2dbcf',
          300: '#99c1ae',
          400: '#69a288',
          500: '#46856b',
          600: '#2f6b54',  // Primär (Buttons, Links) – der EINE Akzent
          700: '#255744',  // Hover / dunkel
          800: '#1f4738',
          900: '#1b3b2f',
        },
        // Warmer Sand-Akzent für editoriale Kontraste
        sand: {
          50:  '#efeadf',
          100: '#e9e2d3',
          200: '#e6d8c3',
          300: '#d4bd9c',
        },
        // ── Neutrale Systemfarben (Apple-Grammatik, warm getönt) ──
        ink: {
          DEFAULT: '#161d19',   // Fließtext & Headlines
          muted:   '#37413b',   // sekundär
          soft:    '#66706a',   // tertiär / Captions
        },
        canvas: '#ffffff',
        paper: '#f7f4ed',       // Seitenhintergrund (Papier)
        parchment: '#efeadf',   // ruhige Sektionsfläche (= sand-50)
        signal: {               // Rot der Wegmarkierung – nur als Akzent
          DEFAULT: '#c4412a',
          dark:    '#a23320',
        },
        hairline: '#d9d3c5',    // 1px-Trennlinie statt Schatten
        'divider-soft': '#e8e3d7',
      },
      fontSize: {
        // Apple-Skala: Display mit negativem Tracking, Body bei 17px/1.47
        'hero':     ['60px', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display':  ['42px', { lineHeight: '1.06', letterSpacing: '-0.028em' }],
        'display-sm':['32px',{ lineHeight: '1.1', letterSpacing: '-0.024em' }],
        'lead':     ['26px', { lineHeight: '1.18',  letterSpacing: '-0.02em' }],
        'lead-airy':['24px', { lineHeight: '1.5',  letterSpacing: '0' }],
        'tagline':  ['20px', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        'body':     ['17px', { lineHeight: '1.5', letterSpacing: '0' }],
        'caption':  ['14.5px', { lineHeight: '1.45', letterSpacing: '0' }],
        'fine':     ['12.5px', { lineHeight: '1.35',  letterSpacing: '0' }],
      },
      borderRadius: {
        // Radius-Grammatik: nur diese Werte verwenden
        xs: '2px',
        sm: '2px',
        md: '3px',
        lg: '4px',
      },
      spacing: {
        section: '80px',
      },
      maxWidth: {
        // Lesebreite für Fließtext (~68 Zeichen bei 17px)
        prose: '68ch',
      },
      letterSpacing: {
        tightish: '-0.015em',
      },
      transitionTimingFunction: {
        // Apple-typisches, ruhiges Easing
        apple: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
    keyframes: {
      shimmer: {
        '100%': { transform: 'translateX(100%)' },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
