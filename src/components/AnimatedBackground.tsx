"use client";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  // Generate random stars
  const stars = Array.from({ length: 120 }, (_, i) => ({
    cx: Math.random() * 1440,
    cy: Math.random() * 900,
    r: Math.random() * 1.2 + 0.3,
    opacity: Math.random() * 0.7 + 0.3,
    twinkle: Math.random() > 0.5
  }));

  return (
    <motion.svg
      width="100vw"
      height="100vh"
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(ellipse at center, #050517 0%, #000000 100%)"
      }}
      aria-hidden="true"
    >
      {/* Nebula effect */}
      <motion.ellipse
        cx={720}
        cy={450}
        rx={420}
        ry={180}
        fill="url(#nebulaGradient)"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Twinkling stars */}
      {stars.map((star, i) => (
        <motion.circle
          key={i}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill="#fff"
          initial={{ opacity: star.opacity }}
          animate={star.twinkle ? { opacity: [star.opacity, 1, star.opacity] } : { opacity: star.opacity }}
          transition={star.twinkle ? { duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" } : undefined}
        />
      ))}
      {/* Colorful galaxy blobs */}
      <motion.ellipse
        cx={400}
        cy={200}
        rx={120}
        ry={60}
        fill="url(#blob1)"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse
        cx={1100}
        cy={700}
        rx={100}
        ry={50}
        fill="url(#blob2)"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <defs>
        <radialGradient id="nebulaGradient" cx="0" cy="0" r="1" gradientTransform="translate(720 450) scale(420 180)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="1" stopColor="#23234a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blob1" cx="0" cy="0" r="1" gradientTransform="translate(400 200) scale(120 60)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F472B6" stopOpacity="0.5" />
          <stop offset="1" stopColor="#23234a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blob2" cx="0" cy="0" r="1" gradientTransform="translate(1100 700) scale(100 50)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399" stopOpacity="0.5" />
          <stop offset="1" stopColor="#23234a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}

