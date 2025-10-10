import { Navigate, Outlet, useLocation } from "react-router";
import { useGetProfileQuery } from "../../features/apis/auth";
import { Header } from "..";
import { Sidebar } from "../Sidebar";

export const HostLayout = () => {
	const { data, isFetching, isSuccess } = useGetProfileQuery();
	const pathname = useLocation().pathname;

	return isFetching ? (
		<h1>Loading...</h1>
	) : isSuccess ? (
		<>
			<Header user={data?.user} />
			<Sidebar user={data?.user} />
			<main className="mt-22 md:mt-16 md:ml-52 lg:ml-64 p-2">
				<Outlet />
			</main>
		</>
	) : (
		<Navigate
			to="/login"
			state={{ message: "You must first login", redirectTo: pathname }}
			replace
		/>
	);
};
