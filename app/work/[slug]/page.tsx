import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ExternalLink } from "@/components/external-link";
import { JsonLd } from "@/components/json-ld";
import { NextCard } from "@/components/next-card";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ArchitectureFlow } from "@/components/work/architecture-flow";
import { CaseSection } from "@/components/work/case-section";
import { ProjectScreen } from "@/components/work/project-screen";
import { padCount } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { enterClass } from "@/lib/motion";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";
import {
  caseStudyMeta,
  caseStudyScreenLabel,
  getCaseStudy,
  getLiveCaseStudies,
  getNextCaseStudy,
  getWorkIndex,
  isWorkPublished,
  type CaseStudy,
  type CaseStudyScreen,
} from "@/lib/work";

/** Route-enter index of the first numbered section (header, meta, title, statement and hero come first). */
const FIRST_SECTION_ENTER = 5;

export function generateStaticParams() {
  return getLiveCaseStudies().map((study) => ({ slug: study.slug }));
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

/**
 * Allowed to block. The page reads `params` outside `<Suspense>`, so it isn't in the App Shell
 * that every link into /work/[slug] shares. Wrapping it in `<Suspense>` would fix that, but React
 * then sends the article as a hidden block that an inline script reveals, so it wouldn't show
 * without JavaScript. Instead, the links that lead here (WorkCard, NextCard) prefetch the whole
 * static page, and clicks are still instant.
 */
export const instant = false;

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const study = getCaseStudy((await params).slug);
  if (!study || !isWorkPublished()) notFound();

  const next = getNextCaseStudy(study.slug);
  const workIndex = getWorkIndex();

  return (
    <>
      <JsonLd
        graph={[
          caseStudyJsonLd(study),
          breadcrumbJsonLd([
            { name: workIndex.title, path: "/work" },
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
            {study.links && (
              <ul className="enter-3 mt-6 flex flex-wrap gap-2.5">
                {study.links.map((link, index) => (
                  <li key={link.href}>
                    {/* The first link (the live product, or the repo) leads; the rest are secondary. */}
                    <ExternalLink
                      href={link.href}
                      className={buttonVariants({ variant: index === 0 ? "surface" : "outline", size: "md" })}
                    >
                      {link.label}
                      <span aria-hidden="true" className="font-mono-system text-sub">
                        ↗
                      </span>
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div className="enter-4 mx-auto mt-10 max-w-148 px-4">
            <div className="overflow-hidden rounded-2xl border border-border bg-bg">
              <ProjectScreen kind={study.slug} label={caseStudyScreenLabel(study)} />
            </div>
          </div>

          {/* Route enter: blocks stagger 70ms apart; from the fourth section on they share the cap (8). */}
          <div className="mx-auto flex max-w-148 flex-col gap-14 px-4 pt-16">
            {caseSections(study).map((section, index) => (
              <CaseSection
                key={section.title}
                index={padCount(index + 1)}
                title={section.title}
                className={cn(enterClass(FIRST_SECTION_ENTER + index), section.className)}
              >
                {section.content}
              </CaseSection>
            ))}
          </div>
        </article>

        <nav aria-label={next ? "Next project" : "More work"} className="mx-auto max-w-148 px-4 pt-18 pb-24">
          {next ? (
            <NextCard href={`/work/${next.slug}`} label="Next project" title={next.title}>
              {next.blurb}
            </NextCard>
          ) : (
            <NextCard href="/work" label="All projects" title={workIndex.title} />
          )}
        </nav>
      </main>
    </>
  );
}

type Section = {
  title: string;
  /** Section-specific spacing, added to CaseSection's default gap. */
  className?: string;
  content: React.ReactNode;
};

/** The numbered sections in order. Optional ones drop out, and the numbering closes up. */
function caseSections(study: CaseStudy): Section[] {
  return [
    { title: "The problem", content: <p className="text-pretty">{study.problem}</p> },
    {
      title: "What I built",
      content: study.built.map((paragraph) => (
        <p key={paragraph} className="text-pretty">
          {paragraph}
        </p>
      )),
    },
    ...(study.screens ? [{ title: "Screens", className: "gap-4", content: <Screens screens={study.screens} /> }] : []),
    { title: "Architecture", className: "gap-4", content: <ArchitectureFlow {...study.architecture} /> },
    {
      title: "Key decisions",
      // 12px to the first row: 8px label margin + 4px gap, as in the prototype.
      className: "gap-1 [&>h2]:mb-2",
      content: (
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
      ),
    },
    {
      title: "Results",
      className: "gap-4",
      content: (
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
      ),
    },
    ...(study.different
      ? [{ title: "What I'd do differently", content: <p className="text-pretty">{study.different}</p> }]
      : []),
    {
      title: "Stack",
      content: (
        <ul className="flex flex-wrap gap-2">
          {study.stack.map((tool) => (
            <li key={tool}>
              <Badge>{tool}</Badge>
            </li>
          ))}
        </ul>
      ),
    },
  ];
}

/**
 * Real screenshots in a two-column grid: a landscape shot spans both columns, portrait (phone)
 * shots sit side by side. Each is a figure with its caption in the mono meta style.
 */
function Screens({ screens }: { screens: CaseStudyScreen[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {screens.map((screen) => {
        const landscape = screen.image.width > screen.image.height;
        return (
          <li key={screen.image.src} className={cn(landscape && "col-span-2")}>
            <figure className="flex flex-col gap-2">
              <div className="overflow-hidden rounded-lg border border-border bg-tile">
                <Image
                  src={screen.image}
                  alt={screen.alt}
                  placeholder="blur"
                  sizes={landscape ? "(min-width: 640px) 560px, 100vw" : "(min-width: 640px) 272px, 50vw"}
                  className="block w-full"
                />
              </div>
              <figcaption className="font-mono text-2xs text-sub">{screen.caption}</figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
