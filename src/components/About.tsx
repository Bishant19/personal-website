import { motion } from "framer-motion";

const stats = [
  { label: "Years of experience", value: "6+" },
  { label: "Projects delivered", value: "40+" },
  { label: "Happy clients", value: "25+" },
  { label: "Cups of coffee", value: "∞" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const statVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function About() {
  return (
    <section id="about" className="relative bg-slate-950 py-28">
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
            About me
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl"
          >
            Designing visual experiences that tell meaningful stories
          </motion.h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          {/* Text */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-5 text-slate-400"
          >
            <motion.p variants={fadeUp}>
              I'm a Multimedia Artist with over 6 years of experiences in video
              editing, visual design and digital content creation. I specialize
              in crafting visually compelling narratives that connect brands
              with their audiences.
            </motion.p>
            <motion.p variants={fadeUp}>
              My approach blends creativity, strategy, and technical execution —
              Whether it's a dynamic social media reel, a cinematic edit, logo
              design & animation, or branded digital content, my goal is simple:
              create work that resonates and inspires.
            </motion.p>
            <motion.p variants={fadeUp}>
              I ensure every project meets both aesthetic and performance goals.
              I don't just create content — I craft experiences that engage,
              inspire, and deliver results.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={statVariant}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition-colors hover:border-violet-500/40"
              >
                <p className="font-display text-3xl font-bold text-white transition-colors group-hover:text-violet-300 sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}