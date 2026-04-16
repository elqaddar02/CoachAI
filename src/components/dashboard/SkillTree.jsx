import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, Server } from 'lucide-react';

const skills = [
  { id: 'linux', name: 'Linux Basics', status: 'unlocked', score: 92, x: 50, y: 0 },
  { id: 'docker', name: 'Docker', status: 'unlocked', score: 85, x: 50, y: 30 },
  { id: 'k8s', name: 'Kubernetes', status: 'active', score: 40, x: 20, y: 60 },
  { id: 'aws', name: 'AWS Cloud', status: 'active', score: 70, x: 80, y: 60 },
  { id: 'terraform', name: 'Terraform', status: 'locked', score: 0, x: 50, y: 90 },
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
    <div className="relative w-full h-[500px] flex items-center justify-center p-8 bg-[#0B1F3A]/50 rounded-3xl border border-[rgba(212,175,55,0.15)] overflow-hidden">
      {/* Visual Lines Map */}
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
              stroke={isUnlocked ? '#D4AF37' : '#0B1F3A'}
              strokeWidth={isUnlocked ? "3" : "2"}
              strokeDasharray={isUnlocked ? "none" : "5,5"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {skills.map((skill, i) => (
        <motion.div
          key={skill.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + (i * 0.1), type: 'spring' }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ left: `${skill.x}%`, top: `${skill.y + 5}%`, zIndex: 10 }}
        >
          <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
            skill.status === 'unlocked' ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] shadow-lg shadow-[#D4AF37]/30' :
            skill.status === 'active' ? 'bg-warning/20 border-warning text-warning animate-pulse shadow-lg shadow-warning/30' :
            'bg-[#0B1F3A]/50 border-[#142C54] text-[#AAB4C5] backdrop-blur-md'
          }`}>
            {skill.status === 'unlocked' ? <CheckCircle className="w-8 h-8" /> :
             skill.status === 'locked' ? <Lock className="w-8 h-8" /> :
             <Server className="w-8 h-8" />}
          </div>
          
          <div className="mt-3 text-center bg-[#0B1F3A]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[rgba(212,175,55,0.15)] shadow-xl">
            <h4 className="text-xs font-bold text-white whitespace-nowrap">{skill.name}</h4>
            {skill.status !== 'locked' && (
               <span className={`text-[10px] font-black ${skill.score < 50 ? 'text-error' : 'text-emerald-400'}`}>
                 MAÎTRISE: {skill.score}%
               </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
