
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Hammer, GitBranch } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech?: string[];
  url: string;
}

const projects: Project[] = [
  { 
    id: 1, 
    title: "LikeCircle", 
    category: "Anonymous Community Forum", 
    description: "A platform designed for meeting like-minded people across the world without social bias. Focuses on genuine connection through shared interests.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
    tech: ["Real-time Chat", "Anonymity Layer"],
    url: "http://like-circle-v1.vercel.app"
  },
  { 
    id: 2, 
    title: "TrekGuardian", 
    category: "IoT + ML Safety Device", 
    description: "Device that predicts and alerts users about high-altitude risks in 3 ways. Uses NASA Equations to derive altitude precisely.",
    image: "https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?q=80&w=1000&auto=format&fit=crop",
    tech: ["C++", "MAX30102", "ML (Decision Trees)", "NASA Eqs"],
    url: "https://github.com/roshanimmanuel792"
  },
  { 
    id: 3, 
    title: "CropVision", 
    category: "Computer Vision / AgTech", 
    description: "Capture and identify infected plants with high confidence rates. Provides remedies and predicts disease aggravation based on local temperature data.",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1000&auto=format&fit=crop",
    tech: ["Computer Vision", "Remedy AI", "Temp Prediction"],
    url: "https://github.com/roshanimmanuel792/Crop-Vision-v1.git"
  }
];

const ProjectsApp: React.FC = () => {
  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-6 w-full h-full overflow-y-auto bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center pt-8">
          <h2 className="text-4xl font-serif text-white mb-4 italic">Innovation Portfolio</h2>
          <p className="text-white/40 tracking-[0.2em] uppercase text-xs">A selection of my recent developments and research</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              onClick={() => handleProjectClick(project.url)}
              className="relative group rounded-3xl overflow-hidden cursor-pointer bg-slate-800/40 border border-white/5 flex flex-col h-full hover:shadow-[0_0_30px_rgba(244,114,182,0.1)] transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-pink-400 text-[10px] font-bold tracking-wider uppercase border border-pink-400/20">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-white text-2xl font-bold font-serif">{project.title}</h3>
                  <div className="flex gap-2">
                     <button className="p-2 bg-white/5 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all border border-white/10">
                       <ArrowUpRight size={16} />
                     </button>
                  </div>
                </div>
                
                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tech?.map(t => (
                    <span key={t} className="text-[10px] font-mono text-cyan-400/80 uppercase px-2 py-0.5 bg-cyan-400/5 rounded border border-cyan-400/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Working On Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <h3 className="text-white font-serif italic text-xl flex items-center gap-3">
              <Hammer className="text-pink-400" size={20} />
              Currently Working On
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center gap-8 group hover:bg-white/10 transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
              <GitBranch size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-white text-xl font-bold mb-2">OpenSource SnapLayout Plugin</h4>
              <p className="text-white/60 text-sm">Designing and implementing an advanced tiling and snap layout management system for LinuxMint XFCE to enhance multitasking productivity.</p>
            </div>
            <div className="px-6 py-2 bg-white/5 rounded-full border border-white/10 text-xs text-white/40 uppercase tracking-widest font-bold">
              Development phase
            </div>
          </motion.div>
        </div>
        
        <div className="mt-4 text-center pb-12">
           <a 
             href="https://github.com/roshanimmanuel792" 
             target="_blank"
             rel="noopener noreferrer"
             className="px-8 py-3 bg-white text-black hover:bg-pink-500 hover:text-white rounded-full font-bold text-sm transition-all inline-flex items-center gap-2"
           >
             EXPLORE GITHUB REPOSITORY
             <ArrowUpRight size={16} />
           </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsApp;
