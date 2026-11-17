import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { IntroScript } from "@/components/intro-script";
import { ThemeScript } from "@/components/theme-script";
import { site } from "@/lib/site";

import "./globals.css";

/**
 * Every route must prerender completely: the build fails if one ever reads cookies(),
 * headers() or uncached data. Dynamic segments need `generateStaticParams`.
 */
export const ensureStatic = "navigation";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

/** Defaults for every route. Pages set their own canonical URL, Open Graph and Twitter card (`pageMetadata`). */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: { type: "website", siteName: site.name, locale: site.locale },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme (ThemeScript) and data-intro (IntroScript) are set before hydration, so the attributes differ from the server HTML.
    <html lang="en" className={geistMono.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <IntroScript />
      </head>
      <body>
        {/* Every page's <main> has id="main". Shown only when focused (the first Tab). */}
        <a
          href="#main"
          className="sr-only rounded-full border border-border bg-bg px-3 py-1.5 text-sm text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        {children}
      </body>
      <GoogleAnalytics gaId="G-P9FPZC4825" />
    </html>
  );
}
