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
  up: 'translateY(24px)',
  down: 'translateY(-24px)',
  left: 'translateX(24px)',
  right: 'translateX(-24px)',
  none: 'none',
};

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  className = '',
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : OFFSET[direction],
        transition: `opacity ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
