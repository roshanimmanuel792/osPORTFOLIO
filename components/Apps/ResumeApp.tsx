
import React from 'react';
import { Download, Mail, MapPin, ExternalLink } from 'lucide-react';

const ResumeApp: React.FC = () => {
  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto text-slate-200 font-sans selection:bg-pink-500/30">
      {/* Header */}
      <header className="border-b border-white/10 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2 font-serif uppercase tracking-tight">
            ROSHAN IMMANUEL E
          </h1>
          <p className="text-xl text-white/60 font-light">Full Stack Developer & Tech Innovator</p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2 text-sm text-white/50">
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>roshanimmanuel10@gmail.com</span>
          </div>
          <a href="https://linkedin.com/in/roshan-immanuel-e-1b1aa4353" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors">
            <ExternalLink size={14} />
            <span>LinkedIn Profile</span>
          </a>
          <button className="mt-2 px-4 py-2 bg-white text-black rounded-full text-xs font-semibold hover:bg-white/90 transition-colors flex items-center gap-2 group">
            <Download size={14} />
            Download Resume
          </button>
        </div>
      </header>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-serif font-bold mb-6 text-pink-200 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-pink-400"></span>
          Experience
        </h2>
        
        <div className="space-y-10 border-l border-white/10 ml-1 pl-8 relative">
          {[
            {
              role: "JUNIOR COORDINATOR",
              company: "IAESTE LC KARUNYA",
              desc: "Coordinated and supported students applying for international technical internships, guiding them through documentation, applications, and exchange procedures. Managed communication between applicants, local committees and National committees to ensure smooth processing of outgoing exchanges.",
              tags: ["Internship Coordination", "Exchange Programs", "Student Support", "Documentation"]
            },
            {
              role: "Trainee",
              company: "Gen AI Club",
              desc: "Focusing on Generative AI research and development. Building RAG (Retrieval-Augmented Generation) Systems integrated with Vector Databases for semantic search.",
              tags: ["Gen AI", "RAG Systems", "Vector DB"]
            },
            {
              role: "Member",
              company: "Nexus Club",
              desc: "Collaborating with a network of developers on community projects and technological research within the university ecosystem.",
              tags: ["Collaboration", "Community", "Tech"]
            },
            {
              role: "Corporate Relations",
              company: "E-Cell",
              desc: "Understanding the startup landscape, exploring funding cycles, networking with entrepreneurs, and learning the operational fundamentals of growing a business.",
              tags: ["Funding", "Networking", "Startups"]
            }
          ].map((job, i) => (
            <div key={i} className="relative group">
              <span className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-600 group-hover:bg-pink-400 group-hover:border-pink-200 transition-colors" />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-xl font-medium text-white group-hover:text-pink-200 transition-colors">{job.role}</h3>
              </div>
              <p className="text-lg text-white/70 mb-1">{job.company}</p>
              <p className="text-white/50 leading-relaxed max-w-2xl mb-3">{job.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {job.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white/5 rounded text-xs text-white/40 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6 text-blue-200 flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-blue-400"></span>
             Specialized Tech
          </h2>
          <div className="flex flex-wrap gap-3">
            {["C++", "MAX30102", "Vector DB", "RAG Systems", "ML", "Decision Trees", "NASA Equations", "IoT"].map(skill => (
              <span key={skill} className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-200 hover:bg-blue-500/20 transition-colors cursor-default font-mono text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6 text-purple-200 flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-purple-400"></span>
             Ecosystem
          </h2>
          <div className="flex flex-wrap gap-3">
            {["Corporate Relations", "Startup Operations", "Funding Analysis", "Networking", "AI Research"].map(skill => (
              <span key={skill} className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-200 hover:bg-purple-500/20 transition-colors cursor-default text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeApp;
