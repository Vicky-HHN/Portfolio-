import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { portfolioData } from "../data/portfolio";
import { Briefcase, MapPin, Calendar, CheckSquare } from "lucide-react";

export default function Experience() {
  const isReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-black border-t border-stroke/30 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stroke/20 pb-10">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase font-mono">
              [ PROFESSIONAL JOURNEY ]
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
              Experience
            </h2>
          </div>
          <span className="text-xs text-muted/50 font-mono hidden md:block">
            DATA ANALYSIS &middot; DATA ENGINEERING
          </span>
        </div>

        {/* Experience Cards */}
        <motion.div
          variants={isReducedMotion ? undefined : containerVariants}
          initial={isReducedMotion ? undefined : "hidden"}
          whileInView={isReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-8"
        >
          {portfolioData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={isReducedMotion ? undefined : itemVariants}
              className="group relative p-8 md:p-10 rounded-2xl bg-surface border border-stroke/50 hover:border-accent-blue/30 transition-all duration-300"
            >
              {/* Glowing decorative border corner effect */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">

                {/* Title & Company */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-stroke flex items-center justify-center text-accent-blue">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text group-hover:text-accent-blue transition-colors duration-200">
                        {exp.title}
                      </h3>
                      <span className="text-sm text-muted font-medium">
                        {exp.company}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date & Location */}
                <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2 font-mono text-xs text-muted/80">
                  <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-stroke/40">
                    <Calendar className="w-3.5 h-3.5 text-accent-blue/80" />
                    {exp.dates}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-muted/60" />
                    {exp.location}
                  </span>
                </div>

              </div>

              {/* Bullet Points */}
              <div className="flex flex-col gap-3">
                {exp.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3 text-sm md:text-base text-muted/95 leading-relaxed">
                    <CheckSquare className="w-4 h-4 text-accent-blue/70 mt-1 flex-shrink-0" />
                    <p>{bullet}</p>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
