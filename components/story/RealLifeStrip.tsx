"use client";

import { useEffect, useRef, useState } from "react";
import { LockIcon } from "@/components/Icons";
import type { Lens, LensStage } from "@/lib/lens";
import { TOUR, type Phase, type Selection, type Tone } from "@/lib/story";
import { PhoneMock, type PhoneView } from "./PhoneMock";
import type { ReleaseStory } from "./useReleaseStory";

/** The five moments a visitor can jump between. Each one moves the map too. */
const STAGES: { label: string; step: number; phase: Phase; match: LensStage[] }[] = [
  { label: "Normal day", step: 1, phase: "blocked", match: ["own"] },
  { label: "Tested on staging", step: 2, phase: "blocked", match: ["probe"] },
  { label: "Real-life risk", step: 3, phase: "blocked", match: ["traced"] },
  { label: "Release decision", step: 4, phase: "blocked", match: ["blocked", "accepted"] },
  { label: "Fixed and proven", step: 5, phase: "fixed", match: ["fixed"] },
];

type Access = { who: string; note: string; status: string; tone: Tone };

function accessFor(stage: LensStage): Access[] {
  const exposed = stage === "traced" || stage === "blocked" || stage === "accepted";
  const other: Pick<Access, "status" | "tone"> =
    stage === "fixed" ? { status: "Refused", tone: "ok" }
    : exposed ? { status: "Can open it", tone: "alert" }
    : stage === "probe" ? { status: "Testing…", tone: "" }
    : { status: "Unknown", tone: "" };
  return [
    { who: "Kamala", note: "her own record", status: "Allowed", tone: "ok" },
    { who: "Her doctor", note: "City Hospital", status: "Allowed", tone: "ok" },
    { who: "Nimal", note: "another patient", ...other },
    { who: "Any logged-in patient", note: "anyone with a MediBook account", ...other },
  ];
}

