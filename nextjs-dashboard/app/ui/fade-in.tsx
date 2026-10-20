'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface Props {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const OFFSET: Record<Direction, string> = {
  up: 'translateY(16px)',
  down: 'translateY(-16px)',
  left: 'translateX(16px)',
  right: 'translateX(-16px)',
  none: 'none',
};

// Inhalte werden schon ~250px BEVOR sie ins Bild scrollen eingeblendet. Früher lief die
// Animation erst, wenn ein Block sichtbar war – beim schnellen Scrollen blieben dadurch
// ganze Abschnitte leer stehen (siehe Audit 2026-10-20). Die Animation ist jetzt nur noch
// ein leichter Akzent, nie eine Bedingung dafür, dass Inhalt zu sehen ist.
const OBSERVER_OPTIONS: IntersectionObserverInit = { threshold: 0, rootMargin: '0px 0px 250px 0px' };

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 500,
  className = '',
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Wer reduzierte Bewegung eingestellt hat, sieht alles sofort – ohne Ein-/Ausblenden.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    // Was beim Laden schon im (erweiterten) Sichtbereich liegt, bleibt einfach stehen –
    // kein Flackern von sichtbar → unsichtbar → sichtbar direkt nach dem Hydrieren.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 250) return;

    setMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      OBSERVER_OPTIONS,
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const show = !mounted || visible;

  return (
    <div
      ref={ref}
      className={className}
      style={mounted ? {
        opacity: show ? 1 : 0,
        transform: show ? 'none' : OFFSET[direction],
        transition: `opacity ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
        willChange: show ? 'auto' : 'opacity, transform',
      } : undefined}
    >
      {children}
    </div>
  );
}
