import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { portfolioData } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ArrowDown, Mail } from "lucide-react";

const roles = ["IT Student", "Data Analyst", "Python Developer", "Problem Solver"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isReducedMotion = useReducedMotion();

  // GSAP Entrance Timeline
  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1 } });

      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: 15,
        filter: "blur(4px)",
        duration: 0.8,
      })
      .from(".hero-title-line", {
        y: "110%",
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
      }, "-=0.5")
      .from(".hero-desc", {
        opacity: 0,
        y: 20,
        filter: "blur(6px)",
        duration: 1,
      }, "-=0.8")
      .from(".hero-buttons", {
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.8,
      }, "-=0.6");
    }, heroRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Framer motion interval for roles
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(roleInterval);
  }, []);

  const handleScrollToWork = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden bg-black text-center"
    >
      {/* Background Grid Lines & Noise */}
      <div className="noise-bg opacity-40 absolute inset-0" />

      {/* Subtle Blue/Indigo Glowing Gradient Fallbacks */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-[#4E85BF] opacity-10 blur-[120px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center gap-6 md:gap-8 mt-12">

        {/* Eyebrow */}
        <div className="hero-eyebrow overflow-hidden">
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-accent-blue bg-white/5 px-4 py-1.5 rounded-full border border-stroke/40 uppercase">
            IT STUDENT &middot; DATA ANALYST
          </span>
        </div>

        {/* Large Editorial Name Heading */}
        <div className="overflow-hidden py-2 select-none">
          <h1
            ref={titleRef}
            className="hero-title-line fluid-heading text-text font-bold"
          >
            {portfolioData.personalInfo.name}
          </h1>
        </div>

        {/* Supporting Headline / Carousel text */}
        <div className="hero-desc flex flex-col gap-4 max-w-2xl text-center">
          <h2 className="text-xl md:text-2xl text-text leading-snug font-medium">
            I turn data into useful insights and ideas into working software.
          </h2>

          <div className="flex items-center justify-center gap-2 text-base md:text-lg text-muted min-h-[32px]">
            <span>An</span>
            <div className="relative w-40 h-8 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {!isReducedMotion ? (
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute font-serif-italic text-lg md:text-xl font-semibold blue-gradient-text"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                ) : (
                  <span className="absolute font-serif-italic text-lg md:text-xl font-semibold blue-gradient-text">
                    {roles[roleIndex]}
                  </span>
                )}
              </AnimatePresence>
            </div>
            <span>based in Stuttgart.</span>
          </div>

          <p className="text-sm md:text-base text-muted/90 max-w-lg mx-auto leading-relaxed mt-2">
            {portfolioData.personalInfo.availability}. I build practical projects with Python, data analysis, web scraping, automation, and modern web technologies.
          </p>
        </div>

        {/* Hero CTA Action Buttons */}
        <div className="hero-buttons flex flex-wrap gap-4 justify-center items-center mt-4">
          <button
            onClick={handleScrollToWork}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 bg-white text-black hover:bg-neutral-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2"
          >
            <span>View my work</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>

          <a
            href={`mailto:${portfolioData.personalInfo.email}`}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border border-stroke bg-surface hover:bg-surface-elevated hover:border-accent-blue/30 text-text cursor-pointer focus-visible:outline-none"
          >
            <Mail className="w-4 h-4 text-muted group-hover:text-accent-blue transition-colors" />
            <span>Let's connect</span>
          </a>
        </div>

      </div>

      {/* Editorial Bottom Anchor Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[10px] tracking-widest font-mono uppercase text-muted">Scroll to explore</span>
        <div className="w-[1px] h-6 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-accent-blue animate-bounce" />
        </div>
      </div>
    </section>
  );
}
