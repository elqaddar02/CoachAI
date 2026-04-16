import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const StatCard = ({ title, value, icon: Icon, color = "indigo" }) => {
  // Mapping pour éviter que Tailwind ne purge les classes dynamiques
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-2xl", colorMap[color] || colorMap.indigo)}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </motion.div>
  );
};

export default StatCard;