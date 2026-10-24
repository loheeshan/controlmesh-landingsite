"use client";

import { PlayIcon } from "@/components/Icons";
import { CommandMap } from "@/components/map/CommandMap";
import { lensFor } from "@/lib/lens";
import { RealLifeStrip } from "./RealLifeStrip";
import { useReleaseStory } from "./useReleaseStory";

/** Headline + live map. The tour state lives here so every part can follow it. */
export function ReleaseStory() {
  const story = useReleaseStory();

  return (
    <>
      <section className="hero">
        <div className="hero-left rise">
          <div className="kicker">T+00:00 · One release, one real city</div>
          <h1 className="hero-title">
            Proof,
            <br />
            not alerts.
          </h1>
        </div>
        <div className="hero-right rise" style={{ animationDelay: "0.1s" }}>
          <p>
            ControlMesh scans your code, proves which flaws are really exploitable, shows which real people and data
            they put at risk, and signs a record for every release.
          </p>
          <div className="hero-ctas">
            <a href="#pilot" className="btn btn-primary">Join the pilot</a>
            <button className="btn" onClick={story.startTour}>
              <PlayIcon /> Watch a release
            </button>
          </div>
        </div>
      </section>

      <CommandMap story={story} />

      <div className="map-hint">
        <span>Drag to move</span>
        <span>Click any building or person</span>
        <span>Pick a place at the top</span>
        <span>Replay with the tracker</span>
        <span>Interactive demo · names, records and numbers are made up</span>
      </div>

      <RealLifeStrip story={story} lens={lensFor(story.s.phase, story.s.step, story.s.sel)} />
    </>
  );
}
