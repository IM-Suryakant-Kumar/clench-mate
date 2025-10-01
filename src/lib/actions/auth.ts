"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async (name: string, email: string, password: string) => {
	const res = await auth.api.signUpEmail({
		body: {
			name,
			email,
			password,
			callbackURL: "/",
		},
	});
	return res;
};

export const login = async (email: string, password: string) => {
	const res = await auth.api.signInEmail({
		body: {
			email,
			password,
			callbackURL: "/dashboard",
		},
		headers: await headers(),
	});
	return res;
};

export const signInSocial = async (provider: "github" | "google") => {
	const { url } = await auth.api.signInSocial({
		body: {
			provider,
			callbackURL: "/",
		},
	});

  console.log("res: ", url);

	if (url) redirect(url);
};

export const signout = async () => {
	const res = await auth.api.signOut({ headers: await headers() });
	return res;
};
