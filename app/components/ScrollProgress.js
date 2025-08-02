'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Add spring animation to the progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-hover to-accent-secondary origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Circular Progress Indicator */}
      <motion.div
        className="fixed bottom-8 right-8 w-16 h-16 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            className="backdrop-blur-sm"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress
            }}
            strokeDasharray="0 1"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(245 158 11)" />
              <stop offset="50%" stopColor="rgb(251 191 36)" />
              <stop offset="100%" stopColor="rgb(217 119 6)" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Percentage text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
          }}
        >
          <motion.span
            className="text-xs font-bold text-text-primary bg-primary/50 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center"
            style={{
              scale: useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
            }}
          >
            <motion.span>
              {Math.round(scrollYProgress.get() * 100)}
            </motion.span>
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
}
