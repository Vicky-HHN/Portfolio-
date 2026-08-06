import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { portfolioData } from "../data/portfolio";
import { BookOpen, Calendar, Clock } from "lucide-react";

export default function Journal() {
  const isReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
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
      id="journal"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-black border-t border-stroke/30 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* Editorial Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stroke/20 pb-10">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase font-mono">
              [ REFLECTIONS & INSIGHTS ]
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
              Recent learning
            </h2>
          </div>
          <span className="text-xs text-muted/50 font-mono hidden md:block">
            CONTINUOUS SKILL VALIDATION &middot; JOURNAL
          </span>
        </div>

        {/* Journals Grid */}
        <motion.div
          variants={isReducedMotion ? undefined : containerVariants}
          initial={isReducedMotion ? undefined : "hidden"}
          whileInView={isReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {portfolioData.journal.map((item) => (
            <motion.div
              key={item.id}
              variants={isReducedMotion ? undefined : cardVariants}
              className="group relative p-8 rounded-2xl bg-surface border border-stroke/40 hover:border-accent-blue/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[250px]"
            >
              {/* Radial glow background hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

              {/* Top details bar */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-[10px] tracking-wider font-mono text-accent-blue bg-accent-blue/5 px-2.5 py-1 rounded-full border border-accent-blue/20 uppercase">
                    {item.category}
                  </span>

                  <div className="flex items-center gap-3 text-xs text-muted/60 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.readingTime}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-text group-hover:text-accent-blue transition-colors duration-200 tracking-tight leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-muted/80 mt-3 leading-relaxed max-w-xl">
                  {item.summary}
                </p>
              </div>

              {/* Non-clickable placeholder indicator at the bottom */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-stroke/20 text-xs text-muted/50 group-hover:text-accent-blue/60 transition-colors">
                <BookOpen className="w-4 h-4" />
                <span className="font-mono text-[11px]">Draft entry &middot; Click disabled</span>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
