import { motion, Variants } from "framer-motion";
import { projects } from "../data/portfolio";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
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

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="relative bg-slate-950 py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              Selected work
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Recent projects
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="max-w-sm text-sm text-slate-400"
          >
            A few highlights from my recent work — spanning product design,
            front-end engineering, and full-stack builds.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={cardVariant}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-900/20"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-violet-300">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-4 border-t border-white/10 pt-4 text-sm font-medium">
                  <motion.a
                    href={project.link}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-white hover:text-violet-400"
                  >
                    Live site ↗
                  </motion.a>
                  <motion.a
                    href={project.repo}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-slate-400 hover:text-violet-400"
                  >
                    Source code
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}