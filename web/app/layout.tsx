import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { site } from "@/lib/content";
import "./globals.css";

// Newsreader, self-hosted and cut down to Latin text. The roman keeps its optical-size axis,
// so the giant headings and the small captions each get the cut drawn for their size.
const serif = localFont({
  src: [
    { path: "./fonts/newsreader-roman.woff2", style: "normal", weight: "400" },
    { path: "./fonts/newsreader-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const title = "Anshit Sharma, backend engineer";
const description =
  "Backend engineer in New Delhi. Inventory, deploy pipelines, a data pipeline, a CRM integration and provisioning automation, built at Bharat Datacenter.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "Anshit Sharma", type: "website", locale: "en_IN" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={serif.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
