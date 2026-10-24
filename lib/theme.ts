// ─────────────────────────────────────────────────────────────
//  Theme settings: the only two lines you need to change.
//
//  defaultTheme    the theme every visitor sees.
//  showCustomizer  the floating "Theme" tab on the right edge.
//                  Set it to false once the theme is final: the tab
//                  disappears and every visitor gets defaultTheme.
// ─────────────────────────────────────────────────────────────
export const THEME_SETTINGS = {
  defaultTheme: "ember" as ThemeId,
  showCustomizer: true,
};

export type ThemeId = "ember" | "midnight" | "navy-ember";
export type FontChoice = "theme" | "inter" | "grotesk";

export const THEMES: {
  id: ThemeId;
  name: string;
  note: string;
  /** background, card, text, action, risk, safe */
  swatches: [string, string, string, string, string, string];
}[] = [
  {
    id: "ember",
    name: "Ember",
    note: "The current look. Warm charcoal, orange for action and risk, blue for safe.",
    swatches: ["#0f0e0d", "#171513", "#f5efe6", "#ff6b1a", "#ff6b1a", "#8ec5ff"],
  },
  {
    id: "midnight",
    name: "Midnight Navy + Electric Cyan",
    note: "From the theme storyboard. Navy surfaces, cyan for action, red risk, green safe, Space Grotesk headings.",
    swatches: ["#080f1f", "#142238", "#e6edf7", "#00d9ff", "#ef4444", "#22c55e"],
  },
  {
    id: "navy-ember",
    name: "Navy + Ember",
    note: "Storyboard navy surfaces with the original orange and blue.",
    swatches: ["#080f1f", "#142238", "#e6edf7", "#ff6b1a", "#ff6b1a", "#8ec5ff"],
  },
];

export const FONTS: { id: FontChoice; label: string }[] = [
  { id: "theme", label: "Theme" },
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