/** Interactive cards under the map that show what each step means for real people. */
export function RealLifeStrip({ story, lens }: { story: ReleaseStory; lens: Lens }) {
  const { s, jumpTo, focus } = story;
  const current = STAGES.findIndex((st) => st.match.includes(lens.stage));
  const fixed = s.phase === "fixed";

  // "Try it yourself" on Nimal's phone. Cleared whenever the story moves on.
  const [tryView, setTryView] = useState<PhoneView | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    setTryView(null);
    window.clearTimeout(timer.current);
  }, [lens.stage]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Keep the active stage visible in the scrollable bar on small screens (without moving the page).
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bar.current;
    const chip = el?.children[current] as HTMLElement | undefined;
    if (!el || !chip) return;
    el.scrollTo({ left: chip.offsetLeft - (el.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [current]);

  const shown = tryView ?? lens.phone;
  const canTry = shown === "own" || (tryView === null && shown === "probe");
  const tryIt = () => {
    setTryView("probe");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setTryView(fixed ? "fixed" : "leak"), 1200);
  };
  const phoneCaption =
    tryView === "probe" ? "Nimal changes one number in the address…"
    : tryView === "leak" ? "That's Kamala's record. One number changed, and the app handed it over."
    : tryView === "fixed" ? "Refused. The app now checks whose record it is, not just who is logged in."
    : tryView === "own" ? "Back to Nimal's own records."
    : lens.phoneCaption;

  const showOnMap = (id: Selection) => {
    focus(id);
    document.getElementById("map")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const flow = lens.dataTone;
  const access = accessFor(lens.stage);

  return (
    <section aria-label="What this means in real life" className="strip">
      <div className="strip-head">
        <span className="kicker">What this means in real life</span>
        <span className="muted">{s.tour ? "Following the map. Pick a moment to jump there." : "Pick a moment, or click anything on the map."}</span>
      </div>

      <div className="stages" ref={bar} role="group" aria-label="Jump to a moment">
        {STAGES.map((st, i) => {
          const state = i === current ? "now" : i < current ? "done" : "todo";
          const label = i === 3 && s.phase === "accepted" ? "Shipped with risk" : st.label;
          return (
            <button
              key={st.label}
              className={`stage stage-${state}${i === 4 ? " stage-fix" : ""}`}
              aria-pressed={i === current}
              onClick={() => jumpTo(st.step, st.phase)}
            >
              <span className="stage-dot mono">{state === "done" ? "✓" : i + 1}</span>
              <span className="stage-label">{label}</span>
              {state === "now" && s.tour && <span className="stage-bar" key={`${s.step}-${lens.stage}`} style={{ animationDuration: `${TOUR[s.step].dur}ms` }} />}
            </button>
          );
        })}
      </div>

      <div className="strip-cards">
        {/* 1 · Phone */}
        <div className="card">
          <div className="card-h"><span className="num mono">1</span>What Nimal sees on his phone</div>
          <div className="card-stage card-phone">
            <PhoneMock view={shown} />
          </div>
          <p className="card-cap" aria-live="polite">{phoneCaption}</p>
          {canTry ? (
            <button className="btn btn-sm btn-try" onClick={tryIt}>
              Try it: change <span className="mono">A-1187</span> → <span className="mono hot">B-2041</span>
            </button>
          ) : shown === "probe" ? (
            <button className="btn btn-sm btn-try" disabled>Loading…</button>
          ) : (
            <button className="btn btn-sm btn-try" onClick={() => setTryView("own")}>Back to his own records</button>
          )}
        </div>

        {/* 2 · Data path */}
        <div className={`card path path-${flow}`}>
          <div className="card-h"><span className="num mono">2</span>The path Kamala&apos;s scan takes</div>
          <div className="card-stage path-stage">
            <PathNode id="hospital" icon="H" name="City Hospital" status="Uploads her chest X-ray" tone="ok" onPick={showOnMap} />
            <PathLink kind="flow" />
            <PathNode
              id="s3a" icon="S3" name="patient-scans silo"
              status={flow === "closed" ? "Still public · in review queue" : "Public bucket"}
              tone={flow === "open" ? "alert" : ""} onPick={showOnMap}
            />
            <PathLink kind={flow === "open" ? "leak" : "idle"} />
            <PathNode
              id="keycard" icon="API" name="booking-api + keycard"
              status={flow === "closed" ? "Checks whose record it is" : flow === "open" ? "Hands it to anyone logged in" : "Checks login only"}
              tone={flow === "closed" ? "ok" : flow === "open" ? "alert" : ""} onPick={showOnMap}
            />
            <PathLink kind={flow === "open" ? "leak" : flow === "closed" ? "blocked" : "idle"} />
            <PathNode
              id="nimal" icon="N" name="Nimal's phone"
              status={flow === "closed" ? "403 · refused" : flow === "open" ? "Receives Kamala's scan" : "Sees his own records"}
              tone={flow === "closed" ? "ok" : flow === "open" ? "alert" : ""} onPick={showOnMap}
            />
          </div>
          <p className="card-cap">{lens.dataCaption}</p>
        </div>

        {/* 3 · Who can open it */}
        <div className={`card${lens.meaningTone ? ` card-${lens.meaningTone}` : ""}`}>
          <div className="card-h"><span className="num mono">3</span>Who can open Kamala&apos;s record?</div>
          <div className="card-stage access-stage">
            <ul className="access">
              {access.map((a) => (
                <li key={a.who} className={`access-row${a.tone ? ` access-${a.tone}` : ""}`}>
                  <span className="access-who"><strong>{a.who}</strong><small>{a.note}</small></span>
                  <span className={`status${a.tone ? ` status-${a.tone}` : ""}`}>{a.status}</span>
                </li>
              ))}
            </ul>
            <div className="verdict rise" key={lens.stage}>
              <strong>{lens.meaningTitle}</strong>
              <p>{lens.meaningText}</p>
            </div>
          </div>
          <p className="card-cap muted">Tests use a staging copy and test patients. Nimal and Kamala are made up.</p>
        </div>
      </div>
    </section>
  );
}

function PathNode({ id, icon, name, status, tone, onPick }: {
  id: Selection; icon: string; name: string; status: string; tone: Tone; onPick: (id: Selection) => void;
}) {
  return (
    <button className={`node-btn${tone ? ` node-${tone}` : ""}`} onClick={() => onPick(id)} aria-label={`${name}: ${status}. Show on map`}>
      <span className="node-icon mono">{icon}</span>
      <span className="node-text">
        <strong>{name}</strong>
        <small>{status}</small>
      </span>
      <span className="node-go mono" aria-hidden="true">map ↑</span>
    </button>
  );
}

function PathLink({ kind }: { kind: "flow" | "leak" | "idle" | "blocked" }) {
  return (
    <span className={`link link-${kind}`} aria-hidden="true">
      {(kind === "flow" || kind === "leak") && (
        <>
          <i style={{ animationDelay: "0s" }} />
          <i style={{ animationDelay: "0.6s" }} />
        </>
      )}
      {kind === "blocked" && <span className="link-lock"><LockIcon size={12} /> blocked</span>}
    </span>
  );
}
