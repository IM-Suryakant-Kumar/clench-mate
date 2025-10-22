import { Link } from "react-router";
import {
	useFollowUserMutation,
	useGetProfileQuery,
	useGetUsersQuery,
	useUnfollowUserMutation,
} from "../features/apis";
import { useMemo } from "react";
import { Avatar } from ".";

export const RightSidebar = () => {
	const { data: profileData } = useGetProfileQuery();
	const { data } = useGetUsersQuery();
	const [followUser, { isLoading: isFollowUserLoading }] =
		useFollowUserMutation();
	const [unfollowUser, { isLoading: isUnfollowUserLoading }] =
		useUnfollowUserMutation();
	const isLoading = isFollowUserLoading || isUnfollowUserLoading;
	const usersLength = data?.users.length || 0;

	const randomIdx = useMemo(
		() => Math.floor(Math.random() * usersLength),
		[usersLength]
	);
	const startIdx =
		randomIdx === usersLength ? randomIdx - 6 : Math.floor(randomIdx / 2);
	const endIdx = startIdx + 6;

	const filteredUser = data?.users.filter(
		(user) => user._id !== profileData?.user._id
	);

	return (
		<div className="hidden w-72 h-[calc(100vh-64px)] lg:flex flex-col gap-2 fixed top-16 right-0 px-6 py-2 border-l border-gray-300">
			<h1 className="text-gray-400 font-semibold text-lg text-center mb-4">
				You might like
			</h1>
			{filteredUser?.slice(startIdx, endIdx).map((user) => (
				<div key={user._id} className="flex items-center gap-2">
						<Avatar user={user} />
						<Link to={`/${user.username}`} className="flex flex-col">
							<span className="font-semibold">{user.name}</span>
							<span className="text-gray-600 text-sm">{user.username}</span>
						</Link>
					<button
						className="min-w-8 min-h-8 flex justify-center items-center bg-logo text-primary px-4 text-sm rounded-full ml-auto mr-2"
						disabled={isLoading}
						onClick={() =>
							profileData?.user.followings!.includes(user._id!)
								? unfollowUser({ followingId: user._id! })
								: followUser({ followingId: user._id! })
						}
					>
						{profileData?.user.followings!.includes(user._id!)
							? "Following"
							: "Follow"}
					</button>
				</div>
			))}
		</div>
	);
};
