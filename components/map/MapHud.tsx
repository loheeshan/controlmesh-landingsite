"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, HomeIcon, MinusIcon, PackageIcon, PauseIcon, PlayIcon, PlusIcon, SearchIcon } from "@/components/Icons";
import type { ReleaseStory } from "@/components/story/useReleaseStory";
import { listsFor, SEARCH_ALIASES, OBJECTS, SITES, TOUR, type ListTab, type Selection, type Tone } from "@/lib/story";

const stTone = (t: Tone) => `status${t ? ` status-${t}` : ""}`;

/** Search, place switcher, live clock and the signed-in persona. */
export function TopBar({ story }: { story: ReleaseStory }) {
  const { s, focus, goSite } = story;
  const [q, setQ] = useState("");
  const [miss, setMiss] = useState(false);
  const [menu, setMenu] = useState(false);
  const [clock, setClock] = useState("");
  const site = SITES.find((x) => x.id === s.site) ?? SITES[0];

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = window.setInterval(tick, 20000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!miss) return;
    const id = window.setTimeout(() => setMiss(false), 2200);
    return () => window.clearTimeout(id);
  }, [miss]);

  const search = () => {
    const term = q.trim().toLowerCase();
    if (!term) return;
    let hit: Selection | undefined = SEARCH_ALIASES[term];
    if (!hit) hit = OBJECTS.find((o) => o.tag.toLowerCase().includes(term))?.id;
    if (hit) focus(hit);
    else setMiss(true);
  };

  const pickSite = (id: (typeof SITES)[number]["id"]) => {
    setMenu(false);
    goSite(id);
  };
  const next = () => {
    const i = SITES.findIndex((x) => x.id === s.site);
    pickSite(SITES[(i + 1) % SITES.length].id);
  };

  return (
    <div className="topbar">
      <form
        className="glass search hide-sm"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <SearchIcon />
        <label htmlFor="map-search" className="sr-only">Search the map</label>
        <input
          id="map-search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setMiss(false);
          }}
          placeholder="Search: Nimal, hospital, keycard, silo…"
          autoComplete="off"
        />
        <span className="kbd mono">↵</span>
      </form>
      {miss && <span className="glass miss rise">No match. Try &quot;Nimal&quot;, &quot;hospital&quot; or &quot;silo&quot;.</span>}

      <div className="topbar-right">
        <div className="glass switcher">
          <button className="switcher-main" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-label="Choose a place">
            <span className="site-code mono">{site.code}</span>
            <span className="switcher-text">
              <strong>{site.name}</strong>
              <span>{site.sub}</span>
            </span>
            <ChevronDown color="var(--muted)" />
          </button>
          <button className="ctl ctl-sm" onClick={next} aria-label="Next place">
            <ChevronRight />
          </button>
        </div>
        {menu && (
          <div className="glass site-menu rise">
            {SITES.map((st) => (
              <button key={st.id} className="trow" onClick={() => pickSite(st.id)}>
                <span className="site-code mono" style={{ background: st.color }}>{st.code}</span>
                <span className="switcher-text">
                  <strong>{st.name}</strong>
                  <span>{st.sub}</span>
                </span>
              </button>
            ))}
          </div>
        )}
        <span className="glass live hide-sm">
          <span className="live-dot" />
          Live {clock}
        </span>
        <span className="glass persona hide-sm">
          <span className="avatar">DP</span>
          <span className="switcher-text">
            <strong>Dilini P.</strong>
            <span>Security lead</span>
          </span>
        </span>
      </div>
    </div>
  );
}

export function Kpis({ story }: { story: ReleaseStory }) {
  const fixed = story.s.phase === "fixed";
  const accepted = story.s.phase === "accepted";
  return (
    <div className="kpis hide-sm">
      <div className="glass kpi">
        <span className="kpi-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--text-2)" }} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10" /></svg>
        </span>
        <span className="kpi-text"><small>Findings on PR #482</small><strong>47</strong><small>46 ranked · 1 proven</small></span>
      </div>
      <div className={`glass kpi${fixed ? "" : " glow"}`}>
        <span className="kpi-icon kpi-icon-alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--accent-2)" }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" /><path d="M17 8h4M19 6v4" /></svg>
        </span>
        <span className="kpi-text">
          <small>Patients at risk</small>
          <strong>{fixed ? "0" : "All"}</strong>
          <small>{fixed ? "records protected again" : "any patient could open any record"}</small>
        </span>
      </div>
      <div className="glass kpi">
        <span className="kpi-icon kpi-icon-ok">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--safe)" }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4 4L19 6" /></svg>
        </span>
        <span className="kpi-text">
          <small>Release</small>
          <strong className={fixed ? "val-ok" : "val-alert"}>{fixed ? "Ship" : accepted ? "Ship*" : "Blocked"}</strong>
          <small>{fixed ? "v2.4.1 · signed" : accepted ? "1 exception, owned by you" : "v2.4.0 · needs a decision"}</small>
        </span>
      </div>
    </div>
  );
}

