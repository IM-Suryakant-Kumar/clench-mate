import type { IComment } from "../types";
import { Avatar, ShowMoreCommentAction } from ".";
import { Link } from "react-router";
import { MdMoreHoriz } from "react-icons/md";
import { useState } from "react";
import { useGetProfileQuery } from "../features/apis";

type Props = {
	comments: IComment[];
};

export const Comments: React.FC<Props> = ({ comments }) => {
	const { data } = useGetProfileQuery();
	const [showMoreCommentAction, setShowMoreCommentAction] = useState("");

	return (
		<div className="bg-gray-200 flex flex-col gap-4 rounded-md">
			{comments.map((comment) => (
				<div
					key={comment._id}
					className="flex gap-4 border-b-2 border-gray-300 p-4"
				>
					{comment.author && (
						<div>
							<Avatar size={8} user={comment.author} />
						</div>
					)}
					<div className="w-full">
						<div className="flex">
							<Link to={`/${comment.author?.username}`}>
								<span className="font-bold">{comment.author?.name}</span>
								<span className="text-gray-600 ml-2">
									@{comment.author?.name}
								</span>
							</Link>
							<div className="ml-auto relative">
								<MdMoreHoriz
									size="1.5em"
									className="text-gray-600 hover:text-green-500 cursor-pointer"
									onClick={() => setShowMoreCommentAction(comment._id!)}
								/>
								{showMoreCommentAction === comment._id && data?.user && (
									<ShowMoreCommentAction
										comment={comment}
										user={data?.user}
										setShowMoreCommentAction={setShowMoreCommentAction}
									/>
								)}
							</div>
						</div>
						<p>{comment.content}</p>
					</div>
				</div>
			))}
		</div>
	);
};
