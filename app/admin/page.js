'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

// Premium Logout Button Component
function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('adminToken');
    
    // Add a small delay for better UX
    setTimeout(() => {
      router.push('/admin/login');
    }, 500);
  };

  return (
    <motion.button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="glass rounded-xl px-6 py-3 text-sm font-medium text-text-primary hover:text-accent transition-all duration-300 border border-border/20 hover:border-accent/30 group disabled:opacity-50"
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        {isLoggingOut ? (
          <>
            <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            <span>Logging out...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </>
        )}
      </div>
    </motion.button>
  );
}

function AdminDashboardContent() {
  const [stats, setStats] = useState({
    projects: 0,
    contacts: 0,
    recentContacts: [],
    recentProjects: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        
        const [projectsRes, contactsRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/admin/contacts', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        ]);
        
        const projects = await projectsRes.json();
        const contacts = await contactsRes.json();
        
        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          contacts: Array.isArray(contacts) ? contacts.length : 0,
          recentContacts: Array.isArray(contacts) ? contacts.slice(0, 5) : [],
          recentProjects: Array.isArray(projects) ? projects.slice(0, 3) : []
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default values on error
        setStats({
          projects: 0,
          contacts: 0,
          recentContacts: [],
          recentProjects: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'New Project',
      description: 'Add a new project to showcase',
      icon: '🚀',
      href: '/admin/projects/new',
      color: 'from-blue-500/20 to-blue-600/20',
      hoverColor: 'hover:from-blue-500/30 hover:to-blue-600/30'
    },
    {
      title: 'Manage Projects',
      description: 'Edit existing projects',
      icon: '📁',
      href: '/admin/projects',
      color: 'from-purple-500/20 to-purple-600/20',
      hoverColor: 'hover:from-purple-500/30 hover:to-purple-600/30'
    },
    {
      title: 'View Messages',
      description: 'Check contact form submissions',
      icon: '💬',
      href: '/admin/contacts',
      color: 'from-green-500/20 to-green-600/20',
      hoverColor: 'hover:from-green-500/30 hover:to-green-600/30'
    },
    {
      title: 'Analytics',
      description: 'View portfolio performance',
      icon: '📊',
      href: '/admin/analytics',
      color: 'from-orange-500/20 to-orange-600/20',
      hoverColor: 'hover:from-orange-500/30 hover:to-orange-600/30'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="glass rounded-2xl p-8 flex items-center gap-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          <span className="text-text-primary font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-text-primary pt-24">
      {/* Ultra-Premium Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-accent/8 to-accent-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-accent-hover/6 to-accent/6 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Admin Header with Logout */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-end mb-6"
            >
              <LogoutButton />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-3 glass-subtle rounded-full px-6 py-3 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-micro text-accent/90 tracking-[0.2em] font-light">ADMIN DASHBOARD</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-light text-text-primary mb-4">
                Portfolio <span className="gradient-gold font-medium">Control Center</span>
              </h1>
              
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Manage your projects, monitor contacts, and maintain your professional presence.
              </p>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 mb-12"
            >
              {[
                { label: 'Total Projects', value: stats.projects, icon: '🚀', color: 'text-blue-400' },
                { label: 'Messages', value: stats.contacts, icon: '💬', color: 'text-green-400' },
                { label: 'Active', value: '24/7', icon: '⚡', color: 'text-yellow-400' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="glass rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
                >
                  <div className={`text-3xl mb-2 ${stat.color}`}>{stat.icon}</div>
                  <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-light text-text-primary mb-6 text-center">
                Quick <span className="text-accent">Actions</span>
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={action.href}
                      className={`block glass rounded-2xl p-6 transition-all duration-300 ${action.hoverColor} group`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent-secondary/20 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                          {action.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors duration-300 mb-1">
                            {action.title}
                          </h3>
                          <p className="text-text-muted text-sm">
                            {action.description}
                          </p>
                        </div>
                        <svg className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Contacts */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-light text-text-primary">
                    Recent <span className="text-accent">Messages</span>
                  </h3>
                  <Link href="/admin/contacts" className="text-accent hover:text-accent-hover text-sm font-medium transition-colors">
                    View All →
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {stats.recentContacts.length > 0 ? (
                    stats.recentContacts.map((contact, index) => (
                      <motion.div
                        key={contact._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-accent-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-accent text-sm">💬</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-text-primary text-sm truncate">{contact.name}</span>
                            <span className="text-xs text-text-muted">•</span>
                            <span className="text-xs text-text-muted">{new Date(contact.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-text-secondary text-xs truncate">{contact.message}</p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-text-muted">
                      <div className="text-4xl mb-2">📭</div>
                      <p>No messages yet</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Recent Projects */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-light text-text-primary">
                    Recent <span className="text-accent">Projects</span>
                  </h3>
                  <Link href="/admin/projects" className="text-accent hover:text-accent-hover text-sm font-medium transition-colors">
                    Manage →
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {stats.recentProjects.length > 0 ? (
                    stats.recentProjects.map((project, index) => (
                      <motion.div
                        key={project._id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-accent-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-accent text-sm">🚀</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-text-primary text-sm truncate">{project.title}</span>
                            {project.featured && (
                              <span className="px-1.5 py-0.5 bg-accent/20 text-accent text-xs rounded-full">★</span>
                            )}
                          </div>
                          <p className="text-text-secondary text-xs truncate">{project.description}</p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-text-muted">
                      <div className="text-4xl mb-2">📁</div>
                      <p>No projects yet</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
