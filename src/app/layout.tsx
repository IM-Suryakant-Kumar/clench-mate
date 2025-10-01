import type { Metadata } from "next";
import { Josefin_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
				<div className="flex flex-wrap gap-6 text-accent-foreground">
					<Link href="/">Home</Link>
					<Link href="/explore">Explore</Link>
					<Link href="/profile">Profile</Link>
					<Link href="/settings">Settings</Link>
					<Link href="/login">Login</Link>
					<Link href="/signup">Signup</Link>
				</div>
				{children}
			</body>
		</html>
	);
}
