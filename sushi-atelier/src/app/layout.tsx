import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-manrope",
});

const notoJp = Noto_Serif_JP({
  weight: ["200", "300", "500"],
  variable: "--font-noto-jp",
  preload: false,
});

export const metadata: Metadata = {
  title: "ENSŌ — Sushi Atelier | The Art of Omakase",
  description:
    "A twenty-seat sushi atelier where every course is a brushstroke. Omakase as cinema — seasonal, silent, precise.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${notoJp.variable}`}
    >
      <body className="has-custom-cursor bg-ink text-cream">
        <SmoothScroll />
        <Cursor />
        <Nav />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
