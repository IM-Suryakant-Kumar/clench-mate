import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
	const publicRoutes = ["/login", "/signup"];
	const path = request.nextUrl.pathname;
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session && !publicRoutes.includes(path)) {
		return NextResponse.redirect(
			new URL(`/login?redirectTo=${path}`, request.url)
		);
	}

	if (session && publicRoutes.includes(path)) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	runtime: "nodejs",
	matcher: ["/", "/explore", "/profile", "/settings", "/login", "/signup"], // Apply middleware to specific routes
};
