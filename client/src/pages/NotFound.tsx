import { useDocumentTitle } from "../hooks";

export const NotFound = () => {
	useDocumentTitle("Not Found");
	return <div>NotFound</div>;
};
