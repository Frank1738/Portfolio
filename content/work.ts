import type { CaseStudy, WorkIndex, WorkTeaser } from "@/lib/work";

/** The /work page heading and description. */
export const workIndex: WorkIndex = {
  title: "Selected work",
  description:
    "Things I've shipped and things I'm building. The shipped ones open into a full write-up; the rest are still in the works.",
  plannedLabel: "In the works",
  buildLabel: "in dev",
};

/**
 * Master switch for /work. While false, /work and /work/[slug] return 404, they drop out of
 * the sitemap, and the home tile shows the teaser instead of linking. Each project's own
 * `status` decides whether it has a page.
 */
export const workPublished = true;

/** Home tile copy while work is unpublished. Each tap on the screen shows the next line. */
export const workTeaser: WorkTeaser = {
  meta: "On the stove",
  label: "Something's cooking",
  lines: [
    "Case studies are simmering. No peeking.",
    "Still simmering. Good things take time.",
    "Smells good, right? Not ready yet.",
    "Chef says: back soon. The lid stays on.",
  ],
};

/**
 * Projects in display order (live ones also give the "Next project" order, looping).
 * devsweep's write-up comes only from its README. The planned projects' names, numbers and
 * links are mock data from the design handoff; replace them when each one is built.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "devsweep",
    status: "live",
    title: "devsweep",
    year: 2026,
    org: "Open source",
    period: "2026",
    statement: "Scans your dev setup and repos for the supply-chain and credential risks that infostealers exploit.",
    links: [
      { label: "GitHub", href: "https://github.com/Frank1738/devsweep" },
      { label: "npm", href: "https://www.npmjs.com/package/@frank1738/devsweep" },
    ],
    blurb:
      "Finds the settings that would let a stolen token or a hijacked action do real damage, and tells you how to fix each one.",
    stats: ["8 rules", "0 dependencies", "CLI + GitHub Action"],
    problem:
      "Attackers often skip a project's code and go after something it trusts: a GitHub Action it uses, its release workflow, or a maintainer's access token. That's a supply-chain attack, and one common way tokens get stolen is infostealers: malware that copies saved passwords and tokens off developers' computers. How much damage a stolen token or a hijacked action can do comes down to settings: actions that could be swapped for different code, workflows that run strangers' pull request code with secrets, tokens with more access than they need, and branches and tags that can be force-pushed.",
    built: [
      "A command-line tool you run with npx @frank1738/devsweep in a repository. It checks the GitHub Actions workflows and the repository's settings on GitHub, then lists every finding by file: its severity, the line, what's wrong and what it's about. Add --details to see why each one is a risk, the lines of code involved and how to fix it.",
      "It runs on your own machine or in CI as a GitHub Action, which prints the readable report in the job log and writes SARIF, the format GitHub's Security tab reads, so findings show up in code scanning and on pull requests. Findings you've reviewed and decided to keep are recorded in devsweep.config.json, each with a reason.",
    ],
    architecture: {
      steps: [
        { name: "Folder to scan", detail: "CLI or GitHub Action" },
        { name: "Read inputs", detail: "workflow YAML + GitHub API" },
        { name: "8 rules", detail: "6 workflow, 2 repository" },
        { name: "Config", detail: "devsweep.config.json, optional" },
      ],
      outcomes: [
        { name: "Report + exit code", detail: "0 pass, 1 findings, 2 error" },
        { name: "JSON or SARIF", detail: "scripts, GitHub's Security tab" },
      ],
    },
    decisions: [
      {
        title: "No dependencies to install",
        body: "The npm package has no dependencies. devsweep and the three libraries it uses (commander, picocolors and yaml) are bundled into plain JavaScript files. They aren't minified, so you can read exactly what runs.",
      },
      {
        title: "No --token flag",
        body: "The repository checks read a token only from the GITHUB_TOKEN or GH_TOKEN environment variable. There's deliberately no flag for it, because command lines end up in shell history and process lists. The token is never printed.",
      },
      {
        title: "A release needs a signed tag and 2FA",
        body: "Releases come only from a signed, annotated tag. The release workflow checks it, runs the tests and stages the version on npm through trusted publishing, with provenance, so no npm token is stored anywhere. A maintainer then approves it with two-factor authentication: a compromised workflow can stage a release, but it can't publish one.",
      },
      {
        title: "Every exception needs a reason",
        body: "Reviewed findings are accepted in devsweep.config.json, matched on rule, file and subject, never on line numbers, which move. Each acceptance needs a reason, and one that stops matching anything shows up as a warning, so stale exceptions get cleaned up.",
      },
    ],
    results: [
      { value: "8", label: "rules: 6 for workflows, 2 for repository settings" },
      { value: "0", label: "dependencies in the npm package" },
      { value: "3", label: "report formats: readable, JSON and SARIF" },
    ],
    stack: ["TypeScript", "Node.js", "commander", "picocolors", "yaml", "Rolldown", "Vitest", "Biome", "GitHub Actions"],
  },
  {
    slug: "relay",
    status: "planned",
    title: "Relay",
    year: 2026,
    org: "Northwind",
    period: "2026",
    role: "Lead engineer",
    statement: "Support replies drafted in seconds, and 38% of tickets closed without a human.",
    blurb: "An assistant that drafts replies to support tickets and closes the simple ones on its own.",
    stats: ["38% auto-resolved", "30k tickets/mo", "RAG + Next.js"],
    problem:
      "A support team of 60 was handling 30,000 tickets a month, and the median first response had drifted to nine hours. Most questions already had an answer somewhere in the help centre or in a past ticket. Agents spent their day finding it again.",
    built: [
      "A copilot inside the agent inbox. For every new ticket it finds the relevant articles and past resolutions, drafts a reply with sources, and shows how confident it is. On simple, well-covered intents it sends the reply itself, with a sample routed to humans for review.",
      "I owned it end to end: the retrieval pipeline, the eval harness we used to decide what could ship, the API, and the interface agents work in all day.",
    ],
    architecture: {
      steps: [
        { name: "New ticket", detail: "Zendesk webhook" },
        { name: "Intent classifier", detail: "fine-tuned, 42 intents" },
        { name: "Retriever", detail: "help centre + 1.2M past tickets" },
        { name: "Draft + confidence gate", detail: "GPT-4o, cited sources" },
      ],
      outcomes: [
        { name: "Auto-send", detail: "confidence ≥ 0.92" },
        { name: "Agent review", detail: "draft in inbox" },
      ],
    },
    decisions: [
      {
        title: "Ship the draft before the autopilot",
        body: "For the first six weeks Relay only drafted. Agents edited or sent every reply, which gave us 40,000 labelled examples and the trust we needed before letting it send anything.",
      },
      {
        title: "Gate on intent, not just confidence",
        body: "Raw model confidence was poorly calibrated. Auto-send is allowed only for 11 intents where the help centre is complete, with a threshold tuned per intent.",
      },
      {
        title: "Past tickets as a source",
        body: "The help centre covered about half of all questions. Indexing resolved tickets, with personal data stripped, filled most of the gap and lifted draft acceptance from 52% to 71%.",
      },
      {
        title: "Evals in CI",
        body: "Every prompt or retrieval change ran against 1,800 graded tickets before merge. A drop of more than one point on the accuracy score blocked the deploy.",
      },
    ],
    results: [
      { value: "38%", label: "of tickets resolved automatically" },
      { value: "9h → 40m", label: "median first response" },
      { value: "4.6", label: "CSAT out of 5, up from 4.1" },
    ],
    different:
      "I'd build the review tooling first. We spent the first month reading drafts in spreadsheets, and a simple side-by-side reviewer would have doubled how many examples we graded each week. I'd also bring the support leads into writing the eval rubric from day one instead of after launch.",
    stack: ["TypeScript", "Next.js", "Python", "Postgres + pgvector", "OpenAI", "Temporal", "Vercel"],
  },
  {
    slug: "ledgerlens",
    status: "planned",
    title: "Ledgerlens",
    year: 2025,
    org: "Northwind",
    period: "2025",
    role: "Fullstack engineer",
    statement: "Questions across 40,000 contracts and invoices, answered with the exact clause.",
    blurb: "Ask a question across 40,000 finance documents and get an answer with its sources.",
    stats: ["2k users", "0.9s p50", "RAG + pgvector"],
    problem:
      "Finance and legal kept contracts, invoices and policy PDFs across three shared drives and an ageing document system. Answering a question like 'which suppliers have 60-day terms?' meant a day of opening files. Keyword search failed on scanned documents and on anything phrased differently from the contract.",
    built: [
      "A search tool where people ask in plain English and get a short answer with numbered citations that open the source PDF at the right page. Every answer links back to the clause it came from, so nobody has to take the model on trust.",
      "I built the ingestion pipeline, the hybrid retriever, the answer service and the React front end, and ran the rollout to 2,000 people across finance, legal and procurement.",
    ],
    architecture: {
      steps: [
        { name: "Document sync", detail: "Drive + DMS, nightly" },
        { name: "OCR + chunking", detail: "layout-aware, 512 tokens" },
        { name: "Hybrid retrieval", detail: "BM25 + pgvector, reranked" },
        { name: "Answer service", detail: "Claude, page-level citations" },
      ],
      outcomes: [
        { name: "Cited answer", detail: "0.9s median" },
        { name: "No answer", detail: "below relevance floor" },
      ],
    },
    decisions: [
      {
        title: "Hybrid over pure vector search",
        body: "Contract numbers, supplier names and dates are exact-match problems. Adding BM25 alongside embeddings and a reranker raised recall@10 from 74% to 93%.",
      },
      {
        title: "Refuse when unsure",
        body: "Below a relevance floor the tool says it couldn't find an answer and shows the closest documents. Finance users preferred that to a confident guess.",
      },
      {
        title: "Page-level citations",
        body: "Citations open the PDF at the right page with the passage highlighted. That one feature did more for adoption than any model upgrade.",
      },
      {
        title: "Permissions at retrieval time",
        body: "Every chunk carries its source document's access list and is filtered in the query itself, so the model never sees text a user couldn't open.",
      },
    ],
    results: [
      { value: "6h → 4m", label: "to answer a contract question" },
      { value: "2,000", label: "weekly users" },
      { value: "91%", label: "citation accuracy in audit" },
    ],
    different:
      "I'd invest in OCR quality earlier. About 15% of the archive was scanned, and most bad answers traced back to garbled tables rather than retrieval or the model. I'd also log unanswered questions from the start, since they turned out to be the best roadmap we had.",
    stack: ["TypeScript", "React", "Python", "Postgres + pgvector", "Elasticsearch", "Anthropic", "AWS Textract"],
  },
  {
    slug: "flowpilot",
    status: "planned",
    title: "Flowpilot",
    year: 2025,
    org: "Brightline Logistics",
    period: "2025",
    role: "Freelance",
    statement: "Back-office agents that match invoices, chase approvals and know when to ask a person.",
    blurb: "Agents that take over repetitive back-office steps like matching invoices to orders.",
    stats: ["40% faster", "12 workflows", "LangGraph + Temporal"],
    problem:
      "Brightline's operations team processed 9,000 supplier invoices a month by hand: read the PDF, find the purchase order, check quantities, chase the approver. Their RPA scripts broke whenever a supplier changed a template, and nobody trusted them with exceptions.",
    built: [
      "A workflow engine where each step is either plain code or an LLM agent with a narrow set of tools. Agents extract fields, match lines to purchase orders and draft approval requests. Anything outside tolerance goes to a person with the reasoning attached.",
      "I designed the agent framework, built the first four workflows with the ops team, and left them with a builder to add their own. They have shipped eight more since.",
    ],
    architecture: {
      steps: [
        { name: "Trigger", detail: "email inbox + ERP events" },
        { name: "Extract agent", detail: "structured output, schema-checked" },
        { name: "Match agent", detail: "ERP lookup tools" },
        { name: "Policy check", detail: "tolerances in code" },
      ],
      outcomes: [
        { name: "Auto-approve", detail: "within tolerance" },
        { name: "Human queue", detail: "reasoning attached" },
      ],
    },
    decisions: [
      {
        title: "Durable execution with Temporal",
        body: "Workflows wait days for approvals. Running them on Temporal meant retries, timeouts and resumption came for free, and nothing was lost on deploy.",
      },
      {
        title: "Policy in code, judgement in the model",
        body: "Tolerances and approval limits live in plain code that finance can review. The model only handles the messy parts: reading documents and matching lines.",
      },
      {
        title: "Narrow tools per agent",
        body: "Each agent gets three to five tools with typed inputs. Smaller toolsets cut wrong tool calls by more than half compared with one general agent.",
      },
      {
        title: "Show the reasoning",
        body: "Every escalation includes the extracted fields, the candidate matches and why they failed. Reviewers clear the queue in a few seconds per item.",
      },
    ],
    results: [
      { value: "40%", label: "faster invoice cycle" },
      { value: "12", label: "workflows in production" },
      { value: "0.3%", label: "error rate, audited monthly" },
    ],
    different:
      "I'd build the replay tool before the second workflow. Being able to re-run a past case against a new prompt would have saved weeks of manual testing. I'd also price the engagement per workflow shipped rather than by the hour, which suited both sides better once we got going.",
    stack: ["TypeScript", "Python", "LangGraph", "Temporal", "Postgres", "OpenAI", "NetSuite API"],
  },
  {
    slug: "scout",
    status: "planned",
    title: "Scout",
    year: 2024,
    org: "Side project",
    period: "2024 – now",
    statement: "A Premier League prediction model that finished the season level with the bookmakers.",
    blurb: "Predicts football results from expected goals, form and confirmed line-ups.",
    stats: ["54% accuracy", "380 matches", "XGBoost"],
    problem:
      "I wanted to know whether a hobby model built on public data could keep up with bookmaker odds. Most public models use season-long team ratings and ignore who is actually playing, which is where a lot of the signal sits an hour before kick-off.",
    built: [
      "A pipeline that rebuilds team strength after every match from shot-level xG, adjusts for confirmed line-ups, and outputs win, draw and loss probabilities. Predictions publish automatically to a small site and a Discord channel an hour before kick-off.",
      "Everything runs on one small server for about £6 a month. I write up what I learn in Matchday notes.",
    ],
    architecture: {
      steps: [
        { name: "Data sync", detail: "shots, line-ups, odds" },
        { name: "Feature build", detail: "rolling xG, rest days, availability" },
        { name: "Model", detail: "XGBoost + Dixon-Coles prior" },
        { name: "Calibration", detail: "isotonic, weekly refit" },
      ],
      outcomes: [
        { name: "Published picks", detail: "site + Discord" },
        { name: "Backtest log", detail: "every gameweek" },
      ],
    },
    decisions: [
      {
        title: "Dixon-Coles as a prior",
        body: "A classic Poisson model handles low-scoring draws well. Feeding it to XGBoost as a feature kept draw probabilities sensible where tree models alone struggled.",
      },
      {
        title: "Line-ups over form",
        body: "Player-level availability, weighted by minutes and xG contribution, improved the Brier score more than any form feature I tried.",
      },
      {
        title: "Calibrate, then compare",
        body: "I judged the model on Brier score against closing odds, not on accuracy. A model can be right 54% of the time and still be badly overconfident.",
      },
      {
        title: "Publish before kick-off",
        body: "Predictions are timestamped and posted publicly before each match. It keeps me honest and makes the backtest impossible to quietly improve.",
      },
    ],
    results: [
      { value: "54%", label: "correct results over 380 matches" },
      { value: "0.198", label: "Brier score, vs 0.196 for closing odds" },
      { value: "1,400", label: "Discord followers" },
    ],
    different:
      "I'd start with a proper backtest harness instead of a notebook. Early on I leaked future data through a rolling average and spent two weeks believing the model was better than it was. I'd also model goal timing, which would open up in-play predictions.",
    stack: ["Python", "pandas", "XGBoost", "DuckDB", "FastAPI", "Discord API", "Hetzner"],
  },
  {
    slug: "pulse",
    status: "planned",
    title: "Pulse",
    year: 2024,
    org: "Northwind",
    period: "2024",
    role: "Tech lead",
    statement: "One place to see whether every AI feature at Northwind is getting better or worse.",
    blurb: "An internal dashboard that tracks quality, cost and latency for every AI feature we ship.",
    stats: ["9 teams", "3.2M traces/day", "ClickHouse + Next.js"],
    problem:
      "By 2024 Northwind had nine teams shipping LLM features, each with its own logging and its own idea of quality. Regressions showed up as support tickets. Nobody could say what a feature cost per user, or whether last week's prompt change had helped.",
    built: [
      "A shared SDK that traces every model call, plus a dashboard for quality, cost and latency per feature. Teams define graders once and Pulse scores a sample of live traffic against them every hour.",
      "I built the SDK, the ingestion pipeline and the dashboard, and worked with each team to move their logging over. It is now a required step in the launch checklist for new AI features.",
    ],
    architecture: {
      steps: [
        { name: "SDK trace", detail: "TS + Python, two lines to add" },
        { name: "Ingest", detail: "Kafka, PII redaction" },
        { name: "Store", detail: "ClickHouse, 30 days hot" },
        { name: "Graders", detail: "LLM + rules, hourly sample" },
      ],
      outcomes: [
        { name: "Dashboard", detail: "quality, cost, latency" },
        { name: "Alerts", detail: "Slack on regression" },
      ],
    },
    decisions: [
      {
        title: "Two lines to adopt",
        body: "The SDK wraps the model client teams already use. If adoption took more than a few minutes, teams would have kept their own logging.",
      },
      {
        title: "ClickHouse for traces",
        body: "Traces are wide, append-only and queried by time. ClickHouse kept dashboards under a second at 3 million rows a day on modest hardware.",
      },
      {
        title: "Sample, then grade",
        body: "Grading every trace with an LLM would have cost more than the features themselves. A stratified 2% sample was enough to catch regressions within the hour.",
      },
      {
        title: "Cost per feature, not per model",
        body: "Showing spend by feature and by user made trade-offs obvious to product managers. Most of the saving came from teams switching models on their own.",
      },
    ],
    results: [
      { value: "9", label: "teams on Pulse" },
      { value: "3.2M", label: "traces per day" },
      { value: "31%", label: "lower model spend in a quarter" },
    ],
    different:
      "I'd ship alerts before the dashboard. Teams looked at the dashboard weekly but acted on Slack alerts the same day. I'd also agree a shared grading rubric across teams earlier, because comparing quality between features was the first thing leadership asked for.",
    stack: ["TypeScript", "Next.js", "Python", "Kafka", "ClickHouse", "OpenAI", "Grafana"],
  },
];
