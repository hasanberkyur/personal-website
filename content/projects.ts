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
    tags: ["Networking", "Security", "Linux"],
    links: [
      { label: "Website", href: "https://ilab.net.in.tum.de/pages/view.php?address=p3&config=2023ss" }
    ]
  },
  {
    title: "HomeLab",
    description: "Designing and building a security-focused home lab with VLAN-segmented networks, firewalling, self-hosted services, and the deployment and secure integration of IoT smart-home devices to explore real-world networking and threat models.",
    tags: ["Networking", "Security", "HomeLab", "IoT", "Smart Home"],
    links: [
      { label: "GitHub", href: "https://github.com/hasanberkyur" },
    ]
  }
];
