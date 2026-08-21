import Link from "next/link";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function BlogPage({ changelog = false }: { changelog?: boolean }) {
  const entries = changelog ? [
    ["Aug 18, 2026", "Warm fleet claims now complete in milliseconds", "Pre-booted, formally verified pools are available for dedicated Linux and Windows fleets."],
    ["Aug 07, 2026", "Android joins the Cua sandbox API", "Create Android VMs, install APKs, and automate touch workflows through the same Computer interface."],
    ["Jul 24, 2026", "Cua Driver background input for Linux", "The no-foreground contract now spans macOS, Windows, and Linux."],
  ] : [
    ["Research · Aug 14, 2026", "Why frontier agents clear only 6 of 25 expert KiCad tasks", "Cua-Bench exposes the gap between broad GUI familiarity and precise professional software work."],
    ["Engineering · Jul 30, 2026", "Building warm pools that scale to zero", "How snapshots, verification, and claims turn expensive desktop machines into elastic infrastructure."],
    ["Product · Jul 12, 2026", "Background computer-use without stealing the cursor", "The architecture and no-foreground contract behind Cua Driver."],
  ];
  return <><SiteHeader /><main><section className="page-hero"><div className="shell"><span className="eyebrow">{changelog ? "Changelog" : "Cua Journal"}</span><h1>{changelog ? "What shipped." : "Notes from the computer-use layer."}</h1><p>{changelog ? "Product improvements across Cua Driver, Sandbox, Fleets, Bench, and Cloud." : "Research, engineering, and product writing from the team building Cua."}</p></div></section><section className="editorial-body"><div className="shell story-list">{entries.map(([meta,title,body], index) => <article key={title}><span>{meta}</span><div><h2>{title}</h2><p>{body}</p><Link href={changelog ? "/changelog" : `/blog/${index + 1}`} className="text-link">Read {changelog ? "release notes" : "story"} →</Link></div></article>)}</div></section></main><SiteFooter /></>;
}

