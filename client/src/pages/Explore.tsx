import { Posts } from "../components";
import { useGetPostsQuery } from "../features/apis";
import { useDocumentTitle } from "../hooks";

export const Explore = () => {
	useDocumentTitle("Explore");
	const { data, isLoading } = useGetPostsQuery();
	return isLoading ? (
		<h1>Loading...</h1>
	) : (
		<div className="w-full max-w-xl mx-auto flex flex-col gap-4">
			<Posts posts={data?.posts.map((post) => post).reverse()} />
		</div>
	);
};
