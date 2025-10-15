import { Link } from "react-router";
import type { IUser } from "../types";

type Props = {
	size: number;
	user?: IUser;
};

export const Avatar: React.FC<Props> = ({ size, user }) => {
	return (
		<Link
			to={`/${user?.username}`}
			className={`min-w-${size} min-h-${size} flex justify-center items-center rounded-full ring-2 ring-logo`}
		>
			{user?.avatar ? (
				<img src={user?.avatar} alt="avatar" />
			) : (
				<span className="text-logo font-cinzel font-bold text-2xl">
					{user?.name![0].toUpperCase()}
				</span>
			)}
		</Link>
	);
};
