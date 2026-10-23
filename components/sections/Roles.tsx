"use client";

import { useState } from "react";

const ROLES = [
  {
    label: "Developers",
    title: "Fix it where you already work.",
    body: "Proven issues arrive as a pull-request comment with the failing request and a suggested fix. No new dashboard to check.",
    where: "GitHub pull requests",
  },
  {
    label: "Security lead",
    title: "One queue, ranked by proof.",
    body: "Code, API and AWS findings in a single list. Proven exploits sit at the top, reachable issues next, and the noise stays available but out of your way.",
    where: "The ControlMesh map and queue",
  },
  {
    label: "Cloud engineer",
    title: "Read the role before you grant it.",
    body: "ControlMesh connects through a least-privilege, read-only IAM role you create yourself. It can look at your account. It can't change anything in it.",
    where: "AWS IAM, then the data center view",
  },
  {
    label: "CTO",
    title: "Ship or block, in one sentence.",
    body: "Every release gets a verdict and the reason behind it, so you can make the call without reading 47 findings.",
    where: "Release summary · Slack or email (to be confirmed)",
  },
  {
    label: "Compliance",
    title: "Evidence you don't have to assemble.",
    body: "A signed record for each release: what was checked, what was found, what was fixed and re-tested, and who accepted which risk.",
    where: "Evidence export (JSON · PDF)",
  },
];

export function Roles() {
  const [role, setRole] = useState(0);
  const r = ROLES[role];

  return (
    <section id="teams" className="band">
      <div className="section stacked">
        <div className="intro">
          <div className="kicker">T+05:00 · Everyone gets their view</div>
          <h2 className="h2">Built for the team you actually have.</h2>
          <p className="lead">For cloud-native teams of roughly 10 to 150 engineers with little or no dedicated security staff.</p>
        </div>
        <div role="group" aria-label="Pick a role" className="role-tabs">
          {ROLES.map((x, i) => (
            <button key={x.label} className={`role-tab${i === role ? " role-tab-on" : ""}`} aria-pressed={i === role} onClick={() => setRole(i)}>
              {x.label}
            </button>
          ))}
        </div>
        <div className="role-card">
          <div className="role-body rise" key={role}>
            <div className="role-text">
              <h3>{r.title}</h3>
              <p>{r.body}</p>
              <div className="mono muted small">WHERE · {r.where}</div>
            </div>
            {role === 0 && (
              <div className="pr-comment">
                <div className="pr-comment-head"><span className="pr-avatar" /><strong>controlmesh</strong><span className="muted">bot · on PR #482</span></div>
                <div>
                  Patient A can read Patient B&apos;s records via <code className="mono hot">GET /patients/&#123;id&#125;/records</code>.
                  Add an ownership check at <code className="mono">patients.py:41</code>.
                </div>
                <div className="mono muted small">Re-test runs automatically on your next push.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
