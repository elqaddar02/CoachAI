import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Flame, X, Trophy } from 'lucide-react';
import ReactConfetti from 'react-confetti';

export const WeeklyReportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
             <ReactConfetti recycle={false} numberOfPieces={200} />
             
             {/* Modal */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-slate-900 to-slate-800 text-white w-full max-w-lg rounded-[2.5rem] p-8 border hover:border-border-glass shadow-2xl relative overflow-hidden"
             >
                {/* Decorative glow */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/40 blur-[100px] rounded-full point-events-none"></div>

                <div className="flex justify-between items-start relative z-10 mb-8">
                   <div>
                     <span className="text-xs font-black uppercase tracking-widest text-primary mb-1 block">Insigh IA</span>
                     <h2 className="text-3xl font-extrabold font-outfit">Ta Semaine en <span className="text-emerald-400">Revue</span></h2>
                   </div>
                   <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                     <X className="w-5 h-5" />
                   </button>
                </div>

                <div className="space-y-6 relative z-10">
                   <div className="p-5 rounded-2xl bg-white/10 border border-white/5 flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center shrink-0">
                         <Flame className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="font-bold text-lg mb-1">Streak Parfait !</h4>
                         <p className="text-sm text-slate-300">Tu as étudié 5 jours consécutifs cette semaine. Ton dévouement paye.</p>
                      </div>
                   </div>

                   <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500 text-slate-900 flex items-center justify-center shrink-0">
                         <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="font-bold text-lg mb-1 text-emerald-400">Progression Fulgurante</h4>
                         <p className="text-sm text-slate-300">Ton score en Docker a augmenté de <strong className="text-white">+20%</strong> par rapport à la semaine dernière.</p>
                      </div>
                   </div>
                   
                   <div className="pt-6 border-t border-white/10 text-center">
                       <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">Récompense Hebdo</p>
                       <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary font-bold">
                         <Trophy className="w-4 h-4" /> +500 XP Bonus
                       </div>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
