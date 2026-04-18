import { Bell, Search, LogOut, Menu, Moon, Sun, User as UserIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 z-30 transition-all duration-300">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"></div>
      
      <div className="relative flex items-center justify-between px-8 py-4">
        {/* Mobile Menu Button - Oxford Blue Background */}
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden p-2 bg-[#1E3A8A] text-white rounded-lg shadow-sm"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Academic Search Bar */}
        <div className="flex-1 max-w-md ml-4 lg:ml-0 hidden sm:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#1E3A8A] transition-colors" />
            <input 
              placeholder="Rechercher des modules, sessions..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-12 pr-4 focus:ring-4 focus:ring-[#1E3A8A]/5 focus:border-[#1E3A8A] text-sm outline-none transition-all duration-200 text-slate-700 placeholder:text-slate-400 font-medium shadow-inner"
            />
          </div>
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle - Academic Slate */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 text-slate-400 hover:text-[#1E3A8A] hover:bg-slate-50 rounded-full transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications Hub */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 text-slate-400 hover:text-[#1E3A8A] hover:bg-slate-50 rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-[#B59A57] rounded-full border-2 border-white"></span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-80 bg-white shadow-academic-lg z-50 border border-slate-200 rounded-xl overflow-hidden"
                >
                  <div className="p-4 bg-slate-50 border-b border-slate-200">
                    <h3 className="font-bold text-[#1E3A8A] text-sm">Learning Alerts</h3>
                  </div>
                  <div className="p-2 max-h-[350px] overflow-y-auto custom-scrollbar">
                    {[1, 2].map((_, i) => (
                      <div key={i} className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1 border border-transparent hover:border-slate-100">
                        <p className="text-xs font-bold text-[#1E3A8A] mb-1 flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#B59A57]"></span>
                           System Bulletin
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                          Your recent assessment results in {i === 0 ? 'Cloud Computing' : 'Network Security'} are now verified.
                        </p>
                      </div>
                    ))}
                    <div className="p-3 text-center">
                       <button className="text-[10px] font-black text-[#B59A57] uppercase tracking-widest hover:underline">Voir tout le bulletin</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="w-px h-8 bg-slate-200 mx-1 hidden md:block"></div>

          {/* User Profile Academic Badge */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-[#1E3A8A] leading-none mb-1">
                {user?.name || 'Academic Member'}
              </p>
              <p className="text-[9px] font-bold text-[#B59A57] uppercase tracking-widest leading-none">
                {user?.role === 'admin' ? 'Board of Directors' : user?.role === 'teacher' ? 'Faculty Member' : 'Undergraduate Scholar'}
              </p>
            </div>
            
            <div className="w-10 h-10 rounded-lg bg-[#1E3A8A] flex items-center justify-center shadow-md border-2 border-white ring-1 ring-slate-200 overflow-hidden group cursor-pointer relative">
               <span className="text-white font-bold text-sm tracking-tighter">
                {(user?.name || 'A').charAt(0).toUpperCase()}
               </span>
               <div className="absolute inset-0 bg-[#B59A57] opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </div>

            <button 
              onClick={handleLogout} 
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;