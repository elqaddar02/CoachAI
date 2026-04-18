import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Cloud, Settings, Shield, Database, ArrowRight, Sparkles, CheckCircle, GraduationCap } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedPath } from '../../store/slices/learningSlice';
import { IT_DOMAINS } from '../../services/mockData';

const domainIcons = {
  Code: Code,
  Cloud: Cloud,
  Settings: Settings,
  Shield: Shield,
  Database: Database,
};

const domainMeta = {
  'web-dev':  { color: '#1E3A8A', emoji: '💻', desc: 'React, Node.js, TypeScript, APIs, UI/UX' },
  cloud:      { color: '#1E3A8A', emoji: '☁️', desc: 'AWS, Azure, GCP, Serverless, Networking' },
  devops:     { color: '#1E3A8A', emoji: '⚙️', desc: 'Docker, Kubernetes, CI/CD, Terraform, Linux' },
  cyber:      { color: '#1E3A8A', emoji: '🛡️', desc: 'Ethical Hacking, Pentesting, Security, Networks' },
  'data-ai':  { color: '#1E3A8A', emoji: '📊', desc: 'Python, ML, Analytics, SQL, Data Viz' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 } },
};

const PathSelector = () => {
  const [selected, setSelected] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleContinue = async () => {
    if (!selected) return;
    setIsNavigating(true);
    dispatch(setSelectedPath(selected));
    await new Promise(r => setTimeout(r, 400));
    navigate('/placement-test');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-start py-14 px-4 relative overflow-hidden font-inter">
      
      {/* Institutional Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-[#1E3A8A] z-0 shadow-lg"></div>
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] z-10 pointer-events-none"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-5xl relative z-20"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
            <GraduationCap className="w-4 h-4 text-[#B59A57]" />
            Pulse Institute Enrollment
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight font-outfit">
            Select Your <span className="text-[#B59A57]">Academic Track</span>
          </h1>
          <p className="text-slate-200 text-lg max-w-xl mx-auto font-medium">
            {user?.name ? `${user.name}, ` : ''}Select your specialization and our adaptive engine will calibrate your professional learning roadmap.
          </p>
        </motion.div>

        {/* Track Selection Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {IT_DOMAINS.map((domain) => {
            const meta = domainMeta[domain.id] || {};
            const IconComp = domainIcons[domain.icon] || Code;
            const isSelected = selected === domain.id;

            return (
              <motion.button
                key={domain.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(domain.id)}
                className={`
                  relative w-full text-left p-8 rounded-xl border-2 transition-all duration-300 overflow-hidden shadow-academic
                  ${isSelected
                    ? 'bg-slate-50 border-[#1E3A8A] ring-2 ring-[#1E3A8A]/10'
                    : 'bg-white border-slate-100 hover:border-[#1E3A8A]/30 hover:shadow-academic-lg'}
                `}
                id={`path-${domain.id}`}
              >
                {/* Selection Indicators */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-4 right-4"
                    >
                      <CheckCircle className="w-6 h-6 text-[#1E3A8A]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Icon Container - Institutional Blue */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md border-2 border-white transition-all duration-300 
                  ${isSelected ? 'bg-[#1E3A8A] text-[#B59A57]' : 'bg-slate-100 text-[#1E3A8A]'}`}>
                  <IconComp className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{meta.emoji}</span>
                  <h3 className="text-lg font-black text-[#1E3A8A] tracking-tight">{domain.name}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-wider">
                   {meta.desc}
                </p>

                {/* Accent line */}
                <div className={`mt-6 h-1 rounded-full transition-all duration-500 ${isSelected ? 'bg-[#B59A57] w-full opacity-100' : 'bg-slate-100 w-12 opacity-50'}`} />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Primary Action */}
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-6">
          <motion.button
            onClick={handleContinue}
            disabled={!selected || isNavigating}
            whileHover={selected ? { y: -2 } : {}}
            whileTap={selected ? { scale: 0.98 } : {}}
            className={`
              btn-primary min-w-[320px] !py-5 text-xl
              ${!selected ? 'opacity-40 grayscale cursor-not-allowed translate-y-0' : ''}
            `}
          >
            {isNavigating ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Calibrating Enrollment...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {selected ? `Enroll in ${IT_DOMAINS.find(d => d.id === selected)?.name}` : 'Select an Academic Track'}
                {selected && <ArrowRight className="w-6 h-6" />}
              </div>
            )}
          </motion.button>
          
          <motion.p variants={itemVariants} className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em]">
             Pulse Institute Professional Standards
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PathSelector;
