import { jobs, education, site, type Job } from "@/lib/content";

function JobRow({ j }: { j: Job }) {
  return (
    <li className="job" data-seg={j.seg}>
      <h3>{j.title}</h3>
      <div><p className="co">{j.org}</p><p>{j.text}</p></div>
      <p className="when">{j.when}</p>
    </li>
  );
}

export default function Experience({ route }: { route: { svg: string; focus: number } }) {
  return (
    <section className="chapter wrap exp" id="experience" aria-labelledby="exp-h">
      <div className="chap-head">
        <h2 className="chap" id="exp-h">The route so far.</h2>
        <p className="chap-lead">Drawn to scale, one column per year. The line gets heavier where the internship became a full-time role.</p>
      </div>
      <figure className="route">
        <div className="pan" tabIndex={0} role="region" aria-label="Experience timeline" data-focus={route.focus} dangerouslySetInnerHTML={{ __html: route.svg }} />
        <figcaption className="swipe">Swipe sideways for the whole route, from 2021 to today.</figcaption>
      </figure>

      <p className="label sub-label">Work experience</p>
      <ol className="jobs">
        {jobs.map((j) => <JobRow key={j.seg} j={j} />)}
      </ol>

      <p className="label sub-label">Education</p>
      <ol className="jobs">
        <JobRow j={education} />
      </ol>
      {site.resume && (
        <p className="res"><a className="u ar ar-ne" href={site.resume} target="_blank" rel="noopener">Resume (PDF)</a></p>
      )}
    </section>
  );
}
