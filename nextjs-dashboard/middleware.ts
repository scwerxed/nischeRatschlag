import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Sperrt aggressive Scraper-/KI-Bots, die sich NICHT an robots.txt halten,
 * hart per HTTP 403. User-Agent kann gefälscht werden – fängt aber die
 * meisten "ehrlichen" Scraper und SEO-Crawler ab und reduziert Bot-Traffic.
 *
 * WICHTIG: Keine Suchmaschine und kein Werbe-Crawler steht auf dieser Liste!
 * Googlebot, Bingbot, AdsBot-Google, Mediapartners-Google (AdSense),
 * DuckDuckBot etc. werden NICHT geblockt.
 */
const BLOCKED_UA = [
  // KI-Crawler
  'gptbot', 'chatgpt-user', 'oai-searchbot', 'ccbot', 'claudebot', 'claude-web',
  'anthropic-ai', 'perplexitybot', 'bytespider', 'amazonbot', 'cohere-ai',
  'diffbot', 'imagesiftbot', 'omgili', 'meta-externalagent', 'facebookbot',
  // Aggressive SEO-/Marketing-Crawler (bringen keine echten Besucher)
  'ahrefsbot', 'semrushbot', 'mj12bot', 'dotbot', 'dataforseo', 'blexbot',
  'megaindex', 'serpstatbot', 'petalbot', 'seokicks', 'rogerbot', 'zoominfobot',
  'barkrowler', 'seznambot', 'mauibot', 'dataprovider', 'scrapy', 'python-requests',
];

export function middleware(req: NextRequest) {
  const ua = (req.headers.get('user-agent') || '').toLowerCase();

  if (ua && BLOCKED_UA.some((bot) => ua.includes(bot))) {
    return new NextResponse('Forbidden', {
      status: 403,
      headers: { 'x-blocked': 'bot', 'cache-control': 'no-store' },
    });
  }

  return NextResponse.next();
}

// Nur HTML-Seiten prüfen – statische Assets, Bilder, robots/sitemap/ads ausnehmen
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|ads.txt|google748e248ac86b336e\\.html|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js)).*)',
  ],
};
