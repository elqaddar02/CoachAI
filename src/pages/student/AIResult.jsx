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

const AIResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assignedLevel, strengths, weaknesses, selectedPath, recommendedCourses } = useSelector(state => state.learning);
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const levelDef = assignedLevel ? LEVEL_DEFINITIONS[assignedLevel] : null;
  const domain = IT_DOMAINS.find(d => d.id === selectedPath);

  // Get the primary course for this domain + level
  const primaryCourseId = selectedPath && assignedLevel ? LEVEL_COURSE_MAP[selectedPath]?.[assignedLevel] : null;

  const handleStartCourse = (courseId) => navigate(`/course/${courseId}`);

  // Redirect if no result exists
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
    <div className="min-h-screen bg-bg py-10 px-4 relative overflow-hidden font-outfit">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={assignedLevel >= 3 ? 300 : 150}
          colors={['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b']}
          style={{ zIndex: 100 }}
        />
      )}

      {/* Bg glows */}
      <div className={`absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br ${levelDef.color} opacity-10 rounded-full blur-[140px] pointer-events-none`} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto relative z-10"
      >

        {/* ── AI Processing Banner ─────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            AI Analysis Complete
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-3">
            Your Learning <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Based on your {domain?.name} assessment — here's what our AI found.
          </p>
        </motion.div>

        {/* ── Level Badge Hero ─────────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="glass rounded-[2.5rem] p-10 text-center mb-8 border border-border-glass relative overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${levelDef.color} opacity-5 pointer-events-none`} />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.3 }}
            className="relative z-10"
          >
            <div className={`w-28 h-28 rounded-[2rem] bg-gradient-to-br ${levelDef.color} mx-auto flex items-center justify-center mb-6 shadow-2xl ${levelDef.glow}`}>
              <Trophy className="w-14 h-14 text-white" />
            </div>
          </motion.div>

          <div className="relative z-10">
            <p className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-2">Assigned Level</p>
            <h2 className={`text-6xl font-black mb-3 bg-gradient-to-r ${levelDef.color} bg-clip-text text-transparent`}>
              {levelDef.label}
            </h2>
            <div className={`inline-block px-5 py-2 rounded-full border ${levelDef.badge} font-bold text-sm mb-4`}>
              Level {assignedLevel} / 4 — {domain?.name}
            </div>
            <p className="text-text-secondary text-base max-w-md mx-auto leading-relaxed">
              {levelDef.description}
            </p>
          </div>
        </motion.div>

        {/* ── Strengths & Weaknesses ───────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Strengths */}
          <div className="glass rounded-[2rem] p-7 border border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">Strengths Detected</h3>
            </div>
            {strengths.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {strengths.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-bold"
                  >
                    ✓ {s}
                  </motion.span>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary text-sm">Complete more questions to reveal strengths.</p>
            )}
          </div>

          {/* Weaknesses */}
          <div className="glass rounded-[2rem] p-7 border border-red-500/20 bg-red-500/5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">Areas to Improve</h3>
            </div>
            {weaknesses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {weaknesses.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="px-4 py-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-bold"
                  >
                    ↗ {w}
                  </motion.span>
                ))}
              </div>
            ) : (
              <p className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">🎉 No major weaknesses found!</p>
            )}
          </div>
        </motion.div>

        {/* ── Featured Course CTA ──────────────────────────────────────────── */}
        {primaryCourseId && (
          <motion.div variants={itemVariants} className={`glass rounded-[2.5rem] p-8 mb-8 border-2 border-primary/30 bg-primary/5 relative overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${levelDef.color} opacity-[0.04] pointer-events-none`} />
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${levelDef.color} flex items-center justify-center shadow-xl ${levelDef.glow} flex-shrink-0`}>
                <Play className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Your {levelDef.label} Track Course</p>
                <h3 className="text-xl font-bold text-text-primary mb-1">Ready to start learning?</h3>
                <p className="text-sm text-text-secondary">Your AI-assigned curriculum is ready. Jump in and complete your first lesson now.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleStartCourse(primaryCourseId)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${levelDef.color} shadow-xl ${levelDef.glow} whitespace-nowrap flex-shrink-0`}
              >
                Start Learning <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── Recommended Courses ──────────────────────────────────────────── */}
        {recommendedCourses.length > 0 && (
          <motion.div variants={itemVariants} className="glass rounded-[2.5rem] p-8 mb-8 border border-border-glass">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">All Matched Courses</h3>
                <p className="text-sm text-text-secondary">{recommendedCourses.length} courses for your {levelDef.label} level</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedCourses.map((course, i) => (
                <motion.button
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-border-glass hover:border-primary/30 hover:bg-primary/5 transition-all group cursor-pointer text-left w-full"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{course.badge}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-sm font-bold text-text-primary leading-snug group-hover:text-primary transition-colors">{course.title}</h4>
                        <span className="text-xs text-text-secondary font-bold flex-shrink-0 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-lg">{course.duration}</span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">{course.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-primary/10 text-primary">{course.level}</span>
                        <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          Start <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Recommended Path ─────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="glass rounded-[2rem] p-7 mb-8 border border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-primary" />
            <p className="text-sm font-bold text-text-secondary uppercase tracking-widest">Recommended Career Path</p>
          </div>
          <p className="text-text-primary font-bold text-lg">
            {domain?.name} → {LEVEL_DEFINITIONS[assignedLevel]?.label} Track
          </p>
          <p className="text-text-secondary text-sm mt-1">
            Your personalized roadmap has been generated. Head to your dashboard to start learning.
          </p>
        </motion.div>

        {/* ── CTAs ─────────────────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/student')}
            className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all"
          >
            Go to My Dashboard
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <button
            onClick={handleRetake}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-border-glass text-text-secondary hover:text-text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-bold"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Test
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AIResult;
