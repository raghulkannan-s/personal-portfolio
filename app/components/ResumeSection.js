'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ResumeSection() {
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    checkResumeStatus();
  }, []);

  const checkResumeStatus = async () => {
    try {
      const response = await fetch('/api/resume');
      const data = await response.json();
      setResumeInfo(data);
    } catch (error) {
      console.error('Resume check failed:', error);
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
        setTimeout(() => setDownloadSuccess(false), 3000);
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setDownloading(false);
    }
  };

  const handlePreview = () => {
    if (resumeInfo?.directUrl) {
      window.open(resumeInfo.directUrl, '_blank');
    }
  };

  // Don't render if loading or resume not available
  if (loading || !resumeInfo?.exists) {
    return null;
  }

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden bg-black">
      {/* Premium black background with subtle gold accents */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/80 to-black"></div>
        <div className="absolute top-1/4 right-10 w-32 h-32 bg-accent/[0.015] rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-16 w-40 h-40 bg-accent-secondary/[0.01] rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <motion.p 
            className="text-micro text-accent/80 tracking-[0.15em] mb-3 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            PROFESSIONAL DOCUMENT
          </motion.p>
          
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-3">
            Professional
            <span className="block gradient-gold font-medium">
              Resume
            </span>
          </h2>
          
          <p className="text-gray-300 max-w-xl mx-auto font-light leading-relaxed">
            Download my comprehensive resume with technical skills, experience, and achievements.
          </p>
        </motion.div>

        {/* Premium Download Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900/60 backdrop-blur-lg border border-accent/20 hover:border-accent/40 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
        >
          {/* Luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          
          {/* Golden particles for hover effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
            <div className="absolute top-4 right-4 w-1 h-1 bg-accent rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-accent-secondary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Premium PDF Icon */}
            <div className="flex-shrink-0">
              <div className="w-20 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-lg shadow-md relative overflow-hidden border border-red-400/30">
                <div className="absolute inset-0 bg-white/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-lg font-bold">PDF</div>
                </div>
                {/* Luxury shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                Professional Resume
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                Comprehensive overview of technical expertise, education, and project portfolio with detailed achievements.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="bg-gradient-to-r from-accent via-accent-hover to-accent-secondary text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {downloading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Downloading...
                    </span>
                  ) : downloadSuccess ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Downloaded!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Resume
                    </span>
                  )}
                  {/* Luxury shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>

                <button
                  onClick={handlePreview}
                  className="bg-gray-800/60 border-2 border-accent/30 hover:border-accent/50 text-accent hover:text-accent-hover font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-700/70"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
