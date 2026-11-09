// Everything the page says about Anshit lives here. Keep claims in line with the resume.

export const site = {
  name: "Anshit Sharma",
  role: "Backend engineer",
  url: "https://portfolio-neon-theta-95.vercel.app",
  email: "anshitsharma82002@gmail.com",
  github: "https://github.com/AnshitSharma",
  linkedin: "https://www.linkedin.com/in/anshitsharma",
  // Set to a PDF path (for example "/Anshit_Sharma_Resume.pdf" in /public) to show the resume buttons.
  resume: null as string | null,
  // Web3Forms access keys are public by design: they only allow sending to the owner's inbox.
  formKey: "326683c0-ff35-4da5-94f8-a0d89c4b8a86",
};

export type Stop = { label: string; note: string; was?: boolean };

export type System = {
  id: string;
  name: string;
  desc: string;
  status?: string;
  dashed?: boolean;
  stops: Stop[]; // the first stop is where it starts
  end: { big: string; small: string; href?: string };
  caption: string; // shown under the plate until a stop is pointed at
  cols: [string, string][];
  built: string;
  link?: { href: string; label: string };
};

export const systems: System[] = [
  {
    id: "inventory",
    name: "Inventory system",
    desc: "Hardware stock and server-build checks, used by 25+ operations staff.",
    status: "In production",
    stops: [
      { label: "Excel sheets", note: "Before this, hardware stock was tracked in spreadsheets.", was: true },
      { label: "Compatibility checks", note: "Staff check that the parts of a custom server build work together before anyone assembles it." },
      { label: "Approvals", note: "Requests need an approver's sign-off." },
      { label: "Email and Teams alerts", note: "Approvals send email through Microsoft Graph and post alerts to Teams." },
      { label: "Role-based access", note: "Every API action checks the caller's role with JWT. I also closed an IDOR gap." },
    ],
    end: { big: "25+ staff", small: "1,000+ components tracked" },
    caption: "Struck through: what it replaced.",
    cols: [
      ["The job", "Replace Excel tracking for 1,000+ hardware components, and let staff check that the parts of a custom server build work together before anyone assembles it."],
      ["What I built", "The backend, which I also maintain. Approvals send email through Microsoft Graph and post Teams alerts. I closed an authorization gap (IDOR), enforced role-based access with JWT on every API action, made requests safe to retry with idempotency keys and removed N+1 queries."],
      ["Result", "In production, used by 25+ operations staff."],
    ],
    built: "MySQL/MariaDB, JWT, role-based access, Microsoft Graph",
  },
  {
    id: "deploys",
    name: "Deploy pipelines",
    desc: "GitHub Actions pipelines that deploy 4 apps over SSH on every push.",
    status: "In production",
    stops: [
      { label: "Manual and FTP uploads", note: "Before this, one app was uploaded by hand and others deployed over FTP.", was: true },
      { label: "Git push", note: "Every push starts a deploy. Nobody uploads files by hand." },
      { label: "GitHub Actions", note: "One pipeline per app, four apps in all." },
      { label: "SSH with retries", note: "Files go to the server over SSH, with retries if a step fails." },
      { label: "Changed-file sync", note: "Only the files that changed are copied to the server." },
    ],
    end: { big: "45+ deploys", small: "4 apps, first month" },
    caption: "Struck through: what it replaced.",
    cols: [
      ["The job", "Ship four apps on every push, without uploading files by hand or over FTP."],
      ["What I built", "GitHub Actions pipelines that deploy each app over SSH. They retry, and they sync only the files that changed."],
      ["Result", "45+ deploys in the first month, most of them pushed by teammates."],
    ],
    built: "GitHub Actions, SSH, Linux",
  },
  {
    id: "data",
    name: "Data pipeline",
    desc: "A Python collector that streams telemetry into OpenSearch, kept for 30 days.",
    status: "In production",
    stops: [
      { label: "Raw telemetry", note: "Telemetry arrives as a continuous stream." },
      { label: "Python collector", note: "Reads the stream and writes it to OpenSearch." },
      { label: "Deterministic IDs", note: "The same record always gets the same ID, so a restart can't store it twice." },
      { label: "OpenSearch", note: "Searchable, with 30-day retention." },
    ],
    end: { big: "30-day history", small: "No duplicates after restarts" },
    caption: "",
    cols: [
      ["The job", "Keep a searchable 30-day history of telemetry."],
      ["What I built", "A Python collector that streams telemetry into OpenSearch with 30-day retention. Document IDs are deterministic, so restarting the collector never writes the same data twice."],
      ["Result", "In production, running on real data."],
    ],
    built: "Python, OpenSearch",
  },
  {
    id: "salesbot",
    name: "AI sales bot integration",
    desc: "Brings leads, recommended plans and quotes from an AI WhatsApp sales bot into the CRM.",
    stops: [
      { label: "AI WhatsApp sales bot", note: "A third-party service that chats with customers. I didn't build the bot." },
      { label: "Authenticated webhooks", note: "Each webhook is signed, so the CRM accepts requests only from the bot." },
      { label: "Lead synced", note: "Each chat becomes a CRM lead with the customer's requirements." },
      { label: "Plan and quote synced", note: "The plan the bot recommends and its quote land in the lead's fields." },
    ],
    end: { big: "Rep takes over", small: "The bot pauses itself" },
    caption: "",
    cols: [
      ["The job", "Get each lead from an AI WhatsApp sales bot into the CRM, and let a sales rep take the chat over."],
      ["What I built", "The CRM integration. Authenticated webhooks sync each lead, the plan the bot recommends and its quote. When a sales rep takes over, the bot pauses."],
      ["Scope", "The bot is a third-party service. My part is the integration with the CRM."],
    ],
    built: "Webhooks, CRM lead fields",
  },
  {
    id: "provisioning",
    name: "Provisioning automation",
    desc: "A FastAPI and PostgreSQL platform built to replace manual server IP assignment.",
    status: "Pre-production",
    dashed: true,
    stops: [
      { label: "Manual IP assignment", note: "Today, IP addresses are assigned to servers by hand.", was: true },
      { label: "Advisory locks", note: "One PostgreSQL advisory lock per device, so two jobs never change the same device at once." },
      { label: "SKIP LOCKED jobs", note: "Workers claim jobs with SKIP LOCKED, so each job is picked up once." },
      { label: "Peer approval", note: "A second person approves each change before it runs." },
      { label: "Read-back and rollback", note: "Every change is read back to verify it, and can be rolled back." },
    ],
    end: { big: "130+ tests", small: "pytest, mid-job failures included" },
    caption: "Struck through: what it replaces. Dashed: still in pre-production.",
    cols: [
      ["The job", "Replace manual server IP assignment without conflicting or half-finished changes."],
      ["What I built", "The whole platform, as its sole developer: FastAPI and PostgreSQL, with a React and TypeScript UI. Per-device advisory locks with SKIP LOCKED job claims, peer approval, read-back verification and rollback guard every change."],
      ["Result", "Pre-production, tested by 130+ pytest cases against a simulated device, including mid-job failures."],
    ],
    built: "Python, FastAPI, PostgreSQL, SQLAlchemy, Alembic, React, TypeScript, pytest",
  },
];

