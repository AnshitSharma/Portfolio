// Draws the experience timeline to scale as an SVG string. "Today" is wherever `now` falls,
// so the full-time line keeps growing every time the page is regenerated.

const f = (n: number) => +n.toFixed(1);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function buildRoute(now: Date) {
  // Read the date in New Delhi so "today" matches where Anshit is.
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", year: "numeric", month: "numeric", day: "numeric" }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const year = get("year"), month = get("month"), day = get("day");
  const today = year + (month - 1 + Math.min(day, 30) / 31) / 12;

  const startYear = 2021;
  const endYear = Math.max(2027, year + 1);
  const unit = 1080 / (endYear - startYear); // units per year
  const X = (t: number) => f(60 + (t - startYear) * unit);
  const R = { bdc: 236, dmo: 306, edu: 392 };
  const xs = {
    eduA: X(2021 + 7 / 12), eduB: X(2025 + 6 / 12),
    dmoA: X(2024 + 2 / 12), dmoB: X(2024 + 5 / 12),
    bdcA: X(2024 + 5 / 12), promo: X(2024 + 11 / 12), now: X(today),
  };

  let mt = "", yt = "";
  for (let m = 0; m <= (endYear - startYear) * 12; m++) {
    const x = X(startYear + m / 12);
    if (m % 12 === 0) yt += `M${x} 58V72`;
    else mt += `M${x} 58V64`;
  }
  const years: number[] = [];
  for (let y = startYear; y < endYear; y++) years.push(y);
  const yrRules = years.map((y) => `M${X(y)} 84V420`).join("");
  const yrLabels = years.map((y) => `<text class="yr-l" x="${f(X(y) + 7)}" y="47">${y}</text>`).join("");
  const rot = (x: number, y: number, t: string, cls = "lab") =>
    `<text class="${cls} t-fade" transform="translate(${f(x)} ${y}) rotate(-45)">${t}</text>`;
  const n = xs.now;
  const nowLabel = `${MONTHS[month - 1]} ${year}`;

  const svg =
    `<svg class="tl" viewBox="0 0 1200 440" role="img" aria-labelledby="tl-t tl-d">` +
    `<title id="tl-t">Experience timeline</title>` +
    `<desc id="tl-d">Drawn to scale from 2021 to today. B.Tech in Computer Science at Maharaja Agrasen Institute of Technology, 2021 to 2025. ` +
    `Software Engineer Intern at DMO, March to May 2024, then a move to Bharat Datacenter in June 2024 as Web Developer Intern, ` +
    `and Backend Developer there from December 2024 to now.</desc>` +
    `<defs><linearGradient id="tl-fade" gradientUnits="userSpaceOnUse" x1="${n}" x2="1192" y1="0" y2="0">` +
    `<stop offset="0" class="fade-a"/><stop offset="1" class="fade-b"/></linearGradient></defs>` +
    `<path class="yr" d="${yrRules}"/>` +
    `<path class="axis" d="M${X(startYear)} 58H${X(endYear)}"/><path class="mt" d="${mt}"/><path class="yt" d="${yt}"/>` +
    yrLabels +
    `<path class="nowmark" d="M${f(n - 5)} 49H${f(n + 5)}L${n} 57Z"/>` +
    // education
    `<g data-seg="edu" style="--d:.1s">` +
    `<path class="ln edu" pathLength="1" d="M${xs.eduA} ${R.edu}H${xs.eduB}"/>` +
    `<path class="bar edu" pathLength="1" d="M${xs.eduA} ${R.edu - 12}V${R.edu + 12}M${xs.eduB} ${R.edu - 12}V${R.edu + 12}"/>` +
    `<text class="sub t-fade" x="${f(xs.eduA - 4)}" y="${R.edu + 34}">Maharaja Agrasen Institute of Technology</text>` +
    `<text class="name sm t-fade" x="${f(xs.eduB + 20)}" y="${R.edu + 2}">B.Tech in Computer Science</text>` +
    `<text class="sub t-fade" x="${f(xs.eduB + 20)}" y="${R.edu + 25}">2021 to 2025, CGPA 8.5</text></g>` +
    // DMO
    `<g data-seg="dmo" style="--d:.55s">` +
    `<path class="ln dmo" pathLength="1" d="M${xs.dmoA} ${R.dmo}H${xs.dmoB}"/>` +
    `<path class="bar" pathLength="1" d="M${xs.dmoA} ${R.dmo - 13}V${R.dmo + 13}"/>` +
    `<text class="name end t-fade" x="${f(xs.dmoA - 18)}" y="${R.dmo + 9}">DMO</text>` +
    `<text class="sub end t-fade" x="${f(xs.dmoA - 18)}" y="${R.dmo + 33}">Software Engineer Intern</text>` +
    `<text class="date end t-fade" x="${f(xs.dmoA - 18)}" y="${R.dmo + 53}">Mar to May 2024</text></g>` +
    // Bharat Datacenter name, shared by both roles
    `<g data-seg="bdc-int bdc-dev" style="--d:1s"><text class="name end t-fade" x="${f(xs.bdcA - 26)}" y="${R.bdc + 9}">Bharat Datacenter</text></g>` +
    // internship
    `<g data-seg="bdc-int" style="--d:1.05s">` +
    `<path class="ln thin" pathLength="1" d="M${xs.bdcA} ${R.bdc}H${xs.promo}"/>` +
    rot(xs.bdcA + 9, R.bdc - 26, "Web Developer Intern") +
    `<text class="date t-fade" x="${f(xs.bdcA + 22)}" y="${R.bdc + 30}">Jun 2024</text></g>` +
    // move from DMO to Bharat Datacenter
    `<g data-seg="dmo bdc-int" style="--d:.95s"><rect class="xfer" x="${f(xs.bdcA - 11)}" y="${R.bdc - 13}" width="22" height="${R.dmo - R.bdc + 26}" rx="11"/></g>` +
    // full-time
    `<g data-seg="bdc-dev" style="--d:1.5s">` +
    `<path class="ln thick" pathLength="1" d="M${xs.promo} ${R.bdc}H${n}"/>` +
    `<path class="ln fade" pathLength="1" style="--d:2.4s" d="M${n} ${R.bdc}H1192"/>` +
    `<circle class="st" cx="${xs.promo}" cy="${R.bdc}" r="7"/>` +
    `<circle class="ping" cx="${n}" cy="${R.bdc}" r="7"/>` +
    `<circle class="st" style="--d:2.3s" cx="${n}" cy="${R.bdc}" r="7"/>` +
    rot(xs.promo + 9, R.bdc - 20, "Backend Developer", "lab strong") +
    rot(n + 9, R.bdc - 20, "Today") +
    `<text class="date t-fade" x="${f(xs.promo + 10)}" y="${R.bdc + 30}">Dec 2024</text>` +
    `<text class="date t-fade" x="${f(n + 10)}" y="${R.bdc + 30}">${nowLabel}</text></g>` +
    `</svg>`;

  // Where a narrow screen should start scrolled to: the DMO labels, just before the 2024 junction.
  return { svg, focus: f((X(2024) - 250) / 1200) };
}
