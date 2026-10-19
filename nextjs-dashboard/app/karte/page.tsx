import MapWrapper from '@/app/ui/map-wrapper';
import type { MapSpot } from '@/app/ui/map-client';
import { posts } from '@/app/lib/posts';
import { coordsOf } from '@/app/lib/wochenendtrip';
import { regionName } from '@/app/lib/seo';
import type { Metadata } from 'next';

// Ebene „Ausflugsziele“: Startpunkt jedes Artikels (startCoords bzw. erster Wegpunkt). Nur
// slug/Titel/Kategorie/Bundesland gehen an den Client, nicht posts.ts. Artikel mit derselben
// (Sammel-)Koordinate – z. B. die fünf Wörthersee-Artikel – teilen sich einen Pin.
function buildSpots(): MapSpot[] {
  const byKey = new Map<string, MapSpot>();
  for (const p of posts) {
    const c = coordsOf(p);
    if (!c) continue;
    const key = `${c[0].toFixed(4)},${c[1].toFixed(4)}`;
    const spot: MapSpot = byKey.get(key) ?? { lat: c[0], lng: c[1], articles: [] };
    spot.articles.push({ slug: p.slug, title: p.title, category: p.category, region: regionName(p.region) });
    byKey.set(key, spot);
  }
  return Array.from(byKey.values());
}

const SPOTS = buildSpots();
const ARTICLE_COUNT = SPOTS.reduce((n, s) => n + s.articles.length, 0);

export const metadata: Metadata = {
  title: 'Interaktive Wanderkarte',
  description: `Interaktive Österreich-Karte mit ${ARTICLE_COUNT} Ausflugszielen aus unserem Magazin (Wandern, Baden, Ausflüge), dazu Wanderwege, Unterkünfte und Gipfel in Kärnten.`,
};

export default function KartePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <h1 className="font-serif text-lead font-bold text-ink">Interaktive Wanderkarte</h1>
          <p className="text-caption text-ink-soft mt-0.5">
            {ARTICLE_COUNT} Ausflugsziele aus dem Magazin, Wanderwege und Unterkünfte in ganz Österreich, Gipfel aktuell für Kärnten — Pin anklicken öffnet den Artikel, Ebenen rechts oben ein-/ausblenden
          </p>
        </div>
      </div>

      <MapWrapper spots={SPOTS} />

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5">
        <span className="text-fine text-ink-soft">
          © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-ink-muted">OpenStreetMap</a>
        </span>
        <span className="text-fine text-ink-soft">
          Wanderwege: <a href="https://hiking.waymarkedtrails.org" target="_blank" rel="noopener noreferrer" className="hover:text-ink-muted">Waymarked Trails</a>
        </span>
        <span className="text-fine text-ink-soft">
          Topo: <a href="https://opentopomap.org" target="_blank" rel="noopener noreferrer" className="hover:text-ink-muted">OpenTopoMap</a>
        </span>
        <span className="text-fine text-ink-soft">
          Gipfel: <a href="https://overpass-api.de" target="_blank" rel="noopener noreferrer" className="hover:text-ink-muted">Overpass API</a>
        </span>
      </div>
    </div>
  );
}
