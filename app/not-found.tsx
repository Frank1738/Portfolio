import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";

// No canonical or Open Graph: Next marks the 404 response noindex.
export const metadata: Metadata = {
  title: "Page not found",
};

/** Site-wide 404, also shown when a case study or note slug doesn't exist. */
export default function NotFound() {
  return (
    <>
      <PageHeader backHref="/" backLabel="Home" section="404" className="enter-0" />
      <main id="main" className="mx-auto max-w-148 px-4 pt-below-header pb-24">
        <p className="enter-1 font-mono text-2xs text-accent">404</p>
        <h1 className="enter-2 mt-3 text-2xl leading-[1.2] font-semibold tracking-[-0.02em] text-ink">
          This page doesn&apos;t exist
        </h1>
        <p className="enter-3 mt-3.5 text-pretty">The link may be old, or the address mistyped.</p>
        <div className="enter-4 mt-8 flex flex-wrap gap-2">
          <Link href="/work" className={buttonVariants({ variant: "surface" })}>
            Selected work
          </Link>
          <Link href="/notes" className={buttonVariants({ variant: "outline" })}>
            Matchday notes
          </Link>
        </div>
      </main>
    </>
  );
}
