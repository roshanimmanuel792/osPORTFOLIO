import React from 'react';
import { motion } from 'framer-motion';
import { AppIcon } from '../../types';

interface DesktopIconProps {
  app: AppIcon;
  onClick: (id: string) => void;
  index: number;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ app, onClick, index }) => {
  return (
    <motion.button
      onClick={() => onClick(app.id)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      className="group flex flex-col items-center gap-2 w-24 p-2 rounded-xl hover:bg-white/10 transition-colors focus:outline-none focus:bg-white/10"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 group-hover:shadow-pink-500/20 group-hover:border-pink-500/30">
        <div style={{ color: app.color }} className="transform group-hover:scale-110 transition-transform duration-300">
           {app.icon}
        </div>
      </div>
      <span className="text-white text-xs font-medium shadow-black drop-shadow-md text-center bg-black/20 rounded-full px-2 py-0.5 backdrop-blur-sm group-hover:bg-pink-500/80 transition-colors">
        {app.label}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;