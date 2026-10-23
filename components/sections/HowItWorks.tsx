"use client";

import { useEffect, useState } from "react";

const STEPS: [string, string, string][] = [
  ["01", "Connect", "GitHub + AWS"],
  ["02", "Analyze", "4 scanners"],
  ["03", "Test", "runtime proof"],
  ["04", "Correlate", "code → people"],
  ["05", "Decide", "ship or block"],
  ["06", "Verify", "re-test + sign"],
];

const SCANS: [string, string, number, number][] = [
  ["Code patterns", "Opengrep", 14, 64],
  ["Secrets", "Gitleaks", 2, 9],
  ["Dependencies", "OSV-Scanner · Trivy", 9, 41],
  ["AWS settings", "Prowler checks", 22, 100],
];

function StepDetail({ i }: { i: number }) {
  switch (i) {
    case 0:
      return (
        <>
          <h3>Connect in three pieces</h3>
          <p>Install the GitHub App, add a read-only AWS role, and register a staging copy of the app with two test users. Nothing to install on servers, no write access anywhere.</p>
          <div className="stack">
            <div className="tile"><strong>GitHub App installed</strong><br /><span className="muted">reads code and pull requests</span></div>
            <div className="tile"><strong>AWS account linked</strong><br /><span className="mono muted small">role/ControlMeshReadOnly · least privilege</span></div>
            <div className="tile"><strong>Staging copy registered</strong><br /><span className="muted">2 test users · tests never touch production</span></div>
          </div>
        </>
      );
    case 1:
      return (
        <>
          <h3>Analyze every pull request</h3>
          <p>Code patterns, secrets, dependencies and AWS settings are checked in parallel. These are candidates, not verdicts.</p>
          <div className="stack">
            {SCANS.map(([name, engine, count, pct], n) => (
              <div key={name}>
                <div className="bar-head"><span><strong>{name}</strong> <span className="mono muted small">{engine}</span></span><span className="mono">{count}</span></div>
                <div className="bar"><div className="bar-fill" style={{ width: `${pct}%`, animationDelay: `${n * 0.15}s` }} /></div>
              </div>
            ))}
          </div>
        </>
      );
    case 2:
      return (
        <>
          <h3>Test it like an attacker would</h3>
          <p>On the staging copy, ControlMesh signs in as one test patient and asks for another patient&apos;s data.</p>
          <div className="mono code-box log">
            <div><span className="muted">patient_A</span><span>GET /patients/A-1187/records</span><span className="ok">200 ✓</span></div>
            <div><span className="muted">patient_A</span><span>GET /patients/<span className="hot">B-2041</span>/records</span><b className="hot">200 ✗ expected 403</b></div>
            <div><span className="muted">anonymous</span><span>GET /patients/B-2041/records</span><span className="ok">401 ✓</span></div>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <h3>Follow it to real people and data</h3>
          <p>A proven flaw is traced through the service and its keycard (IAM role) to the data it can reach, and to the people that data belongs to.</p>
          <div className="stack">
            <div className="tile">Code · <span className="mono small">routes/patients.py:41</span></div>
            <div className="tile">Service · <span className="mono small">ecs/booking-api</span></div>
            <div className="tile">Keycard · <span className="mono small">booking-api-role · s3:GetObject *</span></div>
            <div className="tile tile-hot">Data · <span className="mono small">s3://patient-scans (public)</span> · scans from City Hospital</div>
          </div>
        </>
      );
    case 4:
      return (
        <>
          <h3>One decision per release</h3>
          <p>Proven issues block. Reachable ones need a look. The rest go to the backlog, ranked, not deleted.</p>
          <div className="counts">
            <div className="count count-hot"><b>1</b><span>proven · blocks</span></div>
            <div className="count"><b>3</b><span>reachable · review</span></div>
            <div className="count"><b className="muted">43</b><span>not reachable · backlog</span></div>
          </div>
        </>
      );
    default:
      return (
        <>
          <h3>Re-test, then sign</h3>
          <p>After the fix, the exact same attack runs again. When it fails, the result is signed into the release&apos;s evidence record.</p>
          <div className="mono code-box diff">
            <span className="muted">  def get_records(patient_id, user):</span>
            <span className="ok">+     if patient_id != user.patient_id:</span>
            <span className="ok">+         raise Forbidden()</span>
            <span className="muted">      return db.records(patient_id)</span>
          </div>
          <div className="tile tile-ok mono">patient_A → B-2041 → <strong>403 Forbidden</strong></div>
        </>
      );
  }
}

/** Six-step explainer that plays on its own; clicking a step pauses it. */
export function HowItWorks() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % STEPS.length), 4500);
    return () => window.clearInterval(id);
  }, [auto]);

  return (
    <section id="how" className="band">
      <div className="section stacked">
        <div className="intro">
          <div className="kicker">T+02:00 · The mesh runs</div>
          <h2 className="h2">Six steps from pull request to proof.</h2>
          <p className="lead">Every release goes through the same loop. Scanners find candidates, ControlMesh tests them, and you get one decision with the evidence attached.</p>
        </div>
        <div className="how">
          <div className="how-steps">
            {STEPS.map(([num, title, hint], i) => (
              <button
                key={num}
                className={`how-step${i === step ? " how-step-on" : ""}`}
                aria-pressed={i === step}
                onClick={() => {
                  setStep(i);
                  setAuto(false);
                }}
              >
                <span className="how-step-row">
                  <span className="mono hot small">{num}</span>
                  <span className="how-step-title">{title}</span>
                  <span className="muted small">{hint}</span>
                </span>
                {i === step && (
                  <span className="how-progress">
                    <span key={`${step}-${auto}`} className={auto ? "how-fill" : "how-fill how-fill-full"} />
                  </span>
                )}
              </button>
            ))}
            {!auto && (
              <button className="pill-btn" onClick={() => setAuto(true)}>Resume autoplay</button>
            )}
          </div>
          <div className="how-detail" key={step}>
            <div className="rise how-detail-inner">
              <StepDetail i={step} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
