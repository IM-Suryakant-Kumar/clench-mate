import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { User } from "../models";
import { populate } from "dotenv";

export const createUser = asyncWrapper(async (req: Request, res: Response) => {
	const user = await User.create(req.body);
	res.status(200).json({ user });
});

export const getUsers = asyncWrapper(async (req: Request, res: Response) => {
	const users = await User.find().populate([
		{ path: "posts", populate: ["author", "likes", "saves", "comments"] },
		{ path: "likes", select: "post", populate: { path: "post" } },
		{ path: "saves", select: "post", populate: { path: "post" } },
	]);
	res.status(200).json({ users });
});

export const getUser = asyncWrapper(async (req: Request, res: Response) => {
	const user = await User.findOne({ username: req.params.username }).populate([
		{ path: "posts", populate: ["author", "likes", "saves", "comments"] },
		{ path: "likes", select: "post", populate: { path: "post" } },
		{ path: "saves", select: "post", populate: { path: "post" } },
	]);
	res.status(200).json({ user });
});

export const updateUser = asyncWrapper(async (req: Request, res: Response) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({ user });
});

export const deleteUser = asyncWrapper(async (req: Request, res: Response) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).json({ message: "User deleted Successfully." });
});
