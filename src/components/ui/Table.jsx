import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import { ChevronDown, Search, Filter } from 'lucide-react';

export const Table = ({ 
  headers, 
  data, 
  onRowClick,
  className 
}) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={cn('glass rounded-3xl overflow-hidden shadow-glass', className)}
  >
    <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="flex items-center gap-4">
        <Search className="w-5 h-5 text-text-secondary" />
        <input 
          placeholder="Rechercher..."
          className="flex-1 bg-bg-card/50 backdrop-blur-sm border border-border-glass/50 px-4 py-2 rounded-xl text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none"
        />
        <Filter className="w-5 h-5 text-text-secondary" />
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-t border-border-glass bg-bg-card/30">
            {headers.map((h, i) => (
              <th key={i} className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                {h}
                <ChevronDown className="w-4 h-4 inline ml-1 opacity-50" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-glass">
          {data.map((row, i) => (
            <motion.tr 
              key={i}
              whileHover={{ backgroundColor: 'rgba(139,92,246,0.05)' }}
              className="cursor-pointer hover:bg-primary/5 transition-colors"
              onClick={() => onRowClick?.(row)}
            >
              {Object.values(row).map((val, j) => (
                <td key={j} className="px-6 py-4 text-sm text-text-primary">
                  {val}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);
