import { caseStudies, workIndex, workPublished, workTeaser } from "@/content/work";

/** A box in the architecture flow: name on the left, mono detail on the right. */
export type ArchitectureNode = {
  name: string;
  detail: string;
};

/** One per case study; also selects the animated product screen. */
export type CaseStudySlug = "relay" | "ledgerlens" | "flowpilot" | "scout" | "pulse";

export type CaseStudy = {
  slug: CaseStudySlug;
  title: string;
  year: number;
  /** Meta line parts, joined with " · ": organisation, period, role. */
  org: string;
  period: string;
  role?: string;
  /** One-line statement under the title. */
  statement: string;
  /** One-sentence card blurb. */
  blurb: string;
  /** Card stat line parts, joined with " · ". */
  stats: string[];
  problem: string;
  built: string[];
  architecture: {
    steps: ArchitectureNode[];
    /** [accent outcome, neutral outcome] */
    outcomes: [ArchitectureNode, ArchitectureNode];
  };
  decisions: { title: string; body: string }[];
  results: { value: string; label: string }[];
  different: string;
  stack: string[];
};

/** Heading and description of the /work index page. */
export type WorkIndex = {
  title: string;
  description: string;
};

/** Home tile copy while the case studies aren't published yet. */
export type WorkTeaser = {
  /** Mono meta in the tile header. */
  meta: string;
  /** Pill label over the screen. */
  label: string;
  /** Shown in turn, one per tap; never empty. */
  lines: [string, ...string[]];
};

/** Whether /work and the case studies are live. While false, the routes 404. */
export function isWorkPublished(): boolean {
  return workPublished;
}

export function getWorkTeaser(): WorkTeaser {
  return workTeaser;
}

export function getWorkIndex(): WorkIndex {
  return workIndex;
}

export function getCaseStudies(): readonly CaseStudy[] {
  return caseStudies;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** The next case study in display order; the last one loops back to the first. */
export function getNextCaseStudy(slug: string): CaseStudy {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}

export function caseStudyMeta(study: CaseStudy) {
  return [study.org, study.period, study.role].filter(Boolean).join(" · ");
}

/** Accessible name for a case study's animated product screen when it stands alone. */
export function caseStudyScreenLabel(study: CaseStudy) {
  return `${study.title} product screen (animated mock-up)`;
}
