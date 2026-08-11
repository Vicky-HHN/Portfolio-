import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { portfolioData } from "../data/portfolio";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export default function Education() {
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
      id="education"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[#050505] border-t border-stroke/30 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stroke/20 pb-10">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase font-mono">
              [ ACADEMIC BACKGROUND ]
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
              Education
            </h2>
          </div>
          <span className="text-xs text-muted/50 font-mono hidden md:block">
            SOFTWARE ENGINEERING &middot; IT ACADEMICS
          </span>
        </div>

        {/* Education timeline */}
        <motion.div
          variants={isReducedMotion ? undefined : containerVariants}
          initial={isReducedMotion ? undefined : "hidden"}
          whileInView={isReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {portfolioData.education.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={isReducedMotion ? undefined : itemVariants}
              className="group relative p-8 rounded-2xl bg-surface border border-stroke/40 hover:border-accent-blue/30 transition-all duration-300 flex flex-col justify-between min-h-[320px]"
            >
              {/* Top Details */}
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-stroke flex items-center justify-center text-accent-blue">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] tracking-wider font-mono text-accent-blue bg-accent-blue/5 border border-accent-blue/20 px-2.5 py-1 rounded-full uppercase">
                    {edu.gpa}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-text group-hover:text-accent-blue transition-colors duration-200 tracking-tight leading-snug">
                  {edu.degree}
                </h3>
                <span className="text-sm text-muted font-medium block mt-1">
                  {edu.school}
                </span>

                {/* Sub headers (Location & Dates) */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 font-mono text-xs text-muted/80">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-accent-blue/80" />
                    {edu.dates}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-muted/60" />
                    {edu.location}
                  </span>
                </div>
              </div>

              {/* Course Modules area */}
              <div className="mt-6 pt-4 border-t border-stroke/20">
                <span className="text-[10px] tracking-widest font-mono text-muted/50 uppercase block mb-2.5">
                  Key Modules
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {edu.modules.map((m) => (
                    <span
                      key={m}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-stroke/40 text-muted hover:text-text hover:border-stroke transition-colors"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
