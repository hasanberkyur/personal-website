import type { Project } from "../content/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-bg-alt p-6 shadow-soft">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-3 py-1 text-xs font-mono text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-accent underline decoration-border transition hover:text-text"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
