"use client";

import { useEffect, useRef, useState } from "react";
import { FONTS, THEME_SETTINGS, THEME_STORAGE_KEY, THEMES, type FontChoice, type ThemeId } from "@/lib/theme";

/**
 * Floating theme switcher for comparing looks while the design is being decided.
 * Turn it off with THEME_SETTINGS.showCustomizer = false in lib/theme.ts.
 * Choices are saved only in this browser, so nobody else sees them.
 */
export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeId>(THEME_SETTINGS.defaultTheme);
  const [font, setFont] = useState<FontChoice>("theme");
  const [copied, setCopied] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const tab = useRef<HTMLButtonElement>(null);

  // Pick up whatever the boot script already applied.
  useEffect(() => {
    const d = document.documentElement.dataset;
    if (THEMES.some((t) => t.id === d.theme)) setTheme(d.theme as ThemeId);
    if (d.font === "inter" || d.font === "grotesk") setFont(d.font);
  }, []);

  const apply = (nextTheme: ThemeId, nextFont: FontChoice) => {
    setTheme(nextTheme);
    setFont(nextFont);
    const d = document.documentElement;
    d.dataset.theme = nextTheme;
    if (nextFont === "theme") delete d.dataset.font;
    else d.dataset.font = nextFont;
    try {
      if (nextTheme === THEME_SETTINGS.defaultTheme && nextFont === "theme") localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ theme: nextTheme, font: nextFont }));
    } catch {
      /* private mode: the choice just won't survive a reload */
    }
  };

  // Close on Escape or a click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        tab.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !tab.current?.contains(t)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const snippet = `defaultTheme: "${theme}",`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: the line is visible to copy by hand */
    }
  };
  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];
  const isDefault = theme === THEME_SETTINGS.defaultTheme && font === "theme";

  return (
    <>
      <button
        ref={tab}
        className={`tc-tab${open ? " tc-tab-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="theme-panel"
      >
        <span className="tc-tab-dots" aria-hidden="true">
          <i style={{ background: current.swatches[3] }} />
          <i style={{ background: current.swatches[4] }} />
          <i style={{ background: current.swatches[5] }} />
        </span>
        <span className="tc-tab-label">Theme</span>
      </button>

      {open && (
        <div ref={panel} id="theme-panel" className="tc-panel rise" role="dialog" aria-label="Theme preview">
          <div className="tc-head">
            <strong>Theme preview</strong>
            <button className="tc-x" onClick={() => setOpen(false)} aria-label="Close theme preview">×</button>
          </div>

          <div role="radiogroup" aria-label="Theme" className="tc-themes">
            {(["Current", "Storyboard options"] as const).map((group) => (
              <div key={group} className="tc-themes-group">
                <span className="tc-label">{group}</span>
                {THEMES.filter((t) => t.group === group).map((t) => (
                  <button
                    key={t.id}
                    role="radio"
                    aria-checked={theme === t.id}
                    className={`tc-theme${theme === t.id ? " tc-theme-on" : ""}`}
                    onClick={() => apply(t.id, font)}
                  >
                    <span className="tc-swatches" aria-hidden="true">
                      {t.swatches.map((c, i) => <i key={i} style={{ background: c }} />)}
                    </span>
                    <span className="tc-name">
                      <span className="tc-name-text">{t.name}</span>
                      <span className="tc-tags">
                        <em className="tc-mode">{t.mode}</em>
                        {t.shortlist && <em className="tc-short">Shortlist</em>}
                        {t.id === THEME_SETTINGS.defaultTheme && <em>Live</em>}
                      </span>
                    </span>
                    {theme === t.id && <span className="tc-note">{t.note}</span>}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="tc-group">
            <span className="tc-label">Headings</span>
            <div role="radiogroup" aria-label="Heading font" className="tc-seg">
              {FONTS.map((f) => (
                <button key={f.id} role="radio" aria-checked={font === f.id} className={font === f.id ? "on" : ""} onClick={() => apply(theme, f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tc-foot">
            <span className="tc-label">Make it the live theme</span>
            <span className="tc-help">
              In <code>lib/theme.ts</code> set:
            </span>
            <div className="tc-code">
              <code>{snippet}</code>
              <button onClick={copy}>{copied ? "Copied" : "Copy"}</button>
            </div>
            <span className="tc-help">
              Then set <code>showCustomizer: false</code> to hide this tab. Only you see your preview; it&apos;s saved in this browser.
            </span>
            <button className="tc-reset" onClick={() => apply(THEME_SETTINGS.defaultTheme, "theme")} disabled={isDefault}>
              Reset to the live theme
            </button>
          </div>
        </div>
      )}
    </>
  );
}
