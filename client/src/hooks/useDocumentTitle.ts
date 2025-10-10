import { useEffect } from "react";

export const useDocumentTitle = (titleText: string) => {
	useEffect(() => {
		document.title = `ClenchMate | ${titleText}`;
	}, [titleText]);
};
