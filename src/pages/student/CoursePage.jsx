import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChevronLeft, ChevronRight, CheckCircle, Lock, BookOpen,
  Clock, Trophy, RotateCcw, Home, Code, Lightbulb, AlertTriangle, ArrowLeft,
} from 'lucide-react';
import { COURSES } from '../../services/courseContent';
import {
  setCurrentLesson, recordQuizAnswer, completeLesson, selectCourseProgress,
} from '../../store/slices/courseSlice';
import toast from 'react-hot-toast';

// ─── Content Block Renderer ───────────────────────────────────────────────────
const ContentBlock = ({ block }) => {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-text-secondary leading-relaxed text-[15px] mb-4">{block.text}</p>;

    case 'heading':
      return <h3 className="text-lg font-bold text-text-primary mt-6 mb-3">{block.text}</h3>;

    case 'code':
      return (
        <div className="mb-5">
          {block.label && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-t-2xl bg-slate-800 border-b border-slate-700">
              <Code className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-400 font-mono">{block.label}</span>
              {block.language && (
                <span className="ml-auto text-xs text-slate-500 uppercase font-bold">{block.language}</span>
              )}
            </div>
          )}
          <pre className={`overflow-x-auto bg-slate-900 text-emerald-300 text-sm leading-relaxed p-5 font-mono ${block.label ? 'rounded-b-2xl' : 'rounded-2xl'}`}>
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case 'tip':
      return (
        <div className="flex gap-3 p-4 rounded-2xl bg-primary/8 border border-primary/20 mb-4">
          <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-text-secondary leading-relaxed">{block.text}</p>
        </div>
      );

    case 'warning':
      return (
        <div className="flex gap-3 p-4 rounded-2xl bg-warning/8 border border-warning/20 mb-4">
          <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-text-secondary leading-relaxed">{block.text}</p>
        </div>
      );

    default:
      return null;
  }
};

