import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Spotlight from "@/components/Spotlight";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anshit Sharma | Fullstack Developer",
  description: "Personal portfolio of Anshit Sharma, a Frontend Developer & UI Designer based in New Delhi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${playfair.variable} antialiased`}
      >
        <CustomCursor />
        <Spotlight />
        <SmoothScroll>
          <div className="noise-bg" />
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </SmoothScroll>
      </body>
    </html>
  );
}
