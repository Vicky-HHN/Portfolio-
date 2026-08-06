import { useEffect, useState } from "react";
import Lenis from "lenis";
import { useScrollSpy } from "./hooks/useScrollSpy";

// Components
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Journal from "./components/Journal";
import Explorations from "./components/Explorations";
import Stats from "./components/Stats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Active section tracking for navbar ScrollSpy
  const activeSection = useScrollSpy(["home", "about", "work", "skills", "journal", "explorations", "contact"]);

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
            <Projects />
            <Skills />
            <Journal />
            <Explorations />
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
