import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/app/lib/posts';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Bergseen Guide';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? 'Bergseen Guide';
  const eyebrow = post ? `${post.category} · Bergseen Guide` : 'Bergseen Guide';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'linear-gradient(135deg, #2f6b54 0%, #1b3b2f 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 8, textTransform: 'uppercase', opacity: 0.8 }}>
          {eyebrow}
        </div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, lineHeight: 1.12, maxWidth: 1040 }}>
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 26, opacity: 0.85 }}>
          www.bergseen-guide.com
        </div>
      </div>
    ),
    { ...size },
  );
}
