import { createSlice } from '@reduxjs/toolkit';
import { MOCK_USERS } from '../../services/mockData';
import toast from 'react-hot-toast';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Thunk to simulate API authentication
export const authenticateUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let foundUser = MOCK_USERS.find((u) => u.email === email);

  // Auto-Mock Generation for testing: If they use any email, simulate a student !
  if (!foundUser && email.includes('@')) {
    foundUser = {
      id: Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email: email,
      role: 'student'
    };
  }

  if (foundUser && password.length > 0) { // Accept any password for mock demo
    dispatch(loginSuccess(foundUser));
    toast.success(`Welcome back, ${foundUser.name}!`);

    // Smart redirect for students: check if they already chose a path
    if (foundUser.role === 'student') {
      try {
        const learningState = JSON.parse(localStorage.getItem('lp_learning_state') || 'null');
        if (learningState?.selectedPath) {
          return { ...foundUser, redirectTo: '/student' };
        } else {
          return { ...foundUser, redirectTo: '/choose-path' };
        }
      } catch {
        return { ...foundUser, redirectTo: '/choose-path' };
      }
    }

    return foundUser;
  } else {
    dispatch(loginFailure('Identifiants invalides. Vérifiez votre saisie.'));
    toast.error('Invalid email or password');
    throw new Error('Auth failed');
  }
};

export default authSlice.reducer;
