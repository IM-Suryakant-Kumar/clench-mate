import { MdAddAPhoto } from "react-icons/md";
import { Avatar } from "../components";
import {
	useGetProfileQuery,
	useLogoutMutation,
	useUpdateProfileMutation,
} from "../features/apis";
import { useDocumentTitle } from "../hooks";
import { useState, type ChangeEvent, type FormEvent } from "react";

export const Settings = () => {
	useDocumentTitle("Settings");
	const { data } = useGetProfileQuery();
	const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
	const [updateProfile, { isLoading: isUpdateProfileLoading }] =
		useUpdateProfileMutation();
	const [preview, setPreview] = useState("");

	const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
		setPreview(URL.createObjectURL(e.target.files![0]));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		updateProfile(formData);
    setPreview("");
	};

	return data?.user ? (
		<form onSubmit={handleSubmit} encType='multipart/form-data' className="w-full max-w-xl mx-auto flex flex-col justify-center p-4">
			{/* banner */}
			<img
				className="w-full h-40 object-cover border-2 border-gray-200 rounded-sm"
				src={data.user.banner || "/banner.jpg"}
				alt="banner"
				loading="lazy"
			/>
			{/* avatar */}
			<div className="bg-primary w-25 h-25 md:w-30 md:h-30 ring-3 ring-logo rounded-full ml-4 -mt-12 md:-mt-15 overflow-hidden relative">
				<Avatar
					className="w-25 h-25 text-6xl ring-0 md:w-30 md:h-30 md:text-7xl"
          preview={preview}
					user={data.user}
				/>
				<input
					className="w-full h-full absolute left-0 top-0 opacity-0 cursor-pointer z-10"
					type="file"
          name="avatar"
          accept=".png, .jpg, .jpeg"
					onChange={handleAvatar}
				/>
				<div className="w-1/2 h-1/2 absolute left-0 top-0 right-0 bottom-0 m-auto bg-black/20 flex justify-center items-center rounded-full">
					<MdAddAPhoto className="text-logo/50 w-8 h-8" />
				</div>
			</div>
			{/* profile info */}
			<div className="mx-4 mt-6 flex flex-col gap-4">
				<label className="flex flex-col gap-1 capitalize">
					Name:
					<input
						type="text"
						name="name"
						defaultValue={data.user.name}
						placeholder="Name: "
						className="bg-gray-100 ring ring-gray-300 pl-2 py-0.5 capitalize outline-0 rounded-md"
					/>
				</label>
				<label className="flex flex-col gap-1 capitalize">
					Username:
					<input
						type="text"
						name="username"
						defaultValue={data.user.username}
						placeholder="username: "
						className="bg-gray-100 ring ring-gray-300 pl-2 py-0.5 capitalize outline-0 rounded-md"
					/>
				</label>
				<label className="flex flex-col gap-1 capitalize">
					website:
					<input
						type="text"
						name="website"
						defaultValue={data.user.website}
						placeholder="website: "
						className="bg-gray-100 ring ring-gray-300 pl-2 py-0.5 capitalize outline-0 rounded-md"
					/>
				</label>
				<label className="flex flex-col gap-1 capitalize">
					Bio:
					<textarea
						name="bio"
						defaultValue={data.user.bio}
						placeholder="bio: "
						className="bg-gray-100 h-15 ring ring-gray-300 pl-2 py-0.5 capitalize outline-0 resize-none rounded-md"
						onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
							e.target.style.height = "60px";
							e.target.style.height = `${e.target.scrollHeight}px`;
						}}
					/>
				</label>
				<label className="flex flex-col gap-1 capitalize">
					country:
					<input
						type="text"
						name="country"
						defaultValue={data.user.country}
						placeholder="country: "
						className="bg-gray-100 ring ring-gray-300 pl-2 py-0.5 capitalize outline-0 rounded-md"
					/>
				</label>
				<label className="flex flex-col gap-1 capitalize">
					state:
					<input
						type="text"
						name="state"
						defaultValue={data.user.state}
						placeholder="state: "
						className="bg-gray-100 ring ring-gray-300 pl-2 py-0.5 capitalize outline-0 rounded-md"
					/>
				</label>
				<label className="flex flex-col gap-1 capitalize">
					city:
					<input
						type="text"
						name="city"
						defaultValue={data.user.city}
						placeholder="city: "
						className="bg-gray-100 ring ring-gray-300 pl-2 py-0.5 capitalize outline-0 rounded-md"
					/>
				</label>
				<label className="flex flex-col gap-1 capitalize">
					school:
					<input
						type="text"
						name="school"
						defaultValue={data.user.school}
						placeholder="school: "
						className="bg-gray-100 ring ring-gray-300 pl-2 py-0.5 capitalize outline-0 rounded-md"
					/>
				</label>
				<label className="flex flex-col gap-1 capitalize">
					work:
					<input
						type="text"
						name="work"
						defaultValue={data.user.work}
						placeholder="work: "
						className="bg-gray-100 ring ring-gray-300 pl-2 py-0.5 capitalize outline-0 rounded-md"
					/>
				</label>

				<button
					className="bg-logo hover:bg-primary text-primary hover:text-logo text-lg border-2 border-logo p-1 rounded-md mt-4"
					disabled={isUpdateProfileLoading}
				>
					{isUpdateProfileLoading ? "Saving..." : "Save"}
				</button>
				<button
					type="button"
					className="bg-primary hover:bg-logo text-logo hover:text-primary text-lg border-2 border-logo rounded-md p-1"
					disabled={isLogoutLoading}
					onClick={() => logout()}
				>
					{isLogoutLoading ? "Logging out..." : "Logout"}
				</button>
			</div>
		</form>
	) : (
		<h1>Loading...</h1>
	);
};
