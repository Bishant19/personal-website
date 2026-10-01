import { socialLinks } from "../data/portfolio";
import { motion, useScroll, useTransform } from "framer-motion";

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

/* The portrait dissolves into the page instead of ending on a hard cut.
   Opaque to 55%, then fades to nothing by 97%. Lower the first stop
   (e.g. 70%) if you want more of the body visible. */
const DISSOLVE =
  "linear-gradient(to bottom, #000 0%, #000 55%, rgba(0,0,0,0.72) 76%, rgba(0,0,0,0) 97%)";

export default function Hero() {
  const { scrollY } = useScroll();
  // portrait drifts up slightly as you scroll — cheap depth, no library
  const portraitY = useTransform(scrollY, [0, 600], [0, -60]);

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
              className="h-2 w-2 rounded-full bg-emerald-300"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0.6, 1],
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
            I'm a creative Multimedia Artist with inovative ideas &amp; a
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
              { href: socialLinks.instagram, label: "Instagram" },
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

        {/* RIGHT — portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full"
        >
          {/* Ambient halo — now barely a whisper. Set both rgba alphas to 0
              (or delete this block) to remove it entirely. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-3 blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(139,92,246,0.05), rgba(217,70,239,0.02) 50%, rgba(0,0,0,0) 70%)",
            }}
            animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* scroll parallax — scroll-driven only, no idle movement.
              The old `animate={{ y: [0, -8, 0] }}` float loop is gone. */}
          <motion.div style={{ y: portraitY }} className="relative">
            <div className="relative">
              {/* Silhouette glow — a filter, so it follows the alpha channel and
                  never draws a rectangle. Cut 0.42 → 0.16 → 0.10.
                  Set filter to "none" to remove completely. */}
              <div
                className="relative"
                style={{
                  filter:
                    "drop-shadow(0 16px 34px rgba(139,92,246,0.10)) drop-shadow(0 -4px 16px rgba(217,70,239,0.05))",
                }}
              >
                <img
                  src="/images/New%20PP%20Avatar.png"
                  alt="Portrait of Bishant"
                  className="h-auto w-full origin-bottom scale-[1.15]"
                  style={{
                    // grade it into the page's palette instead of leaving it
                    // looking like a sticker pasted on top
                    filter:
                      "contrast(1.07) saturate(1.12) brightness(0.93)",
                    WebkitMaskImage: DISSOLVE,
                    maskImage: DISSOLVE,
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Stat badge — glass card with a gradient hairline border.
              Position (-bottom-6 -left-6) and padding (px-5 py-4) are exactly
              as you had them. No bounce, no harsh glow. */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
            className="absolute -bottom-6 -left-6"
          >
            {/* whisper of light under the card — was 0.32, which read as a
                harsh purple blob. 0.09 now; delete this div to remove. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-[1.5rem] blur-lg"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, rgba(139,92,246,0.09), rgba(217,70,239,0.03) 55%, transparent 76%)",
              }}
            />

            {/* 1px gradient shell, card inset inside it = gradient hairline */}
            <div className="relative rounded-2xl bg-gradient-to-br from-violet-400/70 via-white/15 to-fuchsia-400/60 p-px shadow-2xl">
              <div className="relative rounded-[15px] bg-slate-900/85 px-5 py-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  {/* matches the pulsing dot in "Available for new projects" */}
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400/75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
                  </span>
                  <div>
                    <p className="text-2xl font-bold leading-none text-white">
                      6+
                    </p>
                    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Years experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}