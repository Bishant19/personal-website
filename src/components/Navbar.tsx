import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

const links = [
  { href: "#about", label: "About" },
  { href: "#Services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#portfolio-teaser", label: "Portfolio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll(); // sync immediately (handles page load with a #hash)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#0a0714]/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      {/* Compact bar: py-3 instead of py-4 → ~60px tall instead of ~90px */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#home" className="font-display text-lg font-semibold tracking-tight text-white">
          Bishant<span className="text-violet-400">.</span> RB
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:scale-105 hover:bg-violet-500"
          >
            Let's talk
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#0a0714]/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-violet-600 px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Let's talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
