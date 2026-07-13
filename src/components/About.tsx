const stats = [
  { label: "Years of experience", value: "6+" },
  { label: "Projects delivered", value: "40+" },
  { label: "Happy clients", value: "25+" },
  { label: "Cups of coffee", value: "∞" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-slate-950 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            About me
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Designing and building products with purpose
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div className="space-y-5 text-slate-400">
            <p>
              I'm a graphics designer and full-stack developer based in San
              Francisco, with a passion for turning complex problems into
              simple, elegant interfaces. Over the past five years I've
              worked with startups and established companies to design and
              ship products that people genuinely enjoy using.
            </p>
            <p>
              My approach blends strategic thinking with hands-on craft — I
              like to be involved from early research and wireframes all the
              way through to writing production code. That end-to-end
              perspective helps me build things that are not just beautiful,
              but also technically sound and maintainable.
            </p>
            <p>
              When I'm not designing or coding, you'll find me hiking,
              experimenting with film photography, or mentoring aspiring
              designers in my community.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition-colors hover:border-violet-500/40"
              >
                <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
