import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="relative bg-slate-900/60 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Experience
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Where I've worked
          </h2>
        </div>

        <div className="relative border-l border-white/10 pl-8">
          {experience.map((item, index) => (
            <div key={item.role} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[2.35rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-slate-950 bg-violet-500" />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-display text-lg font-semibold text-white">
                  {item.role} · <span className="text-violet-300">{item.company}</span>
                </h3>
                <span className="text-sm font-medium text-slate-500">{item.period}</span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
              {index !== experience.length - 1 && null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
