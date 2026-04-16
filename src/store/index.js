import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import aiReducer from './slices/aiSlice';
import gamificationReducer from './slices/gamificationSlice';
import learningReducer from './slices/learningSlice';
import courseReducer from './slices/courseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ai: aiReducer,
    gamification: gamificationReducer,
    learning: learningReducer,
    course: courseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // For complex mock objects if needed
    }),
});
