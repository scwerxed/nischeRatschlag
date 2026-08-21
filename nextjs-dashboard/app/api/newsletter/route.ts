import { NextRequest, NextResponse } from 'next/server';

// Newsletter-Anmeldung mit Double-Opt-in über Brevo.
//
// Wir versenden selbst keine Mail: Der Brevo-Endpoint `doubleOptinConfirmation`
// schickt die Bestätigungsmail und trägt die Adresse erst nach dem Klick in die
// Liste ein. Das ist die DSGVO-konforme Variante – ohne Bestätigung landet
// niemand im Verteiler.
//
// Nötige Env-Variablen (Vercel → Settings → Environment Variables):
//   BREVO_API_KEY          – API-Key v3 aus dem Brevo-Konto
//   BREVO_LIST_ID          – ID der Ziel-Liste (Zahl)
//   BREVO_DOI_TEMPLATE_ID  – ID der Double-Opt-in-Vorlage (Zahl)
// Fehlt eine davon, antwortet die Route mit 503 und das Formular sagt das
// ehrlich – lieber kein Eintrag als ein stiller Datenverlust.

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation';

/** Erlaubt nur Aufrufe von der eigenen Domain (Referer-Host == Host).
 *  Fehlt der Referer ganz, blocken wir nicht hart – dafür greift das Rate-Limit. */
function sameOrigin(req: NextRequest): boolean {
  const ref = req.headers.get('referer');
  if (!ref) return true;
  try {
    return new URL(ref).host === req.headers.get('host');
  } catch {
    return false;
  }
}

// Einfaches In-Memory-Rate-Limit pro IP (pro warmer Serverless-Instanz).
const RATE = { limit: 5, windowMs: 60_000 };
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now > e.reset) {
    hits.set(ip, { count: 1, reset: now + RATE.windowMs });
    return false;
  }
  e.count += 1;
  return e.count > RATE.limit;
}

// Bewusst konservativ: keine exotischen Adressen, aber auch keine Ablehnung
// gültiger Mails. Die eigentliche Prüfung macht ohnehin die Bestätigungsmail.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Zu viele Versuche. Bitte später noch einmal probieren.' }, { status: 429 });
  }

  let email = '';
  try {
    const body = await request.json();
    email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  if (!apiKey || !listId || !templateId) {
    return NextResponse.json(
      { error: 'Der Newsletter ist noch nicht freigeschaltet. Bitte versuch es in ein paar Tagen wieder.' },
      { status: 503 },
    );
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bergseen-guide.com';

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        email,
        includeListIds: [listId],
        templateId,
        redirectionUrl: `${base}/newsletter/bestaetigt`,
      }),
      signal: AbortSignal.timeout(10000),
    });

    // Brevo antwortet auf Erfolg mit 201/204 ohne Body.
    if (res.ok) return NextResponse.json({ ok: true });

    // Bereits eingetragene Adressen sollen keinen Fehler sehen – sonst könnte
    // man über die Fehlermeldung herausfinden, wer im Verteiler steht.
    const detail = await res.text();
    if (res.status === 400 && detail.includes('duplicate_parameter')) {
      return NextResponse.json({ ok: true });
    }

    console.error('Brevo-Anmeldung fehlgeschlagen:', res.status, detail.slice(0, 300));
    return NextResponse.json({ error: 'Die Anmeldung hat gerade nicht geklappt. Bitte später noch einmal versuchen.' }, { status: 502 });
  } catch {
    return NextResponse.json({ error: 'Der Newsletter-Dienst ist gerade nicht erreichbar.' }, { status: 504 });
  }
}
