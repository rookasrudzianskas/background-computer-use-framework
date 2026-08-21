import Link from "next/link";
import { ArrowRight, Code2, Copy, GitFork, Monitor, MousePointer2, ShieldCheck } from "lucide-react";
import { Faq } from "./faq";
import { Reveal } from "./reveal";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const driverFaq = [
  ["What is Cua Driver?", "Cua Driver is an open-source background computer-use driver for native desktop applications. It exposes clicking, typing, scrolling, screenshots, and accessibility through MCP and a CLI."],
  ["Will it move my cursor or bring another window forward?", "No. Its background-input contract targets the chosen application without taking the foreground cursor or interrupting your current work."],
  ["Which operating systems does it support?", "Cua Driver supports macOS, Windows, and Linux with platform-native backends."],
  ["Which desktop software can it control?", "It can work with native desktop apps that expose pixels, input, and—where available—accessibility information."],
  ["Which agents can connect to it?", "Any MCP-capable client or process able to invoke its CLI can connect, including Hermes, Clicky, H Company, and Factory Droid integrations."],
  ["How does the agent know where to click?", "Agents can combine screenshots with accessibility-tree inspection, then send coordinates or semantic actions through the same driver."],
  ["Is Cua Driver open source?", "Yes. Cua Driver is MIT licensed and developed in the public Cua repository."],
].map(([question, answer]) => ({ question, answer }));

const mcpConfig = [
  "{",
  "  \"mcpServers\": {",
  "    \"cua\": {",
  "      \"command\": \"cua\",",
  "      \"args\": [\"mcp\", \"stdio\"]",
  "    }",
  "  }",
  "}",
].join("\n");

export function DriverPage() {
  return (
    <><SiteHeader /><main>
      <section className="page-hero driver-hero"><div className="shell driver-hero-grid"><div><span className="eyebrow">Cua Driver</span><h1>Background hands for any agent.</h1><p>Click, type, scroll, inspect, and capture native desktop apps without stealing the user&apos;s cursor or focus.</p><div className="action-row"><Link className="button button-primary" href="/docs/how-to-guides/driver/install">Install Cua Driver <ArrowRight size={16} /></Link><a className="button button-secondary" href="https://github.com/trycua/cua/tree/main/libs/cua-driver"><GitFork size={16} /> View GitHub</a></div></div><div className="driver-visual"><div className="driver-target"><Monitor /><span>KoalaCAD</span><i /></div><div className="driver-command"><Code2 /><code>cua click --app KoalaCAD --x 642 --y 381</code></div><div className="cursor-preserved"><MousePointer2 /><span>Your cursor stays here</span></div></div></div></section>
      <section className="section"><div className="shell"><Reveal><span className="eyebrow">No foreground contract</span><h2>Keep your cursor <span>while the agent works.</span></h2><div className="three-card-grid"><div className="feature-card"><MousePointer2 /><h3>Background input</h3><p>Target a specific application window without foregrounding it.</p></div><div className="feature-card"><Monitor /><h3>Native applications</h3><p>Use the real software and session already running on the desktop.</p></div><div className="feature-card"><ShieldCheck /><h3>Explicit target</h3><p>Scope actions to the chosen process, window, and operating-system backend.</p></div></div></Reveal></div></section>
      <section className="section code-section"><div className="shell code-grid"><Reveal><span className="eyebrow">MCP + CLI</span><h2>Connect your MCP client over stdio.</h2><p>One binary works as an MCP server, long-running daemon, or one-shot shell command.</p><Link className="text-link" href="/docs/how-to-guides/driver/connect-your-agent">Read connection guide</Link></Reveal><div className="code-terminal"><div><span>cua-driver.json</span><Copy size={14} /></div><pre><code>{mcpConfig}</code></pre><span className="terminal-status">● connected · desktop session active</span></div></div></section>
      <section className="section"><div className="shell"><Reveal><span className="eyebrow">Open source</span><h2>MIT licensed, <span>powering computer-use in Hermes, Clicky, H Company, and Factory Droid.</span></h2><div className="integration-marquee"><span>Hermes</span><span>Clicky</span><span>H Company</span><span>Factory Droid</span><span>Qwen Code</span></div></Reveal></div></section>
      <section className="section"><div className="shell faq-shell"><span className="eyebrow">FAQ</span><h2>Common questions about Cua Driver.</h2><Faq items={driverFaq} /></div></section>
      <section className="page-cta"><div className="shell"><span className="eyebrow">Five-minute setup</span><h2>Send your first background click.</h2><Link className="button button-primary" href="/docs/tutorials/drive-your-first-app">Start onboarding <ArrowRight size={16} /></Link></div></section>
    </main><SiteFooter /></>
  );
}