export function Controls({ story }: { story: ReleaseStory }) {
  const { s, zoom, goSite, toggleTour } = story;
  return (
    <div className="glass controls hide-sm">
      <button className="ctl" onClick={() => zoom(1.25)} aria-label="Zoom in"><PlusIcon /></button>
      <button className="ctl" onClick={() => zoom(1 / 1.25)} aria-label="Zoom out"><MinusIcon /></button>
      <button className="ctl" onClick={() => goSite("all")} aria-label="Show the whole city"><HomeIcon /></button>
      <button className="ctl" onClick={toggleTour} aria-label={s.tour ? "Pause tour" : "Play tour"}>
        {s.tour ? <PauseIcon /> : <PlayIcon size={16} />}
      </button>
    </div>
  );
}

/** Bottom-left stepper, like a shipment tracker for the release. */
export function Tracker({ story }: { story: ReleaseStory }) {
  const { s, goStep, toggleTour, focus } = story;
  const fixed = s.phase === "fixed";
  const accepted = s.phase === "accepted";
  const awaiting = s.phase === "blocked" && (s.step >= 4 || s.sel === "release") && !(s.tour && s.step < 4);
  const done = s.step === 6 ? 5 : Math.min(s.step, 5);

  return (
    <div className="glass tracker">
      <div className="tracker-main">
        <div className="tracker-head">
          <PackageIcon size={18} color="var(--brand)" />
          <strong>Release tracking</strong>
          <span className="muted">{TOUR[s.step].note}</span>
          {awaiting && <span className="chip chip-alert glow">Waiting for your call</span>}
          <button className="pill" onClick={toggleTour}>{s.tour ? "Pause tour" : "Play tour"}</button>
        </div>
        <div className="steps">
          <span className="steps-line" />
          <span className="steps-fill" style={{ width: `${(done / 5) * 84}%` }} />
          {TOUR.slice(0, 6).map((st, i) => {
            let state: "todo" | "done" | "now" | "skip" = "todo";
            if (s.step === 6 || i < s.step) state = "done";
            else if (i === s.step) state = "now";
            if (i === 5 && accepted) state = "skip";
            return (
              <button key={st.label} className={`step step-${state}`} onClick={() => goStep(i)} aria-label={`Step ${i + 1}: ${st.label}`}>
                <span className="step-node mono">{state === "done" ? "✓" : i + 1}</span>
                <b>{st.label}</b>
                <span>{state === "done" ? st.time : state === "now" ? "now" : state === "skip" ? "skipped" : "—"}</span>
              </button>
            );
          })}
        </div>
      </div>
      <button className="pr-card hide-sm" onClick={() => focus("release")}>
        <span className="pr-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--text-2)" }} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="12" r="2.5" /><path d="M6 8.5v7M8.3 7.2l7.4 3.6" /></svg>
        </span>
        <span className="pr-text">
          <strong>#482 Add patient records endpoint</strong>
          <span className={`chip chip-sm chip-${fixed ? "ok" : "alert"}`}>{fixed ? "Ship · signed" : accepted ? "Ship with 1 exception" : "Blocked"}</span>
          <small>{fixed ? "Re-tested · ready to ship" : accepted ? "Shipping with an exception" : "Waiting for a decision"}</small>
        </span>
        <ChevronRight color="var(--muted)" />
      </button>
    </div>
  );
}

/** Bottom-right list: findings, people and places. Rows fly the camera to the item. */
export function ListTabs({ story }: { story: ReleaseStory }) {
  const { s, patch, focus } = story;
  const lists = listsFor(s.phase);
  const tabs: [ListTab, string][] = [["findings", "Findings"], ["people", "People"], ["places", "Places"]];
  return (
    <div className="glass lists hide-sm">
      <div role="tablist" aria-label="Lists" className="lists-tabs">
        {tabs.map(([id, label]) => (
          <button key={id} role="tab" aria-selected={s.tab === id} className={`tab${s.tab === id ? " tab-on" : ""}`} onClick={() => patch({ tab: id })}>
            {label} <span className="muted">{lists[id].length}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" className="lists-rows">
        {lists[s.tab].map((r) => (
          <button key={r.a} className="trow" onClick={() => focus(r.to)}>
            <span className="trow-text">
              <strong>{r.a}</strong>
              <small>{r.b}</small>
            </span>
            <span className={stTone(r.tone)}>{r.st}</span>
            <ChevronRight size={14} color="var(--faint)" />
          </button>
        ))}
      </div>
    </div>
  );
}
