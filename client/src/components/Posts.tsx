import type { IPost } from "../types";
import { Avatar, PostActions } from ".";
import { MdMoreHoriz } from "react-icons/md";
import { useGetProfileQuery } from "../features/apis";
import { Link } from "react-router";

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
							<Link to={`${data?.user.username}`}>
								<span className="font-bold">{post.author?.name}</span>
								<span className="text-gray-600 ml-1">
									@{post.author?.username}
								</span>
							</Link>
							<MdMoreHoriz
								className="ml-auto cursor-pointer"
								size="1.5em"
								color="gray"
							/>
						</div>
						<p>{post.content}</p>
						{data?.user && post && <PostActions post={post} user={data.user} />}
					</div>
				</div>
			))}
		</div>
	);
};
