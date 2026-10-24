// ─────────────────────────────────────────────────────────────
//  Theme settings: the only two lines you need to change.
//
//  defaultTheme    the theme every visitor sees.
//  showCustomizer  the floating "Theme" tab on the right edge.
//                  Set it to false once the theme is final: the tab
//                  disappears and every visitor gets defaultTheme.
// ─────────────────────────────────────────────────────────────
export const THEME_SETTINGS = {
  defaultTheme: "ember" as ThemeId, // ember · midnight · navy-ember · indigo · emerald · graphite · teal-lime · violet
  showCustomizer: true,
};

export type ThemeId =
  | "ember" | "midnight" | "navy-ember"
  | "indigo" | "emerald" | "graphite" | "teal-lime" | "violet";
export type FontChoice = "theme" | "inter" | "grotesk";

export type ThemeInfo = {
  id: ThemeId;
  name: string;
  group: "Current" | "Storyboard options";
  mode: "Dark" | "Light";
  /** On the storyboard's shortlist. */
  shortlist?: boolean;
  note: string;
  /** background, card, text, action, risk, safe */
  swatches: [string, string, string, string, string, string];
};

export const THEMES: ThemeInfo[] = [
  {
    id: "ember", name: "Ember", group: "Current", mode: "Dark",
    note: "The original look. Warm charcoal, orange for action and risk, blue for safe.",
    swatches: ["#0f0e0d", "#171513", "#f5efe6", "#ff6b1a", "#ff6b1a", "#8ec5ff"],
  },
  {
    id: "midnight", name: "Midnight Navy + Electric Cyan", group: "Current", mode: "Dark", shortlist: true,
    note: "The control room at night: calm navy, cyan for action. Space Grotesk headings.",
    swatches: ["#080f1f", "#142238", "#e6edf7", "#00d9ff", "#ef4444", "#22c55e"],
  },
  {
    id: "navy-ember", name: "Navy + Ember", group: "Current", mode: "Dark",
    note: "Storyboard navy surfaces with the original orange and blue.",
    swatches: ["#080f1f", "#142238", "#e6edf7", "#ff6b1a", "#ff6b1a", "#8ec5ff"],
  },
  {
    id: "indigo", name: "1 · Indigo Trust", group: "Storyboard options", mode: "Light", shortlist: true,
    note: "The audit room: steady, formal, quietly confident. Indigo action. Plus Jakarta Sans and IBM Plex Mono.",
    swatches: ["#f7f7fb", "#ffffff", "#14132b", "#4f46e5", "#dc2626", "#16a34a"],
  },
  {
    id: "emerald", name: "2 · Emerald Assurance", group: "Storyboard options", mode: "Light",
    note: "Everything in order: fresh and reassuring. Emerald action sits close to the Passed green. Manrope.",
    swatches: ["#f4f7f5", "#ffffff", "#10231b", "#047857", "#dc2626", "#15803d"],
  },
  {
    id: "graphite", name: "3 · Graphite Signal", group: "Storyboard options", mode: "Dark",
    note: "The security operations console: neutral graphite, one amber beacon for \"your action\". Inter Tight and IBM Plex Mono.",
    swatches: ["#0e0f11", "#17191c", "#ecedee", "#f5a524", "#ef4444", "#22c55e"],
  },
  {
    id: "teal-lime", name: "4 · Deep Teal + Signal Lime", group: "Storyboard options", mode: "Dark", shortlist: true,
    note: "A living mesh: deep-water teal with a lime pulse for actions. Space Grotesk.",
    swatches: ["#071a1d", "#0e2a2e", "#e7f5f2", "#c6f432", "#ef4444", "#4ade80"],
  },
  {
    id: "violet", name: "5 · Violet Aurora", group: "Storyboard options", mode: "Dark",
    note: "Agents at work through the night: deep violet with an aurora cyan edge. Sora.",
    swatches: ["#0f0b1f", "#1a1433", "#eeeafb", "#7c3aed", "#ef4444", "#22c55e"],
  },
];

export const FONTS: { id: FontChoice; label: string }[] = [
  { id: "theme", label: "Theme font" },
  { id: "inter", label: "Inter" },
  { id: "grotesk", label: "Space Grotesk" },
];

export const THEME_STORAGE_KEY = "cm-theme-preview";

/**
 * Runs in <head> before the page paints, so a previewed theme doesn't flash
 * the default first. Only included while the customiser is on.
 */
export const themeBootScript = `(function(){try{var v=JSON.parse(localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})||"null");if(!v)return;var t=${JSON.stringify(THEMES.map((t) => t.id))};var d=document.documentElement;if(t.indexOf(v.theme)>-1)d.dataset.theme=v.theme;if(v.font==="inter"||v.font==="grotesk")d.dataset.font=v.font;}catch(e){}})();`;
