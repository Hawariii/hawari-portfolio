"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Social = {
  icon: string;
  label: string;
  handle: string;
  href: string;
};

const SOCIALS: Social[] = [
  { icon: "GH", label: "github",     handle: "@Hawariii",     href: "https://github.com/Hawariii" },
  { icon: "LI", label: "linkedin",   handle: "/in/hawari",    href: "#" },
  { icon: "CF", label: "curseforge", handle: "Hawari addons", href: "https://www.curseforge.com" },
  { icon: "@",  label: "email",      handle: "hawari@dev.id", href: "mailto:hawari@dev.id" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  function up(delay: number) {
    return {
      initial: { opacity: 0, y: 14 },
      animate: inView ? { opacity: 1, y: 0 } : {},
      transition: { delay, duration: 0.45 },
    };
  }

  return (
    <section id="contact" ref={ref} className="border-t border-border">
      <div className="section-wrap">
        <p className="font-mono text-[11px] text-muted mb-2"> 04 contact</p>
        <h2 className="text-3xl font-semibold tracking-tight mb-3">
          Let&apos;s talk
        </h2>
        <p className="text-sm text-muted max-w-sm leading-relaxed mb-10">
          Open to fulltime roles, freelance projects, and Minecraft collabs.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          <motion.form onSubmit={handleSubmit} className="space-y-4" {...up(0.1)}>
            <div>
              <label className="font-mono text-[10px] text-muted uppercase tracking-widest block mb-1.5">
                name
              </label>
              <input
                type="text"
                required
                placeholder="your name"
                suppressHydrationWarning
                className="w-full bg-surface border border-border rounded-sm px-4 py-2.5 text-sm font-mono text-white placeholder:text-muted/40 focus:outline-none focus:border-soft transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] text-muted uppercase tracking-widest block mb-1.5">
                email
              </label>
              <input
                type="email"
                required
                placeholder="you@email.com"
                suppressHydrationWarning
                className="w-full bg-surface border border-border rounded-sm px-4 py-2.5 text-sm font-mono text-white placeholder:text-muted/40 focus:outline-none focus:border-soft transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] text-muted uppercase tracking-widest block mb-1.5">
                message
              </label>
              <textarea
                rows={4}
                required
                placeholder="what's up?"
                suppressHydrationWarning
                className="w-full bg-surface border border-border rounded-sm px-4 py-2.5 text-sm font-mono text-white placeholder:text-muted/40 focus:outline-none focus:border-soft transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              suppressHydrationWarning
              className={`w-full font-mono text-xs py-3 rounded-sm font-semibold transition-all ${
                sent
                  ? "bg-subtle border border-border text-soft"
                  : "bg-white text-bg hover:bg-soft"
              }`}
            >
              {sent ? "✓ sent!" : "send message →"}
            </button>
          </motion.form>

          <motion.div className="space-y-2.5" {...up(0.2)}>
            {SOCIALS.map((s) => (
              
                <a
                href={s.href}
                key={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg hover:border-soft transition-all group"
              >
                <span className="font-mono text-xs w-6 h-6 border border-border rounded flex items-center justify-center text-muted group-hover:border-soft group-hover:text-white transition-all shrink-0">
                  {s.icon}
                </span>
                <div>
                  <p className="font-mono text-[10px] text-muted uppercase tracking-widest">
                    {s.label}
                  </p>
                  <p className="text-sm text-white">{s.handle}</p>
                </div>
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}