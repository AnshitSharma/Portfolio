import type { CSSProperties } from "react";
import { site } from "@/lib/content";

// Fig. 0 is filled in by the browser after load, from the Navigation and Resource Timing APIs.
const steps = [
  ["dns", "Find the server"],
  ["conn", "Open a connection"],
  ["wait", "Wait for the server"],
  ["html", "Download the page"],
  ["fonts", "Load the fonts"],
  ["js", "Load the scripts"],
];

export default function Hero() {
  return (
    <section className="hero wrap" id="top" aria-labelledby="hero-h">
      <h1 id="hero-h">
        <span className="ln"><span>Backend /</span></span>
        <span className="ln"><span>In production<a className="fn-mark" href="#fn" aria-label="Footnote">*</a></span></span>
      </h1>
      <p className="tag">Backend engineer<br />Bharat Datacenter<br />New Delhi</p>
      <div className="hero-foot">
        <div className="hero-l">
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
        <figure className="plate trace" id="trace" aria-labelledby="trace-h">
          <div className="tr-head">
            <p className="tr-h" id="trace-h">This page, on its way to you</p>
            <p className="tr-total" data-t="total" aria-live="polite">&hellip;</p>
          </div>
          <ol className="tr-rows">
            {steps.map(([k, label], i) => (
              <li key={k} data-k={k} style={{ "--i": i } as CSSProperties}>
                <span className="tr-l">{label}</span>
                <span className="tr-track"><i /></span>
                <span className="tr-v">&hellip;</span>
              </li>
            ))}
          </ol>
          <div className="tr-axis" aria-hidden="true">
            <span className="tr-ticks"><span /><span /><span /><span /></span>
          </div>
          <figcaption>
            <span className="it">Fig. 0</span>
            <span className="cap" data-t="note">Timed by your browser as the page loads.</span>
          </figcaption>
        </figure>
      </div>
      <p className="fn" id="fn">* The provisioning platform is still in pre-production.</p>
    </section>
  );
}
