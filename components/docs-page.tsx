import Link from "next/link";
import { ArrowRight, BookOpen, Box, Code2, Copy, Gauge, GitFork, Network, Play, Sparkles, Terminal, Workflow, Cloud, ListChecks, Newspaper, CircuitBoard, ScrollText } from "lucide-react";
import { DocsAssistant } from "./docs-assistant";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const docsNav = ["Introduction", "What is computer use?", "Your first local sandbox", "Drive your first app", "Scale out with fleets", "Create an evaluator", "Cua Driver", "API reference"];
const installCode = [
  "pip install cua-computer",
  "",
  "from cua import Computer",
  "",
  "computer = await Computer.create(",
  "    os_type=\"linux\",",
  "    provider=\"local\"",
  ")",
  "",
  "await computer.run()",
].join("\n");

export function DocsPage({ slug }: { slug: string[] }) {
  const leaf = slug.at(-1)?.replaceAll("-", " ") ?? "documentation";
  const isRoot = slug.length === 1;
  if (isRoot) return <DocsLandingPage />;
  return (
    <><SiteHeader showBanner={false} /><main className="docs-shell">
      <aside className="docs-sidebar"><Link href="/docs" className="docs-title"><BookOpen /> Cua Docs</Link><nav>{docsNav.map((item, index) => <Link href={index === 0 ? "/docs" : `/docs/${item.toLowerCase().replaceAll(" ", "-").replace("?", "")}`} key={item} className={isRoot && index === 0 ? "active" : ""}>{item}</Link>)}</nav><div className="docs-sidebar-foot"><a href="https://github.com/trycua/cua"><GitFork /> GitHub</a><Link href="/changelog"><Sparkles /> Changelog</Link></div></aside>
      <article className="docs-article"><div className="docs-breadcrumb">Docs / {leaf}</div><h1>{isRoot ? "Build computer-use agents across every operating system." : leaf.replace(/\b\w/g, char => char.toUpperCase())}</h1><p className="docs-lede">Cua gives agents one control and environment surface across local machines, cloud sandboxes, and coordinated fleets.</p>
        <div className="docs-callout"><Sparkles /><div><strong>Start locally, scale when ready</strong><p>The same Python API works with Docker, QEMU, Apple VZ, and Cua Cloud.</p></div></div>
        <h2>{isRoot ? "Install the SDK" : "Overview"}</h2><p>Use the Python SDK to create a sandbox, connect an agent, inspect the screen, and execute actions. A snapshot can capture application and filesystem state for repeatable runs.</p>
        <div className="docs-code"><div><span>Terminal</span><Copy size={14} /></div><pre><code>{installCode}</code></pre></div>
        <h2>Choose the right surface</h2><div className="docs-card-grid"><Link href="/cua-driver"><Code2 /><strong>Cua Driver</strong><span>Control an application in an existing desktop session.</span></Link><Link href="/docs/tutorials/your-first-local-sandbox"><Box /><strong>Cua Sandbox</strong><span>Boot a clean disposable GUI environment.</span></Link><Link href="/docs/how-to-guides/sandbox/scale-out"><Network /><strong>Cua Fleets</strong><span>Coordinate warm pools for parallel workloads.</span></Link><Link href="/cuabench"><Gauge /><strong>Cua Bench</strong><span>Author tasks and verify agent outcomes.</span></Link></div>
        <h2>Next steps</h2><div className="docs-next"><Link href="/docs/tutorials/your-first-local-sandbox"><Terminal /><span><small>Tutorial</small>Your first local sandbox</span><ArrowRight /></Link><Link href="/docs/tutorials/drive-your-first-app"><Play /><span><small>Tutorial</small>Drive your first app</span><ArrowRight /></Link></div>
      </article>
      <aside className="docs-toc"><span>On this page</span><a href="#">Overview</a><a href="#">Install the SDK</a><a href="#">Choose a surface</a><a href="#">Next steps</a></aside>
    </main></>
  );
}

const docsProducts = [
  ["Cua Driver", "Run native desktop apps in the background through MCP, CLI, or a long-running driver daemon.", "Start with a real app", "/docs/tutorials/drive-your-first-app", "/assets/cua/docs/driver-cursor.png", Sparkles],
  ["Cua Sandbox", "Spin up disposable GUI machines when agents need fresh state, isolation, and repeatable runs.", "Create a cloud desktop", "/docs/tutorials/your-first-local-sandbox", "/assets/cua/docs/sandbox.png", Cloud],
  ["Cua-Bench", "Define verifiable computer-use tasks, run agents across environments, and score their trajectories.", "Evaluate an agent", "/docs/concepts/what-is-cua-bench", "/assets/cua/docs/bench.png", ListChecks],
  ["Architecture", "See how driver, sandbox, computer, agent, and MCP layers fit together before you build deeper.", "Understand the stack", "/docs/explanation/architecture", "/assets/cua/docs/architecture.png", Workflow],
] as const;

