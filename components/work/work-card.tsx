import Link from "next/link";

import { ProjectScreen } from "@/components/work/project-screen";
import { formatShortYear } from "@/lib/format";
import { getWorkIndex, isCaseStudyLive, type CaseStudy } from "@/lib/work";

/**
 * /work grid card: animated screen, title and year, blurb, stat line, linking to the case study.
 * A planned project's card doesn't open: its screen is locked (hovering only tugs the padlock),
 * the planned label replaces the year, and its placeholder stats aren't shown.
 */
export function WorkCard({ study }: { study: CaseStudy }) {
  const live = isCaseStudyLive(study);

  const content = (
    <>
      <div className="overflow-hidden rounded-lg border border-border bg-bg">
        <div className="transition-transform duration-400 ease-zoom group-hover/card:scale-[1.012]">
          <ProjectScreen kind={study.slug} status={study.status} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-base font-medium text-ink transition-colors duration-200 ease-[ease] group-hover/card:text-accent">
            {study.title}
          </h2>
          <span className="font-mono text-2xs whitespace-nowrap text-sub">
            {live ? formatShortYear(study.year) : getWorkIndex().plannedLabel}
          </span>
        </div>
        <p className="text-sm leading-[1.55] text-pretty">{study.blurb}</p>
        {live && <p className="mt-1 font-mono text-2xs text-sub">{study.stats.join(" · ")}</p>}
      </div>
    </>
  );

  if (!live) return <div className="group/card flex flex-col gap-3 text-body">{content}</div>;

  // `prefetch`: the case study renders below the route's shared App Shell, so a default prefetch
  // would leave the page blank until the click. Case studies are static, so this costs no server work.
  return (
    <Link href={`/work/${study.slug}`} prefetch className="group/card flex flex-col gap-3 text-body">
      {content}
    </Link>
  );
}
