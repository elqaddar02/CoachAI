import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers'; // assume cn utility

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-2xl shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-hover hover:shadow-xl',
    secondary: 'border-2 border-border bg-bg-card/50 backdrop-blur-sm text-text-primary hover:bg-bg-card dark:border-border-glass hover:shadow-lg',
    ghost: 'text-text-primary hover:text-primary hover:bg-primary/10',
    destructive: 'bg-error text-white hover:bg-red-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <motion.button 
      className={classes}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  );
};

export { Button };
