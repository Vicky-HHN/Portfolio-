import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Analyze", "Build", "Improve"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [counter, setCounter] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const isReducedMotion = useReducedMotion();

  // Handle counter counting up
  useEffect(() => {
    let animationFrameId: number;
    // Premium loading duration matching 2.2s to 2.7s duration
    const duration = isReducedMotion ? 1200 : 2400;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Premium cubic ease-out calculation for smooth non-linear increment speed
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const nextCount = Math.floor(easeProgress * 100);

      setCounter(nextCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        // Complete loading
        setCounter(100);
        setTimeout(() => {
          onComplete();
        }, 400); // Wait 400ms after reaching 100 before removing overlay
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete, isReducedMotion]);

  // Cycle through words smoothly
  useEffect(() => {
    if (isReducedMotion) return;
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 750);

    return () => clearInterval(wordInterval);
  }, [isReducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black p-8 md:p-16 select-none font-sans"
    >
      {/* Top Section */}
      <div className="flex justify-between items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[10px] md:text-xs tracking-widest text-muted uppercase font-mono"
        >
          Vishva Gandhi &middot; Ingestion Engine
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[10px] md:text-xs text-muted font-mono uppercase"
        >
          Heilbronn, DE
        </motion.div>
      </div>

      {/* Center Word Animation */}
      <div className="flex flex-col items-center justify-center">
        <div className="h-20 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isReducedMotion ? (
              <motion.span
                key={words[wordIndex]}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-bold font-serif-italic blue-gradient-text drop-shadow-[0_0_15px_rgba(137,170,204,0.15)]"
              >
                {words[wordIndex]}
              </motion.span>
            ) : (
              <span className="text-4xl md:text-6xl font-bold font-serif-italic blue-gradient-text">
                Analyze
              </span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Progress Bar & Counter with Ambient Pulsating Glow */}
      <div className="flex flex-col gap-5 w-full max-w-xl mx-auto relative">
        <div className="flex justify-between items-end text-sm">
          <motion.span
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-muted text-[10px] font-mono tracking-[0.2em]"
          >
            INITIALIZING REPORTING ENV...
          </motion.span>
          <span className="font-mono text-4xl font-semibold text-text tabular-nums tracking-tight">
            {String(counter).padStart(3, "0")}%
          </span>
        </div>

        {/* Progress Bar Container with accent shadow */}
        <div className="h-[3px] w-full bg-stroke rounded-full overflow-hidden relative shadow-[0_0_12px_rgba(78,133,191,0.1)]">
          <div
            className="h-full blue-gradient origin-left transition-transform duration-75 ease-out shadow-[0_0_8px_#89AACC]"
            style={{ transform: `scaleX(${counter / 100})` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
