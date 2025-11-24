import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import SelectedWorks from "@/components/SelectedWorks";
import Skills from "@/components/Skills";
import ContributionGraph from "@/components/ContributionGraph";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <SelectedWorks />
      <Skills />
      <ContributionGraph />
      <Contact />
    </main>
  );
}
