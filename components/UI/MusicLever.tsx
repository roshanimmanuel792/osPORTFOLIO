
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';

const MusicLever: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="fixed top-32 left-44 z-50 flex flex-col items-center gap-6">
      {/* Label/Header */}
      <div className="flex flex-col items-center gap-1 pointer-events-none">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">
          Audio Hub
        </div>
        <div className={`text-[8px] font-mono transition-colors duration-500 ${isOn ? 'text-cyan-400 animate-pulse' : 'text-white/20'}`}>
          {isOn ? 'OS_AUDIO: ACTIVE' : 'OS_AUDIO: STANDBY'}
        </div>
      </div>

      {/* Arcade Lever Assembly */}
      <div className="relative flex flex-col items-center cursor-pointer group" onClick={() => setIsOn(!isOn)}>
        
        {/* The Lever Arm (Pivot from bottom) */}
        <motion.div
          animate={{ rotate: isOn ? 35 : -35 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ originY: '100%' }}
          className="relative flex flex-col items-center z-10"
        >
          {/* The Ball (Joystick Top) */}
          <motion.div
            animate={{
              backgroundColor: isOn ? '#22d3ee' : 'rgba(255,255,255,0.1)',
              boxShadow: isOn ? '0 0 35px rgba(34,211,238,0.8), 0 0 10px rgba(34,211,238,0.4)' : 'none',
              scale: isOn ? 1.1 : 1
            }}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300"
          >
            {isOn ? (
              <Volume2 size={16} className="text-white drop-shadow-md" />
            ) : (
              <VolumeX size={16} className="text-white/20" />
            )}
            
            {/* Specular Highlight on Ball */}
            <div className="absolute top-1 left-1 w-3 h-3 bg-white/30 rounded-full blur-[1px]" />
          </motion.div>

          {/* The Shaft */}
          <div className="w-1.5 h-20 bg-gradient-to-b from-white/40 via-white/20 to-white/10 rounded-full -mt-1 shadow-inner" />
        </motion.div>

        {/* The Base Plate (Arcade Style) */}
        <div className="w-20 h-8 -mt-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl relative overflow-hidden flex items-center justify-center">
           {/* Inner Groove for shaft movement */}
           <div className="w-14 h-2 bg-black/60 rounded-full shadow-inner" />
           
           {/* Decorative Screws */}
           <div className="absolute top-1 left-1 w-1 h-1 bg-white/20 rounded-full" />
           <div className="absolute top-1 right-1 w-1 h-1 bg-white/20 rounded-full" />
           <div className="absolute bottom-1 left-1 w-1 h-1 bg-white/20 rounded-full" />
           <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Interactive Shadow for Depth */}
        <motion.div 
          animate={{ x: isOn ? 15 : -15, opacity: 0.3 }}
          className="absolute bottom-0 w-16 h-4 bg-black/40 blur-md rounded-full -z-10"
        />
      </div>

      {/* Spotify Embed Player (Appears when ON) */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 50, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute left-16 top-0 w-[320px] h-[80px] bg-black/90 backdrop-blur-3xl rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50"
          >
            <iframe 
              src="https://open.spotify.com/embed/track/7yMtGOW1D4r1qLL6tRq3oT?utm_source=generator&theme=0" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            ></iframe>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Now Playing Footer */}
      <div className="flex flex-col items-center">
        <div className={`text-[9px] font-medium tracking-[0.2em] transition-all duration-700 ${isOn ? 'text-cyan-300 opacity-100 translate-y-0' : 'text-white/10 opacity-50 translate-y-2'}`}>
          DUNCAN LAURENCE
        </div>
        <div className={`text-[7px] tracking-[0.1em] text-white/30 uppercase mt-1 ${isOn ? 'block' : 'hidden'}`}>
          Arcade
        </div>
      </div>
    </div>
  );
};

export default MusicLever;
