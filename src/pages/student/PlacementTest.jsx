import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronRight, AlertTriangle, X, GraduationCap, ClipboardCheck, Sparkles } from 'lucide-react';
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
    navigate('/analysis-result');
  };

  const selectedForCurrent = localAnswers[currentQuestion?.id];
  const answeredCount = Object.keys(localAnswers).length;
  const isLastQuestion = currentIdx === totalQuestions - 1;
  const canFinish = answeredCount >= Math.ceil(totalQuestions * 0.5); // reduced threshold for demo

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -50 : 50, transition: { duration: 0.15 } }),
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-start py-10 px-4 relative overflow-hidden font-inter">
      
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">

        {/* Top Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-[#B59A57]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Pulse Academy</p>
              <p className="text-lg font-black text-[#1E3A8A] leading-none">{domain?.name || 'Assessment'}</p>
            </div>
          </div>
          <button
            onClick={() => setShowExitModal(true)}
            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10 bg-white p-6 rounded-xl border border-slate-200 shadow-academic">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-slate-500">
              Examination Module <span className="text-[#1E3A8A]">{currentIdx + 1}</span> / {totalQuestions}
            </span>
            <span className="text-sm font-bold text-[#B59A57] px-3 py-1 bg-[#B59A57]/10 rounded-full">{answeredCount} Submitted</span>
          </div>
          
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#B59A57] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
          </div>

          <div className="flex gap-1.5 mt-2 flex-wrap">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => { setDirection(idx > currentIdx ? 1 : -1); setCurrentIdx(idx); }}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200 border ${
                  idx === currentIdx
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-md scale-110'
                    : localAnswers[q.id] !== undefined
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Question Area */}
        <div className="relative overflow-hidden" style={{ minHeight: '380px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white rounded-xl p-8 border border-slate-200 shadow-academic-lg"
            >
              <div className="flex items-center gap-2 mb-6">
                <ClipboardCheck className="w-4 h-4 text-[#B59A57]" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Module: {currentQuestion.topic}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#1E3A8A] mb-10 leading-snug">
                {currentQuestion.question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((option, optIdx) => {
                  const isChosen = selectedForCurrent === optIdx;
                  return (
                    <motion.button
                      key={optIdx}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(optIdx)}
                      className={`
                        flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all duration-200
                        ${isChosen
                          ? 'bg-[#1E3A8A]/5 border-[#1E3A8A] shadow-sm'
                          : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'}
                      `}
                    >
                      <span className={`
                        w-8 h-8 rounded-md flex items-center justify-center text-xs font-black flex-shrink-0 transition-colors
                        ${isChosen ? 'bg-[#1E3A8A] text-white' : 'bg-slate-100 text-slate-500'}
                      `}>
                        {optionLetters[optIdx]}
                      </span>
                      <span className={`font-semibold text-sm ${isChosen ? 'text-[#1E3A8A]' : 'text-slate-600'}`}>
                        {option}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center justify-between mt-10">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 text-slate-500 hover:text-[#1E3A8A] hover:bg-slate-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-4">
            {isLastQuestion ? (
              <motion.button
                onClick={handleFinish}
                disabled={!canFinish || isSubmitting}
                whileHover={canFinish ? { y: -2 } : {}}
                whileTap={canFinish ? { scale: 0.98 } : {}}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all duration-300 text-sm
                  ${canFinish
                    ? 'bg-[#059669] text-white shadow-md shadow-emerald-700/10 hover:bg-[#047857]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                `}
              >
                {isSubmitting ? (
                  <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Processing...</>
                ) : (
                  <><Sparkles className="w-4 h-4 text-[#B59A57]" />Finalize Assessment</>
                )}
              </motion.button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-primary flex items-center gap-2 px-8 py-3 rounded-lg"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Completion Info */}
        <AnimatePresence>
          {isLastQuestion && !canFinish && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-xs font-bold flex items-center gap-3 shadow-sm"
            >
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              Please provide more responses to ensure an accurate institutional skill analysis.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Institutional Exit Modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full border border-slate-200 shadow-academic-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">Terminate Assessment?</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">Your Current evaluation progress will not be recorded. You must complete the modules to receive your institutional track assignment.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="flex-1 py-3 rounded-lg border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Return to Test
                </button>
                <button
                  onClick={() => navigate('/student')}
                  className="flex-1 py-3 rounded-lg bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors border border-red-100"
                >
                  Exit Assessment
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
