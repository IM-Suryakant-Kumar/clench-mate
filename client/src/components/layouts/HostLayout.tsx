import { Navigate, Outlet, useLocation } from "react-router";
import { useGetProfileQuery } from "../../features/apis/auth";
import { Header, Modal } from "..";
import { Sidebar } from "../Sidebar";
import { RightSidebar } from "../RightSidebar";

export const HostLayout = () => {
	const { data, isLoading, isSuccess } = useGetProfileQuery();
	const pathname = useLocation().pathname;

	return isLoading ? (
		<h1>Loading...</h1>
	) : isSuccess ? (
		<>
			<Header user={data?.user} />
			<Sidebar user={data?.user} />
			<RightSidebar />
			<main className="mt-22 md:mt-16 md:ml-52 lg:ml-72 lg:mr-64 p-2">
				<Outlet />
			</main>
      <Modal />
		</>
	) : (
		<Navigate
			to="/login"
			state={{ message: "You must first login", redirectTo: pathname }}
			replace
		/>
	);
};
