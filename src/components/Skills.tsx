import { skills } from "../data/portfolio";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <section id="skills" className="relative bg-slate-900/60 py-28">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Skills
          </span>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Tools & technologies I work with
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill.name}>

              {/* Top Row */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-white">
                  {skill.name}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {skill.category}
                </span>
              </div>

              {/* Progress Bar Background */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">

                {/* Animated Fill */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.4 }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                />

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}