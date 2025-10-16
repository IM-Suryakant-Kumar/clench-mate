import type { SuccessResponse } from "../../types";
import { api } from "../api";

const user = api.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query<SuccessResponse, void>({
			query: () => "/user",
			providesTags: (result) =>
				result
					? [
							{ type: "User", id: "LIST" },
							...result.users.map((user) => ({
								type: "User" as const,
								id: user.username,
							})),
					  ]
					: [{ type: "User", id: "LIST" }],
		}),
		getUser: build.query<SuccessResponse, string>({
			query: (username) => `/user/${username}`,
			providesTags: (result, _, id) => (result ? [{ type: "User", id }] : []),
		}),
	}),
});

export const { useGetUsersQuery, useGetUserQuery } = user;
