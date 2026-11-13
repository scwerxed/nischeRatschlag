import { Bricolage_Grotesque, Hanken_Grotesk, Newsreader, IBM_Plex_Mono } from 'next/font/google';

// Schriften des „Wanderführer“-Looks (seit 2026-11-13):
// Überschriften in einer eigenwilligen Grotesk, Oberfläche in einer ruhigen Grotesk,
// Artikel-Fließtext in einer Lese-Serif, Labels und Messwerte in einer Mono.

// Überschriften – in Tailwind als `font-serif` verdrahtet, damit alle bestehenden
// Headline-Klassen automatisch umziehen.
export const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Oberfläche (Menü, Karten, Buttons) – `font-sans`
export const sans = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Artikel-Fließtext – `font-reading`
export const reading = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-reading',
  display: 'swap',
});

// Labels, Koordinaten, Messwerte – `font-mono`
export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});
