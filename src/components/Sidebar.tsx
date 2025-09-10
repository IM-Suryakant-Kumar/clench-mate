"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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
		{ name: "Profile", href: "/profile", icon: MdOutlinePerson },
		{ name: "Settings", href: "/settings", icon: MdOutlineSettings },
	];

	return (
		<aside className="w-full h-16 bg-secondary fixed left-0 bottom-0 flex justify-between items-center gap-2 p-4">
			{links.map((link) => (
				<Link
					key={link.name}
					href={link.href}
					className={`${
						pathname === link.href ? "border-2 border-logo rounded-full" : ""
					}`}
				>
					<span className="hidden">{link.name}</span>
					<link.icon size="1.5em" className="text-logo" />
				</Link>
			))}
		</aside>
	);
};

export default Sidebar;
