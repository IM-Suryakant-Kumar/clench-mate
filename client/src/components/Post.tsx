import { Avatar, PostActions, ShowMoreAction } from ".";
import { MdMoreHoriz } from "react-icons/md";
import { useGetProfileQuery } from "../features/apis";
import { Link } from "react-router";
import type { IPost } from "../types";
import { useState } from "react";

type Props = {
	post: IPost;
};

export const Post: React.FC<Props> = ({ post }) => {
	const { data } = useGetProfileQuery();
  const [showMoreAction, setShowMoreAction] = useState("");

	return (
		<div
			key={post._id}
			className="bg-gray-200 ring ring-gray-300 rounded-lg p-4 flex gap-3"
		>
			<div className="w-10">
				<Avatar size={10} user={post.author} />
			</div>
			<div className="w-full flex flex-col">
				<div className="w-full flex justify-between gap-2">
					<Link to={`${data?.user.username}`}>
						<span className="font-bold">{post.author?.name}</span>
						<span className="text-gray-600 ml-1">@{post.author?.username}</span>
					</Link>
					<div className="cursor-pointer relative">
						<MdMoreHoriz
							size="1.5em"
							color="gray"
							onClick={() => setShowMoreAction(post._id!)}
						/>
						{showMoreAction === post._id && data?.user && post && (
							<ShowMoreAction
								user={data.user}
								post={post}
								setShowMoreAction={setShowMoreAction}
							/>
						)}
					</div>
				</div>
				<p>{post.content}</p>
				{data?.user && post && <PostActions post={post} user={data.user} />}
			</div>
		</div>
	);
};
