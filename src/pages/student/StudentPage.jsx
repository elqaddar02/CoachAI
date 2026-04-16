import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Trophy, Lightbulb, Cloud, Shield, Terminal, Star, ArrowRight, Zap,
  Briefcase, AlertTriangle, Calendar, RotateCcw, FolderEdit, BookOpen, CheckCircle, Lock, Play
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { analyzePerformance } from '../../store/slices/aiSlice';
import { resetTest, resetAll } from '../../store/slices/learningSlice';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USERS, MOCK_BADGES, IT_DOMAINS, LEVEL_DEFINITIONS } from '../../services/mockData';
import { LEVEL_COURSE_MAP } from '../../services/courseContent';
import { SkillTree } from '../../components/dashboard/SkillTree';
import { WeeklyReportModal } from '../../components/dashboard/WeeklyReportModal';
import { useNavigate } from 'react-router-dom';

const skillIcons = {
  'Linux':      <Terminal className="text-yellow-400 w-5 h-5" />,
  'AWS':        <Cloud className="text-cyan-400 w-5 h-5" />,
  'Kubernetes': <Target className="text-blue-500 w-5 h-5" />,
  'Docker':     <Shield className="text-indigo-400 w-5 h-5" />,
  'Terraform':  <Zap className="text-purple-500 w-5 h-5" />,
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0 },
};

