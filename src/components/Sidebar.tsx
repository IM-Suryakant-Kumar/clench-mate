"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	MdAdd,
	MdOutlineExplore,
	MdOutlineHome,
	MdOutlinePerson,
	MdOutlineSettings,
} from "react-icons/md";

const Sidebar = () => {
	const pathname = usePathname();
	const links = [
		{ name: "Home", href: "/home", icon: MdOutlineHome },
		{ name: "Explore", href: "/explore", icon: MdOutlineExplore },
		{ name: "Post", icon: MdAdd },
		{ name: "Profile", href: "/profile", icon: MdOutlinePerson },
		{ name: "Settings", href: "/settings", icon: MdOutlineSettings },
	] as const;

	return (
		<aside className="w-full h-16 bg-secondary fixed left-0 bottom-0 flex justify-between items-center gap-2 p-4 md:w-64 md:h-full md:bg-transparent md:top-16 md:flex-col md:justify-start md:gap-4 md:border-r border-gray-300">
			{links.map((link) =>
				link.name !== "Post" ? (
					<Link
						key={link.name}
						href={link.href}
						className={`${
							pathname === link.href
								? "text-logo border-2 border-logo rounded-full md:bg-logo md:text-primary"
								: "border-2 border-secondary rounded-full md:text-logo"
						} p-[1px] flex items-center gap-3 md:w-full md:px-10 md:py-2 md:border-none`}
					>
						<link.icon size="1.5em" />
						<span className="hidden md:block font-semibold text-xl">
							{link.name}
						</span>
					</Link>
				) : (
					<button className="border-2 border-logo rounded-full md:order-1 md:w-full md:h-10 md:bg-orange-400 md:text-primary md:border-none">
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

export default Sidebar;
