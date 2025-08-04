'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastFetch, setLastFetch] = useState(null);

  const fetchProjects = async (force = false) => {
    // Don't fetch again if we have data and it's less than 5 minutes old (unless forced)
    const fiveMinutes = 5 * 60 * 1000;
    if (!force && projects.length > 0 && lastFetch && (Date.now() - lastFetch < fiveMinutes)) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(Array.isArray(data) ? data : []);
        setLastFetch(Date.now());
      } else {
        setError('Failed to load projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  // Load projects on context initialization
  useEffect(() => {
    fetchProjects();
  }, []);

  const value = {
    projects,
    loading,
    error,
    fetchProjects,
    // Computed values for easy access
    featuredProjects: projects.filter(p => p.featured),
    projectsCount: projects.length,
    featuredCount: projects.filter(p => p.featured).length,
    // Helper functions
    getProjectsByTechnology: (tech) => projects.filter(p => 
      Array.isArray(p.technologies) 
        ? p.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
        : p.technologies?.split(',').some(t => t.trim().toLowerCase().includes(tech.toLowerCase()))
    ),
    getProjectById: (id) => projects.find(p => p._id === id),
    refreshProjects: () => fetchProjects(true)
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}