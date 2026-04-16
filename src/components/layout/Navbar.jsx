import { Bell, Search, LogOut, Menu, Moon, Sun } from 'lucide-react';
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
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 transition-all duration-300">
      <div className="absolute inset-0 bg-[rgba(15,28,46,0.8)] backdrop-blur-2xl border-b border-[rgba(212,175,55,0.12)]"></div>
      
      <div className="relative flex items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-[#0B1F3A] rounded-xl transition-colors">
          <Menu className="w-6 h-6 text-white" />
        </button>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md ml-4 lg:ml-0 hidden sm:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAB4C5] group-focus-within:text-[#D4AF37] transition-colors" />
            <input 
              placeholder="Search students, courses or tasks..." 
              className="w-full bg-[#0B1F3A]/50 backdrop-blur-sm border border-[rgba(212,175,55,0.1)] focus:border-[rgba(212,175,55,0.3)] rounded-2xl py-2.5 pl-11 pr-4 focus:ring-4 focus:ring-[#D4AF37]/10 text-sm outline-none transition-all duration-300 text-white placeholder:text-[#AAB4C5]"
            />
          </div>
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 text-[#AAB4C5] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-full transition-all duration-300"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 text-[#AAB4C5] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-full transition-all duration-300 relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-[#0F1C2E] animate-pulse"></span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 p-1 shadow-xl z-50 border border-[rgba(212,175,55,0.15)] rounded-2xl"
                  style={{ background: 'rgba(15, 28, 46, 0.95)', backdropFilter: 'blur(40px)' }}
                >
                  <div className="p-4 border-b border-[rgba(212,175,55,0.12)]">
                    <h3 className="font-bold text-white">Notifications</h3>
                  </div>
                  <div className="p-2 max-h-[300px] overflow-y-auto">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="p-3 hover:bg-[#D4AF37]/5 rounded-xl cursor-pointer transition-colors mb-1">
                        <p className="text-sm font-semibold text-white mb-0.5">AI Suggestion</p>
                        <p className="text-xs text-[#AAB4C5]">Student John Doe needs practice in Advance React Concepts.</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Divider */}
          <div className="w-px h-8 bg-[rgba(212,175,55,0.15)] mx-1 hidden md:block"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white leading-tight">{user?.name || 'Administrator'}</p>
              <p className="text-xs font-medium text-[#D4AF37] uppercase tracking-wider">{user?.role || 'Admin'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#142C54] to-[#D4AF37] flex items-center justify-center shadow-md border-2 border-[#070F1F] shadow-[#D4AF37]/20">
              <span className="text-white font-bold text-sm">
                {(user?.name || 'A').charAt(0).toUpperCase()}
              </span>
            </div>
            <button 
              onClick={handleLogout} 
              className="p-2 text-[#AAB4C5] hover:text-error hover:bg-error/10 rounded-xl transition-colors ml-1"
              title="Logout"
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