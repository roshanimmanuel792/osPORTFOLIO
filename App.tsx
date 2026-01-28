
import React, { useState, useEffect } from 'react';
import { User, FileText, Mail, Layers, Terminal as TerminalIcon } from 'lucide-react';
import { AppID, AppIcon, WindowState } from './types';
import AdaptiveBackground from './components/UI/AdaptiveBackground';
import Taskbar from './components/System/Taskbar';
import Window from './components/System/Window';
import DesktopIcon from './components/System/DesktopIcon';
import ProjectsApp from './components/Apps/ProjectsApp';
import ResumeApp from './components/Apps/ResumeApp';
import AboutApp from './components/Apps/AboutApp';
import TerminalApp from './components/Apps/TerminalApp';
import LoginScreen from './components/System/LoginScreen';
import { AnimatePresence, motion } from 'framer-motion';

// App Configuration
const APPS: AppIcon[] = [
  { id: AppID.ABOUT, label: 'About Me', icon: <User size={28} />, color: '#60A5FA' },
  { id: AppID.PROJECTS, label: 'Projects', icon: <Layers size={28} />, color: '#F472B6' },
  { id: AppID.RESUME, label: 'Resume', icon: <FileText size={28} />, color: '#34D399' },
  { id: AppID.TERMINAL, label: 'Terminal', icon: <TerminalIcon size={28} />, color: '#10B981' },
  { id: AppID.CONTACT, label: 'Contact', icon: <Mail size={28} />, color: '#FBBF24' },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(10);

  const openApp = (id: string) => {
    setWindows(prev => {
      const exists = prev.find(w => w.id === id);
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);

      if (exists) {
        return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: newZ } : w);
      }
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

  const getAppTitle = (id: string) => APPS.find(a => a.id === id)?.label || 'Window';

  const renderAppContent = (id: string) => {
    switch (id) {
      case AppID.PROJECTS:
        return <ProjectsApp />;
      case AppID.RESUME:
        return <ResumeApp />;
      case AppID.ABOUT:
        return <AboutApp />;
      case AppID.TERMINAL:
        return (
          <TerminalApp 
            onRunApp={openApp} 
            availableApps={APPS.map(a => ({ id: a.id, label: a.label }))} 
          />
        );
      case AppID.CONTACT:
        return (
          <div className="flex items-center justify-center h-full text-white/50 flex-col gap-4 p-6">
             <Mail size={48} className="text-yellow-400" />
             <p className="text-center">Reach out at <br/><span className="text-white font-medium select-text">roshanimmanuel10@gmail.com</span></p>
             <div className="flex flex-wrap justify-center gap-4 mt-4">
               <a href="https://github.com/roshanimmanuel792" target="_blank" className="px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">GitHub</a>
               <a href="https://www.linkedin.com/in/roshan-immanuel-e-1b1aa4353" target="_blank" className="px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-colors">LinkedIn</a>
             </div>
          </div>
        );
      default:
        return <div className="p-10 text-white">App Content Not Found</div>;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans select-none bg-[#0a0c10]">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <LoginScreen key="login" onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="h-full w-full"
          >
            <AdaptiveBackground />
            
            <div className="relative z-10 p-8 pt-12 grid grid-cols-1 gap-8 justify-items-start content-start h-full pointer-events-none">
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

            <div className="fixed top-8 right-8 text-right z-0 pointer-events-none hidden md:block">
              <h1 className="text-6xl font-serif text-white/90 font-bold tracking-tighter drop-shadow-lg">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </h1>
              <p className="text-white/80 font-medium uppercase tracking-widest text-sm mt-1 drop-shadow-md">
                {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>

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

            <Taskbar 
              apps={APPS} 
              openApps={windows.filter(w => !w.isMinimized).map(w => w.id)} 
              onAppClick={openApp} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
