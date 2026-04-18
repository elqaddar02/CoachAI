import React from 'react';
import { LayoutDashboard, Users, GraduationCap, BookOpen, Settings, Compass, ShieldCheck, Map, FolderEdit, Award } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { IT_DOMAINS, LEVEL_DEFINITIONS } from '../../services/mockData';

const Sidebar = ({ isOpen, toggle }) => {
  const location = useLocation();
  const { user } = useSelector(state => state.auth);
  const { selectedPath, assignedLevel, testCompleted } = useSelector(state => state.learning);

  const domain = IT_DOMAINS.find(d => d.id === selectedPath);
  const levelDef = assignedLevel ? LEVEL_DEFINITIONS[assignedLevel] : null;

  const isStudent = user?.role === 'student';

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: GraduationCap, label: 'My Academy', href: '/student', studentOnly: true },
    { icon: Compass, label: 'Learning Roadmap', href: '/roadmap', studentOnly: true },
    { icon: ShieldCheck, label: 'Accreditations', href: '/certifications', studentOnly: true },
    { icon: Users, label: 'Faculty Advisors', href: '/teacher' },
    { icon: BookOpen, label: 'Knowledge Base', href: '/subjects' },
    { icon: Settings, label: 'Administration', href: '/admin', adminOnly: true },
  ];

  // Filter items based on user role
  const filteredItems = menuItems.filter(item => {
    if (item.studentOnly && !isStudent) return false;
    if (item.adminOnly && user?.role !== 'admin') return false;
    return true;
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={toggle}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 transition-all duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
      `}>
        {/* Institutional Sidebar Container */}
        <div className="h-full flex flex-col overflow-hidden bg-white border-r border-slate-200 shadow-academic">
          
          {/* Branding Area */}
          <Link to="/dashboard" className="p-8 flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-[#1E3A8A] flex items-center justify-center shadow-md group-hover:bg-[#172E6E] transition-colors">
              <GraduationCap className="text-[#B59A57] w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#1E3A8A] tracking-tight font-outfit leading-none mb-1">
                Pulse
              </h1>
              <p className="text-[10px] font-bold text-[#B59A57] uppercase tracking-[0.2em] leading-none">
                Institute
              </p>
            </div>
          </Link>

          {/* User Enrollment Badge (Academic Track) */}
          {isStudent && selectedPath && (
            <div className="mx-6 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enrolled Track</p>
                <Link
                  to="/choose-path"
                  className="text-[10px] font-bold text-[#1E3A8A] hover:text-[#B59A57] flex items-center gap-1 transition-colors"
                >
                  <FolderEdit className="w-3 h-3" /> Update
                </Link>
              </div>
              <p className="text-sm font-bold text-[#1E3A8A] truncate">{domain?.name}</p>
              {testCompleted && levelDef && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1E3A8A]/5 text-[#1E3A8A] text-[10px] font-bold border border-[#1E3A8A]/10">
                    <Award className="w-3 h-3 text-[#B59A57]" /> {levelDef.label}
                  </span>
                </div>
              )}
              {!testCompleted && (
                <Link to="/placement-test" className="mt-2 inline-flex items-center text-[11px] font-bold text-[#B59A57] hover:underline">
                  Evaluate Proficiency →
                </Link>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
            {filteredItems.map((navItem) => {
              const isActive = location.pathname === navItem.href;
              return (
                <Link
                  key={navItem.href}
                  to={navItem.href}
                  onClick={window.innerWidth < 1024 ? toggle : null}
                  className={`
                    relative flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all duration-200 group
                    ${isActive
                      ? 'bg-[#1E3A8A] text-white shadow-md shadow-[#1E3A8A]/10'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-[#1E3A8A]'}
                  `}
                >
                  <navItem.icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'text-[#B59A57]' : 'group-hover:scale-110'}`} />
                  <span className="text-sm font-semibold">{navItem.label}</span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute right-2 w-1.5 h-1.5 rounded-full bg-[#B59A57]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Institutional Footer */}
          <div className="p-6 mt-auto border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-[#B59A57] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                SCH
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#1E3A8A] truncate">Scholar Member</p>
                <p className="text-[10px] text-slate-400 font-medium truncate uppercase tracking-wider">Verification: Active</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;