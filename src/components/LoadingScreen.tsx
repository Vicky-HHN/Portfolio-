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
    const duration = isReducedMotion ? 1200 : 2300; // slightly shorter if reduced motion preferred
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth non-linear progress
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

  // Cycle through words
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 700);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black p-8 md:p-16 select-none font-sans">
      {/* Top Section */}
      <div className="flex justify-between items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-widest text-muted uppercase"
        >
          Lukas Weber &middot; Portfolio Ingestion
        </motion.div>
        <div className="text-xs text-muted font-mono uppercase">
          Stuttgart, DE
        </div>
      </div>

      {/* Center Word Animation */}
      <div className="flex flex-col items-center justify-center">
        <div className="h-16 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isReducedMotion ? (
              <motion.span
                key={words[wordIndex]}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-4xl md:text-5xl font-semibold font-serif-italic blue-gradient-text"
              >
                {words[wordIndex]}
              </motion.span>
            ) : (
              <span className="text-4xl md:text-5xl font-semibold font-serif-italic blue-gradient-text">
                {words[wordIndex]}
              </span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Progress Bar & Counter */}
      <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
        <div className="flex justify-between items-end text-sm">
          <span className="text-muted text-xs tracking-wider">BOOTING SYSTEM...</span>
          <span className="font-mono text-3xl font-semibold text-text tabular-nums">
            {String(counter).padStart(3, "0")}
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="h-[2px] w-full bg-stroke rounded-full overflow-hidden">
          <div
            className="h-full blue-gradient origin-left transition-transform duration-75 ease-out"
            style={{ transform: `scaleX(${counter / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}
