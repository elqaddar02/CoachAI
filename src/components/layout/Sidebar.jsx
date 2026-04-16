import React from 'react';
import { LayoutDashboard, Users, GraduationCap, BookOpen, Settings, Compass, ShieldCheck, Map, FolderEdit } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
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
    { icon: GraduationCap, label: 'My Learning', href: '/student', studentOnly: true },
    { icon: Compass, label: 'Career Roadmap', href: '/roadmap', studentOnly: true },
    { icon: ShieldCheck, label: 'Certifications', href: '/certifications', studentOnly: true },
    { icon: Users, label: 'Mentors', href: '/teacher' },
    { icon: BookOpen, label: 'Tech Tracks', href: '/subjects' },
    { icon: Settings, label: 'Orchestration', href: '/admin' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#070F1F]/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={toggle}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 my-0 lg:my-6 ml-0 lg:ml-6
        transition-all duration-500 ease-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
      `}>
        {/* Floating Glass Container */}
        <div className="h-full flex flex-col overflow-hidden shadow-2xl lg:shadow-glass border-r lg:border border-[rgba(212,175,55,0.15)] lg:rounded-2xl"
             style={{ background: 'rgba(15, 28, 46, 0.85)', backdropFilter: 'blur(40px)' }}>
          
          {/* Logo Area */}
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#142C54] to-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
              <span className="text-white font-black text-xl">L</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight font-outfit">
              LearnPulse<span className="text-[#D4AF37]">.</span>
            </h1>
          </div>

          {/* AI Path Badge (students only) */}
          {isStudent && selectedPath && (
            <div className="mx-4 mb-2 p-3 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/15">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-black text-[#AAB4C5] uppercase tracking-widest">Active Path</p>
                <Link
                  to="/choose-path"
                  className="text-[10px] font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <FolderEdit className="w-3 h-3" /> Change
                </Link>
              </div>
              <p className="text-sm font-bold text-white truncate">{domain?.name}</p>
              {testCompleted && levelDef && (
                <span className={`mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-lg border ${levelDef.badge}`}>
                  {levelDef.label}
                </span>
              )}
              {!testCompleted && (
                <Link to="/placement-test" className="mt-1.5 inline-block text-[10px] font-bold text-[#D4AF37] hover:underline">
                  → Take placement test
                </Link>
              )}
            </div>
          )}

          {/* Start Path CTA (students without a path) */}
          {isStudent && !selectedPath && (
            <div className="mx-4 mb-2">
              <Link
                to="/choose-path"
                className="block p-3 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-center"
              >
                <p className="text-xs font-bold text-[#D4AF37]">✨ Choose Your Learning Path</p>
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
            {menuItems.map((navItem) => {
              const isActive = location.pathname === navItem.href;
              return (
                <Link
                  key={navItem.href}
                  to={navItem.href}
                  onClick={window.innerWidth < 1024 ? toggle : null}
                  className={`
                    relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium group
                    ${isActive
                      ? 'text-[#D4AF37]'
                      : 'text-[#AAB4C5] hover:bg-[#0B1F3A]/60 hover:text-white'}
                  `}
                >
                  {/* Active Indicator Background */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20"></div>
                  )}
                  
                  {/* Active Left Pill */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#D4AF37] rounded-r-lg shadow-[0_0_10px_#D4AF37]"></div>
                  )}

                  <navItem.icon className={`w-5 h-5 z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="z-10">{navItem.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Footer */}
          <div className="p-6 mt-auto">
            <div className="p-4 rounded-2xl bg-[#0B1F3A]/50 border border-[rgba(212,175,55,0.15)] backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F1D37A] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                  <span className="text-[#0B1F3A] font-bold text-sm">PRO</span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">Premium Plan</p>
                  <p className="text-xs text-[#AAB4C5] truncate">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;