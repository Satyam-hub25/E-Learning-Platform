'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../lib/ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-12 h-6',
    md: 'w-14 h-7',
    lg: 'w-16 h-8'
  };

  const iconSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`
        relative ${sizeClasses[size]} rounded-full p-1 transition-all duration-300 ease-in-out
        ${theme === 'dark' 
          ? 'bg-slate-700 border-2 border-slate-600' 
          : 'bg-yellow-200 border-2 border-yellow-300'
        }
        hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2
        ${theme === 'dark' ? 'focus:ring-slate-500' : 'focus:ring-yellow-400'}
        ${className}
      `}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        layout
        className={`
          ${sizeClasses[size]} rounded-full flex items-center justify-center
          absolute top-1 transition-all duration-300 ease-in-out
          ${theme === 'dark' 
            ? 'bg-slate-900 text-blue-300 translate-x-0' 
            : 'bg-white text-yellow-600 translate-x-full'
          }
          shadow-md
        `}
        style={{
          width: theme === 'dark' ? '1.25rem' : '1.25rem',
          height: theme === 'dark' ? '1.25rem' : '1.25rem',
        }}
      >
        <span className={iconSizes[size]}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </span>
      </motion.div>
      
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1">
        <span className={`${iconSizes[size]} transition-opacity ${theme === 'dark' ? 'opacity-0' : 'opacity-70'}`}>
          ☀️
        </span>
        <span className={`${iconSizes[size]} transition-opacity ${theme === 'dark' ? 'opacity-70' : 'opacity-0'}`}>
          🌙
        </span>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;