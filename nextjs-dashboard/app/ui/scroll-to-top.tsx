'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Nach oben"
      className="fixed bottom-5 right-5 z-[1500] w-11 h-11 bg-green-700/90 backdrop-blur text-white shadow-lg hover:bg-green-800 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center"
      style={{
        borderRadius: 10,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(16px)',
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity 300ms, transform 300ms cubic-bezier(.16,1,.3,1), background-color 200ms, box-shadow 200ms',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 14V4M4 9l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
