import { MdPerson, MdSearch } from "react-icons/md";
import { Link } from "react-router";

export const Header = () => {
	return (
		<header className="w-full h-22 bg-secondary border-b border-b-gray-200 fixed left-0 top-0 flex items-center gap-2 flex-wrap p-2 md:h-16">
			<Link to="/home" className="flex items-center gap-2">
				<img src="/logo.png" alt="logo" width={32} height={32} />
				<h1 className="font-bold text-xl">ClenchMate</h1>
			</Link>
			<div className="ml-auto md:order-1">
				<MdPerson className="text-logo" size="1.5em" />
			</div>
			<div className="w-full h-7 bg-primary flex items-center rounded overflow-hidden md:max-w-sm md:ml-auto">
				<input
					type="text"
					placeholder="Search..."
					className="w-[calc(100%-1.5rem)] pl-2  outline-none"
				/>
				<MdSearch size="1.2em" className="text-logo ml-auto m-1" />
			</div>
		</header>
	);
};