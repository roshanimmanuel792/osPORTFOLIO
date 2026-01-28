
import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

const AdaptiveBackground: React.FC = () => {
  const { x, y } = useMousePosition();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 90 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    mouseX.set(x);
    mouseY.set(y);
  }, [x, y, mouseX, mouseY]);

  const bgImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2560&auto=format&fit=crop";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; speedY: number; opacity: number }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 0.2 + 0.1,
        opacity: Math.random() * 0.3 + 0.1
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y > canvas.height) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0c10]">
      <div className="absolute inset-0">
        <img 
          src={bgImage} 
          alt="" 
          className="w-full h-full object-cover opacity-40 scale-105"
          style={{ filter: 'brightness(0.6)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/60 via-transparent to-pink-900/20" />
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ filter: 'url(#gooey-bg)' }}>
        <motion.div 
          className="absolute w-[40vw] h-[40vw] rounded-full bg-blue-500/30 blur-3xl"
          style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        />
        <motion.div 
          animate={{ x: [0, 50, -30, 0], y: [0, -50, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[30vw] h-[30vw] rounded-full bg-purple-600/20 blur-3xl top-[20%] left-[30%]"
        />
      </div>

      <svg className="hidden">
        <defs>
          <filter id="gooey-bg">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl md:text-7xl font-serif italic text-white/90 tracking-tight leading-[1.1]">
            "Faith can move mountains."
          </h2>
          <p className="mt-8 font-sans text-xs uppercase tracking-[0.6em] text-white/30 font-medium">
            Matthew 17:20
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />
    </div>
  );
};

export default AdaptiveBackground;
