"use client";
import { useCallback, useEffect, useRef } from "react";

const COLORS = ["#3B82F6", "#8B5CF6", "#F472B6", "#F59E42", "#34D399"];
const PARTICLE_COUNT = 60;

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function ParticlesBG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: random(0, w),
      y: random(0, h),
      r: random(1.5, 3.5),
      dx: random(-0.5, 0.5),
      dy: random(-0.5, 0.5),
      color: COLORS[Math.floor(random(0, COLORS.length))]
    }));

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
        if (ctx) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.7;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  useEffect(() => {
    drawParticles();
    window.addEventListener("resize", drawParticles);
    return () => window.removeEventListener("resize", drawParticles);
  }, [drawParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
