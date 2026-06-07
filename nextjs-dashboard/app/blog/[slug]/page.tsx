import React from 'react';
import { posts, getPostBySlug } from '@/app/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { cloak, EXCURSIONS } from '@/app/lib/affiliate';
import TrailMapWrapper from '@/app/ui/trail-map-wrapper';
import ShareButtons from '@/app/ui/share-buttons';
import { readingTime, relatedPosts } from '@/app/lib/blog-utils';
import { BASE, SITE_NAME, CATEGORY_KEYWORDS, articleSchema, breadcrumbSchema } from '@/app/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const catKw = CATEGORY_KEYWORDS[post.category] ?? [];
  const keywords = [...catKw, 'Kärnten', 'Wörthersee', post.bestSeason ?? ''].filter(Boolean);
  // Reichere Beschreibung: Excerpt + erste Highlights
  const hlText = post.highlights?.slice(0, 2).join(' · ') ?? '';
  const description = hlText ? `${post.excerpt} ${hlText}` : post.excerpt;

  return {
    title: post.title,
    description: description.slice(0, 160),
    keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: description.slice(0, 160),
      type: 'article',
      publishedTime: post.date,
      url: `${BASE}/blog/${post.slug}`,
      siteName: SITE_NAME,
      locale: 'de_AT',
      tags: keywords,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
  };
}

