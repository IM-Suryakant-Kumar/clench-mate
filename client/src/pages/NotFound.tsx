import { useDocumentTitle } from "../hooks";

export const NotFound = () => {
	useDocumentTitle("Not Found");
	return (
		<div className="min-h-screen flex justify-center items-center">
			<h1 className="text-red-500 text-xl md:text-3xl font-semibold text-center">404 - PAGE NOT FOUND!</h1>
		</div>
	);
};
