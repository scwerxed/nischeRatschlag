import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bergseen Guide – Seen, Berge & Ausflüge in Österreich',
    short_name: 'Bergseen Guide',
    description: 'Insider-Tipps für Wandern, Baden und Ausflüge in Österreich – ehrlich recherchiert mit echten Preisen.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#255744',
    lang: 'de-AT',
    categories: ['travel', 'lifestyle'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
