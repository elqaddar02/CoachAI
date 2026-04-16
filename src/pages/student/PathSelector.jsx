import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Cloud, Settings, Shield, Database, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
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
  'web-dev':  { gradient: 'from-blue-500 to-cyan-500',    glow: 'shadow-blue-500/30',   bg: 'bg-blue-500/10 dark:bg-blue-500/5',   border: 'border-blue-500/30',  emoji: '⚡', desc: 'React, Node.js, TypeScript, APIs, UI/UX' },
  cloud:      { gradient: 'from-cyan-500 to-teal-500',    glow: 'shadow-cyan-500/30',   bg: 'bg-cyan-500/10 dark:bg-cyan-500/5',   border: 'border-cyan-500/30',  emoji: '☁️', desc: 'AWS, Azure, GCP, Serverless, Networking' },
  devops:     { gradient: 'from-orange-500 to-amber-500', glow: 'shadow-orange-500/30', bg: 'bg-orange-500/10 dark:bg-orange-500/5',border:'border-orange-500/30', emoji: '⚙️', desc: 'Docker, Kubernetes, CI/CD, Terraform, Linux' },
  cyber:      { gradient: 'from-red-500 to-rose-500',     glow: 'shadow-red-500/30',    bg: 'bg-red-500/10 dark:bg-red-500/5',     border: 'border-red-500/30',   emoji: '🛡️', desc: 'Ethical Hacking, Pentesting, Security, Networks' },
  'data-ai':  { gradient: 'from-violet-500 to-purple-600',glow: 'shadow-violet-500/30', bg: 'bg-violet-500/10 dark:bg-violet-500/5',border:'border-violet-500/30', emoji: '🤖', desc: 'Python, ML, Deep Learning, SQL, Data Viz' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } },
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
    <div className="min-h-screen bg-bg flex flex-col items-center justify-start py-12 px-4 relative overflow-hidden font-outfit">
      {/* Background glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-5xl relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Personalization
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-4 leading-tight">
            What's your{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              learning path
            </span>
            ?
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            {user?.name ? `Hey ${user.name}! ` : ''}Choose your IT domain and our AI will build a personalized learning plan for you.
          </p>
        </motion.div>

        {/* Domain Cards Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
        >
          {IT_DOMAINS.map((domain) => {
            const meta = domainMeta[domain.id] || {};
            const IconComp = domainIcons[domain.icon] || Code;
            const isSelected = selected === domain.id;

            return (
              <motion.button
                key={domain.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(domain.id)}
                className={`
                  relative w-full text-left p-6 rounded-[2rem] border-2 transition-all duration-300 group cursor-pointer overflow-hidden
                  ${isSelected
                    ? `${meta.bg} ${meta.border} shadow-2xl ${meta.glow}`
                    : 'glass border-border-glass hover:border-white/20 dark:hover:border-white/10'}
                `}
                id={`path-${domain.id}`}
              >
                {/* Selection glow overlay */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-5 pointer-events-none`}
                    />
                  )}
                </AnimatePresence>

                {/* Check badge */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-4 right-4"
                    >
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center mb-5 shadow-lg ${meta.glow} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComp className="w-7 h-7 text-white" />
                </div>

                {/* Text */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{meta.emoji}</span>
                  <h3 className="text-lg font-extrabold text-text-primary">{domain.name}</h3>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-medium">
                  {meta.desc}
                </p>

                {/* Bottom indicator */}
                <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${meta.gradient} transition-all duration-300 ${isSelected ? 'opacity-100 w-full' : 'opacity-0 w-0'}`} />
              </motion.button>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={handleContinue}
            disabled={!selected || isNavigating}
            whileHover={selected ? { scale: 1.03 } : {}}
            whileTap={selected ? { scale: 0.97 } : {}}
            className={`
              relative flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 min-w-[260px]
              ${selected
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-2xl shadow-primary/30 hover:shadow-primary/50'
                : 'bg-[#0B1F3A] text-[#AAB4C5]/50 cursor-not-allowed'}
            `}
          >
            {isNavigating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Starting Test...
              </>
            ) : (
              <>
                {selected ? `Start ${IT_DOMAINS.find(d => d.id === selected)?.name} Test` : 'Select a Path First'}
                {selected && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Skip hint */}
        <motion.p variants={itemVariants} className="text-center text-xs text-text-secondary mt-6">
          You can change your path anytime from your dashboard settings.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PathSelector;
