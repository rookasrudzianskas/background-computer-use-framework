export const navGroups = [
  {
    label: "Products",
    links: [
      ["Cua Driver", "/cua-driver", "Background computer-use for native apps"],
      ["Cua Sandbox", "/#cua-sandbox", "Disposable Linux, Windows, macOS, and Android machines"],
      ["Cua Fleets", "/#cua-fleets", "Warm pools for evaluation and training"],
      ["Cua Bench", "/cuabench", "Verifiable computer-use benchmarks"],
      ["Environments Catalog", "/data", "Ready-to-run tasks and applications"],
      ["Cloud macOS", "/macos", "Apple Silicon virtualization at fleet scale"],
    ],
  },
  {
    label: "Resources",
    links: [
      ["Docs", "/docs", "Build your first agent workflow"],
      ["Examples", "/docs/how-to-guides", "Patterns for real computer-use workloads"],
      ["Blog", "/blog", "Product and research notes"],
      ["Changelog", "/changelog", "What shipped across Cua"],
      ["GitHub", "https://github.com/trycua/cua", "Open-source frameworks and tools"],
    ],
  },
  {
    label: "Company",
    links: [
      ["About", "/about", "The team behind Cua"],
      ["Trust", "/trust", "Security and compliance"],
      ["Philosophy", "/philosophy", "How we think about computer-use"],
      ["Branding", "/branding", "Logos and brand guidelines"],
      ["Careers", "/careers", "Build the computer-use layer with us"],
    ],
  },
] as const;

export const footerGroups = [
  {
    title: "Product",
    links: [["Pricing", "/#pricing"], ["Environments Catalog", "/data"], ["Cloud macOS", "/macos"]],
  },
  {
    title: "Resources",
    links: [["Docs", "/docs"], ["What is computer use?", "/docs/concepts/what-is-computer-use"], ["Examples", "/docs/how-to-guides"], ["GitHub", "https://github.com/trycua/cua"], ["Blog", "/blog"], ["Changelog", "/changelog"]],
  },
  {
    title: "Company",
    links: [["About", "/about"], ["Trust", "/trust"], ["Philosophy", "/philosophy"], ["Branding", "/branding"], ["Careers", "/careers"]],
  },
] as const;

export type EditorialPage = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; body: string; points?: string[] }[];
  cta?: string;
};

