import Link from "next/link";

/** Poster that links to the 30-second animated film at /film. */
export function FilmTeaser() {
  return (
    <section id="film" className="section stacked">
      <div className="intro">
        <div className="kicker">T+04:00 · One bug, start to finish</div>
        <h2 className="h2">Prefer to sit back? Watch the 30-second film.</h2>
      </div>
      <Link href="/film" className="film-poster" aria-label="Play the 30-second film">
        <svg viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="#FF6B1A" strokeOpacity=".35" strokeWidth="1.4" fill="none">
            <path className="dash-line" d="M150 340 L420 200 L700 340 L980 200" />
            <path className="dash-line" d="M150 340 L420 480 L700 340 L980 480" />
          </g>
          <g fill="#FF6B1A">
            {[[150, 340], [420, 200], [420, 480], [700, 340], [980, 200], [980, 480]].map(([cx, cy], i) => (
              <circle key={i} className="node" cx={cx} cy={cy} r={i % 3 === 0 ? 6 : 5} style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
          </g>
        </svg>
        <span className="film-play">
          <span className="film-button glow">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#0F0E0D" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
          <span>How ControlMesh works · 30 s</span>
        </span>
      </Link>
    </section>
  );
}
