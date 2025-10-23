import { Link } from "react-router";
import type { IUser } from "../types";

type Props = {
	user?: IUser;
  preview?: string;
	className?: string;
};

export const Avatar: React.FC<Props> = ({ preview, user, className }) => {
	return (
		<Link to={`/${user?.username}`}>
			{preview || user?.avatar ? (
				<img
					className={`w-8 h-8 ring-2 ring-logo rounded-full object-cover ${className}`}
					src={preview ? preview : import.meta.env.VITE_BASE_URL + "/" + user?.avatar}
					alt="avatar"
				/>
			) : (
				<span
					className={`w-8 h-8 flex justify-center items-center rounded-full ring-2 ring-logo text-logo font-cinzel font-bold text-2xl ${className}`}
				>
					{user?.name![0].toUpperCase()}
				</span>
			)}
		</Link>
	);
};
