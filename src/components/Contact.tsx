import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { socialLinks } from "../data/portfolio";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    try {
      const formData = new URLSearchParams();
      formData.append("form-name", "contact");
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <section id="contact" className="relative bg-slate-900/60 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* LEFT — info */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-widest text-violet-400"
            >
              Contact
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl"
            >
              Let's Co-Create something Inspiring together
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md text-slate-400"
            >
              Have a project in mind, or just want to say hello? My inbox is
              always open. I'll try my best to get back to you within a day or
              two.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 space-y-4">
              <motion.a
                href={`mailto:${socialLinks.email}`}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center gap-3 text-slate-300 hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-violet-300">
                  ✉
                </span>
                {socialLinks.email}
              </motion.a>
              <p className="flex items-center gap-3 text-slate-300">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-violet-300">
                  📍
                </span>
                Nuwakot, Nepal
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex gap-4">
              {[
                { href: socialLinks.github, label: "GitHub" },
                { href: socialLinks.linkedin, label: "LinkedIn" },
                { href: socialLinks.twitter, label: "Twitter" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-violet-400 hover:text-white"
                >
                  {s.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.form
            onSubmit={handleSubmit}
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8"
          >
            {/* Hidden Netlify fields */}
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                type="text"
                name="name"
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
                name="email"
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
                name="message"
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-violet-500"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500"
            >
              {status === "sent" ? "Message sent ✓" : "Send message"}
            </motion.button>

            <AnimatePresence>
              {status === "sent" && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="text-center text-sm text-emerald-400"
                >
                  Thanks for reaching out! I'll get back to you soon.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}