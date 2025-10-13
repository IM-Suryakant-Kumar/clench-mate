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
			invalidatesTags: (result) => (result ? ["Auth"] : []),
		}),
		deleteSave: build.mutation<SuccessResponse, string>({
			query: (id) => ({
				url: `/save/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result) => (result ? ["Auth"] : []),
		}),
	}),
});

export const { useAddSaveMutation, useDeleteSaveMutation } = save;
