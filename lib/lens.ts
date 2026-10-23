import type { PhoneView } from "@/components/story/PhoneMock";
import { ATTACK_RELATED, type Phase, type Selection, type Tone } from "./story";

type LensStage = "own" | "probe" | "traced" | "blocked" | "accepted" | "fixed";

export type Lens = {
  phone: PhoneView;
  phoneCaption: string;
  dataTone: "idle" | "open" | "closed";
  dataCaption: string;
  meaningTone: Tone;
  meaningTitle: string;
  meaningText: string;
};

const CAPTIONS: Record<LensStage, string> = {
  own: "Nimal is logged in to MediBook and sees only his own records.",
  probe: "On the staging copy, ControlMesh changes one number in the address: A-1187 becomes B-2041.",
  traced: "In real life, Nimal could open Kamala's record the same way. The app checks he's logged in, not whose record it is.",
  blocked: "In real life, Nimal could open Kamala's record. ControlMesh stopped the release before that happened.",
  accepted: "This still works until the fix ships. The exception keeps it on record.",
  fixed: "After the fix, the same request is refused.",
};

const MEANING: Record<LensStage, [Tone, string, string]> = {
  own: ["", "Without ControlMesh", "This shows up as 1 of 47 alerts, rated MEDIUM. It would probably ship."],
  probe: ["", "Testing, not guessing", "A real request on the staging copy, using test patients, shows whether the flaw works."],
  traced: ["alert", "Proven, and it reaches real people", "Kamala's diagnosis and scans could be opened by any logged-in patient."],
  blocked: ["alert", "Stopped before release", "Found on staging with test users. No real patient's data was touched."],
  accepted: ["alert", "Shipped with a known risk", "The exception is logged with your name until it is fixed."],
  fixed: ["ok", "Fixed and proven", "The same test now gets 403. The fix is signed into the release record."],
};

/** Turns the map's state into the three plain-English cards under it. */
export function lensFor(phase: Phase, step: number, sel: Selection): Lens {
  let stage: LensStage = "own";
  if (phase === "fixed") stage = "fixed";
  else if (phase === "accepted") stage = "accepted";
  else if (step === 2) stage = "probe";
  else if (step === 3) stage = "traced";
  else if (step >= 4) stage = "blocked";
  else if (ATTACK_RELATED.includes(sel)) stage = "traced";

  const exposed = stage === "traced" || stage === "blocked" || stage === "accepted";
  const [meaningTone, meaningTitle, meaningText] = MEANING[stage];

  return {
    phone: stage === "fixed" ? "fixed" : exposed ? "leak" : stage === "probe" ? "probe" : "own",
    phoneCaption: CAPTIONS[stage],
    dataTone: stage === "fixed" ? "closed" : exposed ? "open" : "idle",
    dataCaption:
      stage === "fixed"
        ? "The path through the app is closed. The public silo setting is still flagged and waits in the review queue."
        : exposed
          ? "The server hall carries a keycard that opens the patient-scans silo, and the silo is public. Her scans can walk out the door."
          : "Kamala's scans come from City Hospital and land in the patient-scans silo.",
    meaningTone,
    meaningTitle,
    meaningText,
  };
}
