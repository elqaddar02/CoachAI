import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, GraduationCap, Award, BookOpen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
};

const Login = () => {
  const [email, setEmail] = useState('student@pulseinstitute.edu');
  const [password, setPassword] = useState('password123');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(authenticateUser(email, password));
      if (resultAction) {
        const destination = resultAction.redirectTo || `/${resultAction.role}`;
        navigate(destination);
      }
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden font-inter">
      
      {/* Institutional Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#1E3A8A] z-0"></div>
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1000px] bg-white rounded-xl shadow-academic-lg flex flex-col md:flex-row overflow-hidden border border-slate-200 z-10"
      >
        {/* Left Side: Institutional Panel */}
        <div className="hidden md:flex md:w-5/12 p-12 bg-[#1E3A8A] text-white flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#B59A57_0%,transparent_70%)] opacity-30"></div>
           </div>
           
           <div className="z-10">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-16"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                  <GraduationCap className="text-[#B59A57] w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight font-outfit leading-none mb-1">Pulse</h1>
                  <p className="text-[9px] font-bold text-[#B59A57] uppercase tracking-[0.2em] leading-none">Institute</p>
                </div>
              </motion.div>

              <motion.div 
                 variants={containerVariants}
                 initial="hidden"
                 animate="show"
              >
                 <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 leading-tight">Excellence Académique <br/>& Innovation IT</motion.h2>
                 <motion.p variants={itemVariants} className="text-slate-300 text-base mb-8 leading-relaxed font-medium">
                   Rejoignez l'élite des professionnels de la tech. Une formation certifiante adaptée à votre potentiel réel.
                 </motion.p>
                 
                 <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                      <div className="w-6 h-6 rounded-md bg-[#B59A57]/20 flex items-center justify-center border border-[#B59A57]/30">
                        <Award className="w-3.5 h-3.5 text-[#B59A57]" />
                      </div> Certifications Internationales
                    </div>
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                      <div className="w-6 h-6 rounded-md bg-[#B59A57]/20 flex items-center justify-center border border-[#B59A57]/30">
                        <BookOpen className="w-3.5 h-3.5 text-[#B59A57]" />
                      </div> Cursus Personnalisé
                    </div>
                 </motion.div>
              </motion.div>
           </div>
           
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="z-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              © 2026 Pulse Institute — Portal v2.4
           </motion.div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-7/12 p-10 md:p-16 bg-white flex flex-col justify-center">
          <motion.div 
             variants={containerVariants}
             initial="hidden"
             animate="show"
             className="w-full max-w-sm mx-auto space-y-8"
          >
            <motion.div variants={itemVariants} className="text-center md:text-left mb-2">
              <h2 className="text-2xl font-black text-[#1E3A8A] mb-1">Authentification</h2>
              <p className="text-slate-500 text-sm font-medium">Accédez à votre espace pédagogique sécurisé.</p>
            </motion.div>

            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Identifiant Académique</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-[#1E3A8A] transition-colors" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-focus w-full pl-12 pr-4 py-3 text-sm font-medium" 
                    placeholder="email@pulseinstitute.edu"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mot de passe</label>
                  <a href="#" className="text-[10px] font-bold text-[#B59A57] hover:underline">Oubli ?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-[#1E3A8A] transition-colors" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-focus w-full pl-12 pr-4 py-3 text-sm font-medium" 
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-bold flex items-center gap-2">
                   {error}
                </motion.div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 shadow-md active:scale-[0.98]">
                {loading ? (
                   <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Connexion...</div>
                ) : (
                  <>
                    Accéder au Portail 
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>

            {/* Institutional Credentials Hints */}
            <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-[9px] font-bold text-slate-400 mb-3 uppercase tracking-widest text-center">Comptes de test (Staging)</p>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] font-mono font-bold text-slate-500">student@pulseinstitute.edu</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-md">Étudiant</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] font-mono font-bold text-slate-500">teacher@pulseinstitute.edu</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-md">Enseignant</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] font-mono font-bold text-slate-500">admin@pulseinstitute.edu</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-100 text-red-700 rounded-md">Admin</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;