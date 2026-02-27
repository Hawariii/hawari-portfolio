"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import projectsData from "@/data/projects.json";

type WebProject = {
  id:          number;
  title:       string;
  description: string;
  tech:        string[];
  github:      string;
  live:        string;
  image:       string;
};

type MinecraftProject = {
  id:          number;
  title:       string;
  description: string;
  type:        string;
  version:     string;
  curseforge:  string;
  image:       string;
};

const TABS = ["web", "minecraft"] as const;
type Tab   = (typeof TABS)[number];

export default function Projects() {
  const [tab, setTab] = useState<Tab>("web");
  const ref    = useRef(null);
  useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="projects" ref={ref} className="border-t border-border">
      <div className="section-wrap">
        <p className="font-mono text-[11px] text-muted mb-2">02 projects</p>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            What I&apos;ve built
          </h2>
          <div className="flex gap-1.5">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                suppressHydrationWarning
                className={`font-mono text-[11px] px-4 py-1.5 rounded-sm border transition-all ${
                  tab === t
                    ? "border-white text-white bg-subtle"
                    : "border-border text-muted hover:border-soft hover:text-soft"
                }`}
              >
                {t === "web" ? "web apps" : "minecraft mods"}
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <AnimatePresence mode="wait">
            {tab === "web" ? (
              <motion.div
                key="web"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {(projectsData.web as WebProject[]).map((p, i) => (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-soft transition-all duration-300"
                  >
                    <div className="relative h-40 bg-subtle overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover grayscale opacity-60 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-[11px] text-muted">□ {p.title}</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-1.5 group-hover:text-white transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed mb-3">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] px-1.5 py-0.5 bg-subtle border border-border text-muted rounded-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {p.live && (
                          
                          <a href={p.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[11px] px-3 py-1 border border-border text-muted hover:border-white hover:text-white transition-all rounded-sm"
                          >
                            live ↗
                          </a>
                        )}
                        {p.github && (
                          
                           <a href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[11px] px-3 py-1 border border-border text-muted hover:border-soft hover:text-soft transition-all rounded-sm"
                          >
                            github
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="minecraft"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {(projectsData.minecraft as MinecraftProject[]).map((p, i) => (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-soft transition-all duration-300"
                  >
                    <div className="relative h-40 bg-subtle overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover grayscale opacity-60 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-[11px] text-muted">⬛ {p.title}</span>
                      </div>
                      <span className="absolute top-2.5 left-2.5 font-mono text-[9px] px-2 py-0.5 bg-bg/80 border border-border text-muted rounded-sm backdrop-blur-sm">
                        {p.type}
                      </span>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-semibold text-sm group-hover:text-white transition-colors">
                          {p.title}
                        </h3>
                        <span className="font-mono text-[10px] text-muted shrink-0">
                          v{p.version}
                        </span>
                      </div>
                      {p.description && (
                        <p className="text-xs text-muted leading-relaxed mb-4">
                          {p.description}
                        </p>
                      )}
                      {p.curseforge && (
                        
                        <a href={p.curseforge}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] px-3 py-1 border border-border text-muted hover:border-white hover:text-white transition-all rounded-sm inline-block"
                        >
                          curseforge ↗
                        </a>
                      )}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}