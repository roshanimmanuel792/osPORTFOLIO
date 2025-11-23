import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const AboutApp: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar / Image Area */}
      <div className="w-full md:w-5/12 h-64 md:h-full bg-slate-800 relative overflow-hidden">
         <img 
           src="https://picsum.photos/800/1200?grayscale" 
           alt="Profile" 
           className="w-full h-full object-cover opacity-80"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent md:bg-gradient-to-r" />
         
         <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-serif font-bold">Alex Dev.</h1>
            <p className="text-white/60">Creative Technologist</p>
         </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 md:p-12 bg-slate-900/90 text-slate-200 overflow-y-auto">
         <h2 className="text-2xl font-light mb-6 text-white/90">
           Bridging the gap between <span className="font-serif italic text-pink-300">design</span> and <span className="font-serif italic text-blue-300">technology</span>.
         </h2>
         
         <div className="space-y-6 text-lg font-light leading-relaxed text-slate-300">
           <p>
             Hello! I'm a passionate developer based in the Digital Realm. I specialize in building high-quality websites and applications that are not only functional but also beautiful and intuitive.
           </p>
           <p>
             With a background in traditional graphic design and years of coding experience, I bring a unique perspective to every project, ensuring pixel-perfect implementation of creative visions.
           </p>
         </div>

         <div className="mt-12">
            <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-4">Connect</h3>
            <div className="flex gap-4">
               {[
                 { icon: <Github />, label: 'Github', href: '#' },
                 { icon: <Linkedin />, label: 'LinkedIn', href: '#' },
                 { icon: <Twitter />, label: 'Twitter', href: '#' },
                 { icon: <Instagram />, label: 'Instagram', href: '#' },
               ].map((social, i) => (
                 <a 
                   key={i} 
                   href={social.href} 
                   className="p-3 bg-white/5 border border-white/5 rounded-full hover:bg-white hover:text-black transition-all hover:scale-110"
                   aria-label={social.label}
                 >
                   {social.icon}
                 </a>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AboutApp;