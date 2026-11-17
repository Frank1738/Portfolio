import type { IntroParagraph, Service, StackItem } from "@/lib/home";

/** Home page copy. Duelbits is the only company named, by choice. */

export const intro: IntroParagraph[] = [
  {
    id: "now",
    parts: [
      "By day I'm shipping at ",
      { text: "Duelbits", highlight: "blue" },
      ", working across the whole stack: APIs, data, and the screens players actually tap. I combine deep full-stack fundamentals with AI-driven development workflows to take products from rough idea to production fast.",
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

export const stack: StackItem[] = [
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Redux", icon: "redux" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Express", icon: "express" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Prisma", icon: "prisma" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "REST APIs", icon: "rest" },
  { name: "OAuth", icon: "oauth" },
  { name: "JWT", icon: "jwt" },
  { name: "OpenAI API", icon: "openai" },
  { name: "Claude API", icon: "anthropic" },
  { name: "MCP", icon: "mcp" },
  { name: "Docker", icon: "docker" },
  { name: "GitHub Actions", icon: "githubActions" },
  { name: "CI/CD", icon: "cicd" },
  { name: "Jest", icon: "jest" },
  { name: "Cypress", icon: "cypress" },
];

export const services: Service[] = [
  { name: "MVP builds", description: "From idea to production, fast", subject: "MVP build" },
  { name: "Frontend leadership", description: "Architecture, code reviews, mentoring", subject: "Frontend leadership" },
  { name: "AI integration", description: "Into products you already run", subject: "AI integration" },
];
