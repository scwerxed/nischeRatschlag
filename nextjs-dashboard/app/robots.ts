import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bergseen-guide.com';

// KI-Trainings- & Scraper-Bots, die wir aussperren (sie respektieren robots.txt).
// WICHTIG: Googlebot, Bingbot, AdsBot-Google & Mediapartners-Google bleiben erlaubt!
const BLOCKED_BOTS = [
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot',
  'CCBot',
  'ClaudeBot', 'Claude-Web', 'anthropic-ai',
  'Google-Extended',         // nur KI-Training von Google – Suche bleibt erlaubt
  'Applebot-Extended',
  'PerplexityBot',
  'Bytespider',              // TikTok/ByteDance – sehr aggressiv
  'Amazonbot',
  'FacebookBot', 'meta-externalagent',
  'Diffbot',
  'Omgilibot', 'Omgili',
  'ImagesiftBot',
  'cohere-ai',
  'DataForSeoBot',
  // Chinesische Such-Crawler (keine DACH-Zielgruppe)
  'Baiduspider', 'Sogou', 'YisouSpider', '360Spider', 'Sosospider',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Alle übrigen Bots (inkl. Google, Bing) dürfen alles außer interne Pfade
      { userAgent: '*', allow: '/', disallow: ['/go', '/api/'] },
      // KI-/Scraper-Bots komplett aussperren
      { userAgent: BLOCKED_BOTS, disallow: '/' },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
