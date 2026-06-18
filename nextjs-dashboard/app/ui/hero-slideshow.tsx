'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  { src: '/images/woerthersee-1.jpg', alt: 'Wörthersee Panorama' },
  { src: '/images/woerthersee-2.jpg', alt: 'Wörthersee Ufer' },
  { src: '/images/woerthersee-3.jpg', alt: 'Wörthersee Berge' },
];

const KB_TRANSFORMS = [
  'scale(1.12) translate(-1%, -1%)',
  'scale(1.15) translate(1%, -2%)',
  'scale(1.12) translate(-2%, 1%)',
];

export default function HeroSlideshow({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(images.map(() => false));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[560px] md:h-[620px] flex items-end overflow-hidden">
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: i === current ? KB_TRANSFORMS[i] : 'scale(1.05)',
              transition: i === current ? 'transform 7s cubic-bezier(.25,.1,.25,1)' : 'none',
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="100vw"
              className="object-cover"
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
        </div>
      ))}

      {!loaded[current] && (
        <div className="absolute inset-0 bg-green-800" style={{ zIndex: 0 }} />
      )}

      <div
        className="absolute inset-0"
        style={{ zIndex: 2, background: 'linear-gradient(to top, rgba(15,30,24,.85) 0%, rgba(15,30,24,.4) 40%, rgba(15,30,24,.08) 100%)' }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-6 pb-16 md:pb-20" style={{ zIndex: 3 }}>
        <div className="max-w-2xl text-white">{children}</div>
      </div>

      <div className="absolute bottom-6 right-6 flex gap-2" style={{ zIndex: 3 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'w-10 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'}`}
            aria-label={`Bild ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
