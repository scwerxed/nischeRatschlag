import Link from 'next/link';
import type { Metadata } from 'next';
import { BADEPLAETZE } from '@/app/lib/badeplaetze';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';
import BadeplatzFilter from '@/app/ui/badeplatz-filter';

export const metadata: Metadata = {
  title: 'Badeplatz-Check – gratis, schattig, flach oder mit Hund?',
  description: 'Badeplätze in Österreich im Detail-Check: gratis Zugang, Schattenplätze, flacher Einstieg für Kinder, WC, Gastronomie und Hundestrand – filterbar nach dem, was dir wichtig ist.',
  keywords: ['Badeplatz gratis Österreich', 'Badesee flacher Einstieg', 'Badesee mit Schatten', 'Hundestrand Österreich', 'Badeplatz mit Kindern', 'freier Seezugang'],
  alternates: { canonical: '/badeplaetze' },
};

export default function BadeplaetzePage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: `${BASE}` },
      { name: 'Badeplatz-Check', url: `${BASE}/badeplaetze` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Badeplatz-Check Österreich',
      numberOfItems: BADEPLAETZE.length,
      itemListElement: BADEPLAETZE.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${p.name} (${p.see})`,
        ...(p.slug ? { url: `${BASE}/blog/${p.slug}` } : {}),
      })),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="eyebrow mb-2">Badeplatz-Check</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Welcher Badeplatz passt zu dir?</h1>
      <p className="text-gray-500 max-w-2xl mb-8 leading-relaxed">
        „See" ist nicht gleich „See": Mal brauchst du einen flachen Einstieg fürs Kind, mal Schatten,
        mal einfach einen Gratis-Zugang. Filtere unsere Badeplätze nach dem, was dir wichtig ist.
      </p>

      <BadeplatzFilter plaetze={BADEPLAETZE} />

      <p className="text-xs text-gray-400 mt-8">
        Angaben nach bestem Wissen, ohne Gewähr – Ausstattung, Eintritt und Hunde-Regeln können sich
        ändern. Im Zweifel vor der Abfahrt auf der Seite des Betreibers prüfen.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/seen-vergleich" className="inline-block bg-green-700 text-white text-sm font-semibold px-5 py-2.5 hover:bg-green-800 transition-colors" style={{ borderRadius: 6 }}>
          Seen im Vergleich
        </Link>
        <Link href="/wandern-baden" className="inline-block border border-green-700 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-50 transition-colors" style={{ borderRadius: 6 }}>
          Wandern + Baden
        </Link>
        <Link href="/hitzefreundliche-ausfluege" className="inline-block border border-amber-500 text-amber-700 text-sm font-semibold px-5 py-2.5 hover:bg-amber-50 transition-colors" style={{ borderRadius: 6 }}>
          Kühle Ziele für Hitzetage
        </Link>
      </div>
    </div>
  );
}
