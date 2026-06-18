import Link from 'next/link';
import type { Post } from '@/app/lib/posts';
import PostArtwork from '@/app/ui/post-artwork';
import { CATEGORY_STYLE } from '@/app/lib/blog-utils';

function dayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

export default function TippDesTages({ posts }: { posts: Post[] }) {
  const idx = dayOfYear() % posts.length;
  const post = posts[idx];
  const style = CATEGORY_STYLE[post.category];

  return (
    <Link href={`/blog/${post.slug}`} className="group block border border-gray-200 overflow-hidden hover:border-green-400 hover:shadow-lg transition-all" style={{ borderRadius: 10 }}>
      <div className="relative aspect-[21/9] overflow-hidden">
        <PostArtwork seed={post.slug} category={post.category} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur text-xs font-bold uppercase tracking-wider px-3 py-1.5 text-green-800" style={{ borderRadius: 4 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-amber-500">
              <path d="M8 1l2 5h5l-4 3.5 1.5 5L8 11.5 3.5 14.5 5 9.5 1 6h5z" strokeLinejoin="round" />
            </svg>
            Tipp des Tages
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className={`text-xs font-semibold uppercase tracking-wider ${style?.text ?? 'text-green-200'} bg-white/10 backdrop-blur px-2 py-0.5`} style={{ borderRadius: 3 }}>
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-green-700 leading-snug mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
        <span className="mt-3 inline-block text-sm font-medium text-green-700 group-hover:text-green-600">
          Jetzt lesen →
        </span>
      </div>
    </Link>
  );
}
