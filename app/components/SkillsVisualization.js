'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillCategories = {
    frontend: {
      title: 'Frontend',
      icon: '🎨',
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'React Native Expo', 'Tailwind CSS', 'HTML5', 'CSS3']
    },
    backend: {
      title: 'Backend',
      icon: '⚙️',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'PostgreSQL', 'Prisma', 'REST APIs', 'OAuth']
    },
    tools: {
      title: 'Tools',
      icon: '🛠️',
      skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vercel', 'Netlify']
    }
  };

  const allSkills = Object.values(skillCategories).flatMap(category => 
    category.skills.map(skill => ({ name: skill, category: category.title.toLowerCase() }))
  );

  const displaySkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  return (
    <section className="py-24 px-6" style={{ borderTop: `1px solid rgba(var(--border), 0.3)` }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-light text-text-primary mb-6">
            Skills & <span className="font-normal text-accent">Technologies</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light">
            A comprehensive toolkit of modern technologies and frameworks for building exceptional digital experiences.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-12"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-accent text-text-inverse'
                : 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-secondary'
            }`}
          >
            All Skills
          </button>
          {Object.entries(skillCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === key
                  ? 'bg-accent text-text-inverse'
                  : 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-secondary'
              }`}
            >
              <span>{category.icon}</span>
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
        >
          {displaySkills.map((skill, index) => (
            <motion.div
              key={`${skill.name}-${skill.category}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="card card-interactive text-center group"
            >
              <div className="p-4">
                <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors duration-300">
                  {skill.name}
                </h3>
                <p className="text-xs text-text-muted mt-1 capitalize">
                  {skill.category}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {Object.entries(skillCategories).map(([key, category]) => (
            <div key={key} className="text-center">
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="text-lg font-medium text-text-primary mb-2">{category.title}</h3>
              <p className="text-sm text-text-secondary">
                {category.skills.length} technologies
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
