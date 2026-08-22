import Link from "next/link";
import { ArrowRight, Boxes, CheckCircle2, Cpu, Database, Layers3, MonitorCog } from "lucide-react";
import { MacWaitlistForm } from "./lead-forms";
import { Reveal } from "./reveal";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const domains = [
  ["Productivity", "50+", "LibreOffice, Joplin, Zotero, Thunderbird, Calibre", "Documents, notes, references, email, and daily desktop work."],
  ["Enterprise and SaaS", "130+", "ERPNext, Odoo, Dolibarr, Nextcloud, Mattermost", "CRM, ERP, collaboration, and self-hosted business workflows."],
  ["Creative Studio", "55+", "Blender, GIMP, Krita, Inkscape, Audacity", "Image, 3D, audio, video, and vector-editing tasks."],
  ["Developer Workflow", "45+", "VS Code, Bruno, DBeaver, Postman, Insomnia", "Coding, debugging, database exploration, and API testing."],
  ["Scientific and Research", "175+", "Avogadro2, IQmol, QMForge, QGIS, R", "Scientific computing, GIS, statistics, and research software."],
  ["Game Development & QA", "50+", "Godot and Unity — 50+ seed-completed game repos", "Editor workflows, build debugging, and in-engine QA testing."],
];

const sampleRows = [
  ["VS Code", "Developer Workflow", "Easy"],
  ["GIMP", "Creative Studio", "Easy"],
  ["LibreOffice", "Productivity", "Medium"],
  ["QGIS", "Scientific and Research", "Medium"],
  ["Odoo", "Enterprise and SaaS", "Medium"],
];

function ProductHero({ eyebrow, title, accent, intro, pills, children }: { eyebrow: string; title: string; accent: string; intro: string; pills: string[]; children: React.ReactNode }) {
  return <section className="catalog-hero"><div className="product-shell"><span className="product-kicker">{eyebrow}</span><h1>{title} <em>{accent}</em></h1><p>{intro}</p><div className="catalog-pills">{pills.map((pill, index) => <span className={index === 0 ? "active" : ""} key={pill}>{pill}</span>)}</div><div className="catalog-actions">{children}</div></div></section>;
}

export function DataCatalogPage() {
  return <><SiteHeader /><main className="catalog-page">
    <ProductHero eyebrow="Cua Environments Catalog" title="Train and evaluate agents on" accent="real computer-use tasks." intro="Cua has 4K+ environments and 400K+ tasks spanning desktop apps, cross-app workflows, browser surfaces, and generated state variations. Linux, Windows, and macOS images are available." pills={["4K+ ENVIRONMENTS", "400K+ TASKS", "LINUX · WINDOWS · MACOS"]}>
      <a className="button button-primary" href="mailto:contact@trycua.com?subject=Cua%20Environments%20Catalog">Request the full catalog <ArrowRight size={15} /></a>
      <a className="button button-secondary" href="#sample-pack">Review the sample pack</a>
    </ProductHero>

    <section className="catalog-section catalog-coverage"><div className="product-shell"><Reveal><span className="product-kicker">Catalog coverage</span><h2>Pick a domain or scope a cross-app workflow.</h2><p className="catalog-lede">The public catalog groups the available inventory by workflow. We share environment-level availability and task specifications during scoping.</p></Reveal><div className="domain-grid">{domains.map(domain => <Reveal className="domain-card" key={domain[0]}><div><strong>{domain[0]}</strong><span>{domain[1]}</span></div><code>{domain[2]}</code><p>{domain[3]}</p></Reveal>)}</div></div></section>

    <section className="catalog-section catalog-sample" id="sample-pack"><div className="product-shell sample-layout"><Reveal className="sample-copy"><span className="product-kicker">Sample pack</span><h2>One environment from each core domain.</h2><p>Start with a compact sample, inspect the task format, then scope the applications and difficulty mix required for your training or evaluation target.</p></Reveal><Reveal className="sample-table"><div className="sample-row sample-head"><span>Environment</span><span>Category</span><span>Tier</span></div>{sampleRows.map(row => <div className="sample-row" key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><code>{row[2]}</code></div>)}</Reveal></div></section>

    <section className="catalog-section catalog-ships"><div className="product-shell"><Reveal><span className="product-kicker">What ships</span><h2>Environment, task, and verification artifacts for each approved scope.</h2></Reveal><div className="ship-grid"><Reveal><MonitorCog /><strong>Runnable environments</strong><p>Desktop images ship with setup scripts and known starting states for repeatable agent runs.</p></Reveal><Reveal><CheckCircle2 /><strong>Task verification</strong><p>Tasks can include state extractors, weighted checklists, and integrity checks that verify the result.</p></Reveal><Reveal><Boxes /><strong>Scoped data packages</strong><p>Selected scopes can include trajectories, annotations, and human-reviewed golden runs.</p></Reveal></div><Reveal className="custom-scope"><div><span><Database size={14} /> CUSTOM SCOPES</span><p>Tell us which applications, operating systems, task families, and verification methods you need. We will return a scoped catalog and delivery plan.</p></div><a className="button button-secondary" href="mailto:contact@trycua.com?subject=Cua%20Catalog%20Scope">Request scope <ArrowRight size={15} /></a></Reveal></div></section>
  </main><SiteFooter /></>;
}

export function MacosPage() {
  return <><SiteHeader /><main className="catalog-page macos-page">
    <ProductHero eyebrow="Cloud macOS" title="Scale native macOS on" accent="Cua’s patented stack." intro="Cua provides available macOS environments for computer-use agents. We are preparing large partnerships with companies that need fleets of thousands of macOS machines." pills={["PATENTED STACK", "NATIVE MACOS", "LARGE FLEET PARTNERSHIPS"]}>
      <a className="button button-primary" href="#macos-waitlist">Join the partnership waitlist <ArrowRight size={15} /></a>
    </ProductHero>
    <section className="catalog-section mac-feature-section"><div className="product-shell"><div className="ship-grid mac-feature-grid"><Reveal><Cpu /><strong>Patented virtualization stack</strong><p>Cua built a proprietary macOS virtualization stack for cloud computer-use workloads.</p></Reveal><Reveal><Layers3 /><strong>Native macOS environments</strong><p>Run Finder, Safari, developer tools, permissions, and native application workflows on macOS.</p></Reveal><Reveal><Boxes /><strong>Fleets of thousands</strong><p>We are partnering with companies that need to scale macOS automation to fleets of thousands of machines.</p></Reveal></div></div></section>
    <section className="mac-waitlist" id="macos-waitlist"><div className="product-shell waitlist-layout"><Reveal className="waitlist-copy"><span className="product-kicker">Partnership waitlist</span><h2>Tell us what you want to run on macOS.</h2><div><p>We review requests based on workload fit and expected fleet size. Joining the waitlist does not create a purchase commitment or promise an onboarding date.</p><p className="privacy-note">We will use your information to review your request and contact you about Cloud macOS. See our <Link href="/privacy-policy">privacy policy</Link>.</p></div></Reveal><Reveal><MacWaitlistForm /></Reveal></div></section>
  </main><SiteFooter /></>;
}
