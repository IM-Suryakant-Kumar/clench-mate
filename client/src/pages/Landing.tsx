import { Link } from "react-router";

export const Landing = () => {
	return (
		<main className="max-w-7xl mx-auto min-h-screen p-4 flex flex-col items-center justify-center gap-8 md:flex-row md:justify-around">
			<div className="flex flex-col gap-2 justify-center items-center">
				<img
					src="/logo.png"
					alt="logo"
					className="border-4 border-logo rounded-full p-1"
					width={50}
					height={50}
				/>
				<h1 className="text-logo text-2xl font-bold font-cinzel">ClenchMate</h1>
				<p className="max-w-sm text-center mt-3 text-sm">
					Connect and share your thoughts and snaps with people and the
					community.
				</p>
				<Link to="/home">
					<h1 className="w-35 h-8 bg-logo text-primary text-xs font-cinzel font-bold rounded-lg flex justify-center items-center">
						Get Started
					</h1>
				</Link>
			</div>
			<div className="flex justify-center items-center">
				<img src="/hero.svg" alt="" className="" width={150} height={150} />
			</div>
		</main>
	);
};
