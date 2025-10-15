import {
	useDeleteCommentMutation,
	useFollowUserMutation,
	useUnfollowUserMutation,
} from "../features/apis";
import type { IComment, IUser } from "../types";

type Props = {
	comment: IComment;
	user: IUser;
	setShowMoreCommentAction: React.Dispatch<React.SetStateAction<string>>;
};

export const ShowMoreCommentAction: React.FC<Props> = ({
	comment,
	user,
	setShowMoreCommentAction,
}) => {
	const [deleteComment, { isLoading: isDeleteCommentLoading }] =
		useDeleteCommentMutation();
	const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation();
	const [unfollowUser, { isLoading: isUnfollowLoading }] =
		useUnfollowUserMutation();

	return (
		<div className="absolute top-5 right-2 rounded-xs z-10">
			<div
				className="w-full min-h-screen fixed left-0 top-0 -z-10"
				onClick={() => setShowMoreCommentAction("")}
			/>
			<div className="bg-primary flex flex-col gap-1 px-4 py-1">
				{comment.author?._id === user._id ? (
					<>
						<button
							className="cursor-pointer"
							disabled={isDeleteCommentLoading}
							onClick={() => deleteComment(comment)}
						>
							Delete
						</button>
					</>
				) : (
					<>
						{user.followings.includes(comment.author?._id || "") ? (
							<button
								className="cursor-pointer"
								onClick={() =>
									unfollowUser({ followingId: comment.author?._id || "" })
								}
								disabled={isFollowLoading}
							>
								Unfollow
							</button>
						) : (
							<button
								className="cursor-pointer"
								onClick={() =>
									followUser({ followingId: comment.author?._id || "" })
								}
								disabled={isUnfollowLoading}
							>
								Follow
							</button>
						)}
					</>
				)}
			</div>
		</div>
	);
};
