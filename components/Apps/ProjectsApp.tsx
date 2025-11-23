import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Share2 } from 'lucide-react';
import { Project } from '../../types';

const projects: Project[] = [
  { id: 1, title: "Nebula Dashboard", category: "SaaS", image: "https://picsum.photos/600/800?random=1", heightClass: "h-96" },
  { id: 2, title: "Zenith Banking", category: "Fintech", image: "https://picsum.photos/600/400?random=2", heightClass: "h-64" },
  { id: 3, title: "Astro Commerce", category: "E-commerce", image: "https://picsum.photos/600/600?random=3", heightClass: "h-80" },
  { id: 4, title: "Bloom Health", category: "Medical", image: "https://picsum.photos/600/500?random=4", heightClass: "h-72" },
  { id: 5, title: "Echo Social", category: "Social", image: "https://picsum.photos/600/700?random=5", heightClass: "h-96" },
  { id: 6, title: "Cyber Security Hub", category: "Security", image: "https://picsum.photos/600/450?random=6", heightClass: "h-60" },
  { id: 7, title: "Quantum Analytics", category: "Data", image: "https://picsum.photos/600/550?random=7", heightClass: "h-80" },
  { id: 8, title: "Retro Game UI", category: "Gaming", image: "https://picsum.photos/600/350?random=8", heightClass: "h-56" },
];

const ProjectsApp: React.FC = () => {
  return (
    <div className="p-6 w-full h-full overflow-y-auto bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-serif text-white mb-2">My Works</h2>
          <p className="text-white/50">Curated selection of recent deployments</p>
        </div>

        {/* Masonry Grid Attempt using Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-slate-800"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-pink-400 text-xs font-bold tracking-wider uppercase mb-1 block">
                    {project.category}
                  </span>
                  <div className="flex justify-between items-end">
                    <h3 className="text-white text-xl font-bold font-serif">{project.title}</h3>
                    <div className="flex gap-2">
                       <button className="p-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all">
                         <ArrowUpRight size={18} />
                       </button>
                       <button className="p-2 bg-white/10 hover:bg-pink-500 text-white rounded-full backdrop-blur-md transition-all">
                         <Heart size={18} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center pb-8">
           <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all">
             View Github for more
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsApp;