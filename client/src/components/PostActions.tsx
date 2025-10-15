import {
	MdBookmark,
	MdFavorite,
	MdLink,
	MdOutlineBookmarkBorder,
	MdOutlineChatBubbleOutline,
	MdOutlineFavoriteBorder,
} from "react-icons/md";
import type { IPost, IUser } from "../types";
import {
	useAddLikeMutation,
	useAddSaveMutation,
	useDeleteLikeMutation,
	useDeleteSaveMutation,
} from "../features/apis";
import { Link } from "react-router";

type Props = {
	post: IPost;
	user: IUser;
};

export const PostActions: React.FC<Props> = ({ post, user }) => {
	const [addLike, { isLoading: isAddLikeLoading }] = useAddLikeMutation();
	const [deleteLike, { isLoading: isDeleteLikeLoading }] =
		useDeleteLikeMutation();
	const [addSave, { isLoading: isAddSaveLoading }] = useAddSaveMutation();
	const [deleteSave, { isLoading: isDeleteSaveLoading }] =
		useDeleteSaveMutation();

	return (
		<div className="flex justify-between mt-4">
			<div className="flex items-center gap-1 text-gray-600 cursor-pointer hover:text-red-500">
				{post.likes?.find((l) => l.user === user._id) ? (
					<MdFavorite
						size="1.5em"
						className="text-red-500"
						onClick={() => deleteLike(post._id!)}
						aria-disabled={isDeleteLikeLoading}
					/>
				) : (
					<MdOutlineFavoriteBorder
						size="1.5em"
						onClick={() => addLike({ post: post._id })}
						aria-disabled={isAddLikeLoading}
					/>
				)}
				{post.likes!.length > 0 && (
					<span className="text-lg">{post.likes?.length}</span>
				)}
			</div>
			<div className="flex items-center gap-1 text-gray-600 cursor-pointer hover:text-green-400">
				<Link to={`/post/${post._id}`}>
					<MdOutlineChatBubbleOutline size="1.5em" />
					{post.comments!.length > 0 && (
						<span className="text-lg">{post.comments?.length}</span>
					)}
				</Link>
			</div>
			<div className="flex items-center gap-1 text-gray-600 cursor-pointer hover:text-green-400">
				{post.saves?.find((s) => s.user === user._id) ? (
					<MdBookmark
						className="text-green-400"
						size="1.5em"
						onClick={() => deleteSave(post._id!)}
						aria-disabled={isDeleteSaveLoading}
					/>
				) : (
					<MdOutlineBookmarkBorder
						size="1.5em"
						onClick={() => addSave({ post: post._id })}
						aria-disabled={isAddSaveLoading}
					/>
				)}
				{post.saves!.length > 0 && (
					<span className="text-lg">{post.saves?.length}</span>
				)}
			</div>
			<div
				className=""
				onClick={() =>
					navigator.clipboard.writeText(
						`${import.meta.env.VITE_BASE_URL}/${post?.author!.username}`
					)
				}
			>
				<MdLink
					size="1.5em"
					className="text-gray-600 cursor-pointer hover:text-green-400"
				/>
			</div>
		</div>
	);
};
