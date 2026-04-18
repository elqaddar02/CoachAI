import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Trophy, Lightbulb, Cloud, Shield, Terminal, Star, ArrowRight, Zap,
  Briefcase, AlertTriangle, Calendar, RotateCcw, FolderEdit, BookOpen, CheckCircle, Lock, Play, GraduationCap, Award
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { analyzePerformance } from '../../store/slices/engineSlice';
import { resetTest, resetAll } from '../../store/slices/learningSlice';
import { MOCK_USERS, MOCK_BADGES, IT_DOMAINS, LEVEL_DEFINITIONS } from '../../services/mockData';
import { LEVEL_COURSE_MAP } from '../../services/courseContent';
import { SkillTree } from '../../components/dashboard/SkillTree';
import { WeeklyReportModal } from '../../components/dashboard/WeeklyReportModal';
import { useNavigate } from 'react-router-dom';

const skillIcons = {
  'Linux':      <Terminal className="text-[#1E3A8A] w-5 h-5" />,
  'AWS':        <Cloud className="text-[#0ea5e9] w-5 h-5" />,
  'Kubernetes': <Target className="text-[#1E3A8A] w-5 h-5" />,
  'Docker':     <Shield className="text-[#2563eb] w-5 h-5" />,
  'Terraform':  <Zap className="text-[#B59A57] w-5 h-5" />,
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.98, y: 15 },
  show: { opacity: 1, scale: 1, y: 0 },
};

