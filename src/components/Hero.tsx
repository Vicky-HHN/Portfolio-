import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { portfolioData } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ArrowDown, Mail } from "lucide-react";

const roles = ["Data Analyst", "BI Developer", "Python Developer", "Data Engineer"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isReducedMotion = useReducedMotion();

  // GSAP Entrance Timeline for a truly high-end editorial stagger intro
  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: 20,
        filter: "blur(6px)",
        duration: 1,
      })
      .from(".hero-title-line", {
        y: "115%",
        opacity: 0,
        stagger: 0.15,
        duration: 1.4,
      }, "-=0.7")
      .from(".hero-desc", {
        opacity: 0,
        y: 25,
        filter: "blur(8px)",
        duration: 1.2,
      }, "-=0.9")
      .from(".hero-buttons", {
        opacity: 0,
        y: 15,
        stagger: 0.12,
        duration: 1,
      }, "-=0.7");
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
      <div className="noise-bg opacity-30 absolute inset-0 z-0" />

      {/* Slow rotating/pulsating ambient background gradient sphere */}
      {!isReducedMotion && (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: ["-50%", "-45%", "-50%"],
            y: ["-50%", "-53%", "-50%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 left-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] rounded-full bg-gradient-to-br from-accent-blue/15 to-accent-dark-blue/5 opacity-40 blur-[130px] pointer-events-none z-0"
        />
      )}

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center gap-6 md:gap-8 mt-12">

        {/* Eyebrow */}
        <div className="hero-eyebrow overflow-hidden">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-accent-blue bg-white/5 px-4.5 py-2 rounded-full border border-stroke/40 uppercase font-mono">
            M.Sc. Software Engineering & Management &middot; Data Analyst & BI Developer
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
            I work across data analysis and data engineering &ndash; from raw data and ETL pipelines to Power BI dashboards and decision-ready insights.
          </h2>

          <div className="flex items-center justify-center gap-2 text-base md:text-lg text-muted min-h-[32px]">
            <span>A</span>
            <div className="relative w-40 h-8 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {!isReducedMotion ? (
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ y: 15, opacity: 0, filter: "blur(2px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -15, opacity: 0, filter: "blur(2px)" }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="absolute font-serif-italic text-lg md:text-xl font-bold blue-gradient-text"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                ) : (
                  <span className="absolute font-serif-italic text-lg md:text-xl font-bold blue-gradient-text">
                    {roles[roleIndex]}
                  </span>
                )}
              </AnimatePresence>
            </div>
            <span>based in Germany.</span>
          </div>

          <p className="text-xs md:text-sm text-muted/80 max-w-xl mx-auto leading-relaxed mt-2 font-mono uppercase tracking-wide">
            {portfolioData.personalInfo.note}
          </p>
        </div>

        {/* Hero CTA Action Buttons with micro-scale springs */}
        <div className="hero-buttons flex flex-wrap gap-4 justify-center items-center mt-4">
          <motion.button
            onClick={handleScrollToWork}
            whileHover={isReducedMotion ? {} : { scale: 1.05 }}
            whileTap={isReducedMotion ? {} : { scale: 0.98 }}
            className="group relative inline-flex items-center gap-2 px-6.5 py-3 rounded-full text-sm font-semibold transition-all duration-300 bg-white text-black hover:bg-neutral-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2"
          >
            <span>View my projects</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </motion.button>

          <motion.a
            href={`mailto:${portfolioData.personalInfo.email}`}
            whileHover={isReducedMotion ? {} : { scale: 1.05 }}
            whileTap={isReducedMotion ? {} : { scale: 0.98 }}
            className="group inline-flex items-center gap-2 px-6.5 py-3 rounded-full text-sm font-semibold transition-all duration-300 border border-stroke bg-surface hover:bg-surface-elevated hover:border-accent-blue/30 text-text cursor-pointer focus-visible:outline-none"
          >
            <Mail className="w-4 h-4 text-muted group-hover:text-accent-blue transition-colors" />
            <span>Get in touch</span>
          </motion.a>
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
