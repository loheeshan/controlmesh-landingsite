import { LockIcon } from "@/components/Icons";
import type { Lens } from "@/lib/lens";
import { PhoneMock } from "./PhoneMock";

function File({ delay }: { delay: number }) {
  return (
    <svg className="fly-file" width="16" height="20" viewBox="0 0 16 20" aria-hidden="true" style={{ animationDelay: `${delay}s` }}>
      <path d="M1 1h9l5 5v13H1z" fill="#F5EFE6" />
      <path d="M10 1v5h5" fill="#FF6B1A" />
    </svg>
  );
}

/** Three cards under the map that translate the current step into everyday terms. */
export function RealLifeStrip({ lens, touring }: { lens: Lens; touring: boolean }) {
  return (
    <section aria-label="What this means in real life" className="strip">
      <div className="strip-head">
        <span className="kicker">What this means in real life</span>
        <span className="muted">{touring ? "Follows the map above as the release plays." : "Follows whatever you pick on the map."}</span>
      </div>
      <div className="strip-cards">
        <div className="card">
          <div className="card-h"><span className="num mono">1</span>What Nimal sees on his phone</div>
          <div className="card-stage">
            <PhoneMock view={lens.phone} />
          </div>
          <p className="card-cap">{lens.phoneCaption}</p>
        </div>

        <div className="card">
          <div className="card-h"><span className="num mono">2</span>Where Kamala&apos;s scans live</div>
          <div className={`card-stage data data-${lens.dataTone}`}>
            <div className="data-end">
              <svg width="64" height="74" viewBox="0 0 64 74" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <ellipse cx="32" cy="12" rx="26" ry="8" />
                <path d="M6 12v48c0 4.4 11.6 8 26 8s26-3.6 26-8V12" />
                <path d="M6 36c0 4.4 11.6 8 26 8s26-3.6 26-8" />
              </svg>
              <span className="mono">patient-scans</span>
            </div>
            <div className="data-flow">
              <span className="data-line" />
              {lens.dataTone === "open" && (
                <>
                  <File delay={0} />
                  <File delay={0.8} />
                  <File delay={1.6} />
                </>
              )}
              {lens.dataTone === "closed" && (
                <span className="data-lock rise"><LockIcon size={14} /> API path closed</span>
              )}
            </div>
            <div className="data-end data-end-sm">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <circle cx="28" cy="28" r="24" />
                <ellipse cx="28" cy="28" rx="10" ry="24" />
                <path d="M4 28h48M9 15h38M9 41h38" />
              </svg>
              <span className="mono">Internet</span>
            </div>
          </div>
          <p className="card-cap">{lens.dataCaption}</p>
        </div>

        <div className={`card${lens.meaningTone ? ` card-${lens.meaningTone}` : ""}`}>
          <div className="card-h"><span className="num mono">3</span>What it means</div>
          <div className="card-stage card-meaning">
            <strong>{lens.meaningTitle}</strong>
            <p>{lens.meaningText}</p>
          </div>
          <p className="card-cap muted">Tests use a staging copy and test patients. Nimal and Kamala are made up.</p>
        </div>
      </div>
    </section>
  );
}
