import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { BadRequestError, NotFoundError } from "../errors";
import { User } from "../models";
import { sendToken } from "../utils";
import { IReq } from "../types";

export const signup = asyncWrapper(async (req: Request, res: Response) => {
	const user = await User.create(req.body);
	sendToken(res, 201, user, "Signed up successfully.");
});

export const login = asyncWrapper(async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password)
		throw new BadRequestError("Please provide email and password");
	const user = await User.findOne({ email }).select("+password");
	if (!user) throw new NotFoundError("Invalid credentials");
	const isPasswordValid = await user.comparePassword(password);
	if (!isPasswordValid) throw new NotFoundError("Invalid credentials");
	sendToken(res, 200, user, "Logged in successfully.");
});

export const logout = asyncWrapper(async (req: Request, res: Response) => {
	res
		.status(200)
		.clearCookie("token", { httpOnly: true, sameSite: "none", secure: true })
		.json({ message: "Logged out successfully." });
});

export const getProfile = asyncWrapper(async (req: IReq, res: Response) => {
	const user = await User.findById(req.userId).populate([
		"posts",
		{ path: "likes", select: "post", populate: { path: "post" } },
		{ path: "saves", select: "post", populate: { path: "post" } },
	]);
	res.status(200).json({ user });
});

export const updateProfile = asyncWrapper(async (req: IReq, res: Response) => {
	const user = await User.findByIdAndUpdate(
		req.userId,
		{ ...req.body, avatar: req.file?.filename },
		{
			new: true,
		}
	).populate([
		"posts",
		{ path: "likes", select: "post", populate: { path: "post" } },
		{ path: "saves", select: "post", populate: { path: "post" } },
	]);
	res.status(200).json({ user });
});

export const followUser = asyncWrapper(async (req: IReq, res: Response) => {
	await User.findByIdAndUpdate(req.body.followingId, {
		$push: { followers: req.userId },
	});
	const user = await User.findByIdAndUpdate(
		req.userId,
		{
			$push: { followings: req.body.followingId },
		},
		{ new: true }
	).populate([
		"posts",
		{ path: "likes", select: "post", populate: { path: "post" } },
		{ path: "saves", select: "post", populate: { path: "post" } },
	]);
	res.status(200).json({ user });
});

export const unfollowUser = asyncWrapper(async (req: IReq, res: Response) => {
	await User.findByIdAndUpdate(req.body.followingId, {
		$pull: { followers: req.userId },
	});
	const user = await User.findByIdAndUpdate(
		req.userId,
		{
			$pull: { followings: req.body.followingId },
		},
		{ new: true }
	).populate([
		"posts",
		{ path: "likes", select: "post", populate: { path: "post" } },
		{ path: "saves", select: "post", populate: { path: "post" } },
	]);
	res.status(200).json({ user });
});
