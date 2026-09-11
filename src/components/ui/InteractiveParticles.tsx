import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  alphaSpeed: number;
}

interface Props {
  density?: number;
  glowColor?: 'gold' | 'ocean' | 'emerald';
}

export const InteractiveParticles: React.FC<Props> = ({
  density = 35,
  glowColor = 'gold'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Pause rendering when out of viewport for 120fps smooth scrolling
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTime = performance.now();
          render(lastTime);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const colorPalettes = {
      gold: ['rgba(230, 202, 133,', 'rgba(197, 160, 89,', 'rgba(243, 229, 171,'],
      ocean: ['rgba(56, 189, 248,', 'rgba(14, 165, 233,', 'rgba(224, 242, 254,'],
      emerald: ['rgba(52, 211, 153,', 'rgba(16, 185, 129,', 'rgba(236, 253, 245,']
    };

    const palette = colorPalettes[glowColor];

    const particles: Particle[] = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.6,
      color: palette[Math.floor(Math.random() * palette.length)],
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35 - 0.1,
      alpha: Math.random() * 0.6 + 0.2,
      alphaSpeed: (Math.random() * 0.01 + 0.004) * (Math.random() > 0.5 ? 1 : -1)
    }));

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      if (!isVisible) return;

      const dt = Math.min((currentTime - lastTime) / 16.67, 2.0);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.alpha += p.alphaSpeed * dt;

        if (p.alpha <= 0.15) {
          p.alpha = 0.15;
          p.alphaSpeed = Math.abs(p.alphaSpeed);
        } else if (p.alpha >= 0.85) {
          p.alpha = 0.85;
          p.alphaSpeed = -Math.abs(p.alphaSpeed);
        }

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70 will-change-transform"
      style={{ transform: 'translateZ(0)' }}
    />
  );
};
