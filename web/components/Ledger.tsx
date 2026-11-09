import type { CSSProperties } from "react";
import { getContributions } from "@/lib/github";
import { site } from "@/lib/content";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const STEP = 14; // cell plus gap, in SVG units
const TOP = 20; // room for month names

// A year of GitHub contributions, one square per day, weeks as columns. Rendered on the server.
export default async function Ledger() {
  const data = await getContributions("AnshitSharma");
  if (!data) return null;
  const { days, total } = data;
  const offset = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  const cols = Math.ceil((offset + days.length) / 7);
  const active = days.filter((d) => d.count > 0).length;

  const months: { x: number; m: string }[] = [];
  let last = -1;
  for (let c = 0; c < cols; c++) {
    const i = Math.max(0, c * 7 - offset);
    if (i >= days.length) break;
    const m = Number(days[i].date.slice(5, 7)) - 1;
    if (m !== last) {
      if (!months.length || c * STEP - months[months.length - 1].x >= 3 * STEP) months.push({ x: c * STEP, m: MONTHS[m] });
      last = m;
    }
  }

  return (
    <div className="ledger">
      <p className="label blk-label">On GitHub</p>
      <div className="lg-head">
        <p className="lg-n">{total.toLocaleString("en-IN")}</p>
        <p className="lg-t">contributions in the last twelve months, on {active} different days.</p>
        <a className="u ar ar-ne" href={site.github} target="_blank" rel="noopener">See GitHub</a>
      </div>
      <figure className="lg-fig">
        <div className="lg-pan" data-end>
          <svg
            className="lg-svg"
            viewBox={`0 0 ${cols * STEP - 3} ${TOP + 7 * STEP - 3}`}
            role="img"
            aria-label={`GitHub contributions from ${days[0].date} to ${days[days.length - 1].date}: ${total} in all, on ${active} days.`}
            data-start={days[0].date}
            data-off={offset}
            data-counts={days.map((d) => d.count).join(",")}
          >
            {months.map((t) => <text key={t.x} x={t.x} y={10}>{t.m}</text>)}
            <g>
              {days.map((d, i) => {
                const k = i + offset;
                const c = Math.floor(k / 7);
                return <rect key={d.date} x={c * STEP} y={TOP + (k % 7) * STEP} width="11" height="11" rx="1.5" className={`l${d.level}`} style={{ "--c": c } as CSSProperties} />;
              })}
            </g>
          </svg>
        </div>
        <figcaption className="lg-cap">
          <span>Each square is a day. Columns are weeks, newest on the right.</span>
          <span className="key" aria-hidden="true">
            <span>Fewer</span><i className="l0b" /><i className="l1b" /><i className="l2b" /><i className="l3b" /><i className="l4b" /><span>More</span>
          </span>
        </figcaption>
        <p className="tip" hidden />
      </figure>
    </div>
  );
}
