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
			invalidatesTags: (result) => (result ? ["Auth"] : []),
		}),
		deleteLike: build.mutation<SuccessResponse, string>({
			query: (id) => ({
				url: `/like/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result) => (result ? ["Auth"] : []),
		}),
	}),
});

export const { useAddLikeMutation, useDeleteLikeMutation } =
	like;
