import Link from "next/link";
import { LogoMark } from "./Logo";

const links = [
  { href: "#map", label: "Live map" },
  { href: "#how", label: "How it works" },
  { href: "#teams", label: "For teams" },
  { href: "#trust", label: "Security" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className="nav">
      <nav aria-label="Main" className="nav-inner">
        <Link href="/" className="brand">
          <LogoMark />
          ControlMesh
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <a href="#pilot" className="btn btn-primary btn-sm nav-cta">
          Join the pilot
        </a>
      </nav>
    </header>
  );
}
