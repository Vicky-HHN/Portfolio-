import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { portfolioData } from "../data/portfolio";
import { Award, Globe } from "lucide-react";

export default function Skills() {
  const isReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const groupVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-stroke/30 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#4E85BF] opacity-[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-xl border-b border-stroke/20 pb-10">
          <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase font-mono">
            [ SKILL MATRIX ]
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
            Technical skills
          </h2>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={isReducedMotion ? undefined : containerVariants}
          initial={isReducedMotion ? undefined : "hidden"}
          whileInView={isReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {portfolioData.skillsData.map((group) => (
            <motion.div
              key={group.category}
              variants={isReducedMotion ? undefined : groupVariants}
              className="flex flex-col gap-4 p-8 rounded-2xl bg-surface border border-stroke/40 hover:border-accent-blue/15 transition-colors duration-300 relative group"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center font-mono text-[10px] text-muted/30 group-hover:text-accent-blue transition-colors">
                //
              </div>

              <h3 className="text-lg font-bold text-text uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                {group.category}
              </h3>

              {/* Skill Pill badges */}
              <div className="flex flex-wrap gap-2.5 mt-2">
                {group.skills.map((skillName) => (
                  <div
                    key={skillName}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-stroke/50 hover:border-accent-blue/30 transition-all duration-300 text-xs text-text/90 font-medium"
                  >
                    <span>{skillName}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications & Languages Dual Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">

          {/* Certifications Block */}
          <div className="md:col-span-7 p-8 rounded-2xl bg-surface border border-stroke/40 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-text uppercase tracking-wider font-mono flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-blue" />
              Certifications
            </h3>
            <div className="flex flex-col gap-3.5">
              {portfolioData.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-muted/95 leading-relaxed">
                  <span className="text-accent-blue mt-1 font-mono text-xs">0{idx + 1}.</span>
                  <p>{cert}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Block */}
          <div className="md:col-span-5 p-8 rounded-2xl bg-surface border border-stroke/40 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-text uppercase tracking-wider font-mono flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent-blue" />
              Languages
            </h3>
            <div className="flex flex-col gap-4">
              {portfolioData.languages.map((lang, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-stroke/60 bg-black/40 hover:border-accent-blue/20 transition-all duration-300">
                  <span className="text-xs md:text-sm font-semibold text-text">{lang.split(" — ")[0]}</span>
                  <span className="text-xs font-mono text-muted">{lang.split(" — ")[1]}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
