'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const techCategories = {
  'All': ['all'],
  'Frontend': ['Next.js', 'React.js', 'TypeScript', 'JavaScript', 'Tailwind', 'Framer Motion'],
  'Backend': ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Mongoose', 'REST API'],
  'Full Stack': ['MERN', 'Next.js', 'TypeScript'],
  'Real-time': ['WebSocket', 'Socket.io', 'Real-time'],
  'Authentication': ['JWT', 'OAuth', 'Google Auth'],
  'Database': ['MongoDB', 'Mongoose', 'Database'],
  'Deployment': ['Vercel', 'Netlify', 'Production']
};

export default function ProjectFilter({ projects, onFilteredProjects, className = "" }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filterProjects = (category, search = searchTerm) => {
    let filtered = projects;

    // Filter by category
    if (category !== 'All') {
      const categoryTechs = techCategories[category] || [];
      filtered = projects.filter(project => {
        const projectTechs = Array.isArray(project.technologies) 
          ? project.technologies 
          : project.technologies?.split(',').map(t => t.trim()) || [];
        
        return categoryTechs.some(tech => 
          tech === 'all' || 
          projectTechs.some(projectTech => 
            projectTech.toLowerCase().includes(tech.toLowerCase()) ||
            project.title.toLowerCase().includes(tech.toLowerCase()) ||
            project.description.toLowerCase().includes(tech.toLowerCase())
          )
        );
      });
    }

    // Filter by search term
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        (Array.isArray(project.technologies) 
          ? project.technologies 
          : project.technologies?.split(',').map(t => t.trim()) || []
        ).some(tech => tech.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  };

  const handleCategoryChange = (category) => {
    setActiveFilter(category);
    const filtered = filterProjects(category, searchTerm);
    onFilteredProjects(filtered);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    const filtered = filterProjects(activeFilter, search);
    onFilteredProjects(filtered);
  };

  const clearFilters = () => {
    setActiveFilter('All');
    setSearchTerm('');
    onFilteredProjects(projects);
  };

  const getProjectCount = (category) => {
    return filterProjects(category).length;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${className}`}
    >
      <div className="bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-lg">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search projects by name, description, or technology..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/90 backdrop-blur-sm transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange({ target: { value: '' } })}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-3">
            {Object.keys(techCategories).map((category) => {
              const count = getProjectCount(category);
              return (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={count === 0 && category !== 'All'}
                >
                  <span className="flex items-center gap-2">
                    {category}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeFilter === category
                        ? 'bg-white/20 text-white'
                        : 'bg-white text-gray-600'
                    }`}>
                      {count}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active Filters & Results */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {(activeFilter !== 'All' || searchTerm) && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {activeFilter !== 'All' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                  >
                    {activeFilter}
                    <button
                      onClick={() => handleCategoryChange('All')}
                      className="ml-1 hover:bg-amber-200 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </motion.span>
                )}
                {searchTerm && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </motion.span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-medium">{filterProjects(activeFilter, searchTerm).length}</span> of{' '}
            <span className="font-medium">{projects.length}</span> projects
          </div>
        </div>
      </div>
    </motion.div>
  );
}
