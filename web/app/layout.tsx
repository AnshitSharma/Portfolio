import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Spotlight from "@/components/Spotlight";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anshit Sharma | Frontend Developer",
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
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
