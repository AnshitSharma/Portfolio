import { skills, principles } from "@/lib/content";
import Ledger from "./Ledger";

export default function About() {
  return (
    <section className="chapter wrap" id="about" aria-labelledby="about-h">
      <div className="chap-head">
        <h2 className="chap" id="about-h">Behind the systems.</h2>
      </div>
      <div className="about">
        <div className="me">
          <p className="label blk-label">About me</p>
          <p className="me-name">Anshit Sharma</p>
          <p className="label me-role">Backend engineer, New Delhi</p>
          <div className="me-body">
            <p>I&rsquo;m a backend engineer at Bharat Datacenter, a cloud infrastructure and hosting provider. I joined as a web developer intern in June 2024 and moved to a full-time backend role that December.</p>
            <p>I work in Python (FastAPI), PostgreSQL, MySQL, Node.js, TypeScript and React. 2.5+ years of experience, internships included.</p>
          </div>
        </div>
        <div className="skills">
          <p className="label blk-label">Skills and tools</p>
          <dl>
            {skills.map(([t, d]) => (
              <div key={t}><dt className="label">{t}</dt><dd>{d}</dd></div>
            ))}
          </dl>
        </div>
      </div>
      <div className="how">
        <p className="label blk-label">How I work</p>
        <div className="how-cols">
          {principles.map(([t, d]) => (
            <div key={t}><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </div>
      <Ledger />
    </section>
  );
}
