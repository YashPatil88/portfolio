"use client";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaBook } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const firstName = "Yash".split("");
  const lastName = "Patil".split("");

  return (
    <section ref={ref} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-black to-gray-900">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, #00336680 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, #00336680 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, #00336680 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, #00336680 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, #00336680 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        style={{ opacity, scale, y }}
      >
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
            className="relative w-48 h-48 mx-auto mb-8"
          >
            {/* Rotating gradient border */}
            <motion.div
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
              animate={{
                background: [
                  "linear-gradient(0deg, #3B82F6, #8B5CF6, #3B82F6)",
                  "linear-gradient(360deg, #3B82F6, #8B5CF6, #3B82F6)",
                ],
                rotate: 360
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ filter: "blur(8px)" }}
            />
            
            {/* Profile image container */}
            <motion.div
              className="relative w-48 h-48 rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dark overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
              {/* Profile image */}
              <Image
                src="/images/profile.jpg"
                alt="Yash Patil"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-full"
                sizes="(max-width: 768px) 192px, 192px"
                priority
              />

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0"
                animate={{
                  x: ["0%", "200%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  mixBlendMode: "overlay",
                  transform: "skewX(-45deg)",
                }}
              />
            </motion.div>
          </motion.div>

          <h1 className="text-4xl sm:text-7xl font-bold text-white mb-4 flex justify-center items-center flex-wrap">
            Hi, I'm{" "}
            <div className="text-blue-500 ml-4 inline-flex flex-wrap">
              <span className="inline-flex mr-4">
                {firstName.map((letter, index) => (
                  <motion.span
                    key={`first-${index}`}
                    variants={letterVariants}
                    className="inline-block hover:text-blue-400 transition-colors duration-300 cursor-default"
                    whileHover={{ y: -5, scale: 1.1, color: "#60A5FA" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <span className="inline-flex">
                {lastName.map((letter, index) => (
                  <motion.span
                    key={`last-${index}`}
                    variants={letterVariants}
                    className="inline-block hover:text-purple-400 transition-colors duration-300 cursor-default"
                    whileHover={{ y: -5, scale: 1.1, color: "#C084FC" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </div>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl sm:text-2xl text-gray-300 mb-8 space-y-2"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-blue-400">Computer Engineer</span>
              {" "}<span className="text-gray-400">|</span>{" "}
              <span className="text-purple-400">Author</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="text-lg text-gray-400"
            >
              Transforming ideas into elegant solutions
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: FaGithub, href: "https://github.com/Yashpatil88", label: "GitHub" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/yashspatil4779/", label: "LinkedIn" },
              { icon: FaEnvelope, href: "mailto:yashspatil4779@gmail.com", label: "Email" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="group relative text-white hover:text-blue-500 transform transition-all duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <social.icon className="h-8 w-8" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-sm transition-opacity duration-200">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
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
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;