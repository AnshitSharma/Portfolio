import type { CSSProperties } from "react";
import { systems, sideProject, type System } from "@/lib/content";

function Plate({ s, fig }: { s: System; fig: number }) {
  return (
    <figure className={s.dashed ? "plate dashed" : "plate"}>
      <ol className="strip" aria-label={`${s.name}, stop by stop`}>
        {s.stops.map((st, i) => (
          <li key={st.label} className={[i === 0 && "from", st.was && "was"].filter(Boolean).join(" ") || undefined} style={{ "--i": i } as CSSProperties}>
            <button type="button" className="stop">
              <span className="lab">{st.label}</span>
              <span className="note">{st.note}</span>
            </button>
          </li>
        ))}
        <li className="to" style={{ "--i": s.stops.length } as CSSProperties}>
          <span className="fin">
            <b>{s.end.big}</b>
            {s.end.href ? <a href={s.end.href} target="_blank" rel="noopener">{s.end.small}</a> : s.end.small}
          </span>
        </li>
      </ol>
      <figcaption>
        <span className="it">Fig. {fig}</span>
        <span className="cap">
          <span className="cap-def"><span className="dir" /> {s.caption}</span>
          <span className="cap-live" aria-hidden="true" />
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ s, fig, open }: { s: System; fig: number; open?: boolean }) {
  return (
    <details className="work" id={s.id} open={open}>
      <summary>
        <h3 className="w-name">{s.name}</h3>
        <div className="w-text">
          <p className="w-desc">{s.desc}</p>
          {s.status && <p className="w-status">{s.status}</p>}
        </div>
        <span className="tog" aria-hidden="true" />
      </summary>
      <div className="panel">
        <Plate s={s} fig={fig} />
        <dl className="cols">
          {s.cols.map(([t, d]) => (
            <div key={t}><dt className="label">{t}</dt><dd>{d}</dd></div>
          ))}
        </dl>
        <p className="built">
          <span className="label">Built with</span>{s.built}
          {s.link && <a className="u ar ar-ne" href={s.link.href} target="_blank" rel="noopener">{s.link.label}</a>}
        </p>
      </div>
    </details>
  );
}

export default function Work() {
  return (
    <section className="chapter wrap" id="work" aria-labelledby="work-h">
      <div className="chap-head">
        <h2 className="chap" id="work-h">Five systems.</h2>
        <p className="chap-lead">All built at Bharat Datacenter. Open one to read it stop by stop, from where it starts to what it does now.</p>
      </div>
      <div className="works">
        {systems.map((s, i) => <Row key={s.id} s={s} fig={i + 1} open={i === 0} />)}
      </div>
      <p className="label sub-label">Side project</p>
      <div className="works">
        <Row s={sideProject} fig={systems.length + 1} />
      </div>
    </section>
  );
}
