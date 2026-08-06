import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";
import BeforeAfterVideoSlider from "./BeforeAfterVideoSlider";

interface BaseProject {
  id: string;
  title: string;
  description: string;
  category: string;
  featured?: boolean;
}

interface ImageProject extends BaseProject {
  type: "image";
  beforeImage: string;
  afterImage: string;
}

interface VideoProject extends BaseProject {
  type: "video";
  beforeVideo: string;
  afterVideo: string;
}

type Project = ImageProject | VideoProject;

const categories = [
  "All",
  "VFX / Compositing",
  "Interior Design",
  "Landscaping",
  "Automotive",
  "Graphic Design",
  "3D Rendering",
] as const;

const projects: Project[] = [
  {
    id: "vfx-object-removal-1",
    type: "video",
    title: "Object Removal & Clean Plate",
    description:
      "Seamlessly removed a person from the background using rotoscoping and clean plate reconstruction — no trace left behind.",
    category: "VFX / Compositing",
    beforeVideo: "/video/vfx/vfx-1-before.mp4",
    afterVideo: "/video/vfx/vfx-1-after.mp4",
  },
  {
    id: "vfx-greenscreen-2",
    type: "video",
    title: "Complex Green Screen Removal",
    description:
      "Challenging keying work with fine detail preservation — clean composite pulled from difficult green screen footage.",
    category: "VFX / Compositing",
    beforeVideo: "/video/vfx/vfx-2-before.mp4",
    afterVideo: "/video/vfx/vfx-2-after.mp4",
  },
  {
    id: "living-room",
    type: "image",
    title: "Modern Living Room Revamp",
    description:
      "A tired, cluttered living space reimagined with warm ambient lighting, tailored furniture, and a refined material palette.",
    category: "Interior Design",
    beforeImage: "/images/room-before.jpg",
    afterImage: "/images/room-after.jpg",
  },
  {
    id: "garden",
    type: "image",
    title: "Backyard Landscape Design",
    description:
      "An overgrown, neglected yard transformed into a lush, manicured retreat with stone pathways and vibrant planting.",
    category: "Landscaping",
    beforeImage: "/images/portrait-before.jpg",
    afterImage: "/images/portrait-after.jpg",
  },
  {
    id: "detailing",
    type: "image",
    title: "Full Exterior Detailing",
    description:
      "Years of grime and dull paintwork corrected into a showroom-grade, mirror-like finish under studio lighting.",
    category: "Automotive",
    beforeImage: "/images/car-before.jpg",
    afterImage: "/images/car-after.jpg",
  },
  {
    id: "poster",
    type: "image",
    title: "Event Poster Identity",
    description:
      "A flat, uninspired flyer draft rebuilt into a bold, colorful print piece with confident modern typography.",
    category: "Graphic Design",
    beforeImage: "/images/poster-before.jpg",
    afterImage: "/images/poster-after.jpg",
  },
  {
    id: "sneaker",
    type: "image",
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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Flowing gradient background (matches Hero) */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 -left-32 h-[36rem] w-[36rem] rounded-full bg-violet-600/30 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 -right-40 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/20 blur-3xl"
          animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-violet-500/20 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.75, 0.95, 0.75] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 h-[24rem] w-[24rem] rounded-full bg-purple-600/15 blur-3xl"
          animate={{ scale: [1.05, 0.95, 1.05], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Grid overlay (matches Hero) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
          <a
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-white"
          >
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

      <div id="top" className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-10">
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
            <motion.span
              className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% auto" }}
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              After
            </motion.span>{" "}
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
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
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
                whileHover={{ y: -6 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl transition-colors hover:border-violet-400/40 hover:shadow-violet-900/30 sm:p-5"
              >
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/50">
                    {project.category}
                  </span>
                </div>
                {project.type === "video" ? (
                  <BeforeAfterVideoSlider
                    beforeVideo={project.beforeVideo}
                    afterVideo={project.afterVideo}
                    title={project.title}
                    description={project.description}
                  />
                ) : (
                  <BeforeAfterSlider
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                    title={project.title}
                    description={project.description}
                  />
                )}
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
          className="mt-24 flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-violet-400/20 bg-gradient-to-r from-violet-600/15 via-fuchsia-600/15 to-violet-600/15 p-10 text-center backdrop-blur-xl sm:flex-row sm:text-left"
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Got a project in mind?
            </h2>
            <p className="mt-1 text-white/60">
              More case studies are added regularly — let's create the next transformation together.
            </p>
          </div>
          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40"
          >
            Start a Project →
          </motion.a>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-white/40"
        >
          © 2026 Bishant Rajbhandari. All rights reserved.
        </motion.footer>
      </div>
    </div>
  );
}