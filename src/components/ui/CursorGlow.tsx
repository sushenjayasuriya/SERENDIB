import React, { useEffect, useState } from 'react';

export const CursorGlow: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    // Only enable on pointer-fine devices (mouse/trackpad, not touch screens)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updatePosition = () => {
      // Smooth lerp (linear interpolation) for fluid 120 FPS motion
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      setPos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      animationFrameId = requestAnimationFrame(updatePosition);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isPointerFine || pos.x < 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-30 transform -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-300 opacity-60"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, rgba(197, 160, 89, 0.02) 45%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
};
