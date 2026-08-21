"use client";

import Link from "next/link";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { navGroups } from "@/lib/site-data";

export function SiteHeader({ showBanner = true }: { showBanner?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const close = () => setOpen(null);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  return (
    <>
      {showBanner && (
        <Link href="/cuabench" className="launch-banner">
          <span className="banner-badge">Cua-Bench</span>
          <span>The best frontier agent clears just 6 of 25 expert KiCad tasks.</span>
          <span className="banner-link">View overview →</span>
        </Link>
      )}
      <header className="site-header">
        <div className="shell header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/#product">Why Cua</Link>
            <Link href="/#fleet">Fleet</Link>
            {navGroups.map((group) => (
              <div className="nav-group" key={group.label}>
                <button
                  type="button"
                  aria-expanded={open === group.label}
                  onClick={() => setOpen(open === group.label ? null : group.label)}
                >
                  {group.label} <ChevronDown size={13} />
                </button>
                <div className={`nav-popover ${open === group.label ? "is-open" : ""}`}>
                  {group.links.map(([label, href, description]) => (
                    <Link href={href} key={label} onClick={() => setOpen(null)}>
                      <strong>{label}</strong>
                      <span>{description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <a className="discord-icon" href="https://discord.gg/mVnXXpdE85" aria-label="Join our Discord">
              <MessageCircle size={15} />
            </a>
            <a className="button button-primary button-compact" href="https://run.cua.ai/">Open Run</a>
          </nav>
          <button className="mobile-toggle" onClick={() => setMobile(!mobile)} aria-expanded={mobile} aria-label="Toggle navigation">
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
        <div className={`mobile-panel ${mobile ? "is-open" : ""}`}>
          <div className="mobile-panel-inner">
            <Link href="/#product" onClick={() => setMobile(false)}>Why Cua</Link>
            <Link href="/#fleet" onClick={() => setMobile(false)}>Fleet</Link>
            {navGroups.map((group) => (
              <div className="mobile-group" key={group.label}>
                <span>{group.label}</span>
                {group.links.map(([label, href]) => (
                  <Link href={href} key={label} onClick={() => setMobile(false)}>{label}</Link>
                ))}
              </div>
            ))}
            <a className="button button-primary" href="https://run.cua.ai/">Open Run</a>
          </div>
        </div>
      </header>
    </>
  );
}

