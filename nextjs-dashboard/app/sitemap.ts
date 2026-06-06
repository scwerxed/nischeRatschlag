import type { MetadataRoute } from 'next';
import { posts } from '@/app/lib/posts';
import { regionen } from '@/app/lib/regionen';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bergseen-guide.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/blog', '/karte', '/routenplaner', '/reiseinfos', '/ueber-uns', '/kontakt', '/impressum', '/datenschutz'].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
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

  return [...staticPages, ...postPages, ...regionPages];
}
