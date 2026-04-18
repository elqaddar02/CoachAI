import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Target, Zap, Clock, TrendingUp, Award, BarChart3, Globe } from 'lucide-react';

const data = [
  { name: 'Jan', score: 12, xp: 400 }, { name: 'Feb', score: 15, xp: 800 },
  { name: 'Mar', score: 14, xp: 1200 }, { name: 'Apr', score: 18, xp: 2100 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const Dashboard = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 relative font-inter"
    >
      {/* Institutional Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-10 rounded-xl border border-slate-200 shadow-academic relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E3A8A]/5 rounded-bl-full pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[#B59A57] font-bold text-xs uppercase tracking-[0.2em] mb-3">
             <Globe className="w-3 h-3" /> Global Network Status
          </div>
          <h1 className="text-4xl font-black text-[#1E3A8A] mb-2 font-outfit tracking-tight">Academic Overview</h1>
          <p className="text-slate-500 text-base font-medium max-w-2xl">
            Real-time macroeconomic view of institutional activity. Welcome to the Pulse Institute analysis portal.
          </p>
        </div>
        <div className="relative z-10">
           <div className="flex items-center gap-3 px-5 py-2.5 rounded-lg bg-[#059669]/5 text-[#059669] border border-[#059669]/20 font-bold text-sm shadow-sm">
             <div className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></div>
             Engine: Operational
           </div>
        </div>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { title: "Proficiency Index", value: "88.4%", trend: "+12.5%", icon: Activity, color: "text-[#1E3A8A]", bg: "bg-[#1E3A8A]/5" },
          { title: "Career Enrollment", value: "1,240", trend: "Stable", icon: Target, color: "text-[#059669]", bg: "bg-[#059669]/5" },
          { title: "Network Requests", value: "3.2M", trend: "+5.1%", icon: Zap, color: "text-[#B59A57]", bg: "bg-[#B59A57]/5" },
          { title: "Instructional Hours", value: "14,2k", trend: "+12h", icon: Clock, color: "text-[#1E3A8A]", bg: "bg-[#1E3A8A]/5" },
        ].map((card, i) => (
          <motion.div 
            key={i}
            variants={itemVariants} 
            className="p-8 rounded-xl bg-white border border-slate-200 shadow-academic hover:shadow-academic-lg transition-all duration-300 group"
          >
             <div className="flex justify-between items-start mb-6">
               <div className={`p-3 rounded-lg ${card.bg} ${card.color} border border-current border-opacity-10`}>
                  <card.icon className="w-6 h-6" />
               </div>
               <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${card.trend.includes('+') ? 'bg-[#059669]/10 text-[#059669]' : 'bg-slate-100 text-slate-500'}`}>
                 {card.trend}
               </span>
             </div>
             <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{card.title}</p>
               <h2 className="text-3xl font-black text-[#1E3A8A] font-outfit">{card.value}</h2>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Experience Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white p-8 rounded-xl border border-slate-200 shadow-academic relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-bold text-[#1E3A8A] font-outfit">Cumulative Performance (XP)</h3>
              <p className="text-sm text-slate-500 mt-1">Global quarterly evolution of student cohorts.</p>
            </div>
            <div className="flex gap-2">
               <button className="p-2.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-[#1E3A8A] transition-colors border border-transparent hover:border-slate-200">
                 <BarChart3 className="w-5 h-5" />
               </button>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                   <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" className="text-[10px] font-bold uppercase tracking-widest" tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94A3B8" className="text-[10px] font-bold uppercase tracking-widest" tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#1E3A8A', fontWeight: 'bold', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#1E3A8A" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" dot={{ fill: '#B59A57', stroke: '#fff', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#1E3A8A' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Feature/Context Module */}
        <motion.div variants={itemVariants} className="bg-[#1E3A8A] p-10 rounded-xl shadow-academic-lg text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B59A57]/10 rounded-bl-full pointer-events-none"></div>
          <div>
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-8 border border-white/20">
              <Award className="w-7 h-7 text-[#B59A57]" />
            </div>
            <h3 className="text-2xl font-bold font-outfit mb-4 text-white">Advanced Analytics</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              The analysis engine detects a significant trend toward Cloud Architecture specializations, with a 40% increase in AWS engagement.
            </p>
          </div>
          <button className="w-full py-4 bg-[#B59A57] hover:bg-[#927A3F] text-white rounded-lg font-bold text-sm transition-all shadow-md">
            Veritas Report
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;