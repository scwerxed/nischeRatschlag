import React from 'react';
import { posts, getPostBySlug } from '@/app/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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

const DIFFICULTY_STYLES: Record<string, { label: string; cls: string }> = {
  leicht: { label: '🟢 Leicht', cls: 'bg-green-100 text-green-700 border-green-200' },
  mittel: { label: '🟡 Mittel', cls: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  schwer: { label: '🔴 Schwer', cls: 'bg-red-100 text-red-700 border-red-200' },
};

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="list-none space-y-2 text-gray-700 mb-5 ml-0">
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-green-500 mt-0.5 shrink-0 font-bold">✓</span>
              <span className="leading-relaxed">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-12 mb-4 text-gray-900 border-b-2 border-green-100 pb-3">
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={i} className="text-lg font-semibold mt-7 mb-2.5 text-gray-800">
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
    } else if (line.trim() === '---') {
      flushList();
      elements.push(<hr key={i} className="my-8 border-gray-200" />);
    } else if (line.trim() === '') {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={i} className="text-gray-700 leading-relaxed mb-4 text-base">
          {renderInline(line)}
        </p>
      );
    }
  });

  flushList();
  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const regionLabel =
    post.region === 'kaernten' ? 'Kärnten' : post.region.charAt(0).toUpperCase() + post.region.slice(1);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Startseite</Link>
        <span>/</span>
        <Link href={`/regionen/${post.region}`} className="hover:text-green-600">{regionLabel}</Link>
        <span>/</span>
        <span className="text-gray-600">{post.category}</span>
      </div>

      {/* Meta badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full uppercase tracking-wide">
          {post.category}
        </span>
        {post.difficulty && (
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${DIFFICULTY_STYLES[post.difficulty].cls}`}>
            {DIFFICULTY_STYLES[post.difficulty].label}
          </span>
        )}
        {post.bestSeason && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            📅 Beste Zeit: {post.bestSeason}
          </span>
        )}
        <span className="text-xs text-gray-400 ml-auto">{post.date}</span>
      </div>

      {/* Titel */}
      <h1 className="text-3xl font-bold mb-5 leading-tight text-gray-900">{post.title}</h1>

      {/* Highlights Box */}
      {post.highlights && post.highlights.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
          <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-3">Auf einen Blick</p>
          <ul className="space-y-1.5">
            {post.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 shrink-0 font-bold mt-0.5">✓</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Artikel-Inhalt */}
      <div className="prose-style">
        {renderContent(post.content)}
      </div>

      {/* Affiliate Links */}
      {post.affiliateLinks && post.affiliateLinks.length > 0 && (
        <div className="mt-10 border border-green-100 bg-green-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Empfehlungen & Links</h3>
          <ul className="space-y-2">
            {post.affiliateLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="text-green-700 hover:underline font-medium text-sm"
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

      {/* CTA für Wandern */}
      {post.category === 'Wandern' && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link
            href="/karte"
            className="flex items-center justify-center gap-2 bg-green-700 text-white font-medium text-sm px-5 py-3 rounded-xl hover:bg-green-800 transition-colors"
          >
            🗺️ Auf Karte anzeigen
          </Link>
          <Link
            href="/routenplaner"
            className="flex items-center justify-center gap-2 border border-green-700 text-green-700 font-medium text-sm px-5 py-3 rounded-xl hover:bg-green-50 transition-colors"
          >
            📍 Route planen
          </Link>
        </div>
      )}

      {/* Zurück zur Region */}
      <div className="mt-10 pt-6 border-t border-gray-100">
        <Link
          href={`/regionen/${post.region}`}
          className="text-sm text-green-600 hover:underline font-medium"
        >
          ← Alle {regionLabel}-Artikel anzeigen
        </Link>
      </div>
    </div>
  );
}
