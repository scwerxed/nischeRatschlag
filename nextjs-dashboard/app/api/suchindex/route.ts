import { posts } from '@/app/lib/posts';

/**
 * Volltext-Index fürs Magazin.
 *
 * Die Magazin-Seite ist eine Client-Komponente und bekam bisher das komplette
 * `posts`-Array als Prop – inklusive aller Artikeltexte, weil die Suche darin
 * sucht. Das hieß: jeder Aufruf von /blog lud sämtliche Artikel als
 * RSC-Payload mit, gemessen rund 700 KB unkomprimiert. Mit ausführlicheren
 * Texten wächst das linear weiter.
 *
 * Jetzt bekommt die Seite nur noch die Felder für die Karten; der Volltext
 * liegt hier und wird erst geladen, wenn tatsächlich jemand sucht.
 *
 * `force-static`: wird beim Build einmal erzeugt und wie eine statische Datei
 * ausgeliefert – kein Serverless-Aufruf pro Suche.
 */
export const dynamic = 'force-static';

export function GET() {
  const index: [string, string][] = posts.map((p) => [
    p.slug,
    [p.title, p.excerpt, p.region, p.bestSeason ?? '', ...(p.highlights ?? []), p.content]
      .join(' ')
      .toLowerCase(),
  ]);

  return Response.json(index);
}
