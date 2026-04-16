import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export const Card = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  children,
  className 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn(
      'glass p-8 rounded-3xl glass-hover border-0 relative overflow-hidden',
      className
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10" />
    {title && (
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-text-secondary text-sm font-semibold uppercase tracking-wide">{title}</h3>
        {Icon && <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-2xl text-primary"><Icon className="w-5 h-5" /></div>}
      </div>
    )}
    {value && <p className="text-3xl font-bold bg-gradient-to-r from-text-primary to-text-primary bg-clip-text text-transparent mb-2">{value}</p>}
    {trend !== undefined && (
      <p className={`text-sm font-medium flex items-center gap-1 ${trend > 0 ? 'text-success' : 'text-error'}`}>
        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% 
        <span className="text-xs opacity-75">vs dernier mois</span>
      </p>
    )}
    {children}
  </motion.div>
);
