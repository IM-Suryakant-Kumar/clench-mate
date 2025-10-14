import { toggleModal } from "../features/reducers";
import { useAppDispatch } from "../features/store";
import { AddNewPost } from "./AddNewPost";

export const Modal = () => {
	const dispatch = useAppDispatch();

	return (
		<div
			className="min-h-screen bg-black/80 fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center"
			onClick={() => dispatch(toggleModal(""))}
		>
			<AddNewPost />
		</div>
	);
};
