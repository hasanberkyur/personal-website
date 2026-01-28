export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">Let's build something calm and durable.</p>
          <p className="mt-2 text-sm text-muted">Available for select collaborations.</p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm font-medium">
          <a className="text-accent underline decoration-border transition hover:text-text" href="mailto:hasanberkyur@outlook.com">
            Email
          </a>
          <a className="text-accent underline decoration-border transition hover:text-text" href="/hasan-berkyur-cv.pdf" download>
            Download CV
          </a>
          <a className="text-accent underline decoration-border transition hover:text-text" href="https://github.com/hasanberkyur">
            GitHub
          </a>
          <a className="text-accent underline decoration-border transition hover:text-text" href="https://www.linkedin.com/in/hasan-berk-yur-647395397/">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
