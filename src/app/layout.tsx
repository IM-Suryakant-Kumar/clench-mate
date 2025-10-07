import type { Metadata } from "next";
import { Josefin_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

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
	description: "A Social media app",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${josefin.variable} ${cinzel.variable} antialiased`}>
				<Header />
        <Sidebar />
				<div className="">{children}</div>
			</body>
		</html>
	);
}
