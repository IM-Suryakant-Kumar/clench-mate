import type { IPost } from "../types";
import { Post } from ".";

type Props = {
	posts?: IPost[];
};

export const Posts: React.FC<Props> = ({ posts }) => {
	return (
		<div className="flex flex-col gap-4">
			{posts?.map((post) => (
				<Post key={post._id} post={post} />
			))}
		</div>
	);
};
