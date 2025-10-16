import { Avatar, PostActions, ShowMorePostAction } from ".";
import { MdMoreHoriz } from "react-icons/md";
import { useGetProfileQuery } from "../features/apis";
import { Link } from "react-router";
import type { IPost, IUser } from "../types";
import { useState } from "react";

type Props = {
	post: IPost;
	user?: IUser;
};

export const Post: React.FC<Props> = ({ post, user }) => {
	const { data } = useGetProfileQuery();
	const [showMorePostAction, setShowMorePostAction] = useState("");

	return (
		<div
			key={post._id}
			className="bg-gray-200 ring ring-gray-300 rounded-lg p-4 flex gap-3"
		>
			<Avatar user={post.author} />
			<div className="w-full flex flex-col">
				<div className="w-full flex justify-between gap-2">
					<Link to={`${user?.username || data?.user.username}`}>
						<span className="font-bold">{post.author?.name}</span>
						<span className="text-gray-600 ml-1">@{post.author?.username}</span>
					</Link>
					<div className="cursor-pointer relative">
						<MdMoreHoriz
							size="1.5em"
							className="text-gray-600 hover:text-green-500"
							onClick={() => setShowMorePostAction(post._id!)}
						/>
						{showMorePostAction === post._id && user && data?.user && post && (
							<ShowMorePostAction
								user={user || data?.user}
								post={post}
								setShowMoreAction={setShowMorePostAction}
							/>
						)}
					</div>
				</div>
				<p>{post.content}</p>
				{data?.user && post && (
					<PostActions post={post} user={data.user} />
				)}
			</div>
		</div>
	);
};
