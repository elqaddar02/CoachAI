import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { MOCK_BADGES } from '../../services/mockData';

const initialState = {
  xp: 0,
  level: 1,
  badges: [],
};

const calculateLevel = (xp) => {
  // Simple RPG curve: Level = floor(sqrt(XP / 100)) + 1
  return Math.floor(Math.sqrt(Math.max(0, xp) / 100)) + 1;
};

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    addXp: (state, action) => {
      const amount = action.payload;
      state.xp += amount;
      
      const newLevel = calculateLevel(state.xp);
      if (newLevel > state.level) {
        state.level = newLevel;
        toast.success(`Level Up! You reached Level ${newLevel} 🚀`, { duration: 4000 });
      }
    },
    awardBadge: (state, action) => {
      const badgeId = action.payload;
      if (!state.badges.includes(badgeId)) {
        state.badges.push(badgeId);
        const badgeDef = MOCK_BADGES.find(b => b.id === badgeId);
        if (badgeDef) {
           toast.success(`Achievement Unlocked: ${badgeDef.name} 🏆`);
        }
      }
    },
    initializeGamification: (state, action) => {
      state.xp = action.payload.xp || 0;
      state.level = action.payload.level || 1;
      state.badges = action.payload.badges || [];
    }
  },
});

export const { addXp, awardBadge, initializeGamification } = gamificationSlice.actions;

// Complex thunk simulating course completion
export const completeCourseTask = (taskId, xpReward) => (dispatch) => {
  // Add XP
  dispatch(addXp(xpReward));
  
  // Custom logic to award badges based on tasks
  // Mock logic: if task is a react master exam
  if (taskId.includes('react') && xpReward > 100) {
    dispatch(awardBadge('react-master'));
  }
};

export default gamificationSlice.reducer;
