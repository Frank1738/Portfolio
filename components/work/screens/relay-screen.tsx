import { loopAt } from "@/lib/loop-timing";
import { cn } from "@/lib/utils";

const inbox = [
  { name: "Maya Chen", age: "2m", subject: "Charged twice in October" },
  { name: "Tom Okafor", age: "6m", subject: "Can't add a second admin" },
  { name: "Lena Fischer", age: "11m", subject: "CSV export is missing columns" },
  { name: "Ravi Shah", age: "18m", subject: "Change billing email" },
];

const chip = "rounded-[.4em] border border-border px-[.6em] py-[.2em]";

/** Relay: a support inbox where a drafted reply appears and is sent. */
export function RelayScreen() {
  return (
    <div className="grid min-h-[30em] grid-cols-[19em_1fr]">
      <div className="flex flex-col gap-[.2em] border-r border-border p-[.7em]">
        {inbox.map((ticket, index) => (
          <div key={ticket.name} className={cn("rounded-[.5em] px-[.9em] py-[.8em]", index === 0 && "bg-tile")}>
            <div className="flex justify-between text-ink">
              <span>{ticket.name}</span>
              <span className="font-mono text-[.85em] text-sub">{ticket.age}</span>
            </div>
            <div className="truncate text-[.92em] text-sub">{ticket.subject}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[1em] px-[1.8em] py-[1.4em]">
        <div className="loop-in max-w-[82%] self-start rounded-[.7em] bg-tile px-[1em] py-[.8em] text-ink" style={loopAt(0.06)}>
          Hi, I was charged twice for my October invoice. Can you refund one of them?
        </div>
        <div className="loop-in flex flex-col gap-[.7em] rounded-[.7em] border border-accent px-[1.2em] py-[1em]" style={loopAt(0.22)}>
          <div className="flex justify-between font-mono text-[.85em] text-sub">
            <span className="text-accent">Relay draft</span>
            <span className="loop-in" style={loopAt(0.42)}>
              94% confident
            </span>
          </div>
          <div className="loop-in text-ink" style={loopAt(0.3)}>
            Hi Maya, sorry about that. I can see two charges of £49 on 3 Oct, so I&apos;ve refunded the duplicate.
            It should reach your card in 3–5 working days.
          </div>
          <div className="loop-in flex gap-[.5em] font-mono text-[.8em] text-sub" style={loopAt(0.38)}>
            <span className={chip}>Billing › Duplicate charges</span>
            <span className={chip}>Ticket #48211</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-[.5em]">
          <span className="loop-in mr-[.4em] font-mono text-[.85em] text-accent" style={loopAt(0.62)}>
            Sent ✓
          </span>
          <span className="rounded-[.45em] border border-border px-[1em] py-[.4em]">Edit</span>
          <span className="rounded-[.45em] bg-ink px-[1em] py-[.4em] text-bg">Send</span>
        </div>
      </div>
    </div>
  );
}
