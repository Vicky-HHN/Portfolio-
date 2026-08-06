import { portfolioData } from "../data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "GitHub", href: portfolioData.personalInfo.github },
    { label: "LinkedIn", href: portfolioData.personalInfo.linkedin },
    { label: "Email", href: `mailto:${portfolioData.personalInfo.email}` },
    { label: "Resume", href: portfolioData.personalInfo.resume, target: "_blank" },
  ];

  return (
    <footer className="relative py-12 px-6 md:px-12 bg-[#050505] border-t border-stroke/30 text-xs text-muted/80">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Availability Pulsing Dot Indicator */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </div>
          <span className="font-mono text-[11px] tracking-wide uppercase text-text/90 font-medium">
            {portfolioData.personalInfo.availability}
          </span>
        </div>

        {/* Dynamic Social Links */}
        <div className="flex flex-wrap items-center gap-5 justify-center">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.target ? "noreferrer" : undefined}
              className="hover:text-accent-blue transition-colors flex items-center gap-0.5 relative group focus-visible:outline-none"
            >
              <span>{link.label}</span>
              {link.target === "_blank" && (
                <ArrowUpRight className="w-3 h-3 text-muted/50 group-hover:text-accent-blue transition-colors" />
              )}
            </a>
          ))}
        </div>

      </div>

      {/* Copy & Location bar */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-stroke/10 text-muted/50 text-[10px] font-mono uppercase tracking-widest">
        <span>Stuttgart, Baden-Württemberg, Germany</span>
        <span>&copy; {currentYear} {portfolioData.personalInfo.name}. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
