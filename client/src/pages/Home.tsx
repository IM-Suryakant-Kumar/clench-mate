import { useGetPostsQuery } from "../features/apis";
import { useDocumentTitle } from "../hooks";

export const Home = () => {
	useDocumentTitle("Home");
	const { data, isLoading } = useGetPostsQuery();
	return isLoading ? (
		<h1>Loading...</h1>
	) : (
		<div className="flex flex-col gap-4">
      <div className=""><textarea className="resize-none bg-gray-200" /></div>
			{data?.posts.map((post) => (
				<div key={post._id} className="w-full border border-gray-300">
					<div className="w-full max-w-xl mx-auto">

          </div>
				</div>
			))}
		</div>
	);
};
