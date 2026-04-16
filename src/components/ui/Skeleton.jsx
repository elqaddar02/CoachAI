import { cn } from '../../utils/helpers';

export const Skeleton = ({ className, variant = 'rectangular' }) => {
  const baseClasses = 'animate-pulse bg-slate-200 dark:bg-slate-800';
  
  const variants = {
    rectangular: 'rounded-2xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4 w-3/4'
  };

  return (
    <div className={cn(baseClasses, variants[variant], className)} />
  );
};

export const CardSkeleton = () => (
  <div className="glass p-6 rounded-3xl w-full">
    <div className="flex items-center justify-between mb-4">
      <Skeleton variant="circular" className="w-12 h-12" />
      <Skeleton className="w-20 h-4" />
    </div>
    <Skeleton className="w-32 h-8 mb-4" />
    <Skeleton variant="text" className="w-full" />
  </div>
);