const featured = [
  ["GUIDE", "Drive your first desktop app", "Install Cua Driver, connect your agent, and verify a real app changed state in the background.", "Start the guide", "/docs/tutorials/drive-your-first-app", BookOpen],
  ["INFRASTRUCTURE", "Install Lume", "Use Lume for local Apple Silicon macOS VMs and lower-level VM control, separate from Cua Sandbox cloud desktops.", "Set up local macOS VMs", "/docs/how-to-guides/lume/install-lume", CircuitBoard],
  ["BLOG", "Apple Silicon and macOS VMs: 11–16× Faster LLM Inference with llama.cpp", "A process-scoped Metal capability shim unlocks newer GPU paths inside a Lume macOS VM, making llama.cpp prompt processing up to 11×...", "Read the latest post", "/blog/gpu-passthrough-macos-vms", Newspaper],
  ["CHANGELOG", "Week of May 18, 2026", "The latest release notes and platform changes, including computer_server bind defaults.", "View release notes", "/changelog/2026-05-18", ScrollText],
] as const;

function DocsLandingPage() {
  return <><SiteHeader /><main className="docs-landing"><div className="docs-landing-shell"><section className="docs-developer-hero"><h1>Cua Developers</h1><p>Open-source computer-use automation for real machines and local isolated desktops.</p></section><Link href="/docs/tutorials/drive-your-first-app" className="docs-new-card"><span className="docs-new-art" /><div><h2>New: drive a real desktop app without taking over the cursor</h2><p>Install Cua Driver, launch Calculator in the background, click a native button, and verify the app state changed through a snapshot.</p><b>Drive your first app <ArrowRight /> <i>Create a cloud sandbox <ArrowRight /></i></b></div></Link><section className="docs-product-grid">{docsProducts.map(item => { const Icon=item[5]; return <Link href={item[3]} key={item[0]} style={{"--card-art":`url(${item[4]})`} as React.CSSProperties}><Icon /><h3>{item[0]}</h3><p>{item[1]}</p><b>{item[2]} <ArrowRight /></b></Link>; })}</section><section className="docs-action"><h2>Cua Driver in action</h2><p>Agents build and inspect desktop apps on Windows and headless Linux while the developer keeps control of the active desktop.</p><div className="docs-video-grid"><figure><video controls preload="metadata" poster="/assets/cua/docs/windows-wpf-agent-qa.jpg"><source src="/assets/cua/docs/windows-wpf-agent-qa.mp4" type="video/mp4" /></video><figcaption><strong>Build and check a WPF app on Windows</strong><p>Claude Code builds a WPF CRM, runs it, patches the code, and checks the app again.</p><a href="https://x.com/trycua/status/2059688966085853245">View the original post on X</a></figcaption></figure><figure><video controls preload="metadata" poster="/assets/cua/docs/linux-headless-spreadsheet.jpg"><source src="/assets/cua/docs/linux-headless-spreadsheet.mp4" type="video/mp4" /></video><figcaption><strong>Fill a Linux spreadsheet over SSH</strong><p>An agent enters a monthly budget in Gnumeric on a remote machine with no attached display or GPU.</p><a href="https://x.com/trycua/status/2067639346719826213">View the original post on X</a></figcaption></figure></div></section><section className="docs-featured"><header><div><h2>Featured resources</h2><p>Guides, posts, and release notes from Cua.</p></div><Link href="/blog">View all <ArrowRight /></Link></header><div>{featured.map(item => {const Icon=item[5];return <Link href={item[4]} key={item[0]}><span><Icon /> {item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><b>{item[3]} <ArrowRight /></b></Link>})}</div></section><section className="docs-wide-links"><Link href="/docs/how-to-guides" style={{"--wide-art":"url(/assets/cua/docs/examples.png)"} as React.CSSProperties}><div><h2>Examples</h2><p>Practical workflows for lifecycle, snapshots, secrets, ports, images, and repeatable agent work.</p><b>Browse examples <ArrowRight /></b></div><span /></Link><Link href="/docs/reference/sandbox-sdk" style={{"--wide-art":"url(/assets/cua/docs/reference.png)"} as React.CSSProperties}><div><h2>Reference</h2><p>Look up lifecycle calls, image options, interfaces, and the Python and TypeScript sandbox surface.</p><b>Explore the SDK <ArrowRight /></b></div><span /></Link></section></div><DocsAssistant /></main><SiteFooter /></>;
}
