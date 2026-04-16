import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusionne les classes Tailwind en gérant les conflits
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const formatNumber = (num) => new Intl.NumberFormat().format(num);
export const truncate = (text, length = 50) => 
  text.length > length ? text.slice(0, length) + '...' : text;