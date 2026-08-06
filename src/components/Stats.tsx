import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { portfolioData } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Stats() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-20 px-6 md:px-12 bg-black border-t border-b border-stroke/30 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={isReducedMotion ? undefined : containerVariants}
          initial={isReducedMotion ? undefined : "hidden"}
          whileInView={isReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {portfolioData.statistics.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={isReducedMotion ? undefined : itemVariants}
              className="flex flex-col gap-2 p-6 md:p-8 bg-surface rounded-2xl border border-stroke/40 text-center relative overflow-hidden group hover:border-accent-blue/20 transition-all duration-300"
            >
              {/* Top border ambient highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <span className="text-4xl md:text-5xl font-bold text-text group-hover:text-accent-blue transition-colors duration-300 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-muted font-mono tracking-wider uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
