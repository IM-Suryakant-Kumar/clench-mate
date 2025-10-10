import { Link } from "react-router";
import { useDocumentTitle } from "../hooks";

export const NotFound = () => {
	useDocumentTitle("Not Found");
	return (
		<div className="min-h-screen flex flex-col justify-center items-center gap-6">
			<h1 className="text-red-500 font-cinzel text-xl md:text-3xl font-semibold text-center">
				404 - PAGE NOT FOUND!
			</h1>
			<Link
				to="/"
				className="bg-logo text-primary font-semibold px-10 py-2 rounded-xs"
				replace
			>
				Go To Home
			</Link>
		</div>
	);
};
