import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Download, Award, Lock, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const certs = [
    { id: 1, title: 'Bases Administrateur Linux', domain: 'DevOps', status: 'unlocked', date: 'Oct 20, 2026', score: 92 },
    { id: 2, title: 'Docker Containers Expert', domain: 'DevOps', status: 'unlocked', date: 'Nov 12, 2026', score: 85 },
    { id: 3, title: 'AWS Cloud Architect Associate', domain: 'Cloud', status: 'locked', date: null, score: 70 },
    { id: 4, title: 'Certified Kubernetes Admin', domain: 'DevOps', status: 'locked', date: null, score: 40 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 glass p-8 rounded-[2rem] border-b-4 border-emerald-500">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary mb-2 font-outfit flex items-center gap-3">
             <Award className="w-8 h-8 text-emerald-500" /> Vos Certifications
          </h1>
          <p className="text-text-secondary text-lg">Gagnez des certifications prouvant vos compétences auprès des recruteurs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {certs.map((cert) => (
            <motion.div 
              key={cert.id}
              whileHover={{ scale: 1.02 }}
              className={`p-1 rounded-[2rem] bg-gradient-to-br ${
                cert.status === 'unlocked' ? 'from-[#D4AF37] via-[#142C54] to-[#D4AF37]' : 'from-[#0B1F3A] to-[#0B1F3A] opacity-60 grayscale'
              }`}
            >
               <div className="bg-bg h-full p-8 rounded-[1.9rem] flex flex-col justify-between relative overflow-hidden group">
                  
                  {cert.status === 'locked' && (
                    <div className="absolute inset-0 bg-[#070F1F]/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-white">
                       <Lock className="w-10 h-10 mb-2" />
                       <span className="font-bold">Verrouillé</span>
                       <span className="text-xs">Objectif : 80% de Maîtrise</span>
                    </div>
                  )}

                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                     <ShieldCheck className="w-32 h-32" />
                  </div>

                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 text-xs font-bold uppercase rounded-full">
                        {cert.domain}
                      </span>
                      <ShieldCheck className={`w-8 h-8 ${cert.status === 'unlocked' ? 'text-emerald-500' : 'text-slate-400'}`} />
                    </div>
                    <h2 className="text-2xl font-black text-text-primary mb-2 leading-tight">{cert.title}</h2>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Verified by Pulse Institute Registration Office</p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border-glass flex justify-between items-center">
                    <div>
                       {cert.date ? (
                         <>
                           <span className="block text-xs uppercase font-bold text-text-secondary mb-1">Délivré le</span>
                           <span className="text-sm font-semibold text-text-primary">{cert.date}</span>
                         </>
                       ) : (
                         <>
                           <span className="block text-xs uppercase font-bold text-text-secondary mb-1">Score Actuel</span>
                           <span className={`text-sm font-semibold ${cert.score < 50 ? 'text-error' : 'text-warning'}`}>{cert.score}%</span>
                         </>
                       )}
                    </div>
                    
                    <button 
                      disabled={cert.status === 'locked'}
                      className="p-3 rounded-xl bg-[#0B1F3A] hover:bg-[#142C54] text-white transition-colors disabled:opacity-50"
                    >
                      {cert.status === 'unlocked' ? <Download className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                    </button>
                  </div>
               </div>
            </motion.div>
         ))}
      </div>
    </motion.div>
  );
};

export default Certifications;
