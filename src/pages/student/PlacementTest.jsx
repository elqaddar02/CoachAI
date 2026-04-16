import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronRight, AlertTriangle, X, Brain } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { recordAnswer, processTestResults } from '../../store/slices/learningSlice';
import { PLACEMENT_QUESTIONS, IT_DOMAINS } from '../../services/mockData';

const optionLetters = ['A', 'B', 'C', 'D'];

const PlacementTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPath, testAnswers } = useSelector(state => state.learning);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [localAnswers, setLocalAnswers] = useState({}); // { questionId: answerIndex }
  const [direction, setDirection] = useState(1); // 1=forward, -1=backward
  const [showExitModal, setShowExitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = PLACEMENT_QUESTIONS[selectedPath] || [];
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIdx];
  const progress = ((currentIdx + 1) / totalQuestions) * 100;
  const domain = IT_DOMAINS.find(d => d.id === selectedPath);

  // Redirect if no path selected
  useEffect(() => {
    if (!selectedPath) navigate('/choose-path', { replace: true });
  }, [selectedPath, navigate]);

  const handleAnswer = (answerIndex) => {
    if (!currentQuestion) return;
    setLocalAnswers(prev => ({ ...prev, [currentQuestion.id]: answerIndex }));
    dispatch(recordAnswer({ questionId: currentQuestion.id, answerIndex }));
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setDirection(1);
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setDirection(-1);
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    const answersArray = Object.entries(localAnswers).map(([questionId, answerIndex]) => ({
      questionId, answerIndex
    }));
    await dispatch(processTestResults(answersArray, selectedPath));
    navigate('/ai-result');
  };

  const selectedForCurrent = localAnswers[currentQuestion?.id];
  const answeredCount = Object.keys(localAnswers).length;
  const isLastQuestion = currentIdx === totalQuestions - 1;
  const canFinish = answeredCount >= Math.ceil(totalQuestions * 0.6); // at least 60% answered

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, transition: { duration: 0.18 } }),
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-start py-10 px-4 relative overflow-hidden font-outfit">
      {/* Bg glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">

        {/* Top Bar */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Placement Test</p>
              <p className="text-sm font-bold text-text-primary">{domain?.name || 'Assessment'}</p>
            </div>
          </div>
          <button
            onClick={() => setShowExitModal(true)}
            className="p-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Progress Section */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-text-secondary">
              Question <span className="text-text-primary">{currentIdx + 1}</span> of {totalQuestions}
            </span>
            <span className="text-sm font-bold text-primary">{answeredCount}/{totalQuestions} answered</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
          </div>
          {/* Step dots */}
          <div className="flex gap-1 mt-3 flex-wrap">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => { setDirection(idx > currentIdx ? 1 : -1); setCurrentIdx(idx); }}
                className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all duration-200 ${
                  idx === currentIdx
                    ? 'bg-primary text-white scale-110 shadow-md shadow-primary/30'
                    : localAnswers[q.id] !== undefined
                    ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                    : 'bg-slate-200 dark:bg-slate-800 text-text-secondary hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Question Card */}
        <div className="relative overflow-hidden" style={{ minHeight: '340px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="glass rounded-[2rem] p-8 border border-border-glass shadow-xl"
            >
              {/* Topic badge */}
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-5">
                {currentQuestion.topic}
              </span>

              {/* Question */}
              <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-8 leading-snug">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option, optIdx) => {
                  const isChosen = selectedForCurrent === optIdx;
                  return (
                    <motion.button
                      key={optIdx}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(optIdx)}
                      id={`option-${optIdx}`}
                      className={`
                        flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 group
                        ${isChosen
                          ? 'bg-primary/10 border-primary/60 shadow-lg shadow-primary/10'
                          : 'bg-slate-50/50 dark:bg-slate-800/30 border-transparent hover:border-primary/30 hover:bg-primary/5'}
                      `}
                    >
                      <span className={`
                        w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 transition-all duration-200
                        ${isChosen ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-700 text-text-secondary group-hover:bg-primary/20 group-hover:text-primary'}
                      `}>
                        {optionLetters[optIdx]}
                      </span>
                      <span className={`font-semibold text-sm md:text-base ${isChosen ? 'text-primary' : 'text-text-primary'}`}>
                        {option}
                      </span>
                      {isChosen && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center justify-between mt-8 gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-border-glass text-text-secondary hover:text-text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-3">
            {isLastQuestion ? (
              <motion.button
                onClick={handleFinish}
                disabled={!canFinish || isSubmitting}
                whileHover={canFinish ? { scale: 1.03 } : {}}
                whileTap={canFinish ? { scale: 0.97 } : {}}
                className={`
                  flex items-center gap-3 px-8 py-3 rounded-2xl font-bold transition-all duration-300
                  ${canFinish
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}
                `}
              >
                {isSubmitting ? (
                  <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Analyzing...</>
                ) : (
                  <><Brain className="w-4 h-4" />Submit to AI</>
                )}
              </motion.button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Not enough answers warning */}
        <AnimatePresence>
          {isLastQuestion && !canFinish && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-xl text-warning text-sm font-bold flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              Please answer at least {Math.ceil(totalQuestions * 0.6)} questions to get an accurate result.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-[2rem] p-8 max-w-md w-full border border-border-glass shadow-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center mb-5">
                <AlertTriangle className="w-7 h-7 text-warning" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Exit the test?</h3>
              <p className="text-text-secondary text-sm mb-6">Your progress won't be saved. You'll need to retake the test to get your AI-assigned level.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="flex-1 py-3 rounded-2xl border border-border-glass text-text-secondary hover:text-text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-bold"
                >
                  Continue Test
                </button>
                <button
                  onClick={() => navigate('/student')}
                  className="flex-1 py-3 rounded-2xl bg-warning/10 border border-warning/30 text-warning hover:bg-warning/20 transition-all font-bold"
                >
                  Exit Anyway
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlacementTest;
