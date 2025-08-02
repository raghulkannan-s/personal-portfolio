'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProtectedRoute from '@/components/ProtectedRoute';

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
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="glass rounded-2xl p-8 flex items-center gap-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          <span className="text-text-primary font-medium">Loading messages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-text-primary pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-text-primary mb-2">
            Contact <span className="text-accent">Messages</span>
          </h1>
          <p className="text-text-secondary">
            Manage and respond to messages from your portfolio visitors
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error">
            {error}
          </div>
        )}

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass rounded-2xl p-6 ${
                !contact.read ? 'border-l-4 border-accent' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {contact.name}
                    </h3>
                    {!contact.read && (
                      <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                    <a
                      href={`mailto:${contact.email}`}
                      className="hover:text-accent transition-colors"
                    >
                      {contact.email}
                    </a>
                    <span>•</span>
                    <span>
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

              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
                  {contact.message}
                </p>
              </div>

              <div className="flex gap-3 mt-4">
                <a
                  href={`mailto:${contact.email}?subject=Re: Portfolio Contact&body=Hi ${contact.name},%0A%0AThank you for reaching out!%0A%0A`}
                  className="btn-primary px-4 py-2 text-sm"
                >
                  Reply via Email
                </a>
                <a
                  href={`tel:${contact.phone || ''}`}
                  className="btn-secondary px-4 py-2 text-sm"
                  style={{ display: contact.phone ? 'inline-block' : 'none' }}
                >
                  Call
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">No Messages Yet</h3>
            <p className="text-text-secondary">
              Messages from your contact form will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminContacts() {
  return (
    <ProtectedRoute>
      <AdminContactsContent />
    </ProtectedRoute>
  );
}