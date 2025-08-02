'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResumeDownload({ className = '', showLabel = true, variant = 'primary', size = 'md' }) {
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    checkResumeAvailability();
  }, []);

  const checkResumeAvailability = async () => {
    try {
      const response = await fetch('/api/resume');
      const data = await response.json();
      setResumeInfo(data);
    } catch (error) {
      console.error('Error checking resume:', error);
      setResumeInfo({ exists: false });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!resumeInfo?.exists) return;
    
    setDownloading(true);
    try {
      const response = await fetch('/api/resume?action=download');
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Raghul_Kannan_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2000);
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className={`${size === 'sm' ? 'h-8' : 'h-10'} bg-gray-800 rounded-lg`}></div>
      </div>
    );
  }

  if (!resumeInfo?.exists) {
    return null; // Don't show anything if resume doesn't exist
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const buttonClasses = {
    primary: `bg-amber-500 hover:bg-amber-400 text-black font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${sizeClasses[size]}`,
    secondary: `bg-gray-900 border border-amber-400/30 hover:border-amber-400/50 text-amber-400 hover:text-amber-300 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${sizeClasses[size]} hover:bg-gray-800`,
    minimal: `text-amber-400 hover:text-amber-300 transition-colors duration-300 font-medium ${sizeClasses[size]}`,
    navbar: `bg-gray-900/40 hover:bg-gray-800/60 text-amber-400 hover:text-amber-300 transition-all duration-300 border border-amber-500/30 hover:border-amber-400/50 rounded-lg ${sizeClasses[size]} backdrop-blur-sm`
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <motion.button
      onClick={handleDownload}
      disabled={downloading}
      className={`${buttonClasses[variant]} ${className} relative overflow-hidden group`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      title="Download Resume"
    >
      <AnimatePresence mode="wait">
        {downloading ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <div className={`${iconSize.replace('w-', 'w-').replace('h-', 'h-')} border-2 border-current border-t-transparent rounded-full animate-spin`}></div>
            {showLabel && size !== 'sm' && 'Downloading...'}
          </motion.span>
        ) : downloadSuccess ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <svg className={iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {showLabel && size !== 'sm' && 'Downloaded!'}
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            {variant === 'minimal' ? (
              <span className="text-lg">📄</span>
            ) : (
              <svg className={`${iconSize} group-hover:translate-y-0.5 transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
            {showLabel && (size !== 'sm' || variant === 'minimal') && 'Resume'}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
