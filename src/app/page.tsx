import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="max-w-7xl mx-auto min-h-screen p-4 flex flex-col items-center justify-center gap-8 md:flex-row md:justify-around">
			<div className="flex flex-col gap-2 justify-center items-center md:gap-4">
				<Image
					src="/logo.png"
					alt="logo"
					className="border-4 border-logo rounded-full p-1 md:w-15 md:h-15 object-contain"
					width={40}
					height={40}
				/>
				<h1 className="text-logo text-xl font-bold font-cinzel md:text-2xl">ClenchMate</h1>
				<p className="max-w-sm text-center text-xs font-cinzel md:text-sm">
					Connect and share your thoughts and snaps with people and the community.
				</p>
				<Link href="/home">
					<h1 className="w-30 h-7 bg-logo text-primary! text-xs font-cinzel font-bold rounded-xl flex justify-center items-center mt-6 md:w-40 md:h-8 md:rounded-xl md:text-sm">
						Get Started
					</h1>
				</Link>
			</div>
			<div className="flex justify-center items-center w-90 h-90">
				<Image src="/hero.svg" alt="" className="w-full h-full object-contain" width={120} height={120} />
			</div>
		</main>
	);
}
