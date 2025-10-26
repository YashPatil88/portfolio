"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
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
    description: "Description of your first project. What it does, what problem it solves, and what you learned.",
    image: "/project1.jpg",
    technologies: ["Python", "HTML", "CSS"],
    githubLink: "https://github.com/YashPatil88/Real-Time-Sign-Lanaguage-Translator",
    liveLink: "https://project1.demo.com"
  },
  {
    title: "Travel-with-engineer",
    description: "Another exciting project showcasing your skills and creativity.",
    image: "/project2.jpg",
    technologies: ["React", "Express", "TailwindCSS"],
    githubLink: "https://github.com/YashPatil88/Travel-with-engineer",
    liveLink: "https://project2.demo.com"
  },
  {
    title: "MedTrack",
    description: "A demonstration of your problem-solving abilities and technical expertise.",
    image: "/project3.jpg",
    technologies: ["React", "Node.js", "MongoDB"],
    githubLink: "https://github.com/yourusername/project3"
  },
  {
    title: "Unit Converter",
    description: "A demonstration of your problem-solving abilities and technical expertise.",
    image: "/unit converter.jpg",
    technologies: ["HTML", "CSS", "JS"],  
    githubLink: "https://github.com/yourusername/project3"
  }
];

const Projects = () => {
  const [fitModes, setFitModes] = useState<Record<string, 'cover' | 'contain'>>({});

  const handleImageLoad = (key: string, naturalWidth?: number, naturalHeight?: number) => {
    if (!naturalWidth || !naturalHeight) return;
    setFitModes((prev) => ({ ...prev, [key]: naturalWidth === naturalHeight ? 'contain' : 'cover' }));
  };

  return (
    <section id="projects" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 relative inline-block">
            <span className="relative z-10">Projects</span>
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </h2>
          <p className="text-gray-400 text-lg mt-4">Here are some of my recent works</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.98 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 18 } }
              }}
              className="group bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden transform transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              onMouseMove={(e) => {
                const el = e.currentTarget as HTMLElement;
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rx = ((y - rect.height / 2) / rect.height) * 8;
                const ry = -((x - rect.width / 2) / rect.width) * 8;
                (el.style as any).transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                (el.style as any).transform = '';
              }}
            >
              <div className="relative bg-gray-900 flex items-center justify-center overflow-hidden" style={{ minHeight: 220 }}>
                <Image
                  src={encodeURI(project.image)}
                  alt={project.title}
                  fill
                  style={{ objectFit: fitModes[project.title] || 'cover', objectPosition: 'center' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                  onLoadingComplete={(result) => handleImageLoad(project.title, result?.naturalWidth, result?.naturalHeight)}
                  onError={(e) => {
                    // @ts-ignore
                    e.currentTarget.src = '/images/default-project.jpg';
                  }}
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-end justify-between p-4 pointer-events-none"
                >
                  <div className="pointer-events-auto">
                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-2 rounded-md backdrop-blur hover:bg-white/20 transition"
                        whileHover={{ scale: 1.03 }}
                      >
                        <FaExternalLinkAlt />
                        <span className="text-sm">Live</span>
                      </motion.a>
                    )}
                  </div>
                  <div className="pointer-events-auto">
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/6 text-white px-3 py-2 rounded-md backdrop-blur hover:bg-white/20 transition"
                      whileHover={{ scale: 1.03 }}
                    >
                      <FaGithub />
                      <span className="text-sm">Code</span>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, tIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.06 * tIndex }}
                      className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    GitHub
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md transition-colors duration-200"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;