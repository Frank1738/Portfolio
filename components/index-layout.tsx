import { PageHeader } from "@/components/page-header";

type IndexLayoutProps = {
  title: string;
  description: string;
  /** The list on the right. */
  children: React.ReactNode;
};

/** Route-enter index of an index page's first list item: after the page header (0) and the aside (1). */
export const INDEX_LIST_ENTER = 2;

/**
 * Index page (/work, /notes): the page header (back pill left, theme toggle right), then a
 * sticky aside with the heading and description beside the list. 980px content, wrapping
 * to one column below about 816px.
 */
export function IndexLayout({ title, description, children }: IndexLayoutProps) {
  return (
    <>
      <PageHeader backHref="/" backLabel="Back" width="index" className="enter-0" />
      <main id="main" className="mx-auto flex max-w-[1012px] flex-wrap items-start gap-x-14 gap-y-10 px-4 pt-below-header pb-20">
        {/* Sticky only beside the list: once wrapped it would scroll over the cards. */}
        <header className="enter-1 flex-[0_1_248px] min-[816px]:sticky min-[816px]:top-page-top">
          <h1 className="text-base font-medium text-ink">{title}</h1>
          <p className="mt-1.5 text-pretty">{description}</p>
        </header>
        <div className="min-w-0 flex-[1_1_480px]">{children}</div>
      </main>
    </>
  );
}
