import type { ISave, SuccessResponse } from "../../types";
import { api } from "../api";

const save = api.injectEndpoints({
	endpoints: (build) => ({
		addSave: build.mutation<SuccessResponse, ISave>({
			query: (body) => ({
				url: "/save",
				method: "POST",
				body,
			}),
			invalidatesTags: (result, _, { post: id }) =>
				result ? ["Auth", { type: "Post", id }] : [],
		}),
		deleteSave: build.mutation<SuccessResponse, string>({
			query: (id) => ({
				url: `/save/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, _, id) =>
				result ? ["Auth", { type: "Post", id }] : [],
		}),
	}),
});

export const { useAddSaveMutation, useDeleteSaveMutation } = save;
