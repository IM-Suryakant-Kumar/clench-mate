import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { User } from "../models";

export const getUsers = asyncWrapper(async (req: Request, res: Response) => {
	const users = await User.find();
	res.status(200).json({ users });
});

export const getUser = asyncWrapper(async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	res.status(200).json({ user });
});
