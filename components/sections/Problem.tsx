"use client";

import { useState } from "react";

const ALERTS: [string, string, string, string][] = [
  ["CRITICAL", "#FF8A47", "Possible SQL injection", "db/query.py:88"],
  ["HIGH", "#FFB283", "Outdated package with known CVE", "package.json"],
  ["HIGH", "#FFB283", "S3 bucket allows public read", "patient-scans"],
  ["MEDIUM", "#D9D2CA", "Route may be missing an ownership check", "patients.py:41"],
  ["MEDIUM", "#D9D2CA", "Possible secret in sample config", ".env.example"],
  ["LOW", "#9A9087", "Base image has known CVEs", "Dockerfile"],
];

const POINTS: [string, string][] = [
  ["Severity isn't risk.", 'A "medium" in the list can be the one that leaks every patient record.'],
  ["Login checked, ownership not.", "Broken object-level authorization is #1 on the OWASP API Security Top 10, and code scanners rarely prove it."],
  ["Code and cloud live apart.", "The flaw is in GitHub. The data it exposes is in AWS. No single tool shows both."],
];

/** The problem, plus a switch that shows the same release as a scanner sees it and as ControlMesh sees it. */
export function Problem() {
  const [view, setView] = useState<"scanner" | "mesh">("scanner");

  return (
    <section className="section split">
      <div className="split-text">
        <div className="kicker">T+00:30 · 47 alerts</div>
        <h2 className="h2">Small teams ship fast. Security reviews can&apos;t keep up.</h2>
        <p className="lead">
          AI assistants write more code than ever, and every scanner adds to the pile. With no security engineer on the
          team, nobody can tell which finding is real, so the dangerous one ships with the rest.
        </p>
        <ol className="points">
          {POINTS.map(([title, body], i) => (
            <li key={title}>
              <span className="mono">0{i + 1}</span>
              <span><strong>{title}</strong> <span className="text-2">{body}</span></span>
            </li>
          ))}
        </ol>
        <p className="muted">Flip the switch to see the same release both ways.</p>
      </div>

      <div className="split-visual">
        <div className="window">
          <div className="window-bar">
            <span /><span /><span />
            <span className="mono muted">booking-api · release v2.4.0</span>
          </div>
          <div role="group" aria-label="Choose a view" className="seg">
            <button className={view === "scanner" ? "seg-on" : ""} aria-pressed={view === "scanner"} onClick={() => setView("scanner")}>
              Scanner view
            </button>
            <button className={view === "mesh" ? "seg-on" : "glow"} aria-pressed={view === "mesh"} onClick={() => setView("mesh")}>
              ControlMesh view
            </button>
          </div>

          {view === "scanner" ? (
            <div className="window-body">
              <div className="window-meta"><span>47 findings · sorted by severity</span><span className="mono">4 tools</span></div>
              {ALERTS.map(([sev, color, text, where], i) => (
                <div className="alert-row rise" key={text} style={{ animationDelay: `${i * 0.06}s` }}>
                  <span className="mono alert-sev" style={{ color }}>{sev}</span>
                  <span className="alert-text">{text}</span>
                  <span className="mono muted alert-where">{where}</span>
                </div>
              ))}
              <div className="window-foot">
                + 41 more. <span className="hot">Which one gets you breached?</span>
              </div>
            </div>
          ) : (
            <div className="window-body">
              <div className="window-meta rise">
                <span>1 proven exploit · 46 ranked by reachability</span>
                <span className="mono badge-hot">RELEASE BLOCKED</span>
              </div>
              <div className="proof rise glow">
                <div className="proof-head"><span className="mono badge-line">PROVEN</span><strong>Broken object-level authorization</strong></div>
                <div className="mono code-box">
                  as test_patient_A<br />
                  GET /patients/<span className="hot">B-2041</span>/records → <b className="hot">200 OK</b><br />
                  <span className="muted">expected 403 Forbidden</span>
                </div>
                <div className="text-2">In real life: Nimal could open Kamala&apos;s medical records.</div>
              </div>
              <div className="chain rise" style={{ animationDelay: "0.2s" }}>
                <span className="mono">patients.py:41</span>
                <svg width="34" height="10" viewBox="0 0 34 10" aria-hidden="true"><path className="dash-line" d="M0 5 H34" stroke="#FF6B1A" strokeWidth="2" /></svg>
                <span className="mono">booking-api-role</span>
                <svg width="34" height="10" viewBox="0 0 34 10" aria-hidden="true"><path className="dash-line" d="M0 5 H34" stroke="#FF6B1A" strokeWidth="2" /></svg>
                <span className="mono chain-hot">s3://patient-scans · public</span>
              </div>
              <div className="row-gap rise" style={{ animationDelay: "0.3s" }}>
                <a href="#map" className="btn btn-primary btn-sm">See it on the map</a>
                <a href="#evidence" className="btn btn-sm">View evidence</a>
              </div>
            </div>
          )}
          <div className="window-note">Illustrative example: a healthcare booking app.</div>
        </div>
      </div>
    </section>
  );
}
