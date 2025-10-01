"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { signInSocial, signUp } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";

export default function Signup() {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		try {
			const res = await signUp(name, email, password);
			if (res.user) router.refresh();
			else setErrorMessage("Failed to create user");
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

	const handleSocialSignup = async (provider: "github" | "google") => {
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
				Sign Up
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
					onClick={() => handleSocialSignup("github")}
				>
					<Image src="/github.png" alt="github icon" width={20} height={20} />{" "}
					<span className="font-semibold">GitHub</span>
				</Button>
				<Button
					type="button"
					className="flex-1 flex justify-center items-center"
					variant="outline"
					disabled={loading}
          onClick={() => handleSocialSignup("google")}
				>
					<Image src="/google.png" alt="github icon" width={20} height={20} />{" "}
					<span className="font-semibold">Google</span>
				</Button>
			</div>
			<hr />
			<Input name="name" type="text" placeholder="Name:" />
			<Input name="email" type="email" placeholder="Email:" />
			<Input name="password" type="password" placeholder="Password:" />
			<Button type="submit">
				{loading ? <Loader2Icon className="animate-spin" /> : "Signup"}
			</Button>
			<p className="text-sm text-gray-400 text-center">
				Already have an account
				<Link href="/login">
					<Button variant="link">Login</Button>
				</Link>
			</p>
		</form>
	);
}
