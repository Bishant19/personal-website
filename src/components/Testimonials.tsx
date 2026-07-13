import { testimonials } from "../data/portfolio";

export default function Testimonials() {
  return (
    <section className="relative bg-slate-950 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Testimonials
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            What people say
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8"
            >
              <svg
                className="mb-4 h-8 w-8 text-violet-500/50"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36 1 24.416 4.284 28 8.844 28c4.288 0 7.36-3.456 7.36-7.744 0-4.288-2.936-7.24-6.4-7.24-.712 0-1.68.144-1.968.288.784-4.288 4.784-9.328 8.784-11.888L9.352 4zm18.024 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.056 3.284 8.64 7.844 8.64 4.288 0 7.36-3.456 7.36-7.744 0-4.288-2.936-7.24-6.4-7.24-.712 0-1.68.144-1.968.288.784-4.288 4.784-9.328 8.784-11.888L27.376 4z" />
              </svg>
              <blockquote className="flex-1 text-sm leading-relaxed text-slate-300">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
