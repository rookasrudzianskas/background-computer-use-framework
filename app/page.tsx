import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Box, ChartNoAxesCombined, CheckCircle2, Code2, Database, Gauge, GitFork, Layers3, Monitor, MousePointer2, ShieldCheck, Sparkles } from "lucide-react";
import { HeroExperience, MeshCanvas, RotatingWord } from "@/components/ask-console";
import { OsScene } from "@/components/os-scene";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const fleet = [
  { type: "linux" as const, label: "Linux", title: "Browser and code work.", body: "Run Ubuntu containers or full VMs with browser, terminal, Python, and package installs." },
  { type: "windows" as const, label: "Windows", title: "Native desktop work.", body: "Run Windows 11 and Server 2025 for native apps, legacy software, and file workflows." },
  { type: "macos" as const, label: "macOS", title: "Fleets on Apple Silicon.", body: "Run Sequoia and Tahoe on Cua's patented virtualization stack, built to scale to thousands of machines." },
  { type: "android" as const, label: "Android", title: "Touch-first workflows.", body: "Run Android VMs, install APKs, and automate taps, swipes, and multi-touch." },
];

const proof = [
  [Monitor, "4 OS families", "Linux, Windows, macOS, Android"],
  [MousePointer2, "1 driver surface", "MCP + CLI across machines"],
  [GitFork, "21.8K", "GitHub humans"],
] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero hero-wrapper">
          <MeshCanvas />
          <div className="hero-top-fade" />
          <div className="hero-bottom-fade" />
          <div className="hero-content">
            <div className="hero-copy">
              <h1><span>Scale computer fleets</span><br />for every <RotatingWord /></h1>
              <p>Run computer-use agent training, eval, and data-generation workloads in parallel on Linux, Windows, macOS, and Android machines. Fork from snapshots, reproduce failures, and turn agent activity into training data.</p>
            </div>
          </div>
          <div className="hero-screen-wrap"><HeroExperience /></div>
          <div className="hero-bottom">
            <div className="integration-proof">
              <span>Cua Driver integrations</span>
              <div role="list" aria-label="Cua ecosystem proof logos">
                <a role="listitem" href="https://qwenlm.github.io/qwen-code-docs/en/users/configuration/settings/"><Image src="/assets/cua/qwen-code.svg" alt="" width={14} height={14} />Qwen Code</a>
                <a role="listitem" href="https://hermes-agent.nousresearch.com/docs/user-guide/skills/bundled/apple/apple-macos-computer-use"><span>♙</span>Nous Research</a>
                <a role="listitem" href="https://x.com/FarzaTV/status/2051454940326097220"><Image src="/assets/cua/clicky.png" alt="" width={14} height={14} />Clicky</a>
                <a role="listitem" href="https://github.com/trycua/cua"><span>♞</span>21.8K Humans</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section why-section" id="product">
          <div className="shell">
            <Reveal>
              <span className="eyebrow">Why Cua</span>
              <h2>Where generic GUI sandboxes stop.</h2>
              <div className="why-grid">
                <Link href="/cua-driver"><span>01</span><strong>Background drivers for Computer-Use</strong><p>Send clicks and keystrokes to a chosen desktop window without moving the system cursor.</p></Link>
                <Link href="/#fleet"><span>02</span><strong>Cross-OS fleets</strong><p>One API boots Linux, Windows, macOS, and Android machines through local runtimes or Cua Cloud.</p></Link>
                <Link href="/docs/how-to-guides/sandbox/scale-out"><span>03</span><strong>Batch throughput</strong><p>Claim pre-booted machines in milliseconds from formally verified warm pools that scale to zero when idle.</p></Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="fleet-section homepage-fleet" id="fleet">
          <div>
            <Reveal className="fleet-intro"><span className="eyebrow">Fleet coverage</span><h2>Run one rollout layer <span>across four OS families.</span></h2></Reveal>
            <div className="fleet-list">
              {fleet.map((item) => (
                <Reveal className="fleet-row homepage-fleet-card" key={item.type}>
                  <div className="fleet-copy"><span className="eyebrow">{item.label}</span><h3>{item.title}</h3>{item.type === "macos" && <Link href="/macos" className="text-link">Explore Cloud macOS</Link>}<p>{item.body}</p></div>
                  <div className={`scene-wrap scene-wrap-${item.type}`}><OsScene type={item.type} /></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section product-section" id="cua-sandbox">
          <div className="shell">
            <Reveal>
              <span className="eyebrow">Products</span>
              <h2>From one sandbox <span>to coordinated fleets.</span></h2>
              <div className="two-card-grid">
                <Link href="/docs/tutorials/your-first-local-sandbox" className="feature-card"><Box /><h3>Cua Sandbox</h3><p>The computer-use runtime: boot disposable GUI environments through Python, locally or in Cua Cloud. Local backends include Docker, QEMU, and Apple VZ.</p></Link>
                <Link href="/docs/how-to-guides/sandbox/scale-out" className="feature-card" id="cua-fleets"><Layers3 /><h3>Cua Fleets</h3><p>Elastic infrastructure that scales sandboxes into warm pools of machines you claim on demand for evals, RL loops, data generation, and batch rollouts.</p></Link>
              </div>
              <div className="compliance-strip"><span>SOC 2 Type I</span><span>BYOC available</span><span>MIT licensed</span><span>On-prem available</span></div>
              <Link className="text-link" href="/trust">Security and compliance details</Link>
            </Reveal>
          </div>
        </section>

        <section className="section open-core-section" id="open-source">
          <div className="shell">
            <Reveal>
              <span className="eyebrow">Open core</span>
              <h2>It starts with Cua Driver, <span>powering computer-use in Hermes, Clicky, H Company, and Factory Droid.</span></h2>
              <div className="driver-panel">
                <div className="driver-main"><Code2 /><h3>Cua Driver</h3><p>The open-source background computer-use driver for native desktop apps. It lets agents click, type, scroll, inspect accessibility trees, and capture window state through the same MCP/CLI surface without stealing your cursor or focus.</p><small>Open-source and MIT licensed. One binary can run as an MCP stdio server, long-running daemon, or one-shot shell command on macOS, Windows, and Linux.</small><div className="action-row"><Link className="button button-secondary" href="/cua-driver">Start onboarding</Link><Link className="text-link" href="/docs/tutorials/drive-your-first-app">Read docs</Link></div></div>
                <div className="driver-points"><div><Monitor /><strong>macOS + Windows + Linux</strong><p>Native desktop backends preserve the user session across the major desktop OS families.</p></div><div><Layers3 /><strong>Drops into your stack</strong><p>Run the same binary as an MCP stdio server, long-running daemon, or one-shot shell command.</p></div><div><Code2 /><strong>MCP server + CLI</strong><p>Agents and humans drive the same harness.</p></div></div>
              </div>
              <div className="three-card-grid"><Link className="feature-card" href="/docs/tutorials/your-first-local-sandbox"><Box /><h3>Cua Sandbox</h3><p>Local and cloud sandbox provisioning for agent training and evaluation.</p></Link><Link className="feature-card" href="/cuabench"><ChartNoAxesCombined /><h3>Cua Bench</h3><p>Eval and gym authoring for cross-surface agent benchmarks.</p></Link><a className="feature-card" href="https://github.com/trycua/cua/tree/main/libs/lume"><Monitor /><h3>Lume</h3><p>macOS VM management on Apple Silicon, built on Virtualization.framework.</p></a></div>
            </Reveal>
          </div>
        </section>

        <section className="section data-section" id="verified-data">
          <div className="shell">
            <Reveal>
              <span className="eyebrow">Verified data</span>
              <h2>Train against the environments, <span>or take the verified data they produce.</span></h2>
              <p className="section-lede">Two ways to consume the same fleet, and either way the hard part is verifying the data.</p>
              <div className="data-grid">
                <Link className="feature-card data-large" href="/docs/how-to-guides/sandbox/scale-out"><Gauge /><h3>Train against live environments</h3><p>Point your training or eval loop at warm pools of real machines. Claim an environment on demand, step through the task, collect reward, and release it back.</p></Link>
                <Link className="feature-card data-large" href="/#pricing"><Database /><h3>Take the verified data they produce</h3><p>Skip the harness entirely. We run the rollouts and deliver verified trajectory datasets, packaged for your data-ingestion pipeline.</p></Link>
                <Link className="feature-card" href="/docs/concepts/what-is-cua-bench"><ShieldCheck /><h3>Evaluators in the loop</h3><p>Tasks can include evaluators that check whether a rollout completed the objective.</p></Link>
                <Link className="feature-card" href="/docs/how-to-guides"><Sparkles /><h3>Human-reviewed golden trajectories</h3><p>Golden trajectories and step-level annotations are available for selected scopes.</p></Link>
                <Link className="feature-card" href="/#pricing"><CheckCircle2 /><h3>Acceptance you can set</h3><p>Define the bar and we hold delivery to it before data reaches your pipeline.</p></Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="proof-bar" aria-label="Fleet proof points"><div className="shell">{proof.map(([Icon, stat, label]) => <div key={stat}><Icon /><strong>{stat}</strong><span>{label}</span></div>)}</div></section>

        <section className="pricing-section" id="pricing">
          <Reveal>
            <div className="shell pricing-inner"><span className="eyebrow">Pricing</span><h2>Scale computer fleets on your own infrastructure.</h2><p>Run GUI Docker, QEMU, and Apple VZ sandboxes locally with the open-source Cua Sandbox framework. Move to hosted, BYOC, or on-prem infrastructure when your workloads need more concurrency.</p><strong className="pricing-note">Local sandbox framework on GitHub. Dedicated fleets by request.</strong><div className="action-row"><a className="button button-primary" href="https://github.com/trycua">Run locally from GitHub <ArrowRight size={16} /></a><a className="button button-secondary" href="mailto:contact@trycua.com">Request access</a></div></div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
