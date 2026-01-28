import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import Section from "../components/Section";
import { nowItems } from "../content/now";
import { projects } from "../content/projects";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-6 pb-20">
        <section className="py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Portfolio</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Hasan Berk Yur
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            I build calm, dependable digital products with a focus on clarity, quality, and
            measurable outcomes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full border border-text bg-text px-5 py-2 text-sm font-medium text-bg transition hover:-translate-y-0.5"
            >
              View projects
            </a>
            <a
              href="mailto:hasanberkyur@outlook.com"
              className="rounded-full border border-border px-5 py-2 text-sm font-medium text-text transition hover:-translate-y-0.5 hover:border-text"
            >
              Contact
            </a>
          </div>
        </section>

        <Section
          id="projects"
          title="My Projects"
          description="Selected projects spanning Internet-scale networking fundamentals, security-focused system design, and hands-on infrastructure experimentation."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Section>

        <Section
          id="now"
          title="Now"
          description="Current priorities and what I am open to next."
        >
          <ul className="list-disc space-y-3 pl-5 text-sm text-muted">
            {nowItems.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="writing"
          title="Writing"
          description="Short notes on systems, product, and craft."
        >
          <div className="rounded-2xl border border-dashed border-border bg-bg-alt p-6">
            <p className="text-sm text-muted">
              Essays are in progress. If you want early drafts, reach out and I will share
              updates.
            </p>
            <a
              href="mailto:hasanberkyur@outlook.com"
              className="mt-4 inline-flex text-sm font-medium text-accent underline decoration-border"
            >
              Get updates
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
