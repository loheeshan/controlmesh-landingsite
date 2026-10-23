"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CAMS, OBJECTS, TOUR, type CamId, type ListTab, type Phase, type Selection, type SiteId } from "@/lib/story";

export type StoryState = {
  sel: Selection;
  site: SiteId;
  cam: { x: number; y: number; s: number };
  drag: { x: number; y: number };
  step: number;
  stepT: number;
  tour: boolean;
  phase: Phase;
  tab: ListTab;
};

const initial: StoryState = {
  sel: "release",
  site: "all",
  cam: { ...CAMS.all },
  drag: { x: 0, y: 0 },
  step: 0,
  stepT: 0,
  tour: false,
  phase: "blocked",
  tab: "findings",
};

function stepState(i: number): Partial<StoryState> {
  const st = TOUR[i];
  return { step: i, stepT: 0, sel: st.sel, site: st.site, cam: { ...CAMS[st.cam as CamId] }, drag: { x: 0, y: 0 } };
}

/** All state for the release story: camera, selection, tour progress and the fix/accept decision. */
export function useReleaseStory() {
  const [s, setS] = useState<StoryState>(initial);
  const touched = useRef(false);

  const patch = useCallback((p: Partial<StoryState>) => setS((prev) => ({ ...prev, ...p })), []);

  const startTour = useCallback(() => {
    touched.current = true;
    setS((prev) => ({ ...prev, ...stepState(0), tour: true, phase: "blocked" }));
  }, []);

  // Tour clock: advance steps, wait at "Decide" until the visitor picks fix or accept.
  useEffect(() => {
    const id = window.setInterval(() => {
      setS((p) => {
        if (!p.tour) return p;
        if (p.step === 4 && p.phase === "blocked") return p;
        const t = p.stepT + 100;
        if (t < TOUR[p.step].dur) return { ...p, stepT: t };
        let next = p.step + 1;
        if (p.step === 4 && p.phase === "accepted") next = 6;
        if (next > 6) return { ...p, ...stepState(0), phase: "blocked" };
        return { ...p, ...stepState(next) };
      });
    }, 100);
    return () => window.clearInterval(id);
  }, []);

  // Start the tour on its own unless the visitor already did something.
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!touched.current) setS((prev) => ({ ...prev, ...stepState(0), tour: true }));
    }, 1500);
    return () => window.clearTimeout(id);
  }, []);

  const focus = useCallback((id: Selection) => {
    touched.current = true;
    if (id === "release") {
      setS((p) => ({ ...p, sel: "release", site: "all", cam: { ...CAMS.all }, drag: { x: 0, y: 0 }, tour: false }));
      return;
    }
    const o = OBJECTS.find((x) => x.id === id);
    if (!o) return;
    const cam = { x: o.bb[0] + o.bb[2] / 2, y: o.bb[1] + o.bb[3] / 2, s: o.bb[2] > 400 ? 1.0 : 1.3 };
    setS((p) => ({ ...p, sel: id, site: o.zone, cam, drag: { x: 0, y: 0 }, tour: false }));
  }, []);

  const goSite = useCallback((id: SiteId) => {
    touched.current = true;
    setS((p) => ({ ...p, site: id, cam: { ...CAMS[id] }, drag: { x: 0, y: 0 }, tour: false }));
  }, []);

  const goStep = useCallback((i: number) => {
    touched.current = true;
    setS((p) => (i === 5 && p.phase !== "fixed" ? p : { ...p, ...stepState(i), tour: false }));
  }, []);

  const toggleTour = useCallback(() => {
    touched.current = true;
    setS((p) => {
      if (p.tour) return { ...p, tour: false };
      if (p.step === 6) return { ...p, ...stepState(0), tour: true, phase: "blocked" };
      return { ...p, ...stepState(p.step), tour: true };
    });
  }, []);

  const zoom = useCallback((factor: number) => {
    touched.current = true;
    setS((p) => ({ ...p, tour: false, cam: { ...p.cam, s: Math.min(2.2, Math.max(0.4, p.cam.s * factor)) } }));
  }, []);

  const dragTo = useCallback((x: number, y: number) => {
    touched.current = true;
    setS((p) => ({ ...p, drag: { x, y }, tour: false }));
  }, []);

  const applyFix = useCallback(() => {
    touched.current = true;
    setS((p) => ({ ...p, ...stepState(5), phase: "fixed", tour: true }));
  }, []);

  const acceptRisk = useCallback(() => {
    touched.current = true;
    setS((p) => ({ ...p, ...stepState(6), phase: "accepted", tour: true }));
  }, []);

  return { s, patch, startTour, focus, goSite, goStep, toggleTour, zoom, dragTo, applyFix, acceptRisk };
}

export type ReleaseStory = ReturnType<typeof useReleaseStory>;
