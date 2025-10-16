import { useState } from "react";
import {
	useAddPostMutation,
	useGetProfileQuery,
	useUpdatePostMutation,
} from "../features/apis";
import { useAppDispatch, useAppSelector } from "../features/store";
import { toggleModal } from "../features/reducers";
import { Avatar } from ".";
import type { IPost } from "../types";

type Props = {
	width?: string;
	post?: IPost;
};

export const AddNewPost: React.FC<Props> = ({ width, post }) => {
	const { data } = useGetProfileQuery();
	const [addPost, { isLoading: isAddPostLoading }] = useAddPostMutation();
	const [updatePost, { isLoading: isUpdatePostLoading }] =
		useUpdatePostMutation();
	const { showModal } = useAppSelector((state) => state.modal);
	const [content, setContent] = useState("");
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (post) updatePost({ _id: post._id, content });
		else addPost({ content });
		setContent("");
		if (showModal) {
			dispatch(toggleModal(""));
		}
	};

	return (
		<div
			className={`${
				width ? width : "w-full"
			} max-w-xl mx-auto bg-gray-200 ring-2 ring-gray-200 rounded-lg p-6 flex gap-4`}
			onClick={(e) => e.stopPropagation()}
		>
			<Avatar user={data?.user} />
			<form
				onSubmit={handleSubmit}
				className="w-full flex flex-col gap-4 ml-auto"
			>
				<textarea
					name="content"
					placeholder="What's happening?"
					className="outline-0 resize-none h-24 bg-white p-2 rounded-md"
					required
					value={content}
					defaultValue={post && post?.content}
					onChange={(e) => setContent(e.target.value)}
					onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
						e.target.style.height = "96px";
						e.target.style.height = `${e.target.scrollHeight}px`;
					}}
				/>

				{post ? (
					<button
						className="ml-auto bg-logo text-primary font-bold px-8 py-1.5 rounded-full cursor-pointer"
						disabled={isUpdatePostLoading}
					>
						{isUpdatePostLoading ? "Updating..." : "Update"}
					</button>
				) : (
					<button
						className="ml-auto bg-logo text-primary font-bold px-8 py-1.5 rounded-full cursor-pointer"
						disabled={isAddPostLoading}
					>
						{isAddPostLoading ? "Posting..." : "Post"}
					</button>
				)}
			</form>
		</div>
	);
};
