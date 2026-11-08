"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "@/hooks/use-theme";
import { switchTheme } from "@/lib/theme";

/**
 * The active segment is styled from <html data-theme> (light:/dark: variants), not from
 * React state, so the server-rendered HTML is already correct before hydration.
 */
const options = [
  {
    value: "light",
    label: "Light mode",
    Icon: SunIcon,
    activeClassName: "light:bg-bg light:text-ink light:shadow-[0_0_0_1px_var(--border)]",
  },
  {
    value: "dark",
    label: "Dark mode",
    Icon: MoonIcon,
    activeClassName: "dark:bg-bg dark:text-ink dark:shadow-[0_0_0_1px_var(--border)]",
  },
] as const;

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useTheme();

  return (
    <ToggleGroup
      type="single"
      aria-label="Theme"
      value={theme ?? ""}
      className={className}
    >
      {options.map(({ value, label, Icon, activeClassName }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          className={activeClassName}
          // Handled on click (also Enter/Space), not onValueChange, to reveal from the pressed segment.
          onClick={(event) => switchTheme(value, event.currentTarget)}
        >
          <Icon />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