export const sideProject: System = {
  id: "mindscape",
  name: "Mindscape",
  desc: "A mental health web app with a scored self-assessment and appointment booking.",
  status: "Live on Vercel",
  stops: [
    { label: "Visitor", note: "Where it starts: someone opens the app." },
    { label: "15-question self-assessment", note: "A 15-question anxiety self-assessment." },
    { label: "Scored result", note: "The answers are scored into a result." },
    { label: "Appointment booking", note: "A booking flow for appointments." },
    { label: "Validated forms", note: "Forms are validated with React Hook Form and Zod." },
  ],
  end: { big: "Live", small: "mindscape-sepia.vercel.app", href: "https://mindscape-sepia.vercel.app" },
  caption: "",
  cols: [
    ["The job", "Let people take a scored 15-question anxiety self-assessment, then book an appointment."],
    ["What I built", "The React and TypeScript app: the self-assessment and the booking flow, with forms validated by React Hook Form and Zod."],
    ["Result", "Deployed on Vercel and open to anyone."],
  ],
  built: "React, TypeScript, Tailwind CSS, Appwrite",
  link: { href: "https://mindscape-sepia.vercel.app", label: "Open Mindscape" },
};

export const skills: [string, string][] = [
  ["Languages", "Python, SQL, JavaScript, TypeScript, Java"],
  ["Backend", "FastAPI, Node.js, Express.js, REST APIs, webhooks, SQLAlchemy, Alembic, JWT, RBAC"],
  ["Databases", "PostgreSQL, MySQL/MariaDB, MongoDB, OpenSearch"],
  ["Infrastructure and testing", "Linux, Docker, Nginx, GitHub Actions, Git, pytest, Postman"],
  ["Frontend and AI", "React, Next.js, Tailwind CSS, OpenAI API, LLM chatbot integration"],
];

export const principles: [string, string][] = [
  ["Safe to retry", "Running something twice shouldn't do damage twice. Inventory requests carry idempotency keys, deploys retry, and the data collector writes deterministic IDs."],
  ["Fail cleanly", "A change should finish or roll back. The provisioning platform locks each device, reads every change back and is tested against failures in the middle of a job."],
  ["Locked by default", "Every inventory API action checks the caller's role with JWT, and I closed an IDOR gap there. The sales bot's webhooks are authenticated."],
];

export type Job = { seg: string; title: string; org: string; text: string; when: string };

export const jobs: Job[] = [
  { seg: "bdc-dev", title: "Backend Developer", org: "Bharat Datacenter", text: "Cloud infrastructure and hosting provider, New Delhi. Every system on this page was built here.", when: "Dec 2024 to now" },
  { seg: "bdc-int", title: "Web Developer Intern", org: "Bharat Datacenter", text: "Offered a full-time role after six months.", when: "Jun to Nov 2024" },
  { seg: "dmo", title: "Software Engineer Intern", org: "DMO", text: "E-commerce and retail technology, New Delhi. Built Python inventory-processing modules that cut SKU processing time by 40%, and API test suites in pytest and Postman that ran before each release.", when: "Mar to May 2024" },
];

export const education: Job = {
  seg: "edu",
  title: "B.Tech in Computer Science",
  org: "Maharaja Agrasen Institute of Technology",
  text: "Delhi. CGPA 8.5 out of 10.",
  when: "2021 to 2025",
};
