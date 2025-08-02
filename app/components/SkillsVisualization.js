'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const skillsData = [
  // Frontend
  { name: "Next.js", icon: "⚡", category: "Frontend", description: "Full-stack React framework for production-ready applications" },
  { name: "React.js", icon: "⚛️", category: "Frontend", description: "Component-based library for building interactive user interfaces" },
  { name: "TypeScript", icon: "📘", category: "Frontend", description: "Strongly typed JavaScript for scalable application development" },
  { name: "JavaScript", icon: "🟨", category: "Frontend", description: "Core programming language for dynamic web experiences" },
  { name: "Tailwind", icon: "🎨", category: "Frontend", description: "Utility-first CSS framework for rapid UI development" },
  { name: "Bootstrap", icon: "🅱️", category: "Frontend", description: "Responsive CSS framework for consistent design systems" },
  
  // Backend
  { name: "Node.js", icon: "🟢", category: "Backend", description: "JavaScript runtime for building scalable server-side applications" },
  { name: "Express.js", icon: "🚂", category: "Backend", description: "Minimal web framework for Node.js API development" },
  { name: "JWT", icon: "🔐", category: "Backend", description: "Secure token-based authentication for modern applications" },
  { name: "RESTful APIs", icon: "🔗", category: "Backend", description: "Architectural style for designing networked applications" },
  { name: "WebSockets", icon: "🔌", category: "Backend", description: "Real-time bidirectional communication between client and server" },
  
  // Database
  { name: "MongoDB", icon: "🍃", category: "Database", description: "NoSQL document database for flexible data storage" },
  { name: "PostgreSQL", icon: "🐘", category: "Database", description: "Advanced open-source relational database system" },
  { name: "Neon DB", icon: "⚡", category: "Database", description: "Serverless PostgreSQL for modern cloud applications" },
  { name: "Prisma", icon: "🔷", category: "Database", description: "Type-safe database toolkit and ORM for Node.js" },
  { name: "Mongoose", icon: "🏷️", category: "Database", description: "Elegant MongoDB object modeling for Node.js" },
  
  // Mobile & State
  { name: "React Native", icon: "📱", category: "Mobile", description: "Cross-platform mobile app development using React" },
  { name: "Expo", icon: "⚡", category: "Mobile", description: "Platform for universal React applications across devices" },
  { name: "Zustand", icon: "🐻", category: "State", description: "Lightweight state management solution for React apps" },
  { name: "Redux", icon: "🔄", category: "State", description: "Predictable state container for JavaScript applications" },
  
  // Auth & Payment
  { name: "OAuth", icon: "🔑", category: "Auth", description: "Industry-standard protocol for secure authorization" },
  { name: "Clerk", icon: "👤", category: "Auth", description: "Complete authentication and user management platform" },
  { name: "Razorpay", icon: "💳", category: "Payment", description: "Comprehensive payment gateway for Indian businesses" },
  { name: "Stripe", icon: "💳", category: "Payment", description: "Global payment infrastructure for online businesses" },
  
  // Tools & Languages
  { name: "Git/GitHub", icon: "🐙", category: "Tools", description: "Version control and collaborative development platform" },
  { name: "VS Code", icon: "💻", category: "Tools", description: "Powerful code editor with extensive extension ecosystem" },
  { name: "Vercel", icon: "▲", category: "Tools", description: "Cloud platform for static sites and serverless functions" },
  { name: "Postman", icon: "📮", category: "Tools", description: "API development and testing collaboration platform" },
  { name: "Python", icon: "🐍", category: "Language", description: "Versatile programming language for automation and data analysis" },
  { name: "C/C++", icon: "💻", category: "Language", description: "High-performance system programming languages" },
  { name: "Java", icon: "☕", category: "Language", description: "Object-oriented language for enterprise applications" }
];

export default function SkillsVisualization() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section className="py-12 lg:py-16 bg-primary relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-accent/5 to-accent-secondary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-accent-hover/4 to-accent/4 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative">
        {/* Ultra-Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.p 
            className="text-micro text-accent/70 tracking-[0.2em] mb-2 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            TECHNICAL EXPERTISE
          </motion.p>
          
          <h2 className="text-3xl lg:text-4xl font-light text-text-primary mb-3">
            Core <span className="gradient-gold font-medium">Technologies</span>
          </h2>
          
          <p className="text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Mastering cutting-edge technologies to deliver exceptional digital experiences
          </p>
        </motion.div>

        {/* World-Class Skills Grid - Compact View */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 mb-8"
        >
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.02,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group relative"
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <motion.div
                className="glass-subtle rounded-lg p-3 h-20 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 border border-border/30 hover:border-accent/30"
                whileHover={{ 
                  y: -2, 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Skill Icon */}
                <div className="text-lg mb-1 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                
                {/* Skill Name */}
                <div className="text-xs text-text-primary font-medium text-center leading-tight">
                  {skill.name}
                </div>

                {/* Premium Hover Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>

              {/* Advanced Tooltip */}
              {hoveredSkill?.name === skill.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
                >
                  <div
                    className="glass-strong rounded-lg p-4 max-w-xl shadow-2xl border border-accent/20"
                    style={{ width: "420px", minWidth: "max-content" }}
                  >
                    <div className="text-sm font-semibold text-text-primary mb-1">
                      {skill.name}
                    </div>
                    <div className="text-xs text-accent font-medium mb-2">
                      {skill.category}
                    </div>
                    <div className="text-xs text-text-secondary leading-relaxed">
                      {skill.description}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
