import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthLayout, HostLayout, Layout } from "./components";
import {
	Explore,
	Home,
	Landing,
	Login,
	NotFound,
	Profile,
	Settings,
	Signup,
} from "./pages";

function App() {
	const router = createBrowserRouter([
		{
			Component: Layout,
			children: [
				{ path: "/", Component: Landing },
				{
					Component: HostLayout,
					children: [
						{ path: "home", Component: Home },
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
}

export default App;
