import { Navigate, Outlet, useLocation } from "react-router";
import { useGetProfileQuery } from "../../features/apis/auth";

export const HostLayout = () => {
	const { isFetching, isSuccess } = useGetProfileQuery();
	const pathname = useLocation().pathname;

	return isFetching ? (
		<h1>Loading...</h1>
	) : isSuccess ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			state={{ message: "You must first login", redirectTo: pathname }}
			replace
		/>
	);
};
