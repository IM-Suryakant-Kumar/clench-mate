import { Navigate, Outlet, useLocation } from "react-router";
import { useGetProfileQuery } from "../../features/apis/auth";

export const AuthLayout = () => {
	const { isLoading, isSuccess } = useGetProfileQuery();
	const pathname = useLocation().state?.redirectTo || "/";

	return isLoading ? (
		<h1>Loading...</h1>
	) : isSuccess ? (
		<Navigate to={pathname} replace />
	) : (
		<Outlet />
	);
};
