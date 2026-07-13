import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="relative bg-slate-950 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              Selected work
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Recent projects
            </h2>
          </div>
          <p className="max-w-sm text-sm text-slate-400">
            A few highlights from my recent work — spanning product design,
            front-end engineering, and full-stack builds.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-900/20"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-white">
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
                  <a href={project.link} className="text-white hover:text-violet-400">
                    Live site ↗
                  </a>
                  <a href={project.repo} className="text-slate-400 hover:text-violet-400">
                    Source code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
