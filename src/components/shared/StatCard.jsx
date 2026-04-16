import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const StatCard = ({ title, value, icon: Icon, color = "gold" }) => {
  // Mapping for dark blue + gold theme
  const colorMap = {
    gold: "bg-[#D4AF37]/10 text-[#D4AF37]",
    indigo: "bg-[#142C54]/40 text-[#D4AF37]",
    purple: "bg-purple-500/10 text-purple-400",
    emerald: "bg-emerald-500/10 text-emerald-400",
    rose: "bg-rose-500/10 text-rose-400",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[#0F1C2E] p-6 rounded-3xl shadow-sm border border-[rgba(212,175,55,0.12)]"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-2xl", colorMap[color] || colorMap.gold)}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>
      <h3 className="text-[#AAB4C5] text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </motion.div>
  );
};

export default StatCard;