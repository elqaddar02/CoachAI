import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Lock, Mail, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
};

const Login = () => {
  const [email, setEmail] = useState('student@learnpulse.com');
  const [password, setPassword] = useState('password123');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(authenticateUser(email, password));
      if (resultAction) {
        // Students get smart redirect based on learning state; others go to role page
        const destination = resultAction.redirectTo || `/${resultAction.role}`;
        navigate(destination);
      }
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 relative overflow-hidden font-outfit">
      
      {/* Premium Animated Blobs (Glow Pulse Effect) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05]"></div>

      <Tilt 
        tiltMaxAngleX={3} 
        tiltMaxAngleY={3} 
        perspective={1500} 
        scale={1.01} 
        transitionSpeed={2500}
        className="w-full max-w-[1000px] z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="w-full glass rounded-[2.5rem] flex flex-col md:flex-row overflow-hidden relative shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-white/20 dark:border-white/5"
        >
          {/* Left Side: Product Value Panel */}
          <div className="hidden md:flex md:w-1/2 p-14 bg-gradient-to-br from-primary via-indigo-600 to-secondary text-white flex-col justify-between relative overflow-hidden shadow-inner">
             {/* Inner decorative light */}
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 to-transparent opacity-50 mix-blend-overlay"></div>
             
             <div className="z-10">
                <motion.div 
                  initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 mb-16"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <span className="font-outfit font-black text-2xl tracking-tighter">L</span>
                  </div>
                  <h1 className="text-3xl font-bold font-outfit tracking-tight">LearnPulse.</h1>
                </motion.div>

                <motion.div 
                   variants={containerVariants}
                   initial="hidden"
                   animate="show"
                >
                   <motion.h2 variants={itemVariants} className="text-4xl font-black mb-6 leading-tight">Accélérez votre <br/>carrière IT avec l'I.A.</motion.h2>
                   <motion.p variants={itemVariants} className="text-indigo-100 text-lg mb-8 leading-relaxed">
                     Rejoignez la plateforme qui analyse vos compétences et génère votre feuille de route unique vers le monde professionnel.
                   </motion.p>
                </motion.div>
             </div>
             
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="z-10 flex gap-6 text-sm font-bold text-white/80">
                <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-emerald-300" /> Smart Engine</span>
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-cyan-300" /> Cloud & DevOps</span>
             </motion.div>
          </div>

          {/* Right Side: Login Form */}
          <div className="w-full md:w-1/2 p-10 md:p-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl flex flex-col justify-center">
            <motion.div 
               variants={containerVariants}
               initial="hidden"
               animate="show"
               className="w-full space-y-8"
            >
              <motion.div variants={itemVariants} className="mb-2 text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-text-primary mb-2">Bon retour ! 👋</h2>
                <p className="text-text-secondary font-medium">Entrez vos accès pour continuer votre progression.</p>
              </motion.div>

              <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label className="block text-[11px] font-black text-text-secondary mb-2 uppercase tracking-widest transition-colors group-focus-within:text-primary">Adresse Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-transparent rounded-2xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium text-text-primary shadow-inner" 
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest transition-colors group-focus-within:text-primary">Mot de passe</label>
                    <a href="#" className="text-[11px] font-bold text-primary hover:text-secondary transition-colors">Mot de passe oublié ?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-transparent rounded-2xl outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium text-text-primary shadow-inner" 
                      required
                    />
                  </div>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-3 bg-error/10 border border-error/20 rounded-xl text-error text-xs font-bold flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div> {error}
                  </motion.div>
                )}

                <button type="submit" disabled={loading} className="w-full py-3 px-6 rounded-2xl bg-primary hover:bg-indigo-500 text-white font-bold tracking-wide transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 active:scale-[0.98] flex items-center justify-center gap-2 group">
                  {loading ? (
                     <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Connexion...</div>
                  ) : (
                    <>
                      Se connecter à l'espace 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </button>
              </motion.form>

              {/* Development Hints */}
              <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-border-glass">
                <p className="text-[10px] font-bold text-text-secondary mb-3 uppercase tracking-widest text-center">Identifiants de test</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="text-[11px] px-3 py-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg font-mono font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">student@learnpulse.com</span>
                  <span className="text-[11px] px-3 py-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg font-mono font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">teacher@learnpulse.com</span>
                  <span className="text-[11px] px-3 py-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg font-mono font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">admin@learnpulse.com</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Tilt>
    </div>
  );
};

export default Login;