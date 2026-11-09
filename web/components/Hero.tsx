import { site } from "@/lib/content";

export default function Hero() {
  return (
    <section className="hero wrap" id="top" aria-labelledby="hero-h">
      <h1 id="hero-h">
        <span className="ln"><span>Backend /</span></span>
        <span className="ln"><span>In production<a className="fn-mark" href="#fn" aria-label="Footnote">*</a></span></span>
      </h1>
      <p className="tag">Backend engineer<br />Bharat Datacenter<br />New Delhi</p>
      <div className="hero-foot">
        <p className="lede">I build the internal systems behind a cloud and hosting provider, from hardware inventory to deploy pipelines. 2.5+ years of experience, internships included.</p>
        <div className="acts">
          <a className="u ar ar-s" href="#work">See the work</a>
          {site.resume ? (
            <a className="u ar ar-ne" href={site.resume} target="_blank" rel="noopener">Resume (PDF)</a>
          ) : (
            <a className="u ar ar-s" href="#contact">Get in touch</a>
          )}
        </div>
      </div>
      <p className="fn" id="fn">* The provisioning platform is still in pre-production.</p>
    </section>
  );
}
