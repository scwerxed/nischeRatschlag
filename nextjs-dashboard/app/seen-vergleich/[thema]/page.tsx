import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LAKES, SEE_THEMEN } from '@/app/lib/seen';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';

type Props = { params: Promise<{ thema: string }> };

export function generateStaticParams() {
  return SEE_THEMEN.map((t) => ({ thema: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { thema } = await params;
  const t = SEE_THEMEN.find((x) => x.slug === thema);
  if (!t) return {};
  return {
    title: t.title,
    description: `${t.intro} Mit Wassertemperatur, Charakter und Insider-Tipp zu jedem See.`,
    alternates: { canonical: `/seen-vergleich/${thema}` },
  };
}

export default async function SeeThemaPage({ params }: Props) {
  const { thema } = await params;
  const t = SEE_THEMEN.find((x) => x.slug === thema);
  if (!t) notFound();

  const lakes = LAKES.filter((l) => l.tags.includes(t.tag));

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Startseite', url: BASE },
      { name: 'Seen-Vergleich', url: `${BASE}/seen-vergleich` },
      { name: t.h1, url: `${BASE}/seen-vergleich/${thema}` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: t.title,
      numberOfItems: lakes.length,
      itemListElement: lakes.map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: l.name,
        ...(l.slug ? { url: `${BASE}/blog/${l.slug}` } : {}),
      })),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-5">
        <Link href="/" className="hover:text-green-700">Startseite</Link>
        <span>/</span>
        <Link href="/seen-vergleich" className="hover:text-green-700">Seen-Vergleich</Link>
        <span>/</span>
        <span className="text-gray-600">{t.h1}</span>
      </nav>

      <p className="eyebrow mb-2">Entscheidungshilfe</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">{t.h1}</h1>
      <p className="text-gray-500 max-w-2xl mb-10 leading-relaxed">{t.intro}</p>

      <div className="space-y-4">
        {lakes.map((l) => (
          <div key={l.name} className="border border-gray-200 p-5" style={{ borderRadius: 8 }}>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h2 className="font-serif text-xl font-bold text-gray-900">
                {l.slug ? <Link href={`/blog/${l.slug}`} className="text-green-700 hover:underline">{l.name}</Link> : l.name}
              </h2>
              <span className="text-sm font-semibold text-sky-700 whitespace-nowrap">{l.maxTemp} · {l.region}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1.5">{l.charakter} · {l.groesse} · ideal für {l.idealFuer}</p>
            <p className="text-sm text-gray-500 mt-2">
              <strong className="font-semibold text-gray-800">Tipp:</strong> {l.tipp}
              {l.gratis ? ' · Gratis-Bademöglichkeit vorhanden' : ' · Strandbad mit Eintritt'}
            </p>
          </div>
        ))}
      </div>

      {/* Andere Themen */}
      <div className="mt-10 flex flex-wrap gap-2">
        {SEE_THEMEN.filter((x) => x.slug !== thema).map((x) => (
          <Link
            key={x.slug}
            href={`/seen-vergleich/${x.slug}`}
            className="text-sm font-medium px-4 py-1.5 bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 transition-colors"
            style={{ borderRadius: 999 }}
          >
            {x.h1} →
          </Link>
        ))}
        <Link href="/seen-vergleich" className="text-sm font-medium px-4 py-1.5 border border-gray-300 text-gray-600 hover:border-green-600 hover:text-green-700 transition-colors" style={{ borderRadius: 999 }}>
          Alle Seen im Vergleich
        </Link>
      </div>

      <p className="text-xs text-gray-400 mt-8">Wassertemperaturen sind sommerliche Höchstwerte (Juli/August) und können je nach Wetter schwanken.</p>
    </div>
  );
}
