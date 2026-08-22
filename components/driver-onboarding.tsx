"use client";

import { Check, Copy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OsScene } from "./os-scene";

type DriverOs = "macos" | "windows" | "linux";

const systems: { id: DriverOs; label: string; detail: string; command: string }[] = [
  { id: "macos", label: "macOS", detail: "Sequoia + Tahoe", command: '/bin/bash -c "$(curl -fsSL https://cua.ai/driver/install.sh)"' },
  { id: "windows", label: "Windows", detail: "Windows 11 + Server 2025", command: 'powershell -c "irm https://cua.ai/driver/install.ps1 | iex"' },
  { id: "linux", label: "Linux", detail: "X11 + XWayland", command: 'curl -fsSL https://cua.ai/driver/install.sh | bash' },
];

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  async function copy(key: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1500);
  }
  return { copied, copy };
}

export function DriverInstaller() {
  const [os, setOs] = useState<DriverOs>("macos");
  const { copied, copy } = useCopy();

  useEffect(() => {
    const platform = navigator.userAgent.toLowerCase();
    const detected: DriverOs = platform.includes("windows") ? "windows" : platform.includes("linux") && !platform.includes("android") ? "linux" : "macos";
    const timer = window.setTimeout(() => setOs(detected), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const selected = systems.find((item) => item.id === os)!;
  return (
    <div className="driver-installer" id="install">
      <div className="installer-head"><span>Install</span><small>Detected {selected.label}</small></div>
      <div className="os-choice-grid" role="group" aria-label="Choose your operating system">
        {systems.map((system) => (
          <button key={system.id} type="button" className={os === system.id ? "active" : ""} aria-pressed={os === system.id} onClick={() => setOs(system.id)}>
            <strong>{system.label}</strong><span>{system.detail}</span>
          </button>
        ))}
      </div>
      <div className="install-command"><code>{selected.command}</code><button type="button" aria-label={`Copy the ${selected.label} install command`} onClick={() => copy("install", selected.command)}>{copied === "install" ? <Check /> : <Copy />}</button></div>
      <p>After install, <code>cua-driver doctor</code> checks permissions and daemon health.</p>
      <Link href="/docs/how-to-guides/driver/install">Full install guide →</Link>
      <span className="sr-status" role="status">{copied === "install" ? "Install command copied" : ""}</span>
    </div>
  );
}

export function DriverSceneTabs() {
  const [os, setOs] = useState<DriverOs>("macos");
  const current = systems.find((system) => system.id === os)!;
  return (
    <div className="driver-scenes">
      <div className="driver-scene-tabs" role="tablist" aria-label="Choose an operating system scene">
        {systems.map((system) => <button key={system.id} type="button" role="tab" aria-selected={os === system.id} onClick={() => setOs(system.id)}><strong>{system.label}</strong><span>{system.detail}</span></button>)}
      </div>
      <div className="driver-scene-panel" role="tabpanel" aria-label={`${current.label} ${current.detail}`}>
        <OsScene type={os === "macos" ? "macos" : os === "windows" ? "windows" : "linux"} />
        <div><strong>{os === "macos" ? "Xcode + iPhone Simulator" : os === "windows" ? "KoalaCAD + Windows desktop" : "Files + Ubuntu desktop"}</strong><p>Cua Driver sends background input to the selected application without interrupting the window beside it.</p></div>
      </div>
    </div>
  );
}

export function ConnectCommands() {
  const { copied, copy } = useCopy();
  const commands = [
    ["Claude Code", "claude mcp add --transport stdio cua-driver -- cua-driver mcp"],
    ["Other MCP clients", "cua-driver mcp-config"],
  ] as const;
  return <div className="connect-command-list">{commands.map(([label, command]) => <div className="connect-command" key={label}><span>{label}</span><div><code>{command}</code><button type="button" aria-label={`Copy the ${label} command`} onClick={() => copy(label, command)}>{copied === label ? <Check /> : <Copy />}</button></div></div>)}<span className="sr-status" role="status">{copied ? `${copied} command copied` : ""}</span></div>;
}
