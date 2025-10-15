import type { ILike, SuccessResponse } from "../../types";
import { api } from "../api";

const like = api.injectEndpoints({
	endpoints: (build) => ({
		addLike: build.mutation<SuccessResponse, ILike>({
			query: (body) => ({
				url: "/like",
				method: "POST",
				body,
			}),
			invalidatesTags: (result, _, { post: id }) =>
				result ? ["Auth", { type: "Post", id }] : [],
		}),
		deleteLike: build.mutation<SuccessResponse, string>({
			query: (id) => ({
				url: `/like/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, _, id) =>
				result ? ["Auth", { type: "Post", id }] : [],
		}),
	}),
});

export const { useAddLikeMutation, useDeleteLikeMutation } = like;
