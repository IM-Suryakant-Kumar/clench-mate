"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { login, signInSocial } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";

export default function Login() {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setErrorMessage("");
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		try {
			const res = await login(email, password);
			if (res.user) router.refresh();
			else setErrorMessage("Invalid email and password");
		} catch (error) {
			setErrorMessage(
				`Authentication error: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		} finally {
			setLoading(false);
		}
	};

	const handleSociallogin = async (provider: "github" | "google") => {
		setLoading(true);
		setErrorMessage("");
		try {
			await signInSocial(provider);
      router.refresh();
		} catch (error) {
			setErrorMessage(
				`Authentication error: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white w-full max-w-sm flex flex-col gap-6 p-4 border-2 rounded-md mx-4"
		>
			<h1 className="text-center text-2xl font-bold font-cinzel text-green-500 mt-4 mb-6">
				Log In
			</h1>
			{errorMessage && (
				<p className="text-red-400 text-xs text-center">{errorMessage}</p>
			)}
			<div className="flex justify-around items-center gap-6">
				<Button
					type="button"
					className="flex-1 flex justify-center items-center"
					variant="outline"
					disabled={loading}
					onClick={() => handleSociallogin("github")}
				>
					<Image src="/github.png" alt="github icon" width={20} height={20} />{" "}
					<span className="font-semibold">GitHub</span>
				</Button>
				<Button
					type="button"
					className="flex-1 flex justify-center items-center"
					variant="outline"
					disabled={loading}
					onClick={() => handleSociallogin("google")}
				>
					<Image src="/google.png" alt="github icon" width={20} height={20} />{" "}
					<span className="font-semibold">Google</span>
				</Button>
			</div>
			<hr />
			<Input name="email" type="email" placeholder="Email:" />
			<Input name="password" type="password" placeholder="Password:" />
			<Button type="submit" disabled={loading}>
				{loading ? <Loader2Icon className="animate-spin" /> : "Login"}
			</Button>
			<p className="text-sm text-gray-400 text-center">
				Don&apos;t have an account
				<Link href="/signup">
					<Button variant="link">Signup</Button>
				</Link>
			</p>
		</form>
	);
}
