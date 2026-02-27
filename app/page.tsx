import Navbar          from "@/components/Navbar";
import Hero            from "@/components/Hero";
import About           from "@/components/About";
import Projects        from "@/components/Projects";
import GitHubDashboard from "@/components/GitHubDashboard";
import Contact         from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <GitHubDashboard />
      <Contact />
      <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted">
        hawari.dev · {new Date().getFullYear()} · built from scratch
      </footer>
    </main>
  );
}