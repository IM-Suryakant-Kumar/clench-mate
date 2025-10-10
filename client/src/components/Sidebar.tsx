import { NavLink } from "react-router";
import type { IUser } from "../types";
import {
	MdAddCircleOutline,
	MdOutlineExplore,
	MdOutlineHome,
	MdOutlinePerson,
	MdOutlineSettings,
} from "react-icons/md";
import { useLogoutMutation } from "../features/apis/auth";

type Props = {
	user?: IUser;
};

export const Sidebar: React.FC<Props> = ({ user }) => {
	const [logout, { isLoading }] = useLogoutMutation();

	const links = [
		{ name: "Home", url: "/home", icon: MdOutlineHome },
		{ name: "Explore", url: "/explore", icon: MdOutlineExplore },
		{ name: "New Post", icon: MdAddCircleOutline },
		{ name: "Profile", url: `/${user?.username}`, icon: MdOutlinePerson },
		{ name: "Settings", url: "/settings", icon: MdOutlineSettings },
	] as const;

	return (
		<aside className="w-full h-16 bg-primary fixed left-0 bottom-0 border-t border-gray-200 p-4 flex md:w-52 lg:w-64 md:h-[calc(100%-64px)] md:border-0 md:border-r-2">
			<div className="w-full flex justify-between items-center gap-4 md:w-auto md:mx-auto md:flex-col md:justify-start md:items-start">
				{links.map((link) =>
					link.name === "New Post" ? (
						<div
							key={link.name}
							className="flex items-center gap-2 text-logo md:w-full md:bg-orange-400 md:text-primary rounded-full md:px-6 md:py-1.5 md:order-1"
						>
							<link.icon size="1.5em" />
							<span className="hidden md:inline text-lg font-semibold">
								{link.name}
							</span>
						</div>
					) : (
						<NavLink
							key={link.name}
							to={link.url}
							className="flex items-center gap-2 text-logo md:w-full md:px-6 md:py-1.5"
						>
							<link.icon size="1.5em" />
							<span className="hidden md:inline text-lg font-semibold">
								{link.name}
							</span>
						</NavLink>
					)
				)}
			</div>
			<button
				className="hidden md:block bg-orange-500 text-primary md:w-54 lg:w-64 fixed left-0 bottom-0 rounded-tr-full rounded-br-md py-1 font-bold"
				onClick={() => logout()}
			>
				{isLoading ? <h1>Loading...</h1> : "Log out"}
			</button>
		</aside>
	);
};
