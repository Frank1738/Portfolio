import type { IntroParagraph, Service, StackRow } from "@/lib/home";

/** Home page copy. Duelbits is the only company named, by choice. */

export const intro: IntroParagraph[] = [
  {
    id: "now",
    parts: [
      "By day I'm shipping at ",
      { text: "Duelbits", highlight: "blue" },
      ", one of the leading names in iGaming, working across the whole stack: APIs, data and the screens players actually tap.",
    ],
  },
  {
    id: "before",
    parts: [
      "Before that I spent a few years at ",
      { text: "startups across the US, UK and Europe", highlight: "orange" },
      ", leading small teams and taking MVPs from a rough idea to something people rely on. Off the clock you'll find me watching ",
      { text: "football", highlight: "pink" },
      ", probably still arguing about the last result.",
    ],
  },
];

export const stack: StackRow[] = [
  { label: "AI", tone: "ai", items: ["LLM integrations", "AI-powered UIs"] },
  { label: "Frontend", tone: "frontend", items: ["TypeScript", "React", "Next.js", "Redux", "Tailwind CSS"] },
  { label: "Backend", tone: "backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"] },
  { label: "Tooling", tone: "infra", items: ["Docker", "GitHub Actions", "CI/CD", "Jest", "Cypress"] },
];

export const services: Service[] = [
  { name: "MVP builds", description: "From idea to production, fast", subject: "MVP build" },
  { name: "Frontend leadership", description: "Architecture, code reviews, mentoring", subject: "Frontend leadership" },
  { name: "AI integration", description: "Into products you already run", subject: "AI integration" },
];
