"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaRocket, FaCode, FaBook, FaBuilding } from 'react-icons/fa';
import { useRef } from 'react';

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string[];
  icon: any;
  color: string;
}

const experiences: Experience[] = [
  {
    title: "Computer Engineer",
    company: "Deccan Education Society Pune University Student",
    duration: "2022 - Present",
    description: [
      "Developed innovative solutions using cutting-edge technologies",
      "Created and maintained multiple full-stack applications",
      "Authored technical documentation and guides",
      "Contributed to open-source projects and technical communities"
    ],
    icon: FaCode,
    color: "blue"
  },
  {
    title: "Technical Author",
    company: "Self-Published (Medium)",
    duration: "2025 - Present",
    description: [
      "Regular contributor on Medium (https://medium.com/@yashspatil4779) — publishing technical tutorials and long-form articles",
      "Created comprehensive guides on software development",
      "Shared knowledge and insights with the developer community",
      "Focused on making complex concepts accessible to all skill levels"
    ],
    icon: FaBook,
    color: "purple"
  },
  {
    title: "Business Corporate",
    company: "Sakal Media Group",
    duration: "2025 - Present",
    description: [
      "Collaborated with cross-functional teams to drive business growth",
      "Implemented technology solutions to streamline operations",
      "Analyzed market trends to inform strategic decisions",
      "Enhanced customer engagement through innovative digital initiatives"
    ],
    icon: FaBuilding,
    color: "pink"
  }
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="py-32 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          style={{ y }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
        style={{ opacity }}
      >
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
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Experience
            </span>
            <motion.span
              className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
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
            My professional journey and achievements
          </motion.p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full"
            style={{ 
              background: "linear-gradient(180deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)",
              borderRadius: "999px"
            }}
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const colorClasses = {
                blue: "from-blue-500 to-cyan-500",
                purple: "from-purple-500 to-pink-500",
                pink: "from-pink-500 to-rose-500"
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  className="relative"
                >
                  <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                    {/* Timeline dot */}
                    <motion.div 
                      className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                    >
                      <motion.div 
                        className={`w-6 h-6 rounded-full bg-gradient-to-r ${colorClasses[exp.color as keyof typeof colorClasses]} border-4 border-black`}
                        animate={{ 
                          boxShadow: [
                            `0 0 0 0 rgba(${exp.color === 'blue' ? '59,130,246' : exp.color === 'purple' ? '139,92,246' : '236,72,153'},0.7)`,
                            `0 0 0 20px rgba(${exp.color === 'blue' ? '59,130,246' : exp.color === 'purple' ? '139,92,246' : '236,72,153'},0)`,
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>

                    {/* Content Card */}
                    <div className={`flex-1 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} w-full md:w-auto`}>
                      <motion.div 
                        className="glass-strong rounded-2xl p-6 md:p-8 relative overflow-hidden group border border-white/10 hover:border-white/30 transition-all"
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        {/* Gradient overlay on hover */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${colorClasses[exp.color as keyof typeof colorClasses]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />

                        {/* Icon */}
                        <motion.div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${colorClasses[exp.color as keyof typeof colorClasses]} mb-4 ${isEven ? 'md:ml-auto' : ''}`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <exp.icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Content */}
                        <div className="relative z-10">
                          <motion.h3 
                            className="text-2xl font-bold text-white mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                          >
                            {exp.title}
                          </motion.h3>
                          
                          <motion.p 
                            className={`text-lg mb-3 ${exp.color === 'blue' ? 'text-blue-400' : exp.color === 'purple' ? 'text-purple-400' : 'text-pink-400'}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                          >
                            {exp.company}
                          </motion.p>

                          <motion.div
                            className="flex items-center gap-2 mb-4 text-gray-400"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                          >
                            <FaCalendarAlt className="w-4 h-4" />
                            <span className="text-sm">{exp.duration}</span>
                          </motion.div>

                          <ul className="space-y-2">
                            {exp.description.map((point, i) => (
                              <motion.li
                                key={i}
                                className="text-gray-300 flex items-start gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                              >
                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${exp.color === 'blue' ? 'bg-blue-400' : exp.color === 'purple' ? 'bg-purple-400' : 'bg-pink-400'}`} />
                                <span>{point}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRocket />
            <span>View Full Resume</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;