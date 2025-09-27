'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';

function AdminProjectsContent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        setError('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    setDeleteLoading(id);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setProjects(projects.filter(p => p._id !== id));
      } else {
        setError('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('Failed to delete project');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="glass rounded-2xl p-8 flex items-center gap-4">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            <span className="text-text-primary font-medium">Loading projects...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-light text-text-primary mb-2">
              Manage <span className="text-accent">Projects</span>
            </h1>
            <p className="text-text-secondary">
              Create, edit, and organize your portfolio projects
            </p>
          </div>
          
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </Link>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-error/10 border border-error/20 rounded-xl text-error"
          >
            {error}
          </motion.div>
        )}

        {/* Projects Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Projects', value: projects.length, icon: '📁', color: 'text-blue-400' },
            { label: 'Featured', value: projects.filter(p => p.featured).length, icon: '⭐', color: 'text-yellow-400' },
            { label: 'Published', value: projects.filter(p => !p.draft).length, icon: '🌐', color: 'text-green-400' },
            { label: 'Drafts', value: projects.filter(p => p.draft).length, icon: '📝', color: 'text-gray-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="glass rounded-xl p-4 text-center"
            >
              <div className={`text-2xl mb-2 ${stat.color}`}>{stat.icon}</div>
              <div className="text-xl font-bold text-text-primary">{stat.value}</div>
              <div className="text-xs text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass rounded-2xl overflow-hidden border border-border/20 hover:border-accent/30 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-accent/10 to-accent-hover/10 relative overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-accent/50">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">No Image</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Status Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {project.featured && (
                      <span className="px-2 py-1 bg-yellow-500 text-primary text-xs font-bold rounded-full flex items-center gap-1">
                        ⭐ Featured
                      </span>
                    )}
                    {project.draft && (
                      <span className="px-2 py-1 bg-gray-500 text-white text-xs font-bold rounded-full">
                        📝 Draft
                      </span>
                    )}
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Link
                      href={`/admin/projects/${project._id}/edit`}
                      className="p-2 bg-accent/90 hover:bg-accent text-primary rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-green-500/90 hover:bg-green-500 text-white rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-text-primary line-clamp-1">
                      {project.title}
                    </h3>
                    <div className="flex gap-1">
                      {project.liveUrl && (
                        <span className="w-2 h-2 bg-green-500 rounded-full" title="Live"></span>
                      )}
                      {project.githubUrl && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full" title="GitHub"></span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(Array.isArray(project.technologies) 
                      ? project.technologies 
                      : project.technologies?.split(',').map(t => t.trim()) || []
                    ).slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {(Array.isArray(project.technologies) 
                      ? project.technologies 
                      : project.technologies?.split(',').map(t => t.trim()) || []
                    ).length > 3 && (
                      <span className="px-2 py-1 bg-tertiary/50 text-text-muted text-xs rounded-full">
                        +{(Array.isArray(project.technologies) 
                          ? project.technologies 
                          : project.technologies?.split(',').map(t => t.trim()) || []
                        ).length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/projects/${project._id}/edit`}
                      className="flex-1 text-center py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProject(project._id)}
                      disabled={deleteLoading === project._id}
                      className="flex-1 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-1"
                    >
                      {deleteLoading === project._id ? (
                        <>
                          <div className="w-3 h-3 border border-error border-t-transparent rounded-full animate-spin"></div>
                          Deleting...
                        </>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="glass rounded-2xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">No Projects Yet</h3>
              <p className="text-text-secondary mb-6">Create your first project to get started showcasing your work.</p>
              <Link 
                href="/admin/projects/new" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-primary font-medium rounded-xl transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Project
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
}

export default function AdminProjects() {
  return (
    <ProtectedRoute>
      <AdminProjectsContent />
    </ProtectedRoute>
  );
}