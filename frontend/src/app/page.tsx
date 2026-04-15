"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Mail,
  Terminal,
  Briefcase,
  Code2,
  Send,
  Database,
  Cloud,
  Box,
  ArrowUp,
  Sun,
  Moon,
  X,
} from "lucide-react";

// Scroll Reveal Variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20, duration: 0.8 },
  },
};

export default function Home() {
  const [status, setStatus] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      // ⚠️ IMPORTANT: Replace this URL with your actual Render backend URL!
      const BACKEND_URL = "https://YOUR-RENDER-URL.onrender.com/api/contact";

      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("Success! Message sent.");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("Error sending message.");
      }
    } catch (err) {
      setStatus("Server is offline.");
    }
  };

  // Handle Scroll to Top Button Visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dynamic Theme Classes
  const themeBg = isDark ? "bg-[#050505]" : "bg-slate-50";
  const themeTextPrimary = isDark ? "text-white" : "text-slate-900";
  const themeTextSecondary = isDark ? "text-slate-400" : "text-slate-600";
  const themeCardBg = isDark
    ? "bg-black/60 border-white/5 shadow-2xl"
    : "bg-white/80 border-slate-200 shadow-xl";
  const themeOverlay = isDark ? "bg-black/80" : "bg-white/85";
  const themeInputBg = isDark
    ? "bg-black/50 border-white/10 text-white"
    : "bg-white border-slate-300 text-slate-900";

  return (
    <main
      className={`min-h-screen ${themeBg} font-sans relative overflow-x-hidden bg-cover bg-fixed bg-center bg-[url('/background.png')] transition-colors duration-500`}
    >
      {/* THEME OVERLAY */}
      <div
        className={`fixed inset-0 z-0 ${themeOverlay} pointer-events-none transition-colors duration-500`}
      ></div>

      {/* Top Gradient Glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-600/10 blur-[120px] pointer-events-none"></div>

      {/* --- NAVBAR --- */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 backdrop-blur-md border-b ${isDark ? "border-white/10 bg-black/50" : "border-slate-200 bg-white/70"} transition-colors duration-500`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className={`font-bold tracking-wider ${themeTextPrimary}`}>
            PA.
          </span>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            <a
              href="#home"
              className={`${themeTextSecondary} hover:text-yellow-500 transition-colors`}
            >
              Home
            </a>
            <a
              href="#experience"
              className={`${themeTextSecondary} hover:text-yellow-500 transition-colors`}
            >
              Experience
            </a>
            <a
              href="#projects"
              className={`${themeTextSecondary} hover:text-yellow-500 transition-colors`}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={`${themeTextSecondary} hover:text-yellow-500 transition-colors`}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* --- PROFILE PICTURE MODAL --- */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-lg">
          <button
            onClick={() => setIsProfileOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)]"
          >
            <Image
              src="/profile.jpeg"
              alt="Palak Agrawal"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* FIXED CONTROLS (Theme Toggle & Back to Top) */}
      <div className="fixed top-20 right-6 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-3 rounded-full backdrop-blur-md transition-all border ${isDark ? "bg-black/50 text-yellow-400 border-yellow-500/20 hover:bg-black/70" : "bg-white/80 text-yellow-600 border-yellow-500/30 hover:bg-white shadow-md"}`}
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${showTopBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      >
        <button
          onClick={scrollToTop}
          className="p-4 rounded-full bg-yellow-500 text-black hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20"
          aria-label="Scroll to Top"
        >
          <ArrowUp size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-6 pt-40 pb-32 space-y-40 relative z-10">
        {/* --- HERO SECTION --- */}
        <motion.section
          id="home"
          initial="hidden"
          animate="show"
          variants={sectionVariants}
          className="flex flex-col items-center text-center space-y-8"
        >
          <div
            className="relative mb-4 group cursor-pointer"
            onClick={() => setIsProfileOpen(true)}
          >
            <div
              className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 ${isDark ? "border-black" : "border-white"} shadow-2xl relative z-10 bg-[#0a0a0a]`}
            >
              <Image
                src="/profile.jpeg"
                alt="Palak Agrawal"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-[-8px] rounded-full border border-yellow-500/40 animate-[spin_10s_linear_infinite] pointer-events-none"></div>
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-black/40 backdrop-blur-sm">
              <span className="text-white text-xs font-bold uppercase tracking-wider">
                View
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-3 text-yellow-500 bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            <span className="text-xs font-mono tracking-widest uppercase font-bold">
              Open for opportunities
            </span>
          </div>

          <h1
            className={`text-6xl md:text-8xl font-extrabold tracking-tight pb-2 ${themeTextPrimary}`}
          >
            Palak Agrawal
          </h1>

          <p
            className={`text-xl md:text-2xl max-w-2xl leading-relaxed ${themeTextSecondary}`}
          >
            Backend Developer & SDE-1{" "}
            <span
              className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}
            >
              @ Truminds
            </span>
            . Specializing in .NET WebAPI architectures, Node.js microservices,
            and robust database design.
          </p>

          <div className="flex flex-col items-center gap-6 pt-4">
            <div className="flex gap-4">
              <a
                href="#contact"
                className="bg-yellow-500 text-black hover:bg-yellow-400 px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-yellow-500/20 hover:-translate-y-1"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className={`px-8 py-4 rounded-xl border transition-all font-semibold backdrop-blur-sm hover:-translate-y-1 ${isDark ? "bg-black/50 border-white/20 hover:bg-white/10 text-white" : "bg-white/50 border-slate-300 hover:bg-white text-slate-900 shadow-sm"}`}
              >
                View Work
              </a>
            </div>

            <div
              className={`flex items-center gap-6 mt-4 border-t pt-8 w-full justify-center ${isDark ? "border-white/10" : "border-slate-300"}`}
            >
              <a
                href="https://github.com/palakagr5"
                target="_blank"
                rel="noopener noreferrer"
                className={`${themeTextSecondary} hover:text-yellow-500 hover:-translate-y-1 transition-all flex items-center gap-2`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span className="text-sm font-mono font-semibold">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/YOUR-LINKEDIN"
                target="_blank"
                rel="noopener noreferrer"
                className={`${themeTextSecondary} hover:text-[#0a66c2] hover:-translate-y-1 transition-all flex items-center gap-2`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="text-sm font-mono font-semibold">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </motion.section>

        {/* --- EXPERIENCE & STACK --- */}
        <motion.section
          id="experience"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div
            className={`${themeCardBg} backdrop-blur-md rounded-3xl p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(234,179,8,0.15)] hover:border-yellow-500/50 group`}
          >
            <h3
              className={`text-sm font-mono uppercase mb-8 flex items-center gap-2 ${themeTextSecondary}`}
            >
              <Briefcase
                size={16}
                className="text-yellow-500 group-hover:scale-110 transition-transform"
              />{" "}
              Career Highlights
            </h3>
            <div
              className={`relative pl-6 before:absolute before:inset-0 before:ml-1.5 before:w-0.5 ${isDark ? "before:bg-white/10" : "before:bg-slate-200"}`}
            >
              <div className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-yellow-500 bg-yellow-500"></div>
              <p className={`font-bold text-xl ${themeTextPrimary}`}>
                SDE-1 (Backend)
              </p>
              <p className={`text-md mt-1 font-medium ${themeTextSecondary}`}>
                Truminds Software Systems
              </p>
              <div className="mt-4 space-y-2">
                <span className="inline-block text-xs font-bold text-black bg-yellow-500 px-3 py-1.5 rounded-lg shadow-sm shadow-yellow-500/20">
                  ⭐ 4.04 Outstanding Excellence Rating
                </span>
                <span
                  className={`block text-sm font-medium mt-2 ${themeTextSecondary}`}
                >
                  B.Tech (Chemical) - MNIT Jaipur
                </span>
              </div>
            </div>
          </div>

          <div
            className={`${themeCardBg} backdrop-blur-md rounded-3xl p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(234,179,8,0.15)] hover:border-yellow-500/50 group`}
          >
            <h3
              className={`text-sm font-mono uppercase mb-8 flex items-center gap-2 ${themeTextSecondary}`}
            >
              <Terminal
                size={16}
                className="text-yellow-500 group-hover:scale-110 transition-transform"
              />{" "}
              Core Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "C# / .NET Core",
                "Node.js / Express",
                "MSSQL / T-SQL",
                "PostgreSQL",
                "Elasticsearch (ELK)",
                "AWS / Azure",
                "Three.js",
                "Ruby on Rails",
              ].map((tech) => (
                <span
                  key={tech}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border cursor-default transition-all shadow-sm hover:-translate-y-1 ${isDark ? "bg-white/5 border-white/10 text-slate-200 hover:bg-yellow-500/20 hover:border-yellow-500/50 hover:text-yellow-400" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-yellow-100 hover:border-yellow-400 hover:text-yellow-700"}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- FEATURED PROJECTS --- */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="space-y-8"
        >
          <h3
            className={`text-sm font-mono uppercase flex items-center gap-2 ${themeTextSecondary}`}
          >
            <Code2 size={16} className="text-yellow-500" /> Engineering
            Portfolio
          </h3>

          <div className="grid grid-cols-1 gap-8">
            {/* Luminous Project */}
            <div
              className={`${themeCardBg} backdrop-blur-md rounded-3xl p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(234,179,8,0.15)] hover:border-yellow-500/50 group`}
            >
              <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/20 group-hover:bg-yellow-500/20 group-hover:scale-110 transition-all">
                <Database size={24} className="text-yellow-500" />
              </div>
              <h4
                className={`text-2xl font-bold mb-3 transition-colors ${themeTextPrimary}`}
              >
                Luminous API & Microservices
              </h4>
              <p
                className={`leading-relaxed mb-6 font-medium ${themeTextSecondary}`}
              >
                Spearheaded the migration of APIs from .NET Core to .NET WebAPI
                using a microservices architecture. Designed the Communication
                Module admin portal and implemented complex MSSQL stored
                procedures, triggers, and background jobs to optimize data flow.
                Successfully delivered end-to-end knowledge transfer for the
                Rewards Portal go-live.
              </p>
              <div className="flex flex-wrap gap-2">
                {[".NET WebAPI", "Microservices", "MSSQL", "C# / LINQ"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono font-bold text-yellow-600 bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Truminds EduTech Project */}
            <div
              className={`${themeCardBg} backdrop-blur-md rounded-3xl p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(234,179,8,0.15)] hover:border-yellow-500/50 group`}
            >
              <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/20 group-hover:bg-yellow-500/20 group-hover:scale-110 transition-all">
                <Cloud size={24} className="text-yellow-500" />
              </div>
              <h4
                className={`text-2xl font-bold mb-3 transition-colors ${themeTextPrimary}`}
              >
                EduTech Digital Platform
              </h4>
              <p
                className={`leading-relaxed mb-6 font-medium ${themeTextSecondary}`}
              >
                Engineered a horizontally scalable, serverless backend hosted on
                AWS using Node.js and Express. Integrated the ELK stack
                (Elasticsearch, Logstash, Kibana) for high-speed NoSQL search
                operations and data visualization. Configured WSO2 Identity
                Server for secure Oauth2 and OpenID authentication.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Node.js",
                  "AWS Serverless",
                  "Elasticsearch / Kibana",
                  "WSO2 Identity",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono font-bold text-yellow-600 bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Panasonic POC */}
            <div
              className={`${themeCardBg} backdrop-blur-md rounded-3xl p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(234,179,8,0.15)] hover:border-yellow-500/50 group`}
            >
              <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/20 group-hover:bg-yellow-500/20 group-hover:scale-110 transition-all">
                <Box size={24} className="text-yellow-500" />
              </div>
              <h4
                className={`text-2xl font-bold mb-3 transition-colors ${themeTextPrimary}`}
              >
                Panasonic 3D-Modelling Engine
              </h4>
              <p
                className={`leading-relaxed mb-6 font-medium ${themeTextSecondary}`}
              >
                Developed a proof-of-concept to programmatically convert 2D
                AutoCAD files (.dwg/.dxf) into web-ready 3D models (.gltf/.glb)
                utilizing Autodesk 3ds Max APIs. Integrated the Three.js library
                to render interactive 3D assets directly in the browser with
                JSON state-saving capabilities.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Three.js", "Autodesk API", "3D Rendering", "JSON"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono font-bold text-yellow-600 bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* --- CONTACT FORM --- */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className={`${themeCardBg} backdrop-blur-md rounded-3xl p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(234,179,8,0.15)] hover:border-yellow-500/50`}
        >
          <h3
            className={`text-sm font-mono uppercase mb-6 flex items-center gap-2 ${themeTextSecondary}`}
          >
            <Mail size={16} className="text-yellow-500" /> Let's Connect
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                name="name"
                placeholder="Name"
                className={`w-full rounded-xl p-4 outline-none focus:ring-2 focus:ring-yellow-500 transition-all font-medium ${themeInputBg} placeholder:text-slate-500`}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className={`w-full rounded-xl p-4 outline-none focus:ring-2 focus:ring-yellow-500 transition-all font-medium ${themeInputBg} placeholder:text-slate-500`}
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="How can I help?"
              className={`w-full rounded-xl p-4 h-32 outline-none focus:ring-2 focus:ring-yellow-500 transition-all resize-none font-medium ${themeInputBg} placeholder:text-slate-500`}
              required
            ></textarea>
            <button
              type="submit"
              disabled={status === "Sending..."}
              className="group w-full flex items-center justify-center gap-2 bg-yellow-500 text-black hover:bg-yellow-400 font-bold py-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20 hover:-translate-y-1"
            >
              {status || (
                <>
                  Send Message{" "}
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        </motion.section>
      </div>
    </main>
  );
}
