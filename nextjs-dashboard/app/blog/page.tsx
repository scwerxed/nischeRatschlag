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
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-gray-500 mb-10">
        {posts.length} Insider-Tipps für Kärnten &amp; Wörthersee – Wandern, Baden, Ausflüge und Unterkünfte.
      </p>

      <BlogSearch posts={posts} />
    </div>
  );
}
