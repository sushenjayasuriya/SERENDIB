import React, { useEffect, useRef } from 'react';

export const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on pointer-fine devices (mouse/trackpad, not touch screens)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let animationFrameId: number;
    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let rafScheduled = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafScheduled) {
        rafScheduled = true;
        animationFrameId = requestAnimationFrame(updatePosition);
      }
    };

    const updatePosition = () => {
      rafScheduled = false;
      // Smooth lerp — direct DOM write, zero React re-renders
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX - 175}px, ${currentY - 175}px)`;
        glowRef.current.style.opacity = currentX < -100 ? '0' : '0.6';
      }

      // Keep lerping until settled
      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        rafScheduled = true;
        animationFrameId = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed z-30 top-0 left-0 will-change-transform"
      style={{
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, rgba(197, 160, 89, 0.02) 45%, transparent 70%)',
        borderRadius: '50%',
        opacity: 0,
        transform: 'translate(-200px, -200px)',
      }}
    />
  );
};
