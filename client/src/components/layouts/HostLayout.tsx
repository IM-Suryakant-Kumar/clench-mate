import { Outlet } from "react-router";
import { Header, RightSidebar, Sidebar } from "..";

export const HostLayout = () => {
	return (
		<>
			<Header />
      <Sidebar />
      <RightSidebar />
      <Outlet />
		</>
	);
};
