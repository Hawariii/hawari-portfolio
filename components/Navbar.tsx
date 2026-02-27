"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#about",    label: "about"    },
  { href: "#projects", label: "projects" },
  { href: "#github",   label: "github"   },
  { href: "#contact",  label: "contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur-sm border-b border-border" : ""
      }`}
    >
      <nav className="max-w-1060px mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-mono text-sm font-semibold text-white tracking-tight">
          hawari<span className="text-muted">.</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              
                <a href={l.href}
                className="font-mono text-xs text-muted hover:text-white transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            
             <a href="/resume.pdf"
              target="_blank"
              className="font-mono text-xs px-3 py-1.5 border border-border text-muted hover:border-white hover:text-white rounded-sm transition-all"
            >
              resume ↗
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((p) => !p)}
          className="md:hidden font-mono text-xs text-muted hover:text-white transition-colors"
        >
          {open ? "close" : "menu"}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-b border-border bg-surface"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  
                    <a href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-mono text-xs text-muted hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}