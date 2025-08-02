'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResumeUpload({ onUploadSuccess }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [resumeInfo, setResumeInfo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const checkResumeStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/resume', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setResumeInfo(data);
    } catch (error) {
      console.error('Error checking resume status:', error);
    }
  };

  React.useEffect(() => {
    checkResumeStatus();
  }, []);

  const validateFile = (file) => {
    // Validate file type
    if (file.type !== 'application/pdf') {
      throw new Error('Only PDF files are allowed');
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB');
    }

    return true;
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    try {
      validateFile(file);
      setUploading(true);
      setError('');
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('resume', file);

      const token = localStorage.getItem('adminToken');
      
      // Simulate upload progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 20;
        });
      }, 200);

      const response = await fetch('/api/admin/resume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.json();

      if (response.ok) {
        await checkResumeStatus();
        if (onUploadSuccess) onUploadSuccess(result);
        
        // Reset progress after a short delay
        setTimeout(() => {
          setUploadProgress(0);
        }, 1500);
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      setError(error.message);
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only set drag over to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDeleteResume = async () => {
    if (!confirm('Are you sure you want to delete the current resume?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/resume', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await checkResumeStatus();
        if (onUploadSuccess) onUploadSuccess(null);
      } else {
        const result = await response.json();
        setError(result.error || 'Failed to delete resume');
      }
    } catch (error) {
      setError('Failed to delete resume');
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-text-primary">Resume Management</h3>
        {resumeInfo?.exists && (
          <motion.button
            onClick={handleDeleteResume}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Delete Resume
          </motion.button>
        )}
      </div>

      {/* Current Resume Status */}
      {resumeInfo?.exists && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">📄</span>
              </div>
              <div>
                <p className="text-green-800 font-medium">Resume Active</p>
                <p className="text-green-600 text-sm">{resumeInfo.fileName}</p>
              </div>
            </div>
            <a
              href={resumeInfo.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Preview
            </a>
          </div>
        </motion.div>
      )}

      {/* Upload Area */}
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-accent bg-accent/5 scale-[1.02]'
            : uploading
            ? 'border-accent/50 bg-accent/2'
            : resumeInfo?.exists
            ? 'border-gray-300 bg-gray-50/50'
            : 'border-gray-300 hover:border-accent/50 hover:bg-accent/2'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        whileHover={{ scale: uploading ? 1 : 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />

        <AnimatePresence mode="wait">
          {uploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full mx-auto"
              />
              <div className="space-y-2">
                <p className="text-accent font-medium">Uploading Resume...</p>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm text-text-muted">{Math.round(uploadProgress)}%</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload-area"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <motion.div
                animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
                className="w-16 h-16 mx-auto"
              >
                <div className="w-full h-full rounded-2xl bg-accent/10 flex items-center justify-center">
                  <span className="text-2xl">📎</span>
                </div>
              </motion.div>
              
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-text-primary">
                  {isDragOver ? 'Drop your resume here!' : resumeInfo?.exists ? 'Replace Resume' : 'Upload Resume'}
                </h4>
                <p className="text-text-muted">
                  {isDragOver 
                    ? 'Release to upload' 
                    : 'Drag and drop your PDF resume or click to browse'
                  }
                </p>
                <p className="text-sm text-text-muted">
                  Supports PDF files up to 5MB
                </p>
              </div>

              <motion.button
                onClick={triggerFileSelect}
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={uploading}
              >
                {resumeInfo?.exists ? 'Replace Resume' : 'Select PDF File'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-lg">⚠️</span>
              <div>
                <p className="text-red-800 font-medium">Upload Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <button
                onClick={() => setError('')}
                className="ml-auto text-red-400 hover:text-red-600 text-lg"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="text-amber-800 font-medium mb-2">📋 Instructions</h4>
        <ul className="text-amber-700 text-sm space-y-1">
          <li>• Upload only PDF format resumes</li>
          <li>• Maximum file size: 5MB</li>
          <li>• Once uploaded, visitors can download from the main site</li>
          <li>• The resume will be publicly accessible at <code className="bg-amber-100 px-1 rounded">/api/resume?action=download</code></li>
        </ul>
      </div>
    </div>
  );
}
