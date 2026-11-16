import Image from "next/image";

import leagueDesktop from "@/assets/images/sentoff/league-desktop.png";

/**
 * Sent Off: a real screenshot, not a drawn mock-up. The demo league's match report
 * (league 1500, gameweek 10) at 1440px wide, from sentoff.lol. Sent Off is dark-only, so the
 * shot reads the same in both site themes. The frame clips its bottom like the drawn screens.
 */
export function SentoffScreen() {
  return <Image src={leagueDesktop} alt="" sizes="(min-width: 640px) 480px, 84vw" className="block w-full" />;
}
