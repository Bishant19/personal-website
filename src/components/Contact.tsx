import { useState, type FormEvent } from "react";
import { socialLinks } from "../data/portfolio";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="relative bg-slate-900/60 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              Contact
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Let's Co-Create something Inspiring together
            </h2>
            <p className="mt-5 max-w-md text-slate-400">
              Have a project in mind, or just want to say hello? My inbox is
              always open. I'll try my best to get back to you within a
              day or two.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-3 text-slate-300 hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-violet-300">
                  ✉
                </span>
                {socialLinks.email}
              </a>
              <p className="flex items-center gap-3 text-slate-300">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-violet-300">
                  📍
                </span>
                Nuwakot, Nepal
              </p>
            </div>

            <div className="mt-10 flex gap-4">
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
                  className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-violet-400 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-violet-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-violet-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Message
              </label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-violet-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:scale-[1.02] hover:bg-violet-500"
            >
              {status === "sent" ? "Message sent ✓" : "Send message"}
            </button>
            {status === "sent" && (
              <p className="text-center text-sm text-emerald-400">
                Thanks for reaching out! I'll get back to you soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
