import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import engineReducer from './slices/engineSlice';
import gamificationReducer from './slices/gamificationSlice';
import learningReducer from './slices/learningSlice';
import courseReducer from './slices/courseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    engine: engineReducer,
    gamification: gamificationReducer,
    learning: learningReducer,
    course: courseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
