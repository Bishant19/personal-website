import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  featured?: boolean;
}

const categories = [
  "All",
  "Interior Design",
  "Landscaping",
  "Automotive",
  "Graphic Design",
  "3D Rendering",
] as const;

const projects: Project[] = [
  {
    id: "living-room",
    title: "Modern Living Room Revamp",
    description:
      "A tired, cluttered living space reimagined with warm ambient lighting, tailored furniture, and a refined material palette.",
    category: "Interior Design",
    beforeImage: "/images/room-before.jpg",
    afterImage: "/images/room-after.jpg",
    featured: true,
  },
  {
    id: "garden",
    title: "Backyard Landscape Design",
    description:
      "An overgrown, neglected yard transformed into a lush, manicured retreat with stone pathways and vibrant planting.",
    category: "Landscaping",
    beforeImage: "/images/portrait-before.jpg",
    afterImage: "/images/portrait-after.jpg",
  },
  {
    id: "detailing",
    title: "Full Exterior Detailing",
    description:
      "Years of grime and dull paintwork corrected into a showroom-grade, mirror-like finish under studio lighting.",
    category: "Automotive",
    beforeImage: "/images/car-before.jpg",
    afterImage: "/images/car-after.jpg",
  },
  {
    id: "poster",
    title: "Event Poster Identity",
    description:
      "A flat, uninspired flyer draft rebuilt into a bold, colorful print piece with confident modern typography.",
    category: "Graphic Design",
    beforeImage: "/images/poster-before.jpg",
    afterImage: "/images/poster-after.jpg",
  },
  {
    id: "sneaker",
    title: "Product Render Finalization",
    description:
      "An untextured clay wireframe pushed to a photoreal, studio-lit render with true-to-life materials and reflections.",
    category: "3D Rendering",
    beforeImage: "/images/render-before.jpg",
    afterImage: "/images/render-after.jpg",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050308] text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0512] via-[#07040c] to-black" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-[36rem] w-[36rem] rounded-full bg-purple-700/25 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-10rem] top-1/4 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-8rem] right-0 h-[34rem] w-[34rem] rounded-full bg-cyan-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-blue-600/10 blur-[130px]" />

      <header className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
          <a href="/" className="font-display text-lg font-semibold tracking-tight text-white">
            Bishant<span className="text-violet-400">.</span> RB
          </a>
          <a
            href="/"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      <div id="top" className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
            Portfolio
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Before &amp;{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              After
            </span>{" "}
            Work
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
            Explore a growing collection of transformations. Drag the handle — or use your arrow keys — to reveal the after result on any project.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2.5"
        >
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/60 hover:text-white/90"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/80 to-cyan-600/80 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03]" />
                )}
                <span className="relative">{category}</span>
              </button>
            );
          })}
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                className={`rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl transition-colors hover:border-violet-400/30 sm:p-5 ${
                  project.featured ? "md:col-span-2 xl:col-span-2" : ""
                }`}
              >
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/50">
                    {project.category}
                  </span>
                </div>
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                  title={project.title}
                  description={project.description}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-20 text-center text-white/40">
            No projects found in this category yet.
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-24 flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-white/10 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-cyan-600/10 p-10 text-center backdrop-blur-xl sm:flex-row sm:text-left"
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Got a project in mind?</h2>
            <p className="mt-1 text-white/60">More case studies are added regularly — let's create the next transformation together.</p>
          </div>
          <a href="/#contact" className="shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition-transform hover:scale-105">
            Start a Project →
          </a>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-white/40"
        >
          Crafted with React, Tailwind CSS &amp; Framer Motion.
        </motion.footer>
      </div>
    </div>
  );
}