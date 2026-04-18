import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Users, Database, Server, Edit2, Trash2, Plus, ShieldCheck, X, Clock, LogIn, LogOut, GraduationCap, Shield, Search, UserPlus } from 'lucide-react';
import { MOCK_USERS } from '../../services/mockData';
import { toast } from 'react-hot-toast';

// Helper pour générer des heures aléatoires pour le mockup
const generateTime = (offset = 0) => {
  const d = new Date();
  d.setHours(d.getHours() - offset);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Initial state enrichi avec entrées/sorties
const initialUsers = MOCK_USERS.map((u, i) => ({
  ...u,
  loginTime: generateTime(i + 1),
  logoutTime: i % 2 === 0 ? generateTime(i) : 'Session Active',
  status: i % 2 === 0 ? 'OFFLINE' : 'ONLINE'
}));

const AdminPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', role: 'student', password: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, role: user.role, password: '' });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'student', password: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
      toast.success('Dossier académique mis à jour');
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
        loginTime: generateTime(0),
        logoutTime: 'Session Active',
        status: 'ONLINE'
      };
      setUsers([newUser, ...users]);
      toast.success('Nouvelle inscription enregistrée');
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if(window.confirm('Voulez-vous vraiment révoquer cet accès ?')) {
       setUsers(users.filter(u => u.id !== id));
       toast.error('Accès révoqué définitivement');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 relative font-inter"
    >
      {/* Admin Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#1E3A8A] p-10 rounded-xl shadow-academic border-b-4 border-[#B59A57]">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Shield className="w-7 h-7 text-[#B59A57]" />
           </div>
           <div>
             <h1 className="text-3xl font-black text-white mb-1 font-outfit tracking-tight">Board Administration</h1>
             <p className="text-slate-300 text-sm font-medium uppercase tracking-[0.2em]">Pulse Institute Orchestration</p>
           </div>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2 bg-[#B59A57] hover:bg-[#927A3F] border-none shadow-md">
            <Plus className="w-5 h-5" /> Enregistrer un Membre
        </button>
      </div>

      {/* Main Content Table Card */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-academic">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#1E3A8A] mb-1">Registre Académique</h2>
            <p className="text-xs text-slate-400 font-medium tracking-wide">Gestion centralisée des accès et des rôles institutionnels.</p>
          </div>
          <div className="w-full sm:w-auto relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="text"
               placeholder="Rechercher par nom, email..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full sm:w-80 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-4 focus:ring-[#1E3A8A]/5 focus:border-[#1E3A8A] text-sm font-medium transition-all" 
             />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="pb-4 px-4">Membre</th>
                <th className="pb-4 px-4">Rôle Institutionnel</th>
                <th className="pb-4 px-4">Session</th>
                <th className="pb-4 px-4 text-center">Entrée <LogIn className="inline w-3 h-3 ml-1" /></th>
                <th className="pb-4 px-4 text-center">Dernière Sortie <LogOut className="inline w-3 h-3 ml-1" /></th>
                <th className="pb-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 text-sm font-medium">
              <AnimatePresence>
                {filteredUsers.map((user, i) => (
                  <motion.tr 
                    key={user.id}
                    layout
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="py-5 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#1E3A8A]">{user.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{user.email}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                       <span className={`px-2.5 py-1 rounded-md text-[9px] font-black tracking-widest uppercase border ${
                         user.role === 'admin' ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]' :
                         user.role === 'teacher' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                         'bg-[#B59A57]/10 text-[#B59A57] border-[#B59A57]/20'
                       }`}>
                         {user.role === 'admin' ? 'Board' : user.role === 'teacher' ? 'Faculty' : 'Scholar'}
                       </span>
                    </td>
                    <td className="py-5 px-4">
                       <div className="flex items-center gap-2 text-[10px] font-black transition-all">
                          <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'ONLINE' ? 'bg-emerald-500 animate-pulse shadow-sm' : 'bg-slate-300'}`}></div> 
                          {user.status === 'ONLINE' ? 'ACTIF' : 'INACTIF'}
                       </div>
                    </td>
                    <td className="py-5 px-4 text-center font-mono text-xs text-slate-500">
                       {user.loginTime}
                    </td>
                    <td className="py-5 px-4 text-center font-mono text-xs text-slate-500">
                       {user.logoutTime === 'Session Active' ? <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-black uppercase">Active</span> : user.logoutTime}
                    </td>
                    <td className="py-5 px-4">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                         <button onClick={() => openModal(user)} className="p-2 hover:bg-slate-100 text-[#1E3A8A] rounded-lg transition-colors border border-slate-100" title='Dossier'>
                           <Edit2 className="w-4 h-4" />
                         </button>
                         <button onClick={() => handleDelete(user.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors border border-red-100" title='Révoquer'>
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
             <div className="text-center py-16 text-slate-400 font-medium italic">Aucun membre répertorié.</div>
          )}
        </div>
      </div>

      {/* Institutional Admin Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
             <motion.div 
               initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
               className="bg-white border border-slate-200 rounded-xl p-10 w-full max-w-md shadow-academic-lg relative"
             >
                <button onClick={closeModal} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-[#1E3A8A] transition-colors">
                    <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/5 flex items-center justify-center border border-[#1E3A8A]/10">
                      <GraduationCap className="text-[#1E3A8A] w-5 h-5" />
                   </div>
                   <h2 className="text-2xl font-black text-[#1E3A8A] tracking-tight">
                    {editingUser ? 'Dossier Membre' : 'Nouvelle Inscription'}
                  </h2>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                   <div className="space-y-1">
                     <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom Complet</label>
                     <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/5 rounded-lg text-sm font-medium" placeholder="Ex: Jean Dupont" />
                   </div>
                   
                   <div className="space-y-1">
                     <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Adresse Académique (@pulseinstitute.edu)</label>
                     <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/5 rounded-lg text-sm font-medium" placeholder="jean@pulseinstitute.edu" />
                   </div>

                   <div className="space-y-1">
                     <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Mot de Passe Académique</label>
                     <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/5 rounded-lg text-sm font-medium" placeholder={editingUser ? "Conserver l'actuel" : "Définir mot de passe"} />
                   </div>

                   <div className="space-y-1">
                     <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Rôle Institutionnel</label>
                     <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-[#1E3A8A] rounded-lg text-sm font-bold text-[#1E3A8A]">
                        <option value="student">Étudiant Scholar</option>
                        <option value="teacher">Corps Enseignant (Faculty)</option>
                        <option value="admin">Administration (Board)</option>
                     </select>
                   </div>

                   <div className="pt-6 flex gap-4">
                     <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 rounded-lg border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-colors">
                       Annuler
                     </button>
                     <button type="submit" className="btn-primary flex-1 !py-3 bg-[#B59A57] hover:bg-[#927A3F]">
                       {editingUser ? 'Actualiser' : 'Enregistrer'}
                     </button>
                   </div>
                </form>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminPage;