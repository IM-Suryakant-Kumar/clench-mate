import type { IUser, SuccessResponse } from "../../types";
import { api } from "../api";

const auth = api.injectEndpoints({
	endpoints: (build) => ({
		getProfile: build.query<SuccessResponse, void>({
			query: () => "/auth/me",
			providesTags: (result) =>
				result ? [{ type: "auth", id: "LIST" }] : ["auth"],
		}),
		updateProfile: build.mutation<SuccessResponse, IUser>({
			query: (body) => ({
				url: "/auth/me",
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result) =>
				result
					? [{ type: "auth", id: "LIST" }]
					: [{ type: "auth", id: "ERROR" }],
		}),
		followUser: build.mutation<SuccessResponse, { followingId: string }>({
			query: (body) => ({
				url: "/auth/me",
				method: "POST",
				body,
			}),
			invalidatesTags: (result) =>
				result
					? [{ type: "auth", id: "LIST" }]
					: [{ type: "auth", id: "ERROR" }],
		}),
		Signup: build.mutation<SuccessResponse, IUser>({
			query: (user) => ({
				url: "/auth/signup",
				method: "POST",
				body: user,
			}),
			invalidatesTags: (result) =>
				result ? ["auth"] : [{ type: "auth", id: "LIST" }],
		}),
		login: build.mutation<SuccessResponse, IUser>({
			query: (user) => ({
				url: "/auth/login",
				method: "POST",
				body: user,
			}),
			invalidatesTags: (result) =>
				result ? ["auth"] : [{ type: "auth", id: "LIST" }],
		}),
		guestLogin: build.mutation<SuccessResponse, void>({
			query: () => ({
				url: "/auth/login",
				method: "POST",
				body: { email: "clenchmate@gmail.com", password: "secret" },
			}),
			invalidatesTags: (result) =>
				result ? ["auth"] : [{ type: "auth", id: "LIST" }],
		}),
		logout: build.mutation<SuccessResponse, void>({
			query: () => "/auth/logout",
			invalidatesTags: (result) =>
				result
					? [{ type: "auth", id: "LIST" }]
					: [{ type: "auth", id: "ERROR" }],
		}),
	}),
});

export const {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useFollowUserMutation,
	useSignupMutation,
	useLoginMutation,
	useGuestLoginMutation,
	useLogoutMutation,
} = auth;
