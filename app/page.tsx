import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import Section from "../components/Section";
import { nowItems } from "../content/now";
import { projects } from "../content/projects";
import { getAllPosts } from "../lib/posts";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    });

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
            I design and build secure, reliable systems across networking, infrastructure, and applied security, grounded in strong computer science fundamentals.
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
          id="posts"
          title="Latest posts"
          description="(CHANGE) Recent notes on security, systems, and reverse engineering."
        >
          <div className="space-y-4">
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-border bg-bg-alt p-5 transition hover:border-text"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span className="font-mono">
                    {post.tags.slice(0, 3).map((tag) => `#${tag}`).join(" ")}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  <a className="transition hover:text-accent" href={`/blog/${post.slug}`}>
                    {post.title}
                  </a>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <a className="text-sm font-medium text-accent underline decoration-border" href="/blog">
              View all posts
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
