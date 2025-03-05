import "@/styles/globals.css";
import { fontYekan, site } from "@/core/config";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  generator: "Next.js",
  // manifest: "/manifest.json",
  authors: [{ name: site.author.name.en }],
  creator: site.author.name.en,
  icons: { icon: "/logo/logo-128.png", apple: "/logo/logo-128.png" },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#1273eb",
    "msapplication-tap-highlight": "no",
    "theme-color": "222831",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="fa" dir="rtl">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-iranyekan antialiased overflow-x-clip",
          fontYekan.variable,
        )}
      >
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "light",
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
