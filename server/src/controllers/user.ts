import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { User } from "../models";

export const createUser = asyncWrapper(async (req: Request, res: Response) => {
	const user = await User.create(req.body);
	res.status(200).json({ user });
});

export const getUsers = asyncWrapper(async (req: Request, res: Response) => {
	const users = await User.find();
	res.status(200).json({ users });
});

export const getUser = asyncWrapper(async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
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
