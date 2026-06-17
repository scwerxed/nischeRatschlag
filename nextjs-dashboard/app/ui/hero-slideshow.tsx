'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  { src: '/images/woerthersee-1.jpg', alt: 'Wörthersee Panorama' },
  { src: '/images/woerthersee-2.jpg', alt: 'Wörthersee Ufer' },
  { src: '/images/woerthersee-3.jpg', alt: 'Wörthersee Berge' },
];

export default function HeroSlideshow({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(images.map(() => false));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[560px] flex items-end overflow-hidden">
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="100vw"
            className="object-cover scale-105"
            priority={i === 0}
            loading={i === 0 ? undefined : 'lazy'}
            onLoad={() =>
              setLoaded((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              })
            }
          />
        </div>
      ))}

      {/* Fallback wenn Bilder noch nicht geladen */}
      {!loaded[current] && (
        <div className="absolute inset-0 bg-green-800" style={{ zIndex: 0 }} />
      )}

      {/* Verlaufs-Scrim von unten – natürlicher als flaches Overlay */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 2, background: 'linear-gradient(to top, rgba(15,30,24,.82) 0%, rgba(15,30,24,.35) 45%, rgba(15,30,24,.05) 100%)' }}
      />

      {/* Inhalt – links ausgerichtet, editorial */}
      <div className="relative w-full max-w-6xl mx-auto px-6 pb-16" style={{ zIndex: 3 }}>
        <div className="max-w-2xl text-white">{children}</div>
      </div>

      {/* Strich-Navigation statt Punkte */}
      <div className="absolute bottom-6 right-6 flex gap-2" style={{ zIndex: 3 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all ${i === current ? 'w-8 bg-white' : 'w-4 bg-white/50 hover:bg-white/80'}`}
            aria-label={`Bild ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
