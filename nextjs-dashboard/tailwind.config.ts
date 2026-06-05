import type { Config } from 'tailwindcss';

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
          600: '#2f6b54',  // Primär (Buttons, Links)
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
      },
      letterSpacing: {
        tightish: '-0.015em',
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
