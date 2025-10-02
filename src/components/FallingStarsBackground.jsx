import React, { useEffect, useRef } from 'react';

export default function FallingStarsBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const starsRef = useRef([]);
  const dprRef = useRef(1);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Size to viewport with DPR
    const { innerWidth, innerHeight, devicePixelRatio } = window;
    dprRef.current = devicePixelRatio || 1;
    canvas.width = innerWidth * dprRef.current;
    canvas.height = innerHeight * dprRef.current;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);

    // Create stars
    const area = innerWidth * innerHeight;
    const density = 0.00015; // stars per px^2 (~150 on 1920x1080)
    const starCount = Math.max(80, Math.min(300, Math.floor(area * density)));

    const stars = new Array(starCount).fill(0).map(() => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      radius: Math.random() * 1.4 + 0.3, // 0.3 - 1.7 px
      speed: Math.random() * 0.8 + 0.2,  // 0.2 - 1.0 px/frame
      alpha: Math.random() * 0.6 + 0.4   // 0.4 - 1.0
    }));

    starsRef.current = stars;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { innerWidth, innerHeight } = window;

    // Clear
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // Draw stars
    ctx.save();
    for (const star of starsRef.current) {
      // Move downward
      star.y += star.speed;
      if (star.y - star.radius > innerHeight) {
        // Wrap to top with new x and params variation
        star.y = -star.radius;
        star.x = Math.random() * innerWidth;
        star.radius = Math.random() * 1.4 + 0.3;
        star.speed = Math.random() * 0.8 + 0.2;
        star.alpha = Math.random() * 0.6 + 0.4;
      }

      // Twinkle slight alpha variance
      const twinkle = (Math.sin((Date.now() + star.x) * 0.002) + 1) * 0.25; // 0..0.5
      const a = Math.min(1, Math.max(0.2, star.alpha - 0.25 + twinkle));

      // Draw star
      ctx.beginPath();
      ctx.fillStyle = `rgba(230, 237, 243, ${a})`;
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();

      // Glow
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(255,255,255,0.6)';
    }
    ctx.restore();

    animationRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    initCanvas();
    draw();

    const onResize = () => {
      cancelAnimationFrame(animationRef.current);
      initCanvas();
      draw();
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none w-screen h-screen"
      aria-hidden="true"
    />
  );
}
