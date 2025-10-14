import { useState } from "react";
import { useAddPostMutation, useGetProfileQuery } from "../features/apis";
import { useAppDispatch, useAppSelector } from "../features/store";
import { toggleModal } from "../features/reducers";
import { Avatar } from ".";

export const AddNewPost = () => {
	const { data } = useGetProfileQuery();
	const [addPost, { isLoading }] = useAddPostMutation();
	const [content, setContent] = useState("");
	const { showModal } = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addPost({ content });
		setContent("");
		if (showModal) {
			dispatch(toggleModal(""));
		}
	};

	return (
		<div
			className="w-full max-w-xl mx-auto bg-primary ring-2 ring-gray-200 rounded-lg p-6 flex gap-4"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="w-10">
				<Avatar size={10} user={data?.user} />
			</div>
			<form
				onSubmit={handleSubmit}
				className="w-full flex flex-col gap-4 ml-auto"
			>
				<textarea
					name="content"
					placeholder="What's happening?"
					className="outline-0 resize-none h-24 bg-gray-100 p-2 rounded-md"
					required
					value={content}
					onChange={(e) => setContent(e.target.value)}
					onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
						e.target.style.height = "96px";
						e.target.style.height = `${e.target.scrollHeight}px`;
					}}
				/>
				<button className="ml-auto bg-logo text-primary font-bold px-8 py-1.5 rounded-full cursor-pointer">
					{isLoading ? "Posting..." : "Post"}
				</button>
			</form>
		</div>
	);
};
