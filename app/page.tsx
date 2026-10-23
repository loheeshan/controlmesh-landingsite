import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ReleaseStory } from "@/components/story/ReleaseStory";
import { Engines } from "@/components/sections/Engines";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FilmTeaser } from "@/components/sections/FilmTeaser";
import { Roles } from "@/components/sections/Roles";
import { Compare } from "@/components/sections/Compare";
import { Trust } from "@/components/sections/Trust";
import { Evidence } from "@/components/sections/Evidence";
import { Faq } from "@/components/sections/Faq";
import { Pilot } from "@/components/sections/Pilot";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <ReleaseStory />
        <Engines />
        <Problem />
        <HowItWorks />
        <FilmTeaser />
        <Roles />
        <Compare />
        <Trust />
        <Evidence />
        <Faq />
        <Pilot />
      </main>
      <Footer />
    </>
  );
}
