import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "../utils/cn";

const links = [
  { href: "#about", label: "About" },
  { href: "#Services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#portfolio-teaser", label: "Portfolio" },
];

/* ------------------------------------------------------------------ *
 * "Let's talk" — a beam of light sweeps across the pill on hover
 * ------------------------------------------------------------------ */
const ctaVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { type: "spring", stiffness: 400, damping: 20 } },
};

const sweep = {
  rest: { x: "0%", skewX: -45, opacity: 0, transition: { duration: 0 } },
  hover: {
    x: "450%",
    skewX: -45,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function CtaButton() {
  return (
    <motion.a
      href="#contact"
      variants={ctaVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: 0.97 }}
      className="group relative overflow-hidden rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-colors duration-300 hover:bg-violet-500 hover:shadow-[0_0_28px_-4px_rgba(139,92,246,0.75)]"
    >
      {/* light beam — sweeps left to right on hover */}
      <motion.span
        variants={sweep}
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
      />
      Let&apos;s talk
    </motion.a>
  );
}

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
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 500, damping: 12 }}
              className="text-sm font-medium text-slate-300 transition-[color,filter] duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(167,139,250,0.6)]"
            >
              {link.label}
            </motion.a>
          ))}
          <CtaButton />
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
