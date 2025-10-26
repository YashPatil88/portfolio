"use client";
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaMobile } from 'react-icons/fa';

const About = () => {
  const skills = [
    {
      name: "Frontend Development",
      icon: FaCode,
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      color: "blue"
    },
    {
      name: "Backend Development",
      icon: FaServer,
      items: ["Node.js", "Express", "Python", "Java"],
      color: "green"
    },
    {
      name: "Database",
      icon: FaDatabase,
      items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
      color: "yellow"
    },
    {
      name: "Mobile Development",
      icon: FaMobile,
      items: ["React Native", "Flutter"],
      color: "purple"
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-white mb-4 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Me
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.h2>
          <motion.div 
            className="text-gray-400 max-w-3xl mx-auto space-y-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg leading-relaxed"
            >
              As a Computer Engineer and published author, I bridge the gap between complex technical concepts and clear communication. 
              My engineering background drives me to create elegant solutions, while my writing experience helps me explain intricate ideas simply.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg leading-relaxed"
            >
              I specialize in developing innovative solutions that combine technical excellence with user-friendly design. 
              My dual expertise allows me to not only build robust systems but also effectively communicate their value and functionality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              {["Problem Solving", "Technical Writing", "System Architecture", "Innovation"].map((strength, index) => (
                <motion.span
                  key={strength}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-blue-400 border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300"
                >
                  {strength}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-${skill.color}-500/20`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg mb-4 mx-auto">
                <skill.icon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-white text-center mb-4">{skill.name}</h3>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="text-gray-400 text-center">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center relative inline-block">
            Education
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </h3>

          <div className="relative max-w-4xl mx-auto mt-12">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />

            {/* Current Education */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative mb-12"
            >
              <div className="flex items-center mb-6">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg inline-block hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                    <h4 className="text-lg font-semibold text-white">Bachelor of Science in Computer Science</h4>
                    <p className="text-gray-400">Deccan Education Society Pune University, Pune</p>
                    <p className="text-blue-500 font-medium">2024 - Present</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">Computer Science</span>
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">Higher Education</span>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                </div>
                <div className="w-1/2 pl-8" />
              </div>
            </motion.div>

            {/* Previous Education */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="flex items-center">
                <div className="w-1/2 pr-8" />
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
                </div>
                <div className="w-1/2 pl-8">
                  <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg inline-block hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                    <h4 className="text-lg font-semibold text-white">Bachelor of Science in Computer Science</h4>
                    <p className="text-gray-400">TSSM BSCOR Pune Polytechnique</p>
                    <p className="text-purple-500 font-medium">2020 - 2023</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">Computer Engineering</span>
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">Foundation</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;