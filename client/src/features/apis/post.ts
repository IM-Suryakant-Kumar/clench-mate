import type { IPost, SuccessResponse } from "../../types";
import { api } from "../api";

const post = api.injectEndpoints({
	endpoints: (build) => ({
		getPosts: build.query<SuccessResponse, void>({
			query: () => "/post",
			providesTags: (result) =>
				result
					? [
							{ type: "Post", id: "LIST" },
							...result.posts.map((post) => ({
								type: "Post" as const,
								id: post._id,
							})),
					  ]
					: [{ type: "Post", id: "LIST" }],
		}),
		getPost: build.query<SuccessResponse, string>({
			query: (id) => `/post/${id}`,
			providesTags: (result, _, id) => (result ? [{ type: "Post", id }] : []),
		}),
		AddPost: build.mutation<SuccessResponse, IPost>({
			query: (body) => ({
				url: "/post",
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				result ? [{ type: "Post", id: "LIST" }] : [],
		}),
		updatePost: build.mutation<SuccessResponse, IPost>({
			query: (body) => ({
				url: `/post/${body._id}`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, _, { _id }) =>
				result ? [{ type: "Post", id: _id }] : [],
		}),
		deletePost: build.mutation<SuccessResponse, string>({
			query: (id) => ({
				url: `/post/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, _, id) =>
				result ? [{ type: "Post", id }] : [],
		}),
	}),
});

export const {
	useGetPostsQuery,
	useGetPostQuery,
	useAddPostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
} = post;
