import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="brand brand-sm">
          <LogoMark size={22} />
          ControlMesh
        </span>
        <span>© 2026 Team CS-54 · IIT Sri Lanka</span>
        <span className="footer-links">
          <a href="#how">How it works</a>
          <a href="#trust">Security</a>
          <a href="#faq">FAQ</a>
          {/* TODO: replace with the team's real GitHub and contact links */}
          <a href="#pilot">GitHub</a>
          <a href="#pilot">Contact</a>
        </span>
      </div>
    </footer>
  );
}