// ─── Quiz Component ───────────────────────────────────────────────────────────
const LessonQuiz = ({ quiz, lessonIndex, courseId, onComplete }) => {
  const dispatch = useDispatch();
  const progress = useSelector(selectCourseProgress(courseId));
  const savedAnswer = progress.quizAnswers[lessonIndex];

  const [selected, setSelected] = useState(savedAnswer ?? null);
  const [submitted, setSubmitted] = useState(savedAnswer !== undefined);
  const isCorrect = submitted && selected === quiz.correctIndex;

  const handleSubmit = () => {
    if (selected === null) return;
    dispatch(recordQuizAnswer({ courseId, lessonIndex, answerIndex: selected }));
    setSubmitted(true);
    if (selected === quiz.correctIndex) {
      toast.success('Correct! 🎉 Lesson complete!');
    } else {
      toast('Not quite — read the explanation below and try the next lesson!', { icon: '💡' });
    }
  };

  const handleComplete = () => {
    dispatch(completeLesson({ courseId, lessonIndex }));
    onComplete();
  };

  return (
    <div className="mt-8 p-6 rounded-[2rem] border-2 border-primary/20 bg-primary/5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Knowledge Check</p>
          <p className="text-sm font-bold text-text-primary">Answer to unlock the next lesson</p>
        </div>
      </div>

      <h4 className="text-base font-bold text-text-primary mb-5">{quiz.question}</h4>

      <div className="grid grid-cols-1 gap-3 mb-5">
        {quiz.options.map((opt, idx) => {
          const letters = ['A', 'B', 'C', 'D'];
          let style = 'bg-[#0B1F3A]/50 border-transparent hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5';

          if (submitted) {
            if (idx === quiz.correctIndex) {
              style = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400';
            } else if (idx === selected && selected !== quiz.correctIndex) {
              style = 'bg-red-500/10 border-red-500/40 text-red-500';
            } else {
              style = 'bg-[#0B1F3A]/50 border-transparent opacity-50';
            }
          } else if (selected === idx) {
            style = 'bg-primary/10 border-primary/60';
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => !submitted && setSelected(idx)}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all duration-200 ${style}`}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${selected === idx && !submitted ? 'bg-[#D4AF37] text-[#0B1F3A]' : 'bg-[#0B1F3A] text-[#AAB4C5]'}`}>
                {letters[idx]}
              </span>
              <span className="text-sm font-medium text-text-primary">{opt}</span>
              {submitted && idx === quiz.correctIndex && (
                <CheckCircle className="ml-auto w-4 h-4 text-emerald-500 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`p-4 rounded-2xl mb-4 text-sm ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400' : 'bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-blue-400'}`}
          >
            <span className="font-bold">{isCorrect ? '✓ Correct!' : '💡 Explanation:'}</span> {quiz.explanation}
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${selected !== null ? 'bg-gradient-to-r from-[#142C54] to-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20' : 'bg-[#0B1F3A] text-[#AAB4C5]/50 cursor-not-allowed'}`}
        >
          Submit Answer
        </button>
      ) : (
        <button
          onClick={handleComplete}
          className="w-full py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Complete Lesson & Continue
        </button>
      )}
    </div>
  );
};

// ─── Main CoursePage ──────────────────────────────────────────────────────────
const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contentRef = useRef(null);

  const course = COURSES[courseId];
  const progress = useSelector(selectCourseProgress(courseId));
  const { currentLesson, completedLessons } = progress;

  const [activeLessonIdx, setActiveLessonIdx] = useState(currentLesson || 0);

  // Redirect if course doesn't exist
  useEffect(() => {
    if (!course) navigate('/student', { replace: true });
  }, [course, navigate]);

  // Scroll to top when lesson changes
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeLessonIdx]);

  if (!course) return null;

  const lessons = course.lessons;
  const activeLesson = lessons[activeLessonIdx];
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const progressPct = (completedCount / totalLessons) * 100;
  const isLessonUnlocked = (idx) => idx === 0 || completedLessons.includes(idx - 1);
  const isCourseComplete = completedCount === totalLessons;

  const handleLessonSelect = (idx) => {
    if (!isLessonUnlocked(idx)) {
      toast('Complete the previous lesson first!', { icon: '🔒' });
      return;
    }
    setActiveLessonIdx(idx);
    dispatch(setCurrentLesson({ courseId, lessonIndex: idx }));
  };

  const handleLessonComplete = () => {
    const next = activeLessonIdx + 1;
    if (next < totalLessons) {
      setActiveLessonIdx(next);
      dispatch(setCurrentLesson({ courseId, lessonIndex: next }));
    } else {
      toast.success('🎉 Course Complete! Congratulations!', { duration: 5000 });
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col font-outfit">

      {/* ── Top Navigation Bar ─────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-bg-glass backdrop-blur-2xl border-b border-border-glass">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link
              to="/student"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors font-bold text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              My Dashboard
            </Link>
            <div className="w-px h-5 bg-border-glass" />
            <div className="flex items-center gap-2">
              <span className="text-xl">{course.badge}</span>
              <span className="text-sm font-bold text-text-primary hidden sm:block">{course.title}</span>
            </div>
          </div>

          {/* Progress in header */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-bold text-text-secondary">{completedCount}/{totalLessons} complete</span>
              <div className="w-32 h-2 bg-[#0B1F3A] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#142C54] to-[#D4AF37] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ type: 'spring', stiffness: 80 }}
                />
              </div>
            </div>
            {isCourseComplete && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold">
                ✓ Completed
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Content (sidebar + lesson) ─────────────────────────── */}
      <div className="flex pt-[57px] min-h-screen">

        {/* ── Sidebar: Lesson List ─────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-80 flex-shrink-0 border-r border-border-glass bg-bg-glass backdrop-blur-xl fixed top-[57px] bottom-0 left-0 overflow-y-auto">

          {/* Course info */}
          <div className={`p-6 bg-gradient-to-br ${course.color} text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <span className="text-3xl block mb-2">{course.badge}</span>
              <h2 className="font-bold text-base leading-snug mb-1">{course.title}</h2>
              <p className="text-white/70 text-xs">{course.duration} · {totalLessons} lessons</p>
              {/* Progress bar */}
              <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="text-white/70 text-xs mt-1">{completedCount}/{totalLessons} lessons done</p>
            </div>
          </div>

          {/* Lessons List */}
          <div className="flex-1 p-4 space-y-1">
            <p className="text-xs font-black text-text-secondary uppercase tracking-widest px-2 mb-3">Course Content</p>
            {lessons.map((lesson, idx) => {
              const isActive = idx === activeLessonIdx;
              const isCompleted = completedLessons.includes(idx);
              const unlocked = isLessonUnlocked(idx);

              return (
                <button
                  key={lesson.id}
                  onClick={() => handleLessonSelect(idx)}
                  className={`w-full text-left p-3 rounded-2xl transition-all duration-200 relative group ${
                    isActive
                      ? 'bg-primary/10 border border-primary/20'
                      : unlocked
                      ? 'hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Status icon */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isActive
                        ? 'bg-primary text-white'
                        : unlocked
                        ? 'bg-[#0B1F3A] text-[#AAB4C5]'
                        : 'bg-[#0B1F3A] text-[#AAB4C5]/50'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-4 h-4" /> : !unlocked ? <Lock className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold leading-snug truncate ${isActive ? 'text-primary' : 'text-text-primary'}`}>
                        {lesson.title}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-text-secondary" />
                        <span className="text-[10px] text-text-secondary">{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── Lesson Content ──────────────────────────────────────────── */}
        <main ref={contentRef} className="flex-1 lg:ml-72 xl:ml-80 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-10">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Lesson header */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${course.color} text-white`}>
                      Lesson {activeLessonIdx + 1} of {totalLessons}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-text-secondary font-bold">
                      <Clock className="w-3.5 h-3.5" /> {activeLesson.duration}
                    </span>
                    {completedLessons.includes(activeLessonIdx) && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                        <CheckCircle className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-black text-text-primary leading-tight">{activeLesson.title}</h1>
                </div>

                {/* Content blocks */}
                <div className="prose-custom space-y-1">
                  {activeLesson.content.map((block, i) => (
                    <ContentBlock key={i} block={block} />
                  ))}
                </div>

                {/* Quiz */}
                {activeLesson.quiz && (
                  <LessonQuiz
                    quiz={activeLesson.quiz}
                    lessonIndex={activeLessonIdx}
                    courseId={courseId}
                    onComplete={handleLessonComplete}
                  />
                )}

                {/* Bottom navigation */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-border-glass">
                  <button
                    onClick={() => handleLessonSelect(activeLessonIdx - 1)}
                    disabled={activeLessonIdx === 0}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-[rgba(212,175,55,0.15)] text-[#AAB4C5] hover:text-white hover:bg-[#0B1F3A] transition-all font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  <div className="text-sm text-text-secondary font-bold">
                    {activeLessonIdx + 1} / {totalLessons}
                  </div>

                  {activeLessonIdx < totalLessons - 1 ? (
                    <button
                      onClick={() => handleLessonSelect(activeLessonIdx + 1)}
                      disabled={!isLessonUnlocked(activeLessonIdx + 1)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
                        isLessonUnlocked(activeLessonIdx + 1)
                          ? 'bg-gradient-to-r from-[#142C54] to-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20'
                          : 'bg-[#0B1F3A] text-[#AAB4C5]/50 cursor-not-allowed'
                      }`}
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/student')}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all"
                    >
                      <Home className="w-4 h-4" /> Back to Dashboard
                    </button>
                  )}
                </div>

                {/* Mobile lesson nav (only below lg) */}
                <div className="lg:hidden mt-8 p-4 glass rounded-[2rem] border border-border-glass">
                  <p className="text-xs font-black text-text-secondary uppercase tracking-widest mb-3">Lessons</p>
                  <div className="flex gap-2 flex-wrap">
                    {lessons.map((l, idx) => {
                      const unlocked = isLessonUnlocked(idx);
                      return (
                        <button
                          key={l.id}
                          onClick={() => handleLessonSelect(idx)}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                            idx === activeLessonIdx
                              ? 'bg-primary text-white'
                              : completedLessons.includes(idx)
                              ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                              : unlocked
                              ? 'bg-[#0B1F3A] text-[#AAB4C5]'
                              : 'bg-[#0B1F3A]/50 text-[#AAB4C5]/40 opacity-50'
                          }`}
                        >
                          {completedLessons.includes(idx) ? '✓' : idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursePage;
