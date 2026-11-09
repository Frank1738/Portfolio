import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { NextCard } from "@/components/next-card";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { ArchitectureFlow } from "@/components/work/architecture-flow";
import { CaseSection } from "@/components/work/case-section";
import { ProjectScreen } from "@/components/work/project-screen";
import { padCount } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/structured-data";
import {
  caseStudyMeta,
  caseStudyScreenLabel,
  getCaseStudies,
  getCaseStudy,
  getNextCaseStudy,
  getWorkIndex,
  isWorkPublished,
} from "@/lib/work";

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study || !isWorkPublished()) return {};

  return pageMetadata({
    title: study.title,
    description: study.statement,
    path: `/work/${study.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const study = getCaseStudy((await params).slug);
  if (!study || !isWorkPublished()) notFound();

  const next = getNextCaseStudy(study.slug);

  return (
    <>
      <JsonLd
        graph={[
          caseStudyJsonLd(study),
          breadcrumbJsonLd([
            { name: getWorkIndex().title, path: "/work" },
            { name: study.title, path: `/work/${study.slug}` },
          ]),
        ]}
      />
      <PageHeader backHref="/work" backLabel="Work" section="Case study" className="enter-0" />

      <main id="main">
        <article>
          <header className="mx-auto max-w-148 px-4 pt-below-header">
            <p className="enter-1 font-mono text-2xs text-sub">{caseStudyMeta(study)}</p>
            <h1 className="enter-2 mt-3 text-4xl leading-[1.1] font-semibold tracking-tight text-accent">{study.title}</h1>
            <p className="enter-3 mt-3.5 text-lg leading-normal text-pretty text-ink">{study.statement}</p>
          </header>

          <div className="enter-4 mx-auto mt-10 max-w-148 px-4">
            <div className="overflow-hidden rounded-2xl border border-border bg-bg">
              <ProjectScreen kind={study.slug} label={caseStudyScreenLabel(study)} />
            </div>
          </div>

          {/* Route enter: blocks 0–7 stagger 70ms apart; from section 04 on they share the cap (8). */}
          <div className="mx-auto flex max-w-148 flex-col gap-14 px-4 pt-16">
            <CaseSection index="01" title="The problem" className="enter-5">
              <p className="text-pretty">{study.problem}</p>
            </CaseSection>

            <CaseSection index="02" title="What I built" className="enter-6">
              {study.built.map((paragraph) => (
                <p key={paragraph} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </CaseSection>

            <CaseSection index="03" title="Architecture" className="enter-7 gap-4">
              <ArchitectureFlow {...study.architecture} />
            </CaseSection>

            {/* 12px to the first row: 8px label margin + 4px gap, as in the prototype. */}
            <CaseSection index="04" title="Key decisions" className="enter-8 gap-1 [&>h2]:mb-2">
              <ol className="flex flex-col gap-1">
                {study.decisions.map((decision, index) => (
                  <li
                    key={decision.title}
                    className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-2 gap-y-1 border-t border-border py-4"
                  >
                    <span className="font-mono text-2xs leading-5.5 text-sub">{padCount(index + 1)}</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-medium text-ink">{decision.title}</h3>
                      <p className="text-pretty">{decision.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CaseSection>

            <CaseSection index="05" title="Results" className="enter-8 gap-4">
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
                {study.results.map((result) => (
                  <li key={result.label}>
                    <p className="text-3xl leading-[1.1] font-medium tracking-[-0.02em] whitespace-nowrap text-ink tabular-nums">
                      {result.value}
                    </p>
                    <p className="mt-1.5 text-sm">{result.label}</p>
                  </li>
                ))}
              </ul>
            </CaseSection>

            <CaseSection index="06" title="What I'd do differently" className="enter-8">
              <p className="text-pretty">{study.different}</p>
            </CaseSection>

            <CaseSection index="07" title="Stack" className="enter-8">
              <ul className="flex flex-wrap gap-2">
                {study.stack.map((tool) => (
                  <li key={tool}>
                    <Badge>{tool}</Badge>
                  </li>
                ))}
              </ul>
            </CaseSection>
          </div>
        </article>

        <nav aria-label="Next project" className="mx-auto max-w-148 px-4 pt-18 pb-24">
          <NextCard href={`/work/${next.slug}`} label="Next project" title={next.title}>
            {next.blurb}
          </NextCard>
        </nav>
      </main>
    </>
  );
}
