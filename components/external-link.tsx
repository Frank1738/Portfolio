/**
 * A link to another site, opened in a new tab. Screen readers hear "(opens in new tab)",
 * since the change of context isn't visible to them.
 */
export function ExternalLink({ children, ...props }: Omit<React.ComponentProps<"a">, "target" | "rel">) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
