"use client";

import Link from "next/link";
import Image from "next/image";
import { Apple, Boxes, ChartNoAxesCombined, ChevronDown, Cloud, Fingerprint, Menu, MonitorCog, TerminalSquare, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { navGroups } from "@/lib/site-data";

export function SiteHeader({ showBanner = true }: { showBanner?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const productIcons = [TerminalSquare, Boxes, Cloud, ChartNoAxesCombined, Fingerprint, Apple];

  useEffect(() => {
    const close = () => setOpen(null);
    const clickAway = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        setMobile(false);
      }
    };
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("pointerdown", clickAway);
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("pointerdown", clickAway);
      window.removeEventListener("keydown", escape);
    };
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
          <nav ref={navRef} className="desktop-nav" aria-label="Primary navigation">
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
                  {group.links.map(([label, href], index) => {
                    const Icon = group.label === "Products" ? productIcons[index] : MonitorCog;
                    return (
                    <Link href={href} key={label} onClick={() => setOpen(null)}>
                      <Icon aria-hidden="true" />
                      <strong>{label}</strong>
                    </Link>
                    );
                  })}
                </div>
              </div>
            ))}
            <a className="discord-icon" href="https://discord.gg/mVnXXpdE85" aria-label="Join our Discord">
              <Image src="/assets/cua/discord-white.svg" alt="" width={17} height={17} />
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
