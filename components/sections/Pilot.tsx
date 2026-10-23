"use client";

import { useState } from "react";

// TODO: replace with the team's real inbox, or post the form to a service like Formspree.
const PILOT_EMAIL = "team@controlmesh.example";

export function Pilot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("ControlMesh pilot");
    const body = encodeURIComponent(`Hi team, I'd like to join the ControlMesh pilot.\n\nWork email: ${email}`);
    window.location.href = `mailto:${PILOT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="pilot" className="pilot">
      <div className="kicker">T+10:00 · Ship it</div>
      <h2 className="pilot-title">Ship your next release with proof.</h2>
      <p className="lead">We&apos;re looking for a small number of teams to pilot ControlMesh on a real GitHub repository and AWS account.</p>
      <form className="pilot-form" onSubmit={submit}>
        <label htmlFor="pilot-email" className="sr-only">Work email</label>
        <input
          id="pilot-email"
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Join the pilot</button>
      </form>
      {sent && <p className="muted small rise">Your email app should open with a message ready to send.</p>}
    </section>
  );
}
