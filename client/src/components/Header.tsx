import { MdSearch } from "react-icons/md";
import type { IUser } from "../types";
import { Avatar } from ".";

type Props = {
	user?: IUser;
};

export const Header: React.FC<Props> = ({ user }) => {
	return (
		<header className="w-full h-22 bg-primary fixed left-0 top-0 flex justify-between items-center gap-2 flex-wrap p-2 border-b border-gray-200 shadow md:h-16 z-40">
			<h1 className="text-logo font-cinzel text-2xl font-bold">ClenchMate</h1>
			<div className="md:order-1">
				<Avatar size={8} user={user} />
			</div>
			<div className="w-full flex justify-between items-center border border-logo rounded pl-2 py-0.5 md:w-1/3">
				<input
					type="text"
					placeholder="Search..."
					className="w-[calc(100%-2em)] h-full outline-0"
				/>
				<MdSearch size="1.5em" color="orangered" />
			</div>
		</header>
	);
};
