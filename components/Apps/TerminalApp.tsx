
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalAppProps {
  onRunApp: (id: string) => void;
  availableApps: { id: string; label: string }[];
}

const TerminalApp: React.FC<TerminalAppProps> = ({ onRunApp, availableApps }) => {
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string }[]>([
    { type: 'output', content: "Welcome to AuraOS Terminal v2.0.0" },
    { type: 'output', content: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(' ');
    const baseCmd = args[0];

    let response = '';

    switch (baseCmd) {
      case 'help':
        response = "Available commands: ls, info, run [app_name], clear, help";
        break;
      case 'ls':
        response = availableApps.map(app => app.label).join('    ');
        break;
      case 'info':
        response = "Roshan's TechSpace - Building the future with code and design.";
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'run':
        const appName = args.slice(1).join(' ');
        const targetApp = availableApps.find(app => app.label.toLowerCase() === appName.toLowerCase());
        if (targetApp) {
          onRunApp(targetApp.id);
          response = `Launching ${targetApp.label}...`;
        } else {
          response = `Error: App '${appName}' not found. Use 'ls' to see available apps.`;
        }
        break;
      case '':
        return;
      default:
        response = `Command not found: ${baseCmd}. Type 'help' for assistance.`;
    }

    setHistory(prev => [...prev, { type: 'input', content: cmd }, { type: 'output', content: response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <div 
      className="h-full w-full bg-[#0c0c0c] font-mono text-sm p-4 overflow-hidden flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Output Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 mb-2 scrollbar-hide">
        {history.map((entry, i) => (
          <div key={i} className={entry.type === 'input' ? "text-blue-400" : "text-green-400/90"}>
            {entry.type === 'input' && <span className="text-pink-500 mr-2">roshan@techspace:~$</span>}
            <span className="whitespace-pre-wrap">{entry.content}</span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-pink-500 mr-2 flex-shrink-0">roshan@techspace:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-white w-full caret-pink-500"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>

      {/* Subtle CRT Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default TerminalApp;
