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
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
