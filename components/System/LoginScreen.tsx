
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Loader2 } from 'lucide-react';
import { useMousePosition } from '../../hooks/useMousePosition';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { x, y } = useMousePosition();

  const handleSignIn = () => {
    setIsLoading(true);
    // Reduced duration for better UX
    const duration = 1200;
    const interval = 30;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    setTimeout(() => {
      onLogin();
    }, duration);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]"
          animate={{ x: x - 300, y: y - 300 }}
          transition={{ type: 'spring', damping: 40, stiffness: 40 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-8">
        <AnimatePresence mode="wait">
          {!isLoading ? (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-10"
            >
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 animate-spin-slow">
                <div className="w-28 h-28 rounded-full bg-[#050505] flex items-center justify-center overflow-hidden p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-4xl font-serif italic text-white shadow-inner">
                    R
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <h1 className="text-4xl font-serif text-white tracking-tight">Roshan</h1>
                <p className="text-white/40 font-sans text-xs uppercase tracking-[0.4em] font-medium">
                  Personal Workstation
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignIn}
                className="group relative w-full py-5 rounded-2xl bg-white/5 backdrop-blur-3xl border border-white/10 text-white flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all duration-500 shadow-2xl overflow-hidden"
              >
                <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                <span className="tracking-[0.2em] uppercase text-xs font-bold">Unlock Space</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="loading-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="relative w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-xs uppercase tracking-[0.3em] font-light italic">
                  {progress < 50 ? 'Initializing...' : 'Welcome Roshan'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </motion.div>
  );
};

export default LoginScreen;
