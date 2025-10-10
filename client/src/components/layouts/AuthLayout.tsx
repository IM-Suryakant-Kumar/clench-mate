import { Navigate, Outlet, useLocation } from "react-router";
import { useGetProfileQuery } from "../../features/apis/auth";

export const AuthLayout = () => {
	const { isFetching, isSuccess } = useGetProfileQuery();
	const pathname = useLocation().state?.redirectTo || "/";

	return isFetching ? (
		<h1>Loading...</h1>
	) : isSuccess ? (
		<Navigate to={pathname} replace />
	) : (
		<Outlet />
	);
};
