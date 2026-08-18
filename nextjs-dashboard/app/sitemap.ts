import type { MetadataRoute } from 'next';
import { posts } from '@/app/lib/posts';
import { regionen } from '@/app/lib/regionen';
import { TRIP_CITIES } from '@/app/lib/wochenendtrip';
import { MONATE } from '@/app/lib/monatstipps';
import { SEE_THEMEN } from '@/app/lib/seen';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bergseen-guide.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/blog', '/karte', '/routenplaner', '/seen-vergleich', '/wochenendtrip', '/wandern-baden', '/hitzefreundliche-ausfluege', '/regentaugliche-ausfluege', '/aussicht-ohne-anstrengung', '/beste-ausfluege', '/ausfluege-nach-dauer', '/bahnhofsausfluege', '/feierabend-ausfluege', '/badeplaetze', '/reiseinfos', '/ueber-uns', '/kontakt', '/impressum', '/datenschutz'].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }));

  const tripPages = Object.keys(TRIP_CITIES).map((slug) => ({
    url: `${BASE}/wochenendtrip/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const monatPages = MONATE.map((m) => ({
    url: `${BASE}/beste-ausfluege/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const seeThemaPages = SEE_THEMEN.map((t) => ({
    url: `${BASE}/seen-vergleich/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const postPages = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const regionPages = regionen.map((r) => ({
    url: `${BASE}/regionen/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: r.aktiv ? 0.9 : 0.3,
  }));

  return [...staticPages, ...tripPages, ...monatPages, ...seeThemaPages, ...postPages, ...regionPages];
}
