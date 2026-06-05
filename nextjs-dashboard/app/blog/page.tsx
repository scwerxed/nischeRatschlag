import { posts } from '@/app/lib/posts';
import BlogSearch from '@/app/ui/blog-search';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Alle Artikel rund um den Wörthersee und Kärnten – Wandern, Baden, Ausflüge und Unterkünfte.',
};

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="eyebrow mb-2">Magazin</p>
      <h1 className="font-serif text-4xl font-bold mb-2 text-gray-900">Kärnten in {posts.length} Geschichten</h1>
      <p className="text-gray-500 mb-10 max-w-2xl">
        Insider-Tipps für Wandern, Baden, Ausflüge und Unterkünfte – recherchiert vor Ort,
        mit echten Preisen und ehrlichen Einschätzungen.
      </p>

      <BlogSearch posts={posts} />
    </div>
  );
}
