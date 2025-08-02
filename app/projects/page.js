'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner, SkeletonProjects } from '@/components/Loading';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filterProjects = (category) => {
    setFilter(category);
    if (category === 'all') {
      setFilteredProjects(projects);
    } else if (category === 'featured') {
      setFilteredProjects(projects.filter(p => p.featured));
    } else {
      setFilteredProjects(projects.filter(p => 
        Array.isArray(p.technologies) 
          ? p.technologies.some(tech => tech.toLowerCase().includes(category.toLowerCase()))
          : p.technologies?.split(',').some(tech => tech.trim().toLowerCase().includes(category.toLowerCase()))
      ));
    }
  };

  const categories = [
    { key: 'all', label: 'All Projects', icon: '🎯' },
    { key: 'featured', label: 'Featured', icon: '⭐' },
    { key: 'react', label: 'React', icon: '⚛️' },
    { key: 'node', label: 'Node.js', icon: '🟢' },
    { key: 'mongodb', label: 'MongoDB', icon: '🍃' },
    { key: 'next', label: 'Next.js', icon: '⚡' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary text-text-primary pt-24">
        {/* Premium Loading Hero Section */}
        <section className="py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-10 w-96 h-96 bg-gradient-to-l from-accent/10 to-accent-secondary/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 left-16 w-80 h-80 bg-gradient-to-r from-accent-hover/8 to-accent/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-4 bg-gradient-to-r from-accent/20 to-accent/40 rounded-full w-32 mx-auto mb-3 animate-pulse"></div>
              
              <div className="h-12 bg-gradient-to-r from-text-primary/20 to-text-primary/10 rounded-lg w-96 mx-auto mb-6 animate-pulse"></div>
              
              <div className="space-y-2 mb-8">
                <div className="h-4 bg-text-secondary/20 rounded-full w-80 mx-auto animate-pulse"></div>
                <div className="h-4 bg-text-secondary/20 rounded-full w-64 mx-auto animate-pulse"></div>
              </div>

              <div className="inline-flex items-center gap-6 bg-gradient-to-r from-secondary via-tertiary to-secondary border border-border rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="h-6 w-8 bg-accent/30 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-16 bg-text-muted/30 rounded animate-pulse"></div>
                </div>
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-accent to-transparent"></div>
                <div className="text-center">
                  <div className="h-6 w-8 bg-accent/30 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-16 bg-text-muted/30 rounded animate-pulse"></div>
                </div>
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-accent to-transparent"></div>
                <div className="text-center">
                  <div className="h-6 w-8 bg-accent/30 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-20 bg-text-muted/30 rounded animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Premium Filter Loading */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {[1, 2].map((_, index) => (
                <div key={index} className="h-12 w-32 bg-gradient-to-r from-secondary via-tertiary to-secondary rounded-2xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Project Cards Loading */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-subtle rounded-2xl overflow-hidden shadow-lg relative"
                >
                  {/* Image Skeleton */}
                  <div className="h-48 bg-gradient-to-br from-tertiary/50 to-secondary/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-shimmer"></div>
                  </div>
                  
                  {/* Content Skeleton */}
                  <div className="p-6">
                    <div className="h-6 bg-text-primary/20 rounded-lg w-3/4 mb-3 animate-pulse"></div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-text-secondary/20 rounded-full w-full animate-pulse"></div>
                      <div className="h-3 bg-text-secondary/20 rounded-full w-5/6 animate-pulse"></div>
                      <div className="h-3 bg-text-secondary/20 rounded-full w-4/6 animate-pulse"></div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {[1, 2, 3].map((_, techIndex) => (
                        <div key={techIndex} className="h-6 w-16 bg-accent/20 rounded-full animate-pulse"></div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex gap-4">
                        <div className="h-4 w-16 bg-accent/30 rounded animate-pulse"></div>
                        <div className="h-4 w-12 bg-text-muted/30 rounded animate-pulse"></div>
                      </div>
                      <div className="h-4 w-20 bg-accent/30 rounded animate-pulse"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Loading Indicator */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-3 glass rounded-full px-6 py-3">
                <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                <span className="text-accent font-medium">Loading amazing projects...</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-text-primary pt-24">
      {/* Premium Hero Section */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-gradient-to-l from-accent/10 to-accent-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-16 w-80 h-80 bg-gradient-to-r from-accent-hover/8 to-accent/8 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              className="text-micro text-accent/80 tracking-[0.15em] mb-3 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              PORTFOLIO SHOWCASE
            </motion.p>
            
            <h1 className="text-4xl lg:text-5xl font-light text-text-primary mb-6">
              Featured <span className="gradient-gold font-medium">Projects</span>
            </h1>
            
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
              A collection of innovative solutions showcasing modern web development, 
              user experience design, and cutting-edge technologies.
            </p>

            {/* Premium Stats */}
            <div className="inline-flex items-center gap-6 bg-gradient-to-r from-secondary via-tertiary to-secondary border border-border rounded-xl p-4 shadow-lg">
              <div className="text-center">
                <div className="text-xl font-bold gradient-gold">{projects.length}</div>
                <div className="text-xs text-text-muted tracking-wide">PROJECTS</div>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-accent to-transparent"></div>
              <div className="text-center">
                <div className="text-xl font-bold gradient-gold">{projects.filter(p => p.featured).length}</div>
                <div className="text-xs text-text-muted tracking-wide">FEATURED</div>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-accent to-transparent"></div>
              <div className="text-center">
                <div className="text-xl font-bold gradient-gold">∞</div>
                <div className="text-xs text-text-muted tracking-wide">INNOVATION</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Filter Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { key: 'all', label: 'All Projects', icon: '🎯' },
              { key: 'featured', label: 'Featured', icon: '⭐' }
            ].map((category) => (
              <motion.button
                key={category.key}
                onClick={() => filterProjects(category.key)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-500 flex items-center gap-3 shadow-lg ${
                  filter === category.key
                    ? 'bg-gradient-to-r from-accent via-accent-hover to-accent text-primary shadow-accent/25'
                    : 'bg-gradient-to-r from-secondary via-tertiary to-secondary text-text-secondary hover:text-text-primary hover:shadow-accent/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-semibold">{category.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                  filter === category.key
                    ? 'bg-primary/20 text-primary'
                    : 'bg-accent/15 text-accent'
                }`}>
                  {category.key === 'all' ? projects.length : projects.filter(p => p.featured).length}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  layout
                  className="group"
                >
                  <motion.div
                    className="bg-gradient-to-br from-secondary/50 via-tertiary/30 to-secondary/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-accent/10 transition-all duration-500 relative group"
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Premium Project Image */}
                    <div className="relative h-48 bg-gradient-to-br from-tertiary to-secondary overflow-hidden">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-6xl text-accent/30">🚀</div>
                        </div>
                      )}
                      
                      {/* Overlay Effects */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 bg-gradient-to-r from-accent to-accent-hover text-primary text-xs font-bold rounded-full flex items-center gap-1">
                            ⭐ Featured
                          </span>
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-2 bg-primary/80 backdrop-blur-sm rounded-lg hover:bg-accent transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-4 h-4 text-accent hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </motion.a>
                        )}
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-2 bg-primary/80 backdrop-blur-sm rounded-lg hover:bg-accent transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-4 h-4 text-accent hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Premium Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-text-secondary text-sm mb-4 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Premium Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(Array.isArray(project.technologies) 
                          ? project.technologies 
                          : project.technologies?.split(',').map(t => t.trim()) || []
                        ).slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium hover:bg-accent/20 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {(Array.isArray(project.technologies) 
                          ? project.technologies 
                          : project.technologies?.split(',').map(t => t.trim()) || []
                        ).length > 4 && (
                          <span className="px-3 py-1 bg-gradient-to-r from-accent/15 to-accent-hover/15 text-accent text-xs rounded-full font-semibold">
                            +{(Array.isArray(project.technologies) 
                              ? project.technologies 
                              : project.technologies?.split(',').map(t => t.trim()) || []
                            ).length - 4}
                          </span>
                        )}
                      </div>

                      {/* Premium Action Bar */}
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex gap-4">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:text-accent-hover text-sm font-semibold flex items-center gap-1 transition-colors duration-200"
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
                              className="text-text-muted hover:text-accent text-sm font-semibold flex items-center gap-1 transition-colors duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              Code
                            </a>
                          )}
                        </div>
                        
                        <motion.button
                          className="text-accent hover:text-accent-hover text-sm font-semibold transition-colors duration-200"
                          whileHover={{ x: 2 }}
                        >
                          Details →
                        </motion.button>
                      </div>
                    </div>

                    {/* Premium Hover Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">No Projects Found</h3>
              <p className="text-text-secondary">Try adjusting your filter to see more projects.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-light text-text-primary mb-4">
              Have a Project in <span className="gradient-gold">Mind?</span>
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Let's collaborate and bring your ideas to life with cutting-edge technology and premium design.
            </p>
            <motion.a
              href="/contact"
              className="btn-primary px-8 py-4 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
