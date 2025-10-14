import type { IPost } from "../types";
import { Avatar } from ".";
import { MdMoreHoriz } from "react-icons/md";

type Props = {
	posts?: IPost[];
};

export const Posts: React.FC<Props> = ({ posts }) => {
	return (
		<div className="flex flex-col gap-4">
			{posts?.map((post) => (
				<div
					key={post._id}
					className="bg-gray-200 ring ring-gray-300 rounded-lg p-4 flex gap-3"
				>
					<div className="w-10">
						<Avatar size={10} user={post.author} />
					</div>
					<div className="w-full flex flex-col">
						<div className="w-full flex justify-between gap-2">
							<span className="font-bold">{post.author?.name}</span>
							<span className="text-gray-600">@{post.author?.username}</span>
							<MdMoreHoriz className="ml-auto cursor-pointer" size="1.5em" color="gray" />
						</div>
						<p>{post.content}</p>
					</div>
				</div>
			))}
		</div>
	);
};
