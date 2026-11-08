import { loopAt } from "@/lib/loop-timing";

const sources = [
  { ref: "[1]", file: "Hartwell MSA amendment.pdf", page: "p. 4", at: 0.44 },
  { ref: "[2]", file: "Orbis Freight renewal 2025.pdf", page: "p. 12", at: 0.5 },
  { ref: "[3]", file: "Kestrel supply agreement v3.pdf", page: "p. 7", at: 0.56 },
];

function Cite({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[.8em] text-accent">{children}</span>;
}

/** Ledgerlens: a question types out, then a cited answer and its sources appear. */
export function LedgerlensScreen() {
  const typing = loopAt(0.03, 0.17);

  return (
    <div className="box-content flex min-h-[28em] flex-col gap-[1.3em] px-[2.6em] pt-[1.8em] pb-[2.4em]">
      <div className="flex items-center justify-between gap-[1em] rounded-[.7em] border border-border px-[1.1em] py-[.8em] text-ink">
        <span className="loop-wipe whitespace-nowrap" style={typing}>
          <span className="loop-unwipe block" style={typing}>
            Which suppliers moved to 60-day payment terms this year?
          </span>
        </span>
        <span className="font-mono text-[.85em] text-sub">↵</span>
      </div>
      <div className="flex flex-col gap-[.4em]">
        <div className="loop-in font-mono text-[.85em] text-sub" style={loopAt(0.26)}>
          Answer · 0.8s · 3 sources
        </div>
        <div className="loop-in text-ink" style={loopAt(0.32)}>
          Three suppliers moved to 60-day terms in 2025: Hartwell Packaging <Cite>[1]</Cite>, Orbis Freight{" "}
          <Cite>[2]</Cite> and Kestrel Components <Cite>[3]</Cite>. Orbis also added a 2% early-payment discount{" "}
          <Cite>[2]</Cite>.
        </div>
      </div>
      <div className="flex flex-col text-[.95em]">
        {sources.map((source) => (
          <div
            key={source.ref}
            className="loop-in grid grid-cols-[2.6em_1fr_auto] border-t border-border py-[.55em]"
            style={loopAt(source.at)}
          >
            <span className="font-mono text-sub">{source.ref}</span>
            <span className="text-ink">{source.file}</span>
            <span className="font-mono text-sub">{source.page}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
