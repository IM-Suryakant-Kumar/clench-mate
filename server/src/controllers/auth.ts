import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { BadRequestError, NotFoundError } from "../errors";
import { User } from "../models";
import { sendToken } from "../utils";

export const signup = asyncWrapper(async (req: Request, res: Response) => {
	const user = await User.create(req.body);
	sendToken(res, 201, user, "Signed up successfully.");
});

export const login = asyncWrapper(async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password)
		throw new BadRequestError("Please provide email and password");
	const user = await User.findOne({ email });
	if (!user) throw new NotFoundError("Invalid credentials");
	const isPasswordValid = await user.comparePassword(password);
	if (!isPasswordValid) throw new NotFoundError("Invalid credentials");
	sendToken(res, 200, user, "Logged in successfully.");
});

export const logout = asyncWrapper(async (req: Request, res: Response) => {
	res
		.status(200)
		.clearCookie("token", { httpOnly: true })
		.json({ success: true, message: "Logged out successfully." });
});
