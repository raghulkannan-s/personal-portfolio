'use client';

import { motion } from 'framer-motion';

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`border-3 border-accent/20 border-t-accent rounded-full ${sizeClasses[size]} ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50">
      <div className="h-48 skeleton"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 skeleton rounded-lg w-3/4"></div>
        <div className="space-y-3">
          <div className="h-4 skeleton rounded-lg"></div>
          <div className="h-4 skeleton rounded-lg w-5/6"></div>
          <div className="h-4 skeleton rounded-lg w-4/5"></div>
        </div>
        <div className="flex space-x-2 pt-2">
          <div className="h-7 skeleton rounded-full w-20"></div>
          <div className="h-7 skeleton rounded-full w-24"></div>
          <div className="h-7 skeleton rounded-full w-18"></div>
        </div>
        <div className="flex space-x-4 pt-2">
          <div className="h-5 skeleton rounded w-16"></div>
          <div className="h-5 skeleton rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}

export function LoadingPage({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner size="xl" className="mx-auto" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl text-accent font-medium"
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}

export function SkeletonProjects() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <div className="h-12 skeleton rounded-lg w-64 mx-auto mb-4"></div>
        <div className="h-6 skeleton rounded-lg w-96 mx-auto"></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
