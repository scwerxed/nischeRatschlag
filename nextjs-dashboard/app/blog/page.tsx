import { posts } from '@/app/lib/posts';
import BlogSearch from '@/app/ui/blog-search';
import FadeIn from '@/app/ui/fade-in';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Magazin – Österreich Tipps & Wanderwege',
  description: 'Insider-Artikel für ganz Österreich: Wanderwege, Badeseen, Ausflüge, Tiertouren und Unterkünfte in Kärnten, Salzburg, Tirol, der Steiermark und im Burgenland – mit echten Preisen und ehrlichen Bewertungen.',
  keywords: ['Österreich Blog', 'Wandern Österreich', 'Badeseen Österreich', 'Ausflugsziele Österreich', 'Reisetipps Österreich', 'Bergseen Österreich'],
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <FadeIn direction="up">
        <p className="eyebrow mb-2">Magazin</p>
        <h1 className="font-serif text-4xl font-bold mb-2 text-gray-900">Österreich in {posts.length} Geschichten</h1>
        <p className="text-gray-500 mb-10 max-w-2xl">
          Insider-Tipps für Wandern, Baden, Ausflüge und Unterkünfte – recherchiert vor Ort,
          mit echten Preisen und ehrlichen Einschätzungen.
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={150}>
        <BlogSearch posts={posts} />
      </FadeIn>
    </div>
  );
}