const DIFFICULTY_STYLES: Record<string, { label: string; dot: string; cls: string }> = {
  leicht: { label: 'Leicht', dot: 'bg-green-500', cls: 'bg-green-50 text-green-700 border-green-200' },
  mittel: { label: 'Mittel', dot: 'bg-yellow-400', cls: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  schwer: { label: 'Schwer', dot: 'bg-red-500',   cls: 'bg-red-50 text-red-700 border-red-200' },
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
        <ul key={`list-${listKey++}`} className="list-none space-y-2 text-gray-700 mb-5 ml-0 border-l-2 border-green-200 pl-4">
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="shrink-0 mt-[0.6em] w-2.5 h-px bg-green-500 inline-block" />
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
        <h2 key={i} className="font-serif text-2xl font-bold mt-12 mb-4 text-gray-900 border-b border-gray-200 pb-3">
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={i} className="font-serif text-lg font-bold mt-7 mb-2.5 text-gray-800">
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

  const minutes = readingTime(post.content);
  const related = relatedPosts(post, posts);

  const jsonLd = [
    articleSchema({ title: post.title, excerpt: post.excerpt, date: post.date, slug: post.slug, category: post.category, region: post.region }),
    breadcrumbSchema([
      { name: 'Startseite',  url: BASE },
      { name: regionLabel,   url: `${BASE}/regionen/${post.region}` },
      { name: post.title,    url: `${BASE}/blog/${post.slug}` },
    ]),
    // Wandern-Posts bekommen zusätzlich ein SportsActivityLocation-Schema
    ...(post.category === 'Wandern' ? [{
      '@context': 'https://schema.org',
      '@type': 'SportsActivityLocation',
      name: post.title,
      description: post.excerpt,
      address: { '@type': 'PostalAddress', addressRegion: 'Kärnten', addressCountry: 'AT' },
      sport: 'Hiking',
    }] : []),
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Canonical hreflang für deutschsprachige Suche */}
      <link rel="alternate" hrefLang="de-AT" href={`${BASE}/blog/${post.slug}`} />
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
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 border ${DIFFICULTY_STYLES[post.difficulty].cls}`} style={{ borderRadius: 3 }}>
            <span className={`w-2 h-2 rounded-full shrink-0 ${DIFFICULTY_STYLES[post.difficulty].dot}`} />
            {DIFFICULTY_STYLES[post.difficulty].label}
          </span>
        )}
        {post.bestSeason && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1" style={{ borderRadius: 3 }}>
            {post.bestSeason}
          </span>
        )}
        <span className="text-xs text-gray-400 ml-auto">{post.date}</span>
        <span className="text-xs text-gray-400">&middot; {minutes} Min. Lesen</span>
      </div>

      {/* Titel */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-5 leading-[1.15] text-gray-900">{post.title}</h1>

      {/* Highlights Box */}
      {post.highlights && post.highlights.length > 0 && (
        <div className="border-l-4 border-green-600 bg-green-50 px-5 py-4 mb-8">
          <p className="eyebrow mb-3">Auf einen Blick</p>
          <ul className="space-y-1.5">
            {post.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="shrink-0 mt-1.5 w-3 h-px bg-green-600 inline-block" />
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

      {/* Wegekarte – vorgegebene Routen */}
      {post.trails && post.trails.length > 0 && (
        <div className="mt-12">
          <p className="eyebrow mb-2">Wanderkarte</p>
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">
            {post.trails.length > 1 ? 'Wähle deinen Weg' : 'Der Weg auf der Karte'}
          </h2>
          {post.trails.length > 1 && (
            <p className="text-sm text-gray-500 mb-4">
              Tippe auf eine Tour, um den vorgegebenen Wegverlauf auf der Karte zu sehen.
            </p>
          )}
          <TrailMapWrapper trails={post.trails} />
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/routenplaner"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-700 border border-green-200 hover:bg-green-50 px-4 py-2 transition-colors"
              style={{ borderRadius: 3 }}
            >
              📍 Eigene Route planen
            </Link>
            <Link
              href="/karte"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-700 border border-green-200 hover:bg-green-50 px-4 py-2 transition-colors"
              style={{ borderRadius: 3 }}
            >
              🗺️ Große Wanderkarte öffnen
            </Link>
          </div>
        </div>
      )}

      {/* Affiliate Links */}
      {post.affiliateLinks && post.affiliateLinks.length > 0 && (
        <div className="mt-10 border border-green-100 bg-green-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Empfehlungen & Links</h3>
          <ul className="space-y-2">
            {post.affiliateLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={cloak(link.url)}
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

      {/* Erlebnisse & Tickets buchen (Ausflug + Wandern) */}
      {(post.category === 'Ausflug' || post.category === 'Wandern') && (
        <div className="mt-8 border border-gray-200 p-6" style={{ borderRadius: 8 }}>
          <p className="eyebrow mb-1">Erlebnisse &amp; Tickets</p>
          <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">Ausflüge in Kärnten buchen</h3>
          <p className="text-sm text-gray-500 mb-4">Geführte Touren, Stadtführungen und Tickets – flexibel stornierbar.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {EXCURSIONS.map((ex) => (
              <a
                key={ex.url}
                href={cloak(ex.url)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group block border border-gray-200 px-4 py-3 hover:border-green-400 hover:bg-green-50 transition-colors"
                style={{ borderRadius: 6 }}
              >
                <span className="block text-sm font-semibold text-gray-900 group-hover:text-green-700">{ex.label} →</span>
                <span className="block text-xs text-gray-500 mt-0.5">{ex.note}</span>
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">* Partner-Links (GetYourGuide) – für dich ohne Mehrkosten.</p>
        </div>
      )}

      {/* CTA für Wandern */}
      {post.category === 'Wandern' && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link
            href="/karte"
            className="flex items-center justify-center gap-2 bg-green-700 text-white font-medium text-sm px-5 py-3 hover:bg-green-800 transition-colors"
            style={{ borderRadius: 6 }}
          >
            Auf Karte anzeigen
          </Link>
          <Link
            href="/routenplaner"
            className="flex items-center justify-center gap-2 border border-green-700 text-green-700 font-medium text-sm px-5 py-3 hover:bg-green-50 transition-colors"
            style={{ borderRadius: 6 }}
          >
            Route planen
          </Link>
        </div>
      )}

      {/* Teilen */}
      <div className="mt-10 pt-6 border-t border-gray-100">
        <ShareButtons title={post.title} />
      </div>

      {/* Verwandte Artikel */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Das könnte dich auch interessieren</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group block border border-gray-200 p-4 hover:border-green-400 hover:shadow-sm transition-all"
                style={{ borderRadius: 8 }}
              >
                <span className="eyebrow">{r.category}</span>
                <h3 className="mt-1.5 text-sm font-semibold text-gray-900 group-hover:text-green-700 leading-snug line-clamp-3">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
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
