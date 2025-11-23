import React from 'react';
import { motion } from 'framer-motion';
import { AppIcon } from '../../types';

interface TaskbarProps {
  apps: AppIcon[];
  openApps: string[];
  onAppClick: (id: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ apps, openApps, onAppClick }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div 
        className="flex items-end gap-3 px-4 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        {apps.map((app) => {
          const isOpen = openApps.includes(app.id);
          return (
            <DockIcon 
              key={app.id} 
              app={app} 
              isOpen={isOpen} 
              onClick={() => onAppClick(app.id)} 
            />
          );
        })}
      </motion.div>
    </div>
  );
};

interface DockIconProps {
  app: AppIcon;
  isOpen: boolean;
  onClick: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({ app, isOpen, onClick }) => {
  return (
    <div className="group relative flex flex-col items-center gap-1">
      {/* Tooltip */}
      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 bg-black/80 text-white text-[10px] rounded pointer-events-none whitespace-nowrap border border-white/10">
        {app.label}
      </div>

      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.2, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg group-hover:border-white/30 transition-all overflow-hidden"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-700" />
        
        <div style={{ color: app.color }} className="drop-shadow-lg">
          {app.icon}
        </div>
      </motion.button>
      
      {/* Active Indicator */}
      <div className={`w-1 h-1 rounded-full bg-white/80 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};

export default Taskbar;