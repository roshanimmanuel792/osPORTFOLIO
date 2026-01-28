
import React from 'react';
import { Github, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const AboutApp: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar / Image Area */}
      <div className="w-full md:w-5/12 h-64 md:h-full bg-slate-800 relative overflow-hidden">
         <img 
           src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop" 
           alt="Profile Abstract" 
           className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] to-transparent md:bg-gradient-to-r" />
         
         <div className="absolute bottom-10 left-10 text-white">
            <h1 className="text-5xl font-serif font-bold italic tracking-tight mb-2">ROSHAN IMMANUEL E</h1>
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-blue-400"></span>
              <p className="text-white/60 uppercase tracking-[0.3em] text-[10px] font-bold">Tech Enthusiast // Full Stack</p>
            </div>
         </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 md:p-16 bg-[#0c0e12] text-slate-200 overflow-y-auto">
         <h2 className="text-3xl font-light mb-8 text-white/90 leading-snug">
           Pioneering the next wave of <span className="font-serif italic text-pink-300">intelligent solutions</span> through <span className="font-serif italic text-blue-300">hardware & software</span> integration.
         </h2>
         
         <div className="space-y-8 text-lg font-light leading-relaxed text-slate-400">
           <p>
             I am a developer focused on the intersection of IoT, Machine Learning, and human-centric design. My work ranges from building anonymous global communities to high-altitude safety devices.
           </p>
           <p>
             With active engagement in <span className="text-white">Gen AI Club</span>, <span className="text-white">Nexus</span>, and <span className="text-white">E-Cell</span>, I thrive in environments that challenge the boundaries of what is possible with modern technology.
           </p>
         </div>

         <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-white/30 mb-6 font-bold">Connect via Socials</h3>
              <div className="flex gap-5">
                 {[
                   { icon: <Github size={20} />, label: 'Github', href: 'https://github.com/roshanimmanuel792' },
                   { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/roshan-immanuel-e-1b1aa4353' },
                   { icon: <Mail size={20} />, label: 'Email', href: 'mailto:roshanimmanuel10@gmail.com' },
                 ].map((social, i) => (
                   <a 
                     key={i} 
                     href={social.href} 
                     target="_blank"
                     rel="noopener noreferrer"
                     className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all hover:-translate-y-1"
                     aria-label={social.label}
                   >
                     {social.icon}
                   </a>
                 ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-end items-end text-right">
              <p className="text-[10px] text-white/20 uppercase tracking-widest">Currently Based in</p>
              <p className="text-white/60 font-serif italic text-xl">The Tech Frontier</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AboutApp;
