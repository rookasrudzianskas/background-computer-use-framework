import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cua.ai"),
  title: { default: "Cua: Scale computer fleets for computer-use agents", template: "%s | Cua" },
  description: "Run computer-use agent training, eval, and data-generation workloads across Linux, Windows, macOS, and Android machines.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
