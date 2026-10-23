const ITEMS = [
  {
    title: "Read-only in AWS",
    body: "A least-privilege role. ControlMesh can look; it can't change anything.",
    icon: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
  },
  {
    title: "Tests only where you point",
    body: "Runtime tests hit the staging copy you register, with test users you create. Never real patients.",
    icon: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></>,
  },
  {
    title: "Open-source engines",
    body: "The scanners underneath are public projects. You can see exactly what runs.",
    icon: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />,
  },
  {
    title: "Every action recorded",
    body: "Each scan, test and decision lands in the release's evidence record.",
    icon: <><path d="M6 3h9l4 4v14H6z" /><path d="M9 13l2 2 4-4" /></>,
  },
];

export function Trust() {
  return (
    <section id="trust" className="band">
      <div className="section stacked">
        <div className="intro">
          <div className="kicker">T+07:00 · Read-only by design</div>
          <h2 className="h2">A security tool shouldn&apos;t be your next risk.</h2>
        </div>
        <div className="trust-grid">
          {ITEMS.map((it) => (
            <div key={it.title} className="trust-card">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {it.icon}
              </svg>
              <strong>{it.title}</strong>
              <span className="text-2">{it.body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
