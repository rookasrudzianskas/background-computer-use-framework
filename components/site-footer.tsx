import Image from "next/image";
import Link from "next/link";
import { Logo } from "./logo";
import { footerGroups } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Logo />
          <p>Scale computer fleets.</p>
          <div className="yc-line">Backed by <Image src="/assets/cua/yc.svg" alt="Y Combinator" width={17} height={17} /> Combinator</div>
          <Link className="trust-link" href="/trust">◉ SOC 2 Type I</Link>
          <div className="socials">
            <a href="https://github.com/trycua/cua" aria-label="GitHub"><Image src="/assets/cua/github-white.svg" alt="" width={16} height={16} /></a>
            <a href="https://discord.gg/mVnXXpdE85" aria-label="Discord"><Image src="/assets/cua/discord-white.svg" alt="" width={16} height={16} /></a>
            <a href="https://twitter.com/trycua" aria-label="X"><Image src="/assets/cua/x-white.svg" alt="" width={15} height={15} /></a>
            <a href="https://linkedin.com/company/cua-ai" aria-label="LinkedIn"><Image src="/assets/cua/linkedin-white.svg" alt="" width={16} height={16} /></a>
          </div>
        </div>
        <div className="footer-links">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
            </div>
          ))}
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Cua AI, Inc.</span>
        <div><Link href="/privacy-policy">Privacy</Link><Link href="/cookie-policy">Cookies</Link><Link href="/terms-of-service">Terms</Link></div>
        <span>Made with 🌲 in San Francisco</span>
      </div>
    </footer>
  );
}
