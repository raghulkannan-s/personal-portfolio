'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-primary/98 backdrop-blur-xl border-b border-accent/20' 
          : 'py-6 lg:py-8 bg-primary/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link 
              href="/" 
              className="text-2xl font-light text-text-primary tracking-wide relative group"
            >
              <span className="text-text-primary">Kannan</span>
              <span className="text-accent ml-2">studios</span>
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-hover group-hover:w-full transition-all duration-500"
              />
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => (
              <motion.div key={item.path} className="relative">
                <Link
                  href={item.path}
                  className={`text-lg font-light transition-all duration-300 hover:text-accent relative group ${
                    pathname === item.path ? 'text-accent' : 'text-text-primary'
                  }`}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent-hover"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {pathname !== item.path && (
                    <motion.div
                      className="absolute -bottom-2 left-0 w-0 h-0.5 bg-accent/60 group-hover:w-full transition-all duration-300"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="px-6 py-3 bg-accent text-primary font-medium rounded hover:bg-accent-hover transition-all duration-300 shadow-lg hover:shadow-accent/25"
              >
                Let's Talk
              </Link>
            </motion.div>

            {/* Resume Download Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                href="/resume.pdf"
                download="Raghul_Kannan_Resume.pdf"
                className="p-3 bg-secondary/80 hover:bg-tertiary border border-border hover:border-accent/50 rounded-lg transition-all duration-300 flex items-center justify-center group"
                title="Download Resume"
              >
                <svg 
                  className="w-5 h-5 text-accent group-hover:text-accent-hover transition-colors duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-lg bg-secondary/80 hover:bg-tertiary border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-accent block transition-all duration-300"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-0.5 bg-accent block mt-1.5 transition-all duration-300"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-accent block mt-1.5 transition-all duration-300"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-primary/98 border-b border-accent/20 backdrop-blur-xl"
          >
            <div className="max-w-6xl mx-auto px-6 py-6">
              <div className="flex flex-col space-y-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-lg font-light transition-all duration-300 py-2 block ${
                        pathname === item.path ? 'text-accent' : 'text-text-primary hover:text-accent'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="pt-4 border-t border-border flex flex-col gap-3"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-block px-6 py-3 bg-accent text-primary font-medium rounded hover:bg-accent-hover transition-all duration-300"
                  >
                    Let's Talk
                  </Link>
                  
                  <a
                    href="/resume.pdf"
                    download="Raghul_Kannan_Resume.pdf"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary/80 text-accent border border-border hover:border-accent/50 rounded hover:bg-tertiary transition-all duration-300"
                  >
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                    Download Resume
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
