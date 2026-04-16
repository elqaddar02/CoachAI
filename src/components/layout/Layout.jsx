// src/components/layout/Layout.jsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import PageTransition from '../shared/PageTransition';
import { AIChatAssistant } from '../ui/AIChatAssistant';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-bg text-text-primary overflow-hidden selection:bg-primary/20">
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      
      <div className="flex-1 flex flex-col relative w-full lg:w-[calc(100%-16rem)]">
        <Navbar toggleSidebar={toggleSidebar} />
        
        {/* Main Workspace */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full pt-20 px-4 md:px-8 pb-8 z-10 scroll-smooth">
          <PageTransition className="container mx-auto max-w-7xl h-full mt-6">
            {children}
          </PageTransition>
        </main>
        
        {/* Floating Global Chat Assistant */}
        <AIChatAssistant />
      </div>
    </div>
  );
};

export default Layout;