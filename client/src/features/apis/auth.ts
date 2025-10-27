import type { IUser, SuccessResponse } from "../../types";
import { api } from "../api";

interface IFollow {
	followingId: string;
}

interface ISignup {
	name: string;
	username: string;
	email: string;
	password: string;
}

interface ILogin {
	email: string;
	password: string;
}

const auth = api.injectEndpoints({
	endpoints: (build) => ({
		getProfile: build.query<SuccessResponse, void>({
			query: () => "/auth/me",
			providesTags: ["Auth"],
		}),
		updateProfile: build.mutation<SuccessResponse, IUser>({
			query: (body) => ({
				url: "/auth/me",
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result) => (result ? ["Auth"] : []),
		}),
		followUser: build.mutation<SuccessResponse, IFollow>({
			query: (body) => ({
				url: "/auth/follow",
				method: "POST",
				body,
			}),
			invalidatesTags: (result) => (result ? ["Auth"] : []),
		}),
		unfollowUser: build.mutation<SuccessResponse, IFollow>({
			query: (body) => ({
				url: "/auth/unfollow",
				method: "POST",
				body,
			}),
			invalidatesTags: (result) => (result ? ["Auth"] : []),
		}),
		Signup: build.mutation<SuccessResponse, ISignup>({
			query: (body) => ({
				url: "/auth/signup",
				method: "POST",
				body,
			}),
			invalidatesTags: (result) => (result ? ["Auth"] : []),
		}),
		login: build.mutation<SuccessResponse, ILogin>({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),
			invalidatesTags: (result) => (result ? ["Auth"] : []),
		}),
		guestLogin: build.mutation<SuccessResponse, void>({
			query: () => ({
				url: "/auth/login",
				method: "POST",
				body: { email: "clenchmate@gmail.com", password: "secret" },
			}),
			invalidatesTags: (result) => (result ? ["Auth"] : []),
		}),
		logout: build.mutation<SuccessResponse, void>({
			query: () => "/auth/logout",
			invalidatesTags: (result) => (result ? ["Auth"] : []),
		}),
	}),
});

export const {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useFollowUserMutation,
	useUnfollowUserMutation,
	useSignupMutation,
	useLoginMutation,
	useGuestLoginMutation,
	useLogoutMutation,
} = auth;
