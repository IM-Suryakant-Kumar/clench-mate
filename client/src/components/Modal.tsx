import { useState } from "react";
import { toggleModal } from "../features/reducers";
import { useAppDispatch, useAppSelector } from "../features/store";

export const Modal = () => {
	const dispatch = useAppDispatch();
	const { showModal, UpdateModalId } = useAppSelector((state) => state.modal);
	const [content, setContent] = useState("");
  console.log(UpdateModalId);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
	};

	return (
		<div
			className={`${
				showModal ? "flex" : "hidden"
			} w-full min-h-screen bg-black/80 fixed left-0 top-0 right-0 bottom-0 justify-center items-center`}
		>
			<div
				className="w-full h-full fixed z-10"
				onClick={() => dispatch(toggleModal(""))}
			/>
			<form
				onSubmit={handleSubmit}
				className="z-20 w-11/12 max-w-sm bg-primary border-2 border-gray-200 rounded-xs p-4 flex flex-col gap-4"
			>
				<textarea
					name="content"
					placeholder="What's happening?"
					className="outline-0 resize-none h-24 bg-gray-100 p-2 rounded-md"
					required
					value={content}
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
						setContent(e.target.value)
					}
					onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
						e.target.style.height = "96px";
						e.target.style.height = `${e.target.scrollHeight}px`;
					}}
				/>
				<button className="ml-auto bg-logo text-primary font-bold px-8 py-1.5 rounded-full cursor-pointer">
					Post
				</button>
			</form>
		</div>
	);
};
