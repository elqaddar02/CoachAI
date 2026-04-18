import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, Server, GraduationCap, Award, Compass } from 'lucide-react';

const skills = [
  { id: 'linux', name: 'System Fundamentals', status: 'unlocked', score: 92, x: 50, y: 0 },
  { id: 'docker', name: 'Containerization', status: 'unlocked', score: 85, x: 50, y: 30 },
  { id: 'k8s', name: 'Orchestration Hub', status: 'active', score: 40, x: 20, y: 60 },
  { id: 'aws', name: 'Infra Architecture', status: 'active', score: 70, x: 80, y: 60 },
  { id: 'terraform', name: 'Infrastructure as Code', status: 'locked', score: 0, x: 50, y: 90 },
];

const paths = [
  { from: 'linux', to: 'docker' },
  { from: 'docker', to: 'k8s' },
  { from: 'docker', to: 'aws' },
  { from: 'k8s', to: 'terraform' },
  { from: 'aws', to: 'terraform' }
];

export const SkillTree = () => {
  return (
    <div className="relative w-full h-[550px] flex items-center justify-center p-10 bg-slate-50 rounded-xl border border-slate-200 shadow-inner overflow-hidden">
      {/* Institutional Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1E3A8A_1px,transparent_1px)] [background-size:20px_20px]"></div>

      {/* Visual Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {paths.map((path, i) => {
          const fromNode = skills.find(s => s.id === path.from);
          const toNode = skills.find(s => s.id === path.to);
          
          const isUnlocked = fromNode.status !== 'locked' && toNode.status !== 'locked';

          return (
            <motion.line
              key={i}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y + 5}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y + 5}%`}
              stroke={isUnlocked ? '#1E3A8A' : '#E2E8F0'}
              strokeWidth={isUnlocked ? "3" : "2"}
              strokeDasharray={isUnlocked ? "none" : "6,6"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.15, ease: "easeInOut" }}
            />
          );
        })}
      </svg>

      {/* Competency Nodes */}
      {skills.map((skill, i) => (
        <motion.div
          key={skill.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + (i * 0.1), type: 'spring', stiffness: 100 }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ left: `${skill.x}%`, top: `${skill.y + 5}%`, zIndex: 10 }}
        >
          {/* Node Icon Container */}
          <div className={`relative w-16 h-16 rounded-xl flex items-center justify-center border-4 transition-all duration-300 shadow-academic
            ${skill.status === 'unlocked' ? 'bg-[#1E3A8A] border-white text-[#B59A57]' : 
              skill.status === 'active' ? 'bg-white border-[#B59A57] text-[#1E3A8A] ring-4 ring-[#B59A57]/10' : 
              'bg-slate-100 border-white text-slate-300'}
          `}>
            {skill.status === 'unlocked' ? <CheckCircle className="w-8 h-8" /> :
             skill.status === 'locked' ? <Lock className="w-8 h-8" /> :
             <GraduationCap className="w-8 h-8 animate-pulse text-[#B59A57]" />}
          </div>
          
          {/* Node Label */}
          <div className="mt-4 text-center bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-academic-lg">
            <h4 className="text-xs font-black text-[#1E3A8A] whitespace-nowrap uppercase tracking-tight mb-1">{skill.name}</h4>
            {skill.status !== 'locked' && (
               <div className="flex flex-col">
                 <div className="w-full h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                   <div 
                    className={`h-full ${skill.score < 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${skill.score}%` }} 
                   />
                 </div>
                 <span className={`text-[9px] font-black mt-1 ${skill.score < 50 ? 'text-amber-600' : 'text-emerald-600'} uppercase tracking-widest`}>
                   Proficiency: {skill.score}%
                 </span>
               </div>
            )}
            {skill.status === 'locked' && (
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Prerequisite required</span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
