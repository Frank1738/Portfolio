import Link from "next/link";

import { ProjectScreen } from "@/components/work/project-screen";
import { formatShortYear } from "@/lib/format";
import type { CaseStudy } from "@/lib/work";

/** /work grid card: animated screen, title and year, blurb, stat line. Links to the case study. */
export function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/work/${study.slug}`} className="group/card flex flex-col gap-3 text-body">
      <div className="overflow-hidden rounded-lg border border-border bg-bg">
        <div className="transition-transform duration-400 ease-zoom group-hover/card:scale-[1.012]">
          <ProjectScreen kind={study.slug} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-base font-medium text-ink transition-colors duration-200 ease-[ease] group-hover/card:text-accent">
            {study.title}
          </h2>
          <span className="font-mono text-2xs text-sub">{formatShortYear(study.year)}</span>
        </div>
        <p className="text-sm leading-[1.55] text-pretty">{study.blurb}</p>
        <p className="mt-1 font-mono text-2xs text-sub">{study.stats.join(" · ")}</p>
      </div>
    </Link>
  );
}
