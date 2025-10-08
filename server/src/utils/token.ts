import { Response } from "express";
import { IUser } from "../models";

export const sendToken = (
	res: Response,
	statusCode: number,
	user: IUser,
	message: string
) => {
	const token = user.createJWTToken();
	res
		.status(statusCode)
		.cookie("token", token, {
			httpOnly: true,
			maxAge: 5 * 24 * 60 * 60 * 1000,
		})
		.json({ success: true, message });
};
