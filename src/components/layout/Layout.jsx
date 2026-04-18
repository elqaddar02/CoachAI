// src/components/layout/Layout.jsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import PageTransition from '../shared/PageTransition';
import { ExpertAssistant } from '../ui/ExpertAssistant';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] overflow-hidden selection:bg-[#B59A57]/30">
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      
      <div className="flex-1 flex flex-col relative w-full lg:w-[calc(100%-18rem)]">
        <Navbar toggleSidebar={toggleSidebar} />
        
        {/* Main Academic Workspace */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full pt-16 px-4 md:px-8 pb-8 z-10 scroll-smooth custom-scrollbar">
          <div className="container mx-auto max-w-7xl h-full mt-4">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </main>
        
        {/* Academic Advisor Hub */}
        <ExpertAssistant />
      </div>
    </div>
  );
};

export default Layout;