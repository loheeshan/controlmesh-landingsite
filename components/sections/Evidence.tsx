export function Evidence() {
  return (
    <section id="evidence" className="section split">
      <div className="split-text">
        <div className="kicker">T+09:00 · Release signed</div>
        <h2 className="h2">Every release gets a receipt.</h2>
        <p className="lead">
          When a hospital partner, an investor or an auditor asks &quot;how do you know patient data is safe?&quot;, send them the
          record instead of a spreadsheet.
        </p>
      </div>
      <div className="split-visual">
        <div className="record">
          <div className="record-head">
            <span className="mono muted small">EVIDENCE RECORD</span>
            <span className="mono badge-ok">SHIP</span>
          </div>
          <dl>
            <dt>Release</dt><dd><strong>v2.4.1 · booking-api</strong></dd>
            <dt>Checks run</dt><dd>Code · Secrets · Dependencies · AWS · API authorization</dd>
            <dt>Proven issues</dt><dd>0 open · <span className="ok">1 fixed and re-tested</span></dd>
            <dt>Accepted risks</dt><dd>0</dd>
            <dt>Signature</dt><dd className="mono small">sha256:9f2c…e81a (example)</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
