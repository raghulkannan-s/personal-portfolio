'use client';

import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {

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
    <div className="min-h-screen pt-20 bg-primary">
        <main className="min-h-[calc(100vh-5rem)]">
          {children}
        </main>
    </div>
  );
}