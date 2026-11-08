import type { IntroParagraph, Service, StackRow } from "@/lib/home";

/** Home page copy. All names, numbers and links are mock data from the design handoff. */

export const intro: IntroParagraph[] = [
  {
    id: "day",
    parts: [
      "By day I build AI products at ",
      { text: "Northwind", highlight: "blue" },
      ", where I lead the team behind Relay, our support copilot. It now resolves ",
      { text: "38% of tickets", highlight: "orange" },
      " without a human. I work across the whole stack: retrieval, evals, APIs and the interface people actually click.",
    ],
  },
  {
    id: "night",
    parts: [
      "By night I tinker on ",
      { text: "Scout", highlight: "pink" },
      ", a model that predicts Premier League results from xG and line-ups, and I write up what I learn in Matchday notes. Eight years in, I still like the moment something rough becomes something people rely on.",
    ],
  },
];

export const stack: StackRow[] = [
  { label: "AI", tone: "ai", items: ["LLM apps", "RAG", "Agents", "Fine-tuning", "Evals"] },
  { label: "Backend", tone: "backend", items: ["Python", "Node.js", "Postgres", "FastAPI", "pgvector"] },
  { label: "Frontend", tone: "frontend", items: ["TypeScript", "React", "Next.js", "Data viz"] },
  { label: "Infra", tone: "infra", items: ["AWS", "Vercel", "Kafka", "Temporal", "ClickHouse"] },
];

export const services: Service[] = [
  { name: "Freelance builds", description: "MVPs and internal tools, 4–8 weeks", subject: "Freelance build" },
  { name: "Consulting", description: "Architecture, evals, hiring", subject: "Consulting" },
  { name: "AI integration", description: "Into products you already run", subject: "AI integration" },
];
