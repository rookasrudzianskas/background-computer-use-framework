import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { EditorialPage } from "@/lib/site-data";
import { Reveal } from "./reveal";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function EditorialRoute({ page }: { page: EditorialPage }) {
  return (
    <><SiteHeader /><main>
      <section className="page-hero"><div className="shell"><span className="eyebrow">{page.eyebrow}</span><h1>{page.title}</h1><p>{page.intro}</p></div></section>
      <section className="editorial-body"><div className="shell">
        {page.sections.map((section, index) => <Reveal className="editorial-intro" key={section.title}><span className="eyebrow">0{index + 1}</span><div><h2>{section.title}</h2><p>{section.body}</p>{section.points && <div className="point-list">{section.points.map(point => <span key={point}>{point}</span>)}</div>}</div></Reveal>)}
      </div></section>
      {page.cta && <section className="page-cta"><Reveal><div className="shell"><span className="eyebrow">Start a conversation</span><h2>Bring your computer-use workload to a fleet built for it.</h2><a className="button button-primary" href="mailto:contact@trycua.com">{page.cta} <ArrowRight size={16} /></a></div></Reveal></section>}
    </main><SiteFooter /></>
  );
}

export function NotFoundRoute() {
  return <><SiteHeader /><main><section className="page-hero"><div className="shell"><span className="eyebrow">404</span><h1>This machine is not in the pool.</h1><p>The page may have moved, or the environment was released.</p><div className="action-row"><Link className="button button-primary" href="/">Return home</Link><Link className="button button-secondary" href="/docs">Read docs</Link></div></div></section></main><SiteFooter /></>;
}

