'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-surface border border-border rounded-full p-1 transition-all duration-300 hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/10 to-accent-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Toggle circle */}
      <motion.div
        className="w-6 h-6 bg-accent rounded-full shadow-lg flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 0 : 20,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          className="text-primary"
        >
          {theme === 'dark' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,18.5A6.5,6.5,0,1,1,18.5,12,6.51,6.51,0,0,1,12,18.5ZM12,7A5,5,0,1,0,17,12,5,5,0,0,0,12,7Z"/>
              <path d="M12,1a1,1,0,0,0-1,1V4a1,1,0,0,0,2,0V2A1,1,0,0,0,12,1Z"/>
              <path d="M12,20a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V21A1,1,0,0,0,12,20Z"/>
              <path d="M4.64,4.64a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.41l1.41,1.42a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/>
              <path d="M18.36,18.36a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.41l1.41,1.42a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/>
              <path d="M1,13H4a1,1,0,0,0,0-2H1a1,1,0,0,0,0,2Z"/>
              <path d="M20,13h3a1,1,0,0,0,0-2H20a1,1,0,0,0,0,2Z"/>
              <path d="M4.64,19.36a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l1.42-1.41a1,1,0,0,0,0-1.42,1,1,0,0,0-1.42,0Z"/>
              <path d="M18.36,5.64a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l1.42-1.41a1,1,0,0,0,0-1.42,1,1,0,0,0-1.42,0Z"/>
            </svg>
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
