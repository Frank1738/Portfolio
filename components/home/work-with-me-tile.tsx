import { CopyEmailButton } from "@/components/home/copy-email-button";
import { TileHeader } from "@/components/home/tile-header";
import { Tile } from "@/components/tile";
import { buttonVariants } from "@/components/ui/button";
import { getServices } from "@/lib/home";
import { mailto, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** "Work with me" tile: availability, mailto service rows, Email me and Copy email. */
export function WorkWithMeTile({ className }: { className?: string }) {
  return (
    <Tile data-skel="16" className={cn("gap-3", className)}>
      <TileHeader>
        <h2 className="text-sm font-medium text-ink">Work with me</h2>
        <span className="flex items-center gap-1.5 font-mono text-2xs text-sub">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {site.availability}
        </span>
      </TileHeader>
      <ul className="flex flex-col">
        {getServices().map((service) => (
          <li key={service.name}>
            <a
              href={mailto(service.subject)}
              className="group/svc grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-t border-border py-2.25 text-sm leading-[1.35] text-sub"
            >
              <span className="flex flex-col">
                <span className="text-ink transition-colors duration-150 ease-[ease] group-hover/svc:text-accent">
                  {service.name}
                </span>
                <span>{service.description}</span>
              </span>
              <span
                aria-hidden="true"
                className="text-sub [transition:translate_.2s_var(--ease-soft),color_.15s] group-hover/svc:translate-x-0.75 group-hover/svc:text-accent"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex gap-2">
        <a href={mailto()} className={cn(buttonVariants({ variant: "surface" }), "flex-1")}>
          Email me
        </a>
        <CopyEmailButton email={site.email} className="flex-1" />
      </div>
    </Tile>
  );
}
