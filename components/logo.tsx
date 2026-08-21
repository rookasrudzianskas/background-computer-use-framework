import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Cua home">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-eye brand-eye-left" />
        <span className="brand-eye brand-eye-right" />
        <span className="brand-nose" />
      </span>
      {!compact && <span>Cua</span>}
    </Link>
  );
}

