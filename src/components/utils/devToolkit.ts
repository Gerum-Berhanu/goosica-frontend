import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = () => {
  return (
    "id-" +
    Math.random().toString(36).substring(2, 11) +
    Date.now().toString(36)
  );
}