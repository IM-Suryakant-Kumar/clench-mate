import type { IComment, SuccessResponse } from "../../types";
import { api } from "../api";

const comment = api.injectEndpoints({
	endpoints: (build) => ({
		AddComment: build.mutation<SuccessResponse, IComment>({
			query: (body) => ({
				url: "/comment",
				method: "POST",
				body,
			}),
			invalidatesTags: (result, _, { post: id }) =>
				result ? [{ type: "Post", id }] : [],
		}),
		updateComment: build.mutation<SuccessResponse, IComment>({
			query: (body) => ({
				url: `/comment/${body._id}`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, _, { post: id }) =>
				result ? [{ type: "Post", id }] : [],
		}),
		deleteComment: build.mutation<SuccessResponse, IComment>({
			query: (body) => ({
				url: `/comment/${body._id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, _, { post: id }) =>
				result ? [{ type: "Post", id }] : [],
		}),
	}),
});

export const {
	useAddCommentMutation,
	useUpdateCommentMutation,
	useDeleteCommentMutation,
} = comment;
