import { socialLinks } from "../data/portfolio";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 pt-24"
    >
      {/* Background decor */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-16 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-violet-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Available for new projects
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Hi, I'm Bishant —
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              Multimedia Artist &amp; Video Editor
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            I a'm a creative Multimedia Artist with inovative
            ideas &amp; a passion for bringing brilliant contents  that reaches
            and inspires people.
            
            
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:scale-105 hover:bg-violet-500"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            {[
              { href: socialLinks.github, label: "GitHub" },
              { href: socialLinks.linkedin, label: "LinkedIn" },
              { href: socialLinks.twitter, label: "Twitter" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-slate-500 transition-colors hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-violet-500/40 to-fuchsia-500/40 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl">
            <img
              src="/images/New Avatar.jpg"
              alt="Portrait of Bishant 19"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-slate-900/90 px-5 py-4 shadow-xl backdrop-blur">
            <p className="text-2xl font-bold text-white">6+</p>
            <p className="text-xs font-medium text-slate-400">Years experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}
