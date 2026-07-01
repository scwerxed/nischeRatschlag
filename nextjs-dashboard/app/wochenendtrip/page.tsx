import Link from 'next/link';
import type { Metadata } from 'next';
import { TRIP_CITIES, tripsFrom } from '@/app/lib/wochenendtrip';
import { BASE, breadcrumbSchema } from '@/app/lib/seo';

export const metadata: Metadata = {
  title: 'Wochenendtrips in Österreich – Ausflüge ab Wien, Graz & Salzburg',
  description: 'Kurztrips und Wochenendausflüge in Österreich, gebündelt nach Startstadt und Fahrzeit. Finde die schönsten Ziele ab Wien, Graz oder Salzburg – Seen, Berge und Sehenswürdigkeiten.',
  keywords: ['Wochenendtrip Österreich', 'Ausflug ab Wien', 'Ausflug ab Graz', 'Ausflug ab Salzburg', 'Kurztrip Österreich', 'Tagesausflug Österreich'],
  alternates: { canonical: '/wochenendtrip' },
};

const CITY_ACCENT: Record<string, string> = {
  'ab-wien': 'from-red-400 to-rose-600',
  'ab-graz': 'from-green-500 to-emerald-700',
  'ab-salzburg': 'from-violet-400 to-purple-600',
};

export default function WochenendtripHub() {
  const cities = Object.values(TRIP_CITIES);

  const jsonLd = breadcrumbSchema([
    { name: 'Startseite', url: BASE },
    { name: 'Wochenendtrips', url: `${BASE}/wochenendtrip` },
  ]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="eyebrow mb-2">Wochenendtrips</p>
      <h1 className="font-serif text-4xl font-bold mb-3 text-gray-900">Ausflüge nach Startstadt</h1>
      <p className="text-gray-500 max-w-2xl mb-10 leading-relaxed">
        Wähle deine Startstadt – wir bündeln die schönsten Ausflugsziele Österreichs nach Fahrzeit,
        von „unter 1 Stunde“ bis zum Wochenendtrip. Ideal, um spontan das passende Ziel zu finden.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cities.map((city) => {
          const count = tripsFrom(city.slug).reduce((n, g) => n + g.items.length, 0);
          const accent = CITY_ACCENT[city.slug] ?? 'from-green-500 to-green-700';
          return (
            <Link
              key={city.slug}
              href={`/wochenendtrip/${city.slug}`}
              className="group block border border-gray-200 overflow-hidden hover:border-green-400 hover:shadow-lg transition-all"
              style={{ borderRadius: 8 }}
            >
              <div className={`h-2 bg-gradient-to-r ${accent}`} />
              <div className="p-6">
                <p className="eyebrow mb-1.5">Ab {city.name}</p>
                <h2 className="font-serif text-xl font-bold text-gray-900 group-hover:text-green-700">
                  Wochenendtrip ab {city.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1.5">{count} Ausflugsziele nach Fahrzeit sortiert</p>
                <span className="mt-4 inline-block text-sm font-medium text-green-700 group-hover:text-green-600">
                  Ziele ansehen →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
