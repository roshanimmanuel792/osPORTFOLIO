import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { WindowState } from '../../types';

interface WindowProps {
  windowState: WindowState;
  title: string;
  children: React.ReactNode;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
}

const Window: React.FC<WindowProps> = ({ windowState, title, children, onClose, onMinimize, onFocus }) => {
  // We use a fixed positioned motion div to simulate the window
  // In a real advanced app, we'd use react-draggable, but simple centering works for the "Pinterest OS" aesthetic
  
  if (!windowState.isOpen) return null;

  return (
    <AnimatePresence>
      {!windowState.isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 sm:inset-10 md:inset-20 lg:inset-x-40 lg:inset-y-24 bg-surface/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ zIndex: windowState.zIndex }}
          onClick={() => onFocus(windowState.id)}
        >
          {/* Window Header */}
          <div 
            className="h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 select-none"
            onDoubleClick={() => {}} // Could implement maximize toggle
          >
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); onClose(windowState.id); }}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center group"
              >
                <X size={8} className="text-red-900 opacity-0 group-hover:opacity-100" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onMinimize(windowState.id); }}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center group"
              >
                <Minus size={8} className="text-yellow-900 opacity-0 group-hover:opacity-100" />
              </button>
              <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center group">
                <Maximize2 size={8} className="text-green-900 opacity-0 group-hover:opacity-100" />
              </button>
            </div>
            
            <div className="text-xs font-medium text-white/50 font-sans tracking-wide">
              {title}
            </div>
            
            <div className="w-12"></div> {/* Spacer for alignment */}
          </div>

          {/* Window Content */}
          <div className="flex-1 overflow-auto bg-[#0a0a0a]/50 relative">
             {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;