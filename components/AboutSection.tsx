import Section from "./Section";

export default function AboutSection() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div className="overflow-hidden rounded-2xl border border-border bg-bg-alt">
          <img
            src="/photo-about.jpeg"
            alt="Hasan Berk Yur"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="space-y-4 text-lg leading-relaxed text-muted">
          <p>
            I’m a computer science student at <strong className="font-semibold">Technische Universität München (TUM)</strong>
            , born in <strong className="font-semibold">2003</strong>. I’m particularly interested in <strong className="font-semibold">cybersecurity</strong>, 
            especially from both offensive and defensive perspectives, and I actively explore different 
            areas of IT security to broaden my understanding. In parallel, I focus on{" "}
            <strong className="font-semibold">networking</strong> by building homelab environments 
            to explore protocols, routing, and system behavior in realistic setups.
          </p>
          <p>
            This site is both a personal website and a workspace — a place where I document
            notes, write short essays, and share projects as I learn by building, testing,
            and occasionally breaking things.
          </p>
          <p className="text-text">
            What I am focusing on -{" "}
            <a className="text-accent underline decoration-border" href="/blog">
              check
            </a>{" "}
            the notes, blogs, and projects I publish while working on practical security tooling,
            reverse engineering workflows, and resilient system design.
          </p>
        </div>
      </div>
    </Section>
  );
}
