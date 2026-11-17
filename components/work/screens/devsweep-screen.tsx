import type { ReactNode } from "react";

import { DevsweepBanner } from "@/components/work/screens/devsweep-banner";
import { loopSteps } from "@/lib/loop-timing";

type Severity = "critical" | "high" | "medium" | "low";

/** devsweep's own colours (bold red, red, yellow, cyan), mapped to the nearest design tokens. */
const tone: Record<Severity, string> = {
  critical: "font-medium text-sk-ai",
  high: "text-sk-ai",
  medium: "text-sk-in",
  low: "text-sk-be",
};

/** devsweep's demo: a scan of its test/fixtures/vulnerable-repo, as the README shows it. */
const files: { dir: string; name: string; findings: { severity: Severity; line: number; title: string; subject?: string }[] }[] = [
  {
    dir: ".github/workflows/",
    name: "pr-preview.yml",
    findings: [
      { severity: "critical", line: 14, title: "Runs pull request code with secrets", subject: "job preview" },
      { severity: "high", line: 16, title: "Unpinned action", subject: "example-org/deploy-preview@v2" },
      { severity: "medium", line: 9, title: "Token permissions not limited", subject: "job preview" },
    ],
  },
  {
    dir: ".github/workflows/",
    name: "release.yml",
    findings: [
      { severity: "high", line: 7, title: "Token can write to everything", subject: "whole workflow" },
      {
        severity: "high",
        line: 11,
        title: "Unpinned action",
        subject: "example-org/shared-workflows/.github/workflows/build.yml@main",
      },
      { severity: "high", line: 17, title: "Unpinned action", subject: "docker://alpine:3.20" },
      { severity: "high", line: 18, title: "Unpinned action", subject: "example-org/create-release@v2" },
      { severity: "high", line: 22, title: "Force push", subject: "tag v1" },
    ],
  },
  {
    dir: ".github/workflows/",
    name: "label.yml",
    findings: [{ severity: "medium", line: 3, title: "Uses the pull_request_target trigger" }],
  },
  {
    dir: ".github/workflows/",
    name: "docs.yml",
    findings: [{ severity: "low", line: 16, title: "Force push", subject: "branch gh-pages" }],
  },
];

const summary: { count: number; severity: Severity }[] = [
  { count: 1, severity: "critical" },
  { count: 6, severity: "high" },
  { count: 2, severity: "medium" },
  { count: 1, severity: "low" },
];

/** Column widths of devsweep's compact list, which aligns every group as one table. */
const SEVERITY_WIDTH = "critical".length;
const LINE_WIDTH = 2;
const TITLE_WIDTH = Math.max(...files.flatMap((file) => file.findings.map((finding) => finding.title.length)));

/**
 * devsweep's `●`, drawn: Geist Mono has no glyph for it. One cell wide; an SVG circle stays
 * round where a tiny rounded box would snap to the pixel grid.
 */
const dot = (
  <svg viewBox="0 0 6 6" className="inline-block h-[.6em] w-[1ch] overflow-visible fill-current align-[-.02em]">
    <circle cx="3" cy="3" r="2.2" />
  </svg>
);

const cursor = <span className="inline-block h-lh w-[1ch] bg-ink/70 align-top" />;

const prompt = (
  <>
    <span className="text-sk-be">~/vulnerable-repo</span> <span className="text-sub">$</span>{" "}
  </>
);

const COMMAND = "npx @frank1738/devsweep --offline";

/** The report as devsweep prints it, one row per terminal line (`null` for a blank line). */
const report: { key: string; line: ReactNode }[] = [
  { key: "results", line: <span className="text-sub">{"  "}Results for vulnerable-repo</span> },
  { key: "results-gap", line: null },
  ...files.flatMap((file) => [
    {
      key: file.name,
      line: (
        <>
          {"  "}
          <span className="text-sub">{file.dir}</span>
          <span className="font-medium">{file.name}</span>
        </>
      ),
    },
    ...file.findings.map((finding) => ({
      key: `${file.name}:${finding.line}`,
      line: (
        <>
          {"    "}
          <span className={tone[finding.severity]}>
            {dot} {finding.severity.padEnd(SEVERITY_WIDTH)}
          </span>
          {"  "}
          <span className="text-sub">{String(finding.line).padStart(LINE_WIDTH)}</span>
          {"  "}
          {finding.title}
          {finding.subject && (
            <>
              {" ".repeat(TITLE_WIDTH - finding.title.length + 2)}
              <span className="text-sub">{finding.subject}</span>
            </>
          )}
        </>
      ),
    })),
    { key: `${file.name}-gap`, line: null },
  ]),
  {
    key: "summary",
    line: (
      <>
        {"  "}
        <span className="font-medium">10 issues</span>
        {summary.map((item) => (
          <span key={item.severity}>
            {"  "}
            <span className={tone[item.severity]}>
              {item.count} {item.severity}
            </span>
          </span>
        ))}
        {"  "}
        <span className="text-sub">· 13 ms</span>
      </>
    ),
  },
  { key: "hint", line: <span className="text-sub">{"  "}Add --details to see why each one matters and how to fix it.</span> },
];

/*
 * Timeline, as fractions of the 7s cycle, following devsweep's README demo: the command types in
 * (about 40ms a key), Enter, the banner sweeps in, the report prints a line at a time, and the
 * prompt returns. Terminal output jumps rather than eases, so it all runs on stepped timing.
 */
const TYPE_AT = 0.04;
const TYPE_LENGTH = 0.2;
const ENTER = 0.27;
const TAGLINE_AT = 0.33;
const REPORT_AT = 0.345;
const ROW_STEP = 0.003;
const PROMPT_AT = REPORT_AT + report.length * ROW_STEP + 0.03;

const typing = loopSteps(TYPE_AT, TYPE_LENGTH, COMMAND.length);

/** devsweep: its README demo, replayed. The scan command types in, the banner sweeps in, the findings print. */
export function DevsweepScreen() {
  return (
    <div className="flex flex-col px-[2em] pt-[1.6em] pb-[1.8em] font-mono text-[.75em] leading-[1.2] whitespace-pre text-ink">
      <div>
        {prompt}
        <span className="relative inline-block align-top">
          {/* The command, uncovered one character per step. */}
          <span className="loop-wipe block" style={typing}>
            <span className="loop-unwipe block">{COMMAND}</span>
          </span>
          {/*
           * The cursor rides the right edge of a box that moves with the typing, one cell ahead of
           * the text, and goes once the command runs.
           */}
          <span className="loop-out absolute inset-y-0 left-[1ch] w-full" style={loopSteps(ENTER)}>
            <span className="loop-wipe block h-full" style={typing}>
              <span className="absolute top-0 right-0">{cursor}</span>
            </span>
          </span>
        </span>
      </div>

      <div className="h-lh" />
      <DevsweepBanner at={ENTER} />
      <div className="loop-in text-sub" style={loopSteps(TAGLINE_AT)}>
        {"  "}supply-chain &amp; credential risk scanner · v0.2.0
      </div>
      <div className="h-lh" />

      {report.map((row, index) =>
        row.line === null ? (
          <div key={row.key} className="h-lh" />
        ) : (
          <div key={row.key} className="loop-in" style={loopSteps(REPORT_AT + index * ROW_STEP)}>
            {row.line}
          </div>
        ),
      )}

      <div className="loop-in" style={loopSteps(PROMPT_AT)}>
        {prompt}
        {cursor}
      </div>
    </div>
  );
}
