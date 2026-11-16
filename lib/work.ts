import type { StaticImageData } from "next/image";

import { caseStudies, workIndex, workPublished, workTeaser } from "@/content/work";

/** A box in the architecture flow: name on the left, mono detail on the right. */
export type ArchitectureNode = {
  name: string;
  detail: string;
};

/** One per case study; also selects the animated product screen. */
export type CaseStudySlug = "sentoff" | "devsweep" | "relay" | "ledgerlens" | "flowpilot" | "scout" | "pulse";

/**
 * `live`: built, with a case-study page. `planned`: not built yet, so its card on /work doesn't
 * open and shows no year or stats, and its write-up fields are placeholders until it's built.
 */
export type CaseStudyStatus = "live" | "planned";

/** An off-site link under the case-study statement (repository, package). */
export type CaseStudyLink = {
  label: string;
  href: string;
};

/** A real screenshot in a case study's "Screens" section: a static import, so Next knows its size. */
export type CaseStudyScreen = {
  image: StaticImageData;
  alt: string;
  caption: string;
};

export type CaseStudy = {
  slug: CaseStudySlug;
  status: CaseStudyStatus;
  title: string;
  year: number;
  /** Meta line parts, joined with " · ": organisation, period, role. */
  org: string;
  period: string;
  role?: string;
  /** One-line statement under the title. */
  statement: string;
  /** Shown under the statement, each opening in a new tab. */
  links?: CaseStudyLink[];
  /** One-sentence card blurb. */
  blurb: string;
  /** Card stat line parts, joined with " · ". */
  stats: string[];
  problem: string;
  built: string[];
  /** Real screenshots, shown after "What I built". Optional: a project drawn as a mock-up has none. */
  screens?: CaseStudyScreen[];
  architecture: {
    steps: ArchitectureNode[];
    /** [accent outcome, neutral outcome] */
    outcomes: [ArchitectureNode, ArchitectureNode];
  };
  decisions: { title: string; body: string }[];
  results: { value: string; label: string }[];
  /** "What I'd do differently". Optional: left out until there's a retrospective to write. */
  different?: string;
  stack: string[];
};

/** Heading and description of the /work index page. */
export type WorkIndex = {
  title: string;
  description: string;
  /** Shown in place of the year on a planned project's card. */
  plannedLabel: string;
  /** Name tag on the cursor that's still building a planned project's screen. */
  buildLabel: string;
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

/** Every project in display order, live and planned: the /work list. */
export function getCaseStudies(): readonly CaseStudy[] {
  return caseStudies;
}

export function isCaseStudyLive(study: CaseStudy): boolean {
  return study.status === "live";
}

/** The projects with a case-study page, in display order. */
export function getLiveCaseStudies(): readonly CaseStudy[] {
  return caseStudies.filter(isCaseStudyLive);
}

/** A live case study by slug. Planned projects have no page, so they miss too. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getLiveCaseStudies().find((study) => study.slug === slug);
}

/** The project the home tile shows: the first live one, or the first listed while none are. */
export function getFeaturedCaseStudy(): CaseStudy {
  return getLiveCaseStudies()[0] ?? caseStudies[0];
}

/** The next live case study in display order, looping; undefined when this is the only one. */
export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const live = getLiveCaseStudies();
  const next = live[(live.findIndex((study) => study.slug === slug) + 1) % live.length];
  return next?.slug === slug ? undefined : next;
}

export function caseStudyMeta(study: CaseStudy) {
  return [study.org, study.period, study.role].filter(Boolean).join(" · ");
}

/** Accessible name for a case study's animated product screen when it stands alone. */
export function caseStudyScreenLabel(study: CaseStudy) {
  return `${study.title} product screen (animated mock-up)`;
}
