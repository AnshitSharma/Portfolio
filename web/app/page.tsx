import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Enhance from "@/components/Enhance";
import { buildRoute } from "@/lib/route";

// Regenerated once a day, so the timeline's "today" and the GitHub ledger stay current.
export const revalidate = 86400;

export default function Home() {
  const route = buildRoute(new Date());
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience route={route} />
        <Contact />
      </main>
      <Footer />
      <p className="toast" id="toast" role="status" aria-live="polite" hidden />
      <Enhance />
    </>
  );
}
