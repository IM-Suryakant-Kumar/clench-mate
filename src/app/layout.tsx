import type { Metadata } from "next";
import {Josefin_Sans, Cinzel } from "next/font/google";
import "./globals.css";

const josefin = Josefin_Sans({
	variable: "--font-josefin",
	subsets: ["latin"],
});

const cinzel = Cinzel({
	variable: "--font-cinzel",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "ClenchMate",
	description: "A Social media app where you can make friends and share your thoughts to them",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${josefin.variable} ${cinzel.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
