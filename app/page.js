'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProjects } from '@/context/ProjectsContext';
import { useTheme } from '@/context/ThemeContext';
import SkillsVisualization from '@/components/SkillsVisualization';

export default function Home() {
  const { theme } = useTheme();
  const { 
    projects, 
    loading: projectsLoading, 
    error: projectsError, 
    featuredProjects 
  } = useProjects();

  // Get featured projects or latest 3 projects for display
  const displayProjects = featuredProjects.length > 0 
    ? featuredProjects.slice(0, 3) 
    : projects.slice(0, 3);

  const achievements = [
    { number: "13+", label: "Projects", desc: "Delivered" },
    { number: "1+", label: "Year", desc: "Experience" },
    { number: "24/7", label: "Available", desc: "Support" }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'light' ? 'bg-white text-gray-900' : 'bg-black text-white'
    }`}>
      {/* Modern Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.p 
            className={`text-sm tracking-[0.2em] mb-6 font-medium uppercase transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Full Stack Developer
          </motion.p>

          <motion.h1 
            className={`text-6xl md:text-8xl font-light mb-2 leading-tight tracking-tight transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            RAGHUL
          </motion.h1>
          
          <motion.h2 
            className={`text-4xl md:text-6xl font-light mb-12 leading-tight tracking-tight transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            KANNAN
          </motion.h2>
          
          <motion.p 
            className={`text-xl mb-16 max-w-2xl mx-auto leading-relaxed font-light transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Creating modern, scalable applications with clean code and exceptional user experiences
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="/projects"
              className={`inline-flex items-center px-8 py-4 rounded-2xl transition-all duration-300 font-medium ${
                theme === 'light'
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              View Projects
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/contact"
              className={`inline-flex items-center px-8 py-4 rounded-2xl transition-all duration-300 font-medium ${
                theme === 'light'
                  ? 'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  : 'bg-transparent text-white border border-gray-700 hover:bg-gray-900 hover:border-gray-600'
              }`}
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Clean About Section */}
      <section className={`py-24 px-6 border-t transition-all duration-500 ${
        theme === 'light' ? 'border-gray-100' : 'border-gray-900'
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl lg:text-4xl font-light mb-6 transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              About <span className={`font-normal ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-200'
              }`}>Me</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed font-light transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Passionate full-stack developer with over 1 year of experience building 
              modern web applications. Specialized in React, Node.js, and creating 
              seamless user experiences.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`text-center rounded-2xl p-8 transition-all duration-300 ${
                  theme === 'light' 
                    ? 'bg-white border border-gray-200/60 hover:shadow-lg hover:shadow-gray-900/10' 
                    : 'bg-gray-900 border border-gray-800 hover:shadow-lg hover:shadow-white/10'
                }`}
              >
                <div className={`text-3xl font-light mb-2 transition-colors duration-500 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {achievement.number}
                </div>
                <div className={`font-medium mb-1 transition-colors duration-500 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {achievement.label}
                </div>
                <div className={`text-sm transition-colors duration-500 ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {achievement.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className={`py-24 px-6 transition-all duration-500 ${
        theme === 'light' ? 'bg-gray-50/50' : 'bg-gray-900/30'
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl lg:text-4xl font-light mb-6 transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Featured <span className={`font-normal ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-200'
              }`}>Projects</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed font-light transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Explore some of my latest work showcasing modern web development 
              and creative problem-solving.
            </p>
          </motion.div>

          {/* Projects Loading State */}
          {projectsLoading && (
            <div className="flex justify-center items-center py-16">
              <div className={`rounded-2xl p-8 flex items-center gap-4 transition-all duration-500 ${
                theme === 'light' 
                  ? 'bg-white border border-gray-200/60' 
                  : 'bg-gray-900 border border-gray-800'
              }`}>
                <div className={`w-6 h-6 border-2 rounded-full animate-spin ${
                  theme === 'light' 
                    ? 'border-gray-300 border-t-gray-900' 
                    : 'border-gray-700 border-t-white'
                }`}></div>
                <span className={`font-medium ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>Loading projects...</span>
              </div>
            </div>
          )}

          {/* Projects Error State */}
          {projectsError && (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">⚠️</div>
              <p className={`mb-4 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>{projectsError}</p>
              <Link href="/projects" className={`inline-flex items-center px-6 py-3 rounded-2xl transition-colors font-medium ${
                theme === 'light'
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}>
                View All Projects
              </Link>
            </div>
          )}

          {/* Projects Grid */}
          {!projectsLoading && !projectsError && projects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className={`rounded-2xl overflow-hidden transition-all duration-300 ease-out ${
                    theme === 'light'
                      ? 'bg-white border border-gray-200/60 hover:shadow-xl hover:shadow-gray-900/10'
                      : 'bg-gray-900 border border-gray-800 hover:shadow-xl hover:shadow-white/10'
                  }`}>
                    {/* Project Image */}
                    <div className={`relative aspect-[16/10] overflow-hidden ${
                      theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                    }`}>
                      {project.image ? (
                        <>
                          <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                          <div className={`w-16 h-16 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} rounded-2xl flex items-center justify-center`}>
                            <span className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-300'} text-2xl`}>📁</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-3">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Live Demo
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-transparent text-white border border-white/20 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className={`text-lg font-medium mb-3 transition-colors duration-300 ${
                        theme === 'light' ? 'text-gray-900 group-hover:text-gray-800' : 'text-white group-hover:text-gray-200'
                      }`}>
                        {project.title}
                      </h3>
                      
                      <p className={`text-sm mb-4 leading-relaxed line-clamp-2 ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(Array.isArray(project.technologies) 
                          ? project.technologies 
                          : project.technologies?.split(',').map(t => t.trim()) || []
                        ).slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-3 py-1 text-xs rounded-full font-medium ${
                              theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-800 text-gray-300'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {(Array.isArray(project.technologies) 
                          ? project.technologies 
                          : project.technologies?.split(',').map(t => t.trim()) || []
                        ).length > 3 && (
                          <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                            theme === 'light' ? 'bg-gray-200 text-gray-600' : 'bg-gray-700 text-gray-300'
                          }`}>
                            +{(Array.isArray(project.technologies) 
                              ? project.technologies 
                              : project.technologies?.split(',').map(t => t.trim()) || []
                            ).length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Project Links */}
                      <div className={`flex items-center justify-between pt-4 ${theme === 'light' ? 'border-t border-gray-100' : 'border-t border-gray-800'}`}>
                        <div className="flex gap-3">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={theme === 'light' ? 'text-gray-900 hover:text-gray-700 transition-colors' : 'text-white hover:text-gray-300 transition-colors'}
                              title="Live Demo"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={theme === 'light' ? 'text-gray-600 hover:text-gray-900 transition-colors' : 'text-gray-300 hover:text-white transition-colors'}
                              title="GitHub Repository"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                        
                        <Link
                          href="/projects"
                          className={theme === 'light' ? 'text-gray-600 hover:text-gray-900 text-xs transition-colors font-medium' : 'text-gray-300 hover:text-white text-xs transition-colors font-medium'}
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Projects State */}
          {!projectsLoading && !projectsError && projects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Projects Available</h3>
              <p className="text-gray-600 mb-6">Projects will appear here once they're added.</p>
              <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-colors font-medium">
                Discuss Your Project
              </Link>
            </div>
          )}

          {/* View All Projects Button */}
          {!projectsLoading && !projectsError && projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Link href="/projects" className="inline-flex items-center px-8 py-4 bg-transparent text-gray-900 border border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium">
                View All Projects
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <SkillsVisualization />

      {/* Contact CTA */}
      <section className={`py-24 px-6 border-t transition-all duration-500 ${
        theme === 'light' ? 'border-gray-100' : 'border-gray-900'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl lg:text-4xl font-light mb-6 transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Let's Work <span className={`font-normal ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-200'
              }`}>Together</span>
            </h2>
            <p className={`text-xl mb-8 leading-relaxed font-light transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Ready to bring your project to life? Let's discuss how we can 
              create something amazing together.
            </p>
            <a
              href="/contact"
              className={`inline-flex items-center px-8 py-4 rounded-2xl transition-all duration-300 font-medium ${
                theme === 'light'
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              Start Your Project
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Resume Download Section */}
      <section className={`py-24 px-6 transition-all duration-500 ${
        theme === 'light' ? 'bg-gray-50/50' : 'bg-gray-900/30'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl p-8 transition-all duration-500 ${
              theme === 'light' 
                ? 'bg-white border border-gray-200/60' 
                : 'bg-gray-900 border border-gray-800'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className={`text-xl font-medium mb-2 transition-colors duration-500 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Get My Resume
                </h3>
                <p className={`text-sm transition-colors duration-500 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Download my complete professional resume in PDF format
                </p>
              </div>
              
              <div className="flex gap-3">
                <a
                  href="/resume.pdf"
                  download="Raghul_Kannan_Resume.pdf"
                  className={`inline-flex items-center px-6 py-3 rounded-2xl transition-all duration-300 font-medium text-sm gap-2 ${
                    theme === 'light'
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
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
                </a>
                
                <a
                  href="/raghul-kannan-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-6 py-3 border rounded-2xl transition-all duration-300 font-medium text-sm gap-2 ${
                    theme === 'light'
                      ? 'bg-transparent text-gray-900 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                      : 'bg-transparent text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600'
                  }`}
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
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
