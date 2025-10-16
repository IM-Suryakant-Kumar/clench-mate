import { Link, useParams } from "react-router";
import {
	useFollowUserMutation,
	useGetProfileQuery,
	useGetUserQuery,
	useLogoutMutation,
	useUnfollowUserMutation,
} from "../features/apis";
import { useDocumentTitle } from "../hooks";
import { Avatar } from "../components";

export const Profile = () => {
	useDocumentTitle("Profile");
	const { username } = useParams();
	const { data: currentUserData } = useGetProfileQuery();
	const { data, isLoading } = useGetUserQuery(username!);
	const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
	const [followUser, { isLoading: isFollowUserLoading }] =
		useFollowUserMutation();
	const [UnfollowUser, { isLoading: isUnfollowUserLoading }] =
		useUnfollowUserMutation();

	return isLoading ? (
		<h1>Loading..</h1>
	) : (
		<>
			{data?.user && (
				<div className="w-full max-w-xl mx-auto">
					<img
						className="w-full h-40 object-cover border-2 border-gray-200"
						src={data.user.banner || "/banner.jpg"}
						alt="banner"
						loading="lazy"
					/>
					<div className="flex justify-between gap-4 p-4 border-t border-gray-200">
						<div className="w-1/2">
							<Avatar
								user={data.user}
								className="bg-primary w-30 h-30 text-7xl -mt-20"
							/>
						</div>
						<div className="flex gap-4">
							{currentUserData?.user._id === data.user._id ? (
								<>
									<Link to="/settings">
										<button className="h-full bg-primary text-logo hover:bg-logo hover:text-primary border border-logo font-bold px-6 py-0.5 rounded-full">
											Edit Profile
										</button>
									</Link>
									<button
										className="bg-primary text-logo hover:bg-logo hover:text-primary border border-logo font-bold px-6 py-0.5 rounded-full"
										disabled={isLogoutLoading}
										onClick={() => logout()}
									>
										{isLogoutLoading ? "Logging out..." : "Logout"}
									</button>
								</>
							) : (
								<button
									className="bg-primary text-logo hover:bg-logo hover:text-primary border border-logo font-bold px-6 py-0.5 rounded-full"
									onClick={() => {
										if (
											currentUserData?.user.followings.includes(data.user._id!)
										)
											UnfollowUser({ followingId: data.user._id! });
										else followUser({ followingId: data.user._id! });
									}}
									disabled={
										currentUserData?.user.followings.includes(data.user._id!)
											? isUnfollowUserLoading
											: isFollowUserLoading
									}
								>
									{currentUserData?.user.followings.includes(data.user._id!)
										? "Unfollow"
										: "Follow"}
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
