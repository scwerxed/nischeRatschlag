import Link from 'next/link';
import type { Post } from '@/app/lib/posts';
import PostBild from '@/app/ui/post-bild';
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
    <Link href={`/blog/${post.slug}`} className="group block border border-ink bg-canvas overflow-hidden rounded-sm h-full">
      <div className="relative aspect-[21/9] overflow-hidden">
        <PostBild slug={post.slug} category={post.category} className="absolute inset-0" />
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-signal text-white font-mono text-[11px] font-medium uppercase tracking-[0.06em] px-2.5 py-1 rounded-sm">
            Tipp des Tages
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className={`label-mono mb-2 ${style?.text ?? ''}`}>{post.category}</p>
        <h3 className="font-serif text-tagline font-bold text-ink group-hover:underline decoration-signal decoration-2 underline-offset-4 leading-snug mb-2">
          {post.title}
        </h3>
        <p className="text-caption text-ink-soft line-clamp-2 leading-relaxed">{post.excerpt}</p>
        <span className="mt-3 inline-block text-caption font-semibold text-ink underline decoration-signal underline-offset-4">
          Weiterlesen
        </span>
      </div>
    </Link>
  );
}
