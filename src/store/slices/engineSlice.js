import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { CAREER_PATHS } from '../../services/mockData';

const initialState = {
  recommendations: [],
  weakSkills: [],
  careerOrientation: null,
  isAnalyzing: false,
};

const engineSlice = createSlice({
  name: 'engine',
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

export const { startAnalysis, setAnalysisResult } = engineSlice.actions;

/**
 * ─── Adaptive Performance Analysis ───
 * Analyzes skill scores and generates personalized learning paths.
 */
export const analyzePerformance = (performanceData) => async (dispatch) => {
  dispatch(startAnalysis());
  
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const weakSkills = [];
  const recommendations = [];

  // 1. Analyze Scores Layer
  Object.entries(performanceData).forEach(([skill, score]) => {
    if (score < 50) {
      weakSkills.push({ skill, score, critical: true });
      recommendations.push({
        id: `rec_${skill}_1`,
        type: 'course',
        title: `Fundamental Concepts of ${skill}`,
        description: `Your score in ${skill} is below institutional standards (${score}%). We recommend this foundational module.`,
        urgency: 'high'
      });
      recommendations.push({
        id: `rec_${skill}_2`,
        type: 'exercise',
        title: `${skill} Practice Laboratory`,
        description: `Guided exercises to improve your technical proficiency in ${skill}.`,
        urgency: 'medium'
      });
    } else if (score < 75) {
      weakSkills.push({ skill, score, critical: false });
      recommendations.push({
        id: `rec_${skill}_3`,
        type: 'project',
        title: `Intermediate ${skill} Case Study`,
        description: `Apply your knowledge to reinforce your conceptual understanding.`,
        urgency: 'low'
      });
    }
  });

  // 2. Career Path Orientation
  let careerOrientation = null;
  
  // Highest scores heuristic
  let maxScore = 0;
  let topSkill = '';
  Object.entries(performanceData).forEach(([skill, score]) => {
     if (score > maxScore) { maxScore = score; topSkill = skill; }
  });

  // Heuristic mapping
  if (['React', 'CSS', 'JavaScript'].includes(topSkill)) {
    careerOrientation = CAREER_PATHS['fullstack-dev'];
  } else if (['Docker', 'AWS'].includes(topSkill)) {
    careerOrientation = CAREER_PATHS['cloud-architect'];
  }

  dispatch(setAnalysisResult({ weakSkills, recommendations, careerOrientation }));
  
  if (weakSkills.length > 0) {
    toast('The system has generated new learning recommendations for you!', { icon: '🎓' });
  } else {
    toast.success('Your performance is excellent across all modules!');
  }
};

export default engineSlice.reducer;