export const editorialPages: Record<string, EditorialPage> = {
  data: {
    eyebrow: "Environments Catalog",
    title: "The environments behind reliable computer-use data.",
    intro: "Browse production-grade applications, operating systems, and verifiable tasks designed for agent training, evaluation, and data generation.",
    sections: [
      { title: "Desktop productivity", body: "Office suites, browsers, terminals, file managers, and communication tools running in reproducible environments.", points: ["BrowserGym", "LibreOffice", "VS Code", "GIMP", "Thunderbird", "Files"] },
      { title: "Professional software", body: "Specialist applications for the tasks where frontier agents still have the most room to improve.", points: ["KiCad", "Blender", "CAD", "Xcode", "Android Studio", "Enterprise apps"] },
      { title: "Verified at every layer", body: "Pair application state with screenshots, accessibility trees, action traces, and task-specific evaluators." },
    ],
    cta: "Request a data scope",
  },
  macos: {
    eyebrow: "Cloud macOS",
    title: "Apple Silicon machines, ready when your agents are.",
    intro: "Boot isolated Sequoia and Tahoe environments through the same Cua API used across Linux, Windows, and Android fleets.",
    sections: [
      { title: "Built on Virtualization.framework", body: "Cua's virtualization stack uses native Apple technologies for fast boots, snapshots, and faithful application behavior." },
      { title: "Fork from a known state", body: "Snapshot a configured machine once, then fork clean copies for every rollout, evaluation, or debugging session." },
      { title: "Scale beyond the workstation", body: "Move the same workload from local Lume machines to dedicated cloud, BYOC, or on-prem Apple Silicon fleets." },
    ],
    cta: "Explore macOS docs",
  },
  about: {
    eyebrow: "About",
    title: "Infrastructure for agents that use computers.",
    intro: "Cua builds the open control, evaluation, and fleet layers that let computer-use agents work across real operating systems and applications.",
    sections: [
      { title: "A shared surface", body: "We believe developers should use one consistent API from local experiments to the largest training and evaluation runs." },
      { title: "Open at the control layer", body: "Cua Driver, Cua Bench, Sandbox, and Lume are built in public so the computer-use ecosystem can improve together." },
      { title: "Made in San Francisco", body: "We are a small team of infrastructure, virtualization, and agent builders backed by Y Combinator." },
    ],
  },
  trust: {
    eyebrow: "Trust Center",
    title: "Control, isolation, and evidence for every rollout.",
    intro: "Security is part of the fleet architecture—from ephemeral machines and tenant isolation to audit-ready operational controls.",
    sections: [
      { title: "SOC 2 Type I", body: "Cua's security controls have been independently examined. Enterprise evidence is available under NDA." },
      { title: "Deployment choice", body: "Use hosted Cua Cloud, bring your own cloud, or deploy on-premises when workloads and policies demand it." },
      { title: "Ephemeral by design", body: "Sandboxes can be released after every run, while snapshots preserve only the state you choose to keep." },
    ],
    cta: "Contact security",
  },
  philosophy: {
    eyebrow: "Philosophy",
    title: "Computer-use should be reproducible infrastructure.",
    intro: "A capable agent is only as useful as the environment, evidence, and controls around it.",
    sections: [
      { title: "Real surfaces over toy tasks", body: "Agents improve fastest when they work in the same applications, operating systems, and failure modes people encounter." },
      { title: "Verification over vibes", body: "A rollout is valuable when its result can be evaluated, its state can be inspected, and its failure can be reproduced." },
      { title: "Local first, fleet ready", body: "The path from one developer machine to thousands of concurrent environments should not require a rewrite." },
    ],
  },
  branding: {
    eyebrow: "Branding",
    title: "The Cua brand, built from a curious koala and cool light.",
    intro: "Use these guidelines when referencing Cua in integrations, articles, demos, and community projects.",
    sections: [
      { title: "Name and voice", body: "Write Cua with a capital C. Keep language direct, precise, and optimistic without overstating what agents can do." },
      { title: "Logo", body: "Give the koala mark clear space and use a high-contrast monochrome treatment whenever possible." },
      { title: "Palette", body: "Black and cloud-white carry the system. Pale blue marks actions, links, and the moments where the interface comes alive.", points: ["Night #000000", "Cloud #F6F8FB", "Cua blue #9FD7FF", "Panel #181818"] },
    ],
  },
  careers: {
    eyebrow: "Careers",
    title: "Build the computer layer for the next generation of agents.",
    intro: "Join a small team working across virtualization, distributed systems, evaluation, and developer experience.",
    sections: [
      { title: "Founding infrastructure engineer", body: "Design the control plane and fleet systems that schedule reliable GUI workloads across operating systems." },
      { title: "Agent evaluation engineer", body: "Create environments, evaluators, and benchmarks that expose what frontier models can—and cannot—do." },
      { title: "Developer experience engineer", body: "Make powerful low-level capabilities feel clear through APIs, SDKs, docs, examples, and tools." },
    ],
    cta: "Introduce yourself",
  },
};

export const legalPages: Record<string, EditorialPage> = {
  "privacy-policy": {
    eyebrow: "Legal · Updated August 2026",
    title: "Privacy Policy",
    intro: "This page explains how information is collected, used, and protected when you use Cua websites and services.",
    sections: [
      { title: "Information we collect", body: "We collect account, service, support, and technical information needed to provide and secure the service." },
      { title: "How information is used", body: "Information is used to operate products, respond to requests, improve reliability, prevent abuse, and meet legal obligations." },
      { title: "Your choices", body: "You may request access, correction, or deletion where applicable by contacting the Cua team." },
    ],
  },
  "cookie-policy": {
    eyebrow: "Legal · Updated August 2026",
    title: "Cookie Policy",
    intro: "This policy describes the limited cookies and similar technologies used across Cua websites.",
    sections: [
      { title: "Essential cookies", body: "These support security, authentication, load balancing, and remembered privacy choices." },
      { title: "Analytics", body: "Aggregate product analytics help the team understand reliability and which documentation is useful." },
      { title: "Managing cookies", body: "You can use browser controls to remove or block cookies, though some authenticated features may stop working." },
    ],
  },
  "terms-of-service": {
    eyebrow: "Legal · Updated August 2026",
    title: "Terms of Service",
    intro: "These terms govern access to Cua websites, hosted infrastructure, software, and related services.",
    sections: [
      { title: "Using the services", body: "Use Cua only for lawful workloads and in ways that respect security, privacy, intellectual property, and third-party systems." },
      { title: "Accounts and access", body: "You are responsible for account credentials, authorized users, and the workloads executed through your account." },
      { title: "Availability and changes", body: "Services evolve over time. Enterprise commitments, support, and data terms are defined in the applicable order or agreement." },
    ],
  },
};

