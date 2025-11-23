import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

const AdaptiveBackground: React.FC = () => {
  const { x, y } = useMousePosition();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const moveX = (x / windowWidth) * 30;
  const moveY = (y / windowHeight) * 30;

  return (
    <div className="fixed inset-0 -z-10 bg-[#050505] overflow-hidden">
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />

      {/* Floating Blobs */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-blob"
        animate={{ x: -moveX, y: -moveY }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000"
        animate={{ x: moveX, y: moveY }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
      />
      <motion.div 
        className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] bg-pink-600/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000"
        animate={{ x: moveX * 0.5, y: moveY * 0.5 }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
      />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
        style={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)' }}
      />
    </div>
  );
};

export default AdaptiveBackground;