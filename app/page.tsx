import Footer from "../components/Footer";
import Header from "../components/Header";
import AboutSection from "../components/AboutSection";
import LatestPosts from "../components/LatestPosts";
import ProjectCard from "../components/ProjectCard";
import Section from "../components/Section";
import { nowItems } from "../content/now";
import { projects } from "../content/projects";
import { getAllPosts } from "../lib/posts";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-6 pb-20">
        <section className="py-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Portfolio</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Hasan Berk Yur
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            I design and build secure, reliable systems across networking, infrastructure, and
            applied security, grounded in strong computer science fundamentals.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full border border-text bg-text px-5 py-2 text-sm font-medium text-bg transition hover:-translate-y-0.5"
            >
              View projects
            </a>
            <a
              href="/blog"
              className="rounded-full border border-border px-5 py-2 text-sm font-medium text-text transition hover:-translate-y-0.5 hover:border-text"
            >
              Posts
            </a>
            <a
              className="rounded-full border border-border px-5 py-2 text-sm font-medium text-text transition hover:-translate-y-0.5 hover:border-text"
              href="/hasan-berkyur-cv.pdf"
              download
            >
              CV
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
          description={
            <span className="text-base">
              Selected projects spanning Internet-scale networking fundamentals, security-focused system design, and hands-on infrastructure experimentation.
            </span>
          }
        >
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Section>

        <LatestPosts posts={latestPosts} />

        <AboutSection />

        <Section
          id="now"
          title="Now"
          description={
            <span className="text-base">
              Current priorities and what I am open to next.
            </span>
          }
        >
          <ul className="list-disc space-y-3 pl-5 text-base text-muted">
            {nowItems.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
