import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Briefcase, ChevronRight, CheckCircle2, Lock, Star, Rocket, RefreshCw } from 'lucide-react';
import { CAREER_PATHS } from '../../services/mockData';

const CareerRoadmap = () => {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const careersList = Object.values(CAREER_PATHS);

  const handleGenerate = (career) => {
    setIsGenerating(true);
    setTimeout(() => {
      setSelectedCareer(career);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 glass p-8 rounded-[2rem] border-b-4 border-indigo-500 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] opacity-10">
          <Compass className="w-64 h-64 text-primary animate-[spin_60s_linear_infinite]" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-text-primary mb-2 font-outfit flex items-center gap-3">
             Career Roadmap <span className="px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-full shadow-lg shadow-primary/30">AI Generator</span>
          </h1>
          <p className="text-text-secondary text-lg">Choisissez votre destination tech. L'IA tracera la route la plus rapide.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Selector */}
        <div className="glass p-6 rounded-[2rem] h-fit">
          <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" /> Cible Métier
          </h3>
          <div className="space-y-3">
            {careersList.map((career) => (
              <button 
                key={career.title}
                onClick={() => handleGenerate(career)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                  selectedCareer?.title === career.title 
                  ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10' 
                  : 'bg-white/50 dark:bg-slate-800/50 border-border-glass hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                 <div className="flex flex-col">
                   <span className="font-bold text-text-primary group-hover:text-primary transition-colors">{career.title}</span>
                   <span className="text-xs text-text-secondary uppercase mt-1">{career.domain}</span>
                 </div>
                 <ChevronRight className={`w-5 h-5 ${selectedCareer?.title === career.title ? 'text-primary' : 'text-text-secondary'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Col: Timeline */}
        <div className="lg:col-span-2">
           <AnimatePresence mode="wait">
             {!selectedCareer && !isGenerating && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass p-12 rounded-[2rem] flex flex-col items-center justify-center text-center h-[500px] border border-dashed border-slate-300 dark:border-slate-700"
                >
                   <Compass className="w-20 h-20 text-slate-300 dark:text-slate-600 mb-6" />
                   <h2 className="text-2xl font-bold text-text-secondary mb-2">En attente de destination</h2>
                   <p className="text-text-secondary max-w-sm">Sélectionnez une carrière à gauche pour que le moteur IA génère la chronologie de compétences requise.</p>
                </motion.div>
             )}

             {isGenerating && (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="glass p-12 rounded-[2rem] flex flex-col items-center justify-center text-center h-[500px]"
               >
                   <RefreshCw className="w-16 h-16 text-primary animate-spin mb-6" />
                   <h2 className="text-xl font-bold text-text-primary mb-2">Calcul de la trajectoire optimale...</h2>
                   <p className="text-text-secondary">Analyse des requis du marché pour le rôle ciblé.</p>
               </motion.div>
             )}

             {selectedCareer && !isGenerating && (
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="glass p-8 rounded-[2rem] relative bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-xl"
               >
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-border-glass">
                    <div>
                      <h2 className="text-2xl font-black text-text-primary font-outfit">{selectedCareer.title}</h2>
                      <p className="text-text-secondary flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 text-warning" /> Spécialisation : {selectedCareer.domain}
                      </p>
                    </div>
                    <button className="btn-primary flex gap-2">
                       <Rocket className="w-4 h-4" /> Démarrer Roadmap
                    </button>
                  </div>

                  <div className="relative pl-8 border-l-2 border-indigo-500/30 space-y-10">
                     {/* Dynamic Steps based on career required skills */}
                     {selectedCareer.requiredSkills.map((skill, index) => {
                       const isFirst = index === 0;
                       
                       return (
                         <motion.div 
                           key={skill}
                           initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: index * 0.15 }}
                           className="relative"
                         >
                           {/* Timeline Dot */}
                           <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 flex items-center justify-center ${
                             isFirst ? 'bg-primary border-primary shadow-[0_0_15px_#6366f1]' : 'bg-slate-200 dark:bg-slate-700 border-white dark:border-slate-800'
                           }`}>
                             {isFirst && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                           </div>

                           <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${
                             isFirst ? 'bg-primary/10 border-primary/30 shadow-md' : 'bg-white/60 dark:bg-slate-800/60 border-border-glass'
                           }`}>
                              <h4 className="font-bold text-text-primary text-lg flex items-center gap-2">
                                {isFirst ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Lock className="w-5 h-5 text-slate-400" />}
                                {skill}
                              </h4>
                              <p className="text-sm text-text-secondary mt-2">
                                Maîtrisez le module {skill} pour valider cette étape clef du parcours de rentabilité sur le marché.
                              </p>
                              <div className="mt-4 pt-4 border-t border-border-glass/50 flex justify-between items-center">
                                 <span className="text-xs font-bold text-text-secondary">ESTIMATION : {Math.max(2, (index+1)*2)} SEMAINES</span>
                                 {isFirst && <span className="text-xs px-2 py-1 bg-primary text-white rounded-md font-bold animate-pulse">EN COURS</span>}
                              </div>
                           </div>
                         </motion.div>
                       )
                     })}

                     {/* Final Milestone */}
                     <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: selectedCareer.requiredSkills.length * 0.15 }}
                        className="relative"
                     >
                        <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white dark:border-slate-800 bg-warning shadow-[0_0_15px_#f59e0b]">
                        </div>
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-warning to-orange-500 text-white shadow-xl shadow-warning/20">
                          <h4 className="font-black text-xl mb-1 flex items-center gap-2">
                            <Trophy className="w-6 h-6" /> Job Ready
                          </h4>
                          <p className="text-sm opacity-90">À ce stade, vous serez certifié {selectedCareer.certifications[0]} et prêt à être embauché.</p>
                        </div>
                     </motion.div>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// Quick fix for Trophy icon because it wasn't imported at the top top prevent error
import { Trophy } from 'lucide-react';

export default CareerRoadmap;
