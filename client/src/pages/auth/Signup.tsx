import { Link } from "react-router";
import { useSignupMutation } from "../../features/apis/auth";
import { useDocumentTitle } from "../../hooks";

export const Signup = () => {
	useDocumentTitle("Signup");
	const [signup, { isLoading, error }] = useSignupMutation();
	const errorMessage = (error as { data: { message: string } })?.data.message;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const username = formData.get("username") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		signup({ name, username, email, password });
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="min-h-screen flex justify-center items-center p-4"
		>
			<div className="w-sm bg-primary flex flex-col gap-6 p-8 border-2 border-gray-200 rounded-md">
				<h1 className="text-logo font-cinzel text-2xl font-bold text-center mt-2 mb-6">
					Signup
				</h1>
				{errorMessage && (
					<p className="text-red-600 text-xs text-center">{errorMessage}</p>
				)}
				<input
					className="w-full p-0.5 outline-0 border-b-2 border-gray-300"
					type="text"
					name="name"
					placeholder="Name: "
          minLength={3}
          required
				/>
				<input
					className="w-full p-0.5 outline-0 border-b-2 border-gray-300"
					type="text"
					name="username"
					placeholder="Username: "
          minLength={3}
          required
				/>
				<input
					className="w-full p-0.5 outline-0 border-b-2 border-gray-300"
					type="email"
					name="email"
					placeholder="Email: "
          required
				/>
				<input
					className="w-full p-0.5 outline-0 border-b-2 border-gray-300"
					type="text"
					name="password"
					placeholder="Password: "
          minLength={3}
          required
				/>
				<button className="bg-logo text-primary p-1 rounded-md">
					{isLoading ? <h1>Loading...</h1> : "Signup"}
				</button>
				<p className="text-gray-600 text-sm text-center">
					Already have an account{" "}
					<Link className="text-logo font-semibold" to="/login">
						Login
					</Link>
				</p>
			</div>
		</form>
	);
};
