import type { IPost } from "../types";
import { Avatar } from ".";
import {
	MdFavorite,
	MdMoreHoriz,
	MdOutlineBookmarkBorder,
	MdOutlineChatBubbleOutline,
	MdOutlineFavoriteBorder,
} from "react-icons/md";
import { useGetProfileQuery } from "../features/apis";

type Props = {
	posts?: IPost[];
};

export const Posts: React.FC<Props> = ({ posts }) => {
	const { data } = useGetProfileQuery();

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
							<MdMoreHoriz
								className="ml-auto cursor-pointer"
								size="1.5em"
								color="gray"
							/>
						</div>
						<p>{post.content}</p>
						<div className="flex justify-between mt-4">
							<div className="flex items-center gap-1">
								{post.likes?.find((l) => l.user === data?.user._id) ? (
									<MdFavorite className="cursor-pointer" size="1.5em" />
								) : (
									<MdOutlineFavoriteBorder
										className="cursor-pointer"
										size="1.5em"
									/>
								)}
								{post.likes!.length > 0 && (
									<span className="text-lg">{post.likes?.length}</span>
								)}
							</div>
							<div className="flex items-center gap-1">
								<MdOutlineChatBubbleOutline
									className="cursor-pointer"
									size="1.5em"
								/>
								{post.comments!.length > 0 && (
									<span className="text-lg">{post.comments?.length}</span>
								)}
							</div>
							<div className="flex items-center gap-1">
								{post.saves?.find((s) => s.user === data?.user._id) ? (
									<MdFavorite className="cursor-pointer" size="1.5em" />
								) : (
									<MdOutlineBookmarkBorder
										className="cursor-pointer"
										size="1.5em"
									/>
								)}
								{post.saves!.length > 0 && (
									<span className="text-lg">{post.saves?.length}</span>
								)}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
