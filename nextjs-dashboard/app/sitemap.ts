import type { MetadataRoute } from 'next';
import { posts } from '@/app/lib/posts';
import { BADESEEN_LAENDER } from '@/app/lib/badeseen';
import { regionen } from '@/app/lib/regionen';
import { TRIP_CITIES } from '@/app/lib/wochenendtrip';
import { MONATE } from '@/app/lib/monatstipps';
import { SEE_THEMEN } from '@/app/lib/seen';
import { STECKBRIEF_SEEN } from '@/app/lib/seen-messstellen';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bergseen-guide.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/blog', '/karte', '/routenplaner', '/ausflugsplaner', '/seen-vergleich', '/wochenendtrip', '/wandern-baden', '/hitzefreundliche-ausfluege', '/regentaugliche-ausfluege', '/aussicht-ohne-anstrengung', '/beste-ausfluege', '/ausfluege-nach-dauer', '/bahnhofsausfluege', '/feierabend-ausfluege', '/sonnenuntergang-spots', '/zwei-ausfluege-an-einem-tag', '/familienausfluege', '/badeplaetze', '/badeseen', '/wassertemperatur', '/unterkuenfte/am-see', '/unterkuenfte/basislager', '/reiseinfos', '/ueber-uns', '/kontakt', '/impressum', '/datenschutz'].map((p) => ({
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

  const seeSteckbriefPages = STECKBRIEF_SEEN.map((s) => ({
    url: `${BASE}/wassertemperatur/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  const badeseenPages = BADESEEN_LAENDER.map((l) => ({
    url: `${BASE}/badeseen/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
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

  return [...staticPages, ...tripPages, ...monatPages, ...seeThemaPages, ...seeSteckbriefPages, ...badeseenPages, ...postPages, ...regionPages];
}
