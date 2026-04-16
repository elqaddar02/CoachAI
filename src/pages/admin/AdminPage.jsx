import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Users, Database, Server, Edit2, Trash2, Plus, ShieldCheck, X, Clock, LogIn, LogOut } from 'lucide-react';
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
  logoutTime: i % 2 === 0 ? generateTime(i) : 'En ligne',
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
      // Update
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
      toast.success('Profil mis à jour avec succès');
    } else {
      // Create
      const newUser = {
        id: Date.now(),
        ...formData,
        loginTime: generateTime(0),
        logoutTime: 'En ligne',
        status: 'ONLINE'
      };
      setUsers([newUser, ...users]);
      toast.success('Nouvel utilisateur ajouté');
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if(window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
       setUsers(users.filter(u => u.id !== id));
       toast.error('Utilisateur supprimé définitivement');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="space-y-8 relative"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 glass p-8 rounded-[2rem] border-b-4 border-slate-700 dark:border-slate-300">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary mb-2 font-outfit">The Control <span className="text-slate-500">Tower</span></h1>
          <p className="text-text-secondary text-lg">Platform Orchestration & User Management</p>
        </div>
        <div className="flex gap-4">
           <button onClick={() => openModal()} className="btn-primary shadow-lg shadow-primary/30 flex items-center gap-2">
               <Plus className="w-5 h-5" /> Enregistrer Utilisateur
           </button>
        </div>
      </div>

      <div className="glass p-8 rounded-[2rem] relative z-10 transition-all duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-text-primary">Registre des Utilisateurs</h2>
          <div className="w-full sm:w-auto relative">
             <input 
               type="text"
               placeholder="Rechercher nom, email, rôle..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="input-focus w-full sm:w-80 pl-4 py-2 bg-white/50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
             />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-border-glass text-text-secondary text-[11px] font-black uppercase tracking-widest">
                <th className="pb-4 px-4">Utilisateur</th>
                <th className="pb-4 px-4">Rôle</th>
                <th className="pb-4 px-4">Statut Connexion</th>
                <th className="pb-4 px-4 text-center">Heure Entrée <LogIn className="inline w-3 h-3 ml-1" /></th>
                <th className="pb-4 px-4 text-center">Heure Sortie <LogOut className="inline w-3 h-3 ml-1" /></th>
                <th className="pb-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-text-primary text-sm font-medium">
              <AnimatePresence>
                {filteredUsers.map((user, i) => (
                  <motion.tr 
                    key={user.id}
                    layout
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.05 }}
                    className="border-b border-border-glass/50 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold">{user.name}</span>
                        <span className="text-xs text-text-secondary">{user.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${
                         user.role === 'admin' ? 'bg-purple-500/10 text-purple-600 border-purple-500/20' :
                         user.role === 'teacher' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                         'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                       }`}>
                         {user.role}
                       </span>
                    </td>
                    <td className="py-4 px-4">
                       <div className="flex items-center gap-2 text-xs font-bold font-mono">
                          <div className={`w-2 h-2 rounded-full ${user.status === 'ONLINE' ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]' : 'bg-slate-400'}`}></div> 
                          {user.status}
                       </div>
                    </td>
                    <td className="py-4 px-4 text-center font-mono text-xs text-text-secondary font-bold">
                       {user.loginTime}
                    </td>
                    <td className="py-4 px-4 text-center font-mono text-xs text-text-secondary font-bold">
                       {user.logoutTime === 'En ligne' ? <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">En Ligne</span> : user.logoutTime}
                    </td>
                    <td className="py-4 px-4">
                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => openModal(user)} className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-colors border border-transparent hover:border-blue-500/20" title='Modifier'>
                           <Edit2 className="w-4 h-4" />
                         </button>
                         <button onClick={() => handleDelete(user.id)} className="p-2 hover:bg-error/10 text-error rounded-lg transition-colors border border-transparent hover:border-error/20" title='Supprimer'>
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
             <div className="text-center py-12 text-text-secondary">Aucun utilisateur trouvé.</div>
          )}
        </div>
      </div>

      {/* CRUD Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
               className="bg-white dark:bg-slate-900 border border-border-glass rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative"
             >
                <div className="absolute top-0 right-0 p-4">
                   <button onClick={closeModal} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <X className="w-4 h-4 text-text-primary" />
                   </button>
                </div>
                
                <h2 className="text-2xl font-black text-text-primary mb-6">
                  {editingUser ? 'Modifier le Profil' : 'Nouvel Utilisateur'}
                </h2>

                <form onSubmit={handleSave} className="space-y-4">
                   <div>
                     <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Nom Complet</label>
                     <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-sm" placeholder="Alex Developer" />
                   </div>
                   
                   <div>
                     <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Adresse Email</label>
                     <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-sm" placeholder="alex@learnpulse.com" />
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Nouveau Mot de Passe</label>
                     <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-sm" placeholder={editingUser ? "Laissez vide pour conserver l'actuel" : "Nouveau mot de passe"} />
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Rôle Système</label>
                     <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-sm">
                        <option value="student">Étudiant (Student)</option>
                        <option value="teacher">Enseignant (Teacher)</option>
                        <option value="admin">Administrateur (Admin)</option>
                     </select>
                   </div>

                   <div className="pt-4 flex gap-3">
                     <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl border border-border-glass text-text-primary font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                       Annuler
                     </button>
                     <button type="submit" className="flex-1 px-4 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-colors">
                       {editingUser ? 'Mettre à jour' : 'Créer'}
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