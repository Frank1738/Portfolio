import Link from "next/link";
import { cva } from "class-variance-authority";

import { BackPill } from "@/components/back-pill";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Widths are the page's content width plus the 16px gutters. */
const pageHeaderVariants = cva("mx-auto flex items-center justify-between gap-4 px-4 pt-6 text-sm", {
  variants: {
    width: {
      /** 880px: case studies and posts. */
      article: "max-w-[912px]",
      /** 980px: lines up with the index pages (/work, /notes). */
      index: "max-w-[1012px]",
    },
  },
  defaultVariants: {
    width: "article",
  },
});

type PageHeaderProps = {
  backHref: string;
  backLabel: string;
  /** Shown after the name: "Frankline Osoro / Case study". Omit on index pages, where the h1 names the page. */
  section?: string;
  width?: "article" | "index";
  className?: string;
};

/** Top-of-page header: back pill (and "Name / Section") on the left, theme toggle on the right. */
export function PageHeader({ backHref, backLabel, section, width, className }: PageHeaderProps) {
  return (
    <header className={cn(pageHeaderVariants({ width }), className)}>
      <div className="flex min-w-0 items-center gap-4">
        <BackPill href={backHref}>{backLabel}</BackPill>
        {/*
          On phones only the name shows: "/ Section" repeats the back pill and would not fit.
          Truncation is a last resort for very narrow screens; the span's own padding keeps
          the link's enlarged tap target inside its overflow clip.
        */}
        {section && (
          <span className="-my-1 min-w-0 truncate py-1 text-sub">
            {/* Padding cancelled by margin: a 28px tap target without moving the text. */}
            <Link href="/" className="-my-1 inline-block py-1 text-ink">
              {site.name}
            </Link>
            <span className="hidden min-[480px]:inline"> / {section}</span>
          </span>
        )}
      </div>
      <ThemeToggle />
    </header>
  );
}
