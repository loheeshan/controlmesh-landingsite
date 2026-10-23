const ENGINES = ["Opengrep", "Gitleaks", "OSV-Scanner", "Trivy", "Schemathesis", "Prowler checks", "GitHub App", "AWS SDK"];

/** Scrolling strip of the open-source engines ControlMesh runs. */
export function Engines() {
  return (
    <section aria-label="Engines ControlMesh runs" className="engines">
      <div className="engines-label mono">Built on open-source engines you can audit</div>
      <div className="engines-track">
        <div className="engines-row">
          {[0, 1].map((copy) =>
            ENGINES.map((name) => (
              <span key={`${copy}-${name}`} aria-hidden={copy === 1 ? true : undefined} className="engines-item">
                {name}
                <span className="engines-dot">·</span>
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
