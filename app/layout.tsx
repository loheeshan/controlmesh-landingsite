import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@/styles/base.css";
import "@/styles/layout.css";
import "@/styles/map.css";
import "@/styles/phone.css";
import "@/styles/story.css";
import "@/styles/sections.css";

export const metadata: Metadata = {
  title: "ControlMesh · Proof, not alerts",
  description:
    "ControlMesh scans your code, proves which flaws are really exploitable, shows which people and data they put at risk, and signs a record for every release.",
};

export const viewport: Viewport = {
  themeColor: "#0f0e0d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
