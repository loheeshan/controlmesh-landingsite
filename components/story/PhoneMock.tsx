import { CrossIcon, LockIcon } from "@/components/Icons";

export type PhoneView = "own" | "probe" | "leak" | "fixed";

/** The MediBook app on Nimal's phone. All names and records are made up. */
export function PhoneMock({ view, size = "md" }: { view: PhoneView; size?: "sm" | "md" }) {
  return (
    <div className={`phone phone-${size}`}>
      <div className="phone-bar">
        <CrossIcon size={size === "sm" ? 12 : 14} />
        MediBook
      </div>
      <div className="phone-url mono">
        medibook.lk/patients/
        {view === "own" && "A-1187"}
        {view === "probe" && (
          <>
            <s>A-1187</s> <b className="phone-typing">B-2041</b>
          </>
        )}
        {view === "leak" && <b className="phone-hot">B-2041</b>}
        {view === "fixed" && <b>B-2041</b>}
        /records
      </div>

      {view === "own" && (
        <div className="phone-body">
          <div className="phone-title">Hi Nimal</div>
          <div className="phone-sub">Your records</div>
          <div className="phone-row">Dental check-up<span>02 Oct</span></div>
          <div className="phone-row">Blood test<span>18 Sep</span></div>
          <div className="phone-row">Eye exam<span>30 Jul</span></div>
        </div>
      )}

      {view === "probe" && (
        <div className="phone-body phone-loading" aria-label="Loading">
          <div className="phone-skel" style={{ width: "60%" }} />
          <div className="phone-skel" />
          <div className="phone-skel" />
          <div className="phone-skel" style={{ width: "80%" }} />
        </div>
      )}

      {view === "leak" && (
        <div className="rise">
          <div className="phone-warn">SIGNED IN AS NIMAL · NOT HIS RECORD</div>
          <div className="phone-body">
            <div className="phone-title">Kamala Perera</div>
            <div className="phone-sub">Patient B-2041 · born 1968</div>
            <div className="phone-row">Diagnosis<span>Type 2 diabetes</span></div>
            <div className="phone-row">HbA1c<span>7.9%</span></div>
            <div className="phone-row">Scan · City Hospital<span>chest-xray.png</span></div>
          </div>
        </div>
      )}

      {view === "fixed" && (
        <div className="phone-body phone-denied rise">
          <LockIcon size={34} color="#1F5F8F" />
          <div className="phone-403">403</div>
          <div className="phone-title-sm">Access denied</div>
          <div className="phone-sub">You can only open your own records.</div>
        </div>
      )}
    </div>
  );
}
