'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SkillsVisualization from '@/components/SkillsVisualization';

export default function Home() {
  const achievements = [
    { number: "13+", label: "Projects", desc: "Delivered" },
    { number: "1+", label: "Year", desc: "Experience" },
    { number: "24/7", label: "Available", desc: "Support" }
  ];

  return (
    <div className="bg-primary text-text-primary min-h-screen">
      {/* Hero Section */}
            {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-light text-text-primary mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            RAGHUL
          </motion.h1>
          <motion.h2 
            className="text-3xl md:text-5xl font-light text-accent mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            KANNAN
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-text-secondary mb-4 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Full Stack Developer
          </motion.p>
          
          <motion.p 
            className="text-base text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Creating modern, scalable applications with clean code and exceptional user experiences
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/projects"
                className="btn-primary text-base px-7 py-3.5"
              >
                View Projects
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="btn-secondary text-base px-7 py-3.5"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-text-primary mb-6">
              About <span className="text-accent">Me</span>
            </h2>
            <p className="text-base text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Passionate full-stack developer with over 1 year of experience building 
              modern web applications. Specialized in React, Node.js, and creating 
              seamless user experiences.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="card-interactive"
              >
                <div className="text-2xl font-bold text-accent mb-2">
                  {achievement.number}
                </div>
                <div className="text-text-primary font-medium mb-1">
                  {achievement.label}
                </div>
                <div className="text-text-muted text-sm">
                  {achievement.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsVisualization />

      {/* Contact CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-text-primary mb-6">
              Let's Work <span className="text-accent">Together</span>
            </h2>
            <p className="text-base text-text-secondary mb-8 leading-relaxed">
              Ready to bring your project to life? Let's discuss how we can 
              create something amazing together.
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="btn-primary text-base px-7 py-3.5"
              >
                Start Your Project
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Resume Download Section */}
      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-7"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Get My Resume
                </h3>
                <p className="text-text-secondary text-sm">
                  Download my complete professional resume in PDF format
                </p>
              </div>
              
              <div className="flex gap-3">
                <motion.a
                  href="/resume.pdf"
                  download="Raghul_Kannan_Resume.pdf"
                  className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                  Download Resume
                </motion.a>
                
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm px-5 py-2.5 flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                    />
                  </svg>
                  View Online
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
