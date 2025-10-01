import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const publicRoutes = ["/login", "/signup"];
  const path = request.nextUrl.pathname;
	const session = await auth.api.getSession({
		headers: await headers(),
	});

  console.log("name: ", session?.user.name)

	if (!session && !publicRoutes.includes(path)) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
  
  if(session && publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

	return NextResponse.next();
}

export const config = {
	runtime: "nodejs",
	matcher: ["/", "/login", "/signup"], // Apply middleware to specific routes
};
