import React from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, Search, Plus, Filter, MessageSquareWarning, Code, Server, Network, Cloud, GraduationCap, BarChart3, ShieldCheck } from 'lucide-react';
import { MOCK_USERS } from '../../services/mockData';
import { useNavigate } from 'react-router-dom';

const TeacherPage = () => {
  const students = MOCK_USERS.filter(u => u.role === 'student');
  const navigate = useNavigate();

  const activeAlerts = [
    { id: 1, student: 'Alex Developer', issue: 'Calibration needed in K8s Networking Module', action: 'Assign Supplemental Material' },
    { id: 2, student: 'Sarah Connor', issue: 'Struggling with AWS IAM Permissions', action: 'Direct Faculty Consultation' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 font-inter"
    >
      {/* Faculty Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#1E3A8A] p-10 rounded-xl shadow-academic border-b-4 border-[#B59A57]">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <GraduationCap className="w-7 h-7 text-[#B59A57]" />
           </div>
           <div>
             <h1 className="text-3xl font-black text-white mb-1 font-outfit tracking-tight">Faculty Dashboard</h1>
             <p className="text-slate-300 text-sm font-medium uppercase tracking-[0.2em]">Pulse Institute Academic Monitoring</p>
           </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-lg border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" /> Academic Filters
          </button>
          <button className="btn-primary bg-[#B59A57] hover:bg-[#927A3F] border-none shadow-md">
            <Plus className="w-4 h-4" /> Author Module
          </button>
        </div>
      </div>

      {/* Institutional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Enrolled Section', value: '45 Students', icon: Users, color: 'text-[#1E3A8A]', bg: 'bg-[#1E3A8A]/5' },
          { label: 'DevOps Proficiency', value: '72%', icon: Server, color: 'text-[#1E3A8A]', bg: 'bg-[#1E3A8A]/5' },
          { label: 'Cloud Architecture', value: '68%', icon: Cloud, color: 'text-[#1E3A8A]', bg: 'bg-[#1E3A8A]/5' },
          { label: 'Verification Alerts', value: '2', icon: AlertTriangle, color: 'text-[#B59A57]', bg: 'bg-[#B59A57]/5' },
        ].map((stat, i) => (
          <motion.div
            key={i} whileHover={{ y: -2 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-academic flex items-center gap-5"
          >
            <div className={`p-4 rounded-lg ${stat.bg} ${stat.color} border border-current border-opacity-10`}>
              {stat.icon && <stat.icon className="w-6 h-6" />}
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
               <h2 className="text-2xl font-black text-[#1E3A8A] font-outfit leading-none">{stat.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Monitoring Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Student Progress Monitoring */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-slate-200 shadow-academic">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
               <h3 className="text-xl font-bold text-[#1E3A8A] mb-1">Academic Progress Registry</h3>
               <p className="text-xs text-slate-400 font-medium">Monitoring track completion and technical proficiency across the section.</p>
            </div>
            <div className="w-full sm:w-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-4 focus:ring-[#1E3A8A]/5 focus:border-[#1E3A8A] text-slate-700 font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="pb-4 px-4">Scholar</th>
                  <th className="pb-4 px-4">Enrolled Track</th>
                  <th className="pb-4 px-4">Module Clearance</th>
                  <th className="pb-4 px-4 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 text-sm">
                {students.map((student, i) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * i }}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-5 px-4 font-bold text-[#1E3A8A]">{student.name}</td>
                    <td className="py-5 px-4">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">DevOps Engineer</span>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[9px] font-black uppercase">Verified: Linux</span>
                        <span className="px-2 py-0.5 bg-[#1E3A8A]/5 text-[#1E3A8A] border border-[#1E3A8A]/10 rounded text-[9px] font-black uppercase">Docker</span>
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded text-[9px] font-black uppercase animate-pulse">K8s Review</span>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <button onClick={() => navigate('/student')} className="p-2 text-[#1E3A8A] hover:bg-slate-100 rounded-lg transition-colors border border-slate-100 shadow-sm">
                        <BarChart3 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actionable Guidance Panel */}
        <div className="bg-[#1E3A8A] p-8 rounded-xl shadow-academic-lg text-white relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-6 opacity-5"><ShieldCheck className="w-24 h-24 text-[#B59A57]" /></div>
          <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3 relative z-10 font-outfit">
            <MessageSquareWarning className="w-5 h-5 text-[#B59A57]" /> 
            Active Learning Insights
          </h3>
          <div className="space-y-4 relative z-10 flex-1">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="p-5 rounded-lg bg-white/5 border border-white/10 hover:border-[#B59A57]/40 transition-all group">
                <h4 className="font-bold text-white text-sm mb-1">{alert.student}</h4>
                <p className="text-xs font-medium mb-4 text-slate-300 leading-relaxed">{alert.issue}</p>
                <button 
                  onClick={() => navigate('/student')} 
                  className="w-full text-[10px] font-black uppercase tracking-widest py-2.5 bg-[#B59A57] text-white rounded-lg hover:bg-[#927A3F] transition-all flex justify-center items-center gap-2 shadow-md"
                >
                  <AlertTriangle className="w-3 h-3" /> {alert.action}
                </button>
              </div>
            ))}
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] mt-8 text-center">
             Verified Pulse Accreditation
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TeacherPage;