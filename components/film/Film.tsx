"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/Logo";
import { PauseIcon, PlayIcon } from "@/components/Icons";

const SCENES = [
  { name: "Push", dur: 3600 },
  { name: "Analyze", dur: 4400 },
  { name: "Test", dur: 5400 },
  { name: "Correlate", dur: 4600 },
  { name: "Decide", dur: 4400 },
  { name: "Verify", dur: 5000 },
  { name: "ControlMesh", dur: 3600 },
];

const STAGE_W = 1280;
const STAGE_H = 720;

/** 30-second animated explainer: one bug from git push to a signed, fixed release. */
export function Film() {
  const [{ scene, elapsed }, setClock] = useState({ scene: 0, elapsed: 0 });
  const [playing, setPlaying] = useState(true);
  const [run, setRun] = useState(0); // bump to restart CSS animations
  const [scale, setScale] = useState(1);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setClock((c) => {
        const next = c.elapsed + 100;
        if (next < SCENES[c.scene].dur) return { scene: c.scene, elapsed: next };
        return { scene: (c.scene + 1) % SCENES.length, elapsed: 0 };
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [playing]);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / STAGE_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const jump = (i: number) => {
    setClock({ scene: i, elapsed: 0 });
    setPlaying(true);
    setRun((r) => r + 1);
  };

  return (
    <div className="film-frame" ref={frame} style={{ height: STAGE_H * scale }}>
      <div
        className={`film${playing ? "" : " film-paused"}`}
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
      >
        <div className="film-top">
          <LogoMark />
          <strong>ControlMesh</strong>
          <span className="muted">· how it works</span>
          <span className="film-label mono">
            {String(scene + 1).padStart(2, "0")} / {SCENES[scene].name.toUpperCase()}
          </span>
        </div>

        <div key={`${scene}-${run}`}>
          <Scene i={scene} />
        </div>

        <div className="film-controls">
          <button className="film-ctl" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause film" : "Play film"}>
            {playing ? <PauseIcon /> : <PlayIcon size={16} />}
          </button>
          <button className="film-ctl" onClick={() => jump(0)} aria-label="Restart film">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v5h5" />
            </svg>
          </button>
          <div className="film-segs">
            {SCENES.map((sc, i) => (
              <button key={sc.name} className="film-seg" onClick={() => jump(i)} aria-label={`Scene ${i + 1}: ${sc.name}`}>
                <span className="film-track">
                  <span style={{ width: i < scene ? "100%" : i === scene ? `${Math.min(100, (elapsed / sc.dur) * 100)}%` : "0%" }} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <div className="f-caption f-rise" style={{ animationDelay: "0.3s" }}>{children}</div>;
}

function d(s: number): React.CSSProperties {
  return { animationDelay: `${s}s` };
}

function Scene({ i }: { i: number }) {
  switch (i) {
    case 0:
      return (
        <>
          <div className="f-stage">
            <div className="f-term f-rise">
              <div className="f-term-bar"><span /><span /><span /><em className="mono">terminal</em></div>
              <div className="f-term-body mono">
                <div className="f-rise muted" style={d(0.1)}>~/booking-api (feature/patient-records)</div>
                <div className="f-rise" style={d(0.4)}><span className="hot">$ </span><span className="f-type" style={d(0.5)}>git push origin feature/patient-records</span></div>
                <div className="f-rise text-2" style={d(1.8)}>→ Pull request #482 opened · &quot;Add patient records endpoint&quot;</div>
                <div className="f-rise hot" style={d(2.5)}>→ ControlMesh check started<span className="f-caret">_</span></div>
              </div>
            </div>
          </div>
          <Caption>A MediBook developer pushes a new endpoint for patient records.</Caption>
        </>
      );
    case 1: {
      const lanes: [string, string, number, string, number][] = [
        ["Code patterns", "Opengrep", 64, "14", 0.3],
        ["Secrets", "Gitleaks", 9, "2", 0.5],
        ["Dependencies", "OSV-Scanner · Trivy", 41, "9", 0.7],
        ["AWS settings", "Prowler checks", 100, "22", 0.9],
      ];
      return (
        <>
          <div className="f-stage f-row">
            <div className="f-lanes">
              {lanes.map(([name, eng, w, n, delay], k) => (
                <div key={name} className="f-lane f-rise" style={d(k * 0.1)}>
                  <span className="f-lane-name">{name}<small className="mono">{eng}</small></span>
                  <span className="f-lane-bar"><span className="f-bar" style={{ width: `${w}%`, ...d(delay) }} /></span>
                  <span className="f-lane-n mono f-rise" style={d(1.4 + k * 0.3)}>{n}</span>
                </div>
              ))}
            </div>
            <div className="f-big f-pop" style={d(2.8)}><b>47</b><span>possible issues</span></div>
          </div>
          <Caption>Four scanners check the pull request. Together they flag 47 possible issues.</Caption>
        </>
      );
    }
    case 2:
      return (
        <>
          <div className="f-stage f-col">
            <div className="f-req">
              <div className="f-actor f-rise">
                <span className="f-avatar">A</span>
                <strong>Test patient A</strong>
                <small className="mono">signed in · staging</small>
              </div>
              <div className="f-wire">
                <span className="f-wire-line" />
                <span className="f-wire-line" />
                <span className="f-packet f-go" style={d(0.8)} />
                <span className="f-packet f-packet-bad f-back" style={d(2.1)} />
                <span className="f-wire-top mono f-rise" style={d(0.6)}>GET /patients/<span className="hot">B-2041</span>/records</span>
                <span className="f-wire-bottom mono hot f-rise" style={d(2.4)}>200 OK</span>
              </div>
              <div className="f-actor f-rise" style={d(0.2)}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--text-2)" }} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="1.5" /><rect x="4" y="14" width="16" height="6" rx="1.5" /><path d="M8 7h.01M8 17h.01" /></svg>
                <strong>booking-api</strong>
                <small className="mono">staging copy</small>
              </div>
            </div>
            <div className="f-row">
              <div className="f-json mono f-rise" style={d(2.8)}>{"{ \"patient\": \"B-2041\", \"records\": [ … ] }"}</div>
              <div className="f-stamp mono" style={d(3.6)}>EXPLOIT PROVEN</div>
            </div>
          </div>
          <Caption>ControlMesh signs in as test patient A and asks for patient B&apos;s records. The app hands them over.</Caption>
        </>
      );
    case 3: {
      const nodes: [string, string, string][] = [
        ["CODE", "Proven flaw", "patients.py:41"],
        ["SERVICE", "Runs the code", "ecs/booking-api"],
        ["KEYCARD", "Opens every silo", "s3:GetObject *"],
      ];
      return (
        <>
          <div className="f-stage">
            <div className="f-chain">
              {nodes.map(([k, t, m], n) => (
                <div key={k} className="f-chain-part">
                  <div className="f-node f-rise" style={d(n * 0.8)}>
                    <small className="mono">{k}</small><strong>{t}</strong><span className="mono">{m}</span>
                  </div>
                  <span className="f-link f-bar" style={d(n * 0.8 + 0.5)} />
                </div>
              ))}
              <div className="f-node f-node-hot f-rise" style={d(2.4)}>
                <small className="mono">DATA · PUBLIC</small><strong>Kamala&apos;s scans</strong><span className="mono">s3://patient-scans</span>
              </div>
            </div>
          </div>
          <Caption>In real life, any patient like Nimal could open Kamala&apos;s diagnosis and her X-ray from City Hospital.</Caption>
        </>
      );
    }
    case 4:
      return (
        <>
          <div className="f-stage f-col">
            <div className="f-row f-verdict">
              <div className="f-big f-dim" style={d(1.1)}><b>47</b><span>possible issues</span><i className="f-strike" style={d(1.1)} /></div>
              <svg className="f-rise" style={d(1.3)} width="80" height="24" viewBox="0 0 80 24" aria-hidden="true"><path d="M0 12 H72 M62 3 L74 12 L62 21" style={{ stroke: "var(--accent)" }} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div className="f-big f-pop" style={d(1.5)}><b className="hot">1</b><span>proven exploit</span></div>
            </div>
            <div className="f-stamp f-stamp-solid mono" style={d(2.4)}>RELEASE v2.4.0 · BLOCKED</div>
          </div>
          <Caption>One verdict for the release. 46 findings can wait. The proven one can&apos;t ship.</Caption>
        </>
      );
    case 5:
      return (
        <>
          <div className="f-stage f-row">
            <div className="f-code mono f-rise">
              <small>ROUTES/PATIENTS.PY</small>
              <div className="muted">  def get_records(patient_id, user):</div>
              <div className="f-add f-rise" style={d(0.6)}>+     if patient_id != user.patient_id:</div>
              <div className="f-add f-rise" style={d(0.8)}>+         raise Forbidden()</div>
              <div className="muted">      return db.records(patient_id)</div>
            </div>
            <div className="f-col f-right">
              <div className="f-ok-card f-rise" style={d(1.6)}>
                <small className="mono">SAME TEST, RUN AGAIN</small>
                <span className="mono">patient_A → B-2041 → <b>403 Forbidden</b></span>
              </div>
              <div className="f-rec f-rise" style={d(2.8)}>
                <span className="f-rec-head"><small className="mono">EVIDENCE RECORD</small><b className="f-pop mono" style={d(3.4)}>SHIP</b></span>
                <strong>Release v2.4.1 · signed</strong>
                <small className="mono muted">1 fixed and re-tested · 0 open</small>
              </div>
            </div>
          </div>
          <Caption>After the fix, the same attack runs again and fails. The result is signed into the release record.</Caption>
        </>
      );
    default:
      return (
        <div className="f-stage f-end">
          <span className="f-pop"><LogoMark size={96} /></span>
          <div className="f-end-title f-rise" style={d(0.3)}>Proof, not alerts.</div>
          <div className="f-end-sub f-rise" style={d(0.6)}>Code + cloud security assurance for small teams.</div>
          <div className="f-end-cta mono f-rise" style={d(1)}>Join the pilot · controlmesh</div>
        </div>
      );
  }
}
