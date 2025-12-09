import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import SelectedWorks from "@/components/SelectedWorks";
import Skills from "@/components/Skills";
import ContributionGraph from "@/components/ContributionGraph";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <div id="hero">
        <Hero />
      </div>
      <div id="work">
        <SelectedWorks />
      </div>
      <Experience />
      <div id="skills">
        <Skills />
      </div>
      <ContributionGraph />
      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}
