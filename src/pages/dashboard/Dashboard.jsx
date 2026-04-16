import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Target, Zap, Clock, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Jan', score: 12, xp: 400 }, { name: 'Fév', score: 15, xp: 800 },
  { name: 'Mar', score: 14, xp: 1200 }, { name: 'Avr', score: 18, xp: 2100 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const Dashboard = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 relative"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 glass p-8 rounded-[2.5rem] relative overflow-hidden">
        {/* Glow behind header */}
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-primary/20 blur-[100px] pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-text-primary mb-2 font-outfit tracking-tight">Overview <span className="text-primary">Général</span></h1>
          <p className="text-text-secondary text-lg font-medium">Vue macroscopique de l'activité. Bienvenue sur l'Intelligence Artificielle LearnPulse.</p>
        </div>
        <div className="relative z-10 flex gap-4">
           <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)]">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             Système Opérationnel
           </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { title: "Indice de Performance IA", value: "88%", trend: "+12.5%", icon: Activity, color: "text-primary", bg: "bg-primary/10" },
          { title: "Objectifs de Carrière", value: "12 Actifs", trend: "Stable", icon: Target, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { title: "Requêtes Serveur", value: "3.2M", trend: "+5.1%", icon: Zap, color: "text-warning", bg: "bg-warning/10" },
          { title: "Temps d'Apprentissage", value: "142h", trend: "+12h", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
        ].map((card, i) => (
          <Tilt key={i} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000}>
            <motion.div 
              variants={itemVariants} 
              className="p-6 rounded-[2rem] glass border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] relative overflow-hidden group h-full"
            >
               <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                 <card.icon className="w-24 h-24" />
               </div>
               <div className="flex justify-between items-center mb-6 relative z-10">
                 <div className={`p-4 rounded-2xl ${card.bg} ${card.color} shadow-inner`}>
                    <card.icon className="w-6 h-6" />
                 </div>
                 <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${card.trend.includes('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                   {card.trend}
                 </span>
               </div>
               <div className="relative z-10">
                 <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">{card.title}</p>
                 <h2 className="text-4xl font-black text-text-primary font-outfit">{card.value}</h2>
               </div>
            </motion.div>
          </Tilt>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 glass p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h3 className="text-2xl font-bold text-text-primary font-outfit">Courbe d'Expérience (XP)</h3>
              <p className="text-sm text-text-secondary mt-1">Évolution globale des cohortes sur le trimestre.</p>
            </div>
            <button className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors">
              <TrendingUp className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
          <div className="h-72 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="currentColor" className="text-text-secondary text-xs font-bold" tickLine={false} />
                <YAxis stroke="currentColor" className="text-text-secondary text-xs font-bold" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorXp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} scale={1.02} transitionSpeed={2000} className="w-full h-full">
           <motion.div variants={itemVariants} className="glass p-8 rounded-[2.5rem] border border-white/10 h-full flex flex-col justify-between bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-primary/40 blur-[60px] rounded-full group-hover:bg-primary/60 transition-colors"></div>
              <div className="relative z-10">
                 <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="w-6 h-6 text-warning" />
                 </div>
                 <h3 className="text-2xl font-bold font-outfit mb-3">Insights I.A Temps Réel</h3>
                 <p className="text-slate-400 text-sm leading-relaxed mb-6">
                   Le réseau neuronal détecte une forte propension des cohortes actuelles vers les profils "Cloud Architect" (Hausse de 40% de l'engagement AWS).
                 </p>
              </div>
              <button className="relative z-10 w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-bold text-sm text-white transition-all backdrop-blur-lg">
                 Consulter le rapport
              </button>
           </motion.div>
        </Tilt>
      </div>
    </motion.div>
  );
};

export default Dashboard;