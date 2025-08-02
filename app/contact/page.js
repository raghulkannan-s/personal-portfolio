'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const contactMethods = [
    {
      icon: '✉️',
      title: 'Email',
      value: 'raghulkannan005@gmail.com',
      href: 'mailto:raghulkannan005@gmail.com',
      description: 'Primary communication channel',
      color: 'from-blue-500/20 to-blue-600/20',
      hoverColor: 'group-hover:from-blue-500/30 group-hover:to-blue-600/30'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+91 96776 05417',
      href: 'tel:+919677605417',
      description: 'Available 9 AM - 8 PM IST',
      color: 'from-green-500/20 to-green-600/20',
      hoverColor: 'group-hover:from-green-500/30 group-hover:to-green-600/30'
    },
    {
      icon: '🌐',
      title: 'LinkedIn',
      value: 'raghul-kannan',
      href: 'https://linkedin.com/in/raghul-kannan',
      description: 'Professional networking',
      color: 'from-blue-400/20 to-blue-500/20',
      hoverColor: 'group-hover:from-blue-400/30 group-hover:to-blue-500/30'
    },
    {
      icon: '𝕏',
      title: 'X (Twitter)',
      value: '@raghulkannan_',
      href: 'https://x.com/raghulkannan_',
      description: 'Tech updates & thoughts',
      color: 'from-gray-500/20 to-gray-600/20',
      hoverColor: 'group-hover:from-gray-500/30 group-hover:to-gray-600/30'
    },
    {
      icon: '💻',
      title: 'GitHub',
      value: 'raghulkannan-s',
      href: 'https://github.com/raghulkannan-s',
      description: 'Code repositories & projects',
      color: 'from-purple-500/20 to-purple-600/20',
      hoverColor: 'group-hover:from-purple-500/30 group-hover:to-purple-600/30'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Chengalpattu, Tamil Nadu',
      href: 'https://maps.google.com/?q=Chengalpattu,Tamil+Nadu,India',
      description: 'Based in South India',
      color: 'from-red-500/20 to-red-600/20',
      hoverColor: 'group-hover:from-red-500/30 group-hover:to-red-600/30'
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.error || 'Failed to send message' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-primary text-text-primary pt-20">
      {/* Ultra-Premium Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-gradient-to-r from-accent/12 to-accent-secondary/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-16 w-[500px] h-[500px] bg-gradient-to-l from-accent-hover/10 to-accent/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-accent/5 to-accent-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 bg-glass-subtle rounded-full px-6 py-3 mb-6 border border-accent/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-micro text-accent/90 tracking-[0.2em] font-light">AVAILABLE FOR NEW PROJECTS</span>
            </motion.div>
            
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-light text-text-primary mb-6 leading-tight">
              Let's Build Something 
              <br />
              <span className="gradient-text-premium font-medium">Extraordinary</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
              Ready to transform your vision into reality? I'm here to help you create 
              exceptional digital experiences that make a lasting impact.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Available Now</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>24h Response</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Global Remote</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-light text-text-primary mb-6">
                  <span className="gradient-gold">Contact</span> Information
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  I'm always excited to connect with fellow developers, potential clients, 
                  and anyone passionate about technology. Choose your preferred method below.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group glass-subtle rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/10 transition-all duration-500 block relative overflow-hidden border-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/3 to-accent-secondary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-accent/15 to-accent-secondary/15 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg backdrop-blur-sm">
                          {method.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors duration-300 mb-1">
                            {method.title}
                          </h3>
                          <p className="text-accent text-sm font-medium mb-1 truncate">
                            {method.value}
                          </p>
                          <p className="text-text-muted text-xs">
                            {method.description}
                          </p>
                        </div>
                        <motion.svg 
                          className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          whileHover={{ x: 2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </motion.svg>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-gradient-to-br from-secondary/40 via-tertiary/20 to-secondary/40 backdrop-blur-lg rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/3 to-accent-secondary/3"></div>
                <div className="relative">
                  <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-accent/20 to-accent-secondary/20 rounded-lg flex items-center justify-center">
                      <span className="text-accent text-sm">⚡</span>
                    </span>
                    Quick Response
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    I typically respond to emails within 24 hours during weekdays. 
                    For urgent matters, feel free to call or connect on LinkedIn.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form - Ultra Premium */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-3xl p-8 shadow-2xl border border-border/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/3 to-accent-secondary/3 opacity-50"></div>
              <div className="relative">
                <div className="mb-8">
                  <h2 className="text-2xl font-light text-text-primary mb-2">
                    Send a <span className="gradient-gold">Message</span>
                  </h2>
                  <p className="text-text-secondary">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>

                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-accent/10 rounded-lg flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-accent">Message Sent Successfully!</p>
                      <p className="text-text-secondary text-sm">Thank you for reaching out. I'll respond soon.</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-secondary/30 backdrop-blur-sm rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-secondary/50 transition-all duration-300 border border-border/20 ${
                        errors.name ? 'ring-2 ring-error' : 'hover:bg-secondary/40'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-error"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-secondary/30 backdrop-blur-sm rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-secondary/50 transition-all duration-300 border border-border/20 ${
                        errors.email ? 'ring-2 ring-error' : 'hover:bg-secondary/40'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-error"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-secondary/30 backdrop-blur-sm rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-secondary/50 transition-all duration-300 resize-none border border-border/20 ${
                        errors.message ? 'ring-2 ring-error' : 'hover:bg-secondary/40'
                      }`}
                      placeholder="Tell me about your project, ideas, or how I can help you..."
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-error"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                    <p className="mt-2 text-xs text-text-muted">
                      Minimum 10 characters. Be as detailed as possible.
                    </p>
                  </div>

                  {errors.submit && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-error/10 rounded-lg"
                    >
                      <p className="text-error text-sm">{errors.submit}</p>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className={`w-full btn-primary py-4 text-lg font-semibold transition-all duration-300 ${
                      loading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>Send Message</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-light text-text-primary mb-4">
              Ready to Start Your <span className="gradient-gold">Project?</span>
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              From concept to deployment, I'll help you build exceptional digital experiences 
              that drive results and exceed expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/projects"
                className="btn-secondary px-6 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download="Raghul_Kannan_Resume.pdf"
                className="btn-primary px-6 py-3 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
