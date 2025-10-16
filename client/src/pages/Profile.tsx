import { Link, useParams } from "react-router";
import {
	useFollowUserMutation,
	useGetProfileQuery,
	useGetUserQuery,
	useLogoutMutation,
	useUnfollowUserMutation,
} from "../features/apis";
import { useDocumentTitle } from "../hooks";
import { Avatar, Post } from "../components";

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
					{/* top */}
					<div className="flex justify-between gap-2 p-4 border-t border-gray-200">
						<Avatar
							user={data.user}
							className="bg-primary w-15 h-15 text-2xl -mt-10 sm:w-30 sm:h-30 sm:text-7xl sm:-mt-20 border-2"
						/>
						<div className="flex items-center gap-2">
							{currentUserData?.user._id === data.user._id ? (
								<>
									<Link to="/settings">
										<button className="h-full profile-button">
											Edit Profile
										</button>
									</Link>
									<button
										className="profile-button"
										disabled={isLogoutLoading}
										onClick={() => logout()}
									>
										Logout
									</button>
								</>
							) : (
								<button
									className="profile-button"
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
					{/* bottom profile details */}
					<div className="flex flex-col gap-2">
						<div className="">
							<p className="text-2xl font-bold">{data.user.name}</p>
							<p className="text-gray-600">@{data.user.username}</p>
						</div>
						<p className="">{data.user.bio}</p>
						<a className="text-blue-600 text-sm" href={data.user.website}>
							{data.user.website}
						</a>
						<div className="flex gap-6 mt-2">
							<p>
								<strong>{data.user.followers.length}</strong>{" "}
								<span className="text-gray-600">Followers</span>
							</p>
							<p>
								<strong>{data.user.followings.length}</strong>{" "}
								<span className="text-gray-600">Followings</span>
							</p>
						</div>
					</div>
					{/* posts */}
					<div className="flex flex-col gap-4 mt-6">
						{data.user.posts.map((post) => (
							<Post key={post._id} post={post} user={data.user} />
						))}
					</div>
				</div>
			)}
		</>
	);
};
