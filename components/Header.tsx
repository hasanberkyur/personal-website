export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <a href="/" className="text-sm font-semibold tracking-tight">
          Hasan Berk Yur
        </a>
        <nav aria-label="Primary" className="flex items-center gap-6 text-sm text-muted">
          <a className="transition hover:text-text" href="#work">
            Work
          </a>
          <a className="transition hover:text-text" href="#now">
            Now
          </a>
          <a className="transition hover:text-text" href="#writing">
            Writing
          </a>
          <a className="transition hover:text-text" href="#contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
