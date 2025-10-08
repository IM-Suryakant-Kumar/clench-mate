import { createBrowserRouter, RouterProvider } from "react-router";
import {
	Explore,
	Home,
	Login,
	NotFound,
	Profile,
	Settings,
	Signup,
} from "./pages";
import { AuthLayout, HostLayout, Layout } from "./components";

const App = () => {
	const router = createBrowserRouter([
		{
			Component: Layout,
			children: [
				{
					Component: HostLayout,
					children: [
						{ path: "/", Component: Home },
						{ path: "explore", Component: Explore },
						{ path: "profile", Component: Profile },
						{ path: "settings", Component: Settings },
					],
				},
				{
					Component: AuthLayout,
					children: [
						{ path: "login", Component: Login },
						{ path: "signup", Component: Signup },
					],
				},
			],
		},
		{ path: "*", Component: NotFound },
	]);

	return <RouterProvider router={router} />;
};

export default App;
