import { Navigate, Outlet, useLocation } from "react-router";
import { useGetProfileQuery } from "../../features/apis/auth";
import { Header, Modal } from "..";
import { Sidebar } from "../Sidebar";
import { RightSidebar } from "../RightSidebar";
import { useAppSelector } from "../../features/store";

export const HostLayout = () => {
	const { showModal } = useAppSelector((state) => state.modal);
	const { data, isLoading, isSuccess } = useGetProfileQuery();
	const pathname = useLocation().pathname;

	return isLoading ? (
		<h1>Loading...</h1>
	) : isSuccess ? (
		<>
			<Header user={data.user} />
			<Sidebar user={data.user} />
			<RightSidebar />
			<main className="mt-22 md:mt-16 md:ml-52 lg:ml-64 lg:mr-72 p-2">
				<Outlet />
			</main>
			{showModal && <Modal />}
		</>
	) : (
		<Navigate
			to="/login"
			state={{ message: "You must first login", redirectTo: pathname }}
			replace
		/>
	);
};
