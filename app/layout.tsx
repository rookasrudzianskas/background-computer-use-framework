import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Locomotive", description: "Meet L.I.S.A., Locomotive's Interactive Super Assistant." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
