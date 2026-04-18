import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactConfetti from 'react-confetti';
import { Trophy, CheckCircle, AlertCircle, ArrowRight, RotateCcw, Target, BookOpen, Sparkles, Play } from 'lucide-react';
import { LEVEL_DEFINITIONS, IT_DOMAINS } from '../../services/mockData';
import { LEVEL_COURSE_MAP } from '../../services/courseContent';
import { resetTest } from '../../store/slices/learningSlice';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

const AnalysisResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assignedLevel, strengths, weaknesses, selectedPath, recommendedCourses } = useSelector(state => state.learning);
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const levelDef = assignedLevel ? LEVEL_DEFINITIONS[assignedLevel] : null;
  const domain = IT_DOMAINS.find(d => d.id === selectedPath);

  const primaryCourseId = selectedPath && assignedLevel ? LEVEL_COURSE_MAP[selectedPath]?.[assignedLevel] : null;

  const handleStartCourse = (courseId) => navigate(`/course/${courseId}`);

  useEffect(() => {
    if (!assignedLevel) navigate('/choose-path', { replace: true });
  }, [assignedLevel, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => { clearTimeout(timer); window.removeEventListener('resize', handleResize); };
  }, []);

  const handleRetake = () => {
    dispatch(resetTest());
    navigate('/placement-test');
  };

  if (!levelDef) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 relative overflow-hidden font-outfit">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={assignedLevel >= 3 ? 300 : 150}
          colors={['#1E3A8A', '#B59A57', '#CDB784', '#059669', '#FFFFFF']}
          style={{ zIndex: 100 }}
        />
      )}

      {/* Background Decorative Elements */}
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto relative z-10"
      >

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Skill Analysis Complete
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1E3A8A] mb-3">
            Your Professional <span className="text-[#B59A57]">Profile</span>
          </h1>
          <p className="text-slate-600 text-lg">
            Based on your {domain?.name} assessment — here is your institutional learning roadmap.
          </p>
        </motion.div>

        {/* ── Level Badge Hero ─────────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl p-10 text-center mb-8 border border-slate-200 shadow-academic relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1E3A8A] to-[#B59A57]" />
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.3 }}
            className="relative z-10"
          >
            <div className="w-24 h-24 rounded-2xl bg-[#1E3A8A] mx-auto flex items-center justify-center mb-6 shadow-xl border-4 border-white">
              <Trophy className="w-12 h-12 text-[#B59A57]" />
            </div>
          </motion.div>

          <div className="relative z-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Institutional Ranking</p>
            <h2 className="text-5xl font-black mb-3 text-[#1E3A8A]">
              {levelDef.label}
            </h2>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1E3A8A]/20 bg-[#1E3A8A]/5 text-[#1E3A8A] font-bold text-sm mb-4">
              Level {assignedLevel} of 4 — {domain?.name}
            </div>
            <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed">
              {levelDef.description}
            </p>
          </div>
        </motion.div>

        {/* ── Strengths & Weaknesses ───────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Strengths */}
          <div className="bg-white rounded-xl p-7 border border-emerald-100 shadow-academic">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-[#1E3A8A]">Strengths Verified</h3>
            </div>
            {strengths.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {strengths.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold"
                  >
                    ✓ {s}
                  </motion.span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm italic">Assessment in progress...</p>
            )}
          </div>

          {/* Weaknesses */}
          <div className="bg-white rounded-xl p-7 border border-amber-100 shadow-academic">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-[#1E3A8A]">Growth Opportunity</h3>
            </div>
            {weaknesses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {weaknesses.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 text-sm font-bold"
                  >
                    ↗ {w}
                  </motion.span>
                ))}
              </div>
            ) : (
              <p className="text-emerald-600 text-sm font-bold">🎉 Outstanding proficiency across all areas!</p>
            )}
          </div>
        </motion.div>

        {/* ── Featured Course CTA ──────────────────────────────────────────── */}
        {primaryCourseId && (
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-8 mb-8 border border-slate-200 shadow-academic-lg relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#1E3A8A]" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-[#1E3A8A]/5 flex items-center justify-center text-[#1E3A8A] flex-shrink-0 border border-[#1E3A8A]/10">
                <Play className="w-7 h-7" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-bold text-[#B59A57] uppercase tracking-widest mb-1">Recommended Academic Track</p>
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-1">Ready to start?</h3>
                <p className="text-sm text-slate-500">Your personalized curriculum is mapped. Begin your first core module now.</p>
              </div>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStartCourse(primaryCourseId)}
                className="btn-primary min-w-[200px]"
              >
                Start Module <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── Recommended Path ─────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="bg-slate-100 rounded-xl p-7 mb-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-[#1E3A8A]" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Career Track</p>
          </div>
          <p className="text-[#1E3A8A] font-bold text-xl">
            {domain?.name} → {levelDef.label} Track
          </p>
          <p className="text-slate-600 text-sm mt-1">
            Your personalized institutional roadmap has been verified. 
          </p>
        </motion.div>

        {/* ── CTAs ─────────────────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/student')}
            className="btn-primary flex-1 !py-4 text-lg"
          >
            Dashboard Overview
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <button
            onClick={handleRetake}
            className="btn-secondary px-8 py-4"
          >
            <RotateCcw className="w-4 h-4" />
            Re-evaluate Skills
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnalysisResult;
