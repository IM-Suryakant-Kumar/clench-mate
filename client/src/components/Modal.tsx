import { useGetPostQuery } from "../features/apis";
import { toggleModal } from "../features/reducers";
import { useAppDispatch, useAppSelector } from "../features/store";
import { AddNewPost } from "./AddNewPost";

export const Modal = () => {
	const { UpdateModalId } = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();
	const { data } = useGetPostQuery(UpdateModalId);

	return (
		<div
			className="min-h-screen bg-black/80 fixed left-0 top-0 right-0 bottom-0 z-50 flex justify-center items-center"
			onClick={() => dispatch(toggleModal(""))}
		>
			<AddNewPost width="w-11/12" post={data?.post} />
		</div>
	);
};
