import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@/styles/base.css";
import "@/styles/layout.css";
import "@/styles/map.css";
import "@/styles/phone.css";
import "@/styles/story.css";
import "@/styles/sections.css";
import "@/styles/themes.css";
import "@/styles/customizer.css";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";
import { THEME_SETTINGS, themeBootScript } from "@/lib/theme";

const description =
  "ControlMesh scans your code, proves which flaws are really exploitable, shows which people and data they put at risk, and signs a record for every release.";

export const metadata: Metadata = {
  title: "ControlMesh · Proof, not alerts",
  description,
  openGraph: {
    title: "ControlMesh · Proof, not alerts",
    description,
    type: "website",
  },
  twitter: { card: "summary", title: "ControlMesh · Proof, not alerts", description },
};

export const viewport: Viewport = {
  themeColor: "#0f0e0d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={THEME_SETTINGS.defaultTheme} suppressHydrationWarning>
      <head>
        {THEME_SETTINGS.showCustomizer && <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />}
      </head>
      <body>
        {children}
        {THEME_SETTINGS.showCustomizer && <ThemeCustomizer />}
      </body>
    </html>
  );
}
