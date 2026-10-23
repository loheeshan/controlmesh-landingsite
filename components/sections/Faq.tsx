"use client";

import { useState } from "react";
import { ChevronDown } from "@/components/Icons";

const FAQS: [string, string][] = [
  ["Does ControlMesh replace our scanners?", "It runs proven open-source scanners for you, then adds what they cannot: a runtime test that proves whether an API flaw is exploitable, and the data and people that flaw exposes."],
  ["Can it change anything in our AWS account?", "No. It connects through a read-only, least-privilege role that you create and can inspect first."],
  ["Will the tests touch real patients or production?", "No. Authorization tests run only against a staging copy you register, using test accounts you provide."],
  ["Which platforms does it support?", "GitHub and AWS first. Azure and Google Cloud adapters are on the roadmap."],
  ["What does it cost?", "Pilot terms and pricing will be shared with the first teams. Join the pilot and we'll be in touch."],
  ["Who is building ControlMesh?", "Team CS-54, a student team at the Informatics Institute of Technology (IIT) in Sri Lanka."],
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="band">
      <div className="section narrow stacked">
        <h2 className="h2">Questions</h2>
        <div className="faq">
          {FAQS.map(([q, a], i) => (
            <div key={q} className="faq-item">
              <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{q}</span>
                <span className={`faq-chev${open === i ? " faq-chev-open" : ""}`}><ChevronDown size={22} color="#FF6B1A" /></span>
              </button>
              {open === i && <p className="faq-a rise">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