const StudentPage = () => {
  const navigate = useNavigate();
  const [isReportOpen, setIsReportOpen] = React.useState(false);
  const dispatch = useDispatch();

  // Auth & gamification
  const { user } = useSelector(state => state.auth);
  const { recommendations, careerOrientation, isAnalyzing, weakSkills } = useSelector(state => state.ai);
  const { xp, level, badges } = useSelector(state => state.gamification);

  // Learning flow state
  const {
    selectedPath,
    testCompleted,
    assignedLevel,
    strengths,
    weaknesses,
    recommendedCourses,
  } = useSelector(state => state.learning);

  const domain = IT_DOMAINS.find(d => d.id === selectedPath);
  const levelDef = assignedLevel ? LEVEL_DEFINITIONS[assignedLevel] : null;
  const primaryCourseId = selectedPath && assignedLevel ? LEVEL_COURSE_MAP[selectedPath]?.[assignedLevel] : null;

  const studentData = MOCK_USERS.find(u => u.id === 'student_1')?.performance || {
    'Linux': 92, 'Docker': 85, 'AWS': 70, 'Kubernetes': 40, 'Terraform': 20,
  };

  useEffect(() => {
    dispatch(analyzePerformance(studentData));
  }, [dispatch]);

  const handleRetakeTest = () => {
    dispatch(resetTest());
    navigate('/placement-test');
  };

  const handleChangePath = () => {
    dispatch(resetAll());
    navigate('/choose-path');
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-8"
    >

      {/* ── Test Not Completed Banner ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPath && !testCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="p-4 bg-warning/10 border border-warning/30 rounded-2xl flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="flex items-center gap-3 flex-1">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
              <p className="text-sm font-bold text-warning">
                You haven't completed your placement test yet. Take it now to unlock personalized recommendations!
              </p>
            </div>
            <button
              onClick={() => navigate('/placement-test')}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-warning/20 border border-warning/40 text-warning font-bold text-sm hover:bg-warning/30 transition-all whitespace-nowrap"
            >
              Take the Test <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {!selectedPath && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="p-4 bg-primary/10 border border-primary/30 rounded-2xl flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="flex items-center gap-3 flex-1">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-sm font-bold text-primary">
                Start your AI learning journey! Choose a domain to get a personalized learning plan.
              </p>
            </div>
            <button
              onClick={() => navigate('/choose-path')}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary/20 border border-primary/40 text-primary font-bold text-sm hover:bg-primary/30 transition-all whitespace-nowrap"
            >
              Choose Path <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 glass p-8 rounded-[2rem]">
        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-3 items-center mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-4 h-4" /> Level {level}
            </span>
            {/* AI-assigned level badge */}
            {testCompleted && levelDef && (
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${levelDef.badge}`}>
                <Star className="w-3 h-3" /> {levelDef.label}
              </span>
            )}
            {/* Current path badge */}
            {domain && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold">
                {domain.name}
              </span>
            )}
            <button onClick={() => setIsReportOpen(true)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 hover:bg-primary/20 text-text-primary text-xs font-bold transition-all shadow-sm">
              <Calendar className="w-4 h-4 text-emerald-500" /> Bilan Hebdo
            </button>
          </motion.div>
          <h1 className="text-4xl font-extrabold text-text-primary mb-2">Salut, <span className="text-gradient hover:scale-105 inline-block transition-transform cursor-pointer">{user?.name || 'Alex'}</span> ! 👋</h1>
          <p className="text-text-secondary text-lg">
            {testCompleted
              ? `Your AI analysis is complete. Here's your personalized ${domain?.name} roadmap.`
              : 'Ton système IA a analysé tes compétences. En route vers ta carrière IT !'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Market Readiness Score */}
          <div className="text-right glass p-5 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Briefcase className="w-16 h-16 text-emerald-500" /></div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">Market Readiness</span>
            <div className="text-4xl font-black text-emerald-500 font-outfit">68% <span className="text-sm font-medium text-text-secondary uppercase">Hireable</span></div>
            <p className="text-[10px] uppercase text-text-secondary mt-1 font-bold">
              {domain ? `Profil recherché en ${domain.name}` : 'Profil très recherché en DevOps'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Action Buttons Row ────────────────────────────────────────────── */}
      {selectedPath && (
        <motion.div variants={item} className="flex flex-wrap gap-3">
          <button
            onClick={handleRetakeTest}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass border border-border-glass hover:border-primary/30 text-text-secondary hover:text-primary transition-all font-bold text-sm shadow-sm"
          >
            <RotateCcw className="w-4 h-4" /> Retake Test
          </button>
          <button
            onClick={handleChangePath}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass border border-border-glass hover:border-secondary/40 text-text-secondary hover:text-secondary transition-all font-bold text-sm shadow-sm"
          >
            <FolderEdit className="w-4 h-4" /> Change Path
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        <div className="xl:col-span-2 space-y-8">

          {/* ── Recommended Courses (AI Result) ───────────────────────────── */}
          {testCompleted && recommendedCourses.length > 0 ? (
            <motion.div variants={item} className="glass p-8 rounded-[2rem]">
              {/* Primary course CTA */}
              {primaryCourseId && levelDef && (
                <div className={`flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl bg-gradient-to-r ${levelDef.color} bg-opacity-10 border border-primary/20 bg-primary/5 mb-6`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${levelDef.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">{levelDef.label} Track</p>
                    <p className="text-sm font-bold text-text-primary">Continue your personalized curriculum</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/course/${primaryCourseId}`)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30 whitespace-nowrap flex-shrink-0"
                  >
                    Start Course <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">AI-Curated Courses</h3>
                  <p className="text-sm text-text-secondary">{recommendedCourses.length} courses for your {levelDef?.label} level</p>
                </div>
                <button
                  onClick={() => navigate('/ai-result')}
                  className="ml-auto flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                >
                  View Full Report <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedCourses.slice(0, 4).map((course, i) => (
                  <motion.button
                    key={course.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-border-glass hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-all group text-left w-full"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">{course.badge}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-text-primary leading-snug group-hover:text-primary transition-colors">{course.title}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-secondary font-bold bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-lg">{course.duration}</span>
                          <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-lg bg-primary/10">{course.level}</span>
                          <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-1">→ Open</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── Career Objective (legacy AI) ─────────────────────────────── */
            <motion.div variants={item} className="glass p-8 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target className="w-32 h-32 text-primary" />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 flex-shrink-0">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-text-secondary uppercase mb-1">Objectif Carrière IA</h3>
                  <h2 className="text-3xl font-extrabold text-text-primary mb-2 font-outfit">
                    {isAnalyzing ? 'Analyse...' : careerOrientation?.title || 'DevOps Engineer'}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Basé sur tes scores remarquables en {careerOrientation?.requiredSkills?.[0] || 'Linux'} et Docker.
                    Nous avons adapté ton parcours pour te préparer à cette carrière.
                  </p>
                </div>
                <button onClick={() => navigate('/certifications')} className="btn-primary flex-shrink-0 whitespace-nowrap shadow-lg shadow-primary/30">
                  Coffre Certifications <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── RPG Skill Tree ────────────────────────────────────────────── */}
          <motion.div variants={item}>
            <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" /> Arbre de Compétences Adaptatif
            </h3>
            <SkillTree />
          </motion.div>
        </div>

        {/* ── Right Column ─────────────────────────────────────────────────── */}
        <div className="space-y-8">

          {/* Strengths & Weaknesses (if test done) */}
          {testCompleted && (strengths.length > 0 || weaknesses.length > 0) ? (
            <motion.div variants={item} className="glass p-6 rounded-[2rem] space-y-5">
              <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> AI Skill Analysis
              </h3>
              {strengths.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">Strengths</p>
                  <div className="flex flex-wrap gap-2">
                    {strengths.map(s => (
                      <span key={s} className="px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">✓ {s}</span>
                    ))}
                  </div>
                </div>
              )}
              {weaknesses.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Areas to Improve</p>
                  <div className="flex flex-wrap gap-2">
                    {weaknesses.map(w => (
                      <span key={w} className="px-3 py-1 rounded-xl bg-red-500/15 border border-red-500/30 text-red-500 dark:text-red-400 text-xs font-bold">↗ {w}</span>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => navigate('/ai-result')}
                className="w-full py-2.5 rounded-2xl border border-primary/30 text-primary text-sm font-bold hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
              >
                View Full AI Report <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          ) : (
            /* AI Plan (legacy) */
            <motion.div variants={item} className="glass p-6 rounded-[2rem]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-glass">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center animate-pulse">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Plan d'Action IA</h3>
              </div>
              <div className="space-y-4">
                {isAnalyzing ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
                    <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
                  </div>
                ) : weakSkills.length > 0 ? (
                  <>
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-bold text-red-500 flex flex-col sm:flex-row items-center gap-3 mb-4">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                      <span>Des lacunes en Kubernetes retardent ton employabilité. L'IA a injecté des cours de rattrapage.</span>
                    </div>
                    {recommendations.slice(0, 3).map((rec, i) => (
                      <motion.div
                        key={rec.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        className={`p-4 rounded-2xl border ${rec.urgency === 'high' ? 'bg-warning/10 border-warning/30' : 'bg-primary/5 border-primary/20'} glass-hover cursor-pointer`}
                      >
                        <h4 className="text-sm font-bold text-text-primary mb-1 flex items-center gap-2">
                          {rec.urgency === 'high' ? '⚡ Cours Injecté Automatiquement' : '🚀 Projet Suggéré'}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">{rec.description}</p>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                    Parfait ! Plus aucune faiblesse détectée.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Badges System */}
          <motion.div variants={item} className="glass p-6 rounded-[2rem]">
            <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-warning" /> Certifications Marché
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {MOCK_BADGES.map(b => {
                const isEarned = badges.includes(b.id) || (b.id === 'linux-master');
                return (
                  <div key={b.id} className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all ${isEarned ? 'bg-slate-50 dark:bg-slate-800 shadow-md' : 'opacity-40 grayscale border border-dashed border-slate-300 dark:border-slate-700'}`}>
                    <div className={`w-12 h-12 rounded-xl ${b.color} flex items-center justify-center mb-3 shadow-lg`}>
                      <Shield className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-text-primary leading-tight">{b.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <WeeklyReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </motion.div>
  );
};

export default StudentPage;