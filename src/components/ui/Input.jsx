import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const Input = ({ 
  className = '', 
  label,
  error,
  icon: Icon,
  ...props 
}) => (
  <div className="space-y-2">
    {label && (
      <label className="text-sm font-medium text-text-secondary block">
        {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
      )}
      <motion.input
        className={cn(
          'w-full pl-12 pr-4 py-4 rounded-2xl border-2 bg-bg-card/50 backdrop-blur-sm shadow-md focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200 text-text-primary placeholder:text-text-secondary',
          error && 'border-error focus:border-error focus:ring-error/20',
          className
        )}
        {...props}
        whileFocus={{ scale: 1.02 }}
      />
    </div>
    {error && (
      <p className="text-sm text-error font-medium">{error}</p>
    )}
  </div>
);

export { Input };
