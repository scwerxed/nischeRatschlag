import type { NextConfig } from 'next';
import path from 'path';

// Harmlose Hardening-Header (kein CSP – das wäre mit AdSense/GetYourGuide heikel).
const securityHeaders = [
  // HTTPS erzwingen: Browser sollen die Domain nie wieder über http ansprechen.
  // Bewusst ohne `preload` – das wäre über die Browser-Preload-Liste nur schwer
  // rückgängig zu machen. 2 Jahre inkl. Subdomains reicht hier.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), payment=()' },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Ortsfotos liegen bei Wikimedia Commons (siehe app/lib/post-bilder.ts).
    // Next lädt sie beim Optimieren einmal und liefert sie danach aus dem
    // eigenen Cache – Commons wird also nicht bei jedem Seitenaufruf getroffen.
    remotePatterns: [{ protocol: 'https', hostname: 'upload.wikimedia.org' }],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // Zusammengefuehrte bzw. umbenannte Artikel: alte URLs dauerhaft umleiten,
  // damit bestehende Links und der Suchmaschinen-Index nicht ins Leere laufen.
  async redirects() {
    return [
      {
        source: '/blog/stubaier-gletscher',
        destination: '/blog/stubaital-stubaier-gletscher',
        permanent: true,
      },
      {
        source: '/blog/therme-burgenland-lutzmannsburg',
        destination: '/blog/thermen-burgenland-ueberblick',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
