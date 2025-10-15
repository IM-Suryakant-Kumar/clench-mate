import { useState } from "react";
import { useAddCommentMutation, useGetProfileQuery } from "../features/apis";
import { Avatar } from "./Avatar";

type Props = {
	postId: string;
};

export const AddComment: React.FC<Props> = ({ postId }) => {
	const { data } = useGetProfileQuery();
	const [addComment, { isLoading }] = useAddCommentMutation();
	const [content, setContent] = useState("");

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				addComment({ post: postId, content });
				setContent("");
			}}
			className="bg-gray-200 p-4 flex items-center gap-4 rounded-md"
		>
			{data?.user && (
				<div className="">
					<Avatar size={8} user={data.user} />
				</div>
			)}
			<div className="w-full flex justify-between gap-2">
				<input
					type="text"
					name="content"
					placeholder="Comment as"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="bg-primary outline-0 px-2 py-0.5 text-sm rounded flex-4"
					required
				/>
				<button className="bg-logo text-primary ml-auto flex-1">
					{isLoading ? "Posting..." : "Post"}
				</button>
			</div>
		</form>
	);
};
