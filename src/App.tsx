import { useEffect, useState } from "react";
import Lenis from "lenis";
import { useScrollSpy } from "./hooks/useScrollSpy";

// Components
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Stats from "./components/Stats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// We keep clean one-page navigation with explicit anchors
const SCROLL_SPY_SECTIONS = ["home", "about", "experience", "education", "work", "skills", "contact"];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Active section tracking for navbar ScrollSpy
  const activeSection = useScrollSpy(SCROLL_SPY_SECTIONS);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-black text-text selection:bg-accent-blue/30 selection:text-text antialiased">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="animate-fade-in duration-500">
          {/* Main Layout Overlay Navigation */}
          <Navbar activeSection={activeSection} />

          {/* Individual One-Page Sections */}
          <main>
            <Hero />
            <About />
            <Experience />
            <Education />
            <Projects />
            <Skills />
            <Stats />
            <Contact />
          </main>

          {/* Footer details */}
          <Footer />
        </div>
      )}
    </div>
  );
}
