"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type StackGroup = {
  group: string;
  items: string[];
};

type SocialLink = {
  label: string;
  href: string;
};

const STACK: StackGroup[] = [
  { group: "Frontend",  items: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"] },
  { group: "Backend",   items: ["Node.js", "Express", "Go", "Python", "GraphQL"] },
  { group: "Database",  items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "MySQL"] },
  { group: "DevOps",    items: ["Docker", "AWS", "CI/CD", "Nginx", "Linux"] },
  { group: "Minecraft", items: ["MCBE Addons", "Blockbench", "Molang", "Resource Packs", "Pixel Art"] },
];

const SOCIALS: SocialLink[] = [
  { label: "GitHub →",      href: "https://github.com/Hawariii" },
  { label: "LinkedIn →",    href: "#" },
  { label: "CurseForge →",  href: "https://www.curseforge.com" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  function up(delay: number) {
    return {
      initial: { opacity: 0, y: 16 },
      animate: inView ? { opacity: 1, y: 0 } : {},
      transition: { delay, duration: 0.45 },
    };
  }

  return (
    <section id="about" ref={ref} className="border-t border-border">
      <div className="section-wrap">
        <p className="font-mono text-[11px] text-muted mb-2"> 01 about</p>
        <h2 className="text-3xl font-semibold tracking-tight mb-10">Who I am</h2>

        <div className="grid md:grid-cols-[1fr_320px] gap-12">

          <motion.div className="space-y-4 text-sm text-soft leading-[1.85]" {...up(0.1)}>
            <p>
              I&apos;m{" "}
              <span className="text-white font-medium">Aizhu Hawari</span>
              {" "}— a vibe coder and fullstack developer from Jakarta. I specialize in
              shipping fast, clean, and scalable products end-to-end.
            </p>
            <p>
              On the side, I spend a lot of time in the Minecraft toolchain — building{" "}
              <span className="text-white">Bedrock Edition addons</span> with custom
              entities, biomes, and game mechanics, plus hand-crafting{" "}
              <span className="text-white">texture packs</span> pixel by pixel in Blockbench.
            </p>
            <p>
              Good code and good textures share the same principle: intentional, clean,
              and built to last.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {SOCIALS.map((s) => (
                
                <a href={s.href}
                  key={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] px-3 py-1.5 border border-border text-muted hover:border-white hover:text-white transition-all rounded-sm"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div className="space-y-5" {...up(0.2)}>
            {STACK.map((s) => (
              <div key={s.group}>
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-2">
                  {s.group}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[11px] px-2.5 py-1 bg-subtle border border-border text-soft hover:text-white hover:border-soft transition-colors rounded-sm cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}