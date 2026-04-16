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
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
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
        <div className="glass h-full flex flex-col overflow-hidden shadow-2xl lg:shadow-glass border-r lg:border border-border-glass">
          
          {/* Logo Area */}
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-xl">L</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight font-outfit">
              LearnPulse<span className="text-primary">.</span>
            </h1>
          </div>

          {/* AI Path Badge (students only) */}
          {isStudent && selectedPath && (
            <div className="mx-4 mb-2 p-3 rounded-2xl bg-primary/5 border border-primary/15">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Active Path</p>
                <Link
                  to="/choose-path"
                  className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <FolderEdit className="w-3 h-3" /> Change
                </Link>
              </div>
              <p className="text-sm font-bold text-text-primary truncate">{domain?.name}</p>
              {testCompleted && levelDef && (
                <span className={`mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-lg border ${levelDef.badge}`}>
                  {levelDef.label}
                </span>
              )}
              {!testCompleted && (
                <Link to="/placement-test" className="mt-1.5 inline-block text-[10px] font-bold text-warning hover:underline">
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
                className="block p-3 rounded-2xl bg-primary/10 border border-primary/20 text-center"
              >
                <p className="text-xs font-bold text-primary">✨ Choose Your Learning Path</p>
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
                      ? 'text-primary'
                      : 'text-text-secondary hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-text-primary'}
                  `}
                >
                  {/* Active Indicator Background */}
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-2xl border border-primary/20"></div>
                  )}
                  
                  {/* Active Left Pill */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-lg shadow-[0_0_10px_var(--primary)]"></div>
                  )}

                  <navItem.icon className={`w-5 h-5 z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="z-10">{navItem.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Footer */}
          <div className="p-6 mt-auto">
            <div className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-border-glass backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <span className="text-white font-bold text-sm">PRO</span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-text-primary truncate">Premium Plan</p>
                  <p className="text-xs text-text-secondary truncate">Active</p>
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