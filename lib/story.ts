// Data for the release story told on the map. Everything here is illustrative:
// Nimal, Kamala, MediBook and the numbers are made up for the demo.
import { routeThrough } from "./iso";

export type Phase = "blocked" | "fixed" | "accepted";
export type Tone = "" | "alert" | "ok" | "cm";
export type SiteId = "all" | "homes" | "hosp" | "office" | "stg" | "dc" | "cm";
export type CamId = SiteId | "impact";
export type ObjId =
  | "hospital" | "nimal" | "kamala" | "office" | "stg" | "lab" | "cmhq" | "vault"
  | "db" | "gate" | "hall" | "s3b" | "keycard" | "s3a";
export type Selection = ObjId | "release";

export type Cam = { x: number; y: number; s: number };

export const CAMS: Record<CamId, Cam> = {
  all: { x: 1248, y: 760, s: 0.55 },
  office: { x: 1280, y: 330, s: 1.1 },
  stg: { x: 1776, y: 578, s: 1.15 },
  cm: { x: 800, y: 530, s: 1.05 },
  dc: { x: 1424, y: 900, s: 0.9 },
  homes: { x: 416, y: 800, s: 1.15 },
  hosp: { x: 930, y: 1040, s: 1.0 },
  impact: { x: 960, y: 850, s: 0.68 },
};

export const SITES: { id: SiteId; code: string; name: string; sub: string; color: string }[] = [
  { id: "all", code: "ALL", name: "Whole city", sub: "7 places · 1 release", color: "var(--text)" },
  { id: "homes", code: "HOME", name: "Patients' homes", sub: "Nimal and Kamala", color: "#F08F8F" },
  { id: "hosp", code: "HOSP", name: "City Hospital", sub: "uploads scans", color: "var(--w-dc)" },
  { id: "office", code: "DEV", name: "MediBook office", sub: "PR #482 open", color: "var(--text-2)" },
  { id: "stg", code: "STG", name: "Staging · test copy", sub: "2 test users", color: "var(--w-dc)" },
  { id: "dc", code: "AWS", name: "Data center", sub: "ap-south-1 · production", color: "var(--w-dc)" },
  { id: "cm", code: "CM", name: "ControlMesh", sub: "read-only", color: "var(--brand)" },
];

/** Clickable things on the map. bb = hit box [left, top, width, height]; x/y = label anchor. */
export const OBJECTS: { id: ObjId; zone: SiteId; tag: string; bb: [number, number, number, number]; x: number; y: number }[] = [
  { id: "hospital", zone: "hosp", tag: "City Hospital", bb: [688, 876, 541, 354], x: 980, y: 905 },
  { id: "nimal", zone: "homes", tag: "Nimal · patient", bb: [198, 658, 288, 204], x: 374, y: 700 },
  { id: "kamala", zone: "homes", tag: "Kamala · patient", bb: [339, 762, 269, 190], x: 502, y: 800 },
  { id: "office", zone: "office", tag: "MediBook office", bb: [1037, 136, 518, 371], x: 1288, y: 134 },
  { id: "stg", zone: "stg", tag: "Staging copy", bb: [1638, 421, 256, 192], x: 1766, y: 425 },
  { id: "lab", zone: "stg", tag: "Test lab", bb: [1670, 564, 256, 180], x: 1798, y: 570 },
  { id: "cmhq", zone: "cm", tag: "ControlMesh", bb: [710, 321, 244, 317], x: 832, y: 312 },
  { id: "vault", zone: "cm", tag: "Evidence vault", bb: [710, 621, 180, 136], x: 800, y: 625 },
  { id: "db", zone: "dc", tag: "Records vault", bb: [1026, 814, 72, 110], x: 1062, y: 808 },
  { id: "gate", zone: "dc", tag: "Front gate", bb: [1018, 704, 262, 171], x: 1180, y: 708 },
  { id: "hall", zone: "dc", tag: "Server hall", bb: [1133, 686, 467, 324], x: 1400, y: 690 },
  { id: "s3b", zone: "dc", tag: "Billing silo", bb: [1506, 1033, 60, 120], x: 1536, y: 1030 },
  { id: "keycard", zone: "dc", tag: "Keycard door", bb: [1482, 823, 160, 174], x: 1562, y: 822 },
  { id: "s3a", zone: "dc", tag: "Scans silo · public", bb: [1645, 894, 77, 201], x: 1700, y: 890 },
];

