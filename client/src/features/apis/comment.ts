import type { IComment, SuccessResponse } from "../../types";
import { api } from "../api";

const comment = api.injectEndpoints({
	endpoints: (build) => ({
		getComments: build.query<SuccessResponse, void>({
			query: () => "/comment",
			providesTags: (result) =>
				result
					? [
							{ type: "Comment", id: "LIST" },
							...result.comments.map((comment) => ({
								type: "Comment" as const,
								id: comment._id,
							})),
					  ]
					: [{ type: "Comment", id: "LIST" }],
		}),
		AddComment: build.mutation<SuccessResponse, IComment>({
			query: (body) => ({
				url: "/comment",
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				result ? [{ type: "Comment", id: "LIST" }] : [],
		}),
		updateComment: build.mutation<SuccessResponse, IComment>({
			query: (body) => ({
				url: `/comment/${body._id}`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, _, { _id }) =>
				result ? [{ type: "Comment", id: _id }] : [],
		}),
		deleteComment: build.mutation<SuccessResponse, string>({
			query: (id) => ({
				url: `/comment/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, _, id) =>
				result ? [{ type: "Comment", id }] : [],
		}),
	}),
});

export const {
	useGetCommentsQuery,
	useAddCommentMutation,
	useUpdateCommentMutation,
	useDeleteCommentMutation,
} = comment;
