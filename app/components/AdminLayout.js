'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [stats, setStats] = useState({ projects: 0, contacts: 0, unreadContacts: 0 });

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
        unreadContacts: Array.isArray(contacts) ? contacts.filter(c => !c.read).length : 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('adminToken');
    setTimeout(() => {
      router.push('/admin/login');
    }, 800);
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: '🏠',
      badge: null
    },
    {
      name: 'Projects',
      href: '/admin/projects',
      icon: '🚀',
      badge: stats.projects > 0 ? stats.projects.toString() : null
    },
    {
      name: 'Messages',
      href: '/admin/contacts',
      icon: '💬',
      badge: stats.unreadContacts > 0 ? stats.unreadContacts.toString() : null
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: '📊',
      badge: null
    }
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-50 h-full w-72 bg-secondary/95 backdrop-blur-xl border-r border-border/20 lg:translate-x-0 lg:static lg:block"
      >
        <div className="flex flex-col h-full">
          {/* Logo & Header */}
          <div className="p-6 border-b border-border/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-hover rounded-xl flex items-center justify-center">
                <span className="text-primary font-bold text-lg">RK</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text-primary">Admin Panel</h1>
                <p className="text-sm text-text-secondary">Portfolio Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-accent text-primary shadow-lg shadow-accent/25'
                      : 'text-text-secondary hover:text-text-primary hover:bg-tertiary/50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className={`ml-auto px-2 py-1 text-xs rounded-full font-semibold ${
                      isActive
                        ? 'bg-primary/20 text-primary'
                        : 'bg-accent/20 text-accent'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Section & Logout */}
          <div className="p-4 border-t border-border/10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-tertiary/30 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-accent-hover/20 rounded-lg flex items-center justify-center">
                <span className="text-accent text-sm">👤</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">Raghul Kannan</p>
                <p className="text-xs text-text-secondary">Administrator</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            
            <motion.button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-error hover:bg-error/10 rounded-xl transition-all duration-200 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoggingOut ? (
                <>
                  <div className="w-5 h-5 border-2 border-error border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium">Logging out...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Logout</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-primary/95 backdrop-blur-xl border-b border-border/10">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-tertiary/50 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-accent bg-tertiary/30 hover:bg-accent/10 rounded-lg transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-sm font-medium">View Site</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-5rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}