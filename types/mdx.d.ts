// Types the named exports of MDX files. Every MDX file in this project is a Matchday note.
declare module "*.mdx" {
  import type { NoteMeta } from "@/lib/note-types";

  export const meta: NoteMeta;
}
