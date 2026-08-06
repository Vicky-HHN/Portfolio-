import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolio";
import type { ExplorationItem } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { X, Code, Terminal, BarChart2, Eye } from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Explorations() {
  const [selectedItem, setSelectedItem] = useState<ExplorationItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  // Scroll Trigger Parallax Rotation & Pinning
  useEffect(() => {
    if (isReducedMotion) return;

    const cards = gsap.utils.toArray(".exploration-card") as HTMLElement[];

    const ctx = gsap.context(() => {
      // Pin exploration gallery section and slide cards with rotation
      gsap.fromTo(cards,
        {
          y: 60,
          rotate: (i) => (i % 2 === 0 ? -2 : 2),
        },
        {
          y: -40,
          rotate: (i) => (i % 2 === 0 ? 1 : -1),
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Handle lightbox escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="explorations"
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[#050505] border-t border-stroke/30 overflow-hidden"
    >
      <div ref={triggerRef} className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* Gallery Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stroke/20 pb-10">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase font-mono">
              [ TECHNICAL EXPERIMENTS ]
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
              Technical explorations
            </h2>
          </div>
          <span className="text-xs text-muted/50 font-mono hidden md:block">
            INTERACTIVE LIGHTBOX &middot; GSAP SCROLL
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.explorations.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="exploration-card group relative p-6 rounded-xl bg-surface border border-stroke/50 hover:border-accent-blue/30 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
            >
              {/* Corner Ambient Glow */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-blue/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] tracking-wider font-mono text-muted/60 uppercase">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-stroke/60 flex items-center justify-center text-muted group-hover:text-accent-blue transition-colors">
                    {item.codeSnippet ? <Code className="w-4 h-4" /> : <BarChart2 className="w-4 h-4" />}
                  </div>
                </div>

                <h3 className="text-base font-bold text-text group-hover:text-accent-blue transition-colors duration-200 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-muted/80 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-1.5 mt-4 text-[10px] font-mono text-muted/50 group-hover:text-accent-blue transition-colors">
                <Eye className="w-3.5 h-3.5" />
                <span>EXPAND CODE / VISUAL</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Overlay (Accessible, Framer Motion) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl rounded-2xl border border-stroke bg-surface-elevated overflow-hidden shadow-2xl relative"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between p-6 border-b border-stroke bg-black/20">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono tracking-wider text-accent-blue uppercase">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-text">
                    {selectedItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-lg border border-stroke bg-white/5 hover:bg-white/10 text-muted hover:text-text transition-colors focus-visible:outline-none"
                  aria-label="Close Lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto font-sans">
                {selectedItem.codeSnippet ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted/60 font-mono">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Python Shell Sandbox</span>
                    </div>
                    <pre className="p-4 rounded-xl bg-[#030303] border border-stroke text-xs md:text-sm font-mono text-text overflow-x-auto leading-relaxed">
                      <code>{selectedItem.codeSnippet}</code>
                    </pre>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {/* SVG abstract visual representation */}
                    <div className="h-48 rounded-xl border border-stroke/40 bg-black/60 relative overflow-hidden flex items-center justify-center">
                      <div className="noise-bg opacity-30 absolute inset-0" />

                      {selectedItem.visualizationType === "cloud" ? (
                        <svg className="w-32 h-32 text-accent-blue/40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="50" cy="35" r="8" />
                          <circle cx="25" cy="65" r="8" />
                          <circle cx="75" cy="65" r="8" />
                          <path d="M50 43 v14 M25 57 L45 40 M75 57 L55 40" strokeDasharray="3 3" />
                        </svg>
                      ) : (
                        <svg className="w-48 h-32 text-accent-blue/30" viewBox="0 0 200 100">
                          <path d="M10 80 Q 50 10, 100 50 T 190 20" fill="none" stroke="currentColor" strokeWidth="2" />
                          <path d="M10 80 Q 50 40, 100 20 T 190 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                          <circle cx="100" cy="50" r="4" fill="currentColor" />
                          <circle cx="145" cy="35" r="4" fill="currentColor" />
                        </svg>
                      )}
                    </div>
                  </div>
                )}

                <p className="text-sm md:text-base text-muted/90 mt-6 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Modal Footer Info */}
              <div className="p-4 bg-black/10 border-t border-stroke text-center">
                <span className="text-[10px] font-mono text-muted/40">
                  ESC to close &middot; Click outside to dismiss
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
