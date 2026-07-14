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
            Designing visual experiences that tell meaningful stories
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div className="space-y-5 text-slate-400">
            <p>
              I'm a Multimedia Artist with over 6 years of experiences in
              video editing, visual design and digital content creation. I  
              specialize in crafting visually compelling narratives that connect
              brands with their audiences.
            </p>
            <p>
              My approach blends creativity, strategy, and technical execution 
              — Whether it's a dynamic social media reel, a cinematic edit, logo
              design & animation, or branded digital content, my goal is simple:
              create work that resonates and inspires.
            </p>
            <p>
              I ensure every project meets both aesthetic and performance goals.
              I don’t just create content — I craft experiences that engage, inspire, 
              and deliver results.
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
