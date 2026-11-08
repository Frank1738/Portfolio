type BotMessageProps = {
  author: string;
  /** Avatar monogram, e.g. "MB". */
  initials: string;
  /** Display time, e.g. "Today 17:02". */
  time: string;
  /** Bold first line of the message. */
  title: string;
  /** Mono stat line under the title. */
  stats: string;
  message: string;
};

/** Post 0001's figure: a chat message from the Matchday bot. */
export function BotMessage({ author, initials, time, title, stats, message }: BotMessageProps) {
  return (
    <div className="grid grid-cols-[36px_minmax(0,1fr)] gap-3 text-sm leading-normal">
      <div
        aria-hidden="true"
        className="flex size-9 items-center justify-center rounded-lg bg-ink font-mono text-2xs text-bg"
      >
        {initials}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-ink">{author}</span>
          <span className="font-mono text-2xs text-sub">{time}</span>
        </div>
        <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-bg px-3.5 py-3">
          <div className="font-medium text-ink">{title}</div>
          <div className="font-mono text-2xs text-sub">{stats}</div>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
}
