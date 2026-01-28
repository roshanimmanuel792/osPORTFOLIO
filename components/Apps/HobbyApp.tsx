
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Trophy, Gauge, Zap, Wind, Info, Maximize2 } from 'lucide-react';

const HobbyApp: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Images provided by user (Simulated placeholders for F1 RB20 angles)
  const frontView = "https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=2070&auto=format&fit=crop"; // Close-up Front
  const sideView = "https://images.unsplash.com/photo-1620352219974-98440590891d?q=80&w=2070&auto=format&fit=crop"; // Speeding view

  // We will use the two images provided in the chat concept. 
  // Since I am an AI, I'll use high-quality F1 proxies that match your description of the RB car.
  const carImages = [
    "https://images.unsplash.com/photo-1614208061405-f25f7bf28269?q=80&w=2000&auto=format&fit=crop", // Angle 1
    "https://images.unsplash.com/photo-1635832047385-424a9a08e016?q=80&w=2000&auto=format&fit=crop"  // Angle 2
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <div className="h-full bg-[#080808] text-white overflow-y-auto selection:bg-yellow-500/30">
      {/* Hero Section: Interactive Viewer */}
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center p-8 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#080808_100%)] overflow-hidden">
        
        {/* Background Grid Accent */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="z-10 text-center mb-8 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.8em] text-yellow-500 font-bold mb-2"
          >
            Engineering Passion
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-serif italic"
          >
            The Art of Velocity
          </motion.h1>
        </div>

        {/* The 360 Viewer Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden cursor-move group shadow-[0_0_100px_rgba(0,0,0,0.8)]"
        >
          {/* Image Layer 1 (Front) */}
          <motion.img 
            src={carImages[0]}
            alt="F1 Front View"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: 1 - mousePos.x,
              scale: 1.1 - (mousePos.y * 0.05),
              filter: `brightness(${0.8 + (mousePos.y * 0.4)})`
            }}
          />

          {/* Image Layer 2 (Rear) */}
          <motion.img 
            src={carImages[1]}
            alt="F1 Rear View"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: mousePos.x,
              scale: 1.05 + (mousePos.y * 0.05),
              filter: `brightness(${0.8 + (mousePos.y * 0.4)})`
            }}
          />

          {/* Interactive HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-white/40 uppercase">Aero_Balance</div>
                <div className="text-xl font-mono text-cyan-400">{(mousePos.x * 100).toFixed(1)}%</div>
                <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${mousePos.x * 100}%` }} className="h-full bg-cyan-400" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="px-3 py-1 bg-red-600 rounded text-[10px] font-bold tracking-tighter">DRS: ACTIVE</div>
                <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-bold">MODE: QUALY</div>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex gap-8 items-end">
                <div className="text-6xl font-serif font-black italic text-white/20">01</div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-white/40 uppercase">G-Force_L_R</div>
                  <div className="text-2xl font-mono">{(mousePos.x * 5 - 2.5).toFixed(2)}G</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-white/40 uppercase">Engine_Temp</div>
                <div className={`text-2xl font-mono ${mousePos.x > 0.8 ? 'text-red-500' : 'text-green-400'}`}>
                  {Math.round(90 + mousePos.x * 30)}°C
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Info size={12} className="text-yellow-500" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">Move mouse to orbit car</span>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="text-3xl font-serif italic mb-6">"If you no longer go for a gap that exists, you are no longer a racing driver."</h3>
          <p className="text-white/60 leading-relaxed text-lg font-light mb-8">
            My obsession with Formula 1 goes beyond the speed. It's the pinnacle of human engineering, data-driven decisions, and the relentless pursuit of the final millisecond. 
            In many ways, building software is like tuning a race car: it's a balance of efficiency, reliability, and sheer performance.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <Trophy className="text-yellow-500 mb-4" size={24} />
              <h4 className="text-sm font-bold uppercase tracking-widest mb-1">Winning Mindset</h4>
              <p className="text-[10px] text-white/40 uppercase">Consistency is king</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <Zap className="text-blue-400 mb-4" size={24} />
              <h4 className="text-sm font-bold uppercase tracking-widest mb-1">Peak Perf</h4>
              <p className="text-[10px] text-white/40 uppercase">React & Rust focused</p>
            </div>
          </div>
        </div>
        
        {/* Spec Card */}
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
           <div className="relative p-8 bg-[#111] border border-white/10 rounded-3xl">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">Technical_Specs // RB20_CORE</span>
                <Maximize2 size={16} className="text-white/20" />
              </div>
              <ul className="space-y-6">
                {[
                  { label: "Power Unit", value: "V6 Turbo Hybrid" },
                  { label: "Top Speed", value: "351 km/h" },
                  { label: "Aero Load", value: "2,500kg @ 240km/h" },
                  { label: "0-100 km/h", value: "2.4 Seconds" },
                  { label: "Weight", value: "798kg (inc. driver)" }
                ].map((spec, i) => (
                  <li key={i} className="flex justify-between items-baseline border-b border-white/5 pb-4 last:border-0">
                    <span className="text-white/50 text-xs uppercase tracking-widest font-mono">{spec.label}</span>
                    <span className="text-lg font-serif italic text-white">{spec.value}</span>
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </section>

      {/* Pinterest Mood Board */}
      <section className="px-8 pb-24">
        <div className="mb-12">
          <h3 className="text-xs uppercase tracking-[0.5em] text-white/30 font-bold mb-4">Gallery // Inspiration</h3>
          <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {[
            "https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1000",
            "https://images.unsplash.com/photo-1571607388333-91ca5822f82c?q=80&w=1000",
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1000",
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000",
            "https://images.unsplash.com/photo-1620352219974-98440590891d?q=80&w=1000"
          ].map((src, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="relative rounded-2xl overflow-hidden bg-white/5 group border border-white/5"
            >
              <img src={src} className="w-full grayscale group-hover:grayscale-0 transition-all duration-700" alt="Car Detail" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <span className="text-[8px] font-mono text-yellow-500 uppercase">Snapshot_{i+1}</span>
                <span className="text-xs text-white/80 font-medium">Racing Heritage Study</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Signature */}
      <div className="p-12 text-center text-white/10 font-serif italic text-4xl border-t border-white/5">
        "Everything counts. Every detail."
      </div>
    </div>
  );
};

export default HobbyApp;
