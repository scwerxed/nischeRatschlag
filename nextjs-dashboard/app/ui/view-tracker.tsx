'use client';

import { useEffect } from 'react';
import { trackView } from '@/app/ui/recently-viewed';

export default function ViewTracker({ slug, title, category }: { slug: string; title: string; category: string }) {
  useEffect(() => {
    trackView(slug, title, category);
  }, [slug, title, category]);

  return null;
}
