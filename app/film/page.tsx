import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Film } from "@/components/film/Film";
import "@/styles/film.css";

export const metadata: Metadata = {
  title: "How ControlMesh works · 30-second film",
  description: "One bug, from git push to a blocked release, a fix and a signed evidence record.",
};

export default function FilmPage() {
  return (
    <div className="film-page">
      <Nav />
      <main className="film-wrap">
        <div className="kicker">30-second film</div>
        <h1>One bug, from git push to a signed release.</h1>
        <Film />
        <p className="film-rotate muted">Tip: turn your phone sideways for a bigger film.</p>
        <p className="muted">
          Illustrative example. Names and records are made up. <Link href="/#map">Explore it on the live map →</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
