"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type CopyEmailButtonProps = {
  email: string;
  className?: string;
};

const COPIED_MS = 1600;

/** Copies the email address, then shows "Copied ✓" for 1.6s (announced politely). */
export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard can be unavailable (insecure context, denied permission): don't claim
      // success, open the mail app instead so the click still does something.
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), COPIED_MS);
  }

  return (
    <Button variant="outline" onClick={handleClick} className={className}>
      <span aria-live="polite">{copied ? "Copied ✓" : "Copy email"}</span>
    </Button>
  );
}
