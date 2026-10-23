"use client";

import { PackageIcon } from "@/components/Icons";
import { PhoneMock } from "@/components/story/PhoneMock";
import type { ReleaseStory } from "@/components/story/useReleaseStory";
import { panelFor, type ObjId, type Tone } from "@/lib/story";

const chip = (t: Tone) => `chip${t ? ` chip-${t}` : ""}`;
const val = (t: Tone) => (t ? `val-${t}` : "");

/** Right-hand detail panel: the release, Nimal's phone, or any object on the map. */
export function MapPanel({ story }: { story: ReleaseStory }) {
  const { s, focus, applyFix, acceptRisk } = story;
  const fixed = s.phase === "fixed";
  const accepted = s.phase === "accepted";
  const awaiting = s.phase === "blocked" && (s.step >= 4 || s.sel === "release") && !(s.tour && s.step < 4);

  if (s.sel === "release") {
    return (
      <div className="panel-body">
        <div className="panel-head">
          <span className="panel-icon"><PackageIcon /></span>
          <span className="panel-titles">
            <span className="panel-kind">RELEASE · MEDIBOOK APP</span>
            <strong className="panel-name">{fixed ? "v2.4.1" : "v2.4.0"}</strong>
            <span className="panel-sub">PR #482 · Add patient records endpoint</span>
          </span>
        </div>
        <span className={chip(fixed ? "ok" : "alert")}>
          {fixed ? "Ship · signed" : accepted ? "Ship with 1 exception" : "Blocked"}
        </span>
        <div className="panel-stats">
          <span><small>Findings</small><strong>47</strong></span>
          <span><small>Proven</small><strong className={fixed ? "val-ok" : "val-alert"}>{fixed ? 0 : 1}</strong></span>
          <span><small>Reachable</small><strong>3</strong></span>
        </div>
        <p className="panel-note">
          {fixed
            ? "The fix was re-tested on staging (403) and signed into the evidence record."
            : accepted
              ? "Shipping with 1 exception, owned by you. It stays open until it is fixed."
              : "1 of 47 findings is proven: any patient can open any other patient's records and scans. Fix it before this ships."}
        </p>
        {awaiting && (
          <div className="decision glow">
            <span>Your call</span>
            <div>
              <button className="btn btn-primary btn-sm" onClick={applyFix}>Apply fix</button>
              <button className="btn btn-sm" onClick={acceptRisk}>Accept risk</button>
            </div>
          </div>
        )}
        {fixed && <div className="signed mono">Evidence signed · sha256:9f2c…e81a</div>}
        {accepted && <div className="exception">Exception logged · owner: you</div>}
        <div className="panel-actions">
          <button className="btn btn-sm" onClick={() => focus("nimal")}>What it means for Nimal</button>
          <button className="btn btn-sm" onClick={() => focus("lab")}>See the proof</button>
        </div>
      </div>
    );
  }

  if (s.sel === "nimal") {
    return (
      <div className="panel-body">
        <PanelHead kind="PATIENT · AT HOME" name="Nimal" sub="Uses the MediBook app on his phone" onClose={() => focus("release")} />
        <span className={chip(fixed ? "ok" : "alert")}>
          {fixed ? "Sees only his own records" : accepted ? "Can still open anyone's records" : "Could open anyone's records"}
        </span>
        <PhoneMock view={fixed ? "fixed" : "leak"} size="sm" />
        <p className="panel-note">
          {fixed
            ? "After the fix, the same request is refused."
            : "He changes one number in the address and gets Kamala's diagnosis and her chest X-ray from City Hospital. ControlMesh proved this on the staging copy before any real patient could try it."}
        </p>
        <div className="panel-actions">
          <button className="btn btn-sm" onClick={() => focus("s3a")}>Where her scans live</button>
          <button className="btn btn-sm" onClick={() => focus("lab")}>How it was proven</button>
        </div>
      </div>
    );
  }

  const p = panelFor(s.sel as ObjId, s.phase);
  if (!p) return null;
  return (
    <div className="panel-body">
      <PanelHead kind={p.kind} name={p.name} sub={p.sub} onClose={() => focus("release")} />
      <span className={chip(p.chip[1])}>{p.chip[0]}</span>
      <div>
        {p.rows.map(([k, v, t]) => (
          <div className="panel-row" key={k}>
            <span>{k}</span>
            <span className={val(t)}>{v}</span>
          </div>
        ))}
      </div>
      {p.note && <p className="panel-note">{p.note}</p>}
      {p.link && (
        <button className="btn btn-sm panel-link" onClick={() => focus(p.link![1])}>
          {p.link[0]}
        </button>
      )}
    </div>
  );
}

function PanelHead({ kind, name, sub, onClose }: { kind: string; name: string; sub: string; onClose: () => void }) {
  return (
    <div className="panel-head">
      <span className="panel-titles">
        <span className="panel-kind">{kind}</span>
        <strong className="panel-name">{name}</strong>
        <span className="panel-sub">{sub}</span>
      </span>
      <button className="ctl ctl-sm" onClick={onClose} aria-label="Close">×</button>
    </div>
  );
}
