"use client";

import { useEffect, useRef, useState } from "react";
import { FileIcon, MailIcon, ShieldIcon } from "@/components/Icons";
import type { ReleaseStory } from "@/components/story/useReleaseStory";
import { ATTACK_RELATED, OBJECTS, ROUTES, TOUR, ZONE_LABELS, type Tone } from "@/lib/story";
import { World } from "./World";
import { MapPanel } from "./MapPanel";
import { Controls, Kpis, ListTabs, TopBar, Tracker } from "./MapHud";

type DragStart = { x: number; y: number; ox: number; oy: number; moved: boolean };

/** The live city map: drag to pan, click anything, follow the release tour. */
export function CommandMap({ story }: { story: ReleaseStory }) {
  const { s, focus, dragTo } = story;
  const drag = useRef<DragStart | null>(null);
  const justDragged = useRef(false);
  const [dragging, setDragging] = useState(false);
  const view = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);
  const [liftY, setLiftY] = useState(0);

  // Camera zoom levels are tuned for a ~1400px wide map; shrink them on smaller screens.
  // On narrow screens the panel covers the lower half, so aim the camera higher up.
  useEffect(() => {
    const el = view.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setFit(Math.min(1, Math.max(0.45, width / 1400)));
      setLiftY(width <= 980 ? -height * 0.28 : 0);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fixed = s.phase === "fixed";
  const beam = s.tour ? TOUR[s.step].beam : "";
  const related = ATTACK_RELATED.includes(s.sel);
  const attackOn = !fixed && (related || (s.tour && (s.step === 3 || s.step === 4)));
  const safeOn = fixed && (related || s.step >= 5);
  const pushOn = s.tour && (s.step === 1 || s.step === 2);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, ox: s.drag.x, oy: s.drag.y, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved) {
      if (Math.abs(dx) + Math.abs(dy) < 5) return;
      d.moved = true;
      setDragging(true);
      (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    }
    dragTo(d.ox + dx, d.oy + dy);
  };
  const endDrag = () => {
    const d = drag.current;
    drag.current = null;
    if (d?.moved) {
      justDragged.current = true;
      window.setTimeout(() => (justDragged.current = false), 0);
      setDragging(false);
    }
  };

  const transform = `translate(${s.drag.x}px, ${s.drag.y + liftY}px) scale(${s.cam.s * fit}) translate(${-s.cam.x}px, ${-s.cam.y}px)`;

  return (
    <section id="map" aria-label="Interactive map of one release" className="map">
      <div
        ref={view}
        className="map-view"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div className={`map-world${dragging ? " map-world-drag" : ""}`} style={{ transform }}>
          <World />

          {ZONE_LABELS.map((z) => (
            <span key={z.text} className="zone-label mono" style={{ left: z.x, top: z.y, color: z.color }}>
              {z.text}
            </span>
          ))}

          <svg className="map-overlay" viewBox="0 0 2560 1500" width={2560} height={1500} aria-hidden="true">
            <path className={`beam${beam === "office" ? " on" : ""}`} d={ROUTES.beamOffice} />
            <path className={`beam${beam === "lab" ? " on" : ""}`} d={ROUTES.beamLab} />
            <path className={`beam beam-ro${beam === "dc" ? " on" : ""}`} d={ROUTES.beamDc} />
            <path className={`route-attack${attackOn ? " on" : ""}`} d={ROUTES.request} />
            <path className={`route-safe${safeOn ? " on" : ""}`} d={ROUTES.blocked} />
          </svg>

          <Mover path={ROUTES.traffic} className="dot" />
          <Mover path={ROUTES.traffic} className="dot" delay={-4} />
          <Mover path={ROUTES.upload} className="dot" duration={5} />
          <Mover path={ROUTES.upload} className="dot" duration={5} delay={-2.5} />
          {pushOn && <Mover path={ROUTES.push} className="chip-mover chip-pr" duration={3.5}>PR #482</Mover>}
          {attackOn && (
            <>
              <Mover path={ROUTES.request} className="chip-mover chip-req"><MailIcon /> Nimal asks for B-2041</Mover>
              <Mover path={ROUTES.response} className="chip-mover chip-bad" delay={-3}><FileIcon /> Kamala&apos;s record</Mover>
            </>
          )}
          {safeOn && (
            <>
              <Mover path={ROUTES.blockedBack} className="chip-mover chip-ok" duration={4.5}>403 · not yours</Mover>
              <span className="shield" style={{ left: 1344, top: 835 }}><ShieldIcon /></span>
            </>
          )}
          <span className="beacon" style={{ left: 832, top: 366 }} />

          {OBJECTS.map((o) => (
            <button
              key={o.id}
              className={`hit${s.sel === o.id ? " hit-sel" : ""}`}
              style={{ left: o.bb[0], top: o.bb[1], width: o.bb[2], height: o.bb[3] }}
              aria-label={`Show ${o.tag}`}
              onClick={() => {
                if (!justDragged.current) focus(o.id);
              }}
            />
          ))}
          {OBJECTS.map((o) => {
            const { tag, tone, pin } = labelFor(o.id, o.tag, s.phase);
            const sel = s.sel === o.id;
            return (
              <span key={o.id} className="mark" style={{ left: o.x, top: o.y }}>
                {pin && (
                  <span className="pin-wrap">
                    <span className={`pin${pin === "✓" ? " pin-ok" : ""}`}><span>{pin}</span></span>
                  </span>
                )}
                <span className={`tag${sel ? " tag-sel" : tone ? ` tag-${tone}` : ""}`}>{tag}</span>
              </span>
            );
          })}
        </div>
      </div>

      <TopBar story={story} />
      <Kpis story={story} />
      <Controls story={story} />
      <div className="glass panel">
        <MapPanel story={story} />
      </div>
      <Tracker story={story} />
      <ListTabs story={story} />
    </section>
  );
}

function Mover({ path, className, duration, delay, children }: {
  path: string; className: string; duration?: number; delay?: number; children?: React.ReactNode;
}) {
  return (
    <span
      className={className}
      style={{
        offsetPath: `path('${path}')`,
        animationDuration: duration ? `${duration}s` : undefined,
        animationDelay: delay ? `${delay}s` : undefined,
      }}
    >
      {children}
    </span>
  );
}

function labelFor(id: string, tag: string, phase: string): { tag: string; tone: Tone; pin: string } {
  const fixed = phase === "fixed";
  switch (id) {
    case "hall": return { tag, tone: fixed ? "ok" : "alert", pin: fixed ? "✓" : "1" };
    case "s3a": return { tag, tone: "alert", pin: "!" };
    case "keycard": return { tag, tone: "alert", pin: "" };
    case "db": case "s3b": case "hospital": return { tag, tone: "ok", pin: "" };
    case "cmhq": return { tag, tone: "cm", pin: "" };
    case "kamala": return { tag, tone: fixed ? "ok" : "alert", pin: "" };
    case "nimal": return { tag: fixed ? "Nimal · own records only" : "Nimal · can open any record", tone: fixed ? "ok" : "alert", pin: "" };
    case "lab": return { tag: fixed ? "Test lab · all passing" : "Test lab · 1 failing", tone: fixed ? "ok" : "alert", pin: "" };
    default: return { tag, tone: "", pin: "" };
  }
}
