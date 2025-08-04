'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';

export default function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "raghulkannan005@example.com",
      description: "Send me an email anytime",
      href: "mailto:raghulkannan005@example.com"
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+91 9677605417",
      description: "Call me for urgent matters",
      href: "tel:+919677605417"
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "linkedin.com/in/raghul-kannan",
      description: "Connect with me professionally",
      href: "https://linkedin.com/in/raghul-kannan"
    },
    {
      icon: "🐙",
      title: "GitHub",
      value: "github.com/raghulkannan-s",
      description: "Check out my repositories",
      href: "https://github.com/raghulkannan-s"
    }
  ];

  return (
    <div className={`min-h-screen pt-24 transition-all duration-500 ${
      theme === 'light' ? 'bg-white text-gray-900' : 'bg-black text-white'
    }`}>
      {/* Hero Section */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.p 
              className={`text-sm tracking-[0.2em] mb-6 font-medium uppercase transition-colors duration-500 ${
                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Get In Touch
            </motion.p>
            
            <h1 className={`text-5xl lg:text-6xl font-light mb-8 leading-tight transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Let's Work <span className={`font-normal ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-200'
              }`}>Together</span>
            </h1>
            
            <p className={`text-xl max-w-2xl mx-auto leading-relaxed mb-16 font-light transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group block p-6 rounded-2xl transition-all duration-300 ${
                  theme === 'light' 
                    ? 'bg-gray-50 hover:bg-gray-100 border border-gray-200/60 hover:shadow-lg hover:shadow-gray-900/10' 
                    : 'bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="text-3xl mb-4">{method.icon}</div>
                <h3 className={`font-medium mb-2 transition-colors duration-500 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {method.title}
                </h3>
                <p className={`text-sm mb-2 font-medium transition-colors duration-300 ${
                  theme === 'light' ? 'text-gray-800 group-hover:text-gray-700' : 'text-gray-200 group-hover:text-white'
                }`}>
                  {method.value}
                </p>
                <p className={`text-sm transition-colors duration-500 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {method.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`rounded-2xl p-8 transition-all duration-500 ${
              theme === 'light' 
                ? 'bg-gray-50 border border-gray-200/60' 
                : 'bg-gray-900 border border-gray-800'
            }`}
          >
            <h2 className={`text-2xl font-light mb-8 transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Send me a message
            </h2>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mb-6 p-4 rounded-lg ${
                  theme === 'light' ? 'bg-green-50 text-green-800' : 'bg-green-900/20 text-green-400'
                }`}
              >
                ✅ Thank you! Your message has been sent successfully.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`form-label transition-colors duration-500 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`form-input transition-all duration-500 ${
                      theme === 'light' 
                        ? 'bg-white border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-gray-900/10' 
                        : 'bg-gray-800 border-gray-700 text-white focus:border-white focus:ring-white/10'
                    }`}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className={`form-label transition-colors duration-500 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`form-input transition-all duration-500 ${
                      theme === 'light' 
                        ? 'bg-white border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-gray-900/10' 
                        : 'bg-gray-800 border-gray-700 text-white focus:border-white focus:ring-white/10'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={`form-label transition-colors duration-500 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`form-input transition-all duration-500 ${
                    theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-gray-900/10' 
                      : 'bg-gray-800 border-gray-700 text-white focus:border-white focus:ring-white/10'
                  }`}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className={`form-label transition-colors duration-500 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`form-input transition-all duration-500 ${
                    theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-gray-900/10' 
                      : 'bg-gray-800 border-gray-700 text-white focus:border-white focus:ring-white/10'
                  }`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`btn-primary w-full transition-all duration-500 ${
                  theme === 'light'
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl lg:text-4xl font-light mb-6 transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Ready to Start Your <span className={`font-normal ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-200'
              }`}>Project?</span>
            </h2>
            <p className={`text-xl mb-8 leading-relaxed font-light transition-colors duration-500 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              I'm always excited to work on new projects and help bring innovative ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:raghul@example.com"
                className={`btn-primary transition-all duration-500 ${
                  theme === 'light'
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                Email Me Directly
              </a>
              <a
                href="/resume.pdf"
                download="Raghul_Kannan_Resume.pdf"
                className={`btn-secondary transition-all duration-500 ${
                  theme === 'light'
                    ? 'bg-transparent text-gray-900 border-gray-300 hover:bg-gray-50'
                    : 'bg-transparent text-white border-gray-700 hover:bg-gray-900'
                }`}
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
