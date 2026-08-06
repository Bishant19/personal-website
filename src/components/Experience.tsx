import { motion, Variants } from "framer-motion";
import { experience } from "../data/portfolio";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="relative bg-slate-900/60 py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 max-w-2xl"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-widest text-violet-400"
          >
            Experience
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl"
          >
            Where I've worked
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative border-l border-white/10 pl-8"
        >
          {experience.map((item) => (
            <motion.div
              key={item.role}
              variants={itemVariant}
              className="relative pb-12 last:pb-0"
            >
              <motion.span
                className="absolute -left-[2.35rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-slate-950 bg-violet-500"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(139,92,246,0.5)",
                    "0 0 0 8px rgba(139,92,246,0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-display text-lg font-semibold text-white">
                  {item.role} ·{" "}
                  <span className="text-violet-300">{item.company}</span>
                </h3>
                <span className="text-sm font-medium text-slate-500">
                  {item.period}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}