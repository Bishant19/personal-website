import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PortfolioTeaser() {
  return (
    <section id="portfolio-teaser" className="relative pt-24 pb-8 px-6">
      <div className="mx-auto max-w-[68rem]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 via-slate-950/60 to-fuchsia-950/40 p-12 sm:p-20 text-center backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-500/30 blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-[100px]" />

          <motion.div
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 rounded-3xl border border-violet-400/30 shadow-[0_0_60px_rgba(139,92,246,0.3)]"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              Portfolio
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">Want to see my portfolio?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              Explore before &amp; after transformations across multimedia, design, and creative direction — see the craft up close.
            </p>

            <Link
              to="/portfolio"
              onClick={() => window.scrollTo(0, 0)}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition-transform hover:scale-105"
            >
              Click here
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}