export const ZONE_LABELS: { text: string; x: number; y: number; color?: string }[] = [
  { text: "MEDIBOOK OFFICE", x: 950, y: 374 },
  { text: "STAGING · TEST COPY", x: 1462, y: 630 },
  { text: "CONTROLMESH · READ-ONLY", x: 454, y: 622, color: "var(--brand-2)" },
  { text: "DATA CENTER · AWS", x: 1640, y: 1090, color: "var(--w-dc)" },
  { text: "PATIENTS' HOMES", x: 120, y: 900 },
  { text: "CITY HOSPITAL", x: 760, y: 1250 },
];

const REQUEST: [number, number][] = [[6.6, 37], [6.6, 30.8], [15.5, 30.8], [15.5, 22], [19.5, 22], [25.5, 22.8], [30.55, 21.75], [34.6, 22.4]];

export const ROUTES = {
  request: routeThrough(REQUEST),
  response: routeThrough([...REQUEST].reverse()),
  blocked: routeThrough(REQUEST.slice(0, 5).concat([[24.6, 22.6]])),
  blockedBack: routeThrough([[24.6, 22.6], ...REQUEST.slice(0, 5).reverse()]),
  traffic: routeThrough([[11.4, 37.4], [11.4, 30.8], [15.5, 30.8], [15.5, 22], [19.5, 22], [25.5, 22.8], [21, 27.2]]),
  upload: routeThrough([[24, 33], [24, 30.8], [33.4, 30.8], [34.6, 24.6]]),
  push: routeThrough([[10, 10.4], [15.5, 10.4], [15.5, 6], [19, 6]]),
  beamOffice: "M832 378 Q1010 200 1288 228",
  beamLab: "M832 378 Q1300 260 1798 628",
  beamDc: "M832 378 Q1120 480 1344 840",
};

export type TourStep = {
  label: string; time: string; site: SiteId; cam: CamId; sel: Selection;
  beam: "" | "office" | "lab" | "dc"; dur: number; note: string;
};

/** Steps 0-5 show in the tracker; step 6 is the closing shot at the evidence vault. */
export const TOUR: TourStep[] = [
  { label: "Connect", time: "09:41", site: "cm", cam: "cm", sel: "cmhq", beam: "", dur: 4800, note: "ControlMesh connects, read-only" },
  { label: "Analyze", time: "09:42", site: "office", cam: "office", sel: "office", beam: "office", dur: 5200, note: "The office pushes PR #482" },
  { label: "Test", time: "09:44", site: "stg", cam: "stg", sel: "lab", beam: "lab", dur: 6000, note: "Attacked on the staging copy" },
  { label: "Correlate", time: "09:45", site: "all", cam: "impact", sel: "nimal", beam: "dc", dur: 7500, note: "What it means for real patients" },
  { label: "Decide", time: "09:45", site: "all", cam: "all", sel: "release", beam: "", dur: 6000, note: "One decision for the release" },
  { label: "Verify", time: "09:58", site: "stg", cam: "stg", sel: "lab", beam: "lab", dur: 5500, note: "Same attack, run again" },
  { label: "Signed", time: "", site: "cm", cam: "cm", sel: "vault", beam: "", dur: 5000, note: "Signed into the evidence vault" },
];

export type Panel = {
  kind: string; name: string; sub: string; chip: [string, Tone];
  rows: [string, string, Tone][]; note: string; link: [string, Selection] | null;
};

