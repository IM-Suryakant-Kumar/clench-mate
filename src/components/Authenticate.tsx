"use client";
import { auth } from "@/lib/auth";
import { redirect, usePathname, useSearchParams } from "next/navigation";

type Session = typeof auth.$Infer.Session;

export default function Authenticate({ session }: { session: Session | null }) {
  const pathname = usePathname();
	const publicRoutes = ["/login", "/signup"];
	const redirectTo = useSearchParams().get("redirectTo") || "/";

  // console.log(session)

	if (!session?.user && !publicRoutes.includes(pathname)) {
		redirect(`/login`);
	}
	if (session?.user && publicRoutes.includes(pathname)) {
		redirect(redirectTo);
	}
	return null;
}
