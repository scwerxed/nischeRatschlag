import type { MetadataRoute } from 'next';
import { posts } from '@/app/lib/posts';
import { regionen } from '@/app/lib/regionen';
import { TRIP_CITIES } from '@/app/lib/wochenendtrip';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bergseen-guide.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/blog', '/karte', '/routenplaner', '/seen-vergleich', '/wochenendtrip', '/wandern-baden', '/reiseinfos', '/ueber-uns', '/kontakt', '/impressum', '/datenschutz'].map((p) => ({
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

  return [...staticPages, ...tripPages, ...postPages, ...regionPages];
}
