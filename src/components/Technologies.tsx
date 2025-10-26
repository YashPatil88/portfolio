'use client';

import { motion } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, 
  SiTailwindcss, SiNodedotjs, SiPython, SiGit,
  SiMongodb, SiPostgresql, SiDocker, SiAmazon,
  SiHtml5, SiCss3, SiRedux, SiFigma
} from 'react-icons/si';

interface Technology {
  name: string;
  icon: any;
  color: string;
  category: string;
  proficiency: number;
}

const technologies: Technology[] = [
  // Frontend
  { name: 'React', icon: SiReact, color: '#61DAFB', category: 'Frontend', proficiency: 90 },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000', category: 'Frontend', proficiency: 85 },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'Frontend', proficiency: 85 },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'Frontend', proficiency: 90 },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26', category: 'Frontend', proficiency: 95 },
  { name: 'CSS3', icon: SiCss3, color: '#1572B6', category: 'Frontend', proficiency: 90 },
  { name: 'Redux', icon: SiRedux, color: '#764ABC', category: 'Frontend', proficiency: 80 },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', category: 'Frontend', proficiency: 90 },

  // Backend
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', category: 'Backend', proficiency: 85 },
  { name: 'Python', icon: SiPython, color: '#3776AB', category: 'Backend', proficiency: 80 },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'Backend', proficiency: 85 },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'Backend', proficiency: 80 },

  // Tools & DevOps
  { name: 'Git', icon: SiGit, color: '#F05032', category: 'Tools', proficiency: 90 },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'Tools', proficiency: 75 },
  { name: 'AWS', icon: SiAmazon, color: '#FF9900', category: 'Tools', proficiency: 70 },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E', category: 'Tools', proficiency: 80 },
];

const Technologies = () => {
  const categories = Array.from(new Set(technologies.map(tech => tech.category)));

  return (
    <section id="technologies" className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Technologies</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of the technologies, frameworks, and tools I specialize in
          </p>
        </motion.div>

        <div className="space-y-16">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-8 border-b border-gray-800 pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {technologies
                  .filter(tech => tech.category === category)
                  .map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-800/70 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <tech.icon className="w-8 h-8" style={{ color: tech.color }} />
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{tech.name}</h4>
                          <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: tech.color }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${tech.proficiency}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent pointer-events-none" />
    </section>
  );
};

export default Technologies;