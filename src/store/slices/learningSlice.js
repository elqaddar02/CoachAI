import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { PLACEMENT_QUESTIONS, RECOMMENDED_COURSES, LEVEL_DEFINITIONS } from '../../services/mockData';

// ─── LocalStorage helpers ───────────────────────────────────────────────────
const STORAGE_KEY = 'lp_learning_state';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (state) => {
  try {
    const persisted = {
      selectedPath: state.selectedPath,
      assignedLevel: state.assignedLevel,
      strengths: state.strengths,
      weaknesses: state.weaknesses,
      testCompleted: state.testCompleted,
      recommendedCourses: state.recommendedCourses,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  } catch {}
};

// ─── Initial State ───────────────────────────────────────────────────────────
const persisted = loadFromStorage();

const initialState = {
  selectedPath: persisted?.selectedPath || null,       // e.g. 'devops'
  testAnswers: [],                                      // array of { questionId, answerIndex }
  testCompleted: persisted?.testCompleted || false,
  isProcessing: false,
  assignedLevel: persisted?.assignedLevel || null,     // 1 | 2 | 3 | 4
  strengths: persisted?.strengths || [],
  weaknesses: persisted?.weaknesses || [],
  recommendedCourses: persisted?.recommendedCourses || [],
};

// ─── Slice ───────────────────────────────────────────────────────────────────
const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setSelectedPath: (state, action) => {
      state.selectedPath = action.payload;
      // Changing path resets test + results
      state.testAnswers = [];
      state.testCompleted = false;
      state.assignedLevel = null;
      state.strengths = [];
      state.weaknesses = [];
      state.recommendedCourses = [];
      saveToStorage(state);
    },

    recordAnswer: (state, action) => {
      // action.payload = { questionId, answerIndex }
      const existing = state.testAnswers.findIndex(a => a.questionId === action.payload.questionId);
      if (existing >= 0) {
        state.testAnswers[existing] = action.payload;
      } else {
        state.testAnswers.push(action.payload);
      }
    },

    startProcessing: (state) => {
      state.isProcessing = true;
    },

    setTestResult: (state, action) => {
      const { assignedLevel, strengths, weaknesses, recommendedCourses } = action.payload;
      state.assignedLevel = assignedLevel;
      state.strengths = strengths;
      state.weaknesses = weaknesses;
      state.recommendedCourses = recommendedCourses;
      state.testCompleted = true;
      state.isProcessing = false;
      saveToStorage(state);
    },

    resetTest: (state) => {
      state.testAnswers = [];
      state.testCompleted = false;
      state.assignedLevel = null;
      state.strengths = [];
      state.weaknesses = [];
      state.recommendedCourses = [];
      saveToStorage(state);
    },

    resetAll: (state) => {
      state.selectedPath = null;
      state.testAnswers = [];
      state.testCompleted = false;
      state.isProcessing = false;
      state.assignedLevel = null;
      state.strengths = [];
      state.weaknesses = [];
      state.recommendedCourses = [];
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const {
  setSelectedPath,
  recordAnswer,
  startProcessing,
  setTestResult,
  resetTest,
  resetAll,
} = learningSlice.actions;

// ─── AI Processing Thunk ─────────────────────────────────────────────────────
export const processTestResults = (answers, pathId) => async (dispatch) => {
  dispatch(startProcessing());

  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2200));

  const questions = PLACEMENT_QUESTIONS[pathId] || [];
  let correctCount = 0;
  const topicScores = {}; // { topicName: { correct, total } }

  questions.forEach((q, idx) => {
    const answer = answers.find(a => a.questionId === q.id);
    const isCorrect = answer?.answerIndex === q.correctIndex;
    if (isCorrect) correctCount++;

    // Track per-topic
    const topic = q.topic || 'General';
    if (!topicScores[topic]) topicScores[topic] = { correct: 0, total: 0 };
    topicScores[topic].total++;
    if (isCorrect) topicScores[topic].correct++;
  });

  const scorePct = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;

  // Assign level (1=Beginner, 2=Intermediate, 3=Advanced, 4=Expert)
  let assignedLevel = 1;
  if (scorePct >= 80) assignedLevel = 4;
  else if (scorePct >= 60) assignedLevel = 3;
  else if (scorePct >= 35) assignedLevel = 2;

  // Compute strengths & weaknesses
  const strengths = [];
  const weaknesses = [];

  Object.entries(topicScores).forEach(([topic, { correct, total }]) => {
    const pct = (correct / total) * 100;
    if (pct >= 70) strengths.push(topic);
    else weaknesses.push(topic);
  });

  // Get recommended courses
  const allCourses = RECOMMENDED_COURSES[pathId] || [];
  const recommendedCourses = allCourses.filter(c => c.levels.includes(assignedLevel));

  dispatch(setTestResult({ assignedLevel, strengths, weaknesses, recommendedCourses }));

  const levelDef = LEVEL_DEFINITIONS[assignedLevel];
  toast.success(`🎯 Assessment Result: You're a ${levelDef.label}! Courses unlocked.`, { duration: 5000 });
};

export default learningSlice.reducer;
