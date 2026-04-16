import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

export const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Bonjour ! Je suis ton coach IA. As-tu des questions sur le déploiement Cloud ou K8s aujourd'hui ?" }
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

    // Simulate AI response logic
    setTimeout(() => {
      let aiResponse = "Je génère un exercice sur mesure pour toi...";
      if (userMsg.toLowerCase().includes('sql')) {
        aiResponse = "Le SQL permet de manipuler les bases de données. Veux-tu un mini-exercice sur les Jointures (JOIN) ?";
      } else if (userMsg.toLowerCase().includes('docker')) {
        aiResponse = "Docker conteneurise tes applications. \n\nExemple: `docker run -p 8080:80 nginx` \n\nEssaie de taper cette commande dans ton terminal !";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white shadow-xl shadow-primary/30 z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot className="w-6 h-6" />
        {/* Unread badge pulse */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full animate-ping"></span>
        <span className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full border-2 border-slate-900"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 p-0 glass rounded-3xl overflow-hidden z-50 flex flex-col shadow-2xl border border-primary/20"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 flex justify-between items-center text-white">
               <div className="flex items-center gap-2">
                 <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Bot className="w-5 h-5" /></div>
                 <div>
                   <h3 className="font-bold text-sm">AI Study Coach</h3>
                   <p className="text-[10px] text-white/80">Connecté au moteur d'analyse</p>
                 </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                 <X className="w-5 h-5" />
               </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                   {/* Avatar */}
                   <div className={`w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center ${msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400' : 'bg-primary text-white'}`}>
                     {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                   </div>
                   {/* Bubble */}
                   <div className={`p-3 rounded-2xl max-w-[80%] text-sm shadow-sm ${
                     msg.sender === 'user' 
                       ? 'bg-white dark:bg-slate-800 text-text-primary rounded-tr-none' 
                       : 'bg-primary/10 text-text-primary border border-primary/20 rounded-tl-none whitespace-pre-line'
                   }`}>
                     {msg.text}
                   </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-border-glass">
               <div className="relative flex items-center">
                 <input 
                   type="text" 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                   placeholder="Posez une question technique..." 
                   className="w-full bg-slate-100 dark:bg-slate-800 rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary"
                 />
                 <button onClick={handleSend} className="absolute right-2 p-2 bg-primary text-white rounded-full hover:scale-105 transition-transform shadow-md">
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
