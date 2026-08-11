import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { portfolioData } from "../data/portfolio";
import type { Project } from "../data/portfolio";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isReducedMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }
    }
  };

  return (
    <motion.div
      variants={isReducedMotion ? undefined : cardVariants}
      className={`group relative rounded-2xl bg-surface border border-stroke/50 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-accent-blue/30 ${
        project.size === "large" ? "md:col-span-2" : "md:col-span-1"
      }`}
    >
      {/* Background radial gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Decorative Grid Line System on background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Main card inner layout */}
      <div className="p-8 relative z-10 flex flex-col justify-between h-full min-h-[340px]">

        {/* Top Header details */}
        <div>
          <div className="flex justify-between items-start gap-4 mb-4">
            <span className="text-[10px] tracking-wider font-mono text-accent-blue bg-accent-blue/5 border border-accent-blue/20 px-2.5 py-1 rounded-full uppercase">
              {project.metric || "Practical exploration"}
            </span>

            {/* Visual Action Icons */}
            <div className="flex gap-2.5">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-stroke/60 bg-white/5 hover:bg-white/10 text-muted hover:text-text transition-colors focus-visible:outline-none"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                {/* SVG Fallback for Github in lucide-react v1+ */}
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              {project.liveDemoUrl && project.liveDemoUrl !== "#" && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-stroke/60 bg-white/5 hover:bg-white/10 text-muted hover:text-text transition-colors focus-visible:outline-none"
                  aria-label={`View ${project.title} live deployment`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-text group-hover:text-accent-blue transition-colors duration-300 tracking-tight">
            {project.title}
          </h3>
          <span className="text-xs text-muted block mt-1 font-mono tracking-tight">{project.tagline}</span>
          <p className="text-sm text-muted/90 mt-3 leading-relaxed max-w-xl">
            {project.description}
          </p>
        </div>

        {/* Dynamic visual representation box (charts, tables, data flows) */}
        <div className="my-6 rounded-xl border border-stroke/40 bg-black/40 p-4 relative overflow-hidden group-hover:border-accent-blue/10 transition-colors">
          {/* Subtle graph element visual representations */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-muted/60 uppercase tracking-widest">Analytics Pipeline Sandbox</span>
          </div>

          {project.insights && project.insights.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {project.insights.map((insight, id) => (
                <div key={id} className="flex items-center gap-2 text-xs text-muted/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue/60" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1 w-full">
              <div className="h-2 w-3/4 bg-stroke rounded-full overflow-hidden">
                <div className="h-full blue-gradient w-1/2 group-hover:w-full transition-all duration-1000" />
              </div>
              <div className="h-2 w-1/2 bg-stroke rounded-full overflow-hidden">
                <div className="h-full blue-gradient w-1/3 group-hover:w-3/4 transition-all duration-1000" />
              </div>
            </div>
          )}
        </div>

        {/* Bottom tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] tracking-wide font-mono px-2.5 py-1 rounded-md border border-stroke/60 bg-black/40 text-muted/90 hover:text-text transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>

      {/* Decorative gradient indicator at the bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function Projects() {
  const isReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <section
      id="work"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-black border-t border-stroke/30 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* Editorial Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stroke/20 pb-10">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase font-mono">
              [ PORTFOLIO PROJECT MATRIX ]
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
              Selected projects
            </h2>
          </div>
          <span className="text-xs text-muted/60 font-mono hidden md:block">
            HEILBRONN &middot; GERMANY &middot; VG
          </span>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={isReducedMotion ? undefined : containerVariants}
          initial={isReducedMotion ? undefined : "hidden"}
          whileInView={isReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {portfolioData.projects.map((proj, idx) => (
            <ProjectCard key={proj.id} project={proj} index={idx} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
