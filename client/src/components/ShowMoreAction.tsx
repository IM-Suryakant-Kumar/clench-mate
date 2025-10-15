import {
	useDeletePostMutation,
	useFollowUserMutation,
	useUnfollowUserMutation,
} from "../features/apis";
import { toggleModal } from "../features/reducers";
import { useAppDispatch } from "../features/store";
import type { IPost, IUser } from "../types";

type Props = {
	post: IPost;
	user: IUser;
	setShowMoreAction: React.Dispatch<React.SetStateAction<string>>;
};

export const ShowMoreAction: React.FC<Props> = ({
	post,
	user,
	setShowMoreAction,
}) => {
	const [deletePost, { isLoading: isDeletePostLoading }] =
		useDeletePostMutation();
	const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation();
	const [unfollowUser, { isLoading: isUnfollowLoading }] =
		useUnfollowUserMutation();
	const dispatch = useAppDispatch();

	return (
		<div className="absolute top-5 right-2 rounded-xs z-10">
			<div
				className="w-full min-h-screen fixed left-0 top-0 -z-10"
				onClick={() => setShowMoreAction("")}
			/>
			<div className="bg-primary flex flex-col gap-1 px-4 py-1">
				{post.author?._id === user._id ? (
					<>
						<button
							className="cursor-pointer"
							onClick={() => {
								setShowMoreAction("");
								dispatch(toggleModal(post._id));
							}}
						>
							Edit
						</button>
						<button
							className="cursor-pointer"
							disabled={isDeletePostLoading}
							onClick={() => deletePost(post._id || "")}
						>
							Delete
						</button>
					</>
				) : (
					<>
						{user.followings.includes(post.author?._id || "") ? (
							<button
								className="cursor-pointer"
								onClick={() =>
									unfollowUser({ followingId: post.author?._id || "" })
								}
								disabled={isFollowLoading}
							>
								Unfollow
							</button>
						) : (
							<button
								className="cursor-pointer"
								onClick={() =>
									followUser({ followingId: post.author?._id || "" })
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
