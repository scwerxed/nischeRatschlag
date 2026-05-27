import { posts, getPostBySlug } from '@/app/lib/posts';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.trim().split('\n');

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-2">
        <span className="text-xs font-medium text-green-600 uppercase tracking-wide">{post.category}</span>
        <span className="text-xs text-gray-400 ml-4">{post.date}</span>
      </div>
      <h1 className="text-3xl font-bold mb-6 leading-tight">{post.title}</h1>

      <div className="prose prose-gray max-w-none">
        {paragraphs.map((line, i) => {
          if (line.startsWith('## ')) {
            return <h2 key={i} className="text-xl font-semibold mt-8 mb-2">{line.replace('## ', '')}</h2>;
          }
          if (line.trim() === '') return null;
          return <p key={i} className="text-gray-700 leading-relaxed mb-3">{line}</p>;
        })}
      </div>

      {post.affiliateLinks && post.affiliateLinks.length > 0 && (
        <div className="mt-10 border border-green-100 bg-green-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Empfehlungen</h3>
          <ul className="space-y-2">
            {post.affiliateLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="text-green-700 hover:underline font-medium"
                >
                  {link.label} →
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-3">
            * Affiliate-Links – beim Kauf erhalte ich eine kleine Provision, für dich entstehen keine Mehrkosten.
          </p>
        </div>
      )}
    </div>
  );
}
