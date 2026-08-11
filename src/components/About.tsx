import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { BarChart3, Terminal, Award } from "lucide-react";
import { portfolioData } from "../data/portfolio";

export default function About() {
  const isReducedMotion = useReducedMotion();

  const cards = [
    {
      title: "Data Analysis & BI",
      description: "Power BI dashboards, DAX, Power Query, KPI development, and translating data into decision-ready insights.",
      icon: BarChart3,
    },
    {
      title: "Data Engineering & Automation",
      description: "Python & SQL ETL/ELT pipelines, PostgreSQL, MongoDB, REST APIs, and large-scale data processing.",
      icon: Terminal,
    },
    {
      title: "AI & Continuous Learning",
      description: "LLM/AI evaluation, prompt engineering, deep learning, and ongoing learning in cloud, DevOps, and advanced software architecture.",
      icon: Award,
    }
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-stroke/30 overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-[#89AACC] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col gap-16 md:gap-20">

        {/* About Editorial Heading */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase font-mono">
              [ PROFILE SUMMARY ]
            </span>
            <span className="text-sm text-muted font-mono">
              {portfolioData.personalInfo.location}
            </span>
          </div>

          <div className="md:col-span-8 flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl text-text font-semibold leading-tight font-sans tracking-tight">
              About <span className="font-serif-italic font-medium text-accent-blue">me</span>
            </h2>

            <div className="flex flex-col gap-4 text-base md:text-lg text-muted/90 leading-relaxed max-w-3xl">
              <p>
                I am a M.Sc. Software Engineering & Management student at Hochschule Heilbronn with 1+ year of hands-on experience spanning both data analysis and data engineering. On the analytics side, I build Power BI dashboards, design data models, write DAX measures, and use Power Query to transform data for clear KPI reporting. On the engineering side, I automate ETL pipelines in Python and SQL, work with relational and cloud databases, and integrate data via REST APIs.
              </p>
              <p>
                I enjoy working across the full data lifecycle – from raw data, to automated pipeline, to polished dashboard – and I am comfortable evaluating and applying LLM/AI tools to real business processes. I am work-authorised in Germany and actively developing my German language skills.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Interactive Feature Cards */}
        <motion.div
          variants={isReducedMotion ? undefined : containerVariants}
          initial={isReducedMotion ? undefined : "hidden"}
          whileInView={isReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={isReducedMotion ? undefined : cardVariants}
                className="group relative flex flex-col gap-6 p-8 rounded-2xl bg-surface border border-stroke/50 hover:border-accent-blue/30 transition-all duration-300 hover:shadow-lg"
              >
                {/* Background overlay flash */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Animated top indicator pill */}
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-stroke/60 flex items-center justify-center text-muted group-hover:text-accent-blue group-hover:border-accent-blue/40 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex flex-col gap-2 relative z-10">
                  <h3 className="text-lg font-semibold text-text group-hover:text-accent-blue transition-colors duration-200">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card index counter on top corner */}
                <div className="absolute top-6 right-6 font-mono text-[10px] text-muted/40 font-bold">
                  0{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
