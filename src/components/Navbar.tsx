import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Dynamic scrolling elevations above 80px threshold
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home", id: "home", target: undefined },
    { label: "About", href: "#about", id: "about", target: undefined },
    { label: "Experience", href: "#experience", id: "experience", target: undefined },
    { label: "Education", href: "#education", id: "education", target: undefined },
    { label: "Work", href: "#work", id: "work", target: undefined },
    { label: "Skills", href: "#skills", id: "skills", target: undefined },
    { label: "Contact", href: `mailto:${portfolioData.personalInfo.email}`, id: "contact", target: undefined },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    if (item.target === "_blank") return;
    if (item.href.startsWith("mailto:")) return;

    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(item.href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={isReducedMotion ? {} : { y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      {/* Floating Pill Nav with dynamic scrolling shadows */}
      <div
        className={`w-full max-w-3xl glass-panel rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between transition-all duration-500 ${
          isScrolled
            ? "shadow-[0_20px_40px_rgba(0,0,0,0.7),0_0_1px_rgba(137,170,204,0.2)] border-accent-blue/20 bg-black/90 backdrop-blur-xl"
            : "border-stroke/50 bg-black/40"
        }`}
      >
        {/* Logo Icon */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, { label: "Home", href: "#home", id: "home", target: undefined })}
          className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none"
          aria-label="Scroll to top"
        >
          <motion.div
            whileHover={isReducedMotion ? {} : { scale: 1.08, rotate: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-9 h-9 rounded-full border border-stroke flex items-center justify-center bg-surface relative overflow-hidden"
          >
            {/* Ambient hover gradient shift */}
            <span className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-dark-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="font-serif-italic text-sm text-text group-hover:text-accent-blue transition-colors font-bold z-10">
              {portfolioData.personalInfo.initials}
            </span>
          </motion.div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1.5 relative">
          {navItems.map((item) => {
            const isResume = item.target === "_blank";
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                onClick={(e) => handleLinkClick(e, item)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all duration-300 relative focus-visible:outline-none ${
                  isActive
                    ? "text-accent-blue font-semibold"
                    : "text-muted hover:text-text"
                }`}
              >
                {/* Smooth shared slide pill indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="absolute inset-0 bg-white/5 border border-white/5 rounded-full z-0"
                  />
                )}
                <span className="relative z-10 flex items-center gap-0.5">
                  {item.label}
                  {isResume && <ArrowUpRight className="w-3 h-3 text-muted/80" />}
                </span>
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 text-muted hover:text-text rounded-full hover:bg-white/5 transition-colors focus-visible:outline-none"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-20 left-4 right-4 z-40 glass-panel rounded-2xl p-6 flex flex-col gap-4 border-stroke/80 bg-black/95 shadow-2xl"
          >
            {navItems.map((item) => {
              const isResume = item.target === "_blank";
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.target}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`text-sm py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-accent-blue bg-white/5 font-semibold"
                      : "text-muted hover:text-text hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  {isResume && <ArrowUpRight className="w-4 h-4" />}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
