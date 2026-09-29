import { posts } from '@/app/lib/posts';
import BlogSearch, { type CardPost } from '@/app/ui/blog-search';
import { readingTime } from '@/app/lib/blog-utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Magazin – Österreich Tipps & Wanderwege',
  description: 'Insider-Artikel für ganz Österreich: Wanderwege, Badeseen, Ausflüge, Tiertouren und Unterkünfte in Kärnten, Salzburg, Tirol, der Steiermark und im Burgenland – vor Ort recherchiert, mit ehrlichen Einschätzungen und Gratis-Alternativen.',
  keywords: ['Österreich Blog', 'Wandern Österreich', 'Badeseen Österreich', 'Ausflugsziele Österreich', 'Reisetipps Österreich', 'Bergseen Österreich'],
  alternates: { canonical: '/blog' },
};

// Nur die Felder, die die Karten brauchen. Der Artikeltext bleibt auf dem
// Server – er wandert sonst als RSC-Payload komplett in den Browser.
const cards: CardPost[] = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  date: p.date,
  category: p.category,
  region: p.region,
  difficulty: p.difficulty,
  bestSeason: p.bestSeason,
  highlights: p.highlights,
  mins: readingTime(p.content),
}));

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-14 md:py-section">
      <p className="eyebrow mb-2">Magazin</p>
      <h1 className="font-serif text-display font-bold mb-2 text-ink">Österreich in {posts.length} Geschichten</h1>
      <p className="text-ink-soft mb-10 max-w-2xl">
        Insider-Tipps für Wandern, Baden, Ausflüge und Unterkünfte – recherchiert vor Ort,
        mit ehrlichen Einschätzungen statt Hochglanz-Prosa.
      </p>

      <BlogSearch posts={cards} />
    </div>
  );
}
