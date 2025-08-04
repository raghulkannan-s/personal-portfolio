'use client';

import { motion } from 'framer-motion';

export function InstantLoader({ isLoaded, children }) {
  if (isLoaded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="instant-load"
      >
        {children}
      </motion.div>
    );
  }

  return children;
}

export function ProjectsLoadingIndicator({ visible }) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="glass rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
        <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm text-accent font-medium">Loading projects<span className="loading-dots"></span></span>
      </div>
    </motion.div>
  );
}