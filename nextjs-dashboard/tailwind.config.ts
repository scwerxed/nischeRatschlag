import type { Config } from 'tailwindcss';

/**
 * Design-System: Apple-Design-Sprache, adaptiert auf die Marke.
 *
 * Übernommen: Typo-Skala mit negativem Tracking, Radius-Grammatik, 80px-
 * Sektionsrhythmus, Hairline statt Schatten, EIN Akzent.
 * Adaptiert: Akzent ist unser Forest-Green (nicht Apple-Blau), das Parchment
 * ist warm (Sand) statt kühlgrau — passt zu Natur/Reise —, und Headlines
 * bleiben Serif (Markenidentität).
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
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lusitana)', 'Georgia', 'serif'],
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
          50:  '#faf7f2',
          100: '#f3ece0',
          200: '#e6d8c3',
          300: '#d4bd9c',
        },
        // ── Neutrale Systemfarben (Apple-Grammatik, warm getönt) ──
        ink: {
          DEFAULT: '#1d1d1f',   // Fließtext & Headlines
          muted:   '#3a3a3c',   // sekundär
          soft:    '#6e6e73',   // tertiär / Captions
        },
        canvas: '#ffffff',
        parchment: '#faf7f2',   // ruhige Sektionsfläche (= sand-50)
        hairline: '#e5e1da',    // 1px-Trennlinie statt Schatten
        'divider-soft': '#f0ede7',
      },
      fontSize: {
        // Apple-Skala: Display mit negativem Tracking, Body bei 17px/1.47
        'hero':     ['56px', { lineHeight: '1.07', letterSpacing: '-0.02em' }],
        'display':  ['40px', { lineHeight: '1.1',  letterSpacing: '-0.018em' }],
        'display-sm':['34px',{ lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'lead':     ['28px', { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'lead-airy':['24px', { lineHeight: '1.5',  letterSpacing: '0' }],
        'tagline':  ['21px', { lineHeight: '1.25', letterSpacing: '-0.005em' }],
        'body':     ['17px', { lineHeight: '1.47', letterSpacing: '-0.011em' }],
        'caption':  ['14px', { lineHeight: '1.43', letterSpacing: '-0.016em' }],
        'fine':     ['12px', { lineHeight: '1.3',  letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        // Radius-Grammatik: nur diese Werte verwenden
        xs: '5px',
        sm: '8px',
        md: '11px',
        lg: '18px',
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
