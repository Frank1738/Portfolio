import { loopAt } from "@/lib/loop-timing";
import { cn } from "@/lib/utils";

const steps = [
  { number: "01", name: "Received", detail: "Email · 14:02", at: 0.06 },
  { number: "02", name: "Extract", detail: "Done · 1.8s", at: 0.16 },
  { number: "03", name: "Match PO", detail: "11 / 12 lines", at: 0.26 },
  { number: "04", name: "Policy check", detail: "Qty mismatch", at: 0.38, flagged: true },
];

const log = [
  { line: "14:02:11  extract  12 line items, total £18,240.00", at: 0.18 },
  { line: "14:02:13  match    PO-7731 found, 11 of 12 lines matched", at: 0.28 },
  { line: "14:02:13  policy   line 7: 400 units invoiced, 360 received", at: 0.4 },
];

/** Flowpilot: an invoice run steps through its workflow and escalates a mismatch. */
export function FlowpilotScreen() {
  return (
    <div className="box-content flex min-h-[28em] flex-col gap-[1.3em] px-[2.2em] pt-[1.6em] pb-[2.4em]">
      <div className="flex items-center justify-between gap-[1em]">
        <span className="text-ink">INV-20931 · Acme Packaging · £18,240.00</span>
        <span
          className="loop-in rounded-[.4em] border border-accent px-[.6em] py-[.15em] font-mono text-[.85em] text-accent"
          style={loopAt(0.5)}
        >
          Needs review
        </span>
      </div>
      <div className="grid grid-cols-4 gap-[.8em]">
        {steps.map((step) => (
          <div
            key={step.number}
            className={cn(
              "loop-in flex flex-col gap-[.1em] rounded-[.6em] border px-[.9em] py-[.8em]",
              step.flagged ? "border-accent" : "border-border",
            )}
            style={loopAt(step.at)}
          >
            <span className={cn("font-mono text-[.8em]", step.flagged ? "text-accent" : "text-sub")}>{step.number}</span>
            <span className="text-ink">{step.name}</span>
            <span className="text-[.88em] text-sub">{step.detail}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[.4em] font-mono text-[.85em] text-sub">
        {log.map((entry) => (
          <span key={entry.at} className="loop-in" style={loopAt(entry.at)}>
            {entry.line}
          </span>
        ))}
      </div>
      <div className="loop-in rounded-[.6em] bg-tile px-[1em] py-[.8em] text-ink" style={loopAt(0.58)}>
        Sent to Priya (Accounts payable) with the PO, the delivery note and the mismatched line.
      </div>
    </div>
  );
}
