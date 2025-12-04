"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaMobile, FaRocket, FaLightbulb, FaPuzzlePiece, FaBook } from 'react-icons/fa';
import { useRef } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const skills = [
    {
      name: "Frontend Development",
      icon: FaCode,
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      gradient: "from-blue-500 to-cyan-500",
      glow: "blue"
    },
    {
      name: "Backend Development",
      icon: FaServer,
      items: ["Node.js", "Express", "Python", "Java"],
      gradient: "from-green-500 to-emerald-500",
      glow: "green"
    },
    {
      name: "Database",
      icon: FaDatabase,
      items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
      gradient: "from-yellow-500 to-orange-500",
      glow: "yellow"
    },
    {
      name: "Mobile Development",
      icon: FaMobile,
      items: ["React Native", "Flutter"],
      gradient: "from-purple-500 to-pink-500",
      glow: "purple"
    },
  ];

  const strengths = [
    { name: "Problem Solving", icon: FaPuzzlePiece, color: "blue" },
    { name: "Technical Writing", icon: FaBook, color: "purple" },
    { name: "System Architecture", icon: FaRocket, color: "pink" },
    { name: "Innovation", icon: FaLightbulb, color: "yellow" },
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-32 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Morphing background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 morphing-blob blur-3xl"
          style={{ y }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 morphing-blob blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
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
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent neon-blue">
              About Me
            </span>
            <motion.span
              className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: "0%", scaleX: 0 }}
              whileInView={{ width: "100%", scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.h2>
        </motion.div>

        {/* Split Layout: Text on Left, Visual on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              As a <span className="text-blue-400 font-semibold">Computer Engineer</span> and published <span className="text-purple-400 font-semibold">author</span>, I bridge the gap between complex technical concepts and clear communication.
            </motion.p>
            
            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              My engineering background drives me to create <span className="text-pink-400 font-semibold">elegant solutions</span>, while my writing experience helps me explain intricate ideas simply.
            </motion.p>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              I specialize in developing innovative solutions that combine <span className="text-cyan-400 font-semibold">technical excellence</span> with user-friendly design.
            </motion.p>

            {/* Strengths Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {strengths.map((strength, index) => (
                <motion.div
                  key={strength.name}
                  className="glass-strong rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  data-magnetic
                >
                  <div className="mb-2" style={{ color: strength.color === 'blue' ? '#60a5fa' : strength.color === 'purple' ? '#a78bfa' : strength.color === 'pink' ? '#f472b6' : '#fbbf24' }}>
                    <strength.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-white font-semibold text-sm">{strength.name}</h4>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Animated Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 flex items-center justify-center"
          >
            {/* Rotating gradient orb */}
            <motion.div
              className="absolute w-64 h-64 rounded-full"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{
                background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                filter: 'blur(40px)',
              }}
            />
            
            {/* Floating skill icons */}
            {skills.map((skill, index) => {
              const angle = (index * 2 * Math.PI) / skills.length;
              const radius = 120;
              return (
                <motion.div
                  key={skill.name}
                  className="absolute glass-strong rounded-2xl p-4 border border-white/20"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    rotate: 360,
                  }}
                  transition={{
                    delay: 1 + index * 0.2,
                    x: { duration: 10 + index * 2, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 10 + index * 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  data-magnetic
                >
                  <skill.icon className="w-8 h-8" style={{ color: skill.glow === 'blue' ? '#60a5fa' : skill.glow === 'green' ? '#34d399' : skill.glow === 'yellow' ? '#fbbf24' : '#a78bfa' }} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -15 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }
                }
              }}
              className="relative group perspective-1000"
              data-magnetic
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${skill.gradient} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
              />

              {/* Card */}
              <div className="relative glass-strong rounded-2xl p-6 border border-white/10 h-full flex flex-col transform-3d">
                {/* Icon */}
                <motion.div
                  className={`flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${skill.gradient} mb-4 mx-auto relative overflow-hidden`}
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
                  <skill.icon className="w-8 h-8 text-white relative z-10" />
                </motion.div>

                {/* Title */}
                <motion.h3 
                  className="text-lg font-semibold text-white text-center mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  {skill.name}
                </motion.h3>

                {/* Items */}
                <ul className="space-y-2 flex-1">
                  {skill.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIndex * 0.1 }}
                      className="text-gray-400 text-center text-sm flex items-center justify-center gap-2"
                      whileHover={{ 
                        x: 5,
                        color: '#60a5fa',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32"
        >
          <motion.h3 
            className="text-4xl font-bold text-white mb-12 text-center relative inline-block w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education
            </span>
            <motion.span
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "50%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.h3>

          <div className="relative max-w-4xl mx-auto mt-12">
            {/* Animated timeline line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
              style={{ 
                background: "linear-gradient(180deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)",
                borderRadius: "999px"
              }}
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Current Education */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mb-16"
            >
              <div className="flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <motion.div 
                    className="glass-strong rounded-2xl p-6 inline-block relative overflow-hidden group border border-white/10"
                    whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                  >
                    <motion.h4 
                      className="text-xl font-semibold text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                    >
                      Bachelor of Science in Computer Science
                    </motion.h4>
                    <p className="text-gray-400 mb-1">Deccan Education Society Pune University, Pune</p>
                    <p className="text-blue-400 font-medium">2024 - Present</p>
                  </motion.div>
                </div>
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div 
                    className="w-6 h-6 rounded-full bg-blue-500 border-4 border-black"
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(59,130,246,0.7)",
                        "0 0 0 20px rgba(59,130,246,0)",
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                <div className="w-1/2 pl-8" />
              </div>
            </motion.div>

            {/* Previous Education */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="flex items-center">
                <div className="w-1/2 pr-8" />
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.div 
                    className="w-6 h-6 rounded-full bg-purple-500 border-4 border-black"
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(139,92,246,0.7)",
                        "0 0 0 20px rgba(139,92,246,0)",
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                <div className="w-1/2 pl-8">
                  <motion.div 
                    className="glass-strong rounded-2xl p-6 inline-block relative overflow-hidden group border border-white/10"
                    whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.5)' }}
                  >
                    <motion.h4 
                      className="text-xl font-semibold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    >
                      Bachelor of Science in Computer Science
                    </motion.h4>
                    <p className="text-gray-400 mb-1">TSSM BSCOR Pune Polytechnique</p>
                    <p className="text-purple-400 font-medium">2020 - 2023</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;