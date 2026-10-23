import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ReleaseStory } from "@/components/story/ReleaseStory";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <ReleaseStory />
      </main>
      <Footer />
    </>
  );
}
