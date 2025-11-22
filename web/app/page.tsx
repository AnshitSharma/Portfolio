import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ContributionGraph from "@/components/ContributionGraph";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <ContributionGraph />
      <Contact />
    </main>
  );
}