const StudentPage = () => {
  const navigate = useNavigate();
  const [isReportOpen, setIsReportOpen] = React.useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { recommendations, careerOrientation, isAnalyzing, weakSkills } = useSelector(state => state.engine);
  const { xp, level, badges } = useSelector(state => state.gamification);

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
      className="space-y-8 font-inter"
    >

      {/* ── Test Not Completed Banner ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPath && !testCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="p-5 bg-amber-50 border border-amber-200 rounded-xl flex flex-col sm:flex-row items-center gap-4 shadow-sm"
          >
            <div className="flex items-center gap-3 flex-1">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p className="text-sm font-bold text-amber-800">
                Placement assessment incomplete. Complete your evaluation to unlock the institutional curriculum.
              </p>
            </div>
            <button
              onClick={() => navigate('/placement-test')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 text-white font-bold text-sm hover:bg-amber-700 transition-all shadow-sm whitespace-nowrap"
            >
              Start Assessment <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {!selectedPath && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="p-5 bg-[#1E3A8A]/5 border border-[#1E3A8A]/20 rounded-xl flex flex-col sm:flex-row items-center gap-4 shadow-sm"
          >
            <div className="flex items-center gap-3 flex-1">
              <Lightbulb className="w-5 h-5 text-[#1E3A8A] flex-shrink-0" />
              <p className="text-sm font-bold text-[#1E3A8A]">
                Begin your professional learning journey. Select an academic domain to receive your personalized roadmap.
              </p>
            </div>
            <button
              onClick={() => navigate('/choose-path')}
              className="btn-primary"
            >
              Select Track <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-10 rounded-xl border border-slate-200 shadow-academic">
        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-3 items-center mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1E3A8A]/5 text-[#1E3A8A] text-[10px] font-black uppercase tracking-widest border border-[#1E3A8A]/10">
              <Trophy className="w-3.5 h-3.5 text-[#B59A57]" /> Scholarship: Level {level}
            </span>
            {testCompleted && levelDef && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#B59A57]/10 text-[#B59A57] text-[10px] font-black uppercase tracking-widest border border-[#B59A57]/20">
                <Star className="w-3.5 h-3.5" /> {levelDef.label} Ranking
              </span>
            )}
            {domain && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                Track: {domain.name}
              </span>
            )}
            <button onClick={() => setIsReportOpen(true)} className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-[#B59A57]" /> Weekly Bulletin
            </button>
          </motion.div>
          <h1 className="text-4xl font-black text-[#1E3A8A] mb-2 font-outfit tracking-tight">Welcome, <span className="text-[#B59A57]">{user?.name || 'Scholar'}</span> !</h1>
          <p className="text-slate-500 text-lg font-medium">
            {testCompleted
              ? `Your skill analysis is verified. Here is your institutional ${domain?.name} roadmap.`
              : 'Our assessment engine has analyzed your profile. Exploring your technical career track.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Market Readiness Score */}
          <div className="text-right bg-white p-6 rounded-xl border border-emerald-100 shadow-academic relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Briefcase className="w-20 h-20 text-emerald-600" /></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Market Certification Readiness</span>
            <div className="text-4xl font-black text-emerald-600 font-outfit">68.5% <span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Verified</span></div>
          </div>
        </div>
      </div>

      {/* ── Action Buttons Row ────────────────────────────────────────────── */}
      {selectedPath && (
        <motion.div variants={item} className="flex flex-wrap gap-3">
          <button
            onClick={handleRetakeTest}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#1E3A8A] hover:bg-slate-50 transition-all font-bold text-sm shadow-sm"
          >
            <RotateCcw className="w-4 h-4" /> Re-evaluate Proficiency
          </button>
          <button
            onClick={handleChangePath}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#B59A57] hover:bg-slate-50 transition-all font-bold text-sm shadow-sm"
          >
            <FolderEdit className="w-4 h-4" /> Update Academic Track
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">

          {/* ── Recommended Modules ───────────────────────────── */}
          {testCompleted && recommendedCourses.length > 0 ? (
            <motion.div variants={item} className="bg-white p-8 rounded-xl border border-slate-200 shadow-academic">
              {primaryCourseId && levelDef && (
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl bg-slate-50 border border-slate-200 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-[#1E3A8A] flex items-center justify-center shadow-md flex-shrink-0">
                    <Play className="w-7 h-7 text-[#B59A57]" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-[10px] font-black text-[#B59A57] uppercase tracking-widest mb-1">{levelDef.label} Track</p>
                    <p className="text-sm font-bold text-[#1E3A8A]">Continue your institutional curriculum</p>
                  </div>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/course/${primaryCourseId}`)}
                    className="btn-primary whitespace-nowrap"
                  >
                    Start Next Module <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/5 flex items-center justify-center border border-[#1E3A8A]/10">
                    <BookOpen className="w-5 h-5 text-[#1E3A8A]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1E3A8A]">Recommended Modules</h3>
                    <p className="text-xs text-slate-400 font-medium">{recommendedCourses.length} core and elective modules matched</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/analysis-result')}
                  className="text-xs font-bold text-[#B59A57] hover:underline"
                >
                  Full Report →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedCourses.slice(0, 4).map((course, i) => (
                  <motion.button
                    key={course.id}
                    variants={item}
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="p-5 rounded-xl bg-white border border-slate-100 hover:border-[#1E3A8A] hover:bg-slate-50 transition-all group text-left shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl flex-shrink-0">{course.badge}</span>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#1E3A8A] leading-snug group-hover:text-[#B59A57] transition-colors mb-2">{course.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">{course.duration}</span>
                          <span className="text-[9px] font-black text-[#1E3A8A] bg-[#1E3A8A]/5 px-2 py-0.5 rounded uppercase">{course.level}</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── Default Track Objective ─────────────────────────────── */
            <motion.div variants={item} className="bg-white p-10 rounded-xl border border-slate-200 shadow-academic relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target className="w-32 h-32 text-[#1E3A8A]" />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-2xl bg-[#1E3A8A] flex items-center justify-center shadow-lg flex-shrink-0">
                  <Target className="w-10 h-10 text-[#B59A57]" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Career Track</h3>
                  <h2 className="text-3xl font-black text-[#1E3A8A] mb-3 font-outfit">
                    {isAnalyzing ? 'Analysis In Progress...' : careerOrientation?.title || 'DevOps Engineer'}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    Verified proficiency in {careerOrientation?.requiredSkills?.[0] || 'Linux'} detected. 
                    Your professional training path has been adjusted for optimal accreditation.
                  </p>
                </div>
                <button onClick={() => navigate('/certifications')} className="btn-primary whitespace-nowrap">
                   Accreditations <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Adaptive Skill Development ────────────────────────────────────────────── */}
          <motion.div variants={item} className="bg-white p-8 rounded-xl border border-slate-200 shadow-academic">
            <h3 className="text-xl font-bold text-[#1E3A8A] mb-8 flex items-center gap-3">
              <Star className="w-6 h-6 text-[#B59A57]" /> 
              Institutional Skill Development
            </h3>
            <SkillTree />
          </motion.div>
        </div>

        {/* ── Right Column Analysis ─────────────────────────────────────────────────── */}
        <div className="space-y-8">
          {testCompleted && (strengths.length > 0 || weaknesses.length > 0) ? (
            <motion.div variants={item} className="bg-white p-8 rounded-xl border border-slate-200 shadow-academic space-y-6">
              <h3 className="text-lg font-bold text-[#1E3A8A] flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> Skill Analysis Report
              </h3>
              {strengths.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">Core Strengths</p>
                  <div className="flex flex-wrap gap-2">
                    {strengths.map(s => (
                      <span key={s} className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] font-bold">✓ {s}</span>
                    ))}
                  </div>
                </div>
              )}
              {weaknesses.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3">Growth Areas</p>
                  <div className="flex flex-wrap gap-2">
                    {weaknesses.map(w => (
                      <span key={w} className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 text-[11px] font-bold">↗ {w}</span>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => navigate('/analysis-result')}
                className="w-full py-3 rounded-lg border border-slate-200 text-[#1E3A8A] text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Detailed Analysis <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          ) : (
            /* Analysis Strategy Card */
            <motion.div variants={item} className="bg-white p-8 rounded-xl border border-slate-200 shadow-academic">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/5 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-[#1E3A8A]" />
                </div>
                <h3 className="text-lg font-bold text-[#1E3A8A]">Learning Strategy</h3>
              </div>
              <div className="space-y-5">
                {isAnalyzing ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-20 bg-slate-50 rounded-xl"></div>
                    <div className="h-20 bg-slate-50 rounded-xl"></div>
                  </div>
                ) : weakSkills.length > 0 ? (
                  <>
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600 flex gap-3 mb-4">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                      <span>Proficiency gaps in Kubernetes identified. Supplemental modules have been assigned for immediate review.</span>
                    </div>
                    {recommendations.slice(0, 3).map((rec, i) => (
                      <div
                        key={rec.id}
                        className={`p-4 rounded-xl border ${rec.urgency === 'high' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}
                      >
                        <h4 className="text-[10px] font-black text-[#1E3A8A] mb-2 uppercase tracking-widest flex items-center gap-2">
                           {rec.urgency === 'high' ? '⚡ Urgence: Core Skill' : '🚀 Suggéré: Professional development'}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{rec.description}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm font-bold text-center">
                    All core competencies verified.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Badges System */}
          <motion.div variants={item} className="bg-white p-8 rounded-xl border border-slate-200 shadow-academic">
            <h3 className="text-lg font-bold text-[#1E3A8A] mb-8 flex items-center gap-3">
              <Award className="w-5 h-5 text-[#B59A57]" /> Professional Accreditations
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {MOCK_BADGES.slice(0, 4).map(b => {
                const isEarned = badges.includes(b.id) || (b.id === 'linux-master');
                return (
                  <div key={b.id} className={`p-5 rounded-xl flex flex-col items-center text-center transition-all ${isEarned ? 'bg-slate-50 border border-slate-200 shadow-sm' : 'opacity-25 grayscale'}`}>
                    <div className={`w-12 h-12 rounded-lg bg-[#1E3A8A] flex items-center justify-center mb-3 shadow-md border-2 border-white`}>
                      <Shield className="text-[#B59A57] w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black text-[#1E3A8A] leading-tight uppercase tracking-tighter">{b.name}</span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => navigate('/certifications')}
              className="w-full mt-6 py-2.5 text-[10px] font-black text-[#B59A57] uppercase tracking-[0.2em] border border-[#B59A57]/20 rounded-lg hover:bg-[#B59A57]/5 transition-colors"
            >
              View All Certificates
            </button>
          </motion.div>
        </div>
      </div>

      <WeeklyReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </motion.div>
  );
};

export default StudentPage;