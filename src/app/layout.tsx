import "@/styles/globals.css";

import { type Metadata } from "next";
import { Josefin_Sans, Cinzel } from "next/font/google";

export const metadata: Metadata = {
  title: "Clench Mate",
  description: "A full stack social media app where you can explore people and communities. And share your thoughts.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${josefin.variable} ${cinzel.variable}`}>
      <body>{children}</body>
    </html>
  );
}
