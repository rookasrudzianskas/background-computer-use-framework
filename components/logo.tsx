import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Cua home">
      <Image className="brand-logo" src="/assets/cua/cua_logo_white_new.svg" width={28} height={28} alt="Cua" priority />
      {!compact && <span>Cua</span>}
    </Link>
  );
}
