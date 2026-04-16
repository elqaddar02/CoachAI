import React from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, Search, Plus, Filter, MessageSquareWarning, Code, Server, Network, Cloud } from 'lucide-react';
import { MOCK_USERS } from '../../services/mockData';
import { useNavigate } from 'react-router-dom';

const TeacherPage = () => {
  const students = MOCK_USERS.filter(u => u.role === 'student');
  const navigate = useNavigate();

  const activeAlerts = [
    { id: 1, student: 'Alex Developer', issue: 'Failure in K8s Networking Test', action: 'Auto-Inject Remedial Container Concepts' },
    { id: 2, student: 'Sarah Connor', issue: 'Struggling with AWS IAM Roles', action: 'Schedule Direct Mentoring' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 glass p-8 rounded-[2rem] border-b-4 border-indigo-500">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary mb-2 font-outfit">The Skill <span className="text-indigo-500">Strategist</span></h1>
          <p className="text-text-secondary text-lg">Course Engineering & Cohort Monitoring</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary">
            <Filter className="w-5 h-5 text-text-secondary" /> Analytics Filter
          </button>
          <button className="btn-primary">
            <Plus className="w-5 h-5" /> Deploy New Module
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Cohort', value: '45 Devs', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
          { label: 'DevOps Mastery Avg', value: '72%', icon: Server, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Cloud Architecture Avg', value: '68%', icon: Cloud, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Critical AI Alerts', value: '2', icon: AlertTriangle, color: 'text-error', bg: 'bg-error/10' },
        ].map((stat, i) => (
          <motion.div
            key={i} whileHover={{ scale: 1.02 }}
            className="glass p-6 rounded-3xl flex items-center gap-5"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-inner`}>
              {stat.icon && <stat.icon className="w-6 h-6" />}
            </div>
            <div>
              <p className="text-xs font-bold text-text-secondary uppercase">{stat.label}</p>
              <h2 className="text-2xl font-black text-text-primary font-outfit">{stat.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cohort Monitoring */}
        <div className="lg:col-span-2 glass p-6 rounded-[2rem]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-text-primary">Cohort Monitoring</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search tech stack or student..."
                className="pl-10 pr-4 py-2 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 text-text-primary"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-glass text-text-secondary text-sm font-bold uppercase">
                  <th className="pb-3 px-4">Learner</th>
                  <th className="pb-3 px-4">Market Path</th>
                  <th className="pb-3 px-4">Technical Stack Status</th>
                  <th className="pb-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-text-primary text-sm">
                {students.map((student, i) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                    className="border-b border-border-glass/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-4 px-4 font-bold">{student.name}</td>
                    <td className="py-4 px-4 text-primary font-bold">DevOps Engineer</td>
                    <td className="py-4 px-4">
                      <span className="flex gap-2">
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md text-xs font-bold font-mono">Linux</span>
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-md text-xs font-bold font-mono">Docker</span>
                        <span className="px-2 py-1 border border-error/50 bg-error/10 text-error rounded-md text-xs font-bold font-mono animate-pulse">K8s</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button onClick={() => navigate('/student')} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
                        Voir le Profil Élève
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Actionable Alert Panel */}
        <div className="glass p-6 rounded-[2rem] border border-error/30 bg-error/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><MessageSquareWarning className="w-16 h-16 text-error" /></div>
          <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2 relative z-10">
            <MessageSquareWarning className="w-5 h-5 text-error" /> AI Automated Insights
          </h3>
          <div className="space-y-4 relative z-10">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-error/30 shadow-md transform hover:scale-105 transition-transform">
                <h4 className="font-bold text-text-primary text-sm mb-1">{alert.student}</h4>
                <p className="text-xs font-semibold mb-3 text-text-secondary line-clamp-2">{alert.issue}</p>
                <button onClick={() => navigate('/student')} className="w-full text-xs font-bold py-2 bg-error text-white rounded-lg hover:shadow-md hover:bg-red-600 transition-all flex justify-center items-center gap-2">
                  <AlertTriangle className="w-3 h-3" /> {alert.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeacherPage; 