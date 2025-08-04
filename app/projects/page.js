'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { useProjects } from '@/context/ProjectsContext';
import { InstantLoader, ProjectsLoadingIndicator } from '@/components/InstantLoader';

export default function Projects() {
  const { 
    projects, 
    loading, 
    error: projectsError,
    getProjectsByTechnology 
  } = useProjects();
  
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Check if projects are already loaded (instant loading)
  const hasProjects = projects.length > 0;
  const showInstantLoad = hasProjects && !loading;

  // Update filtered projects when projects or filter changes
  useEffect(() => {
    filterProjects(filter);
  }, [projects, filter]);

  const filterProjects = (category) => {
    setFilter(category);
    if (category === 'all') {
      setFilteredProjects(projects);
    } else if (category === 'featured') {
      setFilteredProjects(projects.filter(p => p.featured));
    } else {
      setFilteredProjects(getProjectsByTechnology(category));
    }
  };

  if (loading && projects.length === 0) {
    return (
      <div className="min-h-screen bg-primary text-text-primary pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-border border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <span className="text-text-secondary font-medium">Loading projects...</span>
        </div>
      </div>
    );
  }

  if (projectsError && projects.length === 0) {
    return (
      <div className="min-h-screen bg-primary text-text-primary pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-text-primary mb-2">Failed to Load Projects</h2>
          <p className="text-text-secondary mb-6">{projectsError}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <InstantLoader isLoaded={showInstantLoad}>
        <div className="min-h-screen bg-primary text-text-primary pt-24">
          {/* Hero Section */}
          <section className="py-24 lg:py-32">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.p 
                  className="text-sm text-text-muted tracking-[0.2em] mb-6 font-medium uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Portfolio
                </motion.p>
                
                <h1 className="text-5xl lg:text-6xl font-light text-text-primary mb-8 leading-tight">
                  Projects <span className="font-normal text-accent">Crafted</span>
                </h1>
                
                <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-16 font-light">
                  A showcase of my work, featuring a selection of projects that highlight my skills and creativity.
                </p>
              </motion.div>
            </div>
          </section>


          {/* Projects Grid */}
          <section className="py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="card card-interactive">
                        {/* Project Image */}
                        <div className="relative h-64 bg-secondary overflow-hidden rounded-xl mb-6">
                          {project.image ? (
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-16 h-16 bg-tertiary rounded-2xl flex items-center justify-center">
                                <span className="text-2xl text-text-muted">📁</span>
                              </div>
                            </div>
                          )}
                          
                          {/* Featured Badge */}
                          {project.featured && (
                            <div className="absolute top-4 right-4">
                              <span className="px-3 py-1 bg-accent text-text-inverse text-xs font-medium rounded-full">
                                Featured
                              </span>
                            </div>
                          )}

                          {/* Quick Actions */}
                          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-2">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-2 glass rounded-lg hover:bg-accent hover:text-text-inverse transition-all duration-300"
                                onClick={(e) => e.stopPropagation()}
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
                                className="block p-2 glass rounded-lg hover:bg-accent hover:text-text-inverse transition-all duration-300"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div>
                          <h3 className="text-xl font-medium text-text-primary mb-3 leading-tight group-hover:text-accent transition-colors duration-300">
                            {project.title}
                          </h3>
                          
                          <p className="text-text-secondary text-sm mb-6 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {(Array.isArray(project.technologies) 
                              ? project.technologies 
                              : project.technologies?.split(',').map(t => t.trim()) || []
                            ).slice(0, 4).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-secondary text-text-secondary text-xs rounded-full font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Action Bar */}
                          <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid rgba(var(--border), 0.3)` }}>
                            <div className="flex gap-4">
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-accent hover:text-accent-hover text-sm font-medium flex items-center gap-1 transition-colors duration-300"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  Live Demo
                                </a>
                              )}
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-text-secondary hover:text-accent text-sm font-medium flex items-center gap-1 transition-colors duration-300"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                  </svg>
                                  Code
                                </a>
                              )}
                            </div>
                            
                            <button className="text-accent hover:text-accent-hover text-sm font-medium transition-colors duration-300 flex items-center gap-1">
                              View Details
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Empty State */}
              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-24"
                >
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl text-text-muted">🔍</span>
                  </div>
                  <h3 className="text-xl font-medium text-text-primary mb-2">No Projects Found</h3>
                  <p className="text-text-secondary">Try adjusting your filter to see more projects.</p>
                </motion.div>
              )}
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-24" style={{ borderTop: `1px solid rgba(var(--border), 0.3)` }}>
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h2 className="text-3xl lg:text-4xl font-light text-text-primary mb-6">
                  Have a Project in <span className="font-normal text-accent">Mind?</span>
                </h2>
                <p className="text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
                  Let's collaborate and bring your ideas to life with modern technology and thoughtful design.
                </p>
                <a
                  href="/contact"
                  className="btn-primary"
                >
                  Start a Project
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </section>
        </div>
      </InstantLoader>
      
      <ProjectsLoadingIndicator visible={loading && hasProjects} />
    </>
  );
}
