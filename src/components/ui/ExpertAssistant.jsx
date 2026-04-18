import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, GraduationCap, Sparkles } from 'lucide-react';

export const ExpertAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: "Bonjour ! Je suis votre assistant pédagogique Pulse Institute. Comment puis-je vous aider dans votre parcours aujourd'hui ?" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    // Simulate system analysis response
    setTimeout(() => {
      let assistantResponse = "Je consulte nos ressources pédagogiques pour vous répondre...";
      if (userMsg.toLowerCase().includes('sql')) {
        assistantResponse = "Le SQL est fondamental pour la gestion des données. Souhaitez-vous explorer un module sur les jointures complexes ?";
      } else if (userMsg.toLowerCase().includes('docker')) {
        assistantResponse = "Docker permet de standardiser vos environnements de développement. \n\nExemple: `docker run -p 80:80 nginx` \n\nTentez cette commande dans votre terminal de laboratoire !";
      }

      setMessages(prev => [...prev, { sender: 'assistant', text: assistantResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white shadow-academic-lg z-50 transition-all border-2 border-white ${isOpen ? 'hidden' : 'flex'}`}
      >
        <GraduationCap className="w-7 h-7 text-[#B59A57]" />
        {/* Unread badge pulse */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full animate-ping"></span>
        <span className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full border-2 border-white"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 p-0 rounded-xl overflow-hidden z-50 flex flex-col shadow-academic-lg border border-slate-200 bg-white"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-[#1E3A8A] p-4 flex justify-between items-center text-white">
               <div className="flex items-center gap-3">
                 <div className="bg-white/10 p-2 rounded-lg border border-white/20">
                    <GraduationCap className="w-5 h-5 text-[#B59A57]" />
                 </div>
                 <div>
                   <h3 className="font-bold text-sm tracking-tight text-white">Learning Assistant</h3>
                   <p className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">Pulse Institute Support</p>
                 </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                 <X className="w-5 h-5" />
               </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                   {/* Avatar */}
                   <div className={`w-8 h-8 rounded-lg flex flex-shrink-0 items-center justify-center border ${msg.sender === 'user' ? 'bg-[#B59A57]/10 text-[#B59A57] border-[#B59A57]/20' : 'bg-[#1E3A8A] text-white border-white/20'}`}>
                     {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-[#B59A57]" />}
                   </div>
                   {/* Bubble */}
                   <div className={`p-3 rounded-xl max-w-[80%] text-sm shadow-sm ${
                     msg.sender === 'user' 
                       ? 'bg-white text-slate-700 border border-slate-200 rounded-tr-none' 
                       : 'bg-[#1E3A8A] text-white rounded-tl-none whitespace-pre-line'
                   }`}>
                     {msg.text}
                   </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
               <div className="relative flex items-center">
                 <input 
                   type="text" 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                   placeholder="Posez une question technique..." 
                   className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-5 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] text-slate-700 placeholder:text-slate-400"
                 />
                 <button onClick={handleSend} className="absolute right-2 p-2 bg-[#B59A57] text-white rounded-lg hover:bg-[#927A3F] transition-colors shadow-sm">
                    <Send className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
