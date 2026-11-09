import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { INDEX_LIST_ENTER, IndexLayout } from "@/components/index-layout";
import { WorkCard } from "@/components/work/work-card";
import { pageMetadata } from "@/lib/metadata";
import { enterClass } from "@/lib/motion";
import { getCaseStudies, getWorkIndex, isWorkPublished } from "@/lib/work";

const { title, description } = getWorkIndex();

export const metadata: Metadata = pageMetadata({ title, description, path: "/work" });

export default function WorkPage() {
  if (!isWorkPublished()) notFound();

  return (
    <IndexLayout title={title} description={description}>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-8 gap-y-12">
        {getCaseStudies().map((study, index) => (
          <li key={study.slug} className={enterClass(INDEX_LIST_ENTER + index)}>
            <WorkCard study={study} />
          </li>
        ))}
      </ul>
    </IndexLayout>
  );
}