/** Side-panel content for every object except Nimal and the release (those have custom panels). */
export function panelFor(id: ObjId, phase: Phase): Panel | null {
  const fixed = phase === "fixed";
  const acc = phase === "accepted";
  const P: Partial<Record<ObjId, Panel>> = {
    office: {
      kind: "MEDIBOOK OFFICE · DEVELOPERS", name: "booking-api team", sub: "Wrote PR #482 with an AI coding assistant",
      chip: ["PR #482 open", ""],
      rows: [["Change", "Add patient records endpoint", ""], ["Code patterns · Opengrep", "14", ""], ["Secrets · Gitleaks", "2", ""], ["Dependencies · OSV · Trivy", "9", ""], ["AWS settings · Prowler", "22", ""]],
      note: "47 possible issues. ControlMesh tests the risky ones so nobody has to triage all 47.", link: ["See the test", "lab"],
    },
    stg: {
      kind: "STAGING · A COPY OF THE APP", name: "booking-api (staging)", sub: "staging.medibook.lk", chip: ["Healthy", "ok"],
      rows: [["Version", fixed ? "v2.4.1-rc1" : "v2.4.0-rc1", ""], ["Test users", "test patient A · test patient B", ""], ["Real patient data", "None", "ok"]],
      note: "ControlMesh only attacks this copy, never the real app.", link: ["Open the test lab", "lab"],
    },
    lab: {
      kind: "CONTROLMESH TEST LAB", name: "Authorization tests", sub: "3 requests on the staging copy",
      chip: fixed ? ["All passing", "ok"] : ["1 failing", "alert"],
      rows: [["A asks for A's record", "200 · expected", "ok"], ["A asks for B's record", fixed ? "403 · refused" : "200 · handed over", fixed ? "ok" : "alert"], ["No login, asks for B's", "401 · refused", "ok"]],
      note: fixed ? "The same attack now fails. That is the proof the fix works." : "Login was checked. Ownership wasn't.",
      link: ["What this means for Nimal", "nimal"],
    },
    cmhq: {
      kind: "CONTROLMESH", name: "Your workspace", sub: "Team CS-54 demo", chip: ["Read-only", "ok"],
      rows: [["GitHub", "App installed · 2 repos", ""], ["AWS", "role/ControlMeshReadOnly", ""], ["Staging", "2 test users registered", ""], ["Engines", "Opengrep · Gitleaks · OSV · Trivy · Schemathesis · Prowler", ""]],
      note: "It can look. It can't change anything.", link: ["Open the evidence vault", "vault"],
    },
    vault: {
      kind: "EVIDENCE VAULT", name: "Release records", sub: "One signed record per release", chip: ["Signed", "ok"],
      rows: [
        ["v2.3.9", "Ship · signed 21 Oct", "ok"],
        ["v2.4.0", acc ? "Ship + 1 exception" : fixed ? "Blocked · replaced" : "Blocked", acc || !fixed ? "alert" : ""],
        ["v2.4.1", fixed ? "Ship · signed today" : "—", fixed ? "ok" : ""],
      ],
      note: fixed ? "sha256:9f2c…e81a · 1 fixed and re-tested, 0 exceptions." : acc ? "Exception owner: you. It stays open until it is fixed." : "The next record is written when the release is decided.",
      link: null,
    },
    gate: {
      kind: "FRONT GATE · API GATEWAY", name: "api.medibook.lk", sub: "Checks every visitor's login", chip: ["Open to the internet", ""],
      rows: [["Checks", "Are you logged in?", ""], ["Does not check", "Whose record you asked for", "alert"], ["New door in v2.4.0", "/patients/{id}/records", "alert"]],
      note: "Like a front desk that checks your ID but not which file you walk out with.", link: ["Follow the request inside", "hall"],
    },
    hall: {
      kind: "SERVER HALL · ECS", name: "booking-api", sub: "3 copies running",
      chip: fixed ? ["Patched in v2.4.1", "ok"] : ["1 proven exploit", "alert"],
      rows: [["Running version", fixed ? "v2.4.1" : "v2.3.9 (v2.4.0 held back)", ""], ["Keycard it carries", "booking-api-role", ""], ["Problem", fixed ? "Fixed and re-tested" : "Hands any patient's record to anyone logged in", fixed ? "ok" : "alert"]],
      note: "", link: ["Which doors its keycard opens", "keycard"],
    },
    keycard: {
      kind: "KEYCARD · IAM ROLE", name: "booking-api-role", sub: "Carried by the server hall", chip: ["Opens too many doors", "alert"],
      rows: [["Opens", "Every silo (s3:GetObject *)", "alert"], ["Needs", "Only one", ""]],
      note: "Give the hall a keycard for the one silo it needs.", link: ["Where it leads", "s3a"],
    },
    s3a: {
      kind: "STORAGE SILO · S3", name: "patient-scans", sub: "Scans uploaded by City Hospital", chip: ["Public", "alert"],
      rows: [["Holds", "X-rays, scans, reports", ""], ["Block public access", "Off", "alert"], ["Opened by", "booking-api-role", ""]],
      note: fixed ? "The API path is closed. The public setting is still flagged and waits in the review queue." : "Kamala's chest X-ray is in here. With the flaw, anyone logged in can reach it.",
      link: ["See the release decision", "release"],
    },
    s3b: {
      kind: "STORAGE SILO · S3", name: "billing-exports", sub: "Billing data", chip: ["Private", "ok"],
      rows: [["Block public access", "On", "ok"], ["Encryption", "SSE-KMS", "ok"], ["Opened by", "booking-api-role (too wide)", ""]],
      note: "", link: null,
    },
    db: {
      kind: "RECORDS VAULT · RDS", name: "patients-db", sub: "Diagnoses and appointments", chip: ["Private", "ok"],
      rows: [["Public access", "No", "ok"], ["Encryption", "On", "ok"], ["Backups", "7 days", ""]],
      note: "The vault is locked. The leak is the app handing records to the wrong person.", link: ["Who could see them", "nimal"],
    },
    kamala: {
      kind: "PATIENT · AT HOME", name: "Kamala", sub: "Her scans come from City Hospital",
      chip: fixed ? ["Her record is protected", "ok"] : ["Her record is exposed", "alert"],
      rows: [["Diagnosis", "stored in patients-db", ""], ["Scans", "stored in patient-scans", ""], ["Who could open them", fixed ? "Only Kamala and her doctors" : "Any logged-in patient", fixed ? "ok" : "alert"]],
      note: "She did nothing wrong. The app did.", link: ["See what Nimal sees", "nimal"],
    },
    hospital: {
      kind: "CITY HOSPITAL", name: "Radiology", sub: "Sends scans to MediBook", chip: ["Uploading", "ok"],
      rows: [["Sends", "Scans and reports, every day", ""], ["Lands in", "s3://patient-scans", ""], ["That silo is", "Public", "alert"]],
      note: "The hospital trusts MediBook with its patients. The blue dots are its uploads.", link: ["Open the silo", "s3a"],
    },
  };
  return P[id] ?? null;
}

