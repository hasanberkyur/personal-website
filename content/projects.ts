export type Project = {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Atlas Ops",
    description: "Unified release control for multi-region services, cutting deploy time by 42%.",
    tags: ["Platform", "DevOps", "Observability"],
    links: [
      { label: "Overview", href: "https://hasanberkyur.me" },
      { label: "GitHub", href: "https://github.com/hasanberkyur" }
    ]
  },
  {
    title: "Signal Desk",
    description: "Customer operations hub that routes tickets and highlights risk in minutes.",
    tags: ["Product", "Automation", "AI"],
    links: [
      { label: "Brief", href: "https://hasanberkyur.me" },
      { label: "Contact", href: "mailto:hello@hasanberkyur.me" }
    ]
  },
  {
    title: "Northwind Studio",
    description: "Experimentation toolkit for growth teams with reliable analytics and rollout safety.",
    tags: ["Growth", "Analytics", "Tooling"],
    links: [
      { label: "Overview", href: "https://hasanberkyur.me" },
      { label: "GitHub", href: "https://github.com/hasanberkyur" }
    ]
  }
];
