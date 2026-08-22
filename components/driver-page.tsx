import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Faq } from "./faq";
import { Reveal } from "./reveal";
import { ConnectCommands, DriverInstaller, DriverSceneTabs } from "./driver-onboarding";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const driverFaq = [
  ["What is Cua Driver?", "Cua Driver is an open-source background computer-use driver for native desktop applications. It exposes clicking, typing, scrolling, screenshots, and accessibility through MCP and a CLI."],
  ["Will it move my cursor or bring another window forward?", "No. Its background-input contract targets the chosen application without taking the foreground cursor or interrupting your current work."],
  ["Which operating systems does it support?", "Cua Driver supports macOS, Windows, and Linux with platform-native backends."],
  ["Which desktop software can it control?", "It can work with native desktop apps that expose pixels, input, and—where available—accessibility information."],
  ["Which agents can connect to it?", "Any MCP-capable client or process able to invoke its CLI can connect, including Hermes, Clicky, H Company, and Factory Droid integrations."],
  ["How does the agent know where to click?", "Agents can combine screenshots with accessibility-tree inspection, then send coordinates or semantic actions through the same driver."],
  ["What permissions does it need?", "On macOS it requests Accessibility and Screen Recording permissions. Windows and Linux use their platform-native input and capture backends."],
  ["What happens when background input does not work?", "The driver reports the foreground requirement explicitly so the caller can retry, ask for focus, or allow foreground input."],
  ["How is Cua Driver different from Cua Sandbox?", "Driver controls applications in an existing desktop session. Sandbox provisions disposable local or cloud machines for isolated workloads."],
  ["Is Cua Driver open source?", "Yes. Cua Driver is MIT licensed and developed in the public Cua repository."],
  ["Can it run in a headless environment?", "Yes, when the host exposes a supported display session. For fully disposable headless workloads, pair it with Cua Sandbox."],
  ["What telemetry does it send?", "The open-source driver does not send application screenshots or action contents to Cua. You control the client, model, and surrounding infrastructure."],
].map(([question, answer]) => ({ question, answer }));

export function DriverPage() {
  return (
    <><SiteHeader /><main>
      <section className="page-hero driver-hero"><div className="driver-hero-grid"><div className="driver-hero-copy"><span className="eyebrow">Cua Driver</span><h1>Background hands for <em>any agent.</em></h1><p>Cua Driver is an open-source computer-use driver for macOS, Windows, and Linux. Agents connect over MCP or the CLI and send input to a chosen window without moving the system cursor.</p></div><DriverInstaller /></div></section>
      <section className="section driver-background"><div className="shell"><Reveal><span className="eyebrow">Background input</span><h2>Keep your cursor <span>while the agent works.</span></h2><p className="section-lede">Each command targets a window instead of the shared cursor. An agent can use iPhone Simulator or edit a CAD drawing while you work elsewhere. Some software requires focus; the driver reports that constraint so the caller can retry or allow foreground input.</p><Link className="text-link" href="/docs/concepts/the-no-foreground-contract">Read the no-foreground contract</Link><DriverSceneTabs /></Reveal></div></section>
      <section className="section code-section"><div className="shell code-grid"><Reveal><span className="eyebrow">Connect your agent</span><h2>Connect your MCP client over stdio.</h2><p>Register <code>cua-driver mcp</code> once. The server exposes window snapshots and input tools through one MCP connection. After each click or keystroke, request another snapshot to verify the result.</p><Link className="text-link" href="/docs/how-to-guides/driver/connect-your-agent">Open the MCP setup guide</Link></Reveal><ConnectCommands /></div></section>
      <section className="section"><div className="shell"><Reveal><span className="eyebrow">Open source</span><h2>MIT licensed, <span>powering computer-use in Hermes, Clicky, H Company, and Factory Droid.</span></h2><div className="integration-marquee"><span>Hermes</span><span>Clicky</span><span>H Company</span><span>Factory Droid</span><span>Qwen Code</span></div></Reveal></div></section>
      <section className="section"><div className="shell faq-shell"><span className="eyebrow">FAQ</span><h2>Common questions about Cua Driver.</h2><Faq items={driverFaq} /></div></section>
      <section className="page-cta"><div className="shell"><span className="eyebrow">Next step</span><h2>Send your first background click.</h2><p>The tutorial covers installation and your first click without moving the system cursor.</p><div className="action-row"><Link className="button button-primary" href="/docs/tutorials/drive-your-first-app">Start the tutorial <ArrowRight size={16} /></Link><Link className="button button-secondary" href="#install">Back to the installer</Link></div></div></section>
    </main><SiteFooter /></>
  );
}
