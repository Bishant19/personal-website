import { socialLinks } from "../data/portfolio";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-start overflow-hidden bg-slate-950 pt-20 pb-8"
    >
      {/* Background decor */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl"
          animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-10 md:grid-cols-[1.2fr_1fr]">
        {/* LEFT — text */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-violet-300"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-emerald-400"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0.6, 1],
                boxShadow: [
                  "0 0 0 0 rgba(52,211,153,0.7)",
                  "0 0 12px 4px rgba(52,211,153,0.55)",
                  "0 0 0 0 rgba(52,211,153,0.7)",
                ],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            Available for new projects
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Hi, I'm Bishant —
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% auto" }}
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              Multimedia Artist &amp; Video Editor
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
          >
            I a'm a creative Multimedia Artist with inovative ideas &amp; a
            passion for bringing brilliant contents that reaches and inspires
            people.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(139,92,246,0.7)]"
            >
              {/* light sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
              />
              <span className="relative">View my work</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              href="#contact"
              className="group relative overflow-hidden rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-violet-400/70 hover:bg-white/5 hover:shadow-[0_0_16px_rgba(168,85,247,0.45)]"
            >
              {/* light sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
              />
              <span className="relative">Get in touch</span>
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex items-center gap-6"
          >
            {[
              { href: socialLinks.github, label: "GitHub" },
              { href: socialLinks.linkedin, label: "LinkedIn" },
              { href: socialLinks.twitter, label: "Twitter" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-sm font-medium text-slate-500 transition-colors hover:text-white"
              >
                {s.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <motion.div
            className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-violet-500/40 to-fuchsia-500/40 blur-2xl"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/images/New Avatar.jpg"
              alt="Portrait of Bishant 19"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
            className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-slate-900/90 px-5 py-4 shadow-xl backdrop-blur"
          >
            <motion.p
              className="text-2xl font-bold text-white"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              6+
            </motion.p>
            <p className="text-xs font-medium text-slate-400">Years experience</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}