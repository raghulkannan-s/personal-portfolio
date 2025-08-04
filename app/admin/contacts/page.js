'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';

function AdminContactsContent() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        setError('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id, read) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ read })
      });

      if (response.ok) {
        setContacts(contacts.map(contact => 
          contact._id === id ? { ...contact, read } : contact
        ));
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="glass rounded-2xl p-8 flex items-center gap-4">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            <span className="text-text-primary font-medium">Loading messages...</span>
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
              Contact <span className="text-accent">Messages</span>
            </h1>
            <p className="text-text-secondary">
              Manage and respond to messages from your portfolio visitors
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass rounded-xl px-4 py-2 text-sm">
              <span className="text-text-secondary">Total: </span>
              <span className="text-accent font-semibold">{contacts.length}</span>
            </div>
            <div className="glass rounded-xl px-4 py-2 text-sm">
              <span className="text-text-secondary">Unread: </span>
              <span className="text-orange-400 font-semibold">
                {contacts.filter(c => !c.read).length}
              </span>
            </div>
          </div>
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

        {/* Messages Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Messages', value: contacts.length, icon: '💬', color: 'text-blue-400' },
            { label: 'Unread', value: contacts.filter(c => !c.read).length, icon: '🔔', color: 'text-orange-400' },
            { label: 'Read', value: contacts.filter(c => c.read).length, icon: '✅', color: 'text-green-400' },
            { label: 'Today', value: contacts.filter(c => new Date(c.createdAt).toDateString() === new Date().toDateString()).length, icon: '📅', color: 'text-purple-400' }
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

        {/* Contacts List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                className={`glass rounded-2xl p-6 border transition-all duration-300 hover:border-accent/30 ${
                  !contact.read ? 'border-l-4 border-l-accent bg-accent/5' : 'border-border/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent-hover/20 rounded-lg flex items-center justify-center">
                        <span className="text-accent text-sm">💬</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">
                          {contact.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          {!contact.read && (
                            <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full font-semibold">
                              New
                            </span>
                          )}
                          <span className="text-xs text-text-muted">
                            {new Date(contact.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:text-accent transition-colors flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => markAsRead(contact._id, !contact.read)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      contact.read
                        ? 'bg-secondary text-text-muted hover:bg-accent/10 hover:text-accent'
                        : 'bg-accent/10 text-accent hover:bg-accent/20'
                    }`}
                  >
                    {contact.read ? 'Mark Unread' : 'Mark Read'}
                  </button>
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-text-primary">Subject:</span>
                    <span className="text-sm text-accent">{contact.subject}</span>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                  <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={`mailto:${contact.email}?subject=Re: ${contact.subject}&body=Hi ${contact.name},%0A%0AThank you for reaching out!%0A%0A`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Reply via Email
                  </a>
                  <button
                    onClick={() => navigator.clipboard.writeText(contact.email)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary/50 text-text-secondary rounded-lg hover:bg-tertiary hover:text-text-primary transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Email
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="glass rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No Messages Yet</h3>
                <p className="text-text-secondary">
                  Messages from your contact form will appear here.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}

export default function AdminContacts() {
  return (
    <ProtectedRoute>
      <AdminContactsContent />
    </ProtectedRoute>
  );
}