import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, FileCode2 } from "lucide-react";
import { BenchmarkTable } from "./benchmark-table";
import { Reveal } from "./reveal";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function BenchPage({ subpage }: { subpage?: string }) {
  const title = subpage === "leaderboard" ? "Cua-Bench leaderboard" : subpage === "registry" ? "Benchmark registry" : "Make your agents better at computers";
  return (
    <><SiteHeader /><main>
      <section className="bench-hero"><div className="bench-noise" /><div className="shell"><span className="eyebrow">Cua-Bench · Expert KiCad</span><h1>{title}</h1><p>The first verifiable benchmark for expert computer tasks. Twenty-five KiCad challenges reveal a capability cliff that broad GUI benchmarks miss.</p><div className="action-row"><Link className="button button-primary" href="/cuabench/leaderboard">View leaderboard <ArrowRight size={16} /></Link><Link className="button button-secondary" href="/cuabench/registry">Browse registry</Link></div><div className="bench-stats"><div><strong>25</strong><span>expert tasks</span></div><div><strong>6</strong><span>best agent clears</span></div><div><strong>24%</strong><span>frontier score</span></div></div></div></section>
      <section className="section bench-section"><div className="shell"><span className="eyebrow">Live results</span><h2>The capability cliff</h2><BenchmarkTable /></div></section>
      <section className="section"><div className="shell"><Reveal><h2>Built for evidence, <span>not screenshots alone.</span></h2><div className="three-card-grid"><div className="feature-card"><CheckCircle2 /><h3>Programmatic evaluators</h3><p>Each task checks the resulting application state instead of relying on subjective review.</p></div><div className="feature-card"><FileCode2 /><h3>Reproducible environments</h3><p>Every attempt starts from a versioned machine and application snapshot.</p></div><div className="feature-card"><Download /><h3>Open reports</h3><p>Inspect tasks, trajectories, model settings, and benchmark methodology.</p></div></div></Reveal></div></section>
    </main><SiteFooter /></>
  );
}

