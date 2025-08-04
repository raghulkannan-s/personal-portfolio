'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';

function AdminDashboardContent() {
  const [stats, setStats] = useState({
    projects: 0,
    contacts: 0,
    unreadContacts: 0,
    recentContacts: [],
    recentProjects: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const [projectsRes, contactsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/admin/contacts', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);
      
      const projects = await projectsRes.json();
      const contacts = await contactsRes.json();
      
      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        contacts: Array.isArray(contacts) ? contacts.length : 0,
        unreadContacts: Array.isArray(contacts) ? contacts.filter(c => !c.read).length : 0,
        recentContacts: Array.isArray(contacts) ? contacts.slice(0, 5) : [],
        recentProjects: Array.isArray(projects) ? projects.slice(0, 4) : []
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        projects: 0,
        contacts: 0,
        unreadContacts: 0,
        recentContacts: [],
        recentProjects: []
      });
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'New Project',
      description: 'Add a new project to showcase',
      icon: '🚀',
      href: '/admin/projects/new',
      color: 'from-blue-500/10 to-blue-600/5',
      iconBg: 'bg-blue-500/20',
      textColor: 'text-blue-400'
    },
    {
      title: 'Manage Projects',
      description: 'Edit and organize projects',
      icon: '📁',
      href: '/admin/projects',
      color: 'from-purple-500/10 to-purple-600/5',
      iconBg: 'bg-purple-500/20',
      textColor: 'text-purple-400'
    },
    {
      title: 'View Messages',
      description: 'Check contact submissions',
      icon: '💬',
      href: '/admin/contacts',
      color: 'from-green-500/10 to-green-600/5',
      iconBg: 'bg-green-500/20',
      textColor: 'text-green-400',
      badge: stats.unreadContacts > 0 ? stats.unreadContacts : null
    },
    {
      title: 'Analytics',
      description: 'View portfolio insights',
      icon: '📊',
      href: '/admin/analytics',
      color: 'from-orange-500/10 to-orange-600/5',
      iconBg: 'bg-orange-500/20',
      textColor: 'text-orange-400'
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="glass rounded-2xl p-8 flex items-center gap-4">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            <span className="text-text-primary font-medium">Loading dashboard...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent-hover/5 rounded-2xl"></div>
          <div className="relative glass rounded-2xl p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-light text-text-primary mb-2">
                  Welcome back, <span className="text-accent font-medium">Raghul</span>
                </h1>
                <p className="text-text-secondary text-sm lg:text-base">
                  Here's what's happening with your portfolio today.
                </p>
              </div>
              <div className="flex md:hidden lg:flex items-center gap-3">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-accent/20 to-accent-hover/20 rounded-2xl flex items-center justify-center">
                  <span className="text-xl lg:text-2xl">👋</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
        >
          {[
            {
              label: 'Total Projects',
              value: stats.projects,
              icon: '🚀',
              color: 'text-blue-400',
              bg: 'from-blue-500/10 to-blue-600/5'
            },
            {
              label: 'Total Messages',
              value: stats.contacts,
              icon: '💬',
              color: 'text-green-400',
              bg: 'from-green-500/10 to-green-600/5'
            },
            {
              label: 'Unread Messages',
              value: stats.unreadContacts,
              icon: '🔔',
              color: 'text-orange-400',
              bg: 'from-orange-500/10 to-orange-600/5'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`glass rounded-2xl p-5 lg:p-6 bg-gradient-to-br ${stat.bg} border border-border/20 hover:border-accent/20 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-hover/20 flex items-center justify-center ${stat.color}`}>
                  <span className="text-lg lg:text-xl">{stat.icon}</span>
                </div>
                <div className={`text-xl lg:text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
              <h3 className="text-text-primary font-medium text-sm lg:text-base">{stat.label}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4 lg:space-y-6"
        >
          <h2 className="text-xl lg:text-2xl font-light text-text-primary">
            Quick <span className="text-accent">Actions</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <Link
                  href={action.href}
                  className={`block glass rounded-2xl p-5 lg:p-6 bg-gradient-to-br ${action.color} border border-border/20 hover:border-accent/30 transition-all duration-300 group`}
                >
                  <div className="flex items-start justify-between mb-3 lg:mb-4">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 ${action.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-lg lg:text-xl">{action.icon}</span>
                    </div>
                    {action.badge && (
                      <span className="px-2 py-1 bg-accent text-primary text-xs font-bold rounded-full">
                        {action.badge}
                      </span>
                    )}
                  </div>
                  
                  <h3 className={`font-semibold ${action.textColor} group-hover:text-accent transition-colors duration-300 mb-2 text-sm lg:text-base`}>
                    {action.title}
                  </h3>
                  
                  <p className="text-text-secondary text-xs lg:text-sm leading-relaxed">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center mt-3 lg:mt-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs lg:text-sm font-medium">Get started</span>
                    <svg className="w-3 h-3 lg:w-4 lg:h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-2xl p-5 lg:p-6 border border-border/20"
          >
            <div className="flex items-center justify-between mb-5 lg:mb-6">
              <h3 className="text-lg lg:text-xl font-light text-text-primary">
                Recent <span className="text-accent">Messages</span>
              </h3>
              <Link
                href="/admin/contacts"
                className="text-accent hover:text-accent-hover text-sm font-medium transition-colors flex items-center gap-1"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="space-y-3 lg:space-y-4">
              {stats.recentContacts.length > 0 ? (
                stats.recentContacts.map((contact, index) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className={`p-3 lg:p-4 rounded-xl border transition-all duration-200 hover:bg-tertiary/30 ${
                      !contact.read
                        ? 'bg-accent/5 border-accent/20'
                        : 'bg-tertiary/20 border-border/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-accent/20 to-accent-hover/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-accent text-sm">💬</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-text-primary truncate text-sm lg:text-base">{contact.name}</span>
                          {!contact.read && (
                            <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></span>
                          )}
                        </div>
                        <p className="text-text-secondary text-xs lg:text-sm truncate mb-1">{contact.subject}</p>
                        <p className="text-xs text-text-muted">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6 lg:py-8 text-text-muted">
                  <div className="text-3xl lg:text-4xl mb-2">📭</div>
                  <p className="text-sm lg:text-base">No messages yet</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass rounded-2xl p-5 lg:p-6 border border-border/20"
          >
            <div className="flex items-center justify-between mb-5 lg:mb-6">
              <h3 className="text-lg lg:text-xl font-light text-text-primary">
                Recent <span className="text-accent">Projects</span>
              </h3>
              <Link
                href="/admin/projects"
                className="text-accent hover:text-accent-hover text-sm font-medium transition-colors flex items-center gap-1"
              >
                Manage
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="space-y-3 lg:space-y-4">
              {stats.recentProjects.length > 0 ? (
                stats.recentProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="p-3 lg:p-4 bg-tertiary/20 rounded-xl border border-border/20 hover:bg-tertiary/30 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-accent/20 to-accent-hover/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-accent text-sm">🚀</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-text-primary truncate text-sm lg:text-base">{project.title}</span>
                          {project.featured && (
                            <span className="px-1.5 py-0.5 bg-accent/20 text-accent text-xs rounded-full">★</span>
                          )}
                        </div>
                        <p className="text-text-secondary text-xs lg:text-sm truncate mb-1">{project.description}</p>
                        <div className="flex gap-1 flex-wrap">
                          {(Array.isArray(project.technologies)
                            ? project.technologies
                            : project.technologies?.split(',').map(t => t.trim()) || []
                          ).slice(0, 2).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6 lg:py-8 text-text-muted">
                  <div className="text-3xl lg:text-4xl mb-2">📁</div>
                  <p className="text-sm lg:text-base">No projects yet</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
