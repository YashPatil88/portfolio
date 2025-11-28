"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      id="theme-toggle"
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 50,
        background: theme === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)",
        color: theme === "dark" ? "#fff" : "#222",
        borderRadius: "999px",
        padding: "0.5rem 1rem",
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "1rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        transition: "background 0.2s"
      }}
      onClick={toggleTheme}
    >
      Toggle {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
