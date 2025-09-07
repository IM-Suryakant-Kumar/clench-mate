export const Landing = () => {
	return (
		<main className="max-w-7xl mx-auto min-h-screen p-4 flex flex-col items-center justify-center md:flex-row md:justify-between">
			<div className="flex flex-col gap-2 justify-center items-center">
				<img
					src="/logo.png"
					alt="logo"
					className="border-4 border-logo rounded-full p-1"
					width={50}
					height={50}
				/>
				<h1 className="text-logo text-2xl font-bold font-cinzel">ClenchMate</h1>
				<p className="max-w-sm text-center mt-3">
					Make friends and share your thoughts to community and friends.
				</p>
			</div>
			<div className="flex justify-center items-center">
				<img src="/hero.svg" alt="" className="" width={150} height={150} />
			</div>
		</main>
	);
};
