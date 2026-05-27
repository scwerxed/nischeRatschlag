import Link from 'next/link';
import { posts } from '@/app/lib/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Alle Artikel rund um den Wörthersee und Kärnten.',
};

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-gray-500 mb-10">Tipps, Wanderwege und Ausflugsziele für Kärnten & Wörthersee.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border border-gray-200 rounded-xl p-6 hover:border-green-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
                {post.category}
              </span>
              <span className="text-xs text-gray-400">{post.date}</span>
            </div>
            <h2 className="font-semibold text-lg text-gray-900 group-hover:text-green-700 leading-snug">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-gray-500">{post.excerpt}</p>
            <span className="mt-4 inline-block text-sm text-green-600 font-medium">
              Weiterlesen →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
