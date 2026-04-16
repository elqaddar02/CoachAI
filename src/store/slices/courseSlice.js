import { createSlice } from '@reduxjs/toolkit';

// ─── LocalStorage persistence ─────────────────────────────────────────────────
const STORAGE_KEY = 'lp_course_progress';

const loadProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
};

const saveProgress = (progress) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {}
};

// ─── Initial State ─────────────────────────────────────────────────────────────
// Shape: { [courseId]: { currentLesson: 0, completedLessons: [], quizAnswers: {} } }
const initialState = {
  progress: loadProgress(),
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    // Set the current lesson index for a course
    setCurrentLesson: (state, action) => {
      const { courseId, lessonIndex } = action.payload;
      if (!state.progress[courseId]) {
        state.progress[courseId] = { currentLesson: 0, completedLessons: [], quizAnswers: {} };
      }
      state.progress[courseId].currentLesson = lessonIndex;
      saveProgress(state.progress);
    },

    // Record a quiz answer for a lesson
    recordQuizAnswer: (state, action) => {
      const { courseId, lessonIndex, answerIndex } = action.payload;
      if (!state.progress[courseId]) {
        state.progress[courseId] = { currentLesson: 0, completedLessons: [], quizAnswers: {} };
      }
      state.progress[courseId].quizAnswers[lessonIndex] = answerIndex;
      saveProgress(state.progress);
    },

    // Mark a lesson as complete and unlock the next
    completeLesson: (state, action) => {
      const { courseId, lessonIndex } = action.payload;
      if (!state.progress[courseId]) {
        state.progress[courseId] = { currentLesson: 0, completedLessons: [], quizAnswers: {} };
      }
      const prog = state.progress[courseId];
      if (!prog.completedLessons.includes(lessonIndex)) {
        prog.completedLessons.push(lessonIndex);
      }
      // Auto-advance to next lesson
      prog.currentLesson = lessonIndex + 1;
      saveProgress(state.progress);
    },

    // Reset progress for a specific course
    resetCourseProgress: (state, action) => {
      const { courseId } = action.payload;
      delete state.progress[courseId];
      saveProgress(state.progress);
    },
  },
});

export const { setCurrentLesson, recordQuizAnswer, completeLesson, resetCourseProgress } = courseSlice.actions;

// Selectors
export const selectCourseProgress = (courseId) => (state) =>
  state.course.progress[courseId] || { currentLesson: 0, completedLessons: [], quizAnswers: {} };

export default courseSlice.reducer;
