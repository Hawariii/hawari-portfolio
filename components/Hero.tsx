"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "Fullstack Developer",
  "Vibe Coder",
  "Minecraft Addon Maker",
  "Texture Pack Artist",
];

function useTypewriter(words: string[]) {
  const [idx, setIdx]         = useState(0);
  const [text, setText]       = useState("");
  const [deleting, setDelete] = useState(false);

  useEffect(() => {
    const word  = words[idx];
    const speed = deleting ? 30 : 65;

    const t = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length)
          setTimeout(() => setDelete(true), 1600);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDelete(false);
          setIdx((i) => (i + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(t);
  }, [text, deleting, idx, words]);

  return text;
}

export default function Hero() {
  const role = useTypewriter(ROLES);

  const fadeUp = (delay: number) => ({
    initial:    { opacity: 0, y: 14 },
    animate:    { opacity: 1, y: 0 },
    transition: { delay, duration: 0.45 },
  });

  return (
    <section className="min-h-screen flex items-center px-6">
      <div className="max-w-[1060px] mx-auto w-full pt-16">
        <div className="grid md:grid-cols-[1fr_380px] gap-14 items-center">

          {/* Left */}
          <div>
            <motion.p
              {...fadeUp(0.1)}
              className="font-mono text-[11px] text-muted mb-5 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              available · Jakarta, Indonesia
            </motion.p>

            <motion.h1
              {...fadeUp(0.2)}
              className="text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[0.97] tracking-tighter mb-4"
            >
              Aizhu<br />
              <span className="text-soft">Hawari</span>
            </motion.h1>

            <motion.div
              {...fadeUp(0.3)}
              className="font-mono text-xs text-muted h-5 mb-7"
            >
              {role}
              <span className="animate-blink text-white ml-px">|</span>
            </motion.div>

            <motion.p
              {...fadeUp(0.35)}
              className="text-sm text-soft leading-relaxed max-w-[400px] mb-9"
            >
              I build scalable web apps and craft Minecraft worlds.
              Code is my medium — whether it&apos;s a REST API or a Bedrock addon.
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="flex gap-3 flex-wrap">
              
              <a href="#projects"
                className="px-5 py-2 bg-white text-bg font-mono text-xs font-semibold hover:bg-soft transition-colors rounded-sm"
              >
                view work
              </a>
              
              <a href="#contact"
                className="px-5 py-2 border border-border font-mono text-xs text-muted hover:border-soft hover:text-white transition-all rounded-sm"
              >
                get in touch
              </a>
            </motion.div>

            <motion.div
              {...fadeUp(0.5)}
              className="flex gap-8 mt-12 pt-8 border-t border-border"
            >
              {[
                ["5+",  "years exp"      ],
                ["40+", "projects"       ],
                ["2k+", "mc downloads"   ],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="font-mono text-xl font-semibold text-white">{num}</p>
                  <p className="font-mono text-[10px] text-muted mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-surface border border-border rounded-xl overflow-hidden font-mono text-[11px]"
          >
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-subtle">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="text-muted text-[10px] ml-auto">~/hawari — zsh</span>
            </div>

            <div className="p-5 space-y-1.5 leading-relaxed">
              <p><span className="text-soft">❯</span> cat info.json</p>
              <p className="text-muted pl-3">name:   <span className="text-white">&quot;Aizhu Hawari&quot;</span></p>
              <p className="text-muted pl-3">role:   <span className="text-white">&quot;Fullstack Dev&quot;</span></p>
              <p className="text-muted pl-3">hobby:  <span className="text-white">&quot;Minecraft Modding&quot;</span></p>
              <p className="text-muted pl-3">status: <span className="text-white">&quot;open to work&quot;</span></p>

              <p className="mt-3"><span className="text-soft">❯</span> ls ./stack</p>
              <p className="text-muted pl-3">Next.js · Node.js · Go · PostgreSQL</p>
              <p className="text-muted pl-3">TypeScript · Docker · Redis · AWS</p>

              <p className="mt-3"><span className="text-soft">❯</span> git log --oneline -2</p>
              <p className="pl-3">
                <span className="text-soft">a3f2c1</span>
                <span className="text-muted"> feat: portfolio v3 deployed</span>
              </p>
              <p className="pl-3">
                <span className="text-soft">9b1e45</span>
                <span className="text-muted"> fix: optimize db queries</span>
              </p>

              <p className="mt-3">
                <span className="text-soft">❯</span>
                <span className="animate-blink text-white"> _</span>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}