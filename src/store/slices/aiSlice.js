import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { CAREER_PATHS } from '../../services/mockData';

const initialState = {
  recommendations: [],
  weakSkills: [],
  careerOrientation: null,
  isAnalyzing: false,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    startAnalysis: (state) => {
      state.isAnalyzing = true;
    },
    setAnalysisResult: (state, action) => {
      state.weakSkills = action.payload.weakSkills;
      state.recommendations = action.payload.recommendations;
      state.careerOrientation = action.payload.careerOrientation;
      state.isAnalyzing = false;
    },
  },
});

export const { startAnalysis, setAnalysisResult } = aiSlice.actions;

// Simulated AI Engine
export const analyzePerformance = (performanceData) => async (dispatch) => {
  dispatch(startAnalysis());
  
  // Simulate heavy processing time
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const weakSkills = [];
  const recommendations = [];

  // 1. Analyze Scores
  Object.entries(performanceData).forEach(([skill, score]) => {
    if (score < 50) {
      weakSkills.push({ skill, score, critical: true });
      recommendations.push({
        id: `rec_${skill}_1`,
        type: 'course',
        title: `Fundamental Concepts of ${skill}`,
        description: `Your score in ${skill} is critically low (${score}%). We recommend this foundational module.`,
        urgency: 'high'
      });
      recommendations.push({
        id: `rec_${skill}_2`,
        type: 'exercise',
        title: `${skill} Practice Sandbox`,
        description: `Interactive exercises to improve your ${skill} problem-solving skills.`,
        urgency: 'medium'
      });
    } else if (score < 75) {
      weakSkills.push({ skill, score, critical: false });
      recommendations.push({
        id: `rec_${skill}_3`,
        type: 'project',
        title: `Intermediate ${skill} Mini-Project`,
        description: `Apply your knowledge to reinforce your understanding.`,
        urgency: 'low'
      });
    }
  });

  // 2. Career Orientation Logic
  let careerOrientation = null;
  
  // Determine best career path based on highest scores
  let maxScore = 0;
  let topSkill = '';
  Object.entries(performanceData).forEach(([skill, score]) => {
     if (score > maxScore) { maxScore = score; topSkill = skill; }
  });

  // Simple heuristic router for Career
  if (['React', 'CSS', 'JavaScript'].includes(topSkill)) {
    careerOrientation = CAREER_PATHS['frontend-dev'];
  } else if (['Docker', 'AWS'].includes(topSkill)) {
    careerOrientation = CAREER_PATHS['cloud-architect'];
  }

  // Final Action Phase
  dispatch(setAnalysisResult({ weakSkills, recommendations, careerOrientation }));
  
  if (weakSkills.length > 0) {
    toast('AI has generated new learning recommendations for you!', { icon: '🤖' });
  } else {
    toast.success('Your performance is excellent across all modules!');
  }
};

export default aiSlice.reducer;
