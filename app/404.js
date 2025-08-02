import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-center px-4 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-r from-accent/8 to-accent-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-16 w-80 h-80 bg-gradient-to-l from-accent-hover/6 to-accent/6 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl lg:text-7xl font-light gradient-gold mb-6">404</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl lg:text-3xl font-light mb-4 text-text-primary">Page Not Found</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            href="/" 
            className="btn-primary px-8 py-4 text-lg"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
