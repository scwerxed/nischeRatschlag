import { NextRequest, NextResponse } from 'next/server';
import { track } from '@vercel/analytics/server';
import { ALLOWED_HOSTS, appendPartnerTag } from '@/app/lib/affiliate';

/**
 * Affiliate-Redirect.  /go?u=<encoded-url>
 *  • prüft die Ziel-Domain gegen eine Allowlist (kein Open Redirect)
 *  • hängt unsere Partner-Tags an
 *  • leitet per 302 weiter
 */
export async function GET(request: NextRequest) {
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

  // Affiliate-Klick als Custom-Event tracken (Vercel Analytics).
  // Darf den Redirect niemals blockieren.
  try {
    await track('affiliate_click', {
      partner: target.hostname.replace(/^www\./, ''),
      path: target.pathname.slice(0, 80),
    });
  } catch {
    /* Tracking-Fehler ignorieren */
  }

  return NextResponse.redirect(final.toString(), 302);
}
