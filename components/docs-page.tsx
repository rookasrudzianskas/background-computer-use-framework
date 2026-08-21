import Link from "next/link";
import { ArrowRight, BookOpen, Box, Code2, Copy, Gauge, GitFork, Network, Play, Sparkles, Terminal } from "lucide-react";
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
