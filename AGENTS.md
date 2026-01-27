# AGENTS.md — Hasan Personal Website (hasanberkyur.me)

## Mission
Build a minimal, premium-feeling personal website for hasanberkyur.me using Next.js.
The site should start as a single-page scroll portfolio and remain easy to extend later (blog, projects, subpages).

Primary goals:
- Minimal & premium aesthetic (clean typography, whitespace, subtle borders)
- Fast performance (excellent Lighthouse)
- Simple codebase (avoid over-engineering)
- Easy deployment via Coolify from GitHub repo

Non-goals (for now):
- Authentication
- Complex dashboards
- Databases
- CMS integration (can be added later)

## Tech Stack
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Optional: shadcn/ui (only if it genuinely saves time and stays minimal)
- Optional: Framer Motion (light use; subtle reveals only)

## Deployment Context
- Deployed on the same VPS that runs Coolify + OpenWebUI.
- Coolify deploys from GitHub via GitHub App.
- Domain routing is handled via Coolify reverse proxy.
- Target domain: hasanberkyur.me
- Subdomains may be added later (blog., labs., api., etc.)

Assumptions:
- App should run reliably in a Dockerized environment.
- Avoid server-specific hacks; keep standard Next.js build/start scripts.

## Information Architecture (1-page)
Homepage is a single scroll page with sections:
1) Hero: name + 1-line positioning + primary CTAs (Projects scroll + Contact mailto)
2) Selected Work: 3 curated project cards (title, 1 sentence, tags, links)
3) Now: 3 short bullets (working on / learning / open to)
4) Writing (optional): can be stubbed or hidden until content exists
5) Footer: GitHub, LinkedIn, Email

Keep it short, confident, and “expensive-looking”.

## Design System — Minimal & Premium
- Layout: lots of whitespace, max width container, comfortable line-height.
- Colors: near-white background, near-black text, 1 subtle accent color for links/buttons.
- Components: soft borders, very light shadows or none; consistent rounded corners (e.g., rounded-2xl).
- Motion: subtle (fade/slide 10–15px) and optional; never flashy.
- Typography: one clean sans + optional mono accent for tags.
- Use consistent spacing scale (Tailwind), avoid ad-hoc pixel values.

## Codebase Structure (preferred)
Use this structure unless a compelling reason arises:

/app
  layout.tsx
  page.tsx           # one-page site
  globals.css
/components
  Header.tsx
  Section.tsx
  ProjectCard.tsx
  Footer.tsx
/content
  projects.ts        # curated list used to render cards
  now.ts             # Now section content
/public
  og.png             # social preview (optional)
  avatar.jpg         # optional

Guidelines:
- Keep content in /content for easy edits without touching layout.
- Keep UI blocks in /components.
- Avoid deeply nested abstractions.

## Data & Content Conventions
Projects are curated: max 3 highlighted items initially.
Use a simple typed structure, e.g.:

type Project = {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
};

Now section should be 3 bullets, short, no paragraphs.

## Quality Bar
- TypeScript strictness: keep types clean; avoid `any`.
- Accessibility: semantic HTML, proper headings, button/link correctness.
- Performance: avoid large client bundles; prefer server components by default.
- SEO: meaningful title/description, OpenGraph basics (optional), clean metadata.
- No unnecessary dependencies.

## What to Avoid
- Don’t add auth, DB, CMS, or API routes unless explicitly asked.
- Don’t introduce heavy UI frameworks or multiple component libraries.
- Don’t overuse client components; only use "use client" when necessary.
- Don’t create complex state management; keep it static/simple.

## Commands
Assume standard scripts:
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint` (if configured)

## Working Style for Codex (Agent Rules)
When making changes:
1) Prefer small, incremental commits/changes.
2) Keep the UI minimal. If unsure, choose the simpler approach.
3) Keep copy concise and professional.
4) If adding a dependency, justify why it’s needed and keep it minimal.
5) Follow existing patterns in the repo; don’t introduce new patterns casually.

## Definition of Done (MVP)
- `hasanberkyur.me` renders a premium one-page portfolio with the sections above.
- Projects and Now content live in `/content`.
- Builds successfully (`npm run build`) and is deployable via Coolify.
- No placeholder lorem ipsum (use concise real-ish placeholders if needed).
