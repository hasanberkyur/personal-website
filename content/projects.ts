export type Project = {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "iLab1 – Build Your Own Internet",
    description: "Built and administered network topologies in a hands-on lab where I deployed core Internet technologies including dynamic routing, DNS/DNSSEC, encrypted transport protocols (TLS/QUIC), and secure WLAN configurations.",
    tags: ["Networking", "Cybersecurity", "Linux"],
    links: [
      { label: "Website", href: "https://ilab.net.in.tum.de/pages/view.php?address=p3&config=2023ss" }
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
