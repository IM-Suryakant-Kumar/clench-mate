import { Link, useLocation } from "react-router";
import {
	useGuestLoginMutation,
	useLoginMutation,
} from "../../features/apis/auth";
import { useDocumentTitle } from "../../hooks";

export const Login = () => {
	useDocumentTitle("Login");
	const [login, { isLoading: isLoginLoading, error: loginError }] =
		useLoginMutation();
	const [guestLogin, { isLoading: isGuestLoding, error: guestError }] =
		useGuestLoginMutation();
	const isLoading = isLoginLoading || isGuestLoding;
	let errorMessage = useLocation().state?.message;
	if (loginError) {
		errorMessage = (loginError as { data: { message: string } }).data.message;
	} else if (guestError) {
		errorMessage = (guestError as { data: { message: string } }).data.message;
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		login({ email, password });
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="min-h-screen flex justify-center items-center p-4"
		>
			<div className="w-sm bg-primary flex flex-col gap-6 p-8 border-2 border-gray-200 rounded-md">
				<h1 className="text-logo font-cinzel text-2xl font-bold text-center mt-2 mb-6">
					Login
				</h1>
				{errorMessage && (
					<p className="text-red-600 text-xs text-center">{errorMessage}</p>
				)}
				<input
					className="w-full p-0.5 outline-0 border-b-2 border-gray-300"
					type="email"
					name="email"
					placeholder="Email: "
				/>
				<input
					className="w-full p-0.5 outline-0 border-b-2 border-gray-300"
					type="password"
					name="password"
					placeholder="Password: "
				/>
				<button className="bg-logo text-primary p-1 rounded-md">
					{isLoading ? <h1>Loading...</h1> : "Login"}
				</button>
				<button
					type="button"
					className="bg-primary text-logo p-1 rounded-md border-2 border-logo -mt-3"
					onClick={() => guestLogin()}
				>
					{isLoading ? <h1>Loading...</h1> : "Guest Login"}
				</button>
				<p className="text-gray-600 text-sm text-center">
					Don't have an account{" "}
					<Link className="text-logo font-semibold" to="/signup">
						Signup
					</Link>
				</p>
			</div>
		</form>
	);
};
