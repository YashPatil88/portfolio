"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, 
  SiTailwindcss, SiNodedotjs, SiPython, SiGit,
  SiMongodb, SiPostgresql, SiDocker, SiAmazon,
  SiHtml5, SiCss3, SiRedux, SiFigma
} from 'react-icons/si';
import { useRef } from 'react';

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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const categories = Array.from(new Set(technologies.map(tech => tech.category)));

  return (
    <section 
      ref={sectionRef}
      id="technologies" 
      className="py-32 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          style={{ y }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full" style={{ opacity }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl sm:text-7xl font-bold mb-6 relative inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technologies
            </span>
            <motion.span
              className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
              initial={{ width: "0%", scaleX: 0 }}
              whileInView={{ width: "100%", scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            A comprehensive toolkit of modern technologies and frameworks
          </motion.p>
        </motion.div>

        {/* Technologies by Category */}
        <div className="space-y-20">
          {categories.map((category, categoryIndex) => {
            const categoryTechs = technologies.filter(tech => tech.category === category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              >
                <motion.h3 
                  className="text-3xl font-bold text-white mb-10 relative inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {category}
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </motion.h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categoryTechs.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 30, rotateX: -15 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                      className="group relative perspective-1000"
                    >
                      {/* Glow effect */}
                      <motion.div
                        className="absolute -inset-1 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                        style={{ backgroundColor: tech.color }}
                      />

                      {/* Card */}
                      <div className="relative glass-strong rounded-2xl p-6 border border-white/10 h-full flex flex-col transform-3d hover:border-white/30 transition-all">
                        {/* Icon */}
                        <motion.div
                          className="flex items-center justify-center w-16 h-16 rounded-xl mb-4 mx-auto relative overflow-hidden"
                          style={{ backgroundColor: `${tech.color}20` }}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1,
                            }}
                          />
                          <tech.icon 
                            className="w-8 h-8 relative z-10" 
                            style={{ color: tech.color }}
                          />
                        </motion.div>

                        {/* Name */}
                        <motion.h4 
                          className="text-white font-semibold text-center mb-3"
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech.name}
                        </motion.h4>

                        {/* Proficiency Bar */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400">Proficiency</span>
                            <span className="text-xs font-semibold" style={{ color: tech.color }}>
                              {tech.proficiency}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: tech.color }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${tech.proficiency}%` }}
                              viewport={{ once: true }}
                              transition={{ 
                                duration: 1.5, 
                                delay: 0.5 + index * 0.1,
                                ease: "easeOut"
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Technologies;