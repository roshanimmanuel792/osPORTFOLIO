import React, { useState } from 'react';
import { User, Briefcase, FileText, Mail, Music, Layers } from 'lucide-react';
import { AppID, AppIcon, WindowState } from './types';
import AdaptiveBackground from './components/UI/AdaptiveBackground';
import CustomCursor from './components/UI/CustomCursor';
import Taskbar from './components/System/Taskbar';
import Window from './components/System/Window';
import DesktopIcon from './components/System/DesktopIcon';
import ProjectsApp from './components/Apps/ProjectsApp';
import ResumeApp from './components/Apps/ResumeApp';
import AboutApp from './components/Apps/AboutApp';

// App Configuration
const APPS: AppIcon[] = [
  { id: AppID.ABOUT, label: 'About Me', icon: <User size={28} />, color: '#60A5FA' },
  { id: AppID.PROJECTS, label: 'Projects', icon: <Layers size={28} />, color: '#F472B6' },
  { id: AppID.RESUME, label: 'Resume', icon: <FileText size={28} />, color: '#34D399' },
  { id: AppID.CONTACT, label: 'Contact', icon: <Mail size={28} />, color: '#FBBF24' },
  { id: AppID.SPOTIFY, label: 'Vibes', icon: <Music size={28} />, color: '#1DB954' },
];

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(10);

  const openApp = (id: string) => {
    setWindows(prev => {
      // Check if already open
      const exists = prev.find(w => w.id === id);
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);

      if (exists) {
        // If minimized, restore it. If open, bring to front.
        return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: newZ } : w);
      }
      // Open new window
      return [...prev, { id, isOpen: true, isMinimized: false, zIndex: newZ }];
    });
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const focusWindow = (id: string) => {
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ } : w));
  };

  // Helper to get window title
  const getAppTitle = (id: string) => APPS.find(a => a.id === id)?.label || 'Window';

  // Helper to render content based on ID
  const renderAppContent = (id: string) => {
    switch (id) {
      case AppID.PROJECTS:
        return <ProjectsApp />;
      case AppID.RESUME:
        return <ResumeApp />;
      case AppID.ABOUT:
        return <AboutApp />;
      case AppID.CONTACT:
        return (
          <div className="flex items-center justify-center h-full text-white/50 flex-col gap-4">
             <Mail size={48} className="text-pink-400" />
             <p>Drop a mail at <span className="text-white font-medium select-text">hello@auraos.dev</span></p>
          </div>
        );
      case AppID.SPOTIFY:
        return (
          <div className="flex items-center justify-center h-full text-white/50 flex-col gap-4 p-8 text-center">
             <Music size={48} className="text-green-500 animate-pulse" />
             <p className="max-w-xs">Listening to <span className="text-white">Lo-Fi Beats to Code To</span> on Spotify.</p>
             <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
               <div className="h-full bg-green-500 w-2/3 animate-[width_2s_ease-in-out_infinite]" />
             </div>
          </div>
        );
      default:
        return <div className="p-10 text-white">App Content Not Found</div>;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans select-none">
      <CustomCursor />
      <AdaptiveBackground />

      {/* Desktop Area - Icons Grid */}
      <div className="relative z-10 p-8 pt-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-8 justify-items-start content-start h-full pointer-events-none">
         <div className="flex flex-wrap gap-6 flex-col pointer-events-auto">
            {APPS.map((app, index) => (
              <DesktopIcon 
                key={app.id} 
                app={app} 
                index={index} 
                onClick={openApp} 
              />
            ))}
         </div>
      </div>

      {/* Date/Time Widget Top Right */}
      <div className="fixed top-8 right-8 text-right z-0 pointer-events-none hidden md:block">
         <h1 className="text-6xl font-serif text-white/20 font-bold tracking-tighter">
           {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
         </h1>
         <p className="text-white/40 font-medium uppercase tracking-widest text-sm mt-1">
           {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
         </p>
         <p className="text-pink-400/50 text-xs mt-2 italic">AuraOS v1.0</p>
      </div>

      {/* Windows Layer */}
      <div className="fixed inset-0 pointer-events-none z-30">
        {windows.map(window => (
          <div key={window.id} className="pointer-events-auto">
             <Window
               windowState={window}
               title={getAppTitle(window.id)}
               onClose={closeWindow}
               onMinimize={minimizeWindow}
               onFocus={focusWindow}
             >
               {renderAppContent(window.id)}
             </Window>
          </div>
        ))}
      </div>

      {/* Taskbar */}
      <Taskbar 
        apps={APPS} 
        openApps={windows.filter(w => !w.isMinimized).map(w => w.id)} 
        onAppClick={openApp} 
      />
    </div>
  );
};

export default App;