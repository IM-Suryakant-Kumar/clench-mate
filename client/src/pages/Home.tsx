import { useState } from "react";
import { AddNewPost, Filters, Posts } from "../components";
import { useGetPostsQuery } from "../features/apis";
import { useDocumentTitle } from "../hooks";

export const Home = () => {
	useDocumentTitle("Home");
	const [filter, setFilter] = useState("Latest");
	const { data, isLoading } = useGetPostsQuery();
	const posts = data?.posts.map((p) => p);

	const filteredPosts =
		posts && filter === "Latest"
			? posts.reverse()
			: posts && filter === "Trending"
			? posts?.sort((a, b) => a.likes!.length - b.likes!.length)
			: posts;

	return isLoading ? (
		<h1>Loading...</h1>
	) : (
		<div className="w-full max-w-xl mx-auto flex flex-col gap-4">
			<AddNewPost />
			<Filters filter={filter} setFilter={setFilter} />
			<Posts posts={filteredPosts} />
		</div>
	);
};
