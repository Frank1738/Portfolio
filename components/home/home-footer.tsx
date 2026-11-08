import { ExternalLink } from "@/components/external-link";
import { mailto, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** 4px of padding cancelled by margin: a 28px tap target without moving the text. */
const link = "-my-1 py-1 text-sub hover:text-accent";

/** Home footer: email plus social links. */
export function HomeFooter({ className }: { className?: string }) {
  return (
    <footer data-skel="6" className={cn("flex flex-wrap gap-x-5 gap-y-2 text-sm", className)}>
      <a href={mailto()} className={link}>
        {site.email}
      </a>
      {site.social.map((social) => (
        <ExternalLink key={social.label} href={social.href} className={link}>
          {social.label}
        </ExternalLink>
      ))}
    </footer>
  );
}
