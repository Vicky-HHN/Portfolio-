import { useState, useEffect } from "react";
import { portfolioData } from "../data/portfolio";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      {/* Floating Pill Nav */}
      <div
        className={`w-full max-w-3xl glass-panel rounded-full px-4 md:px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "shadow-lg border-stroke/80 bg-black/80 backdrop-blur-md" : "border-stroke/50 bg-black/50"
        }`}
      >
        {/* Logo Icon */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, { label: "Home", href: "#home", id: "home", target: undefined })}
          className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none"
          aria-label="Scroll to top"
        >
          <div className="w-9 h-9 rounded-full border border-stroke flex items-center justify-center bg-surface relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
            {/* Animated blue border on hover */}
            <span className="absolute inset-0 border border-transparent rounded-full group-hover:border-accent-blue/30 transition-colors" />
            <span className="font-serif-italic text-sm text-text group-hover:text-accent-blue transition-colors font-semibold">
              {portfolioData.personalInfo.initials}
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isResume = item.target === "_blank";
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                onClick={(e) => handleLinkClick(e, item)}
                className={`text-xs px-2.5 py-1.5 rounded-full font-medium transition-all duration-200 relative focus-visible:outline-none ${
                  isActive
                    ? "text-accent-blue bg-white/5"
                    : "text-muted hover:text-text hover:bg-white/5"
                }`}
              >
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

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 z-40 glass-panel rounded-2xl p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200 md:hidden border-stroke/80 bg-black/95">
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
                    ? "text-accent-blue bg-white/5"
                    : "text-muted hover:text-text hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
                {isResume && <ArrowUpRight className="w-4 h-4" />}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
