import {
	MdAdd,
	MdOutlineExplore,
	MdOutlineHome,
	MdOutlinePerson,
	MdOutlineSettings,
} from "react-icons/md";
import { NavLink } from "react-router";

export const Sidebar = () => {
	const links = [
		{ name: "Home", to: "/home", icon: MdOutlineHome },
		{ name: "Explore", to: "/explore", icon: MdOutlineExplore },
		{ name: "Post", icon: MdAdd },
		{ name: "Profile", to: "/profile", icon: MdOutlinePerson },
		{ name: "Settings", to: "/settings", icon: MdOutlineSettings },
	] as const;

	return (
		<aside className="w-full h-16 bg-secondary fixed left-0 bottom-0 flex justify-between items-center gap-2 p-4 md:w-64 md:h-full md:bg-transparent md:top-16 md:flex-col md:justify-start md:gap-4 md:border-r border-gray-300">
			{links.map((link) =>
				link.name !== "Post" ? (
					<NavLink key={link.name} to={link.to} className="link">
						<link.icon size="1.5em" />
						<span className="hidden md:block font-semibold text-xl">
							{link.name}
						</span>
					</NavLink>
				) : (
					<button
						key={link.name}
						className="border-2 border-logo rounded-full md:order-1 md:w-full md:h-10 md:bg-orange-400 md:text-primary md:border-none"
					>
						<link.icon size="1.4em" className="text-logo md:hidden" />
						<span className="hidden md:block text-lg font-cinzel font-bold">
							{link.name}
						</span>
					</button>
				)
			)}
		</aside>
	);
};
