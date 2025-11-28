"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useRef } from 'react';
import Image from 'next/image';

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const yTransform = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const firstName = "Yash".split("");
  const lastName = "Patil".split("");

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/Yashpatil88", label: "GitHub", color: "from-gray-400 to-gray-600" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/yashspatil4779/", label: "LinkedIn", color: "from-blue-400 to-blue-600" },
    { icon: FaEnvelope, href: "mailto:yashspatil4779@gmail.com", label: "Email", color: "from-purple-400 to-pink-600" }
  ];

  return (
    <section 
      ref={ref} 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      </div>

      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent)'
              : 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)',
            left: `${20 + i * 15}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        style={{ 
          opacity, 
          scale, 
          y: yTransform,
        }}
      >
        <div className="relative">
          {/* Profile Image */}
          <motion.div 
            className="relative w-56 h-56 mx-auto mb-12"
          >
            {/* Glowing rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2"
                style={{
                  borderColor: i === 0 ? 'rgba(59, 130, 246, 0.5)' : i === 1 ? 'rgba(139, 92, 246, 0.3)' : 'rgba(236, 72, 153, 0.2)',
                  scale: 1 + i * 0.15,
                  filter: 'blur(1px)',
                }}
                animate={{
                  rotate: 360,
                  scale: [1 + i * 0.15, 1.1 + i * 0.15, 1 + i * 0.15],
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
            
            {/* Profile image container */}
            <motion.div
              className="relative w-56 h-56 rounded-full overflow-hidden glass-strong border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
              whileHover={{ scale: 1.05, rotateZ: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                <Image
                  src="/images/profile.jpg"
                  alt="Yash Patil"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-full"
                  sizes="224px"
                  priority
                />
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
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

            {/* Floating particles around image */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-blue-400"
                style={{
                  left: '50%',
                  top: '50%',
                  originX: 0.5,
                  originY: 0.5,
                }}
                animate={{
                  x: [0, Math.cos(i * Math.PI / 4) * 150],
                  y: [0, Math.sin(i * Math.PI / 4) * 150],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Name with 3D effect */}
          <motion.h1 
            className="text-5xl sm:text-8xl font-bold mb-6 flex justify-center items-center flex-wrap gap-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Hi, I'm</span>
            <div className="inline-flex flex-wrap gap-2">
              {firstName.map((letter, index) => (
                <motion.span
                  key={`first-${index}`}
                  className="inline-block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.2,
                    textShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
              {lastName.map((letter, index) => (
                <motion.span
                  key={`last-${index}`}
                  className="inline-block bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    delay: 0.7 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.2,
                    textShadow: "0 0 20px rgba(139, 92, 246, 0.8)",
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>
          </motion.h1>

          {/* Title with typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-2xl sm:text-3xl mb-4"
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold"
              animate={{
                backgroundPosition: ['0%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Computer Engineer
            </motion.span>
            <span className="text-gray-400 mx-4">|</span>
            <motion.span
              className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-semibold"
              animate={{
                backgroundPosition: ['0%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5,
              }}
            >
              Author
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Transforming ideas into <span className="text-blue-400 font-semibold">elegant solutions</span> through code and creativity
          </motion.p>
          
          {/* Social links with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex justify-center gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                data-magnetic
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 1.5 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className={`relative w-16 h-16 rounded-2xl glass-strong flex items-center justify-center bg-gradient-to-br ${social.color} p-0.5`}>
                  <div className="w-full h-full rounded-2xl bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <social.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <motion.span
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  {social.label}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-white cursor-pointer"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          data-magnetic
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;