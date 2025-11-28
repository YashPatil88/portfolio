"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
}

const projects: Project[] = [
  {
    title: "Real-Time-Sign-Lanaguage-Translator",
    description: "An innovative AI-powered application that translates sign language in real-time, breaking communication barriers.",
    image: "/project1.jpg",
    technologies: ["Python", "HTML", "CSS"],
    githubLink: "https://github.com/YashPatil88/Real-Time-Sign-Lanaguage-Translator",
    liveLink: "https://project1.demo.com"
  },
  {
    title: "Travel-with-engineer",
    description: "A comprehensive travel platform designed for engineers, featuring route optimization and technical destination guides.",
    image: "/project2.jpg",
    technologies: ["React", "Express", "TailwindCSS"],
    githubLink: "https://github.com/YashPatil88/Travel-with-engineer",
    liveLink: "https://project2.demo.com"
  },
  {
    title: "MedTrack",
    description: "A smart healthcare management system for tracking medications, appointments, and health metrics with intelligent reminders.",
    image: "/project3.jpg",
    technologies: ["React", "Node.js", "MongoDB"],
    githubLink: "https://github.com/yourusername/project3"
  },
  {
    title: "Unit Converter",
    description: "A versatile and intuitive unit conversion tool supporting multiple measurement systems with a modern interface.",
    image: "/unit converter.jpg",
    technologies: ["HTML", "CSS", "JS"],  
    githubLink: "https://github.com/yourusername/project3"
  }
];

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-32 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{ y }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
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
            style={{ opacity }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
            <motion.span
              className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
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
            Crafting digital experiences that blend innovation with elegance
          </motion.p>
        </motion.div>

        {/* Projects Grid - Isometric Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className={`relative perspective-1000 ${isEven ? 'lg:mt-20' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-magnetic
              >
                {/* Isometric Card Container */}
                <motion.div
                  className="relative h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  whileHover={{
                    rotateY: 5,
                    rotateX: -5,
                    z: 50,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl opacity-0"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Main Card */}
                  <div className="relative glass-strong rounded-3xl overflow-hidden border border-white/10 h-full flex flex-col">
                    {/* Image Section */}
                    <div className="relative h-64 sm:h-80 overflow-hidden">
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          scale: hoveredIndex === index ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={encodeURI(project.image)}
                          alt={project.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="brightness-75"
                        />
                      </motion.div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                      {/* Floating Tech Tags */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: techIndex * 0.1 }}
                            className="px-3 py-1 glass rounded-full text-xs font-semibold text-white backdrop-blur-md"
                            whileHover={{ scale: 1.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Hover Overlay with Actions */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.liveLink && (
                          <motion.a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 glass-strong rounded-xl text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition-all"
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ 
                              y: hoveredIndex === index ? 0 : 20, 
                              opacity: hoveredIndex === index ? 1 : 0 
                            }}
                          >
                            <FaExternalLinkAlt />
                            <span>Live Demo</span>
                          </motion.a>
                        )}
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 glass-strong rounded-xl text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition-all"
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: hoveredIndex === index ? 0 : 20, 
                            opacity: hoveredIndex === index ? 1 : 0 
                          }}
                          transition={{ delay: 0.1 }}
                        >
                          <FaGithub />
                          <span>Code</span>
                        </motion.a>
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col">
                      <motion.h3 
                        className="text-2xl sm:text-3xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-gray-400 mb-6 leading-relaxed flex-1">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: techIndex * 0.05 }}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-400 font-medium"
                            whileHover={{ 
                              scale: 1.1,
                              borderColor: 'rgba(59, 130, 246, 0.5)',
                              backgroundColor: 'rgba(59, 130, 246, 0.2)',
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-3 glass rounded-xl text-center text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaGithub />
                          <span>GitHub</span>
                        </motion.a>
                        {project.liveLink && (
                          <motion.a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-center text-white font-semibold flex items-center justify-center gap-2 hover:from-blue-400 hover:to-purple-400 transition-all"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaExternalLinkAlt />
                            <span>Live</span>
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
                      animate={{
                        x: ['-200%', '200%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                      style={{
                        transform: 'skewX(-45deg)',
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;