import { NextRequest, NextResponse } from 'next/server';
import { ALLOWED_HOSTS, appendPartnerTag } from '@/app/lib/affiliate';

/**
 * Affiliate-Redirect.  /go?u=<encoded-url>
 *  • prüft die Ziel-Domain gegen eine Allowlist (kein Open Redirect)
 *  • hängt unsere Partner-Tags an
 *  • leitet per 302 weiter
 */
export function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get('u');
  const home = new URL('/', request.url);

  if (!raw) return NextResponse.redirect(home);

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return NextResponse.redirect(home);
  }

  if (target.protocol !== 'https:' || !ALLOWED_HOSTS.includes(target.hostname)) {
    return NextResponse.redirect(home);
  }

  const final = appendPartnerTag(target);

  // TODO: hier ließe sich ein Klick-Logging einbauen (DB / Analytics)
  return NextResponse.redirect(final.toString(), 302);
}
