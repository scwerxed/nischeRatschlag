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
    <section className="relative h-[520px] flex items-center justify-center overflow-hidden">
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={i === 0}
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

      {/* Fallback-Gradient wenn Bilder noch nicht geladen */}
      {!loaded[current] && (
        <div className="absolute inset-0 bg-green-700" style={{ zIndex: 0 }} />
      )}

      {/* Dunkles Overlay für Lesbarkeit */}
      <div className="absolute inset-0 bg-black/40" style={{ zIndex: 2 }} />

      {/* Inhalt */}
      <div className="relative text-white text-center px-6 max-w-3xl" style={{ zIndex: 3 }}>
        {children}
      </div>

      {/* Punkte-Navigation */}
      <div className="absolute bottom-5 flex gap-2" style={{ zIndex: 3 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Bild ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
