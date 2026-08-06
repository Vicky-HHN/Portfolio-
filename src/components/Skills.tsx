import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { portfolioData } from "../data/portfolio";

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
            Tools I use and skills I am developing.
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

              {/* Skill Pill badges with genuine skill levels */}
              <div className="flex flex-wrap gap-2.5 mt-2">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col gap-1 px-4 py-2.5 rounded-xl bg-black/40 border border-stroke/50 hover:border-accent-blue/30 transition-all duration-300 group/pill"
                  >
                    <span className="text-sm font-semibold text-text group-hover/pill:text-accent-blue transition-colors duration-200">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-muted/80 font-mono">
                      {skill.level}
                    </span>
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