export type ListRow = { a: string; b: string; st: string; tone: Tone; to: Selection };
export type ListTab = "findings" | "people" | "places";

export function listsFor(phase: Phase): Record<ListTab, ListRow[]> {
  const fixed = phase === "fixed";
  return {
    findings: [
      { a: "Any patient can open anyone's record", b: "BOLA · booking-api", st: fixed ? "Fixed" : "Proven", tone: fixed ? "ok" : "alert", to: "lab" },
      { a: "Scans silo is public", b: "s3://patient-scans", st: "Review", tone: "alert", to: "s3a" },
      { a: "Keycard opens every silo", b: "booking-api-role", st: "Review", tone: "", to: "keycard" },
      { a: "Outdated package with CVE", b: "package.json", st: "Not reachable", tone: "", to: "office" },
    ],
    people: [
      { a: "Nimal", b: "patient · at home", st: fixed ? "Own records" : "Can open any", tone: fixed ? "ok" : "alert", to: "nimal" },
      { a: "Kamala", b: "patient · at home", st: fixed ? "Protected" : "Exposed", tone: fixed ? "ok" : "alert", to: "kamala" },
      { a: "City Hospital", b: "uploads scans", st: "Uploading", tone: "ok", to: "hospital" },
      { a: "booking-api team", b: "MediBook office", st: "PR #482", tone: "", to: "office" },
    ],
    places: [
      { a: "Front gate", b: "api.medibook.lk", st: "Public", tone: "", to: "gate" },
      { a: "Server hall", b: "ECS · booking-api", st: fixed ? "Patched" : "Exploit", tone: fixed ? "ok" : "alert", to: "hall" },
      { a: "Keycard door", b: "IAM · booking-api-role", st: "Too wide", tone: "alert", to: "keycard" },
      { a: "Scans silo", b: "S3 · patient-scans", st: "Public", tone: "alert", to: "s3a" },
      { a: "Billing silo", b: "S3 · billing-exports", st: "Private", tone: "ok", to: "s3b" },
      { a: "Records vault", b: "RDS · patients-db", st: "Private", tone: "ok", to: "db" },
    ],
  };
}

/** Words people may type into the map search, mapped to what they mean. */
export const SEARCH_ALIASES: Record<string, Selection> = {
  nimal: "nimal", kamala: "kamala", hospital: "hospital", scan: "s3a", scans: "s3a", silo: "s3a", bucket: "s3a",
  s3: "s3a", keycard: "keycard", role: "keycard", iam: "keycard", gate: "gate", api: "gate", hall: "hall",
  server: "hall", ecs: "hall", vault: "vault", evidence: "vault", db: "db", database: "db", records: "db",
  office: "office", developers: "office", test: "lab", lab: "lab", staging: "stg", release: "release", controlmesh: "cmhq",
};

/** Selections that light up the attack path when picked. */
export const ATTACK_RELATED: Selection[] = ["nimal", "kamala", "s3a", "keycard", "hall", "gate"];
