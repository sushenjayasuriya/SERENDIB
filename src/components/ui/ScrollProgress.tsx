import React, { useEffect, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafScheduled = false;

    const handleScroll = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => {
        rafScheduled = false;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0 && barRef.current) {
          const pct = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
          barRef.current.style.width = `${pct}%`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-[#C5A059] via-[#F3E5AB] to-[#C85A32] shadow-[0_0_12px_rgba(197,160,89,0.8)]"
        style={{ width: '0%' }}
      />
    </div>
  );
};